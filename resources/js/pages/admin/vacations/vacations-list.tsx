import TableInfo from "@/components/admin/table-info.component";
import Datatable from "@/common/datatable.common";
import Pagination from "@/common/pagination.common";
import AdminLayout from "@/layouts/admin.layout";
import StatusBadges from "@/components/shared/status-badges.component";
import {PaginationType, UserType, VacationType} from "@/types";
import {useVacationsStore} from "@/stores/admin/useVacationsStore";
import FiltersWrapper from "@/common/filters-wrapper.common";
import {FormEvent, useState} from "react";
import {Button} from "@/components/ui/button";
import toast from "react-hot-toast";
import {convertPersianToGregorian} from "@/lib/persianToGregorianConverter";

type SalariesListProps = {
    vacations: PaginationType<VacationType>;
    vacations_count: number;
    filters: any
}

export default function VacationsList({vacations, vacations_count, filters}: SalariesListProps) {
    const [vacationFilterModal, setVacationFilterModal] = useState<boolean>(false)
    const [vacationReportCaption, setVacationReportCaption] = useState<boolean>(false)

    const {deleteVacation, getVacationExport} = useVacationsStore()

    const vacationsTable = [
        {key: 'user.name', label: 'درخواست دهنده'},
        {key: 'created_at', label: 'تاریخ ایجاد مرخصی', formatDate: true},
        {key: 'vacation_type', label: 'نوع مرخصی'},
        {key: 'start_date', label: 'از تاریخ', formatDate: true},
        {key: 'end_date', label: 'تا تاریخ', formatDate: true},
        {
            key: 'status',
            label: 'وضعیت',
            render: (value: string, row: Record<string, any>) => (
                <StatusBadges
                    status={value}
                    statuses={['unconfirmed', 'confirmed', 'confirming']}
                    route={route('admin.vacation.changeStatus', row.id)}
                    id={row.id}
                    reportCaptionState={vacationReportCaption}
                    setReportCaptionState={setVacationReportCaption}
                />
            )
        },
        {
            key: 'export_action',
            label: 'چاپ',
            action: {
                label: 'چاپ مرخصی',
                onClick: (row: Record<string, any>) => getVacationExport(row.id),
            },
        },
        {
            key: 'delete_action',
            label: 'حذف',
            action: {
                label: 'حذف',
                onClick: (row: Record<string, any>) => deleteVacation(row.id),
            },
        },
    ];

    const handleExportClick = (e: FormEvent) => {
        if (!filters?.user_id) {
            e.preventDefault();
            toast.error('ابتدا یک کاربر از بخش فیلتر ها انتخاب کنید');
        }
    };

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

                        <div className="w-full flex items-center gap-x-3 border-t border-dashed border-gray-300 pt-3">
                            {vacations.data.length > 0 && (
                                <Pagination data={vacations} className="pt-0 mt-0 border-none"/>
                            )}
                            <a
                                href={filters?.user_id ? route('export.vacations', {user_id: filters?.user_id, start_date: convertPersianToGregorian(filters?.start_date), end_date: convertPersianToGregorian(filters?.end_date)}) : '#'}
                                onClick={handleExportClick}
                                className="h-9 py-2 px-5 rounded-sm bg-[#3a84e3] flex items-center justify-center gap-x-1.5 text-white hover:bg-[#1775ef] text-sm"
                            >
                                <img
                                    src="/static/icons/admin/report.svg"
                                    alt="plus icon"
                                    className="w-[22px]"
                                />
                                گزارشگیری
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    )
}
