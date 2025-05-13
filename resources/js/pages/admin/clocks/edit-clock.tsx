import DialogLayout from "@/layouts/dialog.layout";
import {Input, InputClock, InputDatePicker} from "@/components/shared/input.components";
import SelectBox from "@/components/shared/select-box.component";
import {Button} from "@/components/ui/button";
import {FormEvent, useState} from "react";
import calculateDiffTime from "@/lib/calculateDiffTime";
import {useForm} from "@inertiajs/react";

type EditClockProps = {
    editClockState: boolean;
    setEditClockState: (state: boolean) => void;
    selectedClock: any
}

type WorklogAddClockType = {
    project_id: number;
    project_title: string;
    time_value: number;
}

export default function EditClock({editClockState, setEditClockState, selectedClock}: EditClockProps) {
    const [remainingTime, setRemainingTime] = useState<number>(0);
    const [worklogs, setWorklogs] = useState<WorklogAddClockType[]>([]);
    const [currentWorklog, setCurrentWorklog] = useState<WorklogAddClockType>({
        project_id: 0,
        project_title: '',
        time_value: 0,
    })

    const projects = [
        {id: 1, title: "پروژه اول"},
        {id: 2, title: "پروژه دوم"},
        {id: 3, title: "پروژه سوم"}
    ];

    const clockStatuses = [
        {title: "کارکرد وارد شده", status: "inserted"},
        {title: "کارکرد وارد نشده", status: "uninstructed"},
        {title: "در انتظار کارکرد ها", status: "inserting"},
        {title: "کارکرد ناقص است", status: "uncompleted"},
    ]

    const {data, setData, put, processing, errors, reset} = useForm({
        clock: {
            user_id: 1,
            created_date: '',
            clock_status: '',
            start_clock: '',
            left_clock: '',
            time_value: 0
        },
        worklogs: [] as WorklogAddClockType[]
    });

    const handleClockChange = (field: string, value: string) => {
        const updatedClock = {...data.clock, [field]: value};

        if (updatedClock.start_clock && updatedClock.left_clock) {
            const timeDiff = calculateDiffTime(
                updatedClock.start_clock,
                updatedClock.left_clock
            );

            updatedClock.time_value = timeDiff;
            setRemainingTime(timeDiff);
        }

        setData('clock', updatedClock);
    }

    const handleProjectChange = (value: string) => {
        const selectedProject = projects.find(p => p.id === parseInt(value));
        setCurrentWorklog({
            ...currentWorklog,
            project_id: parseInt(value),
            project_title: selectedProject?.title || ''
        });
    };

    const handleAddWorklog = () => {
        if (!currentWorklog.project_title || currentWorklog.time_value <= 0 ||
            currentWorklog.time_value > remainingTime) {
            return;
        }

        const newWorklogs = [...worklogs, currentWorklog];
        setWorklogs(newWorklogs);
        setData('worklogs', newWorklogs);

        setRemainingTime(prev => prev - currentWorklog.time_value);

        setCurrentWorklog({
            project_id: 0,
            project_title: '',
            time_value: 0
        });
    }

    const handleRemoveWorklog = (index: number) => {
        const worklogToRemove = worklogs[index];
        const newWorklogs = worklogs.filter((_, i) => i !== index);

        setWorklogs(newWorklogs);
        setData('worklogs', newWorklogs);

        setRemainingTime(prev => prev + worklogToRemove.time_value);
    }

    const handleUpdateClock = (e: FormEvent) => {
        e.preventDefault()
        put(route('admin.updateClock', selectedClock?.id), {
            onSuccess: () => {
                reset();
                setWorklogs([]);
                setRemainingTime(0);
                setEditClockState(false);
            }
        })
    }

    return (
        <DialogLayout state={editClockState} setState={setEditClockState} title="ویرایش ساعت">
            <form onSubmit={handleUpdateClock} className="max-md:mt-4">
                <p className="my-2 py-2 px-5 border border-dashed border-gray-500 rounded-full mb-6 text-center">
                    {remainingTime >= 60
                        ? `${Math.floor(remainingTime / 60).toString().padStart(2, '0')}:${(remainingTime % 60).toString().padStart(2, '0')} ساعت`
                        : `${remainingTime} دقیقه`}
                </p>

                <div className="flex flex-col items-center gap-y-3">
                    <div className="flex items-center gap-x-2 w-full pb-4 mt-2">
                        <InputDatePicker
                            id="created_date"
                            label="تاریخ ساعت"
                            value={data.clock.created_date}
                            onChange={(formattedDate) => handleClockChange('created_date',formattedDate)}
                        />

                        <SelectBox
                            title="وضعیت ساعت"
                            options={clockStatuses}
                            value={data.clock.clock_status}
                            onChange={(value) => handleClockChange('clock_status', value)}
                            labelKey="title"
                            valueKey="status"
                        />
                    </div>

                    <div className="flex items-center gap-x-2 w-full pb-4 mt-2">
                        <InputClock
                            id="start_clock"
                            label="ساعت ورود"
                            value={data.clock.start_clock}
                            onChange={(e) => handleClockChange('start_clock', e.target.value)}
                        />

                        <InputClock
                            id="left_clock"
                            label="ساعت خروج"
                            value={data.clock.left_clock}
                            onChange={(e) => handleClockChange('left_clock', e.target.value)}
                        />
                    </div>

                    <div className="flex flex-col gap-x-2 w-full border-t border-dashed border-gray-400 pt-6">
                        <div className="flex items-center gap-x-2 w-full">
                            <SelectBox
                                title="پروژه"
                                options={projects}
                                value={currentWorklog.project_id.toString()}
                                onChange={handleProjectChange}
                                labelKey="title"
                                valueKey="id"
                            />

                            <Input
                                id="time_value"
                                label="مقدار کارکرد"
                                value={currentWorklog.time_value || ''}
                                onChange={(e) => setCurrentWorklog({
                                    ...currentWorklog,
                                    time_value: parseInt(e.target.value) || 0
                                })}
                            />
                        </div>

                        <Button
                            type="button"
                            size="xl"
                            className="bg-[#3a84e3] flex items-center gap-x-2 text-white hover:bg-[#1775ef] mt-4"
                            onClick={handleAddWorklog}
                        >
                            <img src="/static/icons/light/light-plus-icon.svg" alt="plus icon" className="w-[26px]"/>
                            ثبت کارکرد
                        </Button>
                    </div>
                </div>

                <div
                    className="w-full grid grid-cols-2 justify-between mb-3 mt-4 gap-3 border border-gray-300 p-3 rounded-xl">
                    {worklogs.map((worklog, index) => (
                        <div key={index} className="border border-dashed border-gray-300 rounded-lg p-3 relative">
                            <p className="text-center text-[12px] font-bold">{worklog.project_title}</p>
                            <p className="text-center font-bold mt-2">
                                {worklog.time_value >= 60
                                    ? `${Math.floor(worklog.time_value / 60).toString().padStart(2, '0')}:${(worklog.time_value % 60).toString().padStart(2, '0')} ساعت`
                                    : `${worklog.time_value} دقیقه`}
                            </p>
                            <button
                                type="button"
                                className="absolute bg-red-500 rounded-full p-1.5 -bottom-1 -left-1 flex items-center justify-center text-white gap-x-1 mt-2 text-sm cursor-pointer"
                                onClick={() => handleRemoveWorklog(index)}
                            >
                                <img src="/static/icons/light/light-trash-icon.svg" alt="trash icon" className="w-5"/>
                            </button>
                        </div>
                    ))}
                </div>

                <div className="pt-3 border-t border-dashed border-gray-400">
                    <Button
                        type="submit"
                        size="xl"
                        className="bg-[#3a84e3] flex items-center gap-x-2 text-white hover:bg-[#1775ef] w-full"
                    >
                        <img src="/static/icons/light/light-plus-icon.svg" alt="plus icon" className="w-[26px]"/>
                        ویرایش ساعت
                    </Button>
                </div>
            </form>
        </DialogLayout>
    )
}
