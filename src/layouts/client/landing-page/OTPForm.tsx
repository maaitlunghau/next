"use client";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/common/ui/card";

import { useRef, useState } from "react";

export default function OTPForm() {
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 6);
    if (!/^\d+$/.test(pastedData)) return;

    const newOtp = [...otp];
    pastedData.split("").forEach((char, index) => {
      if (index < 6) newOtp[index] = char;
    });
    setOtp(newOtp);

    const nextIndex = Math.min(pastedData.length, 5);
    inputRefs.current[nextIndex]?.focus();
  };

  const handleResendCode = () => {
    setOtp(["", "", "", "", "", ""]);
    inputRefs.current[0]?.focus();
  };

  // const form = useForm<z.infer<typeof registerStep1Schema>>({
  //     resolver: zodResolver(registerStep1Schema),
  //     defaultValues: {
  //         identifier: "",
  //     },
  // });

  return (
    <Card className="w-full p-0!">
      {/* Form Header */}
      <CardHeader>
        <CardTitle className="text-[24px] font-semibold text-center">
          Xác minh tài khoản
        </CardTitle>
        <CardDescription className="text-slate-500 text-center pt-3">
          Nhập mã xác minh 6 chữ số đã được gửi đến ch***@gmail.com
          <br />
          Mã có hiệu lực trong 5 phút.
        </CardDescription>
      </CardHeader>

      {/* OTP Input */}
      <div className="flex justify-center gap-3">
        {otp.map((digit, index) => (
          <input
            key={index}
            ref={(el) => {
              inputRefs.current[index] = el;
            }}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            onPaste={index === 0 ? handlePaste : undefined}
            className="w-14 h-14 text-center text-xl! font-semibold border border-gray-300 rounded-lg focus:border-[#3B82f6] focus:outline-none transition-colors"
            autoFocus={index === 0}
          />
        ))}
      </div>

      {/* Resend Code Link */}
      <div className="text-center">
        <button
          type="button"
          onClick={handleResendCode}
          className="text-sm! font-medium text-[#3B82f6] cursor-pointer hover:underline"
        >
          Gửi lại mã
        </button>
      </div>

      {/* Submit Button */}
      <div className="w-full">
        <button
          type="submit"
          form="register-step1-form"
          className="w-full bg-linear-to-r from-blue-600 to-blue-800 hover:from-[#1e40af] hover:bg-[#2563eb] text-white py-4 font-semibold rounded-full shadow-md transition-all duration-300 cursor-pointer"
        >
          Xác minh
        </button>
      </div>
    </Card>
  );
}
