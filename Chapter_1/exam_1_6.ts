// Part 1
function formatDate_Part1(date: Date, format: string): string {
  // Split string into an array of the special keywords. (non special characters are left alone)
  const splitSpecials = (str: string): string[] => {
    const regex = new RegExp(
      /(YYYY|MM|M|DD|D|HH|H|mm|m|ss|s|A|a|.)/gm
    );
    return [...str.matchAll(regex)].map(match => match[0]);
  };

  // Transforms the specials in an array to their corresponding meaning
  const transformSpecials = (arr: string[], date: Date): string[] => {
    const mappings = {
      YYYY: () => date.getFullYear().toString(),
      MM: () => (date.getMonth() + 1).toString().padStart(2, '0'),
      M: () => (date.getMonth() + 1).toString(),
      DD: () => date.getDate().toString().padStart(2, '0'),
      D: () => date.getDate().toString(),
      HH: () => date.getHours().toString().padStart(2, '0'),
      H: () => date.getHours().toString(),
      mm: () => date.getMinutes().toString().padStart(2, '0'),
      m: () => date.getMinutes().toString(),
      ss: () => date.getSeconds().toString().padStart(2, '0'),
      s: () => date.getSeconds().toString(),
      A: () => (date.getHours() < 12 ? 'AM' : 'PM'),
      a: () => (date.getHours() < 12 ? 'am' : 'pm')
    };

    return arr.map(str => (mappings[str as keyof typeof mappings] ? mappings[str as keyof typeof mappings]() : str));
  };

  return transformSpecials(splitSpecials(format), date).join('');
}

// Part 2
function formatDate_Part2(date: Date, format: string): string {
  // Split string into an array of the special keywords. (non special characters are left alone)
  const splitSpecials = (str: string): string[] => {
    const regex = new RegExp(
      /(YYYY|MMMM|MMM|MM|M|DD|Do|D|HH|H|mm|m|ss|s|Q|A|a|dddd|ddd|WW|Wo|W|E|.)/gm
    );
    return [...str.matchAll(regex)].map(match => match[0]);
  };

  // Transforms the specials in an array to their corresponding meaning
  const transformSpecials = (arr: string[], date: Date): string[] => {
    const months = {
      short: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      long: [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
      ]
    };

    const days = {
      short: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      long: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    };

    // Transforms a number into an ordinal: 3 -> '3rd'; 25 -> '25th'
    const numToOrdinal = (num: number): string => {
      let str = num.toString();
      if (str[str.length - 1] === '1') str = str + 'st';
      else if (str[str.length - 1] === '2') str = str + 'nd';
      else if (str[str.length - 1] === '3') str = str + 'rd';
      else str = str + 'th';

      return str;
    };

    // Returns number of current week in the year
    const getWeekNumber = (date: Date): number => {
      date = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
      date.setUTCDate(date.getUTCDate() + 4 - (date.getUTCDay() || 7));
      const yearStart = new Date(Date.UTC(date.getUTCFullYear(), 0, 1));
      return Math.ceil(((date.valueOf() - yearStart.valueOf()) / 86400000 + 1) / 7);
    };

    const mappings = {
      YYYY: () => date.getFullYear().toString(),
      MMMM: () => months.long[date.getMonth()],
      MMM: () => months.short[date.getMonth()],
      MM: () => (date.getMonth() + 1).toString().padStart(2, '0'),
      M: () => (date.getMonth() + 1).toString(),
      DD: () => date.getDate().toString().padStart(2, '0'),
      Do: () => numToOrdinal(date.getDate()),
      D: () => date.getDate().toString(),
      HH: () => date.getHours().toString().padStart(2, '0'),
      H: () => date.getHours().toString(),
      mm: () => date.getMinutes().toString().padStart(2, '0'),
      m: () => date.getMinutes().toString(),
      ss: () => date.getSeconds().toString().padStart(2, '0'),
      s: () => date.getSeconds().toString(),
      Q: () => Math.floor(date.getMonth() / 3 + 1).toString(),
      A: () => (date.getHours() < 12 ? 'AM' : 'PM'),
      a: () => (date.getHours() < 12 ? 'am' : 'pm'),
      dddd: () => days.long[date.getDay()],
      ddd: () => days.short[date.getDay()],
      E: () => (date.getDay() + 1).toString(),
      WW: () => getWeekNumber(date).toString().padStart(2, '0'),
      Wo: () => numToOrdinal(getWeekNumber(date)),
      W: () => getWeekNumber(date).toString()
    };

    return arr.map(str => (mappings[str as keyof typeof mappings] ? mappings[str as keyof typeof mappings]() : str));
  };

  return transformSpecials(splitSpecials(format), date).join('');
}

// Example usage:
// console.log(formatDate_Part1(new Date(), 'YYYY-MM-DD HH:mm:ss'));
// console.log(formatDate_Part2(new Date(), 'YYYY-MMMM-DD HH:mm:ss dddd, Wo'));

export { formatDate_Part1, formatDate_Part2 };
