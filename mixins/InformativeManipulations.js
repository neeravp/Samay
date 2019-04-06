import Util from "@/utils/Util";
import MONTHS from "@/utils/MONTHS";

export default {

    /**
     * Mutate the Samay instance to represent the first day of the year.
     * @return this
     */
    startOfYear(){
        this.subtractProp(this._time - ((this.dayOfYear()-1)*24*60*60*1000));
        return this;
    },

    /**
     * Mutate the Samay instance to represent the last day of the year.
     * @return this
     */
    endOfYear(){
        let daysInYear = Util.isLeapYear(this) ? 366 : 365;
        this.addProp(this._time + ((daysInYear-this.dayOfYear())*24*60*60*1000));
        return this;
    },

    /**
     * Return the quarter number of the year to which the time moment represented by the Samay instance belongs.
     * @return Number
     */
     quarterOfYear(){
        if(1<= this._month && this._month<=3) return 1;
        if(4<= this._month && this._month <=6) return 2;
        if(7<= this._month && this._month <=9) return 3;
        if(10<= this._month && this._month <=12) return 4;
     },

    /**
     * Mutate the Samay instance to represent the first day of the quarter.
     * @return this
     */
    startOfQuarter(){
        let firstMonthOfQuarter = this.quarterOfYear()*3 - 2;
        this.subtractMonths(this._month-firstMonthOfQuarter);
        return this.startOfMonth();
    },

    /**
     * Mutate the Samay instance to represent the last day of the quarter.
     * @return this
     */
    endOfQuarter(){
        let lastMonthOfQuarter = this.quarterOfYear()*3;
        this.addMonths(lastMonthOfQuarter-this._month).endOfMonth();
        return this;
    },

    /**
     * Return the total number of weeks in the month to which time moment represented by Samay instance belongs.
     * @rreturn Number
     */
    weeksInMonth(){
        let firstOfMonth = this.clone().startOfMonth();
        let dayProp = Util.isLeapYear(this._year) ? 'daysInLeapYear' : 'days';
        return Math.ceil( (firstOfMonth._dayOfWeek-1 + MONTHS[this._month-1][dayProp]) / 7);
    },

    /**
     * Determine the total number of days in the month represented by the current instance.
     * @return number
     */
    daysInMonth(year=this._year, month=this._month){        
        return new Date(year, month, 0).getDate();
    },  

    /**
     * Mutate the Samay instance to represent the first day of the month to which the
     * time moment represented by the Samay instance belongs.
     * @return this
     */
    startOfMonth(){
        let date = 1;
        this._date = date;
        return this.reset();
    },

     /**
     * Mutate the Samay instance to represent the last day of the month to which the
     * time moment represented by the Samay instance belongs.
     * @return this
     */
    endOfMonth(){
        let dayProp = Util.isLeapYear(this._year) ? 'daysInLeapYear' : 'days';
        this._date = MONTHS[this._month-1][dayProp];
        return this.reset();
    },
    /**
     * Return the week number of the current year to which time moment represented by Samay instance belongs.
     * @return Number
     */
    weekOfYear(){
        return Math.ceil(this.dayOfYear()/7);
    },

    /**
     * Return the week number of the current month to which the time moment represented by Samay instance belongs.
     * @return Number
     */
    weekOfMonth(){
        return Math.ceil(this._date/7);
    },

    /**
     * Mutate the Samay instance to represent the first day of the week to which the 
     * time moment represented by the Samay instance belongs.
     * @return this
     */
    startOfWeek(){
        return this.subtractProp(this._time - ((this._dayOfWeek-1)*24*60*60*1000));
    },

    /**
     * Mutate the Samay instance to represent the last day of the week to which the 
     * time moment represented by the Samay instance belongs.
     * @return this
     */
    endOfWeek(){
        return this.addProp(this._time + ((7-this._dayOfWeek)*24*60*60*1000));
    },

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
    },


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
    },

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
    },
}