import UserNotificationDialog from "@/components/user/notification-dialog.component";
import MobileNav from "@/components/user/mobile-nav.component";
import {usePage} from "@inertiajs/react";
import {useState} from "react";
import getRouteName from "@/lib/getRouteName";

export default function MobileHeader() {
    const { url } = usePage()

    const [navbarModal, setNavbarModal] = useState<boolean>(false)
    const [userNotificationModal, setUserNotificationModal] = useState<boolean>(false)

    const currentRouteName = getRouteName(url, "/user");

    const handleLogout = () => {
        //
    }

    return (
        <div className="w-full py-3.5 bg-[#3a84e3] px-4 md:hidden">
            <div className="flex items-center justify-between">
                <button type="button" className="bg-white p-3 rounded-full" onClick={() => setUserNotificationModal(true)}>
                    <img src="/static/icons/dark/dark-notification-icon.svg" alt="logout icon" className="w-[23px]" />
                </button>

                <button
                    type="button"
                    className="flex items-center bg-white p-3 gap-x-1.5 rounded-full"
                    onClick={() => setNavbarModal(true)}
                >
                    <h2 className="text-[#282930] font-bold">{currentRouteName}</h2>
                    <img src="/static/icons/dark/dark-chevron-down-icon.svg" alt="chevron icon" className="w-[25px]" />
                </button>

                <button type="button" className="bg-white p-3 rounded-full">
                    <img src="/static/icons/dark/dark-logout-icon.svg" alt="notification icon" className="w-[23px]" />
                </button>
            </div>

            <MobileNav navbarDialog={navbarModal} setNavbarDialog={setNavbarModal} />
            <UserNotificationDialog notificationState={userNotificationModal} setNotificationState={setUserNotificationModal} />
        </div>
    )
}
