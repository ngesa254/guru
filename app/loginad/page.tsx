"use client";
import { SessionProvider } from "next-auth/react";
import { LoginButton } from "./LoginAD";

export default function LoginAD() {
  return (
    <div>
      <SessionProvider>
        <LoginButton />
      </SessionProvider>
    </div>
  );
}
    