# Next.js Project Structure

Dự án Next.js 15 với cấu trúc chuẩn cho production.

## 📁 Cấu trúc thư mục

```
src/
├── app/                    # App Router - Routes & Layouts
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Homepage
│   ├── loading.tsx        # Loading UI (Suspense)
│   ├── error.tsx          # Error boundary
│   ├── not-found.tsx      # 404 page
│   └── globals.css        # Global styles
│
├── components/            # React Components
│   ├── ui/               # Base UI components (Button, Input, Card...)
│   └── features/         # Feature-specific components
│
├── lib/                  # Utilities & Configurations
│   ├── utils.ts          # Helper functions (cn, formatDate...)
│   └── fonts.ts          # Font configurations
│
├── types/                # TypeScript Types & Interfaces
│   └── index.ts          # Shared types
│
├── hooks/                # Custom React Hooks
│   └── use-mounted.ts    # Example hook
│
├── actions/              # Server Actions
│   └── example.ts        # Server-side mutations
│
└── constants/            # Constants & Enums
    └── index.ts          # App-wide constants
```

## 🎯 Nguyên tắc thiết kế

### 1. **app/** - App Router
- Mỗi folder = 1 route
- `page.tsx` = route endpoint
- `layout.tsx` = shared layout
- `loading.tsx` = loading state (Suspense)
- `error.tsx` = error boundary
- Server Components by default

### 2. **components/** - Tái sử dụng
- `ui/` - Components cơ bản, không logic nghiệp vụ
- `features/` - Components có logic nghiệp vụ cụ thể
- Mỗi component 1 folder riêng nếu có nhiều files

### 3. **lib/** - Utilities
- Helper functions thuần túy
- Configurations (fonts, API clients...)
- Không chứa React components

### 4. **types/** - TypeScript
- Shared types/interfaces
- Tránh duplicate type definitions
- Export centralized

### 5. **hooks/** - Custom Hooks
- Chỉ Client Components hooks
- Prefix với `use`
- Tái sử dụng logic

### 6. **actions/** - Server Actions
- Server-side mutations
- Form submissions
- Database operations
- Directive `'use server'`

### 7. **constants/** - Constants
- App-wide constants
- Routes, API endpoints
- Magic numbers/strings

## 🚀 Bắt đầu

```bash
npm run dev
```

## 📝 Quy tắc code

- **TypeScript strict mode** - Không dùng `any`
- **Server Components** - Mặc định, chỉ thêm `'use client'` khi cần
- **Tailwind CSS** - Styling duy nhất
- **cn()** - Merge Tailwind classes
- **Semantic HTML** - Accessibility first
- **Result pattern** - Error handling có kiểu

## 🔧 Next steps

1. Thêm UI components vào `components/ui/`
2. Tạo routes mới trong `app/`
3. Viết Server Actions trong `actions/`
4. Thêm custom hooks vào `hooks/`
5. Define types trong `types/`
