import { create } from "zustand";

export interface ToastMessage {
  id: string;
  title: string;
  description?: string;
}

interface ToastState {
  toasts: ToastMessage[];
  notify: (toast: Omit<ToastMessage, "id">) => void;
  dismiss: (id: string) => void;
}

export const useToastStore = create<ToastState>((set) => ({
  toasts: [],
  notify: (toast) => {
    const id = crypto.randomUUID();

    set((state) => ({
      toasts: [...state.toasts.slice(-2), { ...toast, id }],
    }));

    window.setTimeout(() => {
      set((state) => ({
        toasts: state.toasts.filter((item) => item.id !== id),
      }));
    }, 3200);
  },
  dismiss: (id) =>
    set((state) => ({
      toasts: state.toasts.filter((toast) => toast.id !== id),
    })),
}));
