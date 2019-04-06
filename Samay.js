import DAYS  from './utils/Days';
import MONTHS  from './utils/Months';
import SYMBOL  from './utils/Symbol';
import FORMAT  from './utils/Format';
import Util  from './utils/Util';
import Factory  from './utils/Factory';

//mixins
import GettersSetters from "@/mixins/GettersSetters";
import CoreArithmeticOperations from "@/mixins/ArithmeticOperations";
import RelativeManipulations from "@/mixins/RelativeManipulations";
import ExtendedRelativeManipulations from "@/mixins/ExtendedRelativeManipulations";
import InformativeManipulations from "@/mixins/InformativeManipulations";
import Difference from "@/mixins/Difference";
import Comparision from "@/mixins/Comparision";
import Formatting from "@/mixins/Formatting";


class Samay {

    /**
     * The day on which the week starts.
     *
     * @static
     * @memberof Samay
     */
    static _startOfWeek = 'Monday';

    /**
     * The weekly offs in any typical week.
     *
     * @static
     * @memberof Samay
     */
    static _weekOffs = ['Saturday', 'Sunday'];

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
        // this._dayOfWeek = date.getDay() === 0 ? 7 : date.getDay();
        this._dayOfWeek = this._setDayOfWeek(date);
        // this._day = DAYS[this._dayOfWeek];
        this._day = Samay.days[this._dayOfWeek];
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
     * Set the day of the week depending upon the start of week.
     *
     * @param {Date} date
     * @param {string} [locale='en']
     * @returns
     * @memberof Samay
     */
    _setDayOfWeek(date, locale = 'en') {
        let day = date.toLocaleDateString(locale, { weekday: 'long' });
        return Samay.days.indexOf(day);
    }

    /**
     * Get the day on which a typical week starts.
     *
     * @static
     * @memberof Samay
     */
    static get startOfWeek() {
        return Samay._startOfWeek === undefined ? 'Monday' : Samay._startOfWeek;
    }
    /**
     * Set the day on which a typical week should start.
     *
     * @static
     * @memberof Samay
     */
    static set startOfWeek(day) {
        Samay._startOfWeek = day;
    }

    /**
     * Get the weekly offs for any typical week.
     *
     * @static
     * @memberof Samay
     */
    static get weekOffs()
    {
        
        return Samay._weekOffs === undefined ? 'Monday' : Samay._weekOffs;
    }

    /**
     * Set the weekly offs for any typical week.
     *
     * @static
     * @memberof Samay
     */
    static set weekOffs(arr) {
        Samay._weekOffs = arr;
    }

    /**
     * Get the days array as per the startOfWeek.
     *
     * @readonly
     * @static
     * @memberof Samay
     */
    static get days() {
        return Util.days(Samay.startOfWeek);
    }
    /**
     * Add functionality to Samy by passing an object containing the desired functions.
     *
     */
    static mixin(fn) {        
        Object.assign(Samay.prototype, fn);
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
}


function create(format, dateString) {
       
    dateString = Util.trim(dateString);

    let date = Factory.create(dateString, format);
    
    let samay = new Samay();

    samay._buildProperties(date);

    if(format === 'ISO-TZ'){
        let tz = Util.getTimezoneFromDateString(dateString);
        samay._tzOffset = tz;
    }
    return samay;
};

    Samay.create = create;

    Samay.mixin(GettersSetters);
    Samay.mixin(CoreArithmeticOperations);
    Samay.mixin(RelativeManipulations);
    Samay.mixin(ExtendedRelativeManipulations);
    Samay.mixin(InformativeManipulations);
    Samay.mixin(Difference);
    Samay.mixin(Comparision);
    Samay.mixin(Formatting);
    
    window.Samay = Samay;
    export default Samay;
