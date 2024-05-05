
// [1, 2, 3, 4, 5, ..., 60]
export const generatePaginationNumbers = (currentPage: number, totalPages: number) => {
    //if the total number of pages is 7 or less
    //Show all pages without ... 
    if (totalPages <= 7) {
        return Array.from({ length: totalPages }, (_, i) => i + 1);  // [1, 2, 3, 4, 5, 6, 7]
    }

    // if current page is between the three first, ... , and two last
    if (currentPage <= 3) {
        return [1, 2, 3, '...', totalPages - 1, totalPages]; // [1, 2, 3, ..., 59, 60]
    }

    // if the current page is between last three pages.
    // Show the two first, ..., the last three

    if (currentPage >= totalPages - 2) {
        return [1, 2, '...', totalPages - 2, totalPages - 1, totalPages];
    }

    // If the current page is another position 
    // Show firs page, ..., current page and neighborhoods
    return [
        1,
        '...',
        currentPage - 1,
        currentPage,
        '...',
        totalPages
    ]
}