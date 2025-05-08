import TableInfo from "@/components/admin/table-info.component";
import Datatable from "@/common/datatable.common";
import Pagination from "@/common/pagination.common";
import AdminLayout from "@/layouts/admin.layout";
import StatusBadges from "@/components/shared/status-badges.component";
import {PaginationType, VacationType} from "@/types";
import {useVacationsStore} from "@/stores/admin/useVacationsStore";
import FiltersWrapper from "@/common/filters-wrapper.common";
import {useState} from "react";

type SalariesListProps = {
    vacations: PaginationType<VacationType>;
    vacations_count: number
}

export default function VacationsList({vacations, vacations_count}: SalariesListProps) {
    const [vacationFilterModal, setVacationFilterModal] = useState<boolean>(false)
    const {deleteVacation} = useVacationsStore()

    const vacationsTable = [
        {key: 'user.name', label: 'درخواست دهنده'},
        {key: 'created_at', label: 'تاریخ ایجاد مرخصی', formatDate: true},
        {key: 'vacation_type', label: 'نوع مرخصی'},
        {key: 'start_date', label: 'از تاریخ', formatDate: true},
        {key: 'end_date', label: 'تا تاریخ', formatDate: true},
        {key: 'status', label: 'وضعیت', render: (value: string) => (<StatusBadges status={value}/>)},
        {
            key: 'delete_action',
            label: 'حذف',
            action: {
                label: 'حذف',
                onClick: () => alert("delete"),
            },
        },
    ];

    return (
        <AdminLayout>
            <FiltersWrapper
                wrapperState={vacationFilterModal}
                setWrapperState={setVacationFilterModal}
                settings={{
                    showDateRange: true,
                    showUsersList: true,
                    showVacationType: true,
                    showStatus: true
                }}
                route="/admin/vacations"
            />
            <div className="flex w-full flex-row max-xl:max-h-screen max-xl:overflow-y-scroll">
                <div
                    className="flex w-full flex-1 flex-col gap-8 px-5 sm:px-8 py-7 lg:py-12 xl:max-h-screen xl:overflow-y-scroll">
                    <div className="flex w-full flex-col gap-6">
                        <header className="flex items-center justify-between">
                            <h1 className="text-[20px] md:text-[24px] font-semibold text-gray-900">مرخصی های ثبت شده</h1>
                        </header>

                        <TableInfo count={vacations_count} title="مرخصی ثبت شده">
                            <button className="font-bold text-[#1775ef] flex items-center gap-x-1.5 cursor-pointer" onClick={() => setVacationFilterModal(true)}>
                                <img src="/static/icons/admin/filter-lines.svg" alt="filter-icon" className="w-6"/>
                                فیلتر ها
                            </button>
                        </TableInfo>

                        <Datatable columns={vacationsTable} data={vacations.data}/>
                        {vacations.data.length > 0 && (
                            <Pagination data={vacations}/>
                        )}
                    </div>
                </div>
            </div>
        </AdminLayout>
    )
}
