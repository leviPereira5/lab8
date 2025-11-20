export default function MagiaDoJSX(){

    const magia = <strong>HTML dentro do JavaSript!</strong>
    const tecnologias = "React e Next.js"

    return(
        <div className = 'bg-blue-300 p-3 m-3 rounded-xl'>
            <p>Este é o meu componente magiaDoJSX</p>
            <p>Um componente é uma função que retorna JSX -  {magia}</p>
            <p>Os componentes sãp usados em  {tecnologias}</p>
        </div>
    )

}