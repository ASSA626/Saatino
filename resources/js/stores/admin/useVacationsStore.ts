import {create} from "zustand";
import toast from "react-hot-toast";
import {router} from "@inertiajs/react";

type VacationsStoreProps = {
    deleteVacation: (id: number) => void;
}

export const useVacationsStore = create<VacationsStoreProps>((set) => ({
    deleteVacation: (id) => {
        router.delete(route('leaves.destroy', id), {
            onSuccess: () => {
                toast.success("مرخصی با موفقیت حذف شد");
            },
            onError: () => {
                toast.error("خطایی در حذف مرخصی وجود دارد");
            }
        });
    },
}));
