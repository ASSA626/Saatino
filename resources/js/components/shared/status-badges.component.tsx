import {cn} from "@/lib/utils";

export default function StatusBadges({status}: {status: string}) {

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
                return "ثبت شده"
            case "uninserted":
                return "ثبت نشده"
            case "inserting":
                return "درحال ثبت"
            case "uncompleted":
                return "ثبت شده به صورت ناقص"
            default:
                return "تایین نشده";
        }
    };

    return (
        <div
            className={cn("flex items-center justify-center truncate w-full gap-1 rounded-2xl py-[2px] pl-1.5 pr-2 border bg-inherit", {
                "border-red-700": status === "unconfirmed" || status === "inactive" || status === "0" || status === "uninserted",
                "border-green-600": status === "confirmed" || status === "active" || status === "1" || status === "inserted",
                "border-[#0179FE]": status === "confirming" || status === "inserting",
                "border-orange-600": status === "uncompleted"
            })}
        >
            <div
                className={cn("size-2 rounded-full", {
                    "bg-red-700": status === "unconfirmed" || status === "inactive" || status === "0" || status === "uninserted",
                    "bg-green-600": status === "confirmed" || status === "active" || status === "1" || status === "inserted",
                    "bg-[#0179FE]": status === "confirming" || status === "inserting",
                    "bg-orange-600": status === "uncompleted"
                })}
            />
            <p
                className={cn("text-[12px] font-bold", {
                    "text-red-700": status === "unconfirmed" || status === "inactive" || status === "0" || status === "uninserted",
                    "text-green-600": status === "confirmed" || status === "active" || status === "1" || status === "inserted",
                    "text-[#0179FE]": status === "confirming" || status === "inserting",
                    "text-orange-600": status === "uncompleted"
                })}
            >
                {getStatusLabel(status)}
            </p>
        </div>
    );
}
