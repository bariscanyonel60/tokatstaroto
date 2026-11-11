export default function Loading() {
  return (
    <div role="status" aria-live="polite" className="flex min-h-[70svh] items-center justify-center">
      <span className="sr-only">Sayfa yükleniyor</span>
      <span aria-hidden="true" className="block h-px w-40 overflow-hidden bg-line">
        <span className="loading-bar block h-full w-full bg-accent" />
      </span>
    </div>
  );
}
