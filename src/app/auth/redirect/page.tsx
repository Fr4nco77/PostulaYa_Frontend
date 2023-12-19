"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Redirect() {
  const token = useSearchParams().get("token");
  const router = useRouter();

  useEffect(() => {
    if (!token) {
      router.push("/auth/sign_in");
    } else {
      localStorage.setItem("authorization", token);
      router.push("/dashboard");
    }
  }, []);
}
