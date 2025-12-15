"use client";

import { useEffect, useState } from "react";

export default function Relogio() {
  const [hora, setHora] = useState<Date | null>(null);

  useEffect(() => {
    const update = () => setHora(new Date());

    update(); // define a hora só no cliente
    const timer = setInterval(update, 1000);

    return () => clearInterval(timer);
  }, []);

  if (!hora) return null; // evita render no SSR

  const formatar = (num: number) => String(num).padStart(2, "0");

  return (
    <div className="text-white font-mono">
      {formatar(hora.getHours())}:
      {formatar(hora.getMinutes())}:
      {formatar(hora.getSeconds())}
    </div>
  );
}
