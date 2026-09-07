function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
    // Generate a simple range of page numbers with ellipsis
    const getPageNumbers = () => {
        const pages: (number | string)[] = [];

        if (totalPages <= 5) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            pages.push(1);
            if (currentPage > 3) pages.push('...');

            for (let i = Math.max(currentPage - 1, 2); i <= Math.min(currentPage + 1, totalPages - 1); i++) {
                pages.push(i);
            }

            if (currentPage < totalPages - 2) pages.push('...');
            pages.push(totalPages);
        }

        return pages;
    };

    if (totalPages <= 1) return null;

    const arrow =
        'flex h-9 w-9 items-center justify-center border border-ink-200 text-ink-700 transition hover:border-ink-900 hover:text-ink-900 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-ink-200 disabled:hover:text-ink-700';

    return (
        <div className="mb-8 mt-16 flex items-center justify-center gap-1.5 text-xs">
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                aria-label="Previous page"
                className={arrow}
            >
                &lsaquo;
            </button>

            {getPageNumbers().map((page, index) => {
                if (page === '...') {
                    return (
                        <span key={index} className="px-1 text-ink-400">
                            …
                        </span>
                    );
                }
                const active = currentPage === Number(page);
                return (
                    <button
                        key={index}
                        onClick={() => onPageChange(Number(page))}
                        aria-current={active ? 'page' : undefined}
                        className={`flex h-9 w-9 items-center justify-center border text-xs transition ${
                            active
                                ? 'border-ink-900 bg-ink-900 text-white'
                                : 'border-ink-200 text-ink-700 hover:border-ink-900 hover:text-ink-900'
                        }`}
                    >
                        {page}
                    </button>
                );
            })}

            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                aria-label="Next page"
                className={arrow}
            >
                &rsaquo;
            </button>
        </div>
    );
}

export default Pagination;
