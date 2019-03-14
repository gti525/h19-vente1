import moment from 'moment';
import 'moment/locale/fr';

export const formatDate = (ISODate) => {
    return moment(ISODate).lang('fr').format('dddd, Do MMMM, YYYY, hh:mm');
}