"use client";

import { useSearchParams, useRouter } from "next/navigation";

export default function Redirect() {
  const token = useSearchParams().get("token");
  const router = useRouter();

  if (!token || token === null) {
    router.push("/auth/sign_in");
  } else {
    localStorage.setItem("authorization", token);
    router.push("/dashboard");
  }
  return <></>;
}
