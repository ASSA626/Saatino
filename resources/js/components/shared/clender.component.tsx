import {Swiper, SwiperSlide} from "swiper/react";
import "swiper/css";
import {cn} from "@/lib/utils";

type ClenderProps = {
    className?: string
}

export default function Clender({className}: ClenderProps) {

    const days = [
        {day: 1, isHighlighted: false},
        {day: 2, isHighlighted: false},
        {day: 3, isHighlighted: false},
        {day: 4, isHighlighted: false},
        {day: 5, isHighlighted: false},
        {day: 6, isHighlighted: false},
        {day: 7, isHighlighted: false},
        {day: 8, isHighlighted: false},
        {day: 9, isHighlighted: false},
        {day: 10, isHighlighted: true},
        {day: 11, isHighlighted: false},
        {day: 12, isHighlighted: false},
        {day: 13, isHighlighted: false},
        {day: 14, isHighlighted: false},
        {day: 15, isHighlighted: false},
        {day: 16, isHighlighted: false},
        {day: 17, isHighlighted: false},
        {day: 18, isHighlighted: false},
        {day: 19, isHighlighted: false},
        {day: 20, isHighlighted: false},
        {day: 21, isHighlighted: false},
        {day: 22, isHighlighted: false},
        {day: 23, isHighlighted: false},
        {day: 24, isHighlighted: false},
        {day: 25, isHighlighted: false},
        {day: 26, isHighlighted: false},
        {day: 27, isHighlighted: false},
        {day: 28, isHighlighted: false},
        {day: 29, isHighlighted: false},
        {day: 30, isHighlighted: false},
    ];

    return (
        <div className={cn("py-4 px-3 md:px-6 border border-gray-300", className)}>
            <div className="mb-4 flex items-center justify-between md:pb-2">
                <p className="font-bold md:text-xl">فروردین ماه 1404</p>

                <button
                    className="font-bold px-4 py-2 text-sm border border-gray-400 rounded-lg flex items-center gap-x-2">
                    <img src="/static/icons/dark/dark-two-calendar-icon.svg" alt="calendar icon" className="w-[22px]"/>
                    <p>فیلتر براساس ماه</p>
                </button>
            </div>

            <div className="w-full flex items-center justify-between">
                <Swiper
                    spaceBetween={10}
                    slidesPerView={3}
                    freeMode={true}
                    navigation={false}
                    pagination={false}
                    breakpoints={{
                        320: {slidesPerView: 5},
                        400: {slidesPerView: 6},
                        1024: {slidesPerView: 13},
                    }}
                >
                    {
                        days.map((item, index) => (
                            <SwiperSlide key={index}>
                                <div
                                    className={`flex flex-col items-center ${item.isHighlighted
                                        ? "bg-zinc-800 text-white border-zinc-800"
                                        : "bg-white text-zinc-800 border-zinc-800"
                                    } border py-2 px-3 gap-y-1 rounded-lg`}
                                >
                                    <p className="text-2xl font-bold">{item.day}</p>
                                    <p className="text-[12px]">فرور</p>
                                </div>
                            </SwiperSlide>
                        ))
                    }
                </Swiper>
            </div>
        </div>
    )
}
