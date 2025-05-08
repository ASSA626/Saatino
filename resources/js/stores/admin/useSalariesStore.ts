import {create} from "zustand";
import {router} from "@inertiajs/react";
import toast from "react-hot-toast";

type SalariesStoreProps = {
    deleteSalary: (id: number) => void;
}

export const useSalariesStore = create<SalariesStoreProps>(() => ({
    deleteSalary: (id) => {
        router.delete(route('salaries.destroy', id), {
            onSuccess: () => {
                toast.success("تنخواه با موفقیت حذف شد");
            },
            onError: () => {
                toast.error("خطا در حذف تنخواه");
            }
        });
    }
}));
