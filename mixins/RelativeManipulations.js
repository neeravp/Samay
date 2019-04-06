import Util from "@/utils/Util";
import MONTHS from "@/utils/MONTHS";
export default {

    /**
     * Mutate the Samay instance to represent the identical day in the year before.
     * @return this
     */
    previousYear(){
        this.subtractYears(1);
        return this;
    },

    /**
     * Mutate the Samay instance to represent the identical day in the year after.
     * @return this
     */
    nextYear(){
        this.addYears(1);
        return this;
    },

    /**
     * Mutate the Samay instance to represent the identical day in the year before @years.
     * @param Number years
     * @return this
     */
    yearBefore(years){
        this.subtractYears(years);
        return this;
    },

    /**
     * Mutate the Samay instance to represent the identical day in the year after @years.
     * @param Number years
     * @return this
     */
    yearAfter(years){
        this.addYears(years);
        return this;
    },

    /**
     * Mutate the Samay instance to represent the identical day in the quarter after.
     * @return this
     */
    nextQuarter() {
        this.addQuarters(1);
        return this;
    },

    /**
     * Mutate the Samay instance to represent the identical day in the quarter before.
     * @return this
     */
    previousQuarter(){
        this.subtractQuarters(1);
        return this;
    },

    /**
     * Mutate the Samay instance to represent the same day in the month before.
     * @return this
     */
    previousMonth(){
        return this.subtractMonths(1);
    },

    /**
     * Mutate the Samay instance to represent the identical day of the quarter before.
     * @param Number quarters
     * @return this
     */
    quarterBefore(quarters){
        if(! quarters) return this;
        this.subtractQuarters(quarters);
        return this;
    },

    /**
     * Mutate the Samay instance to represent the identical day of the quarter after.
     * @param Number quarters
     * @return this
     */
    quarterAfter(quarters){
        if(! quarters) return this;
        this.addQuarters(quarters);
        return this;
    },

    /**
     * Mutate the Samay instance to represent the same day in the month after.
     * @return this
     */
    nextMonth(){
         return this.addMonths(1);
    },

    /**
     * Mutate the Samay instance to represent the same day in the month before @months.
     * @param Number months
     * @return this
     */
    monthBefore(months){
        return this.subtractMonths(months);
    },

    /**
     * Mutate the Samay instance to represent the same day in the month after @months.
     * @param Number months
     * @return this
     */
    monthAfter(months){
        return this.addMonths(months);
    },

    /**
     * Mutate the Samay instance to represent the same day in week before.
     * @return this
     */
    previousWeek(){
        return this.subtractWeeks(1);
    },

    /**
     * Mutate the Samay instance to represent the same day in week after.
     * @return this
     */
    nextWeek(){
        return this.addWeeks(1);
    },

    /**
     * Mutate the Samay instance to represent the same day in week before @weeks number of weeks.
     * @param Number weeks
     * @return this
     */
    weekBefore(weeks){
        return this.subtractWeeks(weeks);
    },

    /**
     * Mutate the Samay instance to represent the same day in week after @weeks number of weeks.
     * @param Number weeks
     * @return this
     */
    weekAfter(weeks){
        return this.addWeeks(weeks);
    },

    /**
     * Mutate the Samay instance to represent the same time on the day after.
     * @return this
     */
    nextDay(){
        return this.addProp(this._time + 24*60*60*1000);
    },

    /**
     * Mutate the Samay instance to represent the same time of the day before.
     * @return this
     */
    previousDay(){
        return this.subtractProp(this._time - 24*60*60*1000);
    }
}