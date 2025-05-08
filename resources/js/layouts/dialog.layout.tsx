import {ReactNode} from "react";
import {Drawer, DrawerContent, DrawerTitle} from "@/components/ui/drawer";
import {Dialog, DialogContent, DialogTitle} from "@/components/ui/dialog";
import {useMediaQuery} from "react-responsive";

type DialogLayoutProps = {
    children: ReactNode;
    state: boolean;
    setState: (state: boolean) => void;
    title: string;
}

export default function DialogLayout({children, state, setState, title}: DialogLayoutProps) {
    const mobileSize = useMediaQuery({ maxWidth: "546px" })

    if (mobileSize) {
        return (
            <Drawer open={state} onOpenChange={setState}>
                <DrawerContent className="py-5 px-3">
                    <DrawerTitle className="text-center text-2xl">{title}</DrawerTitle>
                    {children}
                </DrawerContent>
            </Drawer>
        )
    }
    return (
        <Dialog open={state} onOpenChange={setState}>
            <DialogContent>
                <DialogTitle className="text-center text-2xl font-bold mt-4">{title}</DialogTitle>
                {children}
            </DialogContent>
        </Dialog>
    )
}
