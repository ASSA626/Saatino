import DialogLayout from "@/layouts/dialog.layout";
import NotificationCard from "@/components/shared/notification-card.component";
import {CheckCheck} from "lucide-react";
import {Button} from "@/components/ui/button";

type UserNotificationDialogType = {
    notificationState: boolean
    setNotificationState: (state: boolean) => void
}

export default function UserNotificationDialog({notificationState, setNotificationState}: UserNotificationDialogType) {
    return (
        <DialogLayout state={notificationState} setState={setNotificationState} title="اعلان ها">
            <div className="flex flex-col gap-y-3.5 max-md:mt-4">
                <NotificationCard
                    type="salary"
                    title="تاییده تنخواه"
                    description="کاربر گرامی، تنخواه شما با عنوان 'خرید نان' توسط مدیر تایید شد"
                    date="2 روز پیش"
                />

                <NotificationCard
                    type="vacation"
                    title="تاییده درخواست مرخصی"
                    description="کاربر گرامی، درخواست مرخصی ساعتی شما توسط مدیر تایید شد"
                    date="2 روز پیش"
                />

                <NotificationCard
                    type="mission"
                    title="تاییده درخواست ماموریت"
                    description="کاربر گرامی، درخواست ماموریت با عنوان پروژه 'سیستم ساعت' توسط مدیر تایید شد"
                    date="2 روز پیش"
                />
            </div>

            <Button size="xl" className="bg-[#3a84e3] text-white hover:bg-[#1775ef] py-2.5 flex items-center gap-x-2 max-md:mt-4">
                <CheckCheck/>
                خواندن همه اعلان ها
            </Button>
        </DialogLayout>
    )
}
