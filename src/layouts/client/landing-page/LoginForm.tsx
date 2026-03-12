"use client";

import * as z from "zod";
import type React from "react";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/common/ui/card";
import { Field, FieldGroup } from "@/components/common/ui/field";

import { Input } from "@/components/common/ui/input";
import { loginSchema } from "@/schemas/auth/login.schema";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const router = useRouter();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  function onSubmit(data: z.infer<typeof loginSchema>) {
    toast("You submitted the following values:", {
      description: (
        <pre className="bg-code text-code-foreground mt-2 w-[320px] overflow-x-auto rounded-md p-4">
          <code>{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
      position: "bottom-right",
      classNames: {
        content: "flex flex-col gap-2",
      },
      style: {
        "--border-radius": "calc(var(--radius)  + 4px)",
      } as React.CSSProperties,
    });
  }
  return (
    <Card className="w-full p-0!">
      {/* Form Header */}
      <CardHeader>
        <CardTitle className="text-[26px] font-semibold text-black">
          Đăng nhập hoặc đăng ký
        </CardTitle>
        <CardDescription className="text-slate-400">
          Vui lòng nhập thông tin tài khoản để tiếp tục
        </CardDescription>
      </CardHeader>

      {/* Navigate Form */}
      <div className="pt-6 w-full flex items-center justify-start gap-8 border-b border-gray-200">
        <button
          onClick={() => router.push("/login")}
          className="pb-4 border-b-2 border-[#3B82F6] cursor-pointer"
        >
          <span className="text-[#3B82F6] font-medium text-[15px]! cursor-pointer">
            Đăng nhập
          </span>
        </button>
        <button
          onClick={() => router.push("/register")}
          className="pb-4 cursor-pointer"
        >
          <span className="text-gray-400 font-medium text-[15px]! hover:text-gray-600 transition-colors duration-300 cursor-pointer">
            Đăng ký
          </span>
        </button>
      </div>

      {/* Form Content */}
      <CardContent>
        <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="username"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <Input
                    {...field}
                    id="form-rhf-demo-title"
                    aria-invalid={fieldState.invalid}
                    placeholder="Email / SĐT"
                    autoComplete="username"
                    className="border border-gray-200 rounded-lg px-4 py-6 text-sm! focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 transition mb-4!"
                  />
                </Field>
              )}
            />
            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <Input
                    {...field}
                    id="form-rhf-demo-title"
                    type="password"
                    aria-invalid={fieldState.invalid}
                    placeholder="Mật khẩu của bạn"
                    autoComplete="current-password"
                    className="border border-gray-200 rounded-lg px-4 py-6 text-slate-200 text-sm! focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 transition mb-4!"
                  />
                </Field>
              )}
            />

            {/* Forgot Password Link */}
            <div className="w-full text-left">
              <Link
                href={"/forgot-password"}
                className="text-[#3B82f6] hover:underline text-sm cursor-pointer"
              >
                Bạn quên mật khẩu?
              </Link>
            </div>
          </FieldGroup>
        </form>
      </CardContent>

      {/* Submit Button */}
      <CardFooter className="mb-6">
        <div className="w-full">
          <button
            type="submit"
            form="form-rhf-demo"
            className="w-full bg-[#1e40af] hover:bg-blue-700 text-white py-4! font-semibold rounded-full shadow-sm transition-colors duration-300 cursor-pointer"
          >
            Đăng nhập
          </button>
        </div>
      </CardFooter>
    </Card>
  );
}
