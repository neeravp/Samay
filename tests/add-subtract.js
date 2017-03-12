import test from 'ava';
import Samay from '../Samay';

/*
 |----------------------------------------------------------------------------------------------------
 |                  milliseconds
 |----------------------------------------------------------------------------------------------------
 */
test('Can add milliseconds', t => {
    let samay = new Samay(2015,9,5,9,30,14,500);
    let clone = samay.clone();
    
    clone.addMilliseconds(50);
    
    t.is(clone._milliseconds, samay._milliseconds+50);
    t.is(clone._date, samay._date);
    t.is(clone._month, samay._month);
    t.is(clone._year, samay._year);
    t.is(clone._hours, samay._hours);
    t.is(clone._minutes, samay._minutes);
    t.is(clone._seconds, samay._seconds);
    
    clone.addMilliseconds(500);
    
    t.is(clone._milliseconds, 50);
    t.is(clone._date, samay._date);
    t.is(clone._month, samay._month);
    t.is(clone._year, samay._year);
    t.is(clone._hours, samay._hours);
    t.is(clone._minutes, samay._minutes);
    t.is(clone._seconds, samay._seconds+1);
});

test('Can subtract milliseconds', t => {
    let samay = new Samay(2015,9,5,9,30,14,500);
    let clone = samay.clone();
    
    clone.subtractMilliseconds(65);
    
    t.is(clone._milliseconds, samay._milliseconds-65);
    t.is(clone._date, samay._date);
    t.is(clone._month, samay._month);
    t.is(clone._year, samay._year);
    t.is(clone._hours, samay._hours);
    t.is(clone._minutes, samay._minutes);
    t.is(clone._seconds, samay._seconds);
});

/*
 |----------------------------------------------------------------------------------------------------
 |                  seconds
 |----------------------------------------------------------------------------------------------------
 */

test('Can add seconds', t => {
    let samay = new Samay(2015,9,5,9,30,14,500);
    let clone = samay.clone();
    
    clone.addSeconds(6);
    
    t.is(clone._seconds, samay._seconds+6);
    t.is(clone._date, samay._date);
    t.is(clone._month, samay._month);
    t.is(clone._year, samay._year);
    t.is(clone._hours, samay._hours);
    t.is(clone._minutes, samay._minutes);
    t.is(clone._milliseconds, samay._milliseconds);    
    
});

test('Can subtract seconds', t => {
    let samay = new Samay(2015,9,5,9,30,14,500);
    let clone = samay.clone();
    
    clone.subtractSeconds(4);
    
    t.is(clone._seconds, samay._seconds-4);
    t.is(clone._date, samay._date);
    t.is(clone._month, samay._month);
    t.is(clone._year, samay._year);
    t.is(clone._hours, samay._hours);
    t.is(clone._minutes, samay._minutes);
    t.is(clone._milliseconds, samay._milliseconds);
    
    clone.subtractSeconds(25);
    
    t.is(clone._seconds, 45);
    t.is(clone._date, samay._date);
    t.is(clone._month, samay._month);
    t.is(clone._year, samay._year);
    t.is(clone._hours, samay._hours);
    t.is(clone._minutes, samay._minutes-1);
    t.is(clone._milliseconds, samay._milliseconds);
});

/*
 |----------------------------------------------------------------------------------------------------
 |                  minutes
 |----------------------------------------------------------------------------------------------------
 */

test('Can add minutes', t => {
    let samay = new Samay(2015,9,5,9,30,14,500);
    let clone = samay.clone();
    
    clone.addMinutes(15);
    
    t.is(clone._minutes, samay._minutes+15);
    t.is(clone._date, samay._date);
    t.is(clone._month, samay._month);
    t.is(clone._year, samay._year);
    t.is(clone._hours, samay._hours);
    t.is(clone._seconds, samay._seconds);
    t.is(clone._milliseconds, samay._milliseconds);
    
     clone.addMinutes(100);
    
    t.is(clone._minutes, 25);
    t.is(clone._date, samay._date);
    t.is(clone._month, samay._month);
    t.is(clone._year, samay._year);
    t.is(clone._hours, samay._hours+2);
    t.is(clone._seconds, samay._seconds);
    t.is(clone._milliseconds, samay._milliseconds);
});

test('Can subtract minutes', t => {
    let samay = new Samay(2015,9,5,9,30,14,500);
    let clone = samay.clone();
    
    clone.subtractMinutes(9);
    
    t.is(clone._minutes, samay._minutes-9);
    t.is(clone._date, samay._date);
    t.is(clone._month, samay._month);
    t.is(clone._year, samay._year);
    t.is(clone._hours, samay._hours);
    t.is(clone._seconds, samay._seconds);
    t.is(clone._milliseconds, samay._milliseconds);
});

/*
 |----------------------------------------------------------------------------------------------------
 |                  hours
 |----------------------------------------------------------------------------------------------------
 */

test('Can add hours', t => {
    let samay = new Samay(2015,9,5,9,30,14,500);
    let clone = samay.clone();
    
    clone.addHours(7);
    
    t.is(clone._hours, samay._hours+7);
    t.is(clone._date, samay._date);
    t.is(clone._month, samay._month);
    t.is(clone._year, samay._year);
    t.is(clone._minutes, samay._minutes);
    t.is(clone._seconds, samay._seconds);
    t.is(clone._milliseconds, samay._milliseconds);
    
    clone.addHours(-10);
    
    t.is(clone._hours, samay._hours-3);
    t.is(clone._date, samay._date);
    t.is(clone._month, samay._month);
    t.is(clone._year, samay._year);
    t.is(clone._minutes, samay._minutes);
    t.is(clone._seconds, samay._seconds);
    t.is(clone._milliseconds, samay._milliseconds);
    
    clone.addHours(-10);
    
    t.is(clone._hours, 20);
    t.is(clone._date, samay._date-1);
    t.is(clone._month, samay._month);
    t.is(clone._year, samay._year);
    t.is(clone._minutes, samay._minutes);
    t.is(clone._seconds, samay._seconds);
    t.is(clone._milliseconds, samay._milliseconds);
});

test('Can subtract hours', t => {
    let samay = new Samay(2015,9,5,9,30,14,500);
    let clone = samay.clone();
    
    clone.subtractHours(2);
    
    t.is(clone._hours, samay._hours-2);
    t.is(clone._date, samay._date);
    t.is(clone._month, samay._month);
    t.is(clone._year, samay._year);
    t.is(clone._minutes, samay._minutes);
    t.is(clone._seconds, samay._seconds);
    t.is(clone._milliseconds, samay._milliseconds);
    
    clone.subtractHours(50);
    
    t.is(clone._hours, 5);
    t.is(clone._date, samay._date-2);
    t.is(clone._month, samay._month);
    t.is(clone._year, samay._year);
    t.is(clone._minutes, samay._minutes);
    t.is(clone._seconds, samay._seconds);
    t.is(clone._milliseconds, samay._milliseconds);
});

/*
 |----------------------------------------------------------------------------------------------------
 |                  days
 |----------------------------------------------------------------------------------------------------
 */

test('Can add days', t => {
    let samay = new Samay(2010,2,5,9,30,23,500);
    let clone = samay.clone();
    
    clone.addDays(3);
    t.is(clone._date, samay._date+3);
    t.is(clone._month, samay._month);
    t.is(clone._year, samay._year);
    t.is(clone._time, samay._time+(3*24*60*60*1000));
    t.is(clone._hours, samay._hours);
});

test('Can subtract days', t => {
    let samay = new Samay(2010,2,5,9,30,23,500);
    let clone = samay.clone();
    
    clone.subtractDays(10);
    t.is(clone._date, 26);
    t.is(clone._month, samay._month-1);
    t.is(clone._year, samay._year);
    t.is(clone._time, samay._time-(10*24*60*60*1000));
    t.is(clone._hours, samay._hours);
});

/*
 |----------------------------------------------------------------------------------------------------
 |                  weeks
 |----------------------------------------------------------------------------------------------------
 */

test('Can add weeks', t => {
    let samay = new Samay(2010,2,5,9,30,23,500);
    let clone = samay.clone();
    
    clone.addWeeks(3);
    t.is(clone._date, samay._date+21);
    t.is(clone._month, samay._month);
    t.is(clone._year, samay._year);
    t.is(clone._time, samay._time+(21*24*60*60*1000));
    t.is(clone._hours, samay._hours);
});

test('Can subtract weeks', t => {
    let samay = new Samay(2010,2,5,9,30,23,500);
    let clone = samay.clone();
    
    clone.subtractWeeks(3);
    t.is(clone._date, 15);
    t.is(clone._month, samay._month-1);
    t.is(clone._year, samay._year);
    t.is(clone._time, samay._time-(21*24*60*60*1000));
    t.is(clone._hours, samay._hours);
});

/*
 |----------------------------------------------------------------------------------------------------
 |                  months
 |----------------------------------------------------------------------------------------------------
 */

test('Can add months', t => {
    let samay = new Samay(2010,2,5,9,30,23,500);
    let clone = samay.clone();
    
    clone.addMonths(19);
    t.is(clone._date, samay._date);
    t.is(clone._month, samay._month+7);
    t.is(clone._year, samay._year+1);
    //t.is(clone._time, samay._time+((365*5+1)*24*60*60*1000));
    t.is(clone._hours, samay._hours);
    
    clone.addMonths(41);
    t.is(clone._date, samay._date);
    t.is(clone._month, samay._month);
    t.is(clone._year, samay._year+5);
    //t.is(clone._time, samay._time+((365*5+1)*24*60*60*1000));
    t.is(clone._hours, samay._hours);
});

test('Can subtract months', t => {
    let samay = new Samay(2010,2,5,9,30,23,500);
    let clone = samay.clone();
    
    clone.subtractMonths(24);
    t.is(clone._date, samay._date);
    t.is(clone._month, samay._month);
    t.is(clone._year, samay._year-2);
    //t.is(clone._time, samay._time-(365*5*24*60*60*1000));
    t.is(clone._hours, samay._hours);
});


/*
 |----------------------------------------------------------------------------------------------------
 |                  quarters
 |----------------------------------------------------------------------------------------------------
 */

test('Can add quarters', t => {
    let samay = new Samay(2010,2,5,9,30,23,500);
    let clone = samay.clone();
    
    clone.addQuarters(2);
    t.is(clone._date, samay._date);
    t.is(clone._month, samay._month+6);
    t.is(clone._year, samay._year);
    //t.is(clone._time, samay._time+((365*5+1)*24*60*60*1000));
    t.is(clone._hours, samay._hours);
    
    clone.addQuarters(4);
    t.is(clone._date, samay._date);
    t.is(clone._month, samay._month+6);
    t.is(clone._year, samay._year+1);
    //t.is(clone._time, samay._time+((365*5+1)*24*60*60*1000));
    t.is(clone._hours, samay._hours);
});

test('Can subtract quarters', t => {
    let samay = new Samay(2010,12,5,9,30,23,500);
    let clone = samay.clone();
    
    clone.subtractQuarters(3);
    t.is(clone._date, samay._date);
    t.is(clone._month, samay._month-9);
    t.is(clone._year, samay._year);
    //t.is(clone._time, samay._time-(365*5*24*60*60*1000));
    t.is(clone._hours, samay._hours);
});

/*
 |----------------------------------------------------------------------------------------------------
 |                  years
 |----------------------------------------------------------------------------------------------------
 */

test('Can add years', t => {
    let samay = new Samay(2010,2,5,9,30,23,500);
    let clone = samay.clone();
    
    clone.addYears(3);
    t.is(clone._date, samay._date);
    t.is(clone._month, samay._month);
    t.is(clone._year, samay._year+3);
    t.is(clone._hours, samay._hours);
});

test('Can subtract years', t => {
    let samay = new Samay(2010,2,5,9,30,23,500);
    let clone = samay.clone();
    
    clone.subtractYears(2);
    t.is(clone._date, samay._date);
    t.is(clone._month, samay._month);
    t.is(clone._year, samay._year-2);
    t.is(clone._hours, samay._hours);
});