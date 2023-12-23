"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Redirect() {
  const token = useSearchParams().get("token");
  const name = useSearchParams().get("name");
  const email = useSearchParams().get("email");
  const image = useSearchParams().get("image");
  const router = useRouter();

  useEffect(() => {
    if (!token || token === "error") {
      router.push("/auth/sign_in");
    } else {
      localStorage.setItem("authorization", token);
      localStorage.setItem("user_name", name!);
      localStorage.setItem("user_email", email!);
      localStorage.setItem("user_image", image!);
      router.push("/dashboard");
    }
  }, []);
}
