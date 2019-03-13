import moment from 'moment';

export const dateFormat = (ISODate) => {
    return moment(ISODate).format('dddd, MMMM Do, YYYY, hh:mm');
}