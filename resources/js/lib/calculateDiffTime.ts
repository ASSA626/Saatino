const calculateDiffTime = (start: string | undefined, end: string | undefined): number => {
    if (!start || !end) return 0;

    const [startHours, startMinutes, startSeconds] = start.split(':').map(Number);
    const [endHours, endMinutes, endSeconds] = end.split(':').map(Number);

    if (isNaN(startHours) || isNaN(startMinutes) || isNaN(endHours) || isNaN(endMinutes)) {
        return 0;
    }

    // Create today's date objects with the specified times
    const today = new Date();
    const startDate = new Date(today);
    startDate.setHours(startHours, startMinutes, startSeconds || 0);

    const endDate = new Date(today);
    endDate.setHours(endHours, endMinutes, endSeconds || 0);

    // Handle overnight shifts (when end time is smaller than start time)
    if (endDate < startDate) {
        endDate.setDate(endDate.getDate() + 1);
    }

    const diffInMinutes = Math.floor((endDate.getTime() - startDate.getTime()) / (1000 * 60));
    return Math.max(0, diffInMinutes);
};

export default calculateDiffTime
