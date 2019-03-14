import moment from 'moment';
import 'moment/locale/fr';

export const dateFormat = (ISODate) => {
    return moment(ISODate).lang('fr').format('dddd, Do MMMM, YYYY, hh:mm');
}