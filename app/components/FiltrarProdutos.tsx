"use client"; 
// Indica que este componente é executado no cliente (browser)
// Necessário para usar hooks como useState e useEffect no Next.js

import { useEffect, useState } from "react";
// Importa hooks do React para gerir estado e efeitos colaterais

import { Product } from "@/models/interfaces";
// Interface que define a estrutura de um produto (id, title, price, etc.)

import PesquisarProdutos from "./PesquisaProduto";
// Componente responsável pelo campo de pesquisa

import ProdutoCard from "./ProdutoCard";
// Componente que representa visualmente um produto individual

// Interface que define as props recebidas pelo componente FiltrarProdutos
interface FiltrarProdutosProps {
  data: Product[]; // Lista de produtos recebida do componente pai
  addToCart: (produto: Product) => void; // Função para adicionar produto ao carrinho
}

// Componente responsável por filtrar, ordenar e exibir os produtos
export default function FiltrarProdutos({
  data,
  addToCart,
}: FiltrarProdutosProps) {

  // Estado que guarda o texto digitado pelo utilizador na pesquisa
  const [pesquisa, setPesquisa] = useState("");

  // Estado que guarda o tipo de ordenação selecionado
  // Valor inicial: ordenação por nome (A–Z)
  const [ordenacao, setOrdenacao] = useState("nome-asc");

  // Estado que guarda a lista final de produtos
  // (após aplicar filtro e ordenação)
  const [produtosFiltrados, setProdutosFiltrados] = useState<Product[]>(data);

  // useEffect executa sempre que pesquisa, ordenacao ou data mudam
  useEffect(() => {

    // Cria uma cópia da lista original de produtos
    // e filtra os produtos com base no texto pesquisado
    let resultado = [...data].filter((produto) =>
      produto.title.toLowerCase().includes(pesquisa.toLowerCase())
    );

    // Aplica a ordenação conforme a opção selecionada
    switch (ordenacao) {

      // Ordenação por nome (A–Z)
      case "nome-asc":
        resultado.sort((a, b) => a.title.localeCompare(b.title));
        break;

      // Ordenação por nome (Z–A)
      case "nome-desc":
        resultado.sort((a, b) => b.title.localeCompare(a.title));
        break;

      // Ordenação por preço (menor para maior)
      case "preco-asc":
        resultado.sort((a, b) => a.price - b.price);
        break;

      // Ordenação por preço (maior para menor)
      case "preco-desc":
        resultado.sort((a, b) => b.price - a.price);
        break;
    }

    // Atualiza o estado com a lista filtrada e ordenada
    setProdutosFiltrados(resultado);

  }, [pesquisa, ordenacao, data]); 
  // Dependências do useEffect:
  // sempre que um destes valores mudar, o efeito será reexecutado

  return (
    <div className="space-y-6">
      {/* Container principal com espaçamento vertical */}

      <div className="flex flex-col sm:flex-row gap-4 items-center">
        {/* Área da pesquisa e da ordenação */}

        {/* Componente de pesquisa */}
        <PesquisarProdutos
          pesquisa={pesquisa}       // Valor atual da pesquisa
          setPesquisa={setPesquisa} // Função para atualizar a pesquisa
        />

        {/* Select para escolher a ordenação */}
        <select
          value={ordenacao} // Valor atual da ordenação
          onChange={(e) => setOrdenacao(e.target.value)} // Atualiza o estado ao mudar
          className="border rounded px-3 py-2"
        >
          <option value="nome-asc">Nome (A–Z)</option>
          <option value="nome-desc">Nome (Z–A)</option>
          <option value="preco-asc">Preço ↑</option>
          <option value="preco-desc">Preço ↓</option>
        </select>
      </div>

      {/* Grelha de produtos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {produtosFiltrados.map((produto) => (
          <ProdutoCard
            key={produto.id} // Chave única para o React
            produto={produto} // Produto a ser exibido
            onAdd={addToCart} // Função para adicionar ao carrinho
          />
        ))}
      </div>
    </div>
  );
}
