"use client";
// Indica que este componente é executado no cliente (browser)
// Necessário no Next.js para permitir uso de eventos e estados

// Interface que define as props recebidas pelo componente PesquisarProdutos
interface PesquisarProdutosProps {
    pesquisa: string; 
    // Texto atual da pesquisa (controlado pelo componente pai)

    setPesquisa: (value: string) => void;
    // Função responsável por atualizar o estado da pesquisa
}

// Componente responsável pelo campo de pesquisa
export default function PesquisarProdutos({ pesquisa, setPesquisa }: PesquisarProdutosProps) {

    return (
        <input
            value={pesquisa}
            // Define o input como "controlado":
            // o valor exibido vem diretamente do estado do componente pai

            onChange={(evento) => setPesquisa(evento.target.value)}
            // Sempre que o utilizador escreve no input:
            // 1. O evento é disparado
            // 2. Capturamos o novo valor digitado
            // 3. Atualizamos o estado 'pesquisa' no componente pai

            placeholder="Pesquisar produtos"
            // Texto exibido quando o campo está vazio

            className="border rounded px-3 py-2 text-black"
            // Classes Tailwind para estilização:
            // - border: adiciona uma borda
            // - rounded: cantos arredondados
            // - px-3 py-2: espaçamento interno
            // - text-black: cor do texto
        />
    );
}
