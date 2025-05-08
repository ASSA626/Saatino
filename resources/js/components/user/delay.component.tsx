import Clender from "@/components/shared/clender.component";
import {Separator} from "@/components/ui/separator";

type DelayCardType = {
    dailyDelay: string | number
    monthlyDelay: string | number
}

export default function Delay({dailyDelay, monthlyDelay}: DelayCardType) {
    return (
        <div className="w-full shadow-creditCard">
            <Clender className="rounded-t-2xl"/>

            <div
                className="py-3 px-6 border-r border-l border-b border-gray-300 rounded-b-2xl grid grid-cols-3 place-items-center">
                <div className="text-center">
                    <p className="text-[11px] font-bold">میزان تاخیر روز:</p>
                    <p className="text-lg text-center mt-2 font-bold">{dailyDelay}</p>
                </div>

                <Separator orientation="vertical" className="border-r border-gray-300 py-3"/>

                <div className="text-center">
                    <p className="text-[11px] font-bold">میزان تاخیر ماه:</p>
                    <p className="text-lg text-center mt-2 font-bold">{monthlyDelay}</p>
                </div>
            </div>
        </div>
    )
}
