import {Separator} from "@/components/ui/separator";

export default function DelayVacation() {
    return (
        <div className="w-full shadow-creditCard">
            <div className="py-4 px-4 border border-gray-300 rounded-t-2xl">
                <div className="flex items-center justify-center">
                    <p className="font-bold">12 اسفند ماه 1403</p>
                </div>
            </div>

            <div className="py-2 px-4 border-r border-l border-b border-gray-300 grid grid-cols-3 place-items-center">
                <div className="text-center">
                    <p className="text-[11px] font-bold">میزان مرخصی ماه:</p>
                    <p className="text-lg text-center mt-2 font-bold">12 روز</p>
                </div>

                <Separator orientation="vertical" className="border-r border-gray-300 py-8"/>

                <div className="border border-dashed border-gray-300 rounded-full p-1 absolute bg-white">
                    <img src="/static/icons/dark/dark-vacation-icon.svg" alt="vacation icon" className="w-5"/>
                </div>

                <div className="text-center">
                    <p className="text-[11px] font-bold">میزان تاخیر ماه:</p>
                    <p className="text-lg text-center mt-2 font-bold">0.625 روز</p>
                </div>
            </div>

            <div
                className="py-3 px-6 border-r border-l border-b border-gray-300 flex flex-col items-center rounded-b-2xl">

                <div className="flex mt-2 items-center gap-x-2">
                    <p className="text-[11px] font-bold"> مرخصی مانده (در کل سال): </p>
                    <p className="text-xl font-bold">17.375 روز</p>
                </div>
            </div>
        </div>
    )
}
