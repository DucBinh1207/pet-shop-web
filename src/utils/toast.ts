import { toast } from "react-toastify";

type toastProps = {
  type: "success" | "error";
  message: string;
};

function toastCreator({ type, message }: toastProps) {
  return toast[type](message, {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "light",
    progress: undefined,
  });
}

export function toastError(message: string) {
  return toastCreator({ type: "error", message: message });
}

export function toastSuccess(message: string) {
  return toastCreator({ type: "success", message: message });
}
