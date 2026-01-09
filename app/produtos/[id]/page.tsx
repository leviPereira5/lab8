"use client";
// Indica que este componente é executado no lado do cliente (browser)
// Necessário no Next.js para usar hooks e fazer requisições no cliente

import useSWR from "swr";
// Hook para fetch de dados com cache, revalidação e estados automáticos

import { useParams } from "next/navigation";
// Hook do Next.js para obter parâmetros dinâmicos da rota (ex: /produtos/[id])

import { Product } from "@/models/interfaces";
// Interface que define a estrutura de um produto

// Função responsável por buscar os dados da API
// Recebe uma URL e devolve os dados convertidos para JSON
const fetcher = (url: string) =>
  fetch(url).then(res => res.json());

// Página responsável por exibir os dados de um produto específico
export default function ProdutoPage() {

  // Obtém o parâmetro "id" da URL
  // Exemplo de rota: /produtos/3 → id = 3
  const { id } = useParams();

  // useSWR faz a requisição à API automaticamente
  // e gere os estados de carregamento, erro e cache
  const { data, error, isLoading } = useSWR<Product>(
    `https://deisishop.pythonanywhere.com/products/${id}`,
    fetcher
  );

  // Enquanto os dados estão a ser carregados
  if (isLoading) return <p>A carregar…</p>;

  // Caso ocorra algum erro na requisição
  if (error) return <p>Erro</p>;

  return (
    <div className="text-black space-y-4">
      {/* Container principal com espaçamento entre elementos */}

      <img
        src={data?.image}
        // URL da imagem do produto

        alt={data?.title}
        // Texto alternativo da imagem (acessibilidade)

        width={250}
        // Largura fixa da imagem
      />

      <h1>
        {data?.title}
      </h1>
      {/* Nome do produto */}

      <p>
        {data?.description}
      </p>
      {/* Descrição do produto */}
    </div>
  );
}
