import {useState} from "react";
import {navbarLinks} from "@/constants";
import {Link} from "@inertiajs/react";
import UserNotificationDialog from "@/components/user/notification-dialog.component";

export default function Navbar() {
    const [userNotificationModal, setUserNotificationModal] = useState<boolean>(false)

    return (
        <nav className="max-md:hidden py-6 px-12 w-full">
            <UserNotificationDialog notificationState={userNotificationModal} setNotificationState={setUserNotificationModal}/>

            <div className="flex items-center justify-center">
                <div className="w-full flex items-center gap-x-6">
                    <div className="flex items-center gap-x-3">
                        <img src="/static/images/avatar.avif" alt="user" className="w-10 rounded-lg"/>
                        <p className="font-bold">علیرضا شاکر</p>
                    </div>

                    <div className="text-3xl">/</div>

                    <div className="flex items-center gap-x-4">
                        <button
                            type="button"
                            onClick={() => setUserNotificationModal(true)}
                            className="flex items-center gap-x-2 bg-white p-2 rounded-lg border border-gray-300 relative cursor-pointer"
                        >
                            <img src="/static/icons/dark/dark-notification-icon.svg" alt="notification icon"
                                 className="w-[23px]"/>
                            <div
                                className="absolute w-2 h-2 bg-bankGradient rounded-full top-2 right-2.5 animate-ping cursor-pointer"/>
                        </button>

                        <button type="button"
                                className="flex items-center gap-x-2 bg-white p-2 rounded-lg border border-gray-300">
                            <img src="/static/icons/dark/dark-logout-icon.svg" alt="logout icon" className="w-[23px]"/>
                        </button>
                    </div>
                </div>

                <div className="flex items-center justify-end gap-x-10 w-full">
                    {
                        navbarLinks.map((item, i) => (
                            <Link key={i} href={route(item.href)}
                                  className="flex items-center gap-x-2 border border-gray-300 py-2 px-3 rounded-lg">
                                <img src={item.icon} alt={item.label} className="w-5 h-5 pointer-events-none"/>
                                <p className="text-md">{item.label}</p>
                            </Link>
                        ))
                    }
                </div>
            </div>
        </nav>
    )
}
