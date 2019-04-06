import Util from "@/utils/Util";

export default {
     
    /**
     * Get the difference in milliseconds of the calling Samay instance from the Samay instance passed as argument.
     * @param samay 
     * @return Number milliseconds
     */
    diffInMilliseconds(samay){
        if(!samay) samay = Samay.now();
        return this._time - samay._time;
    },

	/**
	 * Get the difference in seconds of the calling Samay instance from the Samay instance passed as argument.
	 * @param samay
	 * @return Number seconds
	 */
	diffInSeconds(samay){
		return Math.trunc(this.diffInMilliseconds(samay)/1000);
	},

	/**
	 * Get the difference in minutes of the calling Samay instance from the Samay instance passed as argument.
	 * @param samay
	 * @return Number minutes
	 */
	diffInMinutes(samay){
		return Math.trunc(this.diffInMilliseconds(samay)/Util.millisecondsInMinute());
	},

	/**
	 * Get the difference in hours of the calling Samay instance from the Samay instance passed as argument.
	 * @param samay
	 * @return Number hours
	 */
	diffInHours(samay){
		return Math.trunc(this.diffInMilliseconds(samay)/Util.millisecondsInHour());
	},

	/**
	 * Get the difference in days of the calling Samay instance from the Samay instance passed as argument.
	 * @param samay
	 * @return Number days
	 */
	diffInDays(samay){
		return Math.trunc(this.diffInMilliseconds(samay)/Util.millisecondsInDay());
	},

	/**
	 * Get the difference in weeks of the calling Samay instance from the Samay instance passed as argument.
	 * @param samay
	 * @return Number weeks
	 */
	diffInWeeks(samay){
		return Math.trunc(this.diffInMilliseconds(samay)/(7*Util.millisecondsInDay()));
	},

	/**
	 * Get the difference in months of the calling Samay instance from the Samay instance passed as argument.
	 * @param samay
	 * @return Number months
	 */
	diffInMonths(samay){
		return Math.trunc(this.diffInMilliseconds(samay)/(30*Util.millisecondsInDay()));
	},

	/**
	 * Get the difference in quarters of the calling Samay instance from the Samay instance passed as argument.
	 * @param samay
	 * @return Number quarters
	 */
	diffInQuarters(samay){
		return Math.trunc(this.diffInMilliseconds(samay)/(91*Util.millisecondsInDay()));
	},

	/**
	 * Get the difference in years of the calling Samay instance from the Samay instance passed as argument.
	 * @param samay
	 * @return Number years
	 */
	diffInYears(samay){
		return Math.trunc(this.diffInMilliseconds(samay)/(365*Util.millisecondsInDay()));
	},

	/**
	 * Get the difference of calling Samay instance from the Samay instance passed as argument in human readable format.
	 * @param samay
	 * @return String
	 */
	diffForHumans(samay){
		let unit, diff, relative;
		let relativeWords = samay == null ? ['ago', 'from now'] : ['before', 'after'];
		let units = ['millisecond', 'second', 'minute', 'hour', 'day', 'week', 'month', 'year'];

		units.forEach(u => {
		    let method = `diffIn${Util.ucwords(u)}s`;
		    let value = this[method](samay);
		    if(value){
		        diff = Math.abs(value);
		        relative = Math.sign(value) === -1 ? relativeWords[0] : relativeWords[1];
		        unit = diff > 1 ? `${u}s` : u;
		    }
		});

		return `${diff} ${unit} ${relative}`;
	}
}