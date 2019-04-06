import Util from "@/utils/Util";

export default {

    /**
     * Add the time equivalent to the given number of years to the Samay instance.
     * @param Number years
     * @return this
     */
    addYears(years){
        let days=0;
        for(let i=1; i<=years; i++){
            days += Util.isLeapYear(this._year+i) ? 366 : 365;
        }
        this.addProp(this._time + (days*24*60*60*1000));
        return this;
    },

    /**
     * Subtract the time equivalent to the given number of years from the Samay instance.
     * @param Number years
     * @return this
     */
    subtractYears(years){
        let days = 0;
        for(let i=years; i>0; i--){
            days += Util.isLeapYear(this._year-i) ? 366 : 365;
        }
        this.subtractProp(this._time - (days*24*60*60*1000));
        return this;
    },

    /**
     * Add the time/milliseconds equivalent to the given quarters to the Samay instance.
     * @param Number quarters
     * @return this
     */
    addQuarters(quarters){
        if(! quarters) return this;
        return this.addMonths(3 * quarters); 
    },

    /**
     * Subtract the time/milliseconds equivalent to the given quarters from the Samay instance.
     * @param Number quarters
     * @return this
     */
    subtractQuarters(quarters){
        if(! quarters) return this;
        this.subtractMonths(3 * quarters);
        return this;
    },

    /**
     * Add time/milliseconds representing the given number of months to the Samay instance.
     * @param Number months
     * @return this.
     */
    addMonths(months){        
        if(!months) return this;

        if(Math.sign(months) === -1) return this.subtractMonths(Math.abs(months));

        let isLastDay = this.daysInMonth() === this._date;
        let days = this.daysInMonth()-this._date;
        let year = this._year;
        let month = this._month+1;      //to start adding days from next month

        for(let i=1; i<months; i++){
            
            if(month > 12){
                year += 1;
                month = Math.abs(12-(month));
            }
            
            days += this.daysInMonth(year, month);
            month += 1;
        }

        days += isLastDay ?  this.daysInMonth(year, month) : this._date;

        this.addProp(this._time + days*24*60*60*1000);
        
        return this;
    },

    /**
     * Subtract time/milliseconds representing the given number of months from the Samay instance.
     * @param Number months
     * @return this.
     */
    subtractMonths(months){
        if(! months) return this;

        if(Math.sign(months) === -1) return this.addMonths(Math.abs(months));

        let isLastDay = this.daysInMonth() === this._date;
        let days = this._date;
        let year = this._year;
        let month = this._month-1;
        
        for(let i=1; i<months; i++){
            if(month < 1){
                year -= 1;
                month = 12;
            }           
            
            days += this.daysInMonth(year, month);
            
            month -= 1;
        }        
        
        days += isLastDay ? 0 : this.daysInMonth(year, month)-(this._date);
        
        this.subtractProp(this._time - days*24*60*60*1000);

        return this; 
    },

    /**
     * Add time representing the number of weeks passed as argument to the Samay instance.
     * @param Number weeks
     * @return this
     */
    addWeeks(weeks){
        if(! weeks) return this;
        return this.addProp(this._time + (weeks*7*24*60*60*1000));
    },

    /**
     * Subtract milliseconds representing the number of weeks passed as argument to the Samay instance.
     * @param Number weeks
     * @return this
     */
    subtractWeeks(weeks){
        if(! weeks) return this;
        return this.subtractProp(this._time - (weeks*7*24*60*60*1000));
    },

     /**
     * Add the given number of days to the Samay
     * @param Number days
     * @return this
     */
    addDays(days){
        if(! days) return this;
        return this.addProp(this._time+(days*24*60*60*1000));
    },

     /**
     * Subtract the given number of days to the Samay
     * @param Number days
     * @return this
     */
    subtractDays(days){
        if(! days) return this;
        return this.subtractProp(this._time - (days*24*60*60*1000));
    },

    /**
     * Add the given number of hours to the Samay
     * @param Number hours
     * @return this
     */
    addHours(hours){
        if(! hours) return this;
        return this.addProp(this._time + (hours*60*60*1000));
    },

     /**
     * Subtract the given number of hours to the Samay
     * @param Number hours
     * @return this
     */
    subtractHours(hours){
        if(! hours) return this;
        return this.subtractProp(this._time - (hours*60*60*1000));
    },

     /**
     * Add the given number of minutes to the Samay
     * @param Number minutes
     * @return this
     */
    addMinutes(minutes){
        if(! minutes) return this;
        return this.addProp(this._time + (minutes*60*1000));
    },

     /**
     * Subtract the given number of minutes to the Samay
     * @param Number minutes
     * @return this
     */
    subtractMinutes(minutes){
        if(! minutes) return this;
        return this.subtractProp(this._time - (minutes*60*1000));
    },

     /**
     * Add the given number of seconds to the Samay
     * @param Number seconds
     * @return this
     */
    addSeconds(seconds){
        if(! seconds) return this;
        return this.addProp(this._time + (seconds*1000));
    },

     /**
     * Subtract the given number of seconds to the Samay
     * @param Number seconds
     * @return this
     */
    subtractSeconds(seconds){
        if(! seconds) return this;
        return this.subtractProp(this._time - (seconds*1000));
    },

     /**
     * Add the given number of milliseconds to the Samay
     * @param Number milliseconds
     * @return this
     */
    addMilliseconds(milliseconds){
        if(! milliseconds) return this;
        return this.addProp(this._time + milliseconds);
    },

     /**
     * Subtract the given number of milliseconds to the Samay
     * @param Number milliseconds
     * @return this
     */
    subtractMilliseconds(milliseconds){
        if(! milliseconds) return this;
        return this.subtractProp(this._time-milliseconds);
    }

}