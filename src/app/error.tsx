"use client";

import { useEffect } from "react";
import { Button } from "@/components/common/ui/button";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({
  error,
  reset,
}: ErrorProps): React.ReactElement {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="max-w-md text-center">
        <h2 className="mb-4 text-2xl font-bold">Đã có lỗi xảy ra</h2>
        <p className="mb-8 text-gray-600">{error.message}</p>
        <Button onClick={reset}>Thử lại</Button>
      </div>
    </div>
  );
}
