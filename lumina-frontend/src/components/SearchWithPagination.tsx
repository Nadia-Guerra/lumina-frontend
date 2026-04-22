'use client';

interface SearchWithPaginationProps {
  brands: string[];
  value: string;
  onChange: (v: string) => void;
  activeBrand: string | null;
  onBrandChange: (b: string | null) => void;
  page: number;
  totalPages: number;
  onPageChange: (p: number) => void;
}

export default function SearchWithPagination({
  brands,
  value,
  onChange,
  activeBrand,
  onBrandChange,
  page,
  totalPages,
  onPageChange,
}: SearchWithPaginationProps) {

  function buildPages(): (number | '...')[] {
    if (totalPages <= 4) return Array.from({ length: totalPages }, (_, i) => i + 1);
    const pages: (number | '...')[] = [1, 2];
    if (page > 3 && page < totalPages - 1) {
      pages.push('...', page, '...');
    } else {
      pages.push('...');
    }
    pages.push(totalPages - 1, totalPages);
    return pages;
  }

  const pages = buildPages();

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-right">
        <div className="center min-w-[350px] max-w-xs">
          <input
            id="product-search-input"
            type="text"
            placeholder="Buscar por nombre o marca"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-[#F297A0]/30 bg-[#FFF0EA] text-sm text-gray-700 placeholder-gray-400 outline-none focus:ring-2 focus:ring-[#F297A0]/40 transition"
          />
        </div>

        <div className="flex items-center ml-auto flex-|">
          <button
            id="pagination-prev"
            onClick={() => onPageChange(Math.max(1, page - 1))}
            disabled={page === 1}
            className="w-8 h-8 rounded-lg border border-[#F297A0]/40 flex items-center justify-center text-[#F297A0] text-sm font-bold hover:bg-[#F297A0]/10 disabled:opacity-40 disabled:cursor-not-allowed transition"
            aria-label="Página anterior"
          >
            ‹
          </button>

          {pages.map((p, i) =>
            p === '...' ? (
              <span key={`ellipsis-${i}`} className="w-8 h-8 flex items-center justify-center text-gray-400 text-sm">
                …
              </span>
            ) : (
              <button
                key={p}
                id={`pagination-page-${p}`}
                onClick={() => onPageChange(p as number)}
                className={`w-8 h-8 rounded-lg border text-sm font-semibold transition ${
                  page === p
                    ? 'bg-[#F297A0] border-[#F297A0] text-white shadow-sm'
                    : 'border-[#F297A0]/30 text-gray-600 hover:bg-[#F297A0]/10'
                }`}
              >
                {p}
              </button>
            )
          )}

          <button
            id="pagination-next"
            onClick={() => onPageChange(Math.min(totalPages, page + 1))}
            disabled={page === totalPages}
            className="w-8 h-8 rounded-lg border border-[#F297A0]/40 flex items-center justify-center text-[#F297A0] text-sm font-bold hover:bg-[#F297A0]/10 disabled:opacity-40 disabled:cursor-not-allowed transition"
            aria-label="Página siguiente"
          >
            ›
          </button>
        </div>
      </div>

      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {brands.map((b) => (
          <button
            key={b}
            id={`brand-chip-${b.replace(/\s+/g, '-').toLowerCase()}`}
            onClick={() => onBrandChange(activeBrand === b ? null : b)}
            className={`flex-shrink-0 px-3 py-1 rounded-full text-xs font-medium border transition whitespace-nowrap ${
              activeBrand === b
                ? 'bg-[#F297A0] border-[#F297A0] text-white shadow-sm'
                : 'bg-white border-[#F297A0]/40 text-gray-600 hover:bg-[#F297A0]/10'
            }`}
          >
            {b}
          </button>
        ))}
      </div>
    </div>
  );
}
