import SYMBOL from './Symbol';
import FORMAT from './Format';
import MONTHS from './Months';
import Util from './Util';
// let colors = require('colors/safe');
class Factory{
	constructor(dateString, format=null){
		this.format = format;
		this.dateString = dateString;
	}

	/**
	 * Static constructor
	 */
	static create(dateString, format=null, utc=false){
		// console.log(`Factory.create dateString:${dateString} format:${format}`);
		let self = new Factory(dateString, format);
		format = format !== null ? format : self.parseFormat(dateString);

		//let dateInputString = self.buildInputStringForNewJsDate(format, dateString, utc);
		let dateArgs = self.getDateArgs(format, dateString);

		// return dateInputString;
		return utc === false ?  new Date(...dateArgs) : new Date(Date.UTC(...dateArgs));
	}

	
	/**
	 * All valid formats for dateString are listed in the FORMAT object. Try to parse the given dateString
	 * to check if it conforms to any of the valid formats which exist in the FORMAT object. If a match
	 * is found then return the corresponding valid format from the FORMAT object.
	 * @param String dateString
	 * @return String format
	 */
	parseFormat(dateString){
		let format;
		let validFormats = new Set(Object.getOwnPropertyNames(FORMAT));
		validFormats.forEach(valid => {
			let regex = new RegExp(FORMAT[valid]['regex'], 'g');
			if(regex.test(dateString)){
				format = valid;
			}
		});
		if(! format) 
			throw new Error(`Invalid Format: The given "${dateString}" does not conform to acceptable formats.`);

		return format ; 
	}

	/**
	 * Split the format into array of constituent symbols.
	 * @param String dateString
	 * @param String format
	 * @return Array
	 */
	getSymolsFromFormat(format){
		if(format === 'UTC'){
			return ['Y', 'm', 'd', 'H', 'i', 's']; 
		}
		if(format === 'ISO'){
			return ['Y', 'm', 'd', 'H', 'i', 's', 'tz'];
		}
		format = format.replace(/\-/g, ' ').replace(/\//g, ' ').replace(/\:/g, ' ');
		return format.split(' ');
	}

	/**
	 * Split the given dateString into array corresponding to constituent symbols.
	 * @param String dateString
	 * @param String format
	 * @return Array
	 */
	getSymbolsFromDateString(dateString, format){
		if(format === 'UTC'){
			dateString = dateString.replace('T', ' ').replace('Z', '');
		}
		if(format === 'ISO'){
			dateString = dateString.replace('T', ' ').replace('+', " +");
		}
		dateString = dateString.replace(/\-/g, ' ').replace(/\//g, ' ').replace(/\:/g, ' ');
		return dateString.split(' ');
	}

	/**
	 * Build an array which can be passed as arguments to create a new javascript Date object.
	 * @param String format
	 * @param String dateString
	 * @return Array
	 */
	getDateArgs(format, dateString){
		let formatSymbols = this.getSymolsFromFormat(format);
		let dateSymbols = this.getSymbolsFromDateString(dateString, format);
		// console.log('formatSymbols'); console.log(formatSymbols);
		// console.log('dateSymbols'); console.log(dateSymbols);
		let year, month, date, hours, minutes, seconds, milliseconds;
		year = dateSymbols[formatSymbols.indexOf('Y')] || null;
		month = this.getMonth(formatSymbols, dateSymbols)-1;
		date = Util.padstr(dateSymbols[formatSymbols.indexOf('d')]);
		hours = this.getHours(formatSymbols, dateSymbols);
		minutes = this.getMinutes(formatSymbols, dateSymbols);
		seconds = this.getSeconds(formatSymbols, dateSymbols);
		milliseconds = dateSymbols[formatSymbols.indexOf('ms')] || null;

		return [year, month, date, hours, minutes, seconds, milliseconds];
	}

	/**
	 * Get the month (number formatted as padded string) from the given dateString.
	 * @param Array formatSymbols
	 * @param Array dateSymbols
	 * @return String 
	 */
	getMonth(formatSymbols, dateSymbols){
		let returnValue, check, regex;
		let lookup = ['m', 'M', 'MM'];
		//let lookup = {'m':{method:'getMonthFromIndex'}, 'M': {method:'getMonthFromMonthShort'}, 'MM':{method:'getMonthFromMonthName'}}
		let monthSymbol = this.lookupInputSymbol(lookup, formatSymbols);
		if(! monthSymbol) return null;
		let monthValue = dateSymbols[formatSymbols.indexOf(monthSymbol)];

		regex = new RegExp(`^${SYMBOL[monthSymbol]['regex']}$`);
		if(! regex.test(monthValue)) 
			throw new Error (`Invalid Input: The value "${monthValue}" does not conform to "${monthSymbol}" month format`);
		if(monthSymbol !== 'm') monthValue = this.getMonthValueByName(monthValue);

		return Util.padstr(monthValue);
	}

	/**
	 * Get the numeric value representing the month of the year from the month name.
	 * @param String name
	 * @return Number
	 */
	getMonthValueByName(name){
		let monthObj = MONTHS.find(item => {
			return (item.short === name || item.name === name);
		});
		return monthObj.month;
	}

	/**
	 * Get the hours (number formatted as padded string).
	 * @param Array formatSymbols
	 * @param Array dateSymbols
	 * @return String
	 */
	getHours(formatSymbols, dateSymbols){
		let lookup = ['H', 'hh', 'g'];
		let hourSymbol = this.lookupInputSymbol(lookup, formatSymbols);
		if(! hourSymbol) return '00';

		let hourValue = dateSymbols[formatSymbols.indexOf(hourSymbol)];

		let regex = new RegExp(`^${SYMBOL[hourSymbol]['regex']}$`);
		// if(! regex.test(Util.padstr(hourValue))) 
		if(! regex.test(hourValue)) 			
			throw new Error (`Invalid Input: The value "${hourValue}" does not conform to "${hourSymbol}" hours format`);

		if(hourSymbol === 'g') hourValue = this.getHourValueFromMeridianHours(formatSymbols, dateSymbols);

		return Util.padstr(hourValue);
	}

	/**
	 * Get the hours in 24 hour format from 12 hour format.
	 * @param Array formatSymbols
	 * @param Array dateSymbols
	 * @return String
	 */
	getHourValueFromMeridianHours(formatSymbols, dateSymbols){
		let hourValue = dateSymbols[formatSymbols.indexOf('g')];
		let meridianValue = dateSymbols[formatSymbols.indexOf('A')];
		let regex = new RegExp(`^${SYMBOL.A.regex}$`);
		if(! regex.test(meridianValue))			
			throw new Error (`Invalid Input: The value "${meridianValue}" does not conform to "A" meridian format`);
		return (meridianValue === 'PM' || meridianValue === 'pm') ? Util.parseInt(hourValue)+12 : hourValue;
	}

	/**
	 * Get the minutes (number formatted as padded string).
	 * @param Array formatSymbols
	 * @param Array dateSymbols
	 * @return String
	 */
	getMinutes(formatSymbols, dateSymbols){
		let lookup = ['i', 'mm'];
		let minuteSymbol = this.lookupInputSymbol(lookup, formatSymbols);
		if(! minuteSymbol) return '00';

		let minuteValue = dateSymbols[formatSymbols.indexOf(minuteSymbol)];

		let regex = new RegExp(`^${SYMBOL[minuteSymbol]['regex']}$`);
		if(! regex.test(minuteValue)) 			
			throw new Error (`Invalid Input: The value "${minuteValue}" does not conform to "${minuteSymbol}" minutes format`);

		return minuteSymbol ? Util.padstr(dateSymbols[formatSymbols.indexOf(minuteSymbol)]) : '00';
	}

	/**
	 * Get the seconds (number formatted as padded string).
	 * @param Array formatSymbols
	 * @param Array dateSymbols
	 * @return String
	 */
	getSeconds(formatSymbols, dateSymbols){
		let lookup = ['s', 'ss'];
		let secondsSymbol = this.lookupInputSymbol(lookup, formatSymbols);
		if(! secondsSymbol) return '00';

		let secondsValue = dateSymbols[formatSymbols.indexOf(secondsSymbol)];

		let regex = new RegExp(`^${SYMBOL[secondsSymbol]['regex']}$`);
		if(! regex.test(secondsValue)) 			
			throw new Error (`Invalid Input: The value "${secondsValue}" does not conform to "${secondsSymbol}" seconds format`);

		return secondsSymbol ? Util.padstr(dateSymbols[formatSymbols.indexOf(secondsSymbol)]) : '00';
	}

	/**
	 * Each part of the dateString may correspond to one of the many symbols which can represent the part
	 * For eg: month may be represented by any one from within ['m', 'M', 'MM'] which is lookup array
	 * Find the match to ascertain the symbol given in the input dateString to represent the part.
	 * @param Array lookup
	 * @param Array formatSymbols
	 * @return String
	 */
	lookupInputSymbol(lookup, formatSymbols){
		// if(typeof lookup === 'object'){
		// 	lookup = Object.getOwnPropertyNames(lookup);
		// }
		let input = lookup.filter(item => {
			return formatSymbols.indexOf(item) >= 0;			
		});
		return input[0];
	}
}

export default Factory;