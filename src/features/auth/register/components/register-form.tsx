"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useRegister } from "../hooks/use-register";
import Image from "next/image";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { field } from "@/features/auth/types/field.type";

const registerSchema = z.object({
  username: z.string().min(2).max(100).nonempty(),
  email: z.string().email(),
  password: z.string().min(8).max(100).nonempty(),
  confirmPassword: z.string().min(8).max(100).nonempty(),
});

const FIELDS: field[] = [
  {
    fieldLabel: "Username",
    fieldName: "username",
    fieldPlaceHolder: "john123",
    fieldType: "username",
  },
  {
    fieldLabel: "Email",
    fieldName: "email",
    fieldPlaceHolder: "name@example.com",
    fieldType: "email",
  },
  {
    fieldLabel: "Pasword",
    fieldName: "password",
    fieldType: "password",
  },
  {
    fieldLabel: "Confirm Password",
    fieldName: "confirmPassword",
    fieldType: "password",
  },
];

export function RegisterForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter();
  const { mutate: register, isPending } = useRegister();
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const registerUser = (data: z.infer<typeof registerSchema>) => {
    register(data, {
      onSuccess: () => {
        toast.success("Registration Successful Redirecting to login...");
        router.push("/login");
      },
      onError: (error) => {
        const errorMessage = error.message || "Error can't Register!";
        toast.error(errorMessage);
      },
    });
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <form onSubmit={form.handleSubmit(registerUser)}>
        <FieldGroup>
          <div className="flex flex-col items-center gap-2 text-center">
            <a
              href="#"
              className="flex flex-col items-center gap-2 font-medium"
            >
              <div className="flex size-8 items-center justify-center rounded-md">
                <Image
                  src="/assets/logo.webp"
                  alt="Utas Logo"
                  width={48}
                  height={48}
                />
              </div>
              <span className="sr-only">Utas.</span>
            </a>
            <h1 className="text-xl font-bold">Welcome to Utas.</h1>
            <FieldDescription>
              Already have an account? <a href="/login">Login</a>
            </FieldDescription>
          </div>

          {FIELDS.map((FIELD) => (
            <Field key={FIELD.fieldName}>
              <Controller
                name={FIELD.fieldName}
                control={form.control}
                render={({ field, fieldState }) => (
                  <>
                    <FieldLabel>
                      {FIELD.fieldLabel}
                      <span className="text-red-500 ml-[-5px]">*</span>
                    </FieldLabel>
                    <Input
                      type={FIELD.fieldType}
                      placeholder={FIELD.fieldPlaceHolder}
                      autoComplete="false"
                      required
                      {...field}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </>
                )}
              />
            </Field>
          ))}

          <Field>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Registering..." : "Register"}
            </Button>
          </Field>
        </FieldGroup>
      </form>
    </div>
  );
}
