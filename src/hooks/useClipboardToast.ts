import { useState } from 'react';

export function useClipboardToast() {
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => {
      setToastMsg((prev) => (prev === msg ? null : prev));
    }, 2500);
  };

  const copyToClipboard = (
    text: string,
    label: string = 'Copied to clipboard!',
  ) => {
    navigator.clipboard.writeText(text);
    showToast(label);
  };

  return { toastMsg, showToast, copyToClipboard };
}
