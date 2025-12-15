"use client";


interface PesquisarProdutosProps {
    pesquisa: string;
    setPesquisa: (value: string) => void;
}

export default function PesquisarProdutos({ pesquisa, setPesquisa }: PesquisarProdutosProps) {

    return (
        <input
            value={pesquisa}
            onChange={(evento) => setPesquisa(evento.target.value)}
            placeholder="Pesquisar produtos"
            className="border rounded px-3 py-2 text-black"
        />
    )
}