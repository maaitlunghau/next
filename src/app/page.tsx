import { Button } from '@/components/ui';

export default function HomePage(): React.ReactElement {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="max-w-2xl text-center">
        <h1 className="mb-4 text-4xl font-bold">
          Welcome to Next.js 15
        </h1>
        <p className="mb-8 text-lg text-gray-600">
          Cấu trúc dự án đã được thiết lập hoàn chỉnh
        </p>
        <Button>Get Started</Button>
      </div>
    </main>
  );
}
