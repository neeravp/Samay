import Samay from "@/Samay";

describe("Formatting options", () => {


	it('Can output string in ISO format', () => {
	    let samay = new Samay(2010,5,16,9,50,37,845);
	    
	    expect(samay.toIsoString()).toBe('2010-05-16T09:50:37.845 GMT+05:30');
	    expect(samay.getIsoDate()).toBe('2010-05-16T09:50:37.845 GMT+05:30');
	    expect(samay.format('ISO')).toBe('2010-05-16T09:50:37.845 GMT+05:30');
	});

	it('Can output string in UTC format', () => {
	    let samay = new Samay(2010,5,16,9,50,37,845);
	    
	    expect(samay.toUtcString()).toBe('2010-05-16T09:50:37.845Z');
	    expect(samay.getUtcDate()).toBe('2010-05-16T09:50:37.845Z');
	    expect(samay.format('UTC')).toBe('2010-05-16T09:50:37.845Z');
	});

	it('Can output string in RSS format', () => {
	    let samay = new Samay(2010,5,16,9,50,37,845);
	    
	    expect(samay.toRssString()).toBe('Sun, 16 May 2010 09:50:37 GMT+05:30');
	    expect(samay.getRssDate()).toBe('Sun, 16 May 2010 09:50:37 GMT+05:30');
	    expect(samay.format('RSS')).toBe('Sun, 16 May 2010 09:50:37 GMT+05:30');
	});

	it('Can output string in Atom format', () => {
	    let samay = new Samay(2010,5,16,9,50,37,845);
	    
	    expect(samay.toAtomString()).toBe('2010-05-16T09:50:37GMT+05:30');
	    expect(samay.getAtomDate()).toBe('2010-05-16T09:50:37GMT+05:30');
	    expect(samay.format('Atom')).toBe('2010-05-16T09:50:37GMT+05:30');
	});

	it('Can output string in Cookie format', () => {
	    let samay = new Samay(2010,5,16,9,50,37,845);
	    
	    expect(samay.toCookieString()).toBe('Sunday, 16-May-2010 09:50:37 GMT+05:30');
	    expect(samay.getCookieDate()).toBe('Sunday, 16-May-2010 09:50:37 GMT+05:30');
	    expect(samay.format('Cookie')).toBe('Sunday, 16-May-2010 09:50:37 GMT+05:30');
	});

	it('Supports Y-m-d H:i:s format', () => {
	    let samay = Samay.create('Y-m-d H:i:s', '2017-01-01 09:30:14');
	    
	    expect(samay._year).toBe(2017);
	    expect(samay._month).toBe(1);
	    expect(samay._date).toBe(1);
	    expect(samay._hours).toBe(9);
	    expect(samay._minutes).toBe(30);
	    expect(samay._seconds).toBe(14);
	    expect(samay._monthName).toBe('January');
	    expect(samay._day).toBe('Sunday');
	    
	    let date = new Samay(2017,1,1,9,30,14,0);
	    expect(date.format('Y-m-d H:i:s')).toBe('2017-01-01 09:30:14');
	});

	it('Supports Y-m-d H:i:s:ms format', () => {
	    let samay = Samay.create('Y-m-d H:i:s:ms', '2017-01-01 09:30:14:950');
	    
	    expect(samay._year).toBe(2017);
	    expect(samay._month).toBe(1);
	    expect(samay._date).toBe(1);
	    expect(samay._hours).toBe(9);
	    expect(samay._minutes).toBe(30);
	    expect(samay._seconds).toBe(14);
	    expect(samay._milliseconds).toBe(950);
	    expect(samay._monthName).toBe('January');
	    expect(samay._day).toBe('Sunday');
	    
	    let date = new Samay(2017,1,1,9,30,14,950);
	    expect(date.format('Y-m-d H:i:s:ms')).toBe('2017-01-01 09:30:14:950');
	});

	it('Supports Y-m-d g:i A format', () => {
	    let samay = Samay.create('Y-m-d g:i A', '2017-01-01 09:30 AM');
	    
	    expect(samay._year).toBe(2017);
	    expect(samay._month).toBe(1);
	    expect(samay._date).toBe(1);
	    expect(samay._hours).toBe(9);
	    expect(samay._minutes).toBe(30);
	    expect(samay._seconds).toBe(0);
	    expect(samay._monthName).toBe('January');
	    expect(samay._day).toBe('Sunday');
	    
	    let date = new Samay(2017,1,1,9,30,14,0);
	    expect(date.format('Y-m-d g:i A')).toBe('2017-01-01 09:30 AM');
	});

	it('Supports Y-m-d g:i:s A format', () => {
	    let samay = Samay.create('Y-m-d g:i:s A', '2017-01-01 09:30:14 AM');
	    
	    expect(samay._year).toBe(2017);
	    expect(samay._month).toBe(1);
	    expect(samay._date).toBe(1);
	    expect(samay._hours).toBe(9);
	    expect(samay._minutes).toBe(30);
	    expect(samay._seconds).toBe(14);
	    expect(samay._monthName).toBe('January');
	    expect(samay._day).toBe('Sunday');
	    
	    let date = new Samay(2017,1,1,9,30,14,0);
	    expect(date.format('Y-m-d g:i:s A')).toBe('2017-01-01 09:30:14 AM');
	});

	it('Supports d/m/Y format', () => {
	    let samay = Samay.create('d/m/Y', '25/01/2017');
	    
	    expect(samay._year).toBe(2017);
	    expect(samay._month).toBe(1);
	    expect(samay._date).toBe(25);
	    expect(samay._hours).toBe(0);
	    expect(samay._minutes).toBe(0);
	    expect(samay._seconds).toBe(0);
	    expect(samay._monthName).toBe('January');
	    expect(samay._day).toBe('Wednesday');
	    
	    let date = new Samay(2017,1,25,9,30,14,0);
	    expect(date.format('d/m/Y')).toBe('25/01/2017');
	});

	it('Supports m/d/Y format', () => {
	    let samay = Samay.create('m/d/Y', '01/25/2017');
	    
	    expect(samay._year).toBe(2017);
	    expect(samay._month).toBe(1);
	    expect(samay._date).toBe(25);
	    expect(samay._hours).toBe(0);
	    expect(samay._minutes).toBe(0);
	    expect(samay._seconds).toBe(0);
	    expect(samay._monthName).toBe('January');
	    expect(samay._day).toBe('Wednesday');
	    
	    let date = new Samay(2017,1,25,9,30,14,0);
	    expect(date.format('m/d/Y')).toBe('01/25/2017');
	});

	it('Supports Y/m/d format', () => {
	    let samay = Samay.create('Y/m/d', '2017/01/25');
	    
	    expect(samay._year).toBe(2017);
	    expect(samay._month).toBe(1);
	    expect(samay._date).toBe(25);
	    expect(samay._hours).toBe(0);
	    expect(samay._minutes).toBe(0);
	    expect(samay._seconds).toBe(0);
	    expect(samay._monthName).toBe('January');
	    expect(samay._day).toBe('Wednesday');
	    
	    let date = new Samay(2017,1,25,9,30,14,0);
	    expect(date.format('Y/m/d')).toBe('2017/01/25');
	});

	it('Supports d MM Y format', () => {
	    let samay = Samay.create('d MM Y', '25 January 2017');
	    
	    expect(samay._year).toBe(2017);
	    expect(samay._month).toBe(1);
	    expect(samay._date).toBe(25);
	    expect(samay._hours).toBe(0);
	    expect(samay._minutes).toBe(0);
	    expect(samay._seconds).toBe(0);
	    expect(samay._monthName).toBe('January');
	    expect(samay._day).toBe('Wednesday');
	    
	    let date = new Samay(2017,1,25,9,30,14,0);
	    expect(date.format('d MM Y')).toBe('25 January 2017');
	});

	it('Supports d M Y format', () => {
	    let samay = Samay.create('d M Y', '25 Jan 2017');
	    
	    expect(samay._year).toBe(2017);
	    expect(samay._month).toBe(1);
	    expect(samay._date).toBe(25);
	    expect(samay._hours).toBe(0);
	    expect(samay._minutes).toBe(0);
	    expect(samay._seconds).toBe(0);
	    expect(samay._monthName).toBe('January');
	    expect(samay._day).toBe('Wednesday');
	    
	    let date = new Samay(2017,1,25,9,30,14,0);
	    expect(date.format('d M Y')).toBe('25 Jan 2017');
	});

	it('Supports MM d Y format', () => {
	    let samay = Samay.create('MM d Y', 'January 25 2017');
	    
	    expect(samay._year).toBe(2017);
	    expect(samay._month).toBe(1);
	    expect(samay._date).toBe(25);
	    expect(samay._hours).toBe(0);
	    expect(samay._minutes).toBe(0);
	    expect(samay._seconds).toBe(0);
	    expect(samay._monthName).toBe('January');
	    expect(samay._day).toBe('Wednesday');
	    
	    let date = new Samay(2017,1,25,9,30,14,0);
	    expect(date.format('MM d Y')).toBe('January 25 2017');
	});

	it('Supports M d Y format', () => {
	    let samay = Samay.create('M d Y', 'Jan 25 2017');
	    
	    expect(samay._year).toBe(2017);
	    expect(samay._month).toBe(1);
	    expect(samay._date).toBe(25);
	    expect(samay._hours).toBe(0);
	    expect(samay._minutes).toBe(0);
	    expect(samay._seconds).toBe(0);
	    expect(samay._monthName).toBe('January');
	    expect(samay._day).toBe('Wednesday');
	    
	    let date = new Samay(2017,1,25,9,30,14,0);
	    expect(date.format('M d Y')).toBe('Jan 25 2017');
	});

	it('Supports Y MM d format', () => {
	    let samay = Samay.create('Y MM d', '2017 January 25');
	    
	    expect(samay._year).toBe(2017);
	    expect(samay._month).toBe(1);
	    expect(samay._date).toBe(25);
	    expect(samay._hours).toBe(0);
	    expect(samay._minutes).toBe(0);
	    expect(samay._seconds).toBe(0);
	    expect(samay._monthName).toBe('January');
	    expect(samay._day).toBe('Wednesday');
	    
	    let date = new Samay(2017,1,25,9,30,14,0);
	    expect(date.format('Y MM d')).toBe('2017 January 25');
	});

	it('Supports Y M d format', () => {
	    let samay = Samay.create('Y M d', '2017 Jan 25');
	    
	    expect(samay._year).toBe(2017);
	    expect(samay._month).toBe(1);
	    expect(samay._date).toBe(25);
	    expect(samay._hours).toBe(0);
	    expect(samay._minutes).toBe(0);
	    expect(samay._seconds).toBe(0);
	    expect(samay._monthName).toBe('January');
	    expect(samay._day).toBe('Wednesday');
	    
	    let date = new Samay(2017,1,25,9,30,14,0);
	    expect(date.format('Y M d')).toBe('2017 Jan 25');
	});

	it('Supports d-MM-Y format', () => {
	    let samay = Samay.create('d-MM-Y', '25-January-2017');
	    
	    expect(samay._year).toBe(2017);
	    expect(samay._month).toBe(1);
	    expect(samay._date).toBe(25);
	    expect(samay._hours).toBe(0);
	    expect(samay._minutes).toBe(0);
	    expect(samay._seconds).toBe(0);
	    expect(samay._monthName).toBe('January');
	    expect(samay._day).toBe('Wednesday');
	    
	    let date = new Samay(2017,1,25,9,30,14,0);
	    expect(date.format('d-MM-Y')).toBe('25-January-2017');
	});

	it('Supports d-M-Y format', () => {
	    let samay = Samay.create('d-M-Y', '25-Jan-2017');
	    
	    expect(samay._year).toBe(2017);
	    expect(samay._month).toBe(1);
	    expect(samay._date).toBe(25);
	    expect(samay._hours).toBe(0);
	    expect(samay._minutes).toBe(0);
	    expect(samay._seconds).toBe(0);
	    expect(samay._monthName).toBe('January');
	    expect(samay._day).toBe('Wednesday');
	    
	    let date = new Samay(2017,1,25,9,30,14,0);
	    expect(date.format('d-M-Y')).toBe('25-Jan-2017');
	});

	it('Supports d-m-Y format', () => {
	    let samay = Samay.create('d-m-Y', '25-01-2017');
	    
	    expect(samay._year).toBe(2017);
	    expect(samay._month).toBe(1);
	    expect(samay._date).toBe(25);
	    expect(samay._hours).toBe(0);
	    expect(samay._minutes).toBe(0);
	    expect(samay._seconds).toBe(0);
	    expect(samay._monthName).toBe('January');
	    expect(samay._day).toBe('Wednesday');
	    
	    let date = new Samay(2017,1,25,9,30,14,0);
	    expect(date.format('d-m-Y')).toBe('25-01-2017');
	});

	it('Supports m-d-Y format', () => {
	    let samay = Samay.create('m-d-Y', '01-25-2017');
	    
	    expect(samay._year).toBe(2017);
	    expect(samay._month).toBe(1);
	    expect(samay._date).toBe(25);
	    expect(samay._hours).toBe(0);
	    expect(samay._minutes).toBe(0);
	    expect(samay._seconds).toBe(0);
	    expect(samay._monthName).toBe('January');
	    expect(samay._day).toBe('Wednesday');
	    
	    let date = new Samay(2017,1,25,9,30,14,0);
	    expect(date.format('m-d-Y')).toBe('01-25-2017');
	});

	it('Supports Y-m-d format', () => {
	    let samay = Samay.create('Y-m-d', '2017-01-25');
	    
	    expect(samay._year).toBe(2017);
	    expect(samay._month).toBe(1);
	    expect(samay._date).toBe(25);
	    expect(samay._hours).toBe(0);
	    expect(samay._minutes).toBe(0);
	    expect(samay._seconds).toBe(0);
	    expect(samay._monthName).toBe('January');
	    expect(samay._day).toBe('Wednesday');
	    
	    let date = new Samay(2017,1,25,9,30,14,0);
	    expect(date.format('Y-m-d')).toBe('2017-01-25');
	});
})