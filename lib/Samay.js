'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Days = require('./utils/Days');

var _Days2 = _interopRequireDefault(_Days);

var _Months = require('./utils/Months');

var _Months2 = _interopRequireDefault(_Months);

var _Symbol = require('./utils/Symbol');

var _Symbol2 = _interopRequireDefault(_Symbol);

var _Format = require('./utils/Format');

var _Format2 = _interopRequireDefault(_Format);

var _Util = require('./utils/Util');

var _Util2 = _interopRequireDefault(_Util);

var _Factory = require('./utils/Factory');

var _Factory2 = _interopRequireDefault(_Factory);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Samay = function () {
    function Samay() {
        _classCallCheck(this, Samay);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        // console.log(args);
        if (args.length > 1) args[1] -= 1;
        var date = new (Function.prototype.bind.apply(Date, [null].concat(args)))();

        if (!_Util2.default.isValidDate(date)) throw new Error('Invalid Input: "' + args.join() + '" is not a valid input for Samay.');

        this._buildProperties(date);
    }

    /**
     * Populate the values of properties.
     */


    _createClass(Samay, [{
        key: '_buildProperties',
        value: function _buildProperties(date) {
            this._date = date.getDate();
            this._dayOfWeek = date.getDay() === 0 ? 7 : date.getDay();
            this._day = _Days2.default[this._dayOfWeek];
            this._month = date.getMonth() + 1;
            this._monthName = _Months2.default[date.getMonth()]['name'];
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

    }, {
        key: 'format',


        /**
         * Return a formatted string representation of the Samay instance on which 
         * the format method is called as per the given formatString.
         * @param String formatString
         * @return String Samay's string representation.
         */
        value: function format(formatString) {
            var formatted = void 0;
            if (_Format2.default.hasOwnProperty(formatString)) {
                formatted = formatString.replace(_Symbol2.default.Y.validator, this.replacer(_Symbol2.default.Y.prop)).replace(_Symbol2.default.ms.validator, this.replacer(_Symbol2.default.ms.prop)).replace(_Symbol2.default.m.validator, this.replacer(_Symbol2.default.m.prop)).replace(_Symbol2.default.d.validator, this.replacer(_Symbol2.default.d.prop)).replace(_Symbol2.default.H.validator, this.replacer(_Symbol2.default.H.prop)).replace(_Symbol2.default.g.validator, this.replacer(_Symbol2.default.g.prop)).replace(_Symbol2.default.i.validator, this.replacer(_Symbol2.default.i.prop)).replace(_Symbol2.default.s.validator, this.replacer(_Symbol2.default.s.prop)).replace(_Symbol2.default.D.validator, this.replacer(_Symbol2.default.D.prop)).replace(_Symbol2.default.DD.validator, this.replacer(_Symbol2.default.DD.prop)).replace(_Symbol2.default.MM.validator, this.replacer(_Symbol2.default.MM.prop)).replace(_Symbol2.default.M.validator, this.replacer(_Symbol2.default.M.prop)).replace(_Symbol2.default.A.validator, this.replacer(_Symbol2.default.A.prop)).replace(_Symbol2.default.tz.validator, this.replacer(_Symbol2.default.tz.prop)).replace(_Symbol2.default.ISO.validator, this.replacer(_Symbol2.default.ISO.prop)).replace(_Symbol2.default.UTC.validator, this.replacer(_Symbol2.default.UTC.prop)).replace(_Symbol2.default.RSS.validator, this.replacer(_Symbol2.default.RSS.prop)).replace(_Symbol2.default.Atom.validator, this.replacer(_Symbol2.default.Atom.prop)).replace(_Symbol2.default.Cookie.validator, this.replacer(_Symbol2.default.Cookie.prop));

                return formatted;
            }
            console.error('Format is not supported');
        }
    }, {
        key: 'replacer',
        value: function replacer(prop) {
            return function (match, p1, p2) {
                // console.log(`prop:${prop}, replacer return: ${p1+this[prop].call(this)}`);
                return p1 + this[prop].call(this);
            }.bind(this);
        }

        /**
         * Clone the Samay instance and return a new Samay instance with identical properties.
         * Useful for fluent API and avoid mutation of the base Samay object.
         * @return Samay new instance.
         */

    }, {
        key: 'clone',
        value: function clone() {
            var _this = this;

            var samay = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new Samay();

            Object.getOwnPropertyNames(samay).forEach(function (prop) {
                if (_this.hasOwnProperty(prop)) {
                    samay[prop] = _this[prop];
                }
            });
            return samay;
        }

        /**
         * Clone the properties of a Samay object.
         * @param Samay instance
         * @return this
         */

    }, {
        key: 'cloneProps',
        value: function cloneProps(samay) {
            var _this2 = this;

            Object.getOwnPropertyNames(this).forEach(function (prop) {
                if (samay.hasOwnProperty(prop)) {
                    _this2[prop] = samay[prop];
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

    }, {
        key: 'addProp',
        value: function addProp(value) {
            if (!value) return this;
            var tz = this._tzOffset;
            var samay = new Samay(value);
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

    }, {
        key: 'subtractProp',
        value: function subtractProp(value) {
            if (!value) return this;
            if (_Util2.default.isNegative(value)) throw new Error('Negative values are not allowed for subtraction');

            var tz = this._tzOffset;
            var samay = new Samay(value);
            this.cloneProps(samay);
            this._tzOffset = tz;
            return this;
        }

        /**
         * Add the given number of hours to the Samay
         * @param Number hours
         * @return this
         */

    }, {
        key: 'addHours',
        value: function addHours(hours) {
            if (!hours) return this;
            return this.addProp(this._time + hours * 60 * 60 * 1000);
        }

        /**
        * Subtract the given number of hours to the Samay
        * @param Number hours
        * @return this
        */

    }, {
        key: 'subtractHours',
        value: function subtractHours(hours) {
            if (!hours) return this;
            return this.subtractProp(this._time - hours * 60 * 60 * 1000);
        }

        /**
        * Add the given number of minutes to the Samay
        * @param Number minutes
        * @return this
        */

    }, {
        key: 'addMinutes',
        value: function addMinutes(minutes) {
            if (!minutes) return this;
            return this.addProp(this._time + minutes * 60 * 1000);
        }

        /**
        * Subtract the given number of minutes to the Samay
        * @param Number minutes
        * @return this
        */

    }, {
        key: 'subtractMinutes',
        value: function subtractMinutes(minutes) {
            if (!minutes) return this;
            return this.subtractProp(this._time - minutes * 60 * 1000);
        }

        /**
        * Add the given number of seconds to the Samay
        * @param Number seconds
        * @return this
        */

    }, {
        key: 'addSeconds',
        value: function addSeconds(seconds) {
            if (!seconds) return this;
            return this.addProp(this._time + seconds * 1000);
        }

        /**
        * Subtract the given number of seconds to the Samay
        * @param Number seconds
        * @return this
        */

    }, {
        key: 'subtractSeconds',
        value: function subtractSeconds(seconds) {
            if (!seconds) return this;
            return this.subtractProp(this._time - seconds * 1000);
        }

        /**
        * Add the given number of milliseconds to the Samay
        * @param Number milliseconds
        * @return this
        */

    }, {
        key: 'addMilliseconds',
        value: function addMilliseconds(milliseconds) {
            if (!milliseconds) return this;
            return this.addProp(this._time + milliseconds);
        }

        /**
        * Subtract the given number of milliseconds to the Samay
        * @param Number milliseconds
        * @return this
        */

    }, {
        key: 'subtractMilliseconds',
        value: function subtractMilliseconds(milliseconds) {
            if (!milliseconds) return this;
            return this.subtractProp(this._time - milliseconds);
        }

        //-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
        //              Functions to manipulate Days
        //----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
        /**
         * Return on the day of current year to which the time moment represented by Samay belongs.
         * @return Number day
         */

    }, {
        key: 'dayOfYear',
        value: function dayOfYear() {
            var dayProp = _Util2.default.isLeapYear(this._year) ? 'daysInLeapYear' : 'days';
            var day = this._date;
            for (var i = this._month - 1; i > 0; i--) {
                day += _Months2.default[this._month - 1 - i][dayProp];
            }

            return day;
        }

        /**
        * Add the given number of days to the Samay
        * @param Number days
        * @return this
        */

    }, {
        key: 'addDays',
        value: function addDays(days) {
            if (!days) return this;
            return this.addProp(this._time + days * 24 * 60 * 60 * 1000);
        }

        /**
        * Subtract the given number of days to the Samay
        * @param Number days
        * @return this
        */

    }, {
        key: 'subtractDays',
        value: function subtractDays(days) {
            if (!days) return this;
            return this.subtractProp(this._time - days * 24 * 60 * 60 * 1000);
        }

        /**
         * Mutate the Samay instance to represent the end of current day.
         * @return this
         */

    }, {
        key: 'endOfDay',
        value: function endOfDay() {
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

    }, {
        key: 'startOfDay',
        value: function startOfDay() {
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

    }, {
        key: 'nextDay',
        value: function nextDay() {
            return this.addProp(this._time + 24 * 60 * 60 * 1000);
        }

        /**
         * Mutate the Samay instance to represent the same time of the day before.
         * @return this
         */

    }, {
        key: 'previousDay',
        value: function previousDay() {
            return this.subtractProp(this._time - 24 * 60 * 60 * 1000);
        }

        //-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
        //              Functions to manipulate Weeks
        //----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
        /**
         * Return the week number of the current year to which time moment represented by Samay instance belongs.
         * @return Number
         */

    }, {
        key: 'weekOfYear',
        value: function weekOfYear() {
            return Math.ceil(this.dayOfYear() / 7);
        }

        /**
         * Return the week number of the current month to which the time moment represented by Samay instance belongs.
         * @return Number
         */

    }, {
        key: 'weekOfMonth',
        value: function weekOfMonth() {
            return Math.ceil(this._date / 7);
        }

        /**
         * Return the total number of weeks in the month to which time moment represented by Samay instance belongs.
         * @rreturn Number
         */

    }, {
        key: 'weeksInMonth',
        value: function weeksInMonth() {
            var firstOfMonth = this.clone().startOfMonth();
            var dayProp = _Util2.default.isLeapYear(this._year) ? 'daysInLeapYear' : 'days';
            return Math.ceil((firstOfMonth._dayOfWeek - 1 + _Months2.default[this._month - 1][dayProp]) / 7);
        }

        /**
         * Add time representing the number of weeks passed as argument to the Samay instance.
         * @param Number weeks
         * @return this
         */

    }, {
        key: 'addWeeks',
        value: function addWeeks(weeks) {
            if (!weeks) return this;
            return this.addProp(this._time + weeks * 7 * 24 * 60 * 60 * 1000);
        }

        /**
         * Subtract milliseconds representing the number of weeks passed as argument to the Samay instance.
         * @param Number weeks
         * @return this
         */

    }, {
        key: 'subtractWeeks',
        value: function subtractWeeks(weeks) {
            if (!weeks) return this;
            return this.subtractProp(this._time - weeks * 7 * 24 * 60 * 60 * 1000);
        }

        /**
         * Mutate the Samay instance to represent the first day of the week to which the 
         * time moment represented by the Samay instance belongs.
         * @return this
         */

    }, {
        key: 'startOfWeek',
        value: function startOfWeek() {
            return this.subtractProp(this._time - (this._dayOfWeek - 1) * 24 * 60 * 60 * 1000);
        }

        /**
         * Mutate the Samay instance to represent the last day of the week to which the 
         * time moment represented by the Samay instance belongs.
         * @return this
         */

    }, {
        key: 'endOfWeek',
        value: function endOfWeek() {
            return this.addProp(this._time + (7 - this._dayOfWeek) * 24 * 60 * 60 * 1000);
        }

        /**
         * Mutate the Samay instance to represent the same day in week before.
         * @return this
         */

    }, {
        key: 'previousWeek',
        value: function previousWeek() {
            return this.subtractWeeks(1);
        }

        /**
         * Mutate the Samay instance to represent the same day in week after.
         * @return this
         */

    }, {
        key: 'nextWeek',
        value: function nextWeek() {
            return this.addWeeks(1);
        }

        /**
         * Mutate the Samay instance to represent the same day in week before @weeks number of weeks.
         * @param Number weeks
         * @return this
         */

    }, {
        key: 'weekBefore',
        value: function weekBefore(weeks) {
            return this.subtractWeeks(weeks);
        }

        /**
         * Mutate the Samay instance to represent the same day in week after @weeks number of weeks.
         * @param Number weeks
         * @return this
         */

    }, {
        key: 'weekAfter',
        value: function weekAfter(weeks) {
            return this.addWeeks(weeks);
        }

        //-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
        //              Functions to manipulate Months
        //----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

    }, {
        key: 'daysInMonth',
        value: function daysInMonth() {
            var year = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this._year;
            var month = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this._month;

            return new Date(year, month, 0).getDate();
        }
        /**
         * Modify the date instance to the first occurence of the specified day in the current month.
         * [day 'Monday/Friday etc']
         * @return {[this]}
         */

    }, {
        key: 'firstOfMonth',
        value: function firstOfMonth() {
            var day = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

            var addDays = day === null ? 0 : _Days2.default.indexOf(day) - this._dayOfWeek; //could have negative values also
            var month = this._month;

            this.addDays(addDays);
            this.subtractWeeks(this.weekOfMonth() - 1);
            while (this._month < month) {
                this.nextWeek();
            }return this;
        }

        /**
         * Modify the date instance to the last occurence of the specified day in the current month.
         * [@param day: 'Monday/Friday etc']
         * @return {[this]}
         */

    }, {
        key: 'lastOfMonth',
        value: function lastOfMonth() {
            var day = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

            var addDays = day === null ? 0 : _Days2.default.indexOf(day) - this._dayOfWeek; //could have negative values also
            var month = this._month;
            var addWeeks = this.weeksInMonth() - this.weekOfMonth();

            this.addDays(addDays).addWeeks(addWeeks);

            while (this._month > month) {
                this.subtractWeeks(1);
            }

            return this;
        }

        /**
         * Modify the date instance to the nth occurence of the specified day in the current month.
         * [@param day: 'Monday/Friday etc']
         * [@param nth: 1/2/3/4/5]
         * @return {[this]}
         */

    }, {
        key: 'nthOfMonth',
        value: function nthOfMonth(nth) {
            var day = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

            var addDays = day === null ? 0 : _Days2.default.indexOf(day) - this._dayOfWeek; //could have negative values also
            var month = this._month;
            var addWeeks = nth - this.weekOfMonth(); //could have negative value also
            this.addDays(addDays);
            this.addWeeks(addWeeks);
            return this._month > month ? this.previousWeek() : this._month < month ? this.nextWeek() : this;
        }

        /**
         * Add time/milliseconds representing the given number of months to the Samay instance.
         * @param Number months
         * @return this.
         */

    }, {
        key: 'addMonths',
        value: function addMonths(months) {
            if (!months) return this;

            if (Math.sign(months) === -1) return this.subtractMonths(Math.abs(months));

            var isLastDay = this.daysInMonth() === this._date;
            var days = this.daysInMonth() - this._date;
            var year = this._year;
            var month = this._month + 1; //to start adding days from next month

            for (var i = 1; i < months; i++) {

                if (month > 12) {
                    year += 1;
                    month = Math.abs(12 - month);
                }

                days += this.daysInMonth(year, month);
                month += 1;
            }

            days += isLastDay ? this.daysInMonth(year, month) : this._date;

            this.addProp(this._time + days * 24 * 60 * 60 * 1000);

            return this;
        }

        /**
         * Subtract time/milliseconds representing the given number of months from the Samay instance.
         * @param Number months
         * @return this.
         */

    }, {
        key: 'subtractMonths',
        value: function subtractMonths(months) {
            if (!months) return this;

            if (Math.sign(months) === -1) return this.addMonths(Math.abs(months));

            var isLastDay = this.daysInMonth() === this._date;
            var days = this._date;
            var year = this._year;
            var month = this._month - 1;

            for (var i = 1; i < months; i++) {
                if (month < 1) {
                    year -= 1;
                    month = 12;
                }

                days += this.daysInMonth(year, month);

                month -= 1;
            }

            days += isLastDay ? 0 : this.daysInMonth(year, month) - this._date;

            this.subtractProp(this._time - days * 24 * 60 * 60 * 1000);

            return this;
        }

        /**
         * Mutate the Samay instance to represent the same day in the month before.
         * @return this
         */

    }, {
        key: 'previousMonth',
        value: function previousMonth() {
            return this.subtractMonths(1);
        }

        /**
         * Mutate the Samay instance to represent the same day in the month after.
         * @return this
         */

    }, {
        key: 'nextMonth',
        value: function nextMonth() {
            return this.addMonths(1);
        }

        /**
         * Mutate the Samay instance to represent the same day in the month before @months.
         * @param Number months
         * @return this
         */

    }, {
        key: 'monthBefore',
        value: function monthBefore(months) {
            return this.subtractMonths(months);
        }

        /**
         * Mutate the Samay instance to represent the same day in the month after @months.
         * @param Number months
         * @return this
         */

    }, {
        key: 'monthAfter',
        value: function monthAfter(months) {
            return this.addMonths(months);
        }

        /**
         * Mutate the Samay instance to represent the first day of the month to which the
         * time moment represented by the Samay instance belongs.
         * @return this
         */

    }, {
        key: 'startOfMonth',
        value: function startOfMonth() {
            var date = 1;
            this._date = date;
            return this.reset();
        }

        /**
        * Mutate the Samay instance to represent the last day of the month to which the
        * time moment represented by the Samay instance belongs.
        * @return this
        */

    }, {
        key: 'endOfMonth',
        value: function endOfMonth() {
            var dayProp = _Util2.default.isLeapYear(this._year) ? 'daysInLeapYear' : 'days';
            this._date = _Months2.default[this._month - 1][dayProp];
            return this.reset();
        }

        //-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
        //              Functions to manipulate Quarter
        //----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
        /**
         * Return the quarter number of the year to which the time moment represented by the Samay instance belongs.
         * @return Number
         */

    }, {
        key: 'quarterOfYear',
        value: function quarterOfYear() {
            if (1 <= this._month && this._month <= 3) return 1;
            if (4 <= this._month && this._month <= 6) return 2;
            if (7 <= this._month && this._month <= 9) return 3;
            if (10 <= this._month && this._month <= 12) return 4;
        }
        /**
         * Mutate the Samay instance to represent the first occurence of day in the quarter to which 
         * the time moment represented by the Samay instance belongs
         * @param String day
         * @return this
         */

    }, {
        key: 'firstOfQuarter',
        value: function firstOfQuarter() {
            var day = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _Days2.default[this._dayOfWeek];

            var firstMonthOfQuarter = this.quarterOfYear() * 3 - 2;

            this.firstOfMonth(day);
            this.subtractWeeks((this._month - firstMonthOfQuarter) * 4);
            while (this._month === firstMonthOfQuarter && this.weekOfMonth() > 1) {
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

    }, {
        key: 'lastOfQuarter',
        value: function lastOfQuarter() {
            var day = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _Days2.default[this._dayOfWeek];

            var lastMonthOfQuarter = this.quarterOfYear() * 3;
            this.lastOfMonth(day);

            this.addWeeks((lastMonthOfQuarter - this._month) * 4);

            while (this._month === lastMonthOfQuarter) {
                this.addWeeks(1);
            }
            if (this._month > lastMonthOfQuarter) this.subtractWeeks(1);

            return this;
        }

        /**
         * Modify the date instance to the nth occurence of the specified day in the current quarter.
         * [@param day: 'Monday/Friday etc']
         * [@param nth: 1/2/3/4/5]
         * @return {[this]}
         */

    }, {
        key: 'nthOfQuarter',
        value: function nthOfQuarter(nth) {
            var day = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _Days2.default[this._dayOfWeek];

            var currentQuarter = this.quarterOfYear();

            this.firstOfQuarter(day).addWeeks(nth - 1);

            while (this.quarterOfYear() > currentQuarter) {
                this.subtractWeek(1);
            }

            return this;
        }

        /**
         * Add the time/milliseconds equivalent to the given quarters to the Samay instance.
         * @param Number quarters
         * @return this
         */

    }, {
        key: 'addQuarters',
        value: function addQuarters(quarters) {
            if (!quarters) return this;
            return this.addMonths(3 * quarters);
        }

        /**
         * Subtract the time/milliseconds equivalent to the given quarters from the Samay instance.
         * @param Number quarters
         * @return this
         */

    }, {
        key: 'subtractQuarters',
        value: function subtractQuarters(quarters) {
            if (!quarters) return this;
            this.subtractMonths(3 * quarters);
            return this;
        }

        /**
         * Mutate the Samay instance to represent the identical day in the quarter after.
         * @return this
         */

    }, {
        key: 'nextQuarter',
        value: function nextQuarter() {
            this.addQuarters(1);
            return this;
        }

        /**
         * Mutate the Samay instance to represent the identical day in the quarter before.
         * @return this
         */

    }, {
        key: 'previousQuarter',
        value: function previousQuarter() {
            this.subtractQuarters(1);
            return this;
        }

        /**
         * Mutate the Samay instance to represent the first day of the quarter.
         * @return this
         */

    }, {
        key: 'startOfQuarter',
        value: function startOfQuarter() {
            var firstMonthOfQuarter = this.quarterOfYear() * 3 - 2;
            this.subtractMonths(this._month - firstMonthOfQuarter);
            return this.startOfMonth();
        }

        /**
         * Mutate the Samay instance to represent the last day of the quarter.
         * @return this
         */

    }, {
        key: 'endOfQuarter',
        value: function endOfQuarter() {
            var lastMonthOfQuarter = this.quarterOfYear() * 3;
            this.addMonths(lastMonthOfQuarter - this._month).endOfMonth();
            return this;
        }

        /**
         * Mutate the Samay instance to represent the identical day of the quarter before.
         * @param Number quarters
         * @return this
         */

    }, {
        key: 'quarterBefore',
        value: function quarterBefore(quarters) {
            if (!quarters) return this;
            this.subtractQuarters(quarters);
            return this;
        }

        /**
         * Mutate the Samay instance to represent the identical day of the quarter after.
         * @param Number quarters
         * @return this
         */

    }, {
        key: 'quarterAfter',
        value: function quarterAfter(quarters) {
            if (!quarters) return this;
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

    }, {
        key: 'firstOfYear',
        value: function firstOfYear() {
            var day = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

            var addDays = day === null ? 0 : _Days2.default.indexOf(day) - this._dayOfWeek;
            var year = this._year;
            var subtractWeeks = this.weekOfYear() - 1;

            this.addDays(addDays).subtractWeeks(subtractWeeks).firstOfMonth();

            return this;
        }

        /**
         * Find the first occurence of the specified day or the dayOfWeek of current instance in the year.
         * @param String day
         * @return this
         */

    }, {
        key: 'lastOfYear',
        value: function lastOfYear() {
            var day = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

            var addDays = day === null ? 0 : _Days2.default.indexOf(day) - this._dayOfWeek;
            var year = this._year;
            var addWeeks = 52 - this.weekOfYear();

            this.addWeeks(addWeeks).addDays(addDays);

            return this;
        }

        /**
         * Find the nth occurence of the specified day or the dayOfWeek of current instance in the year.
         * @param Number nth
         * @param String day
         * @return this
         */

    }, {
        key: 'nthOfYear',
        value: function nthOfYear(nth) {
            var day = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

            var addDays = day === null ? 0 : _Days2.default.indexOf(day) - this._dayOfWeek;
            var year = this._year;
            var addWeeks = nth - this.weekOfYear();

            this.addWeeks(addWeeks).addDays(addDays);

            return this;
        }

        /**
         * Add the time equivalent to the given number of years to the Samay instance.
         * @param Number years
         * @return this
         */

    }, {
        key: 'addYears',
        value: function addYears(years) {
            var days = 0;
            for (var i = 1; i <= years; i++) {
                days += _Util2.default.isLeapYear(this._year + i) ? 366 : 365;
            }
            this.addProp(this._time + days * 24 * 60 * 60 * 1000);
            return this;
        }

        /**
         * Subtract the time equivalent to the given number of years from the Samay instance.
         * @param Number years
         * @return this
         */

    }, {
        key: 'subtractYears',
        value: function subtractYears(years) {
            var days = 0;
            for (var i = years; i > 0; i--) {
                days += _Util2.default.isLeapYear(this._year - i) ? 366 : 365;
            }
            this.subtractProp(this._time - days * 24 * 60 * 60 * 1000);
            return this;
        }

        /**
         * Mutate the Samay instance to represent the identical day in the year before.
         * @return this
         */

    }, {
        key: 'previousYear',
        value: function previousYear() {
            this.subtractYears(1);
            return this;
        }

        /**
         * Mutate the Samay instance to represent the identical day in the year after.
         * @return this
         */

    }, {
        key: 'nextYear',
        value: function nextYear() {
            this.addYears(1);
            return this;
        }

        /**
         * Mutate the Samay instance to represent the identical day in the year before @years.
         * @param Number years
         * @return this
         */

    }, {
        key: 'yearBefore',
        value: function yearBefore(years) {
            this.subtractYears(years);
            return this;
        }

        /**
         * Mutate the Samay instance to represent the identical day in the year after @years.
         * @param Number years
         * @return this
         */

    }, {
        key: 'yearAfter',
        value: function yearAfter(years) {
            this.addYears(years);
            return this;
        }

        /**
         * Mutate the Samay instance to represent the first day of the year.
         * @return this
         */

    }, {
        key: 'startOfYear',
        value: function startOfYear() {
            this.subtractProp(this._time - (this.dayOfYear() - 1) * 24 * 60 * 60 * 1000);
            return this;
        }

        /**
         * Mutate the Samay instance to represent the last day of the year.
         * @return this
         */

    }, {
        key: 'endOfYear',
        value: function endOfYear() {
            var daysInYear = _Util2.default.isLeapYear(this) ? 366 : 365;
            this.addProp(this._time + (daysInYear - this.dayOfYear()) * 24 * 60 * 60 * 1000);
            return this;
        }

        //-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
        //              Functions to get formatted properties for display
        //----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

    }, {
        key: 'reset',
        value: function reset(time) {
            if (time && typeof time === 'number') return new Samay(time);
            return new Samay(this._year, this._month, this._date, this._hours, this._minutes, this._seconds, this._milliseconds);
        }

        /**
         * Common function which acts as getter and setter for _year property.
         * @param Number value
         */

    }, {
        key: 'year',
        value: function year(value) {
            if (!value) return this._year;

            if (value === this._year) return this;

            if (!/^[1-9]\d{3}$/.test(value)) throw new Error('Invalid value "' + value + '" for year.');
            this._year = value;

            return this.reset();
        }

        /**
         * Common function which acts as getter and setter for _month property.
         * @param Number value
         */

    }, {
        key: 'month',
        value: function month(value) {
            if (!value) return _Util2.default.padstr(this._month);

            if (value === this._month) return this;

            if (!/^[0][1-9]|[1][0-2]$/.test(value)) throw new Error('Invalid input "' + value + '" for month.');
            this._month = value;

            return this.reset();
        }

        /**
         * Common function which acts as getter and setter for _date property.
         * @param Number value
         */

    }, {
        key: 'date',
        value: function date(value) {
            if (!value) return _Util2.default.padstr(this._date);

            if (value === this._date) return this;

            if (!/^[0][1-9]|[1-2][0-9]|[3][0-1]$/.test(value)) throw new Error('Invalid input "' + value + '" for date.');
            this._date = value;

            return this.reset();
        }

        /**
         * Common function which acts as getter and setter for _hours property.
         * @param Number value
         */

    }, {
        key: 'hours',
        value: function hours(value) {
            if (!value) return _Util2.default.padstr(this._hours);

            if (value === this._hours) return this;

            if (!/^[0-1][0-9]|2[0-4]$/.test(value)) throw new Error('Invalid input "' + value + '" for hours.');
            this._hours = value;

            return this.reset();
        }

        /**
         * Common function which acts as getter and setter for _minutes property.
         * @param Number value
         */

    }, {
        key: 'minutes',
        value: function minutes(value) {
            if (!value) return _Util2.default.padstr(this._minutes);

            if (value === this._minutes) return this;

            if (!/^[0-5][0-9]$/.test(value)) throw new Error('Invalid input "' + value + '" for minutes.');
            this._minutes = value;

            return this.reset();
        }

        /**
         * Common function which acts as getter and setter for _seconds property.
         * @param Number value
         */

    }, {
        key: 'seconds',
        value: function seconds(value) {
            if (!value) return _Util2.default.padstr(this._seconds);

            if (value === this._seconds) return this;

            if (!/^[0-5][0-9]$/.test(value)) throw new Error('Invalid input "' + value + '" for seconds.');
            this._seconds = value;

            return this.reset();
        }

        /**
         * Common function which acts as getter and setter for _milliseconds property.
         * @param Number value
         */

    }, {
        key: 'milliseconds',
        value: function milliseconds(value) {
            if (!value) return _Util2.default.padstr(this._milliseconds, 3);

            if (value === this._milliseconds) return this;

            if (!/^\d{3}$/.test(value)) throw new Error('Invalid input "' + value + '" for seconds.');
            this._milliseconds = value;

            return this.reset();
        }

        /**
         * Common function which acts as getter and setter for _dayOfWeek property.
         * @param Number value
         */

    }, {
        key: 'dayOfWeek',
        value: function dayOfWeek(value) {
            if (!value) return this._dayOfWeek;

            if (value === this._dayOfWeek) return this;

            if (!/^[1-7]$/.test(value)) throw new Error('Invalid input "' + value + '" for dayOfWeek.');
            this._date += value - this._dayOfWeek;

            return this.reset();
        }

        /**
         * Common function which acts as getter and setter for _tzOffset property.
         * @param String value eg:+05:30
         * todo - check to see if renaming to timezone fits better.
         */

    }, {
        key: 'tzOffset',
        value: function tzOffset(value) {
            if (!value) return this._tzOffset;

            if (minutes === this._tzOffset) return this;

            if (!/^(?:\+|\-)\d{2}\:\d{2}$/.test(value)) throw new Error('Invalid input "' + value + '" for timezone.');
            var minutes = _Util2.default.parseTimezoneOffset(value) * 60 * 1000;

            return this.reset(this._time + minutes * 60 * 1000);
        }

        /**
         * Common function which acts as getter and setter for _time property.
         * @param Number value
         */

    }, {
        key: 'time',
        value: function time(value) {
            if (!value) return this._time;

            if (value === this._time) return this;

            if (!/^\d+$/.test(value)) throw new Error('Invalid input "' + value + '" for time.');

            return this.reset(_Util2.default.parseInt(value));
        }

        /**
         * Common function which acts as getter and setter for _day property.
         * @param String value
         */

    }, {
        key: 'day',
        value: function day() {
            var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

            if (!value) return this._day;

            if (value === this._day) return this;

            if (_Days2.default.indexOf(value) === -1) throw new Error('Invalid input "' + value + '" for day.');
            this._date += _Days2.default.indexOf(value) - _Days2.default.indexOf(this._day);

            return this.reset();
        }

        /**
         * Common function which acts as getter and setter for _dayShort property.
         * @param String value
         */

    }, {
        key: 'dayShort',
        value: function dayShort(value) {
            if (!value) return _Util2.default.getShort(this._day);

            if (value === _Util2.default.getShort(this._day)) return this;

            if (!/^Mon|Tue|Wed|Thu|Fri|Sat|Sun$/.test(value)) throw new Error('Invalid input "' + value + '" for day short.');
            var days = _Days2.default.map(function (d) {
                return _Util2.default.getShort(d);
            });
            this._date += days.indexOf(value) - days.indexOf(_Util2.default.getShort(this._day));

            return this.reset();
        }

        /**
         * Common function which acts as getter and setter for _monthName property.
         * @param String value
         */

    }, {
        key: 'monthName',
        value: function monthName(value) {
            if (!value) return this._monthName;

            if (value === this._month) return this;

            var months = _Months2.default.map(function (m) {
                return m.name;
            });
            if (months.indexOf(value) === -1) throw new Error('Invalid input "' + value + '" for month name.');
            this._month += months.indexOf(value) - months.indexOf(this._monthName);

            return this.reset();
        }

        /**
         * Common function which acts as getter and setter for _monthShort property.
         * @param String value
         */

    }, {
        key: 'monthShort',
        value: function monthShort(value) {
            if (!value) return _Util2.default.getShort(this._monthName);

            if (value === _Util2.default.getShort(this._monthName)) return this;

            var months = _Months2.default.map(function (m) {
                return _Util2.default.getShort(m.name);
            });
            if (months.indexOf(value) === -1) throw new Error('Invalid input "' + value + '" for monthShort.');
            this._month += months.indexOf(value) - months.indexOf(_Util2.default.getShort(this._monthName));

            return this.reset();
        }

        /**
         * Get the string representation of the current hours padded with leading zero for single digit hours.
         * Converting the 24 hour format into 12 hour for use with meridian.
         * @return Number 
         */

    }, {
        key: 'getMeridianHours',
        value: function getMeridianHours() {
            return this._hours >= 12 ? _Util2.default.padstr(this._hours - 12) : _Util2.default.padstr(this._hours);
        }

        /**
         * Get the meridian representation corresponding to the hours property of the Samay instance.
         * @return Number 
         */

    }, {
        key: 'getMeridian',
        value: function getMeridian() {
            return this._hours < 12 ? 'AM' : 'PM';
        }

        /**
         * Get the formatted timezone from the tzOffset property of the Samay instance.
         * @param String base - can be specified as UTC, default is GMT
         * @return String
         */

    }, {
        key: 'getTimezone',
        value: function getTimezone() {
            var base = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'GMT';

            return _Util2.default.getTimezone(this, base);
        }

        /**
         * Return string representation of Samay - formated as ISO datetime string format.
         */

    }, {
        key: 'getIsoDate',
        value: function getIsoDate() {
            return this.year() + '-' + this.month() + '-' + this.date() + ('T' + this.hours() + ':' + this.minutes() + ':' + this.seconds() + '.' + this.milliseconds() + ' ' + this.getTimezone());
        }

        /**
         * Return string representation of Samay - formated as UTC datetime string format.
         */

    }, {
        key: 'getUtcDate',
        value: function getUtcDate() {
            return this.year() + '-' + this.month() + '-' + this.date() + 'T' + (this.hours() + ':' + this.minutes() + ':' + this.seconds() + '.' + this.milliseconds() + 'Z');
        }

        /**
         * Return string representation of Samay - formated as RSS datetime string format.
         */

    }, {
        key: 'getRssDate',
        value: function getRssDate() {
            return this.dayShort() + ', ' + this.date() + ' ' + this.monthShort() + ' ' + this.year() + (' ' + this.hours() + ':' + this.minutes() + ':' + this.seconds() + ' ' + this.getTimezone());
        }

        /**
         * Return string representation of Samay - formated as Atom datetime string format.
         */

    }, {
        key: 'getAtomDate',
        value: function getAtomDate() {
            return this.year() + '-' + this.month() + '-' + this.date() + 'T' + (this.hours() + ':' + this.minutes() + ':' + this.seconds() + this.getTimezone());
        }

        /**
         * Return string representation of Samay - formated as Cookie datetime string format.
         */

    }, {
        key: 'getCookieDate',
        value: function getCookieDate() {
            return this.day() + ', ' + this.date() + '-' + this.monthShort() + '-' + this.year() + (' ' + this.hours() + ':' + this.minutes() + ':' + this.seconds() + ' ' + this.getTimezone());
        }

        /**
         * Get the string representation of the current Samay instance.
         * @return String
         */

    }, {
        key: 'toString',
        value: function toString() {
            return this.year() + '-' + this.month() + '-' + this.date() + ' ' + this.hours() + ':' + this.minutes() + ':' + this.seconds();
        }

        /**
         * Get the string representation of the current Samay instance with only date part.
         * @return String
         */

    }, {
        key: 'toDateString',
        value: function toDateString() {
            return this.format('Y-m-d');
        }

        /**
         * Get the string representation of the current Samay instance date and time parts.
         * @return String
         */

    }, {
        key: 'toDateTimeString',
        value: function toDateTimeString() {
            return this.format('Y-m-d H:i:s');
        }

        /**
         * Get the string representation of the current Samay instance in UTC format.
         * @return String
         */

    }, {
        key: 'toUtcString',
        value: function toUtcString() {
            return this.format('UTC');
        }

        /**
         * Get the string representation of the current Samay instance in ISO format.
         * @return String
         */

    }, {
        key: 'toIsoString',
        value: function toIsoString() {
            return this.format('ISO');
        }

        /**
         * Get the string representation of the current Samay instance in Atom string format.
         * @return String
         */

    }, {
        key: 'toAtomString',
        value: function toAtomString() {
            return this.format('Atom');
        }

        /**
         * Get the string representation of the current Samay instance in RSS format.
         * @return String
         */

    }, {
        key: 'toRssString',
        value: function toRssString() {
            return this.format('RSS');
        }

        /**
         * Get the string representation of the current Samay instance in Cookie string format.
         * @return String
         */

    }, {
        key: 'toCookieString',
        value: function toCookieString() {
            return this.format('Cookie');
        }

        //-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
        //              Functions to get difference between two Samay instances
        //----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
        /**
         * Return the number of milliseconds in one hour.
         * @return Number milliseconds.
         */

    }, {
        key: 'diffInMilliseconds',


        /**
         * Get the difference in milliseconds of the calling Samay instance from the Samay instance passed as argument.
         * @param samay 
         * @return Number milliseconds
         */
        value: function diffInMilliseconds(samay) {
            if (!samay) samay = Samay.now();
            return this._time - samay._time;
        }

        /**
        * Get the difference in seconds of the calling Samay instance from the Samay instance passed as argument.
        * @param samay
        * @return Number seconds
        */

    }, {
        key: 'diffInSeconds',
        value: function diffInSeconds(samay) {
            return Math.trunc(this.diffInMilliseconds(samay) / 1000);
        }

        /**
        * Get the difference in minutes of the calling Samay instance from the Samay instance passed as argument.
        * @param samay
        * @return Number minutes
        */

    }, {
        key: 'diffInMinutes',
        value: function diffInMinutes(samay) {
            return Math.trunc(this.diffInMilliseconds(samay) / Samay.millisecondsInMinute());
        }

        /**
        * Get the difference in hours of the calling Samay instance from the Samay instance passed as argument.
        * @param samay
        * @return Number hours
        */

    }, {
        key: 'diffInHours',
        value: function diffInHours(samay) {
            return Math.trunc(this.diffInMilliseconds(samay) / Samay.millisecondsInHour());
        }

        /**
         * Get the difference in days of the calling Samay instance from the Samay instance passed as argument.
         * @param samay
         * @return Number days
         */

    }, {
        key: 'diffInDays',
        value: function diffInDays(samay) {
            return Math.trunc(this.diffInMilliseconds(samay) / Samay.millisecondsInDay());
        }

        /**
        * Get the difference in weeks of the calling Samay instance from the Samay instance passed as argument.
        * @param samay
        * @return Number weeks
        */

    }, {
        key: 'diffInWeeks',
        value: function diffInWeeks(samay) {
            return Math.trunc(this.diffInMilliseconds(samay) / (7 * Samay.millisecondsInDay()));
        }

        /**
        * Get the difference in months of the calling Samay instance from the Samay instance passed as argument.
        * @param samay
        * @return Number months
        */

    }, {
        key: 'diffInMonths',
        value: function diffInMonths(samay) {
            return Math.trunc(this.diffInMilliseconds(samay) / (30 * Samay.millisecondsInDay()));
        }

        /**
        * Get the difference in quarters of the calling Samay instance from the Samay instance passed as argument.
        * @param samay
        * @return Number quarters
        */

    }, {
        key: 'diffInQuarters',
        value: function diffInQuarters(samay) {
            return Math.trunc(this.diffInMilliseconds(samay) / (91 * Samay.millisecondsInDay()));
        }

        /**
        * Get the difference in years of the calling Samay instance from the Samay instance passed as argument.
        * @param samay
        * @return Number years
        */

    }, {
        key: 'diffInYears',
        value: function diffInYears(samay) {
            return Math.trunc(this.diffInMilliseconds(samay) / (365 * Samay.millisecondsInDay()));
        }

        /**
        * Get the difference of calling Samay instance from the Samay instance passed as argument in human readable format.
        * @param samay
        * @return String
        */

    }, {
        key: 'diffForHumans',
        value: function diffForHumans(samay) {
            var _this3 = this;

            var unit = void 0,
                diff = void 0,
                relative = void 0;
            var relativeWords = samay == null ? ['ago', 'from now'] : ['before', 'after'];
            var units = ['millisecond', 'second', 'minute', 'hour', 'day', 'week', 'month', 'year'];

            units.forEach(function (u) {
                var method = 'diffIn' + _Util2.default.ucwords(u) + 's';
                var value = _this3[method](samay);
                if (value) {
                    diff = Math.abs(value);
                    relative = Math.sign(value) === -1 ? relativeWords[0] : relativeWords[1];
                    unit = diff > 1 ? u + 's' : u;
                }
            });

            return diff + ' ' + unit + ' ' + relative;
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

    }, {
        key: 'eq',
        value: function eq(samay) {
            var _this4 = this;

            var strict = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

            if (strict) {
                if (this._time !== samay._time) return false;
            }

            var mismatch = 0;

            ['_date', '_month', '_year'].forEach(function (prop) {
                if (_this4[prop] !== samay[prop]) mismatch += 1;
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

    }, {
        key: 'ne',
        value: function ne(samay) {
            var strict = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

            if (strict) return !this.eq(samay, true);
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

    }, {
        key: 'gt',
        value: function gt(samay) {
            var strict = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

            if (strict) return this._time > samay._time;

            if (this._year > samay._year) return true;
            if (this._year === samay._year && this._month > samay._month) return true;
            if (this._year === samay._year && this._month === samay._month && this._date > samay._date) return true;
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

    }, {
        key: 'gte',
        value: function gte(samay) {
            var strict = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

            if (strict) return this._time >= samay._time;

            if (this._year > samay._year) return true;
            if (this._year === samay._year && this._month > samay._month) return true;
            if (this._year === samay._year && this._month === samay._month && this._date >= samay._date) return true;

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

    }, {
        key: 'lt',
        value: function lt(samay) {
            var strict = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

            if (strict) return this._time < samay._time;

            if (this._year < samay._year) return true;
            if (this._year === samay._year && this._month < samay._month) return true;
            if (this._year === samay._year && this._month === samay._month && this._date < samay._date) return true;
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

    }, {
        key: 'lte',
        value: function lte(samay) {
            var strict = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

            if (strict) return this._time <= samay._time;

            if (this._year < samay._year) return true;
            if (this._year === samay._year && this._month < samay._month) return true;
            if (this._year === samay._year && this._month === samay._month && this._date <= samay._date) return true;
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

    }, {
        key: 'between',
        value: function between(first, second) {
            var equals = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
            var strict = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

            if (strict) return first.lt(this, true) && this.lt(second, true);

            if (!equals) {
                if (!(first.lt(this, false) && this.lt(second, false))) return false;
                return true;
            }
            if (first.lte(this, false) && this.lte(second, false)) return true;

            return false;
        }
    }], [{
        key: 'now',
        value: function now() {
            var date = new Date();
            var samay = new Samay();
            return samay;
        }

        /**
         * Try to parse the given dateString and if possible return a new Samay instance.
         * representing the date (and time) identified by the given dateString.
         * @param String dateString
         * @return Samay
         */

    }, {
        key: 'parse',
        value: function parse(dateString) {
            if (!dateString) return Samay.now();

            dateString = _Util2.default.trim(dateString);

            var date = _Factory2.default.create(dateString);

            var samay = new Samay();

            samay._buildProperties(date);

            return samay;
        }

        /**
         * Create a new Samay instance from the given dateString in the given format.
         * @param String dateString
         * @param String format
         * @return Samay instance
         */

    }, {
        key: 'createFromFormat',
        value: function createFromFormat(format, dateString) {
            dateString = _Util2.default.trim(dateString);

            var date = _Factory2.default.create(dateString, format);

            var samay = new Samay();

            samay._buildProperties(date);

            if (format === 'ISO-TZ') {
                var tz = _Util2.default.getTimezoneFromDateString(dateString);
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

    }, {
        key: 'create',
        value: function create(format, dateString) {

            dateString = _Util2.default.trim(dateString);

            var date = _Factory2.default.create(dateString, format);

            var samay = new Samay();

            samay._buildProperties(date);

            if (format === 'ISO-TZ') {
                var tz = _Util2.default.getTimezoneFromDateString(dateString);
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

    }, {
        key: 'UTC',
        value: function UTC() {
            if (typeof (arguments.length <= 0 ? undefined : arguments[0]) === 'string' && arguments.length === 2) {

                var date = _Factory2.default.create(_Util2.default.trim(arguments.length <= 1 ? undefined : arguments[1]), _Util2.default.trim(arguments.length <= 0 ? undefined : arguments[0]), true);

                var samay = new Samay();

                samay._buildProperties(date);

                return samay;
            }
            if (typeof (arguments.length <= 0 ? undefined : arguments[0]) === 'string' && arguments.length === 1) {
                var _date = _Factory2.default.create(_Util2.default.trim(arguments.length <= 0 ? undefined : arguments[0]), null, true);

                var _samay = new Samay();

                _samay._buildProperties(_date);

                return _samay;
            }
            if (typeof (arguments.length <= 0 ? undefined : arguments[0]) === 'number') {
                var _date2 = new Date(Date.UTC.apply(Date, arguments));

                var _samay2 = new Samay();

                _samay2._buildProperties(_date2);

                return _samay2;
            }
        }
    }, {
        key: 'millisecondsInMinute',
        value: function millisecondsInMinute() {
            return 60 * 1000;
        }
        /**
         * Return the number of milliseconds in one hour.
         * @return Number milliseconds.
         */

    }, {
        key: 'millisecondsInHour',
        value: function millisecondsInHour() {
            return 60 * 60 * 1000;
        }

        /**
         * Return the number of milliseconds in one day
         * @return Number milliseconds
         */

    }, {
        key: 'millisecondsInDay',
        value: function millisecondsInDay() {
            return 24 * 60 * 60 * 1000;
        }
    }]);

    return Samay;
}();

window.Samay = Samay;
exports.default = Samay;