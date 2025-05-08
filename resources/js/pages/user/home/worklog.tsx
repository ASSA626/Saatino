import DialogLayout from "@/layouts/dialog.layout";
import SelectBox from "@/components/shared/select-box.component";
import {Input, InputClock} from "@/components/shared/input.components";
import {Button} from "@/components/ui/button";
import {useForm} from "@inertiajs/react";
import {ClockType, WorklogType} from "@/types";
import {useClockStore} from "@/stores/user/useClockStore";
import {FormEvent} from "react";
import convertTimeToMinutes from "@/lib/convertTimeToMin";

type UserWorkDialogType = {
    workDialog: boolean;
    setWorkDialog: (state: boolean) => void;
    clock: ClockType;
    worklog: WorklogType[];
    remainingTime: number;
    projects: any[]
}

type WorklogForm = {
    time_value: string,
    project: string
}

export default function Worklog({workDialog, setWorkDialog, clock, worklog, remainingTime, projects}: UserWorkDialogType) {
    const {addWorklog, removeWorklog} = useClockStore();

    const {data, setData, reset, processing} = useForm<WorklogForm>({
        time_value: '',
        project: ''
    })

    const handleAddWorklog = (e: FormEvent) => {
        e.preventDefault()
        addWorklog(clock.id, parseInt(data.project), convertTimeToMinutes(data.time_value))
        reset()
    };

    return (
        <DialogLayout state={workDialog} setState={setWorkDialog} title="ثبت کارکرد ها">
            <form onSubmit={handleAddWorklog} className="max-md:mt-4">
                <div className="flex flex-col items-center gap-y-3">
                   <p className="my-2 py-2 px-5 border border-dashed border-gray-500 rounded-full w-full text-center">
                       {remainingTime >= 60
                           ? `${Math.floor(remainingTime / 60).toString().padStart(2, '0')}:${(remainingTime % 60).toString().padStart(2, '0')} ساعت`
                           : `${remainingTime} دقیقه`}
                   </p>

                    <div className="flex items-center gap-x-2 w-full">
                        <InputClock
                            id="time_value"
                            label="میزان کارکرد"
                            value={data.time_value}
                            onChange={(e) => setData("time_value", e.target.value)}
                        />

                        <SelectBox
                            title="انتخاب پروژه"
                            options={projects}
                            value={data.project}
                            onChange={(value) => setData('project', value)}
                            labelKey="title"
                            valueKey="id"
                        />
                    </div>
                </div>

                <div className="w-full grid grid-cols-2 justify-between mb-3 mt-4 gap-3 border border-gray-300 p-3 rounded-xl">
                    {worklog.map((item, i) => (
                        <div key={i} className="border border-dashed border-gray-300 rounded-lg p-3 relative">
                            <p className="text-center text-[12px] font-bold">{item.project.title}</p>
                            <p className="text-center font-bold mt-2">
                                {item.time_value >= 60
                                    ? `${Math.floor(item.time_value / 60).toString().padStart(2, '0')}:${(item.time_value % 60).toString().padStart(2, '0')} ساعت`
                                    : `${item.time_value} دقیقه`}
                            </p>

                            <button
                                type="button"
                                className="absolute bg-red-500 rounded-full p-1.5 -bottom-1 -left-1 flex items-center justify-center text-white gap-x-1 mt-2 text-sm cursor-pointer"
                                onClick={() => removeWorklog(item.id)}
                            >
                                <img src="/static/icons/light/light-trash-icon.svg" alt="trash icon" className="w-5"/>
                            </button>
                        </div>
                    ))}
                </div>

                <Button size="xl" className="bg-[#3a84e3] flex items-center gap-x-2 text-white hover:bg-[#1775ef] w-full mt-2" disabled={processing}>
                    <img src="/static/icons/light/light-plus-icon.svg" alt="plus icon" className="w-[26px]"/>
                    ثبت کارکرد
                </Button>
            </form>
        </DialogLayout>
    )
}
