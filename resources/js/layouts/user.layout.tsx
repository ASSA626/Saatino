import AnimationWrapper from "@/common/animation.common";
import {cn} from "@/lib/utils";
import {ReactNode} from "react";
import MobileHeader from "@/components/user/mobile-header.component";
import Navbar from "@/components/user/navbar.component";
import {Toaster} from "react-hot-toast";

type UserLayoutProps = {
    children: ReactNode;
    className?: string;
}

export default function UserLayout({className, children}: UserLayoutProps) {
    return (
        <AnimationWrapper>
            <main className={cn("flex flex-col w-full container", className)}>
                <Toaster />
                <div className="size-full">
                    <MobileHeader />
                    <Navbar />
                </div>

                {children}
            </main>
        </AnimationWrapper>
    )
}
