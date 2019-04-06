

export default {

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
     },

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
     },

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
     },

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
     },

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
     },

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
     },

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