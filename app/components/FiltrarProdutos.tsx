"use client";

import { useEffect, useState } from "react";
import { Product } from "@/models/interfaces";
import PesquisarProdutos from "./PesquisaProduto";
import ProdutoCard from "./ProdutoCard";

interface FiltrarProdutosProps {
  data: Product[];
  addToCart: (produto: Product) => void;
}

export default function FiltrarProdutos({
  data,
  addToCart,
}: FiltrarProdutosProps) {
  const [pesquisa, setPesquisa] = useState("");
  const [ordenacao, setOrdenacao] = useState("nome-asc");
  const [produtosFiltrados, setProdutosFiltrados] = useState<Product[]>(data);

  useEffect(() => {
    let resultado = [...data].filter((produto) =>
      produto.title.toLowerCase().includes(pesquisa.toLowerCase())
    );

    switch (ordenacao) {
      case "nome-asc":
        resultado.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "nome-desc":
        resultado.sort((a, b) => b.title.localeCompare(a.title));
        break;
      case "preco-asc":
        resultado.sort((a, b) => a.price - b.price);
        break;
      case "preco-desc":
        resultado.sort((a, b) => b.price - a.price);
        break;
    }

    setProdutosFiltrados(resultado);
  }, [pesquisa, ordenacao, data]);

  return (
    <div>
      <PesquisarProdutos pesquisa={pesquisa} setPesquisa={setPesquisa} />

      <select
        value={ordenacao}
        onChange={(e) => setOrdenacao(e.target.value)}
      >
        <option value="nome-asc">Nome (A–Z)</option>
        <option value="nome-desc">Nome (Z–A)</option>
        <option value="preco-asc">Preço ↑</option>
        <option value="preco-desc">Preço ↓</option>
      </select>

      {produtosFiltrados.map((produto) => (
        <ProdutoCard
          key={produto.id}
          produto={produto}
          onAdd={addToCart}
        />
      ))}
    </div>
  );
}
