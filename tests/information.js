import test from 'ava';
import Samay from '../Samay';


/*
 |----------------------------------------------------------------------------------------------------
 |                  day
 |----------------------------------------------------------------------------------------------------
 */
test('Returns the day of year', t => {
    let samay = new Samay(2016,6,23,0,0,0);
    
    t.is(samay.dayOfYear(), 175);
});

/*
 |----------------------------------------------------------------------------------------------------
 |                  week
 |----------------------------------------------------------------------------------------------------
 */
test('Returns the week of year to which the instance date belongs', t => {
    let samay = new Samay(2011,7,4,0,0,0,0);
    
    let days = samay.dayOfYear();
    let weekNumber = Math.ceil(days/7);
    t.is(samay.weekOfYear(), weekNumber);
});

test('Returns the week of the month to which the instance date belongs', t => {
    let samay = new Samay(2003,9,18,0,0,0,0);
    
    let weekNumber = Math.ceil(samay._date/7);
    t.is(samay.weekOfMonth(), weekNumber);
});

test('Returns the total weeks in the month to which the instance date belongs', t =>{
    let samay = new Samay(2010,11,17,0,0,0,0);
    
    t.is(samay.weeksInMonth(), 5);
});

/*
 |----------------------------------------------------------------------------------------------------
 |                  month
 |----------------------------------------------------------------------------------------------------
 */
test('Returns the number of days in the month to which the instance date belongs', t => {
    let samay = new Samay(2004,2,14,0,0,0,0);
    let clone = samay.clone().addMonths(5);
    
    t.is(samay.daysInMonth(), 29);
    t.is(clone.daysInMonth(), 31);    
});

/*
 |----------------------------------------------------------------------------------------------------
 |                  quarter
 |----------------------------------------------------------------------------------------------------
 */
test('Returns the quarter number to which the instance date belongs', t => {
    let samay = new Samay(2008,5,29,0,0,0,0);
    
    t.is(samay.quarterOfYear(), 2);
});