import {create} from "zustand/react";
import {router} from "@inertiajs/react";
import {ClockType, WorklogType} from "@/types";
import shouldCloseModal from "@/lib/shouldCloseModal";

interface UserClockStoreProps {
    currentClock: ClockType | null;
    worklogs: WorklogType[];
    remainingTime: number;
    isModalOpen: boolean;
    setInitialData: (data: Partial<UserClockStoreProps>) => void;
    startClock: () => void;
    endClock: () => void;
    addWorklog: (clockId: number, projectId: number, timeValue: number) => void;
    removeWorklog: (worklogId: number) => void;
    toggleModal: (open: boolean) => void;
}

export const useClockStore = create<UserClockStoreProps>((set) => ({
    currentClock: null,
    worklogs: [],
    remainingTime: 0,
    projects: [],
    isModalOpen: false,

    setInitialData: (data) => set((state) => {
        const isModalOpen = shouldCloseModal(data.currentClock ?? state.currentClock, state.isModalOpen);
        if (isModalOpen) {
            setTimeout(() => {
                set({isModalOpen: false});
            }, 5000);
        }
        return {
            ...state,
            ...data,
            isModalOpen: isModalOpen ? true : state.isModalOpen,
        };
    }),

    startClock: () => {
        router.post(route('clock.start'), {}, {
            onSuccess: (page) => {
                const {clock} = page.props as any;
                set({currentClock: clock});
            },
        });
    },

    endClock: () => {
        router.post(route('clock.end'), {}, {
            onSuccess: (page) => {
                const {clock, worklogs, remainingTime} = page.props as any;
                set({
                    currentClock: clock,
                    worklogs,
                    remainingTime,
                    isModalOpen: true,
                });
            },
        });
    },

    addWorklog: (clockId, projectId, timeValue) => {
        router.post(route('worklog.add'), {
            clock_id: clockId,
            time_value: timeValue,
            project_id: projectId
        }, {
            onSuccess: (page) => {
                const {worklog, remainingTime} = page.props as any;
                set((state) => ({
                    worklogs: [...state.worklogs, worklog],
                    remainingTime,
                }));
            },
        });
    },

    removeWorklog: (worklogId) => {
        router.delete(route('worklog.remove', {worklog: worklogId}), {
            onSuccess: (page) => {
                const {remainingTime} = page.props as any;
                set((state) => ({
                    worklogs: state.worklogs.filter((w) => w.id !== worklogId),
                    remainingTime,
                }));
            },
        });
    },

    toggleModal: (open) => set({isModalOpen: open}),
}));
