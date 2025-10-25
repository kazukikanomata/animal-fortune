import { toast, Toaster as Sonner, ToasterProps } from "sonner";

type UseToastProps = {
  message: string;
  description?: string;
  icon?: React.ReactNode;
  actionButton?: { label: string; onClick: () => void };
};

const showToast = ({ ...props }: UseToastProps) => {
  return toast(props.message, {
    position: "top-center",
    description: props.description,
    icon: props.icon,
    action: props.actionButton,
    duration: 2000,
  });
};

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      duration={2000}
      visibleToasts={5}
      className="toaster group"
      toastOptions={{
        style: {
          minHeight: "60px",
          padding: "12px 16px",
        },
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-white group-[.toaster]:text-gray-800 group-[.toaster]:border group-[.toaster]:border-gray-200 group-[.toaster]:shadow-lg group-[.toaster]:rounded-lg group-[.toaster]:px-4 group-[.toaster]:py-5 group-[.toaster]:flex group-[.toaster]:items-center group-[.toaster]:justify-center group-[.toaster]:text-center group-[.toaster]:text-base group-[.toaster]:font-medium",
          description:
            "group-[.toast]:text-gray-600 group-[.toast]:text-center group-[.toast]:text-base",
        },
      }}
      {...props}
    />
  );
};
// DaisyUIスタイルのtoast表示用のヘルパー関数
export const showDaisyToast = (message: string) => {
  return showToast({
    message,
  });
};
export { showToast, Toaster };
