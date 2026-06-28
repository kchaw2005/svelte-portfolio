import { FROZEN_PORTRAIT_DOTS, isPortraitFrozen, type FrozenDot } from "./portraitDots";

type Dot = {
	alpha: number;
	radius: number;
	u: number;
	v: number;
	x: number;
	y: number;
};

export type DotPortraitOptions = {
	dotColor?: string;
	dotSpacing?: number;
	imageSrc: string;
	maxDotRadius?: number;
	minDotRadius?: number;
	portraitScale?: number;
};

const DEFAULT_OPTIONS = {
	dotColor: "#050505",
	dotSpacing: 6.4,
	maxDotRadius: 2.85,
	minDotRadius: 0.42,
	portraitScale: 0.91
};

const SAMPLE_SIZE = 360;

function round(value: number, places: number) {
	const factor = 10 ** places;
	return Math.round(value * factor) / factor;
}

function uvKey(u: number, v: number) {
	return `${round(u, 3)},${round(v, 3)}`;
}

export class DotPortraitEngine {
	private readonly canvas: HTMLCanvasElement;
	private readonly context: CanvasRenderingContext2D;
	private dots: Dot[] = [];
	private height = 0;
	private image: HTMLImageElement | undefined;
	private isDisposed = false;
	private readonly options: Required<DotPortraitOptions>;
	private pixelRatio = 1;
	private readonly sessionRemoved = new Set<string>();
	private width = 0;

	constructor(canvas: HTMLCanvasElement, options: DotPortraitOptions) {
		const context = canvas.getContext("2d");

		if (!context) {
			throw new Error("The dot portrait needs a 2D canvas context.");
		}

		this.canvas = canvas;
		this.context = context;
		this.options = { ...DEFAULT_OPTIONS, ...options };
	}

	async load() {
		if (isPortraitFrozen) {
			this.resize();
			return;
		}

		const image = new Image();
		image.decoding = "async";
		image.src = this.options.imageSrc;

		await image.decode();

		if (this.isDisposed) {
			return;
		}

		this.image = image;
		this.resize();
	}

	dispose() {
		this.isDisposed = true;
	}

	resize() {
		const rect = this.canvas.getBoundingClientRect();
		const nextWidth = Math.max(1, Math.round(rect.width));
		const nextHeight = Math.max(1, Math.round(rect.height));

		if (nextWidth === this.width && nextHeight === this.height) {
			return;
		}

		if (!isPortraitFrozen && !this.image) {
			return;
		}

		this.width = nextWidth;
		this.height = nextHeight;
		this.pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
		this.canvas.width = Math.round(this.width * this.pixelRatio);
		this.canvas.height = Math.round(this.height * this.pixelRatio);
		this.context.setTransform(this.pixelRatio, 0, 0, this.pixelRatio, 0, 0);
		this.dots = isPortraitFrozen
			? this.layoutFrozenDots(FROZEN_PORTRAIT_DOTS)
			: this.createDots(this.image!);
		this.render();
	}

	/** Dev edit mode: remove the nearest dot (session only until you freeze with Shift+S). */
	removeDotNear(x: number, y: number, pickRadius = 10) {
		if (isPortraitFrozen) {
			return null;
		}

		let nearest: Dot | undefined;
		let nearestDistance = pickRadius;

		for (const dot of this.dots) {
			const distance = Math.hypot(dot.x - x, dot.y - y);

			if (distance <= nearestDistance) {
				nearest = dot;
				nearestDistance = distance;
			}
		}

		if (!nearest) {
			return null;
		}

		this.sessionRemoved.add(uvKey(nearest.u, nearest.v));
		this.dots = this.dots.filter((dot) => dot !== nearest);
		this.render();

		return this.dots.length;
	}

	/** Dev edit mode: copy this into portraitDots.ts as FROZEN_PORTRAIT_DOTS. */
	exportSnapshot() {
		return this.dots
			.filter(
				({ alpha, radius, u, v }) =>
					Number.isFinite(alpha) && Number.isFinite(radius) && Number.isFinite(u) && Number.isFinite(v)
			)
			.map(({ u, v, alpha, radius }) => ({
				u: round(u, 4),
				v: round(v, 4),
				alpha: round(alpha, 3),
				radius: round(radius, 3)
			}));
	}

	private layoutFrozenDots(frozen: readonly FrozenDot[]) {
		const { left, top, squareSize } = this.portraitFrame();

		return frozen.map(({ u, v, alpha, radius }) => ({
			alpha,
			radius,
			u,
			v,
			x: left + u * squareSize,
			y: top + v * squareSize
		}));
	}

	private portraitFrame() {
		const squareSize = Math.min(this.width, this.height) * this.options.portraitScale;

		return {
			left: (this.width - squareSize) / 2,
			top: (this.height - squareSize) / 2,
			squareSize
		};
	}

	private createDots(image: HTMLImageElement) {
		const source = this.sampleImage(image);
		const dots: Dot[] = [];
		const { left, top, squareSize } = this.portraitFrame();
		const columns = Math.floor(squareSize / this.options.dotSpacing);
		const rows = Math.floor(squareSize / this.options.dotSpacing);
		const actualSpacing = squareSize / Math.max(columns, rows);

		for (let row = 0; row <= rows; row += 1) {
			for (let column = 0; column <= columns; column += 1) {
				const u = column / columns;
				const v = row / rows;

				if (this.sessionRemoved.has(uvKey(u, v))) {
					continue;
				}

				const mask = portraitMask(u, v);

				if (mask <= 0) {
					continue;
				}

				const pixel = readPixel(source, u, v);
				const darkness = enhanceDarkness(pixel.darkness, u, v, mask);

				if (darkness < 0.08) {
					continue;
				}

				const radius =
					this.options.minDotRadius +
					Math.pow(darkness, 0.82) * (this.options.maxDotRadius - this.options.minDotRadius);

				dots.push({
					alpha: clamp(0.48 + darkness * 0.52, 0.48, 1),
					radius,
					u,
					v,
					x: left + column * actualSpacing,
					y: top + row * actualSpacing
				});
			}
		}

		return dots;
	}

	private sampleImage(image: HTMLImageElement) {
		const canvas = document.createElement("canvas");
		canvas.width = SAMPLE_SIZE;
		canvas.height = SAMPLE_SIZE;

		const context = canvas.getContext("2d", { willReadFrequently: true });

		if (!context) {
			throw new Error("The dot portrait could not sample the source image.");
		}

		context.clearRect(0, 0, SAMPLE_SIZE, SAMPLE_SIZE);
		context.drawImage(image, 0, 0, SAMPLE_SIZE, SAMPLE_SIZE);

		return context.getImageData(0, 0, SAMPLE_SIZE, SAMPLE_SIZE);
	}

	private render() {
		this.context.clearRect(0, 0, this.width, this.height);
		this.context.fillStyle = this.options.dotColor;

		for (const dot of this.dots) {
			this.context.globalAlpha = dot.alpha;
			this.context.beginPath();
			this.context.arc(dot.x, dot.y, dot.radius, 0, Math.PI * 2);
			this.context.fill();
		}

		this.context.globalAlpha = 1;
	}
}

function readPixel(imageData: ImageData, u: number, v: number) {
	const x = Math.round(clamp(u, 0, 1) * (imageData.width - 1));
	const y = Math.round(clamp(v, 0, 1) * (imageData.height - 1));
	const index = (y * imageData.width + x) * 4;
	const red = imageData.data[index];
	const green = imageData.data[index + 1];
	const blue = imageData.data[index + 2];
	const luminance = 0.2126 * red + 0.7152 * green + 0.0722 * blue;

	return {
		darkness: 1 - luminance / 255
	};
}

function enhanceDarkness(rawDarkness: number, u: number, v: number, mask: number) {
	const face = ellipse(u, v, 0.5, 0.42, 0.2, 0.26);
	const shirt = v > 0.61 && v < 0.95 && Math.abs(u - 0.5) < 0.11 + (v - 0.61) * 0.08;
	const bowTie = v > 0.57 && v < 0.64 && Math.abs(u - 0.5) < 0.17;
	const backgroundCut = mask < 0.34 ? 0.75 : 1;
	const detailFloor = face ? 0.15 : shirt ? 0.06 : 0;
	const formalwearBoost = bowTie ? 0.22 : 0;
	const adjusted = clamp((rawDarkness - 0.04) * 1.42 + formalwearBoost, 0, 1);

	return clamp(Math.max(adjusted, detailFloor) * backgroundCut * mask, 0, 1);
}

function portraitMask(u: number, v: number) {
	const hair =
		ellipse(u, v, 0.5, 0.24, 0.01, 0.1) ||
		ellipse(u, v, 0.39, 0.32, 0.05, 0.1) ||
		ellipse(u, v, 0.62, 0.32, 0.05, 0.1) ||
		ellipse(u, v, 0.5, 0.34, 0.1, 0.01);
	const face = ellipse(u, v, 0.5, 0.42, 0.2, 0.25);
	const neck = v > 0.55 && v < 0.7 && Math.abs(u - 0.5) < 0.08;
	const torsoWidth = 0.12 + Math.max(0, v - 0.7) * 0.98;
	const torso = v > 0.57 && v < 0.98 && Math.abs(u - 0.5) < torsoWidth;
	const shoulders = ellipse(u, v, 0.5, 0.82, 0.39, 0.23);
	const shape = hair || face || neck || torso || shoulders;

	if (!shape) {
		return 0;
	}

	const softEdge = Math.min(edgeFade(u), edgeFade(v), edgeFade(1 - u), edgeFade(1 - v));
	return clamp(softEdge, 0, 1);
}

function ellipse(u: number, v: number, centerX: number, centerY: number, radiusX: number, radiusY: number) {
	const x = (u - centerX) / radiusX;
	const y = (v - centerY) / radiusY;

	return x * x + y * y <= 1;
}

function edgeFade(value: number) {
	return clamp(value / 0.0, 0, 1);
}

function clamp(value: number, min: number, max: number) {
	return Math.min(Math.max(value, min), max);
}
