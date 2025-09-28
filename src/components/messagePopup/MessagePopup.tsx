import { useState, useEffect, useRef } from "react";

interface MessagePopupItemProps {
  message: string;
  duration?: number;
  onClose?: () => void;
}

/* MessagePopup component displays a temporary popup message with fade animation */
const MessagePopup = ({
  message,
  duration = 5000,
  onClose,
}: MessagePopupItemProps) => {
  const [visible, setVisible] = useState(false);
  const [isHiding, setIsHiding] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setVisible(true);

    timerRef.current = setTimeout(() => {
      setIsHiding(true);

      timerRef.current = setTimeout(() => {
        setVisible(false);
        onClose?.();
      }, 500);
    }, duration);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [duration, onClose]);

  if (!visible) return null;

  return (
    <div
      role="alert"
      className="w-full top-4 z-50 flex justify-center items-center">
      <div className={`w-full h-fit bg-red-400 text-gray-50 text-body-sm px-4 py-2 rounded-sm shadow-md
       flex justify-center items-center transition-all duration-300
       ${isHiding ? "opacity-0" : "opacity-100"}`}
      >
        {message}
      </div>
    </div>
  );
};

export default MessagePopup;