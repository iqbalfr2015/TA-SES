import React from "react";

const Pagination = ({
    currentPage = 1,
    totalPages = 1,
    handlePageChange,
    startIndex = 0,
    entries = 5,
    filtered = [],
}) => {
    const filteredLength = filtered?.length || 0; // Jika undefined, default ke 0

    return (
        <div className="flex justify-between items-center mt-4 p-2">
            <p>
                Showing {filteredLength > 0 ? startIndex + 1 : 0} to{" "}
                {Math.min(startIndex + entries, filteredLength)} of{" "}
                {filteredLength} entries
            </p>
            <div className="flex gap-2">
                <button
                    className="px-4 py-2 border rounded disabled:opacity-50 hover:bg-gray-100 transition duration-300"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage <= 1}
                >
                    Prev
                </button>
                <span className="px-4 py-2 border rounded bg-gray-100">
                    Page {currentPage} of {totalPages}
                </span>
                <button
                    className="px-4 py-2 border rounded disabled:opacity-50 hover:bg-gray-100 transition duration-300"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage >= totalPages}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default Pagination;
