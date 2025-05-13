import {cn} from "@/lib/utils";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from '@/components/ui/tooltip';
import {router} from '@inertiajs/react';
import toast from 'react-hot-toast';
import ReportCaption from "@/pages/admin/vacations/report-caption";

type StatusBadgesProps = {
    status: string;
    statuses?: string[];
    route?: string;
    readOnly?: boolean;
    id?: number;
    reportCaptionState?: boolean;
    setReportCaptionState?: (state: boolean) => void
}

export default function StatusBadges({status, statuses = [], route = "", readOnly = false, id, reportCaptionState = false, setReportCaptionState = () => {}}: StatusBadgesProps) {
    const getStatusLabel = (status: string) => {
        switch (status) {
            case "confirmed":
            case "1":
                return "تایید شده";
            case "active":
                return "فعال";
            case "unconfirmed":
            case "0":
                return "تایید نشده";
            case "inactive":
                return "غیرفعال";
            case "confirming":
                return "در انتظار تایید";
            case "inserted":
                return "ثبت شده";
            case "uninserted":
                return "ثبت نشده";
            case "inserting":
                return "درحال ثبت";
            case "uncompleted":
                return "ثبت شده به صورت ناقص";
            default:
                return "تایین نشده";
        }
    };

    const handleChangeStatus = (newStatus: string) => {
        router.post(route, {status: newStatus}, {
            onSuccess: () => {
                toast.success("تغییر وضعیت با موفقیت انجام شد");
                if (id && newStatus === statuses[0]) {
                    setReportCaptionState(true);
                }
            },
        });
    };

    const statusDisplay = (
        <div
            className={cn(
                "flex items-center justify-center truncate w-full gap-1 rounded-2xl py-[2px] pl-1.5 pr-2 border bg-inherit",
                {
                    "border-red-700": status === "unconfirmed" || status === "inactive" || status === "0" || status === "uninserted",
                    "border-green-600": status === "confirmed" || status === "active" || status === "1" || status === "inserted",
                    "border-[#0179FE]": status === "confirming" || status === "inserting",
                    "border-orange-600": status === "uncompleted",
                }
            )}
        >
            <div
                className={cn("size-2 rounded-full", {
                    "bg-red-700": status === "unconfirmed" || status === "inactive" || status === "0" || status === "uninserted",
                    "bg-green-600": status === "confirmed" || status === "active" || status === "1" || status === "inserted",
                    "bg-[#0179FE]": status === "confirming" || status === "inserting",
                    "bg-orange-600": status === "uncompleted",
                })}
            />
            <p
                className={cn("text-[12px] font-bold", {
                    "text-red-700": status === "unconfirmed" || status === "inactive" || status === "0" || status === "uninserted",
                    "text-green-600": status === "confirmed" || status === "active" || status === "1" || status === "inserted",
                    "text-[#0179FE]": status === "confirming" || status === "inserting",
                    "text-orange-600": status === "uncompleted",
                })}
            >
                {getStatusLabel(status)}
            </p>
        </div>
    );

    if (readOnly) {
        return statusDisplay;
    }

    return (
        <>
            {id && (
                <ReportCaption reportCaptionState={reportCaptionState} setReportCaptionState={setReportCaptionState} vacation_id={id} />
            )}
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild className="w-full">
                        {statusDisplay}
                    </TooltipTrigger>
                    <TooltipContent className="w-full py-2 bg-white text-zinc-800 border border-dashed border-zinc-500">
                        <div className="flex items-center gap-x-4">
                            <p>تغییر وضعیت:</p>
                            <div className="flex items-center gap-x-2">
                                <button
                                    className="flex items-center justify-center truncate w-full gap-1 rounded-2xl py-[2px] pl-2 pr-2.5 border bg-inherit border-red-700 cursor-pointer"
                                    onClick={() => handleChangeStatus(statuses[0])}
                                >
                                    <p className="text-[12px] font-bold text-red-700">رد کردن</p>
                                </button>

                                <button
                                    className="flex items-center justify-center truncate w-full gap-1 rounded-2xl py-[2px] pl-2 pr-2.5 border bg-inherit border-green-600 cursor-pointer"
                                    onClick={() => handleChangeStatus(statuses[1])}
                                >
                                    <p className="text-[12px] font-bold text-green-600">تایید کردن</p>
                                </button>

                                <button
                                    className="flex items-center justify-center truncate w-full gap-1 rounded-2xl py-[2px] pl-2 pr-2.5 border bg-inherit border-[#0179FE] cursor-pointer"
                                    onClick={() => handleChangeStatus(statuses[2])}
                                >
                                    <p className="text-[12px] font-bold text-[#0179FE]">معلق کردن</p>
                                </button>
                            </div>
                        </div>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        </>
    );
}
