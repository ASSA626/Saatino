import {create} from "zustand";
import toast from "react-hot-toast";
import {router} from "@inertiajs/react";

interface SalaryStoreProps {
    createSalary: (data: any, toggleModal: (state: boolean) => void) => void
}

export const useSalaryStore = create<SalaryStoreProps>(() => ({
    createSalary: (data, toggleModal) => {
        router.post(route('user.salaries.store'), data, {
            onSuccess: () => {
                toast.success("تنخواه با موفقیت افزوده شد")
                toggleModal(false)
            },
        });
    }
}))
