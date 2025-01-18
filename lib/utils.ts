// import { clsx, type ClassValue } from "clsx"
// import { twMerge } from "tailwind-merge"

// export function cn(...inputs: ClassValue[]) {
//   return twMerge(clsx(inputs))
// }


// import { type ClassValue, clsx } from "clsx"
// import { twMerge } from "tailwind-merge"
 
// export function cn(...inputs: ClassValue[]) {
//   return twMerge(clsx(inputs))
// }


/* /home/user/Guru-AI/lib/utils.ts */
/**
 * A merged utility file that includes:
 * 1) 'cn' for merging Tailwind/clsx class names,
 * 2) Audio context / blob / base64 utils for the Multimodal Live API.
 */

// For CSS class merging
import { type ClassValue } from "clsx";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * 'cn' function merges multiple class name strings/conditions
 * using clsx + tailwind-merge to handle deduplication & conflicts.
 * Example usage:
 *   cn("p-2", "p-4", "text-lg") => "p-4 text-lg"
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// For audio/video + partial text streaming logic

export type GetAudioContextOptions = AudioContextOptions & { id?: string };

const audioCtxMap: Map<string, AudioContext> = new Map();

/**
 * Return (or create) a shared AudioContext at the given sampleRate.
 * The "multimodal-live-api-web-console" sample uses a shared context
 * to capture mic data or play partial PCM audio from the model.
 */
export async function audioContext(options?: GetAudioContextOptions) {
  const ctxKey = options?.id || "default";

  if (audioCtxMap.has(ctxKey)) {
    return audioCtxMap.get(ctxKey)!;
  }
  const ctx = new AudioContext(options);
  audioCtxMap.set(ctxKey, ctx);
  return ctx;
}

/**
 * Convert a blob to JSON. Used when receiving server messages
 * in the "multimodal-live-api-web-console" code.
 */
export async function blobToJSON(blob: Blob) {
  const text = await blob.text();
  return JSON.parse(text);
}

/**
 * Convert base64 string to ArrayBuffer, used for partial PCM audio
 * from the model or sending images. 
 */
export function base64ToArrayBuffer(base64: string) {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes.buffer;
}
