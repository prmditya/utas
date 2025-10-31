"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Spinner } from "@/components/ui/spinner";

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    router.push("/home");
  }, [router]);

  return (
    <div className="flex flex-col justify-center items-center h-svh w-full">
      <Spinner />
    </div>
  );
}
