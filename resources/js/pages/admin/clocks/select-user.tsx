import {useState} from "react";
import {router, usePage} from "@inertiajs/react";
import {UserType} from "@/types";
import {Sheet, SheetContent, SheetHeader, SheetTitle} from "@/components/ui/sheet";
import {Button} from "@/components/ui/button";
import {cn} from "@/lib/utils";

type SelectUserProps = {
    wrapperState: boolean;
    setWrapperState: (state: boolean) => void;
    // users: UserType[]
}

type UsePageType = {
    users: UserType[]
}

export default function SelectUserWrapper({wrapperState, setWrapperState}: SelectUserProps) {
    const {users} = usePage<UsePageType>().props

    const [selectedUserId, setSelectedUserId] = useState<number>(0);

    const handleUserSelect = (id: number) => {
        setSelectedUserId(id);
    };

    const handleViewReport = () => {
        if (selectedUserId) {
            router.visit(route('admin.clocks', selectedUserId));
        }
    }

    return (
        <Sheet open={wrapperState} onOpenChange={setWrapperState}>
            <SheetContent side="left" className="px-4">
                <SheetHeader className="pb-4 border-dashed border-b border-gray-400">
                    <SheetTitle className="text-lg">انتخاب کاربر جدید</SheetTitle>
                </SheetHeader>

                <div className="flex flex-col gap-y-4 overflow-y-auto mt-4">
                    {users.map((user, i) => (
                        <div
                            key={i}
                            className={cn("flex justify-between items-center py-2 px-4 border-2 border-zinc-300 rounded-lg cursor-pointer", {
                                "border-green-500": user.id === selectedUserId
                            })}
                            onClick={() => handleUserSelect(user.id)}
                        >
                            <div className="flex items-center gap-x-3">
                                <img src={user.image !== null ? user.image : "/static/images/user-avatar.png"} alt={user.name} className="w-16 rounded-full"/>
                                <div className="flex flex-col items-start gap-y-1.5">
                                    <p className="text-lg">{user.name}</p>
                                    <p className="text-[13px]">{user.national_code}</p>
                                </div>
                            </div>

                            {user.id === selectedUserId && (
                                <div>
                                    <img src="/static/images/chack-mark.png" alt="check-icon" className="w-9"/>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                <Button size="xl" className="w-full bg-[#3a84e3] text-white hover:bg-[#1775ef] mt-2" onClick={handleViewReport}>
                    ارسال اطلاعات
                </Button>
            </SheetContent>
        </Sheet>
    )
}
