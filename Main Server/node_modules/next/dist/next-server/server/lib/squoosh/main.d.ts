/// <reference types="node" />
import ImageData from './image_data';
export declare function decodeBuffer(buffer: Buffer): Promise<ImageData>;
export declare function rotate(image: ImageData, numRotations: number): Promise<ImageData>;
export declare function resize(image: ImageData, { width }: {
    width: number;
}): Promise<ImageData>;
export declare function encodeJpeg(image: ImageData, { quality }: {
    quality: number;
}): Promise<Buffer>;
export declare function encodeWebp(image: ImageData, { quality }: {
    quality: number;
}): Promise<Buffer>;
export declare function encodePng(image: ImageData): Promise<Buffer>;
