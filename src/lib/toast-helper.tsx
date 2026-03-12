import { toast } from "sonner";
import { CustomToast, ToastType } from "@/components/common/CustomToast";

/**
 * Helper functions for displaying custom toast notifications
 * Using Sonner with custom React components
 */

interface ToastOptions {
  title: string;
  message: string;
  actionLabel?: string;
  onAction?: () => void;
  duration?: number;
}

const showCustomToast = (type: ToastType, options: ToastOptions) => {
  const { title, message, actionLabel, onAction, duration = 4000 } = options;

  return toast.custom(
    (t) => (
      <CustomToast
        type={type}
        title={title}
        message={message}
        actionLabel={actionLabel}
        onAction={onAction}
        onClose={() => toast.dismiss(t)}
      />
    ),
    {
      duration,
      position: "top-right",
    },
  );
};

export const showToast = {
  /**
   * Display success toast
   * @param title - Main title to display
   * @param message - Description message
   * @param options - Additional options
   */
  success: (
    title: string,
    message: string,
    options?: Partial<ToastOptions>,
  ) => {
    return showCustomToast("success", {
      title,
      message,
      duration: 3000,
      ...options,
    });
  },

  /**
   * Display error toast
   * @param title - Main title to display
   * @param message - Description message
   * @param options - Additional options
   */
  error: (title: string, message: string, options?: Partial<ToastOptions>) => {
    return showCustomToast("error", {
      title,
      message,
      duration: 5000,
      ...options,
    });
  },

  /**
   * Display warning toast
   * @param title - Main title to display
   * @param message - Description message
   * @param options - Additional options
   */
  warning: (
    title: string,
    message: string,
    options?: Partial<ToastOptions>,
  ) => {
    return showCustomToast("warning", {
      title,
      message,
      duration: 4000,
      ...options,
    });
  },

  /**
   * Display info toast
   * @param title - Main title to display
   * @param message - Description message
   * @param options - Additional options
   */
  info: (title: string, message: string, options?: Partial<ToastOptions>) => {
    return showCustomToast("info", {
      title,
      message,
      duration: 3000,
      ...options,
    });
  },

  /**
   * Dismiss a specific toast by ID
   * @param toastId - ID of the toast to dismiss
   */
  dismiss: (toastId: string | number) => {
    toast.dismiss(toastId);
  },

  /**
   * Dismiss all toasts
   */
  dismissAll: () => {
    toast.dismiss();
  },
};

// Example usage:
// showToast.success("Đã lưu thay đổi", "Hồ sơ của bạn đã được cập nhật thành công trên hệ thống.");
//
// showToast.error("Không thể kết nối", "Đã xảy ra lỗi khi tải dữ liệu. Vui lòng kiểm tra kết nối mạng của bạn.");
//
// showToast.warning("Sắp hết dung lượng", "Bạn đã sử dụng 90% dung lượng lưu trữ.", {
//   actionLabel: "Xem chi tiết",
//   onAction: () => console.log("Navigate to storage page")
// });
//
// showToast.info("Bản cập nhật mới", "Phiên bản v2.4.0 đã sẵn sàng với nhiều tính năng mới.");
