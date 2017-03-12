import test from 'ava';
import Samay from '../Samay';

test('Return difference in milliseconds', t => {
    let samay = new Samay(2010,5,23,14,23,32,500);
    let clone = samay.clone();
    
    clone.addMilliseconds(140);
    t.is(samay.diffInMilliseconds(clone), -140);
});

test('Return difference in seconds', t => {
    let samay = new Samay(2010,5,23,14,23,32,500);
    let clone = samay.clone();
    
    clone.addSeconds(9);
    t.is(samay.diffInSeconds(clone), -9);
});

test('Return difference in minutes', t => {
    let samay = new Samay(2010,5,23,14,23,32,500);
    let clone = samay.clone();
    
    clone.addMinutes(9);
    t.is(samay.diffInMinutes(clone), -9);
});

test('Return difference in hours', t => {
    let samay = new Samay(2010,5,23,14,23,32,500);
    let clone = samay.clone();
    
    clone.subtractHours(9);
    t.is(samay.diffInHours(clone), 9);
});

test('Return difference in days', t => {
    let samay = new Samay(2010,5,23,14,23,32,500);
    let clone = samay.clone();
    
    clone.addDays(9);
    t.is(samay.diffInDays(clone), -9);
});

test('Return difference in weeks', t => {
    let samay = new Samay(2010,5,23,14,23,32,500);
    let clone = samay.clone();
    
    clone.subtractWeeks(1);
    t.is(samay.diffInWeeks(clone), 1);
});

test('Return difference in months', t => {
    let samay = new Samay(2010,5,23,14,23,32,500);
    let clone = samay.clone().addMonths(-5);
    
    t.is(samay.diffInMonths(clone), 5);
});

test('Return difference in quarters', t => {
    let samay = new Samay(2010,5,23,14,23,32,500);
    let clone = samay.clone().addQuarters(1);
  
    t.is(samay.diffInQuarters(clone), -1);
});

test('Return difference in years', t => {
    let samay = new Samay(2010,5,23,14,23,32,500);
    let clone = samay.clone();
    
    clone.addYears(15);
    t.is(samay.diffInYears(clone), -15);
});

test('Return difference in human readable string', t => {
    let samay = new Samay(2010,5,23,14,23,32,500);
    let clone = samay.clone();
    
    clone.addDays(5);
    t.is(samay.diffForHumans(clone), '5 days before');
    
    clone.addDays(3);
    t.is(samay.diffForHumans(clone), '1 week before');
    
});