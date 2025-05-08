import {ReactNode} from "react";
import {AnimatePresence, motion} from "framer-motion";

type AnimationCommonProps = {
    children: ReactNode;
    keyValue?: string;
    initial?: any;
    animate?: any;
    transition?: any;
    className?: string;
}

export default function AnimationWrapper({children, keyValue, initial = {opacity: 0}, animate = {opacity: 1}, transition = {duration: 0.5}, className}: AnimationCommonProps) {
    return (
        <AnimatePresence>
            <motion.div
                key={keyValue}
                initial={initial}
                transition={transition}
                animate={animate}
                className={className}
            >
                {children}
            </motion.div>
        </AnimatePresence>
    )
}
