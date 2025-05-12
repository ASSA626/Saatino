import jMoment from 'moment-jalaali';

export const convertPersianToGregorian = (persianDate: string) => {
    if (!persianDate) return '';

    const dateParts = persianDate.split('/');

    const year = parseInt(dateParts[0]);
    const month = parseInt(dateParts[1]);
    const day = parseInt(dateParts[2]);

    const persianMoment = jMoment(`${year}/${month}/${day}`, 'jYYYY/jM/jD');

    return persianMoment.format('YYYY-MM-DD');
};
