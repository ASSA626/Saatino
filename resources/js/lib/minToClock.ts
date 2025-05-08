export const minToClock = (minutes: number): string => {
    if (minutes === null || minutes === undefined || isNaN(minutes)) {
        return '-';
    }

    if (minutes >= 60) {
        const hours = Math.floor(minutes / 60).toString().padStart(2, '0');
        const remainingMinutes = (minutes % 60).toString().padStart(2, '0');
        return `${hours}:${remainingMinutes} ساعت`;
    } else {
        return `${minutes} دقیقه`;
    }
};
