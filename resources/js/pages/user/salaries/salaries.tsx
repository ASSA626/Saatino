import UserLayout from "@/layouts/user.layout";
import {useState} from "react";
import StatusBadges from "@/components/shared/status-badges.component";
import FiltersWrapper from "@/common/filters-wrapper.common";
import AddSalary from "@/pages/user/salaries/add-salay";
import Datatable from "@/common/datatable.common";
import Pagination from "@/common/pagination.common";
import {PaginationType, SalaryType} from "@/types";
import AddCar from "@/pages/user/salaries/add-car";

type SalariesPageProps = {
    salaries: PaginationType<SalaryType>;
}

export default function SalariesList({salaries}: SalariesPageProps) {
    const [createSalary, setCreateSalary] = useState<boolean>(false)
    const [filterSalariesState, setFilterSalariesState] = useState<boolean>(false)
    const [createCarSalary, setCreateCarSalary] = useState<boolean>(false)

    const salariesTable = [
        {key: 'created_at', label: 'تاریخ ثبت تنخواه', formatDate: true},
        {key: 'title', label: 'عنوان'},
        {key: 'count', label: 'تعداد'},
        {key: 'value', label: 'مقدار واحد', suffix: 'تومان'},
        {key: 'total', label: 'مبلغ کل', suffix: 'تومان'},
        {key: 'status', label: 'وضعیت', render: (value: string) => (<StatusBadges status={value}/>)},
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
            <AddSalary createSalaryState={createSalary} setCreateSalaryState={setCreateSalary}/>
            <AddCar createCarSalaryState={createCarSalary} setCreateCarSalaryState={setCreateCarSalary}/>

            <FiltersWrapper
                wrapperState={filterSalariesState}
                setWrapperState={setFilterSalariesState}
                settings={{
                    showDateRange: true,
                    showStatus: true,
                }}
                route="/salaries"
            />

            <section className="md:flex md:items-start md:justify-center md:container md:mt-16 md:gap-x-4">
                <section className="bg-[#3a84e3] w-full px-3 py-4 md:rounded-2xl md:w-[40%] md:h-[480px]">
                    <div className="flex flex-col items-center gap-y-1 text-white my-4">
                        <div className="text-center md:mt-5 md:mb-36">
                            <p className="text-4xl font-bold mt-7">6,200,000 تومان</p>
                            <p className="text-[13px] md:text-[15px] mt-3 md:mt-6">تنخواه ثبت شده در این ماه</p>
                        </div>

                        <div className="w-full grid grid-cols-3 items-center justify-center gap-x-4 mt-11">
                            <div className="flex flex-col items-center gap-y-2">
                                <button type="button" className="bg-[#669fec] p-3.5 md:p-3 rounded-full"
                                        onClick={() => setFilterSalariesState(true)}>
                                    <img src="/static/icons/light/light-setting-icon.svg" alt="plus icon"
                                         className="w-8"/>
                                </button>

                                <p className="text-[15px]">فیلتر تنخواه ها</p>
                            </div>

                            <div className="flex flex-col items-center gap-y-2">
                                <button type="button" className="bg-white p-3.5 md:p-3 rounded-full"
                                        onClick={() => setCreateSalary(true)}>
                                    <img src="/static/icons/dark/dark-plus-icon.svg" alt="plus icon" className="w-8"/>
                                </button>

                                <p className="text-[15px]">افزودن تنخواه</p>
                            </div>

                            <div className="flex flex-col items-center gap-y-2">
                                <button type="button" className="bg-[#669fec] p-3.5 md:p-3 rounded-full"
                                        onClick={() => setCreateCarSalary(true)}>
                                    <img src="/static/icons/light/light-car-icon.svg" alt="plus icon" className="w-8"/>
                                </button>

                                <p className="text-[15px]">خودرویی</p>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="bg-white w-full px-3 max-md:py-4 max-md:mt-4">
                    <Datatable columns={salariesTable} data={salaries.data}/>
                    <Pagination data={salaries}/>
                </section>
            </section>
        </UserLayout>
    )
}
