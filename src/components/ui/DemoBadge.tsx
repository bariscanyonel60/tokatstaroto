/** Gerçek işletme fotoğrafı olmayan görsellerde zorunlu etiket */
export function DemoBadge({ label = "Demo görsel" }: { label?: string }) {
  return <span className="demo-badge">{label}</span>;
}
