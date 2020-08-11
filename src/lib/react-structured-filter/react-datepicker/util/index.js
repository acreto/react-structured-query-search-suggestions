
import isValidDate from "date-fns/isValid";
import isAfter from "date-fns/isAfter";
export function isValid(date) {
    return isValidDate(date) && isAfter(date, new Date("1/1/1000"));
}

export function addZero(i) {
    return i < 10 ? `0${i}` : `${i}`;
}