import React from "react";
import { CheckCircle2, XCircle, AlertTriangle, Info, X } from "lucide-react";

export type ToastType = "success" | "error" | "warning" | "info";

interface CustomToastProps {
  type: ToastType;
  title: string;
  message: string;
  onClose?: () => void;
  actionLabel?: string;
  onAction?: () => void;
}

const toastConfig = {
  success: {
    icon: CheckCircle2,
    bgColor: "bg-teal-50",
    borderColor: "border-teal-400",
    iconColor: "text-teal-500",
    titleColor: "text-teal-900",
    messageColor: "text-teal-700",
    closeColor: "text-teal-400 hover:text-teal-600",
    actionColor: "text-teal-600 hover:text-teal-700",
  },
  error: {
    icon: XCircle,
    bgColor: "bg-red-50",
    borderColor: "border-red-400",
    iconColor: "text-red-500",
    titleColor: "text-red-900",
    messageColor: "text-red-700",
    closeColor: "text-red-400 hover:text-red-600",
    actionColor: "text-red-600 hover:text-red-700",
  },
  warning: {
    icon: AlertTriangle,
    bgColor: "bg-orange-50",
    borderColor: "border-orange-400",
    iconColor: "text-orange-500",
    titleColor: "text-orange-900",
    messageColor: "text-orange-700",
    closeColor: "text-orange-400 hover:text-orange-600",
    actionColor: "text-orange-600 hover:text-orange-700",
  },
  info: {
    icon: Info,
    bgColor: "bg-blue-50",
    borderColor: "border-blue-400",
    iconColor: "text-blue-500",
    titleColor: "text-blue-900",
    messageColor: "text-blue-700",
    closeColor: "text-blue-400 hover:text-blue-600",
    actionColor: "text-blue-600 hover:text-blue-700",
  },
};

export const CustomToast: React.FC<CustomToastProps> = ({
  type,
  title,
  message,
  onClose,
  actionLabel,
  onAction,
}) => {
  const config = toastConfig[type];
  const Icon = config.icon;

  return (
    <div
      className={`
        ${config.bgColor} ${config.borderColor}
        border-2 rounded-xl p-4 pr-10
        shadow-lg min-w-[350px] max-w-[450px]
        relative animate-in slide-in-from-right duration-300
      `}
    >
      {/* Close Button */}
      {onClose && (
        <button
          onClick={onClose}
          className={`
            absolute top-3 right-3 p-1 rounded-md
            transition-colors ${config.closeColor}
          `}
          aria-label="Đóng thông báo"
        >
          <X size={16} />
        </button>
      )}

      {/* Content */}
      <div className="flex items-start gap-3">
        {/* Icon */}
        <div className={`shrink-0 ${config.iconColor}`}>
          <Icon size={20} />
        </div>

        {/* Text Content */}
        <div className="flex-1 min-w-0">
          <h4
            className={`font-semibold text-[15px] leading-tight ${config.titleColor}`}
          >
            {title}
          </h4>
          <p
            className={`text-[14px] leading-relaxed mt-1 ${config.messageColor}`}
          >
            {message}
          </p>

          {/* Action Button */}
          {actionLabel && onAction && (
            <button
              onClick={onAction}
              className={`
                mt-3 text-sm font-medium underline
                transition-colors ${config.actionColor}
              `}
            >
              {actionLabel}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

// Export individual toast components for convenience
export const SuccessToast: React.FC<Omit<CustomToastProps, "type">> = (
  props,
) => <CustomToast type="success" {...props} />;

export const ErrorToast: React.FC<Omit<CustomToastProps, "type">> = (props) => (
  <CustomToast type="error" {...props} />
);

export const WarningToast: React.FC<Omit<CustomToastProps, "type">> = (
  props,
) => <CustomToast type="warning" {...props} />;

export const InfoToast: React.FC<Omit<CustomToastProps, "type">> = (props) => (
  <CustomToast type="info" {...props} />
);
