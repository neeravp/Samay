import DAYS from './Days';
import MONTHS from './Months';

class Util{
	constructor(){}	

	/**
	 * Function to pad a number with leading padChar(s) upto the specified width.
	 * @param Number num
	 * @param Number width - defaults to 2
	 * @param String padChar - defaults to '0'
	 * @return String
	 */	 
    static padstr(num, width=2, padChar = '0') {
        num = num + '';
        return num.length >= width ? num : new Array(width - num.length + 1).join(padChar) + num;
    }

    /**
     * Returns a formatted timezone string in GMT+/- hh:mm for a given Date/Samay instance.
     * @param Samay/Date day
     * @param String base - defaults to 'GMT'
     * @return String
     */
    static getTimezone(day, base='GMT') {
    	let offset = day._tzOffset;
    	if(!offset) 
    		offset = new Date(day._year, day._month, day._date, day._hours, day._minutes, day._seconds, day._milliseconds).getTimezoneOffset();
        let sign = Math.sign(offset) === -1 ? '+' : '-';
        let val = Math.abs(offset);
        let hour = Math.floor(val / 60);
        let min = val - (hour * 60);

        return `${base}${sign}${Util.padstr(hour,2)}:${Util.padstr(min,2)}`;
    }

    /**
     * Function to trim the leading and trailing whitespaces.
     * @param Mixed input
     * @return Mixed
     */
    static trim(input) {
        return input.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
        //return input.replace(/^\s+|\s+$/g, '');
    }

    /**
     * Checks whether a given value is a negative or positive number.
     * @param Number
     * @return Boolean
     */
    static isNegative(value){
        return Math.sign(value) > -1 ? false : true;
    }

    /**
     * Check whether the given year is a Leap Year or not.
     * @param Number year
     * @return Boolean
     */
    static isLeapYear(year){
        return ((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0);
    }

    /**
     * Function to get ordinals for string representation of dates like 2nd/3rd etc
     * @param Number n
     * @return String
     */
    static getOrdinal(n) {
        var s = ["th", "st", "nd", "rd"],
            v = n % 100;
        return n + (s[(v - 20) % 10] || s[v] || s[0]);
    }

    /**
     * Function to parse a value to integer
     * @param String
     * @return Integer
     */
    static parseInt(value) {
        if (/^(\-|\+)?([0-9]+|Infinity)$/.test(value))
            return Number(value);
        return NaN;
    }

    /**
     * Get a substring from the given value from the start of string upto the length specified.
     * Used for getting the dayShort and monthShort properties for Samay instance.
     * @param String value
     * @param Number length
     * @return String
     */
    static getShort(value, length=3){
    	return value.substr(0,length);
    }

    /**
     * Return the signed minutes difference from UTC/GMT for a given dateString.
	 * @param String dateString
	 * @return Number minutes (signed)
	 */
	static getTimezoneFromDateString(dateString){
		let tzIdentifier = dateString.indexOf('+') < 0 ? '-' : '+';
		let timezoneString = dateString.substr(dateString.indexOf(tzIdentifier));
		return Util.parseTimezoneOffset(timezoneString);
	}

	/**
	 * Parse the timezone given in +/- hh:mm and return the timezoneOffset in minutes with sign.
	 * @param String timezoneString
	 * @return Number minutes (signed)
	 */
	static parseTimezoneOffset(timezoneString){
		let sign = timezoneString.substr(0,1) === '+' ? -1 : 1;		
		let parts = timezoneString.replace('+', '').replace('-', '0').split(':');
		let minutes =  Util.parseInt(parts[0])*60 + Util.parseInt(parts[1]);

		return minutes*sign;
	}

	/**
	 * Check whether the date is a valid date or not.
	 * @param Date date
	 */
	static isValidDate(date){
		return !isNaN(date.getTime());
	}

	/**
	 * Capitalizes the first letter of each word of the given string.
	 * @param {any} str
	 * @returns
	 */
	static ucwords(str){
	    str = str.trim();
	    return str.split(' ').map((s) => (s.slice(0, 1).toUpperCase() + s.slice(1).toLowerCase())).join(' ');
	}
}

export default Util;

