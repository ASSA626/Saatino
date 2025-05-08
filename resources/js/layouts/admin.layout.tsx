import {Toaster} from "react-hot-toast";
import {ReactNode} from "react";
import Sidebar from "@/components/admin/sidebar.component";
import AnimationWrapper from "@/common/animation.common";
import MobileNav from "@/components/admin/mobile-nav.component";
import Header from "@/components/admin/header.component";

export default function AdminLayout({children}: Readonly<{children: ReactNode}>) {
    return (
        <main className="flex w-full h-screen">
            <Toaster />
            <Sidebar />

            <div className="flex size-full flex-col">
                <Header />

                <div className="flex h-16 items-center justify-between p-5 sm:p-8 md:hidden">
                    <img src="/static/icons/admin/logo.svg" alt="ساعتینو" width={30} height={30}/>

                    <div>
                        <MobileNav />
                    </div>
                </div>

                <AnimationWrapper>
                    {children}
                </AnimationWrapper>
            </div>
        </main>
    )
}
