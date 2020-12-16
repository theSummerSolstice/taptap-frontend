import { format } from 'date-fns';

export const changeDateFormat = (date) => {
  return format(new Date(date), 'yyyy-MM-dd HH:mm:ss');
};

export const generateLayout = (number) => {
  const temp = Array(number).fill({});
  return temp.map((item, index) => {
    return {
      i: String(index),
      x: index,
      y: 0,
      w: 1,
      h: 0.3,
      static: true,
      minW: 1,
    };
  });
};
