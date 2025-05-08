import {useEffect, useRef, useState} from "react";
import {motion, useMotionValue, animate, PanInfo} from "framer-motion";

export default function ClockButton({handleDragFunction, title}: {handleDragFunction: any, title: string}) {
    const [isCompleted, setIsCompleted] = useState<boolean>(false);
    const [maxDrag, setMaxDrag] = useState<number>(0);
    const [twoThirdsPoint, setTwoThirdsPoint] = useState<number>(0);

    const containerRef = useRef<HTMLDivElement>(null);
    const exitInfoRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const x = useMotionValue<number>(0);

    const updateDragConstraints = () => {
        if (containerRef.current && exitInfoRef.current && buttonRef.current) {
            const exitRect = exitInfoRef.current.getBoundingClientRect();
            const buttonRect = buttonRef.current.getBoundingClientRect();
            const totalWidth = exitRect.right - buttonRect.left - buttonRect.width;

            setMaxDrag(Math.max(totalWidth, 0));
            setTwoThirdsPoint(Math.max(totalWidth * (2 / 3), 0));
        }
    };

    useEffect(() => {
        const timeout = setTimeout(updateDragConstraints, 0);
        window.addEventListener("resize", updateDragConstraints);

        return () => {
            clearTimeout(timeout);
            window.removeEventListener("resize", updateDragConstraints);
        };
    }, []);

    const handleDragEnd = (_: any, info: PanInfo) => {
        const buttonLeft = info.point.x;
        const buttonRight = buttonLeft + (buttonRef.current?.offsetWidth || 0);
        const exitLeft = exitInfoRef.current!.offsetLeft;
        const exitRight = exitLeft + (exitInfoRef.current?.offsetWidth || 0);
        const overDragged = buttonRight > exitRight + 20;

        if (overDragged || (info.offset.x >= twoThirdsPoint && buttonRight >= exitLeft - 6)) {
            setIsCompleted(true);
            animate(x, maxDrag, {type: "spring", stiffness: 120, damping: 15});
            setTimeout(handleDragFunction, 300);
        } else {
            animate(x, 0, {type: "spring", stiffness: 120, damping: 15});
        }
    };

    return (
        <div ref={containerRef} className="w-full bg-[#5f9ae5] p-2 flex items-center justify-between rounded-full mt-8">
            <div
                ref={exitInfoRef}
                className="py-1.5 w-[100px] bg-[#3a84e3] rounded-full text-white text-center border-2 border-[#1775ef]"
            >
                <p className="text-[10px]">آخرین خروج:</p>
                <p className="text-[10px]">7 روز پیش 13:56</p>
            </div>

            <div className="flex items-center gap-x-3 relative">
                <div className="flex items-center">
                    <img src="/static/icons/light/light-arrow-icon.svg" alt="" className="w-6 -ml-3 opacity-25"/>
                    <img src="/static/icons/light/light-arrow-icon.svg" alt="" className="w-6 -ml-3 opacity-50"/>
                    <img src="/static/icons/light/light-arrow-icon.svg" alt="" className="w-6 -ml-3 opacity-75"/>
                    <img src="/static/icons/light/light-arrow-icon.svg" alt="" className="w-6 -ml-3 opacity-100"/>
                </div>

                <button
                    className="absolute top-1/2 -translate-y-1/2 left-0 py-3 w-[110px] bg-[#88b5ef] rounded-full font-bold flex items-center gap-1"
                >
                    <br/>
                </button>

                <motion.button
                    ref={buttonRef}
                    className="py-3 px-7 bg-white rounded-full text-[#3a84e3] font-bold flex items-center gap-1 z-50"
                    drag={!isCompleted ? "x" : false}
                    dragConstraints={!isCompleted ? {left: 0, right: maxDrag} : false}
                    dragElastic={0.1}
                    style={{x}}
                    transition={{type: "spring", stiffness: 120, damping: 15}}
                    onDragEnd={handleDragEnd}
                >
                    <img src="/static/icons/dark/dark-login-icon.svg" alt="" className="cursor-pointer"/>
                    {title}
                </motion.button>
            </div>
        </div>
    );
}
