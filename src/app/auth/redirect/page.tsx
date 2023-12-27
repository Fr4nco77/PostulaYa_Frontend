"use client";

import { useSearchParams, useRouter } from "next/navigation";
import Cookies from "js-cookie";

export default function Redirect() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const name = searchParams.get("name");
  const email = searchParams.get("email");
  const image = searchParams.get("image");

  if (!token || token === "error" || !name || !email || !image) {
    return router.push("/auth/sign_in");
  }

  Cookies.set("authorization", token);
  Cookies.set("_username", name);
  Cookies.set("_email", email);
  Cookies.set("_image", image);
  return router.push("/app");
}
