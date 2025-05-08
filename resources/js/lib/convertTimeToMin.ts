const convertTimeToMinutes = (timeString: string): number => {
    if (!timeString) {
        return 0;
    }

    const parts = timeString.split(':').map(part => parseInt(part, 10));

    if (parts.some(isNaN)) {
        console.error('فرمت زمان نامعتبر است:', timeString);
        return 0;
    }

    if (parts.length === 2) {
        const [hours, minutes] = parts;
        return (hours * 60) + minutes;
    } else if (parts.length === 3) {
        const [hours, minutes, seconds] = parts;
        return (hours * 60) + minutes + Math.round(seconds / 60);
    } else {
        console.error('فرمت زمان نامشخص است:', timeString);
        return 0;
    }
}

export default convertTimeToMinutes
