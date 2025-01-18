/* /home/user/Guru-AI/lib/audioworklet-registry.ts */
export const registeredWorklets: Map<
  AudioContext,
  Record<string, { node?: AudioWorkletNode; handlers: ((ev: MessageEvent) => void)[] }>
> = new Map();

export function createWorketFromSrc(name: string, code: string) {
  const blob = new Blob([code], { type: "application/javascript" });
  const url = URL.createObjectURL(blob);
  return url;
}
