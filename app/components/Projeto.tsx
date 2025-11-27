interface ProjetoProps {
    nome: string;
    url: string;
}

export function Projeto({ nome, url }: ProjetoProps) {
    return (
        <div className="mb-2">
            <p>
                Confira meu projeto <strong>{nome}</strong> aqui:{' '}
                <a href={url} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                    {url}
                </a>
            </p>
        </div>
    );
}
