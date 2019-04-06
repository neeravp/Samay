
export default {

    /**
     * Find the first occurence of the specified day or the dayOfWeek of current instance in the year.
     * @param String day
     * @return this
     */
    firstOfYear(day=null){
        let addDays = day === null ? 0 : Samay.days.indexOf(day) - this._dayOfWeek;
        let year = this._year;
        let subtractWeeks = this.weekOfYear()-1;

        this.addDays(addDays).subtractWeeks(subtractWeeks).firstOfMonth();

        return this;
    },

    /**
     * Find the first occurence of the specified day or the dayOfWeek of current instance in the year.
     * @param String day
     * @return this
     */
    lastOfYear(day=null){
        let addDays = day === null ? 0 : Samay.days.indexOf(day) - this._dayOfWeek;
        let year = this._year;
        let addWeeks = 52-this.weekOfYear();
        
        this.addWeeks(addWeeks).addDays(addDays);
        
        return this;
    },

    /**
     * Find the nth occurence of the specified day or the dayOfWeek of current instance in the year.
     * @param Number nth
     * @param String day
     * @return this
     */
    nthOfYear(nth, day=null){
        let addDays = day === null ? 0 : Samay.days.indexOf(day) - this._dayOfWeek;
        let year = this._year;
        let addWeeks = nth - this.weekOfYear();
        
        this.addWeeks(addWeeks).addDays(addDays);
        
        return this;
    },

    /**
     * Mutate the Samay instance to represent the first occurence of day in the quarter to which 
     * the time moment represented by the Samay instance belongs
     * @param String day
     * @return this
     */
    firstOfQuarter(day=Samay.days[this._dayOfWeek]){
        let firstMonthOfQuarter = this.quarterOfYear()*3 - 2; 
        
        this.firstOfMonth(day);
        this.subtractWeeks((this._month-firstMonthOfQuarter)*4);
        while(this._month === firstMonthOfQuarter && this.weekOfMonth() > 1){
            this.subtractWeeks(1);
        }
        
        return this;
    },

    /**
     * Mutate the Samay instance to represent the last occurence of day in the quarter to which 
     * the time moment represented by the Samay instance belongs
     * @param String day
     * @return this
     */
    lastOfQuarter(day=Samay.days[this._dayOfWeek]){
        let lastMonthOfQuarter = this.quarterOfYear()*3;
        this.lastOfMonth(day);
        
        this.addWeeks((lastMonthOfQuarter - this._month)*4);
              
        while(this._month === lastMonthOfQuarter){
            this.addWeeks(1);
        }
        if(this._month > lastMonthOfQuarter) this.subtractWeeks(1);
        
        return this;
    },

    /**
     * Modify the date instance to the nth occurence of the specified day in the current quarter.
     * [@param day: 'Monday/Friday etc']
     * [@param nth: 1/2/3/4/5]
     * @return {[this]}
     */
    nthOfQuarter(nth, day=Samay.days[this._dayOfWeek]){
        let currentQuarter = this.quarterOfYear();
        
        this.firstOfQuarter(day).addWeeks(nth-1);
        
        while(this.quarterOfYear() > currentQuarter){
            this.subtractWeek(1);
        }
        
        return this;
    },

    /**
     * Modify the date instance to the first occurence of the specified day in the current month.
     * [day 'Monday/Friday etc']
     * @return {[this]}
     */
    firstOfMonth(day=null){
        let addDays = day === null ? 0 : Samay.days.indexOf(day)-this._dayOfWeek;     //could have negative values also
        let month = this._month;
        
        this.addDays(addDays);
        this.subtractWeeks(this.weekOfMonth()-1);
        while(this._month < month) this.nextWeek();
        
        return this;
    },

    /**
     * Modify the date instance to the last occurence of the specified day in the current month.
     * [@param day: 'Monday/Friday etc']
     * @return {[this]}
     */
    lastOfMonth(day=null){
        let addDays = day===null ? 0 : Samay.days.indexOf(day)-this._dayOfWeek;       //could have negative values also
        let month = this._month;
        let addWeeks = this.weeksInMonth() - this.weekOfMonth();
        
        this.addDays(addDays).addWeeks(addWeeks);
        
        while(this._month > month){this.subtractWeeks(1);}  
        
        return this;

    },

    /**
     * Modify the date instance to the nth occurence of the specified day in the current month.
     * [@param day: 'Monday/Friday etc']
     * [@param nth: 1/2/3/4/5]
     * @return {[this]}
     */
    nthOfMonth(nth, day=null){
        let addDays = day===null ? 0 : Samay.days.indexOf(day)-this._dayOfWeek;       //could have negative values also
        let month = this._month;
        let addWeeks = nth - this.weekOfMonth();        //could have negative value also
        this.addDays(addDays);
        this.addWeeks(addWeeks);
        return (this._month > month) ? this.previousWeek() : (this._month < month) ? this.nextWeek() : this;
    }
}