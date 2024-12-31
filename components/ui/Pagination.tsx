function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
    // Generate a simple range of page numbers with ellipsis
    const getPageNumbers = () => {
        const pages = [];

        // Show the first page, current page, and last page
        if (totalPages <= 5) {
            // If there are 5 or fewer pages, just show all of them
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            // Always show the first and last page
            pages.push(1);
            if (currentPage > 3) pages.push('...');

            // Show a range around the current page
            for (let i = Math.max(currentPage - 1, 2); i <= Math.min(currentPage + 1, totalPages - 1); i++) {
                pages.push(i);
            }

            if (currentPage < totalPages - 2) pages.push('...');
            pages.push(totalPages);
        }

        return pages;
    };

    return (
        <div className="flex justify-center items-center m-6 mt-10 mb-20 space-x-4 text-xs">
            {/* Previous Button */}
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="w-8 h-8 flex justify-center items-center bg-gray-200 hover:bg-gray-300 rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
            >
                &lt;
            </button>

            {/* Page Numbers */}
            <div className="flex space-x-2">
                {getPageNumbers().map((page, index) => {
                    if (page === '...') {
                        return <span key={index} className="text-gray-500">...</span>;
                    }
                    return (
                        <button
                            key={index}
                            onClick={() => onPageChange(Number(page))}
                            className={`w-8 h-8 flex justify-center items-center ${currentPage === Number(page) ? 'bg-black text-white' : 'bg-gray-200 hover:bg-gray-300'} rounded-full`}
                        >
                            {page}
                        </button>
                    );
                })}
            </div>

            {/* Next Button */}
            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="w-8 h-8 flex justify-center items-center bg-gray-200 hover:bg-gray-300 rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
            >
                &gt;
            </button>
        </div>
    );
}

export default Pagination;
