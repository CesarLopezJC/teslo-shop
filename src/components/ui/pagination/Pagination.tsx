'use client';
import clsx from "clsx";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5";
import { generatePaginationNumbers } from '../../../utils/generatePaginationNumbers';

interface Props {
    totalPages: number;
}

export const Pagination = ({ totalPages }: Props) => {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const pageString = searchParams.get('page') ?? 1;
    let currentPage = isNaN(+pageString) ? 1 : +pageString;

    if (currentPage < 0) currentPage = 1;
    // let currentPage = (
    //     (Number(searchParams.get('page')) === 0 ? 1 : Number(searchParams.get('page')))
    //     ?? 1);

    const allPages = generatePaginationNumbers(currentPage, totalPages);



    const createPageUrl = (pageNumber: number | string) => {
        const params = new URLSearchParams(searchParams);

        if (pageNumber === '...') {
            return `${pathname}?${params.toString()}`;
        }


        if ((Number(pageNumber) <= 0)) {
            return `${pathname}`;//href="/kid";
        }

        if (Number(pageNumber) > totalPages) {
            return `${pathname}?${params.toString()}`; //return the same
        }

        params.set('page', pageNumber.toString());
        return `${pathname}?${params.toString()}`;
    }



    return (
        <div className="flex text-center justify-center mt-10 mb-32 ">
            <nav aria-label="Page navigation example">
                <ul className="flex list-style-none">
                    <li className="page-item">
                        <Link
                            className="page-link relative block py-1.5 px-3  border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
                            href={createPageUrl(currentPage - 1)}>
                            <IoChevronBackOutline size={30} />
                        </Link>
                    </li>

                    {
                        allPages.map((page, index) => (
                            <li key={page + '-' + index} className="page-item">
                                <a
                                    className={
                                        clsx(
                                            "page-link relative block py-1.5 px-3  border-0 outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none",
                                            {
                                                'bg-blue-600 shadow-sm text-white hover:bg-blue-700 hover:text-white': page === currentPage
                                            }
                                        )
                                    }

                                    href={createPageUrl(page)}>
                                    {page}
                                </a>
                            </li>
                        ))
                    }



                    <li className="page-item">
                        <Link
                            className="page-link relative block py-1.5 px-3  border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
                            href={createPageUrl(currentPage + 1)}>
                            <IoChevronForwardOutline size={30} />
                        </Link>
                    </li>
                </ul>
            </nav>
        </div >
    )
}
