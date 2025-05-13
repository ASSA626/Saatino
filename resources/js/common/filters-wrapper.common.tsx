import DialogLayout from "@/layouts/dialog.layout";
import {Input, InputDatePicker} from "@/components/shared/input.components";
import SelectBox from "@/components/shared/select-box.component";
import {Button} from "@/components/ui/button";
import {FormEvent, useState} from "react";
import {useFilterStore} from "@/stores/shared/useFiltersStore";
import {useForm, usePage} from "@inertiajs/react";
import {UserType} from "@/types";
import {cn} from "@/lib/utils";
import {Swiper, SwiperSlide} from "swiper/react";

type FiltersSettingsType = {
    showDateRange?: boolean;
    showStatus?: boolean;
    showVacationType?: boolean;
    showUsersList?: boolean;
    showWorklogStatuses?: boolean;
    showClockTypes?: boolean;
}

type FiltersWrapperProps = {
    wrapperState: boolean;
    setWrapperState: (state: boolean) => void;
    settings: FiltersSettingsType;
    route: string
}

type UsePageProps = {
    users: UserType[]
}

export default function FiltersWrapper({wrapperState, setWrapperState, settings, route}: FiltersWrapperProps) {
    const {setFilters, applyFilters} = useFilterStore();
    const {users} = usePage<UsePageProps>().props;
    const [selectedUserId, setSelectedUserId] = useState<number>(0)

    const {data, setData} = useForm({
        start_date: '',
        left_date: '',
        vacation_type: '',
        clock_type: '',
        worklogs_type: '',
        status: '',
        user_id: 0,
    });

    const handleUserSelect = (id: number) => {
        setSelectedUserId(id);
        setData("user_id", id)
    }

    const handleFilter = (e: FormEvent) => {
        e.preventDefault();
        setFilters(data)
        applyFilters(route);
        setWrapperState(false);
    };

    const statusOpt = [
        {title: "تایید شده", url_data: "confirmed"},
        {title: "تایید نشده", url_data: "unconfirmed"},
        {title: "درحال تایید", url_data: "confirming"},
    ]

    const clockTypesOpt = [
        {title: "ساعت دفتری (عادی)", url_data: "official"},
        {title: "کار در منزل", url_data: "homework"},
        {title: "ساعت ماموریت", url_data: "mission"},
    ]

    const worklogStatusesOpt = [
        {title: "درحال ثبت", url_data: "inserting"},
        {title: "ثبت شده", url_data: "inserted"},
        {title: "ثبت نشده", url_data: "uninserted"},
        {title: "ناقص", url_data: "uncompleted"},
    ]

    const vacationTypesOpt = [
        {title: "بدون حقوق", url_data: "بدون حقوق"},
        {title: "ساعتی", url_data: "ساعتی"},
        {title: "استحقاقی", url_data: "استحقاقی"},
        {title: "استعلاجی", url_data: "استعلاجی"},
    ]

    return (
        <DialogLayout state={wrapperState} setState={setWrapperState} title="فیلتر کردن اطلاعات">
            <form onSubmit={handleFilter} className="flex flex-col gap-y-4 mt-2">
                {settings.showUsersList && (
                    <>
                        <p className="text-center">فیلتر براساس کاربر:</p>
                        <div className="grid grid-cols-3 gap-x-2 border-b border-dashed border-gray-400 pb-4">
                            {users.map((user, i) => (
                                <div
                                    key={i}
                                    className={cn(
                                        "flex flex-col items-center gap-y-2 py-4 px-4 border-2 border-zinc-300 rounded-lg cursor-pointer h-full", {
                                            "border-green-500": user.id === selectedUserId
                                        }
                                    )}
                                    onClick={() => handleUserSelect(user.id)}
                                >
                                    <img
                                        src={user.image !== null ? user.image : "/static/images/user-avatar.png"}
                                        alt={user.name}
                                        className="w-16 h-16 rounded-full object-cover"
                                    />
                                    <div className="flex flex-col gap-y-1.5 text-center">
                                        <p>{user.name}</p>
                                        <p className="text-[13px]">{user.national_code}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                )}

                {settings.showDateRange && (
                    <div className="flex items-center gap-x-2 border-b border-dashed border-gray-400 pb-4">
                        <InputDatePicker id="start_time" label="از تاریخ" value={data.start_date}
                               onChange={(formattedDate) => setData("start_date", formattedDate)}/>
                        <InputDatePicker id="left_date" label="تا تاریخ" value={data.left_date}
                               onChange={(formattedDate) => setData("left_date", formattedDate)}/>
                    </div>
                )}

                {settings.showStatus && (
                    <SelectBox
                        title="فیلتر برحسب وضعیت"
                        options={statusOpt}
                        value={data.status}
                        onChange={(value) => setData("status", value)}
                        labelKey="title"
                        valueKey="url_data"
                    />
                )}

                {settings.showClockTypes && (
                    <SelectBox
                        title="فیلتر برحسب نوع ساعت"
                        options={clockTypesOpt}
                        value={data.clock_type}
                        onChange={(value) => setData("clock_type", value)}
                        labelKey="title"
                        valueKey="url_data"
                    />
                )}

                {settings.showWorklogStatuses && (
                    <SelectBox
                        title="فیلتر برحسب وضعیت کارکرد"
                        options={worklogStatusesOpt}
                        value={data.worklogs_type}
                        onChange={(value) => setData("worklogs_type", value)}
                        labelKey="title"
                        valueKey="url_data"
                    />
                )}

                {settings.showVacationType && (
                    <SelectBox
                        title="فیلتر برحسب نوع مرخصی"
                        options={vacationTypesOpt}
                        value={data.vacation_type}
                        onChange={(value) => setData("vacation_type", value)}
                        labelKey="title"
                        valueKey="url_data"
                    />
                )}

                <Button size="xl" type="submit"
                        className="bg-[#3a84e3] py-2.5 text-white hover:bg-[#1775ef] w-full mt-2">
                    فیلتر کردن
                </Button>
            </form>
        </DialogLayout>
    )
}
