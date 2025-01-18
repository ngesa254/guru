/* /home/user/Guru-AI/lib/worklets/audio-processing.ts */
/**
 * A string containing the code for an AudioWorklet that 
 * chunk-encodes raw PCM from the mic in int16 format 
 * and sends it up to the main thread. 
 */

const AudioRecordingWorklet = `
class AudioProcessingWorklet extends AudioWorkletProcessor {
  buffer = new Int16Array(2048);
  bufferWriteIndex = 0;

  process(inputs) {
    if (inputs[0].length) {
      const channelData = inputs[0][0];
      this.processChunk(channelData);
    }
    return true;
  }

  sendAndClearBuffer() {
    this.port.postMessage({
      event: "chunk",
      data: {
        int16arrayBuffer: this.buffer.slice(0, this.bufferWriteIndex).buffer,
      },
    });
    this.bufferWriteIndex = 0;
  }

  processChunk(float32Array) {
    for (let i = 0; i < float32Array.length; i++) {
      let s = float32Array[i] * 32768;
      if (s > 32767) s = 32767;
      if (s < -32768) s = -32768;
      this.buffer[this.bufferWriteIndex++] = s;
      if (this.bufferWriteIndex >= this.buffer.length) {
        this.sendAndClearBuffer();
      }
    }
  }
}

registerProcessor("audio-recorder-worklet", AudioProcessingWorklet);
`;

export default AudioRecordingWorklet;
