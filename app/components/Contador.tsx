"use client";

import { useEffect, useState } from "react";

export default function Contador() {
  const [valor, setValor] = useState(0);
  const [historico, setHistorico] = useState<number[]>([]);

  // Carrega do localStorage
  useEffect(() => {
    const v = localStorage.getItem("valor");
    const h = localStorage.getItem("historico");

    if (v) setValor(Number(v));
    if (h) setHistorico(JSON.parse(h));
  }, []);

  // Guarda no localStorage
  useEffect(() => {
    localStorage.setItem("valor", String(valor));
    localStorage.setItem("historico", JSON.stringify(historico));
  }, [valor, historico]);

  // Atualizar valor com limites
  function mudar(novo: number) {
    if (novo < 0 || novo > 10) return;

    setValor(novo);
    setHistorico([...historico, novo]);
  }

  // Cor simples
  const cor =
    valor <= 3 ? "text-red-500" :
    valor <= 7 ? "text-yellow-400" :
    "text-green-500";

  return (
    <div className="bg-slate-800 text-white p-6 rounded-xl w-72">
      <h2 className="text-xl mb-4">Contador</h2>

      <div className={`text-5xl font-bold text-center mb-6 ${cor}`}>
        {valor}
      </div>

      <div className="flex justify-between mb-6">
        <button className="bg-red-500 px-4 py-2 rounded" onClick={() => mudar(valor - 1)}>-</button>
        <button className="bg-gray-300 text-black px-4 py-2 rounded" onClick={() => mudar(0)}>Reset</button>
        <button className="bg-green-500 px-4 py-2 rounded" onClick={() => mudar(valor + 1)}>+</button>
      </div>

      <h3 className="text-lg mb-2">Histórico:</h3>
      <ul className="list-disc ml-6 max-h-40 overflow-auto">
        {historico.map((h, i) => (
          <li key={i}>{h}</li>
        ))}
      </ul>
    </div>
  );
}
