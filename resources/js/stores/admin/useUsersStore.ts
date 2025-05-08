import {router} from "@inertiajs/react";
import {create} from "zustand/react";
import toast from "react-hot-toast";

type UsersStoreProps = {
    createUser: (data: any, toggleModal: (state: boolean) => void) => void;
    updateUser: (id: number, data: any, toggleModal: (state: boolean) => void) => void;
    deleteUser: (id: number, callback?: () => void) => void;
}

export const useUserStore = create<UsersStoreProps>(() => ({
    createUser: (data, toggleModal) => {
        router.post(route('users.store'), data, {
            onSuccess: () => {
                toast.success("کاربر با موفقیت ایجاد شد");
                toggleModal(false)
            },
            onError: (errors) => {
                Object.values(errors).forEach((error) => {
                    toast.error(error as string);
                });
            }
        });
    },

    updateUser: (id, data, toggleModal) => {
        router.put(route('users.update', id), data, {
            onSuccess: () => {
                toast.success("کاربر با موفقیت بروزرسانی شد");
                toggleModal(false)
            },
            onError: (errors) => {
                Object.values(errors).forEach((error) => {
                    toast.error(error as string);
                });
            }
        });
    },

    deleteUser: (id, callback) => {
        router.delete(route('users.destroy', id), {
            onSuccess: () => {
                toast.success("کاربر با موفقیت حذف شد");
                if (callback) callback();
            },
            onError: () => {
                toast.error("خطا در حذف کاربر");
            }
        });
    },
}));
