export function PageHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <section className="bg-church-brown py-20 text-white text-center">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">{title}</h1>
        {subtitle && <p className="text-church-ivory/70 text-lg max-w-2xl mx-auto">{subtitle}</p>}
      </div>
    </section>
  );
}
