
function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
    return (
        <div className="flex justify-center items-center m-6 mt-10 space-x-4 text-xs">
            {/* Previous Button */}
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="w-8 h-8 flex justify-center items-center bg-gray-200 hover:bg-gray-300 rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
            >
                &lt;
            </button>

            {/* Current Page Info */}
            <span className="text-sm font-medium">
                Page {currentPage} of {totalPages}
            </span>

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

