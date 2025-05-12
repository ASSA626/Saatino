import TableInfo from "@/components/admin/table-info.component";
import Datatable from "@/common/datatable.common";
import Pagination from "@/common/pagination.common";
import AdminLayout from "@/layouts/admin.layout";
import StatusBadges from "@/components/shared/status-badges.component";
import {ClockType, PaginationType, SalaryType, UserType} from "@/types";
import {Button} from "@/components/ui/button";
import {useState} from "react";
import AddClock from "@/pages/admin/clocks/add-clock";
import EditClock from "@/pages/admin/clocks/edit-clock";
import ReportClocks from "@/pages/admin/clocks/report-clocks";
import SelectUserWrapper from "@/pages/admin/clocks/select-user";
import NoDataMessage from "@/components/shared/nodata-message.component";
import FiltersWrapper from "@/common/filters-wrapper.common";

type ClocksManagementListProps = {
    clocks: PaginationType<SalaryType> | null;
    clocks_count: number | null;
    user: UserType | null;
    report: any
}

export default function ClockManagement({clocks, clocks_count, user, report}: ClocksManagementListProps) {
    console.log(clocks)
    const [addClockState, setAddClockState] = useState<boolean>(false)
    const [editClockState, setEditClockState] = useState<boolean>(false)
    const [reportClockState, setReportClockState] = useState<boolean>(false)
    const [selectUserState, setSelectUserState] = useState<boolean>(false)
    const [clockFilterModal, setClockFilterModal] = useState<boolean>(false)

    const [editSelectedClock, setEditSelectedClock] = useState<ClockType | null>(null)

    const clocksTable = [
        {key: 'created_date', label: 'تاریخ ایجاد ساعت', formatDate: true},
        {key: 'user.name', label: 'ثبت کننده'},
        {key: 'start_clock', label: 'ساعت ورود', prefix: 'ساعت'},
        {key: 'left_clock', label: 'ساعت خروج', prefix: 'ساعت'},
        {key: 'time_value', label: 'مقدار کارکرد', formatTime: true},
        {key: 'worklog_status', label: 'وضعیت کارکرد ها', render: (value: string) => (<StatusBadges status={value}/>)},
        {
            key: 'delete_action',
            label: 'حذف',
            action: {
                label: 'حذف',
                onClick: () => alert("delete"),
            },
        },
        {
            key: 'update_action',
            label: 'ویرایش',
            action: {
                label: 'ویرایش',
                onClick: (row: Record<string, any>) => {
                    setEditSelectedClock(row as ClockType);
                    setEditClockState(true);
                },
            },
        },
    ]

    if (!user) {
        return (
            <AdminLayout>
                <SelectUserWrapper wrapperState={selectUserState} setWrapperState={setSelectUserState} />

                <div className="flex w-full flex-row max-xl:max-h-screen max-xl:overflow-y-scroll">
                    <div className="flex w-full flex-1 flex-col gap-8 px-5 sm:px-8 py-7 lg:py-12 xl:max-h-screen xl:overflow-y-scroll">
                        <div className="flex w-full flex-col gap-3.5">
                            <header className="flex items-center justify-between">
                                <h1 className="text-[20px] md:text-[24px] font-semibold text-gray-900">ساعت های ثبت شده</h1>

                                <div className="flex items-center gap-x-1.5 py-1.5 px-3.5 border border-dashed border-gray-400 rounded-md">
                                    <img src="/static/images/user-avatar.png" alt="user/admin" className="w-11 rounded-full"/>

                                    <div className="flex flex-col items-start gap-y-0.5">
                                        <p className="font-bold">شخصی انتخاب نشده</p>
                                    </div>

                                    <button className="pr-2 mr-3 border-r border-dashed border-gray-400 cursor-pointer"
                                            onClick={() => setSelectUserState(true)}>
                                        <img src="/static/icons/dark/dark-chevron-down-icon.svg" alt="arrow"/>
                                    </button>
                                </div>
                            </header>

                            <NoDataMessage message="هیچ کاربری برای ارائه گزارش انتخاب نشده"/>
                        </div>
                    </div>
                </div>
            </AdminLayout>
        );
    }

    return (
        <AdminLayout>
            <FiltersWrapper
                wrapperState={clockFilterModal}
                setWrapperState={setClockFilterModal}
                settings={{
                    showClockTypes: true,
                    showDateRange: true,
                    showWorklogStatuses: true
                }}
                route={`/admin/clocks/report/${user.id}`}
            />
            <ReportClocks reportClockState={reportClockState} setReportClockState={setReportClockState} startDate={report.start_date} endDate={report.end_date} totalTimeValue={report.total_time} user_id={user.id}/>
            <EditClock editClockState={editClockState} setEditClockState={setEditClockState} selectedClock={editSelectedClock}/>
            <SelectUserWrapper wrapperState={selectUserState} setWrapperState={setSelectUserState} />
            <AddClock addClockState={addClockState} setAddClockState={setAddClockState}/>

            <div className="flex w-full flex-row max-xl:max-h-screen max-xl:overflow-y-scroll">
                <div className="flex w-full flex-1 flex-col gap-8 px-5 sm:px-8 py-7 lg:py-12 xl:max-h-screen xl:overflow-y-scroll">
                    <div className="flex w-full flex-col gap-3.5">
                        <header className="flex items-center justify-between">
                            <h1 className="text-[20px] md:text-[24px] font-semibold text-gray-900">ساعت های ثبت شده</h1>

                            <div className="flex items-center gap-x-1.5 py-1.5 px-3.5 border border-dashed border-gray-400 rounded-md">
                                <img src={user.image !== null ? user.image : "/static/images/user-avatar.png"} alt={user.name} className="w-11 rounded-full"/>

                                <div className="flex flex-col items-start gap-y-0.5">
                                    <p className="font-bold">{user.name}</p>
                                    <p className="text-[12px]">{user.national_code}</p>
                                </div>

                                <button className="pr-2 mr-3 border-r border-dashed border-gray-400 cursor-pointer"
                                        onClick={() => setSelectUserState(true)}>
                                    <img src="/static/icons/dark/dark-chevron-down-icon.svg" alt="arrow"/>
                                </button>
                            </div>
                        </header>

                        <TableInfo count={clocks_count || 0} title="ساعت ثبت شده">
                            <button className="font-bold text-[#1775ef] flex items-center gap-x-1.5 cursor-pointer" onClick={() => setClockFilterModal(true)}>
                                <img src="/static/icons/admin/filter-lines.svg" alt="filter-icon" className="w-6"/>
                                فیلتر ها
                            </button>
                        </TableInfo>

                        {clocks && clocks.data && (
                            <>
                                <Datatable columns={clocksTable} data={clocks.data}/>

                                <div className="w-full flex justify-between items-center gap-x-3 border-t border-dashed border-gray-300 pt-5">
                                    {clocks.data.length > 0 && (
                                        <Pagination data={clocks} className="pt-0 border-none mt-0"/>
                                    )}

                                    <div className="flex items-center gap-x-3">
                                        <Button size="lg" className="bg-[#3a84e3] flex items-center gap-x-2 text-white hover:bg-[#1775ef] px-6" onClick={() => setAddClockState(true)}>
                                            <img src="/static/icons/light/light-plus-icon.svg" alt="plus icon" className="w-[24px]"/>
                                            افزودن ساعت
                                        </Button>

                                        <Button size="lg" className="bg-[#3a84e3] flex items-center gap-x-2 text-white hover:bg-[#1775ef] px-6" onClick={() => setReportClockState(true)}>
                                            <img src="/static/icons/admin/report.svg" alt="plus icon" className="w-[24px]"/>
                                            گزارشگیری
                                        </Button>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </AdminLayout>
    )
}
