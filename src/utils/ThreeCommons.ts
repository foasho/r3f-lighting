import { Euler, Vector2, Vector3 } from "three";

/**
 * Vector3 or [number, number, number] -> Vector3
 */
export const toVector3 = (v: Vector3 | [number, number, number]): Vector3 => {
  if (Array.isArray(v)) {
    return new Vector3(v[0], v[1], v[2]);
  }
  return v;
}

/**
 * Vector2 or [number, number] -> Vector2
 */
export const toVector2 = (v: Vector2 | [number, number]): Vector2 => {
  if (Array.isArray(v)) {
    return new Vector2(v[0], v[1]);
  }
  return v;
}

/**
 * Euler or [number, number, number] -> Euler
 */
export const toEuler = (v: Euler | [number, number, number]): Euler => {
  if (Array.isArray(v)) {
    return new Euler(v[0], v[1], v[2]);
  }
  return v;
}