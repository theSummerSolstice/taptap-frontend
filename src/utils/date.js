import { format } from 'date-fns';

export const changeDateFormat = (date) => {
  return format(new Date(date), 'yyyy-MM-dd HH:mm:ss');
};
