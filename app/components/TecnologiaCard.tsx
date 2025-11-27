interface TecnologiaCardProps{
    title : string
    image : string
}

export default function TecnologiaCard({ title, image }: TecnologiaCardProps) {
    return (
        <div className="w-40 h-48 bg-gray-100 p-4 m-2 rounded-lg flex flex-col items-center justify-center shadow-md">
            <img src={image} alt={title} className="w-16 h-16 mb-2" />
            <h3 className="text-center font-semibold">{title}</h3>
        </div>
    );
}
