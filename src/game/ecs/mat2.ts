import { Mat2 } from './types';

export function set(out: Mat2, x1: number, y1: number, x2: number, y2: number): void {
    out[0] = x1;
    out[1] = y1;
    out[2] = x2;
    out[3] = y2;
}

export function print(mat: Mat2): string {
    return `[{x1: ${mat[0]}, y1: ${mat[1]}}, {x2: ${mat[2]}, y2: ${mat[3]}}]`;
}
