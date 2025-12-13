"use client";
import { useEffect } from "react";

type Props = {
  show?: boolean;
  open?: boolean;
  visitorData?: Record<string, any>;
};

export default function TidioController({
  show = false,
  open = false,
  visitorData,
}: Props) {
  useEffect(() => {
    const interval = setInterval(() => {
      if (window.tidioChatApi) {
        show ? window.tidioChatApi.show() : window.tidioChatApi.hide();
        open && window.tidioChatApi.open();
        visitorData && window.tidioChatApi.setVisitorData(visitorData);
        clearInterval(interval);
      }
    }, 500);

    return () => clearInterval(interval);
  }, [show, open, visitorData]);

  return null;
}
