import Util from "@/utils/Util";

export default {

    reset(time){
        if(time && typeof time === 'number') return new Samay(time);
        return new Samay(this._year, this._month, this._date, this._hours, this._minutes, this._seconds, this._milliseconds);        
    },

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
    },

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
    },

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
    },

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
    },

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
    },

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
    },

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
    },

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
    },

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
    },

    /**
     * Common function which acts as getter and setter for _time property.
     * @param Number value
     */
    time(value){
        if(!value) return this._time;

        if(value === this._time) return this;

        if(! /^\d+$/.test(value)) throw new Error(`Invalid input "${value}" for time.`);

        return this.reset(Util.parseInt(value));
    },

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
    },

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
    },

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
    },

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
    },

    /**
     * Get the string representation of the current hours padded with leading zero for single digit hours.
     * Converting the 24 hour format into 12 hour for use with meridian.
     * @return Number 
     */
    getMeridianHours(){
        return (this._hours >= 12) ? Util.padstr(this._hours-12) : Util.padstr(this._hours);
    },

    /**
     * Get the meridian representation corresponding to the hours property of the Samay instance.
     * @return Number 
     */
    getMeridian() {
        return this._hours < 12 ? 'AM' : 'PM';
    },

    /**
     * Get the formatted timezone from the tzOffset property of the Samay instance.
     * @param String base - can be specified as UTC, default is GMT
     * @return String
     */
    getTimezone(base='GMT') {
        return Util.getTimezone(this, base);
    }

}