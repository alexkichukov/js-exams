class Watch {
  private date: Date;
  private chrono: Date | null;
  private interval: NodeJS.Timer | null;
  private activeWatches: { [key: string]: { date: Date; format?: string } };

  constructor(date?: Date) {
    this.date = date ? date : new Date();
    this.interval = null;
    this.chrono = null;
    this.activeWatches = {};
  }

  showTime(format?: string, timeZone?: string, callback?: (arr: string[]) => any) {
    timeZone = timeZone || Intl.DateTimeFormat().resolvedOptions().timeZone;

    // If watch for this timezone is already existing delete it and return
    if (this.activeWatches[timeZone]) {
      this.hideTime(timeZone); 
      return;
    }

    // Set active watch for timezone
    this.activeWatches[timeZone] = {
      date: new Date(this.date.toLocaleString('en-US', { timeZone })),
      format
    };

    if (this.interval) return;

    // Add interval when none exists yet
    this.interval = setInterval(() => {
      // Strings to print
      const strings: string[] = [];
      const watches = Object.entries(this.activeWatches);
      for (const [tz, { date, format }] of watches) {
        const time = format ? Watch.formatDate(date, format) : date.toLocaleString('en-UK');
        strings.push(tz + ': ' + time);
        date.setSeconds(date.getSeconds() + 1);
      }

      // Output all
      console.log(strings.join('\n'));
      console.log('----------------');

      // Call callback if passed
      if (callback) callback(strings);
    }, 1000);
  }

  hideTime(timeZone?: string) {
    timeZone = timeZone || Intl.DateTimeFormat().resolvedOptions().timeZone;
    delete this.activeWatches[timeZone];

    // Stop interval if no active watches remain
    if (Object.entries(this.activeWatches).length === 0 && this.interval)
      clearInterval(this.interval);
    this.interval = null;
  }

  chronoStart() {
    this.chrono = new Date();
    console.log('Chronometer started!');
  }

  chronoStop() {
    if (!this.chrono) throw new Error('Chronometer has not been started yet!');

    const elapsed = (new Date().getTime() - this.chrono.getTime()) / 1000;
    console.log(`Chronometer stopped: ${elapsed} seconds elapsed.`);
  }

  private static formatDate(date: Date, format: string): string {
    // Split string into an array of the special keywords. (non special characters are left alone)
    const splitSpecials = (str: string): string[] => {
      const regex = new RegExp(
        /(YYYY|MMMM|MMM|MM|M|DD|Do|D|HH|H|mm|m|ss|s|Q|A|a|dddd|ddd|WW|Wo|W|E|.)/gm
      );
      return [...str.matchAll(regex)].map(match => match[0]);
    };

    // Transforms the specials in an array to their corresponding non meaning
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

      const mappings: { [key: string]: () => string } = {
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

      return arr.map(str => (mappings[str] ? mappings[str]() : str));
    };

    return transformSpecials(splitSpecials(format), date).join('');
  }
}

// Example usage:
// const watch = new Watch();
// watch.showTime();
// watch.showTime(undefined, 'Asia/Shanghai');
// watch.showTime(undefined, 'Brazil/West');
// watch.chronoStart();
// setTimeout(() => watch.hideTime('Asia/Shanghai'), 4000);
// setTimeout(() => watch.chronoStop(), 5000);

export default Watch;
