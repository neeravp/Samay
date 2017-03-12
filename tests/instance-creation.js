import test from 'ava';

import Samay from '../Samay';

test('Ava Works', t => {
    t.pass()
});

test('Samay now creates a representation of today', t => {
    let samay = Samay.now();
    
    let date = new Date();
    
    t.is(typeof samay, 'object');
    t.is(Object.getOwnPropertyNames(samay).length, 12);
    
    t.is(samay._date, date.getDate());
    
    t.is(samay._month-1, date.getMonth());
    
    t.is(samay._year, date.getFullYear());
    
    t.is(samay._hours, date.getHours());
    
    t.is(samay._minutes, date.getMinutes());
    
    t.is(samay._tzOffset, date.getTimezoneOffset());
});

test('new Samay creates a representation of today', t => {
    let samay = new Samay();
    let date = new Date();
    
    t.is(typeof samay, 'object');
    t.is(Object.getOwnPropertyNames(samay).length, 12);
    
    t.is(samay._date, date.getDate());
    
    t.is(samay._month-1, date.getMonth());
    
    t.is(samay._year, date.getFullYear());
    
    t.is(samay._hours, date.getHours());
    
    t.is(samay._minutes, date.getMinutes());
    
    t.is(samay._tzOffset, date.getTimezoneOffset());
});

test('Accepts Y-m-d H:i:s format to create new Samay', t => {
    let samay = new Samay('2017-01-01 09:30:14');
    let date = new Date('2017-01-01 09:30:14');
    
    t.is(samay._date, date.getDate());
    
    t.is(samay._month-1, date.getMonth());
    
    t.is(samay._year, date.getFullYear());
    
    t.is(samay._hours, date.getHours());
    
    t.is(samay._minutes, date.getMinutes());
    
    t.is(samay._tzOffset, date.getTimezoneOffset());
});

test('Accepts Y-m-d H:i:s format with create method', t => {
    let samay = Samay.create('Y-m-d H:i:s', '2017-01-01 09:30:14');
    
    t.is(samay._year, 2017);
    t.is(samay._month, 1);
    t.is(samay._date, 1);
    t.is(samay._hours, 9);
    t.is(samay._minutes, 30);
    t.is(samay._seconds, 14);
    t.is(samay._monthName, 'January');
    t.is(samay._day, 'Sunday');
});

test('Can clone an instance', t => {
    let samay = new Samay('2017-01-01 09:30:14');
    let clone = samay.clone();
    
    let props = Object.getOwnPropertyNames(clone);
    props.forEach(prop => {
        t.is(clone[prop], samay[prop]);
    });
});

test('Can parse a dateString in any of the supported formats', t => {
    let samay = Samay.parse('2017-01-01');
    
    let samay1 = Samay.parse('01 Jan 2017');
    
    t.is(samay._year, 2017);
    t.is(samay._month, 1);
    t.is(samay._date, 1);
    
     t.is(samay1._year, 2017);
    t.is(samay1._month, 1);
    t.is(samay1._date, 1);
});

test('create and createFromFormat supports creation from specified formats with corresponding dateStrings', t => {
    let samay = Samay.create('MM d Y', 'January 01 2017');
    let samay1 = Samay.createFromFormat('Y M d', '2017 Jan 01');
    
    t.is(samay._year, 2017);
    t.is(samay._month, 1);
    t.is(samay._date, 1);
    
    t.is(samay1._year, 2017);
    t.is(samay1._month, 1);
    t.is(samay1._date, 1);
    
    let props = Object.getOwnPropertyNames(samay1);
    props.forEach(prop => {
        t.is(samay1[prop], samay[prop]);
    });
});

test('Can create instance representing UTC date', t => {
    let samay = Samay.UTC('Y-m-d H:i:s', '2015-05-23 00:00:00');
    let samay1 = Samay.UTC('2015-05-23');
    let samay2 = Samay.UTC(2015,4,23,0,0,0,0);
    
    t.is(samay._year, 2015);
    t.is(samay._month, 5);
    t.is(samay._date, 23);
    t.is(samay._hours, 5);
    t.is(samay._minutes, 30);
    t.is(samay._seconds, 0);
    t.is(samay._milliseconds, 0);
    
    t.is(samay1._year, 2015);
    t.is(samay1._month, 5);
    t.is(samay1._date, 23);
    t.is(samay1._hours, 5);
    t.is(samay1._minutes, 30);
    t.is(samay1._seconds, 0);
    t.is(samay1._milliseconds, 0);
    
    let props = Object.getOwnPropertyNames(samay2);
    props.forEach(prop => {
        t.is(samay2[prop], samay[prop]);
    });
});