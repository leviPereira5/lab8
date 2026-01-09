"use client";
// Indica que este componente é executado no lado do cliente (browser)
// Necessário no Next.js para permitir navegação programática e interações

import { Product } from "@/models/interfaces";
// Interface que define a estrutura de um produto

import { useRouter } from "next/navigation";
// Hook do Next.js que permite navegação programática (ex: voltar, redirecionar)

// Interface que define as props recebidas pelo componente ProdutoDetalhe
interface ProdutoDetalheProps {
  produto: Product;
  // Produto cujos detalhes serão exibidos
}

// Componente responsável por exibir os detalhes completos de um produto
export default function ProdutoDetalhe({ produto }: ProdutoDetalheProps) {

  // Inicializa o router para controlar a navegação
  const router = useRouter();

  return (
    <div className="text-black max-w-3xl mx-auto p-6 space-y-6">
      {/* Container principal:
          - texto preto
          - largura máxima
          - centralizado na página
          - espaçamento interno e entre elementos */}

      <button
        onClick={() => router.push("/produtos")}
        // Ao clicar, o utilizador é redirecionado para a lista de produtos
        // router.push faz a navegação sem recarregar a página

        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition shadow-sm font-medium"
      >
        Voltar à lista
      </button>
      {/* Botão de navegação para regressar à lista de produtos */}

      <div className="flex justify-center">
        {/* Container que centraliza a imagem do produto */}

        <img
          src={`https://deisishop.pythonanywhere.com${produto.image}`}
          // URL completa da imagem do produto (API + caminho da imagem)

          alt={produto.title}
          // Texto alternativo da imagem (acessibilidade)

          className="max-h-96 object-contain rounded shadow"
          // Define tamanho máximo, mantém proporção e adiciona estilo visual
        />
      </div>

      <h1 className="text-2xl font-bold text-center">
        {produto.title}
      </h1>
      {/* Nome do produto em destaque */}

      <p className="text-center text-gray-800">
        {produto.description}
      </p>
      {/* Descrição completa do produto */}

      <div className="flex justify-center gap-4 text-center">
        {/* Informações adicionais organizadas horizontalmente */}

        <span className="font-medium">
          Categoria: {produto.category}
        </span>

        <span className="font-semibold text-green-600">
          Preço: {produto.price} €
        </span>
      </div>

      <p className="text-yellow-600 text-center">
        {produto.rating.rate} ({produto.rating.count} avaliações)
      </p>
      {/* Avaliação do produto:
          - Nota média
          - Número total de avaliações */}
    </div>
  );
}
