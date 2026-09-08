import { Loader2 } from "lucide-react";

export default function PageLoader({ label = "Loading..." }: { label?: string }) {
  return (
    <div className="flex min-h-[50vh] items-center justify-center" role="status">
      <Loader2 className="h-8 w-8 animate-spin text-indigo-600" aria-hidden="true" />
      <span className="sr-only">{label}</span>
    </div>
  );
}