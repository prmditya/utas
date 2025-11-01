"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import LoadingPage from "@/components/loading-page";

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    router.push("/home");
  }, [router]);

  return <LoadingPage iconSize="MEDIUM" />;
}
