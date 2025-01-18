// /* /home/user/Guru-AI/app/application/guruLiveGemini/layout.tsx */
// "use client";

// import React from "react";
// import { GeminiProvider } from "@/app/geminiIntegration/GeminiProvider";

// export default function GuruLiveGeminiLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     // Provide your actual Google Cloud key or env var
//     <GeminiProvider apiKey="AIzaSyDx1ZIKh1_LC0M75rApp-KStw2hP_LdTsU">
//       {children}
//     </GeminiProvider>
//   );
// }


/* /home/user/Guru-AI/app/application/guruLiveGemini/layout.tsx */
/**
 * Local layout for the /application/guruLiveGemini route.
 * Wraps everything with <GeminiProvider> so that we can
 * do real-time streaming to Gemini 2.0.
 */
"use client";

import React from "react";
import { GeminiProvider } from "@/app/geminiIntegration/GeminiProvider";

export default function GuruLiveGeminiLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Replace the sample key below with your real GCP API key
  return (
    <GeminiProvider apiKey="AIzaSyDx1ZIKh1_LC0M75rApp-KStw2hP_LdTsU">
      {children}
    </GeminiProvider>
  );
}

