import { type DateArg, format, formatDistanceToNow } from 'date-fns';

export function formatDate(date: DateArg<Date>) {
  return format(date, 'MMMM dd yyyy');
}

export function formatDateFromNow(date: DateArg<Date>) {
  return formatDistanceToNow(date);
}
