import { create } from 'zustand';
import { router } from '@inertiajs/react';
import toast from "react-hot-toast";

interface VacationStoreProps {
    createVacation: (data: any, toggleModal: (state: boolean) => void) => void;
}

export const useVacationStore = create<VacationStoreProps>(() => ({
    createVacation: (data, toggleModal) => {
        router.post(route('user.vacations.store'), data, {
            onSuccess: () => {
                toast.success("مرخصی با موفقیت افزوده شد")
                toggleModal(false)
            },
        });
    },
}));
