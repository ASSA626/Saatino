import {ReactNode} from "react";
import {cn} from "@/lib/utils";

type TableInfoType = {
    count: number,
    title: string,
    className?: string,
    children?: Readonly<ReactNode>
}

export default function TableInfo({count, title, className, children}: TableInfoType) {
    return (
        <div className={cn("gap-[18px] flex p-4 transition-all border-2 border-blue-500 bg-blue-25 rounded-md", className)}>
            <figure className="flex items-center h-fit rounded-full bg-blue-100">
                <img src="/static/icons/admin/transaction.svg" alt="icon"/>
            </figure>

            <div className="flex w-full flex-1 flex-col justify-center gap-1">
                <div className="flex flex-1 items-center justify-between gap-2 overflow-hidden">
                    <h2 className="text-16 line-clamp-1 flex-1 font-bold text-blue-900">
                        {`${count === null ? "" : count}  ${title}`}
                    </h2>

                    <div className="flex items-center gap-2">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}
