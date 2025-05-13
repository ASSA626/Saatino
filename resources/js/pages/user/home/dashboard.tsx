import UserLayout from "@/layouts/user.layout";
import {useEffect, useState} from "react";
import ClockButton from "@/components/user/clock-button.components";
import DelayVacation from "@/components/user/delay-vacation.component";
import Delay from "@/components/user/delay.component";
import Worklog from "@/pages/user/home/worklog";
import {useClockStore} from "@/stores/user/useClockStore";
import {ClockType, WorklogType} from "@/types";

type DashboardPageProps = {
    currentClock: ClockType;
    worklogs: WorklogType[];
    projects: any[];
    remainingTime: number;
}

export default function Dashboard({currentClock, worklogs, remainingTime, projects}: DashboardPageProps) {
    const {setInitialData, currentClock: clock, startClock, endClock, isModalOpen, toggleModal} = useClockStore();

    useEffect(() => {
        setInitialData({currentClock, worklogs, remainingTime});
    }, [currentClock, worklogs, remainingTime, setInitialData]);

    const canReopenModal = currentClock && ['inserting'].includes(currentClock.worklog_status);

    return (
        <UserLayout>
            <Worklog workDialog={isModalOpen} setWorkDialog={toggleModal} worklog={worklogs} clock={currentClock}
                     remainingTime={remainingTime} projects={projects}/>

            <section className="md:flex md:items-start container md:mt-16 md:gap-x-4">
                <section className="bg-[#3a84e3] w-full px-3 py-4 md:rounded-2xl md:w-[40%] md:h-[480px]">
                    <div
                        className="flex flex-col items-center md:justify-center gap-y-1 md:gap-y-3 text-white md:mt-10 md:mb-24">
                        <img src="/static/images/avatar.avif" alt="user"
                             className="w-[105px] md:w-[140px] rounded-full border-[5px] border-white"/>
                        <h1 className="font-bold text-xl md:text-[28px] mt-2 md:mt-5">علیرضا شاکر</h1>
                        <p className="font-bold text-[11px] md:text-[12px]">واحد فناوری اطلاعات</p>
                    </div>

                    {(!clock || Object.keys(clock).length === 0 || (clock && clock.left_clock && !canReopenModal)) && (
                        <ClockButton handleDragFunction={startClock} title="ورود"/>
                    )}

                    {clock && !clock.left_clock && (
                        <ClockButton handleDragFunction={endClock} title="خروج"/>
                    )}

                    {clock && clock.left_clock && canReopenModal && (
                        <ClockButton handleDragFunction={() => toggleModal(true)} title="کارکرد"/>
                    )}
                </section>

                <section className="w-full flex flex-col gap-y-8 rounded-t-md px-3 max-md:py-4 max-md:mt-4 overflow-hidden">
                    {/*<Delay dailyDelay={"24 دقیقه"} monthlyDelay={"15 ساعت"}/>*/}
                    {/*<DelayVacation/>*/}
                    <div className="w-full md:h-[480px] border border-dashed border-zinc-300 flex flex-col items-center justify-center gap-y-4 max-md:p-4 rounded-2xl">
                        <img src="/static/images/Coming%20soon%20banner.png" alt="comming-soon-banner" className="md:w-1/2 w-full"/>
                        <div className="text-center">
                            <h1 className="text-xl md:text-3xl font-bold md:mb-4 mb-2">به زودی...</h1>
                            <p className="max-md:text-sm">این بخش از پنل کاربری هنوز درحال طراحی است.</p>
                        </div>
                    </div>
                </section>
            </section>
        </UserLayout>
    )
}
