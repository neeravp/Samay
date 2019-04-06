import SYMBOL  from '@/utils/Symbol';
import FORMAT  from '@/utils/Format';
import Factory  from '@/utils/Factory';
import Samay from '@/Samay';


export default {	 


    /**
     * Create a new Samay instance from the given dateString in the given format.
     * @param String dateString
     * @param String format
     * @return Samay instance
     */
    createFromFormat(format, dateString) {
        dateString = Util.trim(dateString);

        let date = Factory.create(dateString, format);
        
        let samay = new Samay();

        samay._buildProperties(date);

        if(format === 'ISO-TZ'){
            let tz = Util.getTimezoneFromDateString(dateString);
            samay._tzOffset = tz;
        }

        return samay;
    },

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
    },

    replacer(prop){
        return function(match, p1, p2){
            // console.log(`prop:${prop}, replacer return: ${p1+this[prop].call(this)}`);
            return p1 + this[prop].call(this);
        }.bind(this);
    },

    /**
     * Return string representation of Samay - formated as ISO datetime string format.
     */
    getIsoDate(){
        return `${this.year()}-${this.month()}-${this.date()}`+
                `T${this.hours()}:${this.minutes()}:${this.seconds()}.${this.milliseconds()} ${this.getTimezone()}`;
    },

    /**
     * Return string representation of Samay - formated as UTC datetime string format.
     */
    getUtcDate(){
        return `${this.year()}-${this.month()}-${this.date()}T`+
        `${this.hours()}:${this.minutes()}:${this.seconds()}.${this.milliseconds()}Z`;
    },

    /**
     * Return string representation of Samay - formated as RSS datetime string format.
     */
    getRssDate(){
        return `${this.dayShort()}, ${this.date()} ${this.monthShort()} ${this.year()}`+
        ` ${this.hours()}:${this.minutes()}:${this.seconds()} ${this.getTimezone()}`;
    },

    /**
     * Return string representation of Samay - formated as Atom datetime string format.
     */
    getAtomDate(){
        return `${this.year()}-${this.month()}-${this.date()}T`+
        `${this.hours()}:${this.minutes()}:${this.seconds()}${this.getTimezone()}`;
    },

    /**
     * Return string representation of Samay - formated as Cookie datetime string format.
     */
    getCookieDate(){
        return `${this.day()}, ${this.date()}-${this.monthShort()}-${this.year()}`+
        ` ${this.hours()}:${this.minutes()}:${this.seconds()} ${this.getTimezone()}`;
    },

    /**
     * Get the string representation of the current Samay instance.
     * @return String
     */
    toString(){
        return `${this.year()}-${this.month()}-${this.date()} ${this.hours()}:${this.minutes()}:${this.seconds()}`;
    },

    /**
     * Get the string representation of the current Samay instance with only date part.
     * @return String
     */
    toDateString(){
        return this.format('Y-m-d');
    },

    /**
     * Get the string representation of the current Samay instance date and time parts.
     * @return String
     */
    toDateTimeString(){
        return this.format('Y-m-d H:i:s');
    },

    /**
     * Get the string representation of the current Samay instance in UTC format.
     * @return String
     */
    toUtcString(){
        return this.format('UTC');
    },

    /**
     * Get the string representation of the current Samay instance in ISO format.
     * @return String
     */
    toIsoString(){
        return this.format('ISO');
    },

    /**
     * Get the string representation of the current Samay instance in Atom string format.
     * @return String
     */
    toAtomString(){
        return this.format('Atom');
    },

    /**
     * Get the string representation of the current Samay instance in RSS format.
     * @return String
     */
    toRssString(){
        return this.format('RSS');
    },

    /**
     * Get the string representation of the current Samay instance in Cookie string format.
     * @return String
     */
    toCookieString(){
        return this.format('Cookie');
    },
}