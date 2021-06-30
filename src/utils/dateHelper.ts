import { format } from 'date-fns';

export const datetimeToString = (date: Date, strFormat: string): string => {
    return format(date, strFormat);
};

export const dateStringUStoPTBR = (date: any): string => {
    var mes = date.toString().substr(5, 2);
    var dia = date.toString().substr(8, 2);
    var ano = date.toString().substr(0, 4);

    return `${dia}/${mes}/${ano}`;
}

//"2021-03-18T10:50:00.0096572Z"
export const dateTimeStringUStoPTBR = (date: any): string => {
    var mes = date.toString().substr(5, 2);
    var dia = date.toString().substr(8, 2);
    var ano = date.toString().substr(0, 4);

    var time = date.toString().substr(11, 8);

    return `${dia}/${mes}/${ano} ${time}`;
}

export const secondsToMs = (d: number) => {
    d = Number(d);
    var m = Math.floor(d / 60).toString().padStart(2, '0');
    var s = Math.floor(d % 3600 % 60).toString().padStart(2, '0');

    return `${m}:${s}`;
}