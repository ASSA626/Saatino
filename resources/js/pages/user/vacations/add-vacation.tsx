import DialogLayout from "@/layouts/dialog.layout";
import {Input, InputClock, InputDatePicker} from "@/components/shared/input.components";
import {Button} from "@/components/ui/button";
import SelectBox from "@/components/shared/select-box.component";
import {useForm} from "@inertiajs/react";
import {FormEvent} from "react";
import {useVacationStore} from "@/stores/user/useVacationsStore";

type CreateVacationType = {
    createVacationState: boolean;
    setCreateVacationState: (state: boolean) => void;
}

type VacationForm = {
    vacation_type: string,
    start_date: string,
    end_date: string,
    caption: string,
}

export default function AddVacation({createVacationState, setCreateVacationState}: CreateVacationType) {
    const {createVacation} = useVacationStore();

    const {data, setData, processing} = useForm<VacationForm>({
        vacation_type: '',
        start_date: '',
        end_date: '',
        caption: '',
    })

    const vacationTypeOpt = [
        {value: "بدون حقوق", label: "بدون حقوق"},
        {value: "ساعتی", label: "ساعتی"},
        {value: "استحقاقی", label: "استحقاقی"},
        {value: "استعلاجی", label: "استعلاجی"},
    ]

    const handleAddVacation = (e: FormEvent) => {
        e.preventDefault();
        createVacation(data, setCreateVacationState);
    }

    return (
        <DialogLayout state={createVacationState} setState={setCreateVacationState} title="ثبت مرخصی جدید">
            <form onSubmit={handleAddVacation} className="mt-5">
                <div className="flex flex-col items-center gap-y-4">
                    <SelectBox
                        title="نوع مرخصی"
                        options={vacationTypeOpt}
                        value={data.vacation_type}
                        onChange={(value) => setData("vacation_type", value)}
                        labelKey="label"
                        valueKey="value"
                    />

                    <div className="flex items-center gap-x-2 w-full">
                        {data.vacation_type !== "ساعتی" ? (
                            <>
                                <InputDatePicker
                                    id="start_time"
                                    label="از تاریخ"
                                    value={data.start_date}
                                    onChange={(formattedDate) => setData("start_date", formattedDate)}
                                />

                                <InputDatePicker
                                    id="end_time"
                                    label="تا تاریخ"
                                    value={data.end_date}
                                    onChange={(formattedDate) => setData("end_date", formattedDate)}
                                />
                            </>
                        ) : (
                            <>
                                <InputClock
                                    id="start_time"
                                    label="از ساعت"
                                    value={data.start_date}
                                    onChange={(e) => setData("start_date", e.target.value)}
                                />

                                <InputClock
                                    id="end_time"
                                    label="تا ساعت"
                                    value={data.end_date}
                                    onChange={(e) => setData("end_date", e.target.value)}
                                />
                            </>
                        )}
                    </div>

                    <Input
                        id="caption"
                        label="توضیحات"
                        value={data.caption}
                        onChange={(e) => setData("caption", e.target.value)}
                    />
                </div>

                <Button size="xl" className="bg-[#3a84e3] flex items-center gap-x-2 text-white hover:bg-[#1775ef] w-full mt-4">
                    <img src="/static/icons/light/light-plus-icon.svg" alt="plus icon" className="w-[26px]"/>
                    ثبت مرخصی جدید
                </Button>
            </form>
        </DialogLayout>
    )
}
