// client.sendRealtimeInput([
//     {
//       mimeType: "audio/pcm;rate=16000",
//       data: base64EncodedChunk,
//     },
//   ]);
  


/* /home/user/Guru-AI/lib/audio-recorder.ts */
/**
 * The "AudioRecorder" from the sample. 
 * Uses an AudioWorklet to chunk PCM at 16kHz 
 * and emits "data" events containing base64-encoded raw PCM.
 */

import EventEmitter from "eventemitter3";
import AudioRecordingWorklet from "./worklets/audio-processing"; // a string with the code
import { createWorketFromSrc } from "./audioworklet-registry";
import { audioContext } from "./utils";

function arrayBufferToBase64(buffer: ArrayBuffer) {
  let binary = "";
  const bytes = new Uint8Array(buffer);
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

export class AudioRecorder extends EventEmitter<{
  data: (base64PCM: string) => void;
  volume: (vol: number) => void;
}> {
  private stream?: MediaStream;
  private source?: MediaStreamAudioSourceNode;
  private context?: AudioContext;
  private worklet?: AudioWorkletNode;

  constructor(public sampleRate = 16000) {
    super();
  }

  async start() {
    if (!navigator.mediaDevices) {
      throw new Error("No mediaDevices in this browser");
    }
    this.stream = await navigator.mediaDevices.getUserMedia({ audio: true });

    this.context = await audioContext({ sampleRate: this.sampleRate });
    this.source = this.context.createMediaStreamSource(this.stream);

    // register the audio-processing worklet
    const name = "audio-recorder-worklet";
    const src = createWorketFromSrc(name, AudioRecordingWorklet);
    await this.context.audioWorklet.addModule(src);

    this.worklet = new AudioWorkletNode(this.context, name);
    this.worklet.port.onmessage = (ev: MessageEvent) => {
      const chunk = ev.data.data.int16arrayBuffer;
      if (chunk) {
        const base64 = arrayBufferToBase64(chunk);
        this.emit("data", base64);
      }
    };
    this.source.connect(this.worklet);
  }

  stop() {
    if (this.source) {
      this.source.disconnect();
      this.source = undefined;
    }
    if (this.stream) {
      this.stream.getTracks().forEach((t) => t.stop());
      this.stream = undefined;
    }
    this.worklet = undefined;
  }
}
