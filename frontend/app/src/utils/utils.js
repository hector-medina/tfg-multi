import { format, parseISO } from 'date-fns';

export function date_parser(datetime){

    const iso_datetime = parseISO(datetime);
    const datetime_formated = format(iso_datetime, 'yyyy-MM-dd HH:mm');

    return datetime_formated
}

export function date_parser_day(datetime){

    const iso_datetime = parseISO(datetime);
    const datetime_formated = format(iso_datetime, 'd MMM ');

    return datetime_formated
}

export function date_parser_time(datetime){

    const iso_datetime = parseISO(datetime);
    const datetime_formated = format(iso_datetime, 'H:mm');

    return datetime_formated
}

export function compareByTimestamp(a, b) {
    return a.last_message.timestamp - b.last_message.timestamp;
  }