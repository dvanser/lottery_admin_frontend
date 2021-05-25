import moment from 'moment';


export const formatDate = (dateToFormat, withTime = false, withSeconds = false,
                           monthAndYearOnly = false) => {

    if (dateToFormat === null) {
        return '';
    }

    const date = moment(dateToFormat);

    if (!withTime) {
        return date.local().format('DD.MM.YYYY');
    }

    if (withSeconds) {
        return moment(dateToFormat).local().format('DD.MM.YYYY HH:mm:ss.SSS');
    }

    if (monthAndYearOnly) {
        return moment(dateToFormat).local().format('MM.YYYY');
    }

    return moment(dateToFormat).local().format('DD.MM.YYYY HH:mm');
};

export const formatDateForBackend = date => {
    if (date === null) {
        return null;
    }
    return date.format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');
};

export const formatNumber = number => {

    if (number === undefined || number === null) {
        return '0';
    }

    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};