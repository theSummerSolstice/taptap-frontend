import {
  changeDateFormat,
  generateLayout,
  sortByUpdatedDate,
} from './index';

describe('utils test', () => {
  it('changeDateFormat test', () => {
    const date = '2020-12-18T15:03:35.983Z';
    const result = changeDateFormat(date);

    expect(result).toEqual('2020-12-19 00:03:35');
  });

  it('generateLayout test', () => {
    const number = 3;
    const result = generateLayout(number);

    expect(result).toEqual([
        { i: '0', x: 0, y: 0, w: 1, h: 0.3, static: true, minW: 1 },
        { i: '1', x: 1, y: 0, w: 1, h: 0.3, static: true, minW: 1 },
        { i: '2', x: 2, y: 0, w: 1, h: 0.3, static: true, minW: 1}
    ]);
  });

  it('sortByUpdatedDate', () => {
    const array = [
      { index: 1, updatedAt: '2020-12-18T15:03:35.983Z' },
      { index: 2, updatedAt: '2020-12-19T15:03:35.983Z' },
    ];
    const result = sortByUpdatedDate(array);
    expect(result).toEqual([
      { index: 2, updatedAt: '2020-12-19T15:03:35.983Z' },
      { index: 1, updatedAt: '2020-12-18T15:03:35.983Z' },
    ]);
  });
});
