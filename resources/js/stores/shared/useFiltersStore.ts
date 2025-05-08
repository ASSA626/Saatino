import {create} from 'zustand';
import {router} from '@inertiajs/react';

interface FilterState {
    filters: {
        start_date: string;
        left_date: string;
        status: string;
        vacation_type: string;
    };
    setFilters: (filters: FilterState['filters']) => void;
    applyFilters: (route: string) => void;
}

export const useFilterStore = create<FilterState>((set, get) => ({
    filters: {
        start_date: '',
        left_date: '',
        status: '',
        vacation_type: '',
        clock_type: '',
        worklogs_type: '',
    },
    setFilters: (filters) => set({filters}),
    applyFilters: (route) => {
        const {filters} = get();
        router.get(route, filters, {preserveState: true, preserveScroll: true});
    },
}));
