import test from 'ava';
import Samay from '../Samay';

test('Can output string in ISO format', t => {
    let samay = new Samay(2010,5,16,9,50,37,845);
    
    t.is(samay.toIsoString(), '2010-05-16T09:50:37.845 GMT+05:30');
    t.is(samay.getIsoDate(), '2010-05-16T09:50:37.845 GMT+05:30');
    t.is(samay.format('ISO'), '2010-05-16T09:50:37.845 GMT+05:30');
});

test('Can output string in UTC format', t => {
    let samay = new Samay(2010,5,16,9,50,37,845);
    
    t.is(samay.toUtcString(), '2010-05-16T09:50:37.845Z');
    t.is(samay.getUtcDate(), '2010-05-16T09:50:37.845Z');
    t.is(samay.format('UTC'), '2010-05-16T09:50:37.845Z');
});

test('Can output string in RSS format', t => {
    let samay = new Samay(2010,5,16,9,50,37,845);
    
    t.is(samay.toRssString(), 'Sun, 16 May 2010 09:50:37 GMT+05:30');
    t.is(samay.getRssDate(), 'Sun, 16 May 2010 09:50:37 GMT+05:30');
    t.is(samay.format('RSS'), 'Sun, 16 May 2010 09:50:37 GMT+05:30');
});

test('Can output string in Atom format', t => {
    let samay = new Samay(2010,5,16,9,50,37,845);
    
    t.is(samay.toAtomString(), '2010-05-16T09:50:37GMT+05:30');
    t.is(samay.getAtomDate(), '2010-05-16T09:50:37GMT+05:30');
    t.is(samay.format('Atom'), '2010-05-16T09:50:37GMT+05:30');
});

test('Can output string in Cookie format', t => {
    let samay = new Samay(2010,5,16,9,50,37,845);
    
    t.is(samay.toCookieString(), 'Sunday, 16-May-2010 09:50:37 GMT+05:30');
    t.is(samay.getCookieDate(), 'Sunday, 16-May-2010 09:50:37 GMT+05:30');
    t.is(samay.format('Cookie'), 'Sunday, 16-May-2010 09:50:37 GMT+05:30');
});

test('Supports Y-m-d H:i:s format', t => {
    let samay = Samay.create('Y-m-d H:i:s', '2017-01-01 09:30:14');
    
    t.is(samay._year, 2017);
    t.is(samay._month, 1);
    t.is(samay._date, 1);
    t.is(samay._hours, 9);
    t.is(samay._minutes, 30);
    t.is(samay._seconds, 14);
    t.is(samay._monthName, 'January');
    t.is(samay._day, 'Sunday');
    
    let date = new Samay(2017,1,1,9,30,14,0);
    t.is(date.format('Y-m-d H:i:s'), '2017-01-01 09:30:14');
});

test('Supports Y-m-d H:i:s:ms format', t => {
    let samay = Samay.create('Y-m-d H:i:s:ms', '2017-01-01 09:30:14:950');
    
    t.is(samay._year, 2017);
    t.is(samay._month, 1);
    t.is(samay._date, 1);
    t.is(samay._hours, 9);
    t.is(samay._minutes, 30);
    t.is(samay._seconds, 14);
    t.is(samay._milliseconds, 950);
    t.is(samay._monthName, 'January');
    t.is(samay._day, 'Sunday');
    
    let date = new Samay(2017,1,1,9,30,14,950);
    t.is(date.format('Y-m-d H:i:s:ms'), '2017-01-01 09:30:14:950');
});

test('Supports Y-m-d g:i A format', t => {
    let samay = Samay.create('Y-m-d g:i A', '2017-01-01 09:30 AM');
    
    t.is(samay._year, 2017);
    t.is(samay._month, 1);
    t.is(samay._date, 1);
    t.is(samay._hours, 9);
    t.is(samay._minutes, 30);
    t.is(samay._seconds, 0);
    t.is(samay._monthName, 'January');
    t.is(samay._day, 'Sunday');
    
    let date = new Samay(2017,1,1,9,30,14,0);
    t.is(date.format('Y-m-d g:i A'), '2017-01-01 09:30 AM');
});

test('Supports Y-m-d g:i:s A format', t => {
    let samay = Samay.create('Y-m-d g:i:s A', '2017-01-01 09:30:14 AM');
    
    t.is(samay._year, 2017);
    t.is(samay._month, 1);
    t.is(samay._date, 1);
    t.is(samay._hours, 9);
    t.is(samay._minutes, 30);
    t.is(samay._seconds, 14);
    t.is(samay._monthName, 'January');
    t.is(samay._day, 'Sunday');
    
    let date = new Samay(2017,1,1,9,30,14,0);
    t.is(date.format('Y-m-d g:i:s A'), '2017-01-01 09:30:14 AM');
});

test('Supports d/m/Y format', t => {
    let samay = Samay.create('d/m/Y', '25/01/2017');
    
    t.is(samay._year, 2017);
    t.is(samay._month, 1);
    t.is(samay._date, 25);
    t.is(samay._hours, 0);
    t.is(samay._minutes, 0);
    t.is(samay._seconds, 0);
    t.is(samay._monthName, 'January');
    t.is(samay._day, 'Wednesday');
    
    let date = new Samay(2017,1,25,9,30,14,0);
    t.is(date.format('d/m/Y'), '25/01/2017');
});

test('Supports m/d/Y format', t => {
    let samay = Samay.create('m/d/Y', '01/25/2017');
    
    t.is(samay._year, 2017);
    t.is(samay._month, 1);
    t.is(samay._date, 25);
    t.is(samay._hours, 0);
    t.is(samay._minutes, 0);
    t.is(samay._seconds, 0);
    t.is(samay._monthName, 'January');
    t.is(samay._day, 'Wednesday');
    
    let date = new Samay(2017,1,25,9,30,14,0);
    t.is(date.format('m/d/Y'), '01/25/2017');
});

test('Supports Y/m/d format', t => {
    let samay = Samay.create('Y/m/d', '2017/01/25');
    
    t.is(samay._year, 2017);
    t.is(samay._month, 1);
    t.is(samay._date, 25);
    t.is(samay._hours, 0);
    t.is(samay._minutes, 0);
    t.is(samay._seconds, 0);
    t.is(samay._monthName, 'January');
    t.is(samay._day, 'Wednesday');
    
    let date = new Samay(2017,1,25,9,30,14,0);
    t.is(date.format('Y/m/d'), '2017/01/25');
});

test('Supports d MM Y format', t => {
    let samay = Samay.create('d MM Y', '25 January 2017');
    
    t.is(samay._year, 2017);
    t.is(samay._month, 1);
    t.is(samay._date, 25);
    t.is(samay._hours, 0);
    t.is(samay._minutes, 0);
    t.is(samay._seconds, 0);
    t.is(samay._monthName, 'January');
    t.is(samay._day, 'Wednesday');
    
    let date = new Samay(2017,1,25,9,30,14,0);
    t.is(date.format('d MM Y'), '25 January 2017');
});

test('Supports d M Y format', t => {
    let samay = Samay.create('d M Y', '25 Jan 2017');
    
    t.is(samay._year, 2017);
    t.is(samay._month, 1);
    t.is(samay._date, 25);
    t.is(samay._hours, 0);
    t.is(samay._minutes, 0);
    t.is(samay._seconds, 0);
    t.is(samay._monthName, 'January');
    t.is(samay._day, 'Wednesday');
    
    let date = new Samay(2017,1,25,9,30,14,0);
    t.is(date.format('d M Y'), '25 Jan 2017');
});

test('Supports MM d Y format', t => {
    let samay = Samay.create('MM d Y', 'January 25 2017');
    
    t.is(samay._year, 2017);
    t.is(samay._month, 1);
    t.is(samay._date, 25);
    t.is(samay._hours, 0);
    t.is(samay._minutes, 0);
    t.is(samay._seconds, 0);
    t.is(samay._monthName, 'January');
    t.is(samay._day, 'Wednesday');
    
    let date = new Samay(2017,1,25,9,30,14,0);
    t.is(date.format('MM d Y'), 'January 25 2017');
});

test('Supports M d Y format', t => {
    let samay = Samay.create('M d Y', 'Jan 25 2017');
    
    t.is(samay._year, 2017);
    t.is(samay._month, 1);
    t.is(samay._date, 25);
    t.is(samay._hours, 0);
    t.is(samay._minutes, 0);
    t.is(samay._seconds, 0);
    t.is(samay._monthName, 'January');
    t.is(samay._day, 'Wednesday');
    
    let date = new Samay(2017,1,25,9,30,14,0);
    t.is(date.format('M d Y'), 'Jan 25 2017');
});

test('Supports Y MM d format', t => {
    let samay = Samay.create('Y MM d', '2017 January 25');
    
    t.is(samay._year, 2017);
    t.is(samay._month, 1);
    t.is(samay._date, 25);
    t.is(samay._hours, 0);
    t.is(samay._minutes, 0);
    t.is(samay._seconds, 0);
    t.is(samay._monthName, 'January');
    t.is(samay._day, 'Wednesday');
    
    let date = new Samay(2017,1,25,9,30,14,0);
    t.is(date.format('Y MM d'), '2017 January 25');
});

test('Supports Y M d format', t => {
    let samay = Samay.create('Y M d', '2017 Jan 25');
    
    t.is(samay._year, 2017);
    t.is(samay._month, 1);
    t.is(samay._date, 25);
    t.is(samay._hours, 0);
    t.is(samay._minutes, 0);
    t.is(samay._seconds, 0);
    t.is(samay._monthName, 'January');
    t.is(samay._day, 'Wednesday');
    
    let date = new Samay(2017,1,25,9,30,14,0);
    t.is(date.format('Y M d'), '2017 Jan 25');
});

test('Supports d-MM-Y format', t => {
    let samay = Samay.create('d-MM-Y', '25-January-2017');
    
    t.is(samay._year, 2017);
    t.is(samay._month, 1);
    t.is(samay._date, 25);
    t.is(samay._hours, 0);
    t.is(samay._minutes, 0);
    t.is(samay._seconds, 0);
    t.is(samay._monthName, 'January');
    t.is(samay._day, 'Wednesday');
    
    let date = new Samay(2017,1,25,9,30,14,0);
    t.is(date.format('d-MM-Y'), '25-January-2017');
});

test('Supports d-M-Y format', t => {
    let samay = Samay.create('d-M-Y', '25-Jan-2017');
    
    t.is(samay._year, 2017);
    t.is(samay._month, 1);
    t.is(samay._date, 25);
    t.is(samay._hours, 0);
    t.is(samay._minutes, 0);
    t.is(samay._seconds, 0);
    t.is(samay._monthName, 'January');
    t.is(samay._day, 'Wednesday');
    
    let date = new Samay(2017,1,25,9,30,14,0);
    t.is(date.format('d-M-Y'), '25-Jan-2017');
});

test('Supports d-m-Y format', t => {
    let samay = Samay.create('d-m-Y', '25-01-2017');
    
    t.is(samay._year, 2017);
    t.is(samay._month, 1);
    t.is(samay._date, 25);
    t.is(samay._hours, 0);
    t.is(samay._minutes, 0);
    t.is(samay._seconds, 0);
    t.is(samay._monthName, 'January');
    t.is(samay._day, 'Wednesday');
    
    let date = new Samay(2017,1,25,9,30,14,0);
    t.is(date.format('d-m-Y'), '25-01-2017');
});

test('Supports m-d-Y format', t => {
    let samay = Samay.create('m-d-Y', '01-25-2017');
    
    t.is(samay._year, 2017);
    t.is(samay._month, 1);
    t.is(samay._date, 25);
    t.is(samay._hours, 0);
    t.is(samay._minutes, 0);
    t.is(samay._seconds, 0);
    t.is(samay._monthName, 'January');
    t.is(samay._day, 'Wednesday');
    
    let date = new Samay(2017,1,25,9,30,14,0);
    t.is(date.format('m-d-Y'), '01-25-2017');
});

test('Supports Y-m-d format', t => {
    let samay = Samay.create('Y-m-d', '2017-01-25');
    
    t.is(samay._year, 2017);
    t.is(samay._month, 1);
    t.is(samay._date, 25);
    t.is(samay._hours, 0);
    t.is(samay._minutes, 0);
    t.is(samay._seconds, 0);
    t.is(samay._monthName, 'January');
    t.is(samay._day, 'Wednesday');
    
    let date = new Samay(2017,1,25,9,30,14,0);
    t.is(date.format('Y-m-d'), '2017-01-25');
});