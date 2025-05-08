import {Link} from "@inertiajs/react";
import {cn} from "@/lib/utils";
import {adminSidebarLinks} from "@/constants";

export default function Sidebar() {
    return (
        <section className="static right-0 top-0 flex h-screen w-fit flex-col justify-between border-l border-gray-200 bg-white pt-8 text-white max-md:hidden sm:p-4 xl:p-6 2xl:w-[450px] xl:w-[350px]">
            <nav className="flex flex-col gap-4">
                <Link href="#" className="mb-12 flex cursor-pointer items-center gap-2">
                    <img src="/static/icons/admin/logo.svg" alt="ساعتینو" width={34} height={34} className="size-[34px] max-xl:size-14" />
                    <h1 className="2xl:text-[26px] text-[26px] font-bold text-zinc-800 max-xl:hidden">ساعتینو</h1>
                </Link>

                {adminSidebarLinks.map((item) => {
                    return (
                        <Link href={route(item.href)} key={item.label} className={cn("flex gap-3 items-center py-1 md:p-3 2xl:p-4 rounded-lg justify-center xl:justify-start relative font-semibold", { "bg-blue-500": route().current(item.href) })}>
                            <img
                                width={25}
                                src={item.icon}
                                alt={item.label}
                                className={cn({ "brightness-[3] invert-0": route().current(item.href) })}
                            />

                            <p className={cn("text-[16px] font-semibold text-zinc-700 max-xl:hidden", { "!text-white": route().current(item.href) })}>
                                {item.label}
                            </p>
                        </Link>
                    )
                })}
            </nav>
        </section>
    )
}
