"use client";

import { useState } from "react";

export default function InputPage() {
  const [texto, setTexto] = useState("");
  const [categoria, setCategoria] = useState("React");
  const [tarefas, setTarefas] = useState<
    { id: number; nome: string; categoria: string; editando: boolean }[]
  >([]);

  const adicionarTarefa = () => {
    if (!texto.trim()) return;
    setTarefas([...tarefas, { id: Date.now(), nome: texto, categoria, editando: false }]);
    setTexto("");
  };

  const apagarTarefa = (id: number) => setTarefas(tarefas.filter(t => t.id !== id));

  const toggleEditar = (id: number) => {
    setTarefas(
      tarefas.map(t =>
        t.id === id ? { ...t, editando: !t.editando } : t
      )
    );
  };

  const atualizarTarefa = (id: number, novoNome: string) => {
    setTarefas(
      tarefas.map(t => t.id === id ? { ...t, nome: novoNome } : t)
    );
  };

  return (
    <div className="p-6 text-white max-w-md mx-auto">

      <h2 className="text-2xl font-bold mb-3">Input</h2>

      {/* Input de texto */}
      <input
        value={texto}
        onChange={e => setTexto(e.target.value)}
        placeholder="Escreve algo..."
        className="text-black p-2 rounded w-full mb-2"
      />
      <p className="mb-4">Texto digitado: <b>{texto}</b></p>

      {/* Seletor de categoria */}
      <select
        value={categoria}
        onChange={e => setCategoria(e.target.value)}
        className="text-black p-2 rounded mb-4 w-full"
      >
        <option>React</option>
        <option>Next.js</option>
        <option>TypeScript</option>
        <option>Node.js</option>
        <option>Java</option>
      </select>

      {/* Botão para adicionar tarefa */}
      <button
        onClick={adicionarTarefa}
        className="bg-green-500 px-4 py-2 rounded w-full mb-4 hover:bg-green-600"
      >
        Adicionar Tarefa
      </button>

      {/* Lista de tarefas */}
      <ul className="space-y-2">
        {tarefas.map(t => (
          <li key={t.id} className="bg-gray-700 p-3 rounded flex items-center justify-between">
            
            {t.editando ? (
              <input
                className="text-black p-1 rounded flex-1 mr-2"
                value={t.nome}
                onChange={e => atualizarTarefa(t.id, e.target.value)}
              />
            ) : (
              <div className="flex-1 mr-2">
                <p className="font-bold">{t.nome}</p>
                <p className="text-sm text-gray-300">Categoria: {t.categoria}</p>
              </div>
            )}

            <div className="flex gap-2">
              <button
                onClick={() => toggleEditar(t.id)}
                className="bg-yellow-500 px-3 py-1 rounded hover:bg-yellow-600"
              >
                {t.editando ? "Guardar" : "Editar"}
              </button>
              <button
                onClick={() => apagarTarefa(t.id)}
                className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
              >
                Apagar
              </button>
            </div>

          </li>
        ))}
      </ul>

    </div>
  );
}
