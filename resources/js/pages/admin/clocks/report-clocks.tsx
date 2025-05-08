import DialogLayout from "@/layouts/dialog.layout";
import {Button} from "@/components/ui/button";
import {minToClock} from "@/lib/minToClock";
import moment from "moment-jalaali";

type ReportClockProps = {
    reportClockState: boolean;
    setReportClockState: (state: boolean) => void;
    startDate: string;
    endDate: string;
    totalTimeValue: number;
}

export default function ReportClocks({reportClockState, setReportClockState, startDate, endDate, totalTimeValue}: ReportClockProps) {
    return (
        <DialogLayout state={reportClockState} setState={setReportClockState} title="گزارش گیری">
            <p className="text-center">در بازه زمانی {`${moment(startDate).format("jYYYY/jMM/jDD")} الی ${moment(endDate).format("jYYYY/jMM/jDD")}`} </p>
            <section>
                <div className="w-full text-center mt-2 p-4 border border-dashed border-gray-400 rounded-lg">
                    <div className="flex items-center justify-between">
                        <p>مقدار کارکرد کل</p>
                        <p className="text-lg font-semibold">{minToClock(totalTimeValue)}</p>
                    </div>
                </div>

                <div className="w-full text-center mt-4 p-4 border border-dashed border-gray-400 rounded-lg">
                    <div className="flex items-center justify-between border-b border-dashed border-gray-400 pb-3">
                        <p>مقدار ساعات دفتری</p>
                        <p className="text-lg font-semibold">5 ساعت</p>
                    </div>

                    <div className="flex items-center justify-between border-b border-dashed border-gray-400 pb-3 mt-3">
                        <p>مقدار کار در منزل</p>
                        <p className="text-lg font-semibold">0 ساعت</p>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                        <p>مقدار ساعت ماموریت</p>
                        <p className="text-lg font-semibold">0 ساعت</p>
                    </div>
                </div>

                <Button size="xl" className="w-full bg-[#3a84e3] flex items-center gap-x-2 text-white hover:bg-[#1775ef] px-6 mt-3">
                    <img src="/static/icons/admin/report.svg" alt="plus icon" className="w-[28px]"/>
                    ایجاد گزارش جدید
                </Button>
            </section>
        </DialogLayout>
    )
}
