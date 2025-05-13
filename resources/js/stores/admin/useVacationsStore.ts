import {create} from "zustand";
import toast from "react-hot-toast";
import {router} from "@inertiajs/react";

type VacationsStoreProps = {
    deleteVacation: (id: number) => void;
    getVacationExport: (id: number) => void;
    setReportCaption: (id: number, caption: string, toggleModal: (state: boolean) => void) => void;
}

export const useVacationsStore = create<VacationsStoreProps>((set) => ({
    deleteVacation: (id) => {
        router.delete(route('admin.vacations.destroy', id), {
            onSuccess: () => {
                toast.success("مرخصی با موفقیت حذف شد");
            },
        });
    },
    getVacationExport: (id) => {
        window.location.href = route('export.vacation', {vacation_id: id});
    },
    setReportCaption: (id, caption, toggleModal) => {
        router.post(route('admin.vacation.updateReportCaption', id), {report_caption: caption}, {
            onSuccess: () => {
                toast.success("علت تایید نشدن مرخصی با موفقیت ثبت شد")
                toggleModal(false)
            }
        })
    }
}));
