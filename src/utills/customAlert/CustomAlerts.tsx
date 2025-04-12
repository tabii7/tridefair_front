import { useEffect, useState } from "react";

const CustomAlerts = ({ message }: { message: string }) => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  if (!show) return null;

  return (
    <div
      className="bg-red-100  border-red-400 text-red-700 py-3 rounded relative"
      role="alert"
    >
      <span className="block sm:inline text-red-700">{message}</span>
    </div>
  );
};

export default CustomAlerts;
