import DAYS from './utils/Days';
import MONTHS from './utils/Months';
import SYMBOL from './utils/Symbol';
import FORMAT from './utils/Format';
import Util from './utils/Util';
import Factory from './utils/Factory';


class Samay {

    constructor(...args) {
        // console.log(args);
        if(args.length > 1) args[1] -= 1;
        let date = new Date(...args);
        
        if(! Util.isValidDate(date)) throw new Error(`Invalid Input: "${args.join()}" is not a valid input for Samay.`);

        this._buildProperties(date);
       
    }

    /**
     * Populate the values of properties.
     */
    _buildProperties(date) {
        this._date = date.getDate();
        this._dayOfWeek = date.getDay() === 0 ? 7 : date.getDay();
        this._day = DAYS[this._dayOfWeek];
        this._month = date.getMonth()+1;
        this._monthName = MONTHS[date.getMonth()]['name'];
        this._year = date.getFullYear();
        this._hours = date.getHours();
        this._minutes = date.getMinutes();
        this._seconds = date.getSeconds();
        this._milliseconds = date.getMilliseconds();
        this._tzOffset = date.getTimezoneOffset();
        this._time = date.getTime();
    }

    /**
     * Create a new Samay instance representing the present moment.
     * @return Samay instance
     */
    static now() {
        let date = new Date();
        let samay = new Samay();
        return samay;
    }

    /**
     * Try to parse the given dateString and if possible return a new Samay instance.
     * representing the date (and time) identified by the given dateString.
     * @param String dateString
     * @return Samay
     */
     static parse(dateString){
        if(!dateString) return Samay.now();

        dateString = Util.trim(dateString);

        let date = Factory.create(dateString);

        let samay = new Samay();

        samay._buildProperties(date);

        return samay;
     }

    /**
     * Create a new Samay instance from the given dateString in the given format.
     * @param String dateString
     * @param String format
     * @return Samay instance
     */
    static createFromFormat(format, dateString) {
        dateString = Util.trim(dateString);

        let date = Factory.create(dateString, format);
        
        let samay = new Samay();

        samay._buildProperties(date);

        if(format === 'ISO-TZ'){
            let tz = Util.getTimezoneFromDateString(dateString);
            samay._tzOffset = tz;
        }

        return samay;
    }

    /**
     * Create a new Samay instance from the given dateString in the given format.
     * @param String dateString
     * @param String format
     * @return Samay instance
     */
    static create(format, dateString) {
       
        dateString = Util.trim(dateString);

        let date = Factory.create(dateString, format);
        
        let samay = new Samay();

        samay._buildProperties(date);

        if(format === 'ISO-TZ'){
            let tz = Util.getTimezoneFromDateString(dateString);
            samay._tzOffset = tz;
        }
        return samay;
    }

    /**
     * Create a Samay instance representing UTC date instead of local date.
     * @param Number year
     * @param Number month
     * @param Number date
     * @return Samay
     */
     static UTC(...args){
        if(typeof args[0] === 'string' && args.length === 2){

            let date = Factory.create(Util.trim(args[1]), Util.trim(args[0]), true);

            let samay = new Samay();

            samay._buildProperties(date);
            
            return samay;
        }
        if(typeof args[0] === 'string' && args.length === 1){
            let date = Factory.create(Util.trim(args[0]), null, true);

            let samay = new Samay();

            samay._buildProperties(date);

            return samay;
        }
        if(typeof args[0] === 'number'){
            let date = new Date(Date.UTC(...args));

            let samay = new Samay();

            samay._buildProperties(date);

            return samay;
        }
     }

    /**
     * Return a formatted string representation of the Samay instance on which 
     * the format method is called as per the given formatString.
     * @param String formatString
     * @return String Samay's string representation.
     */
    format(formatString) {
        let formatted;
        if(FORMAT.hasOwnProperty(formatString)){
            formatted = formatString
                    .replace(SYMBOL.Y.validator, this.replacer(SYMBOL.Y.prop) )
                    .replace(SYMBOL.ms.validator, this.replacer(SYMBOL.ms.prop))
                    .replace(SYMBOL.m.validator, this.replacer(SYMBOL.m.prop))
                    .replace(SYMBOL.d.validator, this.replacer(SYMBOL.d.prop))
                    .replace(SYMBOL.H.validator, this.replacer(SYMBOL.H.prop))
                    .replace(SYMBOL.g.validator, this.replacer(SYMBOL.g.prop))
                    .replace(SYMBOL.i.validator, this.replacer(SYMBOL.i.prop))
                    .replace(SYMBOL.s.validator, this.replacer(SYMBOL.s.prop))
                    .replace(SYMBOL.D.validator, this.replacer(SYMBOL.D.prop))
                    .replace(SYMBOL.DD.validator, this.replacer(SYMBOL.DD.prop))
                    .replace(SYMBOL.MM.validator, this.replacer(SYMBOL.MM.prop))
                    .replace(SYMBOL.M.validator, this.replacer(SYMBOL.M.prop))
                    .replace(SYMBOL.A.validator, this.replacer(SYMBOL.A.prop))
                    .replace(SYMBOL.tz.validator, this.replacer(SYMBOL.tz.prop))
                    .replace(SYMBOL.ISO.validator, this.replacer(SYMBOL.ISO.prop))
                    .replace(SYMBOL.UTC.validator, this.replacer(SYMBOL.UTC.prop))
                    .replace(SYMBOL.RSS.validator, this.replacer(SYMBOL.RSS.prop))
                    .replace(SYMBOL.Atom.validator, this.replacer(SYMBOL.Atom.prop))
                    .replace(SYMBOL.Cookie.validator, this.replacer(SYMBOL.Cookie.prop))
                    ;
                    
                return formatted;
        }
        console.error('Format is not supported');
    }

    replacer(prop){
        return function(match, p1, p2){
            // console.log(`prop:${prop}, replacer return: ${p1+this[prop].call(this)}`);
            return p1 + this[prop].call(this);
        }.bind(this);
    }

    /**
     * Clone the Samay instance and return a new Samay instance with identical properties.
     * Useful for fluent API and avoid mutation of the base Samay object.
     * @return Samay new instance.
     */
    clone(samay = new Samay()){            
        Object.getOwnPropertyNames(samay).forEach(prop => {
            if(this.hasOwnProperty(prop)){
                samay[prop] = this[prop];
            }
        });
        return samay;
    }

    /**
     * Clone the properties of a Samay object.
     * @param Samay instance
     * @return this
     */
    cloneProps(samay){
        Object.getOwnPropertyNames(this).forEach(prop => {
            if(samay.hasOwnProperty(prop)){
                this[prop] = samay[prop];
            }
        });
        return this;
    }
    //-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    //              Arithmetic functions on date and time.
    //----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    /**
     * Base method used for performing the addition operations on a Samay object
     * Create a new Samay with desired value to be added for any given prop
     * Clone its props to the current Samay instance and return it.
     * @param Number value
     * @return this
     */
    addProp(value){
        if(! value) return this;
        let tz = this._tzOffset;
        let samay = new Samay(value);
        this.cloneProps(samay);
        this._tzOffset = tz;
        return this;
    }
    /**
     * Base method used for performing the subtraction operations on a Samay object
     * Create a new Samay with desired value to be added for any given prop
     * Clone its props to the current Samay instance and return it.
     * @param Number value
     * @return this
     */
    subtractProp(value){
        if(! value) return this;
        if(Util.isNegative(value)) throw new Error('Negative values are not allowed for subtraction');

        let tz = this._tzOffset;
        let samay = new Samay(value);
        this.cloneProps(samay);
        this._tzOffset = tz;
        return this;
    }


    /**
     * Add the given number of hours to the Samay
     * @param Number hours
     * @return this
     */
    addHours(hours){
        if(! hours) return this;
        return this.addProp(this._time + (hours*60*60*1000));
    }

     /**
     * Subtract the given number of hours to the Samay
     * @param Number hours
     * @return this
     */
    subtractHours(hours){
        if(! hours) return this;
        return this.subtractProp(this._time - (hours*60*60*1000));
    }

     /**
     * Add the given number of minutes to the Samay
     * @param Number minutes
     * @return this
     */
    addMinutes(minutes){
        if(! minutes) return this;
        return this.addProp(this._time + (minutes*60*1000));
    }

     /**
     * Subtract the given number of minutes to the Samay
     * @param Number minutes
     * @return this
     */
    subtractMinutes(minutes){
        if(! minutes) return this;
        return this.subtractProp(this._time - (minutes*60*1000));
    }

     /**
     * Add the given number of seconds to the Samay
     * @param Number seconds
     * @return this
     */
    addSeconds(seconds){
        if(! seconds) return this;
        return this.addProp(this._time + (seconds*1000));
    }

     /**
     * Subtract the given number of seconds to the Samay
     * @param Number seconds
     * @return this
     */
    subtractSeconds(seconds){
        if(! seconds) return this;
        return this.subtractProp(this._time - (seconds*1000));
    }

     /**
     * Add the given number of milliseconds to the Samay
     * @param Number milliseconds
     * @return this
     */
    addMilliseconds(milliseconds){
        if(! milliseconds) return this;
        return this.addProp(this._time + milliseconds);
    }

     /**
     * Subtract the given number of milliseconds to the Samay
     * @param Number milliseconds
     * @return this
     */
    subtractMilliseconds(milliseconds){
        if(! milliseconds) return this;
        return this.subtractProp(this._time-milliseconds);
    }

    //-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    //              Functions to manipulate Days
    //----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    /**
     * Return on the day of current year to which the time moment represented by Samay belongs.
     * @return Number day
     */
    dayOfYear(){
        let dayProp = Util.isLeapYear(this._year) ? 'daysInLeapYear' : 'days';
        let day = this._date;
        for(let i=this._month-1; i>0; i--){
            day += MONTHS[this._month-1-i][dayProp];
        }

        return day;
    }

     /**
     * Add the given number of days to the Samay
     * @param Number days
     * @return this
     */
    addDays(days){
        if(! days) return this;
        return this.addProp(this._time+(days*24*60*60*1000));
    }

     /**
     * Subtract the given number of days to the Samay
     * @param Number days
     * @return this
     */
    subtractDays(days){
        if(! days) return this;
        return this.subtractProp(this._time - (days*24*60*60*1000));
    }

    /**
     * Mutate the Samay instance to represent the end of current day.
     * @return this
     */
    endOfDay(){
        this._hours = 23;
        this._minutes = 59;
        this._seconds = 59;
        this._milliseconds = 999;
        return this;
    }

    /**
     * Mutate the Samay instance to represent the start of the current day.
     * @return this
     */
    startOfDay(){
        this._hours = 0;
        this._minutes = 0;
        this._seconds = 0;
        this._milliseconds = 1;
        return this;
    }

    /**
     * Mutate the Samay instance to represent the same time on the day after.
     * @return this
     */
    nextDay(){
        return this.addProp(this._time + 24*60*60*1000);
    }

    /**
     * Mutate the Samay instance to represent the same time of the day before.
     * @return this
     */
    previousDay(){
        return this.subtractProp(this._time - 24*60*60*1000);
    }
    
    //-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    //              Functions to manipulate Weeks
    //----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    /**
     * Return the week number of the current year to which time moment represented by Samay instance belongs.
     * @return Number
     */
    weekOfYear(){
        return Math.ceil(this.dayOfYear()/7);
    }

    /**
     * Return the week number of the current month to which the time moment represented by Samay instance belongs.
     * @return Number
     */
    weekOfMonth(){
        return Math.ceil(this._date/7);
    }

    /**
     * Return the total number of weeks in the month to which time moment represented by Samay instance belongs.
     * @rreturn Number
     */
    weeksInMonth(){
        let firstOfMonth = this.clone().startOfMonth();
        let dayProp = Util.isLeapYear(this._year) ? 'daysInLeapYear' : 'days';
        return Math.ceil( (firstOfMonth._dayOfWeek-1 + MONTHS[this._month-1][dayProp]) / 7);
    }

    /**
     * Add time representing the number of weeks passed as argument to the Samay instance.
     * @param Number weeks
     * @return this
     */
    addWeeks(weeks){
        if(! weeks) return this;
        return this.addProp(this._time + (weeks*7*24*60*60*1000));
    }

    /**
     * Subtract milliseconds representing the number of weeks passed as argument to the Samay instance.
     * @param Number weeks
     * @return this
     */
    subtractWeeks(weeks){
        if(! weeks) return this;
        return this.subtractProp(this._time - (weeks*7*24*60*60*1000));
    }

    /**
     * Mutate the Samay instance to represent the first day of the week to which the 
     * time moment represented by the Samay instance belongs.
     * @return this
     */
    startOfWeek(){
        return this.subtractProp(this._time - ((this._dayOfWeek-1)*24*60*60*1000));
    }

    /**
     * Mutate the Samay instance to represent the last day of the week to which the 
     * time moment represented by the Samay instance belongs.
     * @return this
     */
    endOfWeek(){
        return this.addProp(this._time + ((7-this._dayOfWeek)*24*60*60*1000));
    }

    /**
     * Mutate the Samay instance to represent the same day in week before.
     * @return this
     */
    previousWeek(){
        return this.subtractWeeks(1);
    }

    /**
     * Mutate the Samay instance to represent the same day in week after.
     * @return this
     */
    nextWeek(){
        return this.addWeeks(1);
    }

    /**
     * Mutate the Samay instance to represent the same day in week before @weeks number of weeks.
     * @param Number weeks
     * @return this
     */
    weekBefore(weeks){
        return this.subtractWeeks(weeks);
    }

    /**
     * Mutate the Samay instance to represent the same day in week after @weeks number of weeks.
     * @param Number weeks
     * @return this
     */
    weekAfter(weeks){
        return this.addWeeks(weeks);
    }    

    //-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    //              Functions to manipulate Months
    //----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    daysInMonth(year=this._year, month=this._month){        
        return new Date(year, month, 0).getDate();
    }
    /**
     * Modify the date instance to the first occurence of the specified day in the current month.
     * [day 'Monday/Friday etc']
     * @return {[this]}
     */
    firstOfMonth(day=null){
        let addDays = day === null ? 0 : DAYS.indexOf(day)-this._dayOfWeek;     //could have negative values also
        let month = this._month;
        
        this.addDays(addDays);
        this.subtractWeeks(this.weekOfMonth()-1);
        while(this._month < month) this.nextWeek();
        
        return this;
    }

    /**
     * Modify the date instance to the last occurence of the specified day in the current month.
     * [@param day: 'Monday/Friday etc']
     * @return {[this]}
     */
    lastOfMonth(day=null){
        let addDays = day===null ? 0 : DAYS.indexOf(day)-this._dayOfWeek;       //could have negative values also
        let month = this._month;
        let addWeeks = this.weeksInMonth() - this.weekOfMonth();
        
        this.addDays(addDays).addWeeks(addWeeks);
        
        while(this._month > month){this.subtractWeeks(1);}  
        
        return this;

    }

    /**
     * Modify the date instance to the nth occurence of the specified day in the current month.
     * [@param day: 'Monday/Friday etc']
     * [@param nth: 1/2/3/4/5]
     * @return {[this]}
     */
    nthOfMonth(nth, day=null){
        let addDays = day===null ? 0 : DAYS.indexOf(day)-this._dayOfWeek;       //could have negative values also
        let month = this._month;
        let addWeeks = nth - this.weekOfMonth();        //could have negative value also
        this.addDays(addDays);
        this.addWeeks(addWeeks);
        return (this._month > month) ? this.previousWeek() : (this._month < month) ? this.nextWeek() : this;
    }

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
    }

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
    }

    /**
     * Mutate the Samay instance to represent the same day in the month before.
     * @return this
     */
    previousMonth(){
        return this.subtractMonths(1);
    }

    /**
     * Mutate the Samay instance to represent the same day in the month after.
     * @return this
     */
    nextMonth(){
         return this.addMonths(1);
    }

    /**
     * Mutate the Samay instance to represent the same day in the month before @months.
     * @param Number months
     * @return this
     */
    monthBefore(months){
        return this.subtractMonths(months);
    }

    /**
     * Mutate the Samay instance to represent the same day in the month after @months.
     * @param Number months
     * @return this
     */
    monthAfter(months){
        return this.addMonths(months);
    }

    /**
     * Mutate the Samay instance to represent the first day of the month to which the
     * time moment represented by the Samay instance belongs.
     * @return this
     */
    startOfMonth(){
        let date = 1;
        this._date = date;
        return this.reset();
    }

     /**
     * Mutate the Samay instance to represent the last day of the month to which the
     * time moment represented by the Samay instance belongs.
     * @return this
     */
    endOfMonth(){
        let dayProp = Util.isLeapYear(this._year) ? 'daysInLeapYear' : 'days';
        this._date = MONTHS[this._month-1][dayProp];
        return this.reset();
    }
    

    //-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    //              Functions to manipulate Quarter
    //----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    /**
     * Return the quarter number of the year to which the time moment represented by the Samay instance belongs.
     * @return Number
     */
     quarterOfYear(){
        if(1<= this._month && this._month<=3) return 1;
        if(4<= this._month && this._month <=6) return 2;
        if(7<= this._month && this._month <=9) return 3;
        if(10<= this._month && this._month <=12) return 4;
     }
    /**
     * Mutate the Samay instance to represent the first occurence of day in the quarter to which 
     * the time moment represented by the Samay instance belongs
     * @param String day
     * @return this
     */
    firstOfQuarter(day=DAYS[this._dayOfWeek]){
        let firstMonthOfQuarter = this.quarterOfYear()*3 - 2; 
        
        this.firstOfMonth(day);
        this.subtractWeeks((this._month-firstMonthOfQuarter)*4);
        while(this._month === firstMonthOfQuarter && this.weekOfMonth() > 1){
            this.subtractWeeks(1);
        }
        
        return this;
    }

    /**
     * Mutate the Samay instance to represent the last occurence of day in the quarter to which 
     * the time moment represented by the Samay instance belongs
     * @param String day
     * @return this
     */
    lastOfQuarter(day=DAYS[this._dayOfWeek]){
        let lastMonthOfQuarter = this.quarterOfYear()*3;
        this.lastOfMonth(day);
        
        this.addWeeks((lastMonthOfQuarter - this._month)*4);
              
        while(this._month === lastMonthOfQuarter){
            this.addWeeks(1);
        }
        if(this._month > lastMonthOfQuarter) this.subtractWeeks(1);
        
        return this;
    }

    /**
     * Modify the date instance to the nth occurence of the specified day in the current quarter.
     * [@param day: 'Monday/Friday etc']
     * [@param nth: 1/2/3/4/5]
     * @return {[this]}
     */
    nthOfQuarter(nth, day=DAYS[this._dayOfWeek]){
        let currentQuarter = this.quarterOfYear();
        
        this.firstOfQuarter(day).addWeeks(nth-1);
        
        while(this.quarterOfYear() > currentQuarter){
            this.subtractWeek(1);
        }
        
        return this;
    }

    /**
     * Add the time/milliseconds equivalent to the given quarters to the Samay instance.
     * @param Number quarters
     * @return this
     */
    addQuarters(quarters){
        if(! quarters) return this;
        return this.addMonths(3 * quarters); 
    }

    /**
     * Subtract the time/milliseconds equivalent to the given quarters from the Samay instance.
     * @param Number quarters
     * @return this
     */
    subtractQuarters(quarters){
        if(! quarters) return this;
        this.subtractMonths(3 * quarters);
        return this;
    }

    /**
     * Mutate the Samay instance to represent the identical day in the quarter after.
     * @return this
     */
    nextQuarter() {
        this.addQuarters(1);
        return this;
    }

    /**
     * Mutate the Samay instance to represent the identical day in the quarter before.
     * @return this
     */
    previousQuarter(){
        this.subtractQuarters(1);
        return this;
    }

    /**
     * Mutate the Samay instance to represent the first day of the quarter.
     * @return this
     */
    startOfQuarter(){
        let firstMonthOfQuarter = this.quarterOfYear()*3 - 2;
        this.subtractMonths(this._month-firstMonthOfQuarter);
        return this.startOfMonth();
    }

    /**
     * Mutate the Samay instance to represent the last day of the quarter.
     * @return this
     */
    endOfQuarter(){
        let lastMonthOfQuarter = this.quarterOfYear()*3;
        this.addMonths(lastMonthOfQuarter-this._month).endOfMonth();
        return this;
    }

    /**
     * Mutate the Samay instance to represent the identical day of the quarter before.
     * @param Number quarters
     * @return this
     */
    quarterBefore(quarters){
        if(! quarters) return this;
        this.subtractQuarters(quarters);
        return this;
    }

    /**
     * Mutate the Samay instance to represent the identical day of the quarter after.
     * @param Number quarters
     * @return this
     */
    quarterAfter(quarters){
        if(! quarters) return this;
        this.addQuarters(quarters);
        return this;
    }
    //-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    //              Functions to manipulate Year
    //----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    /**
     * Find the first occurence of the specified day or the dayOfWeek of current instance in the year.
     * @param String day
     * @return this
     */
    firstOfYear(day=null){
        let addDays = day === null ? 0 : DAYS.indexOf(day) - this._dayOfWeek;
        let year = this._year;
        let subtractWeeks = this.weekOfYear()-1;

        this.addDays(addDays).subtractWeeks(subtractWeeks).firstOfMonth();

        return this;
    }

    /**
     * Find the first occurence of the specified day or the dayOfWeek of current instance in the year.
     * @param String day
     * @return this
     */
    lastOfYear(day=null){
        let addDays = day === null ? 0 : DAYS.indexOf(day) - this._dayOfWeek;
        let year = this._year;
        let addWeeks = 52-this.weekOfYear();
        
        this.addWeeks(addWeeks).addDays(addDays);
        
        return this;
    }

    /**
     * Find the nth occurence of the specified day or the dayOfWeek of current instance in the year.
     * @param Number nth
     * @param String day
     * @return this
     */
    nthOfYear(nth, day=null){
        let addDays = day === null ? 0 : DAYS.indexOf(day) - this._dayOfWeek;
        let year = this._year;
        let addWeeks = nth - this.weekOfYear();
        
        this.addWeeks(addWeeks).addDays(addDays);
        
        return this;
    }

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
    }

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
    }

    /**
     * Mutate the Samay instance to represent the identical day in the year before.
     * @return this
     */
    previousYear(){
        this.subtractYears(1);
        return this;
    }

    /**
     * Mutate the Samay instance to represent the identical day in the year after.
     * @return this
     */
    nextYear(){
        this.addYears(1);
        return this;
    }

    /**
     * Mutate the Samay instance to represent the identical day in the year before @years.
     * @param Number years
     * @return this
     */
    yearBefore(years){
        this.subtractYears(years);
        return this;
    }

    /**
     * Mutate the Samay instance to represent the identical day in the year after @years.
     * @param Number years
     * @return this
     */
    yearAfter(years){
        this.addYears(years);
        return this;
    }

    /**
     * Mutate the Samay instance to represent the first day of the year.
     * @return this
     */
    startOfYear(){
        this.subtractProp(this._time - ((this.dayOfYear()-1)*24*60*60*1000));
        return this;
    }

    /**
     * Mutate the Samay instance to represent the last day of the year.
     * @return this
     */
    endOfYear(){
        let daysInYear = Util.isLeapYear(this) ? 366 : 365;
        this.addProp(this._time + ((daysInYear-this.dayOfYear())*24*60*60*1000));
        return this;
    }
    
    //-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    //              Functions to get formatted properties for display
    //----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    reset(time){
        if(time && typeof time === 'number') return new Samay(time);
        return new Samay(this._year, this._month, this._date, this._hours, this._minutes, this._seconds, this._milliseconds);        
    }

    /**
     * Common function which acts as getter and setter for _year property.
     * @param Number value
     */
    year(value){
        if(!value) return this._year;

        if(value === this._year) return this;

        if(! /^[1-9]\d{3}$/.test(value)) throw new Error(`Invalid value "${value}" for year.`);
        this._year = value;

        return this.reset();        
    }

    /**
     * Common function which acts as getter and setter for _month property.
     * @param Number value
     */
    month(value){
        if(! value) return Util.padstr(this._month);

        if(value === this._month) return this;

        if(! /^[0][1-9]|[1][0-2]$/.test(value)) throw new Error(`Invalid input "${value}" for month.`);
        this._month = value;

        return this.reset();
    }

    /**
     * Common function which acts as getter and setter for _date property.
     * @param Number value
     */
    date(value){
        if(!value) return Util.padstr(this._date);

        if(value === this._date) return this;

        if(! /^[0][1-9]|[1-2][0-9]|[3][0-1]$/.test(value)) throw new Error(`Invalid input "${value}" for date.`);
        this._date = value;

        return this.reset();
    }

    /**
     * Common function which acts as getter and setter for _hours property.
     * @param Number value
     */
    hours(value){
        if(!value) return Util.padstr(this._hours);

        if(value === this._hours) return this;

        if(! /^[0-1][0-9]|2[0-4]$/.test(value)) throw new Error(`Invalid input "${value}" for hours.`);
        this._hours = value;

        return this.reset();
    }

    /**
     * Common function which acts as getter and setter for _minutes property.
     * @param Number value
     */
    minutes(value){
        if(!value) return Util.padstr(this._minutes);

        if(value === this._minutes) return this;

        if(! /^[0-5][0-9]$/.test(value)) throw new Error(`Invalid input "${value}" for minutes.`);
        this._minutes = value;

        return this.reset();
    }

    /**
     * Common function which acts as getter and setter for _seconds property.
     * @param Number value
     */
    seconds(value){
        if(!value) return Util.padstr(this._seconds);

        if(value === this._seconds) return this;

        if(! /^[0-5][0-9]$/.test(value)) throw new Error(`Invalid input "${value}" for seconds.`);
        this._seconds = value;

        return this.reset();
    }

    /**
     * Common function which acts as getter and setter for _milliseconds property.
     * @param Number value
     */
    milliseconds(value){
        if(!value) return Util.padstr(this._milliseconds, 3);

        if(value === this._milliseconds) return this;

        if(! /^\d{3}$/.test(value)) throw new Error(`Invalid input "${value}" for seconds.`);
        this._milliseconds = value;

        return this.reset();
    }

    /**
     * Common function which acts as getter and setter for _dayOfWeek property.
     * @param Number value
     */
    dayOfWeek(value){
        if(!value) return this._dayOfWeek;

        if(value === this._dayOfWeek) return this;

        if(! /^[1-7]$/.test(value)) throw new Error(`Invalid input "${value}" for dayOfWeek.`);
        this._date += value - this._dayOfWeek;

        return this.reset();
    }

    /**
     * Common function which acts as getter and setter for _tzOffset property.
     * @param String value eg:+05:30
     * todo - check to see if renaming to timezone fits better.
     */
    tzOffset(value){
        if(!value) return this._tzOffset;

        if(minutes === this._tzOffset) return this;

        if(! /^(?:\+|\-)\d{2}\:\d{2}$/.test(value)) throw new Error(`Invalid input "${value}" for timezone.`);
        let minutes = Util.parseTimezoneOffset(value)*60*1000;

        return this.reset(this._time + (minutes*60*1000));
    }

    /**
     * Common function which acts as getter and setter for _time property.
     * @param Number value
     */
    time(value){
        if(!value) return this._time;

        if(value === this._time) return this;

        if(! /^\d+$/.test(value)) throw new Error(`Invalid input "${value}" for time.`);

        return this.reset(Util.parseInt(value));
    }

    /**
     * Common function which acts as getter and setter for _day property.
     * @param String value
     */
    day(value=null){
        if(!value) return this._day;

        if(value === this._day) return this;

        if(DAYS.indexOf(value) === -1) throw new Error(`Invalid input "${value}" for day.`);
        this._date += DAYS.indexOf(value) - DAYS.indexOf(this._day);

        return this.reset();
    }

    /**
     * Common function which acts as getter and setter for _dayShort property.
     * @param String value
     */
    dayShort(value){
        if(!value) return Util.getShort(this._day);

        if(value === Util.getShort(this._day)) return this;

        if(!/^Mon|Tue|Wed|Thu|Fri|Sat|Sun$/.test(value)) throw new Error(`Invalid input "${value}" for day short.`);
        let days = DAYS.map(d => Util.getShort(d));
        this._date += days.indexOf(value) - days.indexOf(Util.getShort(this._day));

        return this.reset();
    }

    /**
     * Common function which acts as getter and setter for _monthName property.
     * @param String value
     */
    monthName(value){
        if(!value) return this._monthName;

        if(value === this._month) return this;

        let months = MONTHS.map(m => m.name);
        if(months.indexOf(value) === -1) throw new Error(`Invalid input "${value}" for month name.`);
        this._month += months.indexOf(value) - months.indexOf(this._monthName);

        return this.reset();
    }

    /**
     * Common function which acts as getter and setter for _monthShort property.
     * @param String value
     */
    monthShort(value){
        if(!value) return Util.getShort(this._monthName);

        if(value === Util.getShort(this._monthName)) return this;

        let months = MONTHS.map(m =>  Util.getShort(m.name));
        if(months.indexOf(value) === -1) throw new Error(`Invalid input "${value}" for monthShort.`);
        this._month += months.indexOf(value) - months.indexOf(Util.getShort(this._monthName));

        return this.reset();
    }

    /**
     * Get the string representation of the current hours padded with leading zero for single digit hours.
     * Converting the 24 hour format into 12 hour for use with meridian.
     * @return Number 
     */
    getMeridianHours(){
        return (this._hours >= 12) ? Util.padstr(this._hours-12) : Util.padstr(this._hours);
    }

    /**
     * Get the meridian representation corresponding to the hours property of the Samay instance.
     * @return Number 
     */
    getMeridian() {
        return this._hours < 12 ? 'AM' : 'PM';
    }

    /**
     * Get the formatted timezone from the tzOffset property of the Samay instance.
     * @param String base - can be specified as UTC, default is GMT
     * @return String
     */
    getTimezone(base='GMT') {
        return Util.getTimezone(this, base);
    }

    /**
     * Return string representation of Samay - formated as ISO datetime string format.
     */
    getIsoDate(){
        return `${this.year()}-${this.month()}-${this.date()}`+
                `T${this.hours()}:${this.minutes()}:${this.seconds()}.${this.milliseconds()} ${this.getTimezone()}`;
    }

    /**
     * Return string representation of Samay - formated as UTC datetime string format.
     */
    getUtcDate(){
        return `${this.year()}-${this.month()}-${this.date()}T`+
        `${this.hours()}:${this.minutes()}:${this.seconds()}.${this.milliseconds()}Z`;
    }

    /**
     * Return string representation of Samay - formated as RSS datetime string format.
     */
    getRssDate(){
        return `${this.dayShort()}, ${this.date()} ${this.monthShort()} ${this.year()}`+
        ` ${this.hours()}:${this.minutes()}:${this.seconds()} ${this.getTimezone()}`;
    }

    /**
     * Return string representation of Samay - formated as Atom datetime string format.
     */
    getAtomDate(){
        return `${this.year()}-${this.month()}-${this.date()}T`+
        `${this.hours()}:${this.minutes()}:${this.seconds()}${this.getTimezone()}`;
    }

    /**
     * Return string representation of Samay - formated as Cookie datetime string format.
     */
    getCookieDate(){
        return `${this.day()}, ${this.date()}-${this.monthShort()}-${this.year()}`+
        ` ${this.hours()}:${this.minutes()}:${this.seconds()} ${this.getTimezone()}`;
    }

    /**
     * Get the string representation of the current Samay instance.
     * @return String
     */
    toString(){
        return `${this.year()}-${this.month()}-${this.date()} ${this.hours()}:${this.minutes()}:${this.seconds()}`;
    }

    /**
     * Get the string representation of the current Samay instance with only date part.
     * @return String
     */
    toDateString(){
        return this.format('Y-m-d');
    }

    /**
     * Get the string representation of the current Samay instance date and time parts.
     * @return String
     */
    toDateTimeString(){
        return this.format('Y-m-d H:i:s');
    }

    /**
     * Get the string representation of the current Samay instance in UTC format.
     * @return String
     */
    toUtcString(){
        return this.format('UTC');
    }

    /**
     * Get the string representation of the current Samay instance in ISO format.
     * @return String
     */
    toIsoString(){
        return this.format('ISO');
    }

    /**
     * Get the string representation of the current Samay instance in Atom string format.
     * @return String
     */
    toAtomString(){
        return this.format('Atom');
    }

    /**
     * Get the string representation of the current Samay instance in RSS format.
     * @return String
     */
    toRssString(){
        return this.format('RSS');
    }

    /**
     * Get the string representation of the current Samay instance in Cookie string format.
     * @return String
     */
    toCookieString(){
        return this.format('Cookie');
    }

    //-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    //              Functions to get difference between two Samay instances
    //----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    /**
     * Return the number of milliseconds in one hour.
     * @return Number milliseconds.
     */
    static millisecondsInMinute(){
        return 60*1000;
     }
     /**
      * Return the number of milliseconds in one hour.
      * @return Number milliseconds.
      */
      static millisecondsInHour(){
        return 60*60*1000;
      }

    /**
     * Return the number of milliseconds in one day
     * @return Number milliseconds
     */
     static millisecondsInDay(){
        return 24*60*60*1000;
     }
     
    /**
     * Get the difference in milliseconds of the calling Samay instance from the Samay instance passed as argument.
     * @param samay 
     * @return Number milliseconds
     */
     diffInMilliseconds(samay){
        if(!samay) samay = Samay.now();
        return this._time - samay._time;
     }

      /**
      * Get the difference in seconds of the calling Samay instance from the Samay instance passed as argument.
      * @param samay
      * @return Number seconds
      */
      diffInSeconds(samay){
        return Math.trunc(this.diffInMilliseconds(samay)/1000);
      }

      /**
      * Get the difference in minutes of the calling Samay instance from the Samay instance passed as argument.
      * @param samay
      * @return Number minutes
      */
      diffInMinutes(samay){
        return Math.trunc(this.diffInMilliseconds(samay)/Samay.millisecondsInMinute());
      }

      /**
      * Get the difference in hours of the calling Samay instance from the Samay instance passed as argument.
      * @param samay
      * @return Number hours
      */
      diffInHours(samay){
        return Math.trunc(this.diffInMilliseconds(samay)/Samay.millisecondsInHour());
      }

     /**
      * Get the difference in days of the calling Samay instance from the Samay instance passed as argument.
      * @param samay
      * @return Number days
      */
      diffInDays(samay){
        return Math.trunc(this.diffInMilliseconds(samay)/Samay.millisecondsInDay());
      }

      /**
      * Get the difference in weeks of the calling Samay instance from the Samay instance passed as argument.
      * @param samay
      * @return Number weeks
      */
      diffInWeeks(samay){
        return Math.trunc(this.diffInMilliseconds(samay)/(7*Samay.millisecondsInDay()));
      }

      /**
      * Get the difference in months of the calling Samay instance from the Samay instance passed as argument.
      * @param samay
      * @return Number months
      */
      diffInMonths(samay){
        return Math.trunc(this.diffInMilliseconds(samay)/(30*Samay.millisecondsInDay()));
      }

      /**
      * Get the difference in quarters of the calling Samay instance from the Samay instance passed as argument.
      * @param samay
      * @return Number quarters
      */
      diffInQuarters(samay){
        return Math.trunc(this.diffInMilliseconds(samay)/(91*Samay.millisecondsInDay()));
      }

      /**
      * Get the difference in years of the calling Samay instance from the Samay instance passed as argument.
      * @param samay
      * @return Number years
      */
      diffInYears(samay){
        return Math.trunc(this.diffInMilliseconds(samay)/(365*Samay.millisecondsInDay()));
      }

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

    //-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    //              Functions to compare two Samay instances
    //----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    /**
     * Check if the calling Samay instance is equal to the compared Samay instance.
     * By default it will check for the equality of date only.
     * If you want to compare the time(milliseconds) portion pass strict=true
     * @param Samay
     * @param Boolean strict (default false)
     * @return Boolean
     */
     eq(samay, strict=false){
        if(strict){
            if(this._time !== samay._time) return false;
        }

        let mismatch=0;

        ['_date', '_month', '_year'].forEach(prop => {
            if(this[prop] !== samay[prop]) mismatch += 1;
        });
        return mismatch === 0;
     }

     /**
     * Check if the calling Samay instance is not equal to the compared Samay instance.
     * By default it will check for the equality of date only.
     * If you want to compare the time (milliseconds) portion pass strict=true
     * @param Samay
     * @param Boolean strict (default false)
     * @return Boolean
     */
     ne(samay, strict=false){
        if(strict) return !this.eq(samay, true);
        return !this.eq(samay, false);
     }

     /**
     * Check if the calling Samay instance is greater than the compared Samay instance.
     * By default it will check for the equality of date only.
     * If you want to compare the time (milliseconds) portion pass strict=true
     * @param Samay
     * @param Boolean strict (default false)
     * @return Boolean
     */
     gt(samay, strict=false){
        if(strict) return this._time > samay._time;

        if(this._year > samay._year) return true;
        if(this._year === samay._year && this._month > samay._month) return true;
        if(this._year === samay._year && this._month === samay._month && this._date > samay._date) return true;
        return false;

     }

     /**
     * Check if the calling Samay instance is greater than or equal to the compared Samay instance.
     * By default it will check for the equality of date only.
     * If you want to compare the time (milliseconds) portion pass strict=true
     * @param Samay
     * @param Boolean strict (default false)
     * @return Boolean
     */
     gte(samay, strict=false){
        if(strict) return this._time >= samay._time;

        if(this._year > samay._year) return true;
        if(this._year === samay._year && this._month > samay._month) return true;
        if(this._year === samay._year && this._month  === samay._month && this._date >= samay._date) return true;

        return false;
     }

     /**
     * Check if the calling Samay instance is less than the compared Samay instance.
     * By default it will check for the equality of date only.
     * If you want to compare the time (milliseconds) portion pass strict=true
     * @param Samay
     * @param Boolean strict (default false)
     * @return Boolean
     */
     lt(samay, strict=false){
        if(strict) return this._time < samay._time;

        if(this._year < samay._year) return true;
        if(this._year === samay._year && this._month < samay._month) return true;
        if(this._year === samay._year && this._month === samay._month && this._date < samay._date) return true;
        return false;
     }

     /**
     * Check if the calling Samay instance is less than or equal to the compared Samay instance.
     * By default it will check for the equality of date only.
     * If you want to compare the time (milliseconds) portion pass strict=true
     * @param Samay
     * @param Boolean strict (default false)
     * @return Boolean
     */
     lte(samay, strict=false){
        if(strict) return this._time <= samay._time;

        if(this._year < samay._year) return true;
        if(this._year === samay._year && this._month < samay._month) return true;
        if(this._year === samay._year && this._month === samay._month && this._date <= samay._date) return true;
        return false;
     }

     /**
     * Check if the calling Samay instance is between the two instances compared against.
     * By default it will not include the boundaries, if you want to include the 
     * boundaries pass true as the third parameter to set equals to true.
     * By default function will check for the equality of date only.
     * To compare the time (milliseconds) portion pass strict=true
     * @param Samay
     * @param Boolean equals (default false)
     * @param Boolean strict (default false)
     * @return Boolean
     */
     between(first, second, equals=false, strict=false){
        if(strict) return (first.lt(this, true) && this.lt(second, true));
        
        if(!equals){
            if(!(first.lt(this, false) && this.lt(second, false))) return false;
            return true;
        }
        if(first.lte(this, false) && this.lte(second, false)) return true

        return false;
     }
}
    
    window.Samay = Samay;
    export default Samay;


