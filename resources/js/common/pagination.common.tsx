import {ArrowBigLeftDash, ArrowBigRightDash} from "lucide-react";
import {router} from '@inertiajs/react';
import {cn} from '@/lib/utils';

type PaginationLink = {
    url: string | null;
    label: string;
    active: boolean;
};

type PaginationData = {
    current_page: number;
    links: PaginationLink[];
    next_page_url: string | null;
    prev_page_url: string | null;
    total: number;
    last_page: number;
};

type PaginationProps = {
    data: PaginationData;
    showPageNumber?: boolean;
    className?: string;
};

export default function Pagination({data, showPageNumber = false, className = ""}: PaginationProps) {
    const {links, next_page_url, prev_page_url, current_page, total, last_page} = data;

    const handlePageClick = (url: string | null) => {
        if (url) {
            router.get(url, {}, {preserveState: true, preserveScroll: true});
        }
    };

    const prevLink = links.find(link => link.label === 'قبلی');
    const nextLink = links.find(link => link.label === 'بعدی');

    return (
        <div className={cn("flex items-center gap-x-2.5 mt-4 border-t border-dashed border-gray-300 pt-5", className)}>
            <button
                className={cn("py-1.5 px-4 font-bold border-2 rounded-lg flex items-center gap-x-1 text-sm",
                    prev_page_url
                        ? "border-bankGradient text-bankGradient hover:bg-blue-50"
                        : "border-gray-200 text-gray-400 cursor-not-allowed"
                )}
                onClick={() => handlePageClick(prev_page_url)}
                disabled={!prev_page_url}
            >
                <ArrowBigRightDash/>
                قبلی
            </button>

            {
                showPageNumber && (
                    <div className="flex gap-x-1">
                        {
                            links
                                .filter(link => link.label !== 'قبلی' && link.label !== 'بعدی') // فقط اعداد
                                .map((link, index) => (
                                    <button
                                        key={index}
                                        className={cn("px-2.5 py-1.5 font-bold border-2 rounded-lg",
                                            link.active
                                                ? "border-bankGradient text-bankGradient bg-blue-50"
                                                : "border-gray-300 text-gray-500 hover:bg-gray-100",
                                            !link.url && "cursor-not-allowed text-gray-400 border-gray-200"
                                        )}
                                        onClick={() => handlePageClick(link.url)}
                                        disabled={!link.url}
                                    >
                                        {link.label}
                                    </button>
                                ))
                        }
                    </div>
                )
            }

            <button
                className={cn("py-1.5 px-4 font-bold border-2 rounded-lg flex items-center gap-x-1 text-sm",
                    next_page_url
                        ? "border-bankGradient text-bankGradient hover:bg-blue-50"
                        : "border-gray-200 text-gray-400 cursor-not-allowed"
                )}
                onClick={() => handlePageClick(next_page_url)}
                disabled={!next_page_url}
            >
                بعدی
                <ArrowBigLeftDash/>
            </button>
        </div>
    );
};
