import {navbarLinks} from "@/constants";
import {Link} from "@inertiajs/react";
import {Drawer, DrawerContent, DrawerTitle} from "@/components/ui/drawer";

type NavbarType = {
    navbarDialog: boolean,
    setNavbarDialog: (state: boolean) => void
}

export default function MobileNav({navbarDialog, setNavbarDialog}: NavbarType) {
    return (
        <Drawer open={navbarDialog} onOpenChange={setNavbarDialog}>
            <DrawerContent className="p-3">
                <DrawerTitle className="text-center text-2xl">تنظیمات کاربری</DrawerTitle>

                <div className="px-2.5 py-2 grid grid-cols-2 items-center mt-8 gap-4">
                    {
                        navbarLinks.map((link, i) => (
                            <Link
                                key={i}
                                href={route(link.href)}
                                className="flex flex-col items-center justify-center gap-y-3 p-5 border border-dashed border-gray-400 rounded-lg shadow-creditCard"
                            >
                                <img src={link.icon} alt="home icon" className="w-7" />
                                {link.label}
                            </Link>
                        ))
                    }
                </div>
            </DrawerContent>
        </Drawer>
    )
}
