import { format, parseISO } from 'date-fns';

export function date_parser(datetime){

    const iso_datetime = parseISO(datetime);
    const datetime_formated = format(iso_datetime, 'yyyy-MM-dd HH:mm');

    return datetime_formated
}
