"use client";
// Indica que este componente é executado no cliente (browser)
// Necessário no Next.js para usar eventos, lógica condicional e interações

import Link from "next/link";
// Componente do Next.js para navegação entre páginas
// Permite transições rápidas sem recarregar a página

import { Product } from "@/models/interfaces";
// Interface que define a estrutura de um produto

// Interface que define as props do componente ProdutoCard
interface ProdutoCardProps {
  produto: Product;
  // Produto a ser exibido no card

  onAdd?: (produto: Product) => void;
  // Função opcional chamada ao adicionar o produto ao carrinho

  onRemove?: (id: number) => void;
  // Função opcional chamada ao remover o produto do carrinho

  isCart?: boolean;
  // Indica se o card está a ser usado no contexto do carrinho
  // true  -> mostra botão "Remover"
  // false -> mostra botões "Adicionar" e "+ info"
}

// Componente que exibe as informações de um produto num card
export default function ProdutoCard({
  produto,
  onAdd,
  onRemove,
  isCart = false, // Valor padrão: false
}: ProdutoCardProps) {
  return (
    <div
      className="border rounded-xl p-4 shadow-sm hover:shadow-md transition flex flex-col text-black"
    >
      {/* Container principal do card com estilos e efeito hover */}

      <img
        src={`https://deisishop.pythonanywhere.com${produto.image}`}
        // URL da imagem do produto (base + caminho vindo da API)

        alt={produto.title}
        // Texto alternativo para acessibilidade

        className="h-40 object-contain mb-4"
        // Altura fixa da imagem e ajuste proporcional
      />

      <h3 className="font-semibold text-lg mb-2">
        {produto.title}
      </h3>
      {/* Nome do produto */}

      <p className="mb-4">
        {produto.price} €
      </p>
      {/* Preço do produto */}

      {/* Renderização condicional:
          Se NÃO estiver no carrinho (isCart === false) */}
      {!isCart ? (
        <div className="mt-auto flex gap-2">
          {/* Container dos botões quando não está no carrinho */}

          <button
            onClick={() => onAdd?.(produto)}
            // Chama a função onAdd apenas se ela existir (optional chaining)

            className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Adicionar
          </button>
          {/* Botão para adicionar o produto ao carrinho */}

          <Link
            href={`/produtos/${produto.id}`}
            // Navega para a página de detalhes do produto

            className="flex-1 text-center border border-blue-600 text-blue-600 py-2 rounded hover:bg-blue-50 transition"
          >
            + info
          </Link>
          {/* Link para ver mais informações do produto */}
        </div>
      ) : (
        /* Caso o card esteja no carrinho (isCart === true) */
        <button
          onClick={() => onRemove?.(produto.id)}
          // Chama a função onRemove apenas se existir

          className="mt-auto bg-red-500 text-white py-2 rounded hover:bg-red-600 transition"
        >
          Remover do carrinho
        </button>
      )}
    </div>
  );
}
