"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Loader } from "lucide-react";

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    router.push("/home");
  }, []);

  return (
    <div className="flex flex-col justify-center items-center h-svh w-full">
      <Loader className="animate-spin mr-3 text-primary size-10 " />
    </div>
  );
}
