import test from 'ava';
import Samay from '../Samay';

test('Can check equality of dates', t => {    
    let samay = new Samay(2010,5,23,14,23,32,500);
    let clone = samay.clone();
    
    t.is(samay.eq(clone), true);
    
    //Equality in strict mode
    clone.addMilliseconds(50);
    t.is(samay.eq(clone, true), false);
    //Vs Equality in non-strict mode
    t.is(samay.eq(clone), true);
    
    clone.addDays(9);
    t.is(samay.eq(clone.addDays(9)), false);
});

test('Can check inequality of dates', t => {    
    let samay = new Samay(2010,5,23,14,23,32,500);
    let clone = samay.clone();
    
    t.is(samay.ne(clone), false);
    clone.addDays(9);
    t.is(samay.ne(clone), true);
});

test('Can check if given date is less than the date compared against', t => {    
    let samay = new Samay(2010,5,23,14,23,32,500);
    let clone = samay.clone();
    
    clone.addDays(9);
    t.is(samay.lt(clone), true);
});

test('Can check if given date is less than or equal to the date compared against', t => {    
    let samay = new Samay(2010,5,23,14,23,32,500);
    let clone = samay.clone();
    
    clone.addDays(9);
    t.is(samay.lte(clone), true);
});

test('Can compare two datesCan check if given date is greater than the date compared against', t => {    
    let samay = new Samay(2010,5,23,14,23,32,500);
    let clone = samay.clone();
    
    clone.subtractDays(10);
    t.is(samay.gt(clone), true);
});

test('Can compare two datesCan check if given date is greater than or equal to the date compared against', t => {    
    let samay = new Samay(2010,5,23,14,23,32,500);
    let clone = samay.clone();
    
    clone.subtractDays(10);
    t.is(samay.gte(clone), true);
});

test('Can determine if the given date falls between two dates', t => {
    let samay = new Samay(2010,5,23,14,23,32,500);
    let from = new Samay(2010,5,23,0,0,0,0);
    let upto = new Samay(2010,5,27,14,23,32,500);
    
    //Default check excluding the boundaries i.e. check whether the samay > from and samay < upto
    t.is(samay.between(from, upto), false);
    
    //Check including the boundaries i.e. check whether the samay >= from and samay <= upto
    t.is(samay.between(from, upto, true), true);
    
    //Check by comparing the _time property i.e. check whether the samay._time >= from._time and samay._time <= upto._time
    t.is(samay.between(from, upto, null, true), true);
    
    t.is(samay.clone().subtractDays(1).between(from, upto, true), false);
});