export default function Loading() {
  return (
    <div
      className="flex min-h-[50vh] items-center justify-center"
      role="status"
      aria-label="Loading"
    >
      <span className="h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-indigo-600" />
      <span className="sr-only">Loading...</span>
    </div>
  );
}