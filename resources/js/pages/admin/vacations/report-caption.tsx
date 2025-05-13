import DialogLayout from "@/layouts/dialog.layout";
import {useVacationsStore} from "@/stores/admin/useVacationsStore";
import {useForm} from "@inertiajs/react";
import {FormEvent} from "react";
import {Textarea} from "@/components/shared/textarea.component";
import {Button} from "@/components/ui/button";

type ReportCaptionProps = {
    reportCaptionState: boolean;
    setReportCaptionState: (state: boolean) => void;
    vacation_id: number
}

type ReportCaptionForm = {
    caption: string;
}

export default function ReportCaption({reportCaptionState, setReportCaptionState, vacation_id}: ReportCaptionProps) {
    const {setReportCaption} = useVacationsStore()

    const {data, setData, processing} = useForm<ReportCaptionForm>({
        caption: ''
    })

    const handleCreateReport = (e: FormEvent) => {
        e.preventDefault()
        setReportCaption(vacation_id, data.caption, setReportCaptionState)
    }

    return (
        <DialogLayout state={reportCaptionState} setState={setReportCaptionState} title="دلیل تایید نشدن مرخصی">
            <form onSubmit={handleCreateReport} className="mt-2">
                <Textarea
                    id="caption"
                    label="علت تایید نشدن"
                    value={data.caption}
                    onChange={(e) => setData("caption", e.target.value)}
                />

                <div className="mt-3 p-2.5 border border-dashed border-gray-500 rounded-md leading-6">
                    <p className="font-bold text-red-500 text-[12px]">وارد کردن دلیل در این فیلد اجبازی نیست و وضعیت مرخصی تغییر کرده است. این فیلد تنها جهت راحتی مدیر ایجاد شده است *</p>
                </div>

                    <Button
                        type="submit"
                        size="xl"
                        className="bg-[#3a84e3] flex items-center gap-x-2 text-white hover:bg-[#1775ef] w-full mt-3"
                    >
                        <img src="/static/icons/light/light-plus-icon.svg" alt="plus icon" className="w-[26px]"/>
                        ثبت علت
                    </Button>
            </form>
        </DialogLayout>
    )
}
