// /* /home/user/Guru-AI/app/geminiIntegration/utils.ts */

// "use client";

// export function base64ToArrayBuffer(base64: string) {
//   const binaryString = atob(base64);
//   const bytes = new Uint8Array(binaryString.length);
//   for (let i = 0; i < binaryString.length; i++) {
//     bytes[i] = binaryString.charCodeAt(i);
//   }
//   return bytes.buffer;
// }

// export function blobToJSON(blob: Blob) {
//   return new Promise((resolve, reject) => {
//     const reader = new FileReader();
//     reader.onload = () => {
//       if (reader.result) {
//         try {
//           const json = JSON.parse(reader.result as string);
//           resolve(json);
//         } catch (e) {
//           reject(e);
//         }
//       } else {
//         reject("FileReader had no result");
//       }
//     };
//     reader.readAsText(blob);
//   });
// }


