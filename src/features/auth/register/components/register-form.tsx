"use client";
import { GalleryVerticalEnd } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useRegister } from "../hooks/use-register";

export function RegisterForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter();
  const register = useRegister();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const username = e.currentTarget.username.value;
    const email = e.currentTarget.email.value;
    const password = e.currentTarget.password.value;
    const confirmPassword = e.currentTarget.confirmPassword.value;

    if (!username || !password || !email || !confirmPassword) {
      alert("Please fill in all required fields.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    register.mutate({ username, email, password });
    router.push("/login");
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <form onSubmit={handleSubmit}>
        <FieldGroup>
          <div className="flex flex-col items-center gap-2 text-center">
            <a
              href="#"
              className="flex flex-col items-center gap-2 font-medium"
            >
              <div className="flex size-8 items-center justify-center rounded-md">
                <GalleryVerticalEnd className="size-6" />
              </div>
              <span className="sr-only">Utas.</span>
            </a>
            <h1 className="text-xl font-bold">Welcome to Utas.</h1>
            <FieldDescription>
              Already have an account? <a href="/auth/login">Login</a>
            </FieldDescription>
          </div>
          <Field>
            <FieldLabel htmlFor="username">
              Username<span className="text-red-500 ml-[-5px]">*</span>
            </FieldLabel>
            <Input
              id="username"
              type="username"
              placeholder="john123"
              required
            />
            <FieldLabel htmlFor="email">
              Email <span className="text-red-500 ml-[-5px]">*</span>
            </FieldLabel>
            <Input
              id="email"
              type="email"
              placeholder="name@example.com"
              required
            />
            <FieldLabel htmlFor="password">
              Password <span className="text-red-500 ml-[-5px]">*</span>
            </FieldLabel>
            <Input
              id="password"
              type="password"
              placeholder="password"
              required
            />
            <FieldLabel htmlFor="confirmPassword">
              Confirm Password <span className="text-red-500 ml-[-5px]">*</span>
            </FieldLabel>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="confirm password"
              required
            />
          </Field>
          <Field>
            <Button type="submit">Register</Button>
          </Field>
        </FieldGroup>
      </form>
    </div>
  );
}
