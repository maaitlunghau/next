import Link from "next/link";
import { Button } from "@/components/common/ui/button";
import { ROUTES } from "@/constants";

export default function NotFound(): React.ReactElement {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="max-w-md text-center">
        <h2 className="mb-4 text-6xl font-bold">404</h2>
        <p className="mb-8 text-xl text-gray-600">Không tìm thấy trang</p>
        <Link href={ROUTES.HOME}>
          <Button>Về trang chủ</Button>
        </Link>
      </div>
    </div>
  );
}
