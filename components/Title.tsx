export default function Title({title, description}: {title: string; description: string}) {
  return (
    <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold">{title}</h1>
        <p className="text-gray-600">{description}</p>
    </div>
  );
}
