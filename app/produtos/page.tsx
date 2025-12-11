"use client";

import { Product } from "@/models/interfaces";
import useSWR from "swr";
import FiltrarProdutos from "@/app/components/FiltrarProdutos";


export default function ProdutosPage() {
  const fetcher = async (url: string) => {
    const resposta = await fetch(url);
    if (!resposta.ok) {
      throw new Error(`Erro: ${resposta.status} ${resposta.statusText}`);
    }
    return resposta.json();
  };

  const url = "https://deisishop.pythonanywhere.com/products/";
  const { data, error, isLoading } = useSWR<Product[]>(url, fetcher);

  if (error) return <p>{error.message}</p>;
  if (isLoading) return <p>A descarregar dados…</p>;
  if (!data) return <p>Não há produtos</p>;

  return (
    <>
      <h2>Produtos</h2>
      <FiltrarProdutos data={data} />
    </>
  );
}
