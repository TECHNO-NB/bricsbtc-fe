export {};

declare global {
  interface Window {
    tidioChatApi?: {
      show: () => void;
      hide: () => void;
      open: () => void;
      close: () => void;
      setVisitorData: (data: Record<string, any>) => void;
      sendMessage?: (message: string) => void;
    };
  }
}
