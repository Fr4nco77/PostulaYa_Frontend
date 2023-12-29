"use client";

import { useSearchParams, useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { configCookies } from "@/lib/utils";

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

  const config = configCookies();
  Cookies.set("authorization", token, config);
  Cookies.set("_username", name, config);
  Cookies.set("_email", email, config);
  Cookies.set("_image", image, config);
  return router.push("/app");
}
