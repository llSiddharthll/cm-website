import type { Collection, Field } from "../schema";
import { ApiError } from "./http";

function coerce(field: Field, value: unknown, path: string): unknown {
  if (value === undefined || value === null) return undefined;

  switch (field.type) {
    case "number": {
      if (value === "") return undefined;
      const n = Number(value);
      if (Number.isNaN(n)) throw new ApiError(422, `"${path}" must be a number`);
      return n;
    }
    case "boolean":
      return Boolean(value);
    case "tags":
    case "paragraphs": {
      if (!Array.isArray(value)) throw new ApiError(422, `"${path}" must be a list`);
      return value.map((v) => String(v));
    }
    case "object": {
      if (typeof value !== "object" || Array.isArray(value))
        throw new ApiError(422, `"${path}" must be an object`);
      const out: Record<string, unknown> = {};
      for (const sub of field.fields ?? []) {
        const c = coerce(sub, (value as Record<string, unknown>)[sub.name], `${path}.${sub.name}`);
        if (c !== undefined) out[sub.name] = c;
      }
      return out;
    }
    case "objectList": {
      if (!Array.isArray(value)) throw new ApiError(422, `"${path}" must be a list`);
      return value.map((row, i) => {
        const out: Record<string, unknown> = {};
        for (const sub of field.fields ?? []) {
          const c = coerce(sub, (row as Record<string, unknown>)?.[sub.name], `${path}[${i}].${sub.name}`);
          if (c !== undefined) out[sub.name] = c;
        }
        return out;
      });
    }
    case "select": {
      const s = String(value);
      if (field.options && s && !field.options.includes(s))
        throw new ApiError(422, `"${path}" must be one of: ${field.options.join(", ")}`);
      return s;
    }
    default:
      return typeof value === "string" ? value : String(value);
  }
}

/**
 * Validate + clean an input payload against a collection's field schema.
 * `partial` skips required checks (for PATCH-like updates).
 */
export function validateData(
  col: Collection,
  input: Record<string, unknown>,
  partial = false,
): Record<string, unknown> {
  if (typeof input !== "object" || input === null)
    throw new ApiError(422, "Body must be an object");

  const out: Record<string, unknown> = {};
  for (const field of col.fields) {
    const raw = input[field.name];
    const value = coerce(field, raw, field.name);

    if (value === undefined || value === "") {
      if (field.required && !partial)
        throw new ApiError(422, `"${field.label}" is required`);
      if (value === "") out[field.name] = ""; // keep explicit empty strings
      continue;
    }
    out[field.name] = value;
  }
  return out;
}
