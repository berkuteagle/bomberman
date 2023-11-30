import { Mat2, Vec2 } from './types';

export function copy(out: Vec2, vec: Vec2): void {
    out[0] = vec[0];
    out[1] = vec[1];
}

export function set(out: Vec2, x: number, y: number): void {
    out[0] = x;
    out[1] = y;
}

export function add(out: Vec2, vec: Vec2): void {
    out[0] += vec[0];
    out[1] += vec[1];
}

export function clamp(out: Vec2, mat: Mat2): void {
    out[0] = Math.min(Math.max(mat[0], out[0]), mat[2]);
    out[1] = Math.min(Math.max(mat[1], out[1]), mat[3]);
}

export function print(vec: Vec2): string {
    return `{x: ${vec[0]}, y: ${vec[1]}}`;
}
