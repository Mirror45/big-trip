import dayjs from "dayjs";

export const isPointTime = (time) => {
  return time === null ? false : dayjs().isAfter(time, "D");
};

export const sortDay = (a, b) =>
  dayjs(a.startTime).diff() - dayjs(b.startTime).diff();

export const sortTime = (a, b) =>
  dayjs(b.endTime).diff() - dayjs(a.endTime).diff();

export const sortPrice = (a, b) => b.price - a.price;

export default class Time {
  constructor(time) {
    this._time = dayjs(time);
  }

  init({ date }) {
    return dayjs("1970-00-00")
      .add(this._time.diff(date), "millisecond")
      .format("HH[H] mm[M]");
  }

  get date() {
    return this._time;
  }

  get YYYYMMDD() {
    return this._time.format("YYYY-MM-DD");
  }

  get MMMD() {
    return this._time.format("MMM D");
  }

  get HHmm() {
    return this._time.format("HH:mm");
  }

  get DDMMYYHHmm() {
    return this._time.format("DD/MM/YY HH:mm");
  }
}
