import UserLayout from "@/layouts/user.layout";
import AddVacation from "@/pages/user/vacations/add-vacation";
import FiltersWrapper from "@/common/filters-wrapper.common";
import {useState} from "react";
import {PaginationType, VacationType} from "@/types";
import Datatable from "@/common/datatable.common";
import StatusBadges from "@/components/shared/status-badges.component";
import Pagination from "@/common/pagination.common";

type VacationsPageProps = {
    vacations: PaginationType<VacationType>;
}

export default function VacationsList({vacations}: VacationsPageProps) {
    const [createVacationState, setCreateVacationState] = useState<boolean>(false)
    const [filterVacationsState, setFilterVacationsState] = useState<boolean>(false)

    const vacationsTable = [
        {key: 'created_at', label: 'تاریخ ثبت مرخصی', formatDate: true},
        { key: 'start_date', label: 'از تاریخ', formatDate: true},
        { key: 'end_date', label: 'تا تاریخ', formatDate: true},
        { key: 'vacation_type', label: 'نوع مرخصی' },
        { key: 'status', label: 'وضعیت', render: (value: string) => (<StatusBadges status={value}/>) },
        {
            key: 'view_action',
            label: 'توضیحات',
            action: {
                label: 'مشاهده',
                onClick: () => alert("hi"),
            },
        },
    ];

    return (
        <UserLayout>
            <AddVacation
                createVacationState={createVacationState}
                setCreateVacationState={setCreateVacationState}
            />

            <FiltersWrapper
                wrapperState={filterVacationsState}
                setWrapperState={setFilterVacationsState}
                settings={{
                    showDateRange: true,
                    showStatus: true,
                    showVacationType: true
                }}
                route="/user/vacations"
            />

            <section className="md:flex md:items-start md:justify-center md:container md:mt-16 md:gap-x-4">
                <section className="bg-[#3a84e3] w-full px-3 py-4 md:rounded-2xl md:w-[40%] md:h-[480px]">
                    <div className="flex flex-col items-center gap-y-1 text-white my-4">
                        <div className="text-center md:mt-5 md:mb-36">
                            <p className="text-4xl font-bold mt-7">18 روز و 23 ساعت</p>
                            <p className="text-[13px] md:text-[15px] mt-3 md:mt-6">مرخصی های استفاده شده در این ماه</p>
                        </div>

                        <div className="w-full grid grid-cols-2 items-center justify-center gap-x-4 mt-11">
                            <div className="flex flex-col items-center gap-y-2">
                                <button type="button" className="bg-white p-3.5 md:p-3 rounded-full" onClick={() => setCreateVacationState(true)}>
                                    <img src="/static/icons/dark/dark-plus-icon.svg" alt="plus icon" className="w-8" />
                                </button>

                                <p className="text-[15px]">ثبت مرخصی</p>
                            </div>

                            <div className="flex flex-col items-center gap-y-2">
                                <button type="button" className="bg-[#669fec] p-3.5 md:p-3 rounded-full" onClick={() => setFilterVacationsState(true)}>
                                    <img src="/static/icons/light/light-setting-icon.svg" alt="plus icon" className="w-8" />
                                </button>

                                <p className="text-[15px]">فیلتر مرخصی ها</p>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="bg-white w-full px-3 max-md:py-4 max-md:mt-4">
                    <Datatable columns={vacationsTable} data={vacations.data} />
                    <Pagination data={vacations} />
                </section>
            </section>
        </UserLayout>
    )
}
