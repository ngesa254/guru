// Move "use client"; to the top of the file
"use client";

import { useSession, signIn, signOut } from "next-auth/react";

export const LoginButton = () => {
  const { data: session } = useSession();

  const login= async () => {
    await signIn(undefined, { callbackUrl: '/application' });
    console.log("login");
  }

  if (session) {
    return (
      <>
        Signed in as {session?.user?.email} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    );
  }
  return (
    <>
      Not signed in <br />
      <button onClick={()=>login()}>Sign in</button>
    </>
  );
};

