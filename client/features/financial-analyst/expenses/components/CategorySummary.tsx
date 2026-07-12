export default function CategorySummary({ byCategory }: { byCategory: Array<{ category: string; total: number }> }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
      {byCategory.map((c) => (
        <div key={c.category} className="rounded-xl border border-border bg-card p-4">
          <p className="text-xs text-muted-foreground mb-1">{c.category}</p>
          <p className="text-lg font-display font-semibold">₹{c.total.toLocaleString()}</p>
        </div>
      ))}
    </div>
  );
}
