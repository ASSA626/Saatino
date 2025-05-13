import TableInfo from "@/components/admin/table-info.component";
import Datatable from "@/common/datatable.common";
import Pagination from "@/common/pagination.common";
import AdminLayout from "@/layouts/admin.layout";
import {PaginationType, SalaryType} from "@/types";
import StatusBadges from "@/components/shared/status-badges.component";
import {useSalariesStore} from "@/stores/admin/useSalariesStore";
import {useState} from "react";
import FiltersWrapper from "@/common/filters-wrapper.common";

type SalariesListProps = {
    salaries: PaginationType<SalaryType>;
    salaries_count: number
}

export default function SalariesList({salaries, salaries_count}: SalariesListProps) {
    const [salariesFilterModal, setSalariesFilterModal] = useState<boolean>(false)
    const {deleteSalary} = useSalariesStore()

    const salariesTable = [
        {key: 'user.name', label: 'ثبت کننده'},
        {key: 'created_at', label: 'تاریخ ایجاد تنخواه', formatDate: true},
        {key: 'title', label: 'عنوان تنخواه'},
        {key: 'value', label: 'مقدار واحد', suffix: "تومان"},
        {key: 'count', label: 'تعداد', suffix: "عدد"},
        {key: 'total', label: 'مبلغ کل', suffix: "تومان"},
        {key: 'status', label: 'وضعیت', render: (value: string, row: Record<string, any>) => (<StatusBadges status={value} statuses={['unconfirmed', 'confirmed', 'confirming']} route={route('admin.vacation.changeStatus', row.id)}/>)},
        {
            key: 'delete_action',
            label: 'حذف',
            action: {
                label: 'حذف',
                onClick: (row: Record<string, any>) => deleteSalary(row.id),
            },
        },
    ];

    return (
        <AdminLayout>
            <FiltersWrapper
                wrapperState={salariesFilterModal}
                setWrapperState={setSalariesFilterModal}
                settings={{
                    showStatus: true,
                    showDateRange: true,
                    showUsersList: true
                }}
                route="/admin/salaries"
            />

            <div className="flex w-full flex-row max-xl:max-h-screen max-xl:overflow-y-scroll">
                <div
                    className="flex w-full flex-1 flex-col gap-8 px-5 sm:px-8 py-7 lg:py-12 xl:max-h-screen xl:overflow-y-scroll">
                    <div className="flex w-full flex-col gap-6">
                        <header className="flex items-center justify-between">
                            <h1 className="text-[20px] md:text-[24px] font-semibold text-gray-900">کارکنان شما</h1>
                        </header>

                        <TableInfo count={salaries_count} title="تنخواه ثبت شده">
                            <button className="font-bold text-[#1775ef] flex items-center gap-x-1.5 cursor-pointer" onClick={() => setSalariesFilterModal(true)}>
                                <img src="/static/icons/admin/filter-lines.svg" alt="filter-icon" className="w-6"/>
                                فیلتر ها
                            </button>
                        </TableInfo>

                        <Datatable columns={salariesTable} data={salaries.data}/>
                        {salaries.data.length > 0 && (
                            <Pagination data={salaries}/>
                        )}
                    </div>
                </div>
            </div>
        </AdminLayout>
    )
}
