import test from 'ava';
import Samay from '../Samay';

/*
 |----------------------------------------------------------------------------------------------------
 |                  day
 |----------------------------------------------------------------------------------------------------
 */

test('Returns start of day', t => {
    let samay = new Samay(2005,3,31,16,30,30,500);
    let clone = samay.clone();
    
    clone.startOfDay();
    t.is(clone._hours, 0);
    t.is(clone._minutes, 0);
    t.is(clone._seconds, 0);
    t.is(clone._milliseconds, 1);
    t.is(clone._date, samay._date);
    t.is(clone._month, samay._month);
    t.is(clone._year, samay._year);
});

test('Returns the end of day', t => {
    let samay = new Samay(2005,3,31,16,30,30,500);
    let clone = samay.clone();
    
    clone.endOfDay();
    t.is(clone._hours, 23);
    t.is(clone._minutes, 59);
    t.is(clone._seconds, 59);
    t.is(clone._milliseconds, 999);
    t.is(clone._date, samay._date);
    t.is(clone._month, samay._month);
    t.is(clone._year, samay._year);
});

test('Returns identical time of the previous day', t => {
    let samay = new Samay(2007,7,16,1,20,15,0);
    let clone = samay.clone();
    
    clone.previousDay();
    
    t.is(clone._date, samay._date-1);
    t.is(clone._month, samay._month);
    t.is(clone._year, samay._year);
    t.is(clone._hours, samay._hours);
    t.is(clone._minutes, samay._minutes);
    t.is(clone._seconds, samay._seconds);
});

test('Returns identical time of the day after', t => {
    let samay = new Samay(2007,7,16,1,20,15,0);
    let clone = samay.clone();
    
    clone.nextDay();
    
    t.is(clone._date, samay._date+1);
    t.is(clone._month, samay._month);
    t.is(clone._year, samay._year);
    t.is(clone._hours, samay._hours);
    t.is(clone._minutes, samay._minutes);
    t.is(clone._seconds, samay._seconds);
});


/*
 |----------------------------------------------------------------------------------------------------
 |                  week
 |----------------------------------------------------------------------------------------------------
 */

test('Returns the first day of the week', t => {
    let samay = new Samay(2005,3,31,16,30,30,500);
    let clone = samay.clone();
    
    clone.startOfWeek();
    t.is(clone._hours, samay._hours);
    t.is(clone._minutes, samay._minutes);
    t.is(clone._seconds, samay._seconds);
    t.is(clone._milliseconds, samay._milliseconds);
    t.is(clone._date, 28);
    t.is(clone._month, samay._month);
    t.is(clone._year, samay._year);
});

test('Returns the last day of the week', t => {
    let samay = new Samay(2005,3,31,16,30,30,500);
    let clone = samay.clone();
    
    clone.endOfWeek();
    t.is(clone._hours, samay._hours);
    t.is(clone._minutes, samay._minutes);
    t.is(clone._seconds, samay._seconds);
    t.is(clone._milliseconds, samay._milliseconds);
    t.is(clone._date, 3);
    t.is(clone._month, 4);
    t.is(clone._year, samay._year);
});

test('Returns identical date in the previous week', t => {
    let samay = new Samay(2007,7,16,1,20,15,0);
    let clone = samay.clone();
    
    clone.previousWeek();
    
    t.is(clone._date, samay._date-7);
    t.is(clone._month, samay._month);
    t.is(clone._year, samay._year);
    t.is(clone._hours, samay._hours);
    t.is(clone._minutes, samay._minutes);
    t.is(clone._seconds, samay._seconds);
});

test('Returns identical date in the week after', t => {
    let samay = new Samay(2007,7,16,1,20,15,0);
    let clone = samay.clone();
    
    clone.nextWeek();
    
    t.is(clone._date, samay._date+7);
    t.is(clone._month, samay._month);
    t.is(clone._year, samay._year);
    t.is(clone._hours, samay._hours);
    t.is(clone._minutes, samay._minutes);
    t.is(clone._seconds, samay._seconds);
});

test('Returns identical date in the weeks before n weeks', t => {
    let samay = new Samay(2007,7,16,1,20,15,0);
    let clone = samay.clone();
    
    clone.weekBefore(5);
    
    t.is(clone._date, 11);
    t.is(clone._month, 6);
    t.is(clone._year, samay._year);
    t.is(clone._hours, samay._hours);
    t.is(clone._minutes, samay._minutes);
    t.is(clone._seconds, samay._seconds);
});

test('Returns identical date in the week after n weeks', t => {
    let samay = new Samay(2007,7,16,1,20,15,0);
    let clone = samay.clone();
    
    clone.weekAfter(2);
    
    t.is(clone._date, 30);
    t.is(clone._month, samay._month);
    t.is(clone._year, samay._year);
    t.is(clone._hours, samay._hours);
    t.is(clone._minutes, samay._minutes);
    t.is(clone._seconds, samay._seconds);
});


/*
 |----------------------------------------------------------------------------------------------------
 |                  month
 |----------------------------------------------------------------------------------------------------
 */

test('Returns the first day of the month', t => {
    let samay = new Samay(2005,3,14,16,30,30,500);
    let clone = samay.clone();
    
    clone.startOfMonth();
    t.is(clone._hours, samay._hours);
    t.is(clone._minutes, samay._minutes);
    t.is(clone._seconds, samay._seconds);
    t.is(clone._milliseconds, samay._milliseconds);
    t.is(clone._date, 1);
    t.is(clone._month, samay._month);
    t.is(clone._year, samay._year);
});

test('Returns the last day of the month', t => {
    let samay = new Samay(2005,3,21,16,30,30,500);
    let clone = samay.clone();
    
    clone.endOfMonth();
    t.is(clone._hours, samay._hours);
    t.is(clone._minutes, samay._minutes);
    t.is(clone._seconds, samay._seconds);
    t.is(clone._milliseconds, samay._milliseconds);
    t.is(clone._date, 31);
    t.is(clone._month, samay._month);
    t.is(clone._year, samay._year);
});

test('Returns identical date in the previous month', t => {
    let samay = new Samay(2007,7,16,1,20,15,0);
    let clone = samay.clone();
    
    clone.previousMonth();
    
    t.is(clone._date, samay._date);
    t.is(clone._month, samay._month-1);
    t.is(clone._year, samay._year);
    t.is(clone._hours, samay._hours);
    t.is(clone._minutes, samay._minutes);
    t.is(clone._seconds, samay._seconds);
});

test('Returns identical date in the month after', t => {
    let samay = new Samay(2007,7,16,1,20,15,0);
    let clone = samay.clone();
    
    clone.nextMonth();
    
    t.is(clone._date, samay._date);
    t.is(clone._month, samay._month+1);
    t.is(clone._year, samay._year);
    t.is(clone._hours, samay._hours);
    t.is(clone._minutes, samay._minutes);
    t.is(clone._seconds, samay._seconds);
});

test('Returns identical date in the month before n months', t => {
    let samay = new Samay(2007,7,16,1,20,15,0);
    let clone = samay.clone();
    
    clone.monthBefore(3);
    
    t.is(clone._date, samay._date);
    t.is(clone._month, samay._month-3);
    t.is(clone._year, samay._year);
    t.is(clone._hours, samay._hours);
    t.is(clone._minutes, samay._minutes);
    t.is(clone._seconds, samay._seconds);
});

test('Returns identical date in the month after n months', t => {
    let samay = new Samay(2007,7,16,1,20,15,0);
    let clone = samay.clone();
    
    clone.monthAfter(10);
    
    t.is(clone._date, samay._date);
    t.is(clone._month, 5);
    t.is(clone._year, samay._year+1);
    t.is(clone._hours, samay._hours);
    t.is(clone._minutes, samay._minutes);
    t.is(clone._seconds, samay._seconds);
});




test('Returns the 1st occurence of day identified by dayName of given instance in the month', t =>{
    let samay = new Samay(2017,2,10,0,0,0,0);
    let clone = samay.clone();
    
    clone.firstOfMonth();
    t.is(clone._date, 3);
    t.is(clone._month, samay._month);
    t.is(clone._year, samay._year);
});

test('Returns the last occurence of day identified by dayName of given instance in the month', t =>{
    let samay = new Samay(2017,2,10,0,0,0,0);
    let clone = samay.clone();
    
    clone.lastOfMonth();
    t.is(clone._date, 24);
    t.is(clone._month, samay._month);
    t.is(clone._year, samay._year);
});

test('Returns the 1st occurence of specified day in the month to which the instance belongs', t => {
    let samay = new Samay(2017,2,10,0,0,0,0);
    let clone = samay.clone();
    
    clone.firstOfMonth('Thursday');
    t.is(clone._date, 2);
    t.is(clone._month, samay._month);
    t.is(clone._year, samay._year);
});

test('Returns the last occurence of specified day in the month to which the instance belongs', t => {
    let samay = new Samay(2017,2,10,0,0,0,0);
    let clone = samay.clone();
    
    clone.lastOfMonth('Monday');
    t.is(clone._date, 27);
    t.is(clone._month, samay._month);
    t.is(clone._year, samay._year);
});

test('Returns nth occurence of the specified day in the month to which the instance belongs', t => {
    let samay = new Samay(2017,2,10,0,0,0,0);
    let clone = samay.clone();
    
    clone.nthOfMonth(3, 'Wednesday');
     t.is(clone._date, 15);
    t.is(clone._month, samay._month);
    t.is(clone._year, samay._year);
});


/*
 |----------------------------------------------------------------------------------------------------
 |                  quarter
 |----------------------------------------------------------------------------------------------------
 */


test('Returns the 1st day of the quarter', t => {
    let samay = new Samay(2005,3,14,16,30,30,500);
    let clone = samay.clone();
    
    clone.startOfQuarter();
    t.is(clone._hours, samay._hours);
    t.is(clone._minutes, samay._minutes);
    t.is(clone._seconds, samay._seconds);
    t.is(clone._milliseconds, samay._milliseconds);
    t.is(clone._date, 1);
    t.is(clone._month, 1);
    t.is(clone._year, samay._year);
});

test('Returns the last day of the quarter', t => {
    let samay = new Samay(2005,3,21,16,30,30,500);
    let clone = samay.clone();
    
    clone.endOfQuarter();
    t.is(clone._hours, samay._hours);
    t.is(clone._minutes, samay._minutes);
    t.is(clone._seconds, samay._seconds);
    t.is(clone._milliseconds, samay._milliseconds);
    t.is(clone._date, 31);
    t.is(clone._month, 3);
    t.is(clone._year, samay._year);
});

test('Returns identical date in the previous quarter', t => {
    let samay = new Samay(2007,7,16,1,20,15,0);
    let clone = samay.clone();
    
    clone.previousQuarter();
    
    t.is(clone._date, samay._date);
    t.is(clone._month, samay._month-3);
    t.is(clone._year, samay._year);
    t.is(clone._hours, samay._hours);
    t.is(clone._minutes, samay._minutes);
    t.is(clone._seconds, samay._seconds);
});

test('Returns identical date in the quarter after', t => {
    let samay = new Samay(2007,7,16,1,20,15,0);
    let clone = samay.clone();
    
    clone.nextQuarter();
    
    t.is(clone._date, samay._date);
    t.is(clone._month, samay._month+3);
    t.is(clone._year, samay._year);
    t.is(clone._hours, samay._hours);
    t.is(clone._minutes, samay._minutes);
    t.is(clone._seconds, samay._seconds);
});

test('Returns identical date in the quarter before n quarters', t => {
    let samay = new Samay(2007,7,16,1,20,15,0);
    let clone = samay.clone();
    
    clone.quarterBefore(2);
    
    t.is(clone._date, samay._date);
    t.is(clone._month, samay._month-6);
    t.is(clone._year, samay._year);
    t.is(clone._hours, samay._hours);
    t.is(clone._minutes, samay._minutes);
    t.is(clone._seconds, samay._seconds);
});

test('Returns identical date in the quarter after n quarters', t => {
    let samay = new Samay(2007,7,16,1,20,15,0);
    let clone = samay.clone();
    
    clone.quarterAfter(7);
    
    t.is(clone._date, samay._date);
    t.is(clone._month, samay._month-3);
    t.is(clone._year, samay._year+2);
    t.is(clone._hours, samay._hours);
    t.is(clone._minutes, samay._minutes);
    t.is(clone._seconds, samay._seconds);
});




test('Returns the 1st occurence of day identified by dayName of given instance in the quarter', t =>{
    let samay = new Samay(2017,2,10,0,0,0,0);
    let clone = samay.clone();
    
    clone.firstOfQuarter();
    t.is(clone._date, 6);
    t.is(clone._month, 1);
    t.is(clone._year, samay._year);
});

test('Returns the last occurence of day identified by dayName of given instance in the quarter', t =>{
    let samay = new Samay(2017,2,10,0,0,0,0);
    let clone = samay.clone();
    
    clone.lastOfQuarter();
    t.is(clone._date, 31);
    t.is(clone._month, 3);
    t.is(clone._year, samay._year);
});

test('Returns the 1st occurence of the specified day in the quarter to which the instance belongs', t => {
    let samay = new Samay(2017,2,10,0,0,0,0);
    let clone = samay.clone();
    
    clone.firstOfQuarter('Thursday');
    t.is(clone._date, 5);
    t.is(clone._month, 1);
    t.is(clone._year, samay._year);
});

test('Returns the last occurence of the specified day in the quarter to which the instance belongs', t => {
    let samay = new Samay(2017,2,10,0,0,0,0);
    let clone = samay.clone();
    
    clone.lastOfQuarter('Monday');
    t.is(clone._date, 27);
    t.is(clone._month, 3);
    t.is(clone._year, samay._year);
});

test('Returns nth occurence of the specified day in the quarter to which the instance belongs', t => {
    let samay = new Samay(2017,2,10,0,0,0,0);
    let clone = samay.clone();
    
    clone.nthOfQuarter(8, 'Wednesday');
     t.is(clone._date, 22);
    t.is(clone._month, 2);
    t.is(clone._year, samay._year);
});


/*
 |----------------------------------------------------------------------------------------------------
 |                 year
 |----------------------------------------------------------------------------------------------------
 */


test('Returns the first day of the year', t => {
    let samay = new Samay(2005,3,14,16,30,30,500);
    let clone = samay.clone();
    
    clone.startOfYear();
    t.is(clone._hours, samay._hours);
    t.is(clone._minutes, samay._minutes);
    t.is(clone._seconds, samay._seconds);
    t.is(clone._milliseconds, samay._milliseconds);
    t.is(clone._date, 1);
    t.is(clone._month, 1);
    t.is(clone._year, samay._year);
});

test('Returns the last day of the year', t => {
    let samay = new Samay(2005,3,21,16,30,30,500);
    let clone = samay.clone();
    
    clone.endOfYear();
    t.is(clone._hours, samay._hours);
    t.is(clone._minutes, samay._minutes);
    t.is(clone._seconds, samay._seconds);
    t.is(clone._milliseconds, samay._milliseconds);
    t.is(clone._date, 31);
    t.is(clone._month, 12);
    t.is(clone._year, samay._year);
});

test('Returns the identical date in previous year', t => {
    let samay = new Samay(2007,7,16,1,20,15,0);
    let clone = samay.clone();
    
    clone.previousYear();
    
    t.is(clone._date, samay._date);
    t.is(clone._month, samay._month);
    t.is(clone._year, samay._year-1);
    t.is(clone._hours, samay._hours);
    t.is(clone._minutes, samay._minutes);
    t.is(clone._seconds, samay._seconds);
});

test('Returns the identical date in year after', t => {
    let samay = new Samay(2007,7,16,1,20,15,0);
    let clone = samay.clone();
    
    clone.nextYear();
    
    t.is(clone._date, samay._date);
    t.is(clone._month, samay._month);
    t.is(clone._year, samay._year+1);
    t.is(clone._hours, samay._hours);
    t.is(clone._minutes, samay._minutes);
    t.is(clone._seconds, samay._seconds);
});

test('Returns the identical date in year before n years', t => {
    let samay = new Samay(2007,7,16,1,20,15,0);
    let clone = samay.clone();
    
    clone.yearBefore(2);
    
    t.is(clone._date, samay._date);
    t.is(clone._month, samay._month);
    t.is(clone._year, samay._year-2);
    t.is(clone._hours, samay._hours);
    t.is(clone._minutes, samay._minutes);
    t.is(clone._seconds, samay._seconds);
});

test('Returns the identical date in year after n years', t => {
    let samay = new Samay(2007,7,16,1,20,15,0);
    let clone = samay.clone();
    
    clone.yearAfter(12);
    
    t.is(clone._date, samay._date);
    t.is(clone._month, samay._month);
    t.is(clone._year, samay._year+12);
    t.is(clone._hours, samay._hours);
    t.is(clone._minutes, samay._minutes);
    t.is(clone._seconds, samay._seconds);
});


test('Returns the 1st occurence of day identified by dayName of given instance in the year', t =>{
    let samay = new Samay(2017,8,20,0,0,0,0);
    let clone = samay.clone();
    
    clone.firstOfYear();
    t.is(clone._date, 1);
    t.is(clone._month, 1);
    t.is(clone._year, samay._year);
});


test('Returns the last occurence of day identified by dayName of given instance in the year', t =>{
    let samay = new Samay(2017,1,10,0,0,0,0);
    let clone = samay.clone();    
    
    clone.lastOfYear();
    t.is(clone._date, 26);
    t.is(clone._month, 12);
    t.is(clone._year, samay._year);
});



test('Returns the 1st occurence of the specified day in the year to which the instance belongs', t => {
    let samay = new Samay(2017,2,10,0,0,0,0);
    let clone = samay.clone();
    
    clone.firstOfYear('Thursday');
    t.is(clone._date, 5);
    t.is(clone._month, 1);
    t.is(clone._year, samay._year);
});

test('Returns the last occurence of the specified day in the year to which the instance belongs', t => {
    let samay = new Samay(2017,4,14,0,0,0,0);
    let clone = samay.clone();
    
    clone.lastOfYear('Monday');
    t.is(clone._date, 25);
    t.is(clone._month, 12);
    t.is(clone._year, samay._year);
});

test('Returns the nth occurence of specified day in the year', t => {
    let samay = new Samay(2017,2,10,0,0,0,0);
    let clone = samay.clone();
    
    clone.nthOfYear(18, 'Wednesday');
     t.is(clone._date, 3);
    t.is(clone._month, 5);
    t.is(clone._year, samay._year);
});