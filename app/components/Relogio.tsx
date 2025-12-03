"use client";

import { useEffect, useState } from "react";

export default function Relogio() {
  const [hora, setHora] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setHora(new Date()), 1000);
    return () => clearInterval(timer); // limpa o intervalo ao desmontar
  }, []);

  const formatar = (num: number) => String(num).padStart(2, "0");

  return (
    <div className="text-white font-mono">
      {formatar(hora.getHours())}:
      {formatar(hora.getMinutes())}:
      {formatar(hora.getSeconds())}
    </div>
  );
}
