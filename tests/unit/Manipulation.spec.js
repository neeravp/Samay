import Samay from '@/Samay';

/*
 |----------------------------------------------------------------------------------------------------
 |                  year
 |----------------------------------------------------------------------------------------------------
 */
describe("Year Manipulations on Instance", () => {

	it("Can reset to identical time on the first day of the year", () => {
	    let samay = new Samay(2005,3,14,16,30,30,500);
	    let clone = samay.clone();
	    
	    clone.startOfYear();
	    expect(clone._hours).toBe(samay._hours);
	    expect(clone._minutes).toBe(samay._minutes);
	    expect(clone._seconds).toBe(samay._seconds);
	    expect(clone._milliseconds).toBe(samay._milliseconds);
	    expect(clone._date).toBe(1);
	    expect(clone._month).toBe(1);
	    expect(clone._year).toBe(samay._year);
	})

	it("Can reset to identical time on the last day of the year", () => {
	    let samay = new Samay(2005,3,21,16,30,30,500);
	    let clone = samay.clone();
	    
	    clone.endOfYear();
	    expect(clone._hours).toBe(samay._hours);
	    expect(clone._minutes).toBe(samay._minutes);
	    expect(clone._seconds).toBe(samay._seconds);
	    expect(clone._milliseconds).toBe(samay._milliseconds);
	    expect(clone._date).toBe(31);
	    expect(clone._month).toBe(12);
	    expect(clone._year).toBe(samay._year);
	})

	it("Can reset to identical time and date in previous year", () => {
	    let samay = new Samay(2007,7,16,1,20,15,0);
	    let clone = samay.clone();
	    
	    clone.previousYear();
	    
	    expect(clone._date).toBe(samay._date);
	    expect(clone._month).toBe(samay._month);
	    expect(clone._year).toBe(samay._year-1);
	    expect(clone._hours).toBe(samay._hours);
	    expect(clone._minutes).toBe(samay._minutes);
	    expect(clone._seconds).toBe(samay._seconds);
	})

	it("Can reset to identical time and date in the next year", () => {
	    let samay = new Samay(2007,7,16,1,20,15,0);
	    let clone = samay.clone();
	    
	    clone.nextYear();
	    
	    expect(clone._date).toBe(samay._date);
	    expect(clone._month).toBe(samay._month);
	    expect(clone._year).toBe(samay._year+1);
	    expect(clone._hours).toBe(samay._hours);
	    expect(clone._minutes).toBe(samay._minutes);
	    expect(clone._seconds).toBe(samay._seconds);
	})

	it("Can reset to identical time and date in year before n years", () => {
	    let samay = new Samay(2007,7,16,1,20,15,0);
	    let clone = samay.clone();
	    
	    clone.yearBefore(2);
	    
	    expect(clone._date).toBe(samay._date);
	    expect(clone._month).toBe(samay._month);
	    expect(clone._year).toBe(samay._year-2);
	    expect(clone._hours).toBe(samay._hours);
	    expect(clone._minutes).toBe(samay._minutes);
	    expect(clone._seconds).toBe(samay._seconds);
	})

	it("Can reset to identical time and date in the year after n years", () => {
	    let samay = new Samay(2007,7,16,1,20,15,0);
	    let clone = samay.clone();
	    
	    clone.yearAfter(12);
	    
	    expect(clone._date).toBe(samay._date);
	    expect(clone._month).toBe(samay._month);
	    expect(clone._year).toBe(samay._year+12);
	    expect(clone._hours).toBe(samay._hours);
	    expect(clone._minutes).toBe(samay._minutes);
	    expect(clone._seconds).toBe(samay._seconds);
	})

	it("Can reset to identical time on the first occurence of the dayname represented by the day in the year", () => {
	    let samay = new Samay(2017,8,20,0,0,0,0);
	    let clone = samay.clone();
	    
	    clone.firstOfYear();
	    expect(clone._date).toBe(1);
	    expect(clone._month).toBe(1);
	    expect(clone._year).toBe(samay._year);
	})

	it("Can reset to the identical time on the last occurence of the dayname represented by the day in the year", () => {
	    let samay = new Samay(2017,1,10,0,0,0,0);
	    let clone = samay.clone();    
	    
	    clone.lastOfYear();
	    expect(clone._date).toBe(26);
	    expect(clone._month).toBe(12);
	    expect(clone._year).toBe(samay._year);
	})

	it("Can reset to the identical time on the first occurence of the specified day in the year", () => {
	    let samay = new Samay(2017,2,10,0,0,0,0);
	    let clone = samay.clone();
	    
	    clone.firstOfYear('Thursday');
	    expect(clone._date).toBe(5);
	    expect(clone._month).toBe(1);
	    expect(clone._year).toBe(samay._year);
	})

	it("Can reset to the identical time on the last occurence of the specified day in the year", () => {
	    let samay = new Samay(2017,4,14,0,0,0,0);
	    let clone = samay.clone();
	    
	    clone.lastOfYear('Monday');
	    expect(clone._date).toBe(25);
	    expect(clone._month).toBe(12);
	    expect(clone._year).toBe(samay._year);
	})

	it("Can reset to the identical time on the nth occurence of the specified day in the year", () => {
	    let samay = new Samay(2017,2,10,0,0,0,0);
	    let clone = samay.clone();
	    
	    clone.nthOfYear(18, 'Wednesday');
	    expect(clone._date).toBe(3);
	    expect(clone._month).toBe(5);
	    expect(clone._year).toBe(samay._year);
	})

});

/*
 |----------------------------------------------------------------------------------------------------
 |                  quarter
 |----------------------------------------------------------------------------------------------------
 */
describe("Quarter Manipulations on Instance", () => {

	it("Can reset to identical time on the first day of the quarter", () => {
	    let samay = new Samay(2005,3,14,16,30,30,500);
	    let clone = samay.clone();
	    
	    clone.startOfQuarter();
	    expect(clone._hours).toBe(samay._hours);
	    expect(clone._minutes).toBe(samay._minutes);
	    expect(clone._seconds).toBe(samay._seconds);
	    expect(clone._milliseconds).toBe(samay._milliseconds);
	    expect(clone._date).toBe(1);
	    expect(clone._month).toBe(1);
	    expect(clone._year).toBe(samay._year);
	})

	it("Can reset to identical time on the last day of the quarter", () => {
	    let samay = new Samay(2005,3,21,16,30,30,500);
	    let clone = samay.clone();
	    
	    clone.endOfQuarter();
	    expect(clone._hours).toBe(samay._hours);
	    expect(clone._minutes).toBe(samay._minutes);
	    expect(clone._seconds).toBe(samay._seconds);
	    expect(clone._milliseconds).toBe(samay._milliseconds);
	    expect(clone._date).toBe(31);
	    expect(clone._month).toBe(3);
	    expect(clone._year).toBe(samay._year);
	})

	it("Can reset to identical time and date in the previous quarter", () => {
	    let samay = new Samay(2007,7,16,1,20,15,0);
	    let clone = samay.clone();
	    
	    clone.previousQuarter();
	    
	    expect(clone._date).toBe(samay._date);
	    expect(clone._month).toBe(samay._month-3);
	    expect(clone._year).toBe(samay._year);
	    expect(clone._hours).toBe(samay._hours);
	    expect(clone._minutes).toBe(samay._minutes);
	    expect(clone._seconds).toBe(samay._seconds);
	})

	it("Can reset to identical time and date in the next quarter", () => {
	    let samay = new Samay(2007,7,16,1,20,15,0);
	    let clone = samay.clone();
	    
	    clone.nextQuarter();
	    
	    expect(clone._date).toBe(samay._date);
	    expect(clone._month).toBe(samay._month+3);
	    expect(clone._year).toBe(samay._year);
	    expect(clone._hours).toBe(samay._hours);
	    expect(clone._minutes).toBe(samay._minutes);
	    expect(clone._seconds).toBe(samay._seconds);
	})

	it("Can reset to identical time and date in quarter before n quarters", () => {
    	let samay = new Samay(2007,7,16,1,20,15,0);
	    let clone = samay.clone();
	    
	    clone.quarterBefore(2);
	    
	    expect(clone._date).toBe(samay._date);
	    expect(clone._month).toBe(samay._month-6);
	    expect(clone._year).toBe(samay._year);
	    expect(clone._hours).toBe(samay._hours);
	    expect(clone._minutes).toBe(samay._minutes);
	    expect(clone._seconds).toBe(samay._seconds);
	})

	it("Can reset to identical time and date in quarter after n quarters", () => {
	    let samay = new Samay(2007,7,16,1,20,15,0);
	    let clone = samay.clone();
	    
	    clone.quarterAfter(7);
	    
	    expect(clone._date).toBe(samay._date);
	    expect(clone._month).toBe(samay._month-3);
	    expect(clone._year).toBe(samay._year+2);
	    expect(clone._hours).toBe(samay._hours);
	    expect(clone._minutes).toBe(samay._minutes);
	    expect(clone._seconds).toBe(samay._seconds);
	})

	it("Can reset to the identical time on the first occurence of the day in the quarter", () => {
	    let samay = new Samay(2017,2,10,0,0,0,0);
	    let clone = samay.clone();
	    
	    clone.firstOfQuarter();
	    expect(clone._date).toBe(6);
	    expect(clone._month).toBe(1);
	    expect(clone._year).toBe(samay._year);
	})

	it("Can reset to the identical time on the last occurence of the day in the quarter", () => {
	    let samay = new Samay(2017,2,10,0,0,0,0);
	    let clone = samay.clone();
	    
	    clone.lastOfQuarter();
	    expect(clone._date).toBe(31);
	    expect(clone._month).toBe(3);
	    expect(clone._year).toBe(samay._year);
	})

	it("Can reset to the identical time on the first occurence of the specified day in the quarter", () => {
	    let samay = new Samay(2017,2,10,0,0,0,0);
	    let clone = samay.clone();
	    
	    clone.firstOfQuarter('Thursday');
	    expect(clone._date).toBe(5);
	    expect(clone._month).toBe(1);
	    expect(clone._year).toBe(samay._year);
	})

	it("Can reset to the identical time on the last occurence of the specified day in the quarter", () => {
	    let samay = new Samay(2017,2,10,0,0,0,0);
	    let clone = samay.clone();
	    
	    clone.lastOfQuarter('Monday');
	    expect(clone._date).toBe(27);
	    expect(clone._month).toBe(3);
	    expect(clone._year).toBe(samay._year);
	})

	it("Can reset to the identical time on the nth occurence of the day in the quarter", () => {
	    let samay = new Samay(2017,2,10,0,0,0,0);
	    let clone = samay.clone();
	    
	    clone.nthOfQuarter(8, 'Wednesday');
	    expect(clone._date).toBe(22);
	    expect(clone._month).toBe(2);
	    expect(clone._year).toBe(samay._year);
	})

});


/*
 |----------------------------------------------------------------------------------------------------
 |                  month
 |----------------------------------------------------------------------------------------------------
 */
describe("Month Manipulations on Instance", () => {

	it("Can reset to identical time on the first occurence of the day name in the month", () => {
	    let samay = new Samay(2017,2,10,0,0,0,0);
	    let clone = samay.clone();
	    
	    clone.firstOfMonth();
	    expect(clone._date).toBe(3);
	    expect(clone._month).toBe(samay._month);
	    expect(clone._year).toBe(samay._year);
	})

	it("Can reset to identical time on the last occurence of the day name in the month", () => {
	    let samay = new Samay(2017,2,10,0,0,0,0);
	    let clone = samay.clone();
	    
	    clone.lastOfMonth();
	    expect(clone._date).toBe(24);
	    expect(clone._month).toBe(samay._month);
	    expect(clone._year).toBe(samay._year);
	})

	it("Can reset to identical time on the first occurence of the specified day name in the month", () => {
	    let samay = new Samay(2017,2,10,0,0,0,0);
	    let clone = samay.clone();
	    
	    clone.firstOfMonth('Thursday');
	    expect(clone._date).toBe(2);
	    expect(clone._month).toBe(samay._month);
	    expect(clone._year).toBe(samay._year);
	})

	it("Can reset to identical time on the last occurence of the specified day name in the month", () => {
	    let samay = new Samay(2017,2,10,0,0,0,0);
	    let clone = samay.clone();
	    
	    clone.lastOfMonth('Monday');
	    expect(clone._date).toBe(27);
	    expect(clone._month).toBe(samay._month);
	    expect(clone._year).toBe(samay._year);
	})

	it("Can be reset to identical time on the first day of the month", () => {
	    let samay = new Samay(2005,3,14,16,30,30,500);
	    let clone = samay.clone();
	    
	    clone.startOfMonth();
	    expect(clone._hours).toBe(samay._hours);
	    expect(clone._minutes).toBe(samay._minutes);
	    expect(clone._seconds).toBe(samay._seconds);
	    expect(clone._milliseconds).toBe(samay._milliseconds);
	    expect(clone._date).toBe(1);
	    expect(clone._month).toBe(samay._month);
	    expect(clone._year).toBe(samay._year);
	})

	it("Can be reset to identical time on the last day of the month", () => {
	    let samay = new Samay(2005,3,21,16,30,30,500);
	    let clone = samay.clone();
	    
	    clone.endOfMonth();
	    expect(clone._hours).toBe(samay._hours);
	    expect(clone._minutes).toBe(samay._minutes);
	    expect(clone._seconds).toBe(samay._seconds);
	    expect(clone._milliseconds).toBe(samay._milliseconds);
	    expect(clone._date).toBe(31);
	    expect(clone._month).toBe(samay._month);
	    expect(clone._year).toBe(samay._year);
	})

	it("Can be reset to identical time in the previous month", () => {
	    let samay = new Samay(2007,7,16,1,20,15,0);
	    let clone = samay.clone();
	    
	    clone.previousMonth();
	    
	    expect(clone._date).toBe(samay._date);
	    expect(clone._month).toBe(samay._month-1);
	    expect(clone._year).toBe(samay._year);
	    expect(clone._hours).toBe(samay._hours);
	    expect(clone._minutes).toBe(samay._minutes);
	    expect(clone._seconds).toBe(samay._seconds);
	})

	it("Can be reset to identical time in the next month", () => {
	    let samay = new Samay(2007,2,28,1,20,15,0);
	    let clone = samay.clone();
	    
	    clone.nextMonth();
	    
	    expect(clone._date).toBe(31);
	    expect(clone._month).toBe(samay._month+1);
	    expect(clone._year).toBe(samay._year);
	    expect(clone._hours).toBe(samay._hours);
	    expect(clone._minutes).toBe(samay._minutes);
	    expect(clone._seconds).toBe(samay._seconds);
	})

	it("Can be reset to identical time in month before n months", () => {
	    let samay = new Samay(2007,7,16,1,20,15,0);
	    let clone = samay.clone();
	    
	    clone.monthBefore(3);
	    
	    expect(clone._date).toBe(samay._date);
	    expect(clone._month).toBe(samay._month-3);
	    expect(clone._year).toBe(samay._year);
	    expect(clone._hours).toBe(samay._hours);
	    expect(clone._minutes).toBe(samay._minutes);
	    expect(clone._seconds).toBe(samay._seconds);
	})

	it("Can be reset to identical time in month after n months", () => {
	    let samay = new Samay(2007,7,16,1,20,15,0);
	    let clone = samay.clone();
	    
	    clone.monthAfter(10);
	    
	    expect(clone._date).toBe(samay._date);
	    expect(clone._month).toBe(5);
	    expect(clone._year).toBe(samay._year+1);
	    expect(clone._hours).toBe(samay._hours);
	    expect(clone._minutes).toBe(samay._minutes);
	    expect(clone._seconds).toBe(samay._seconds);
	})
});

/*
 |----------------------------------------------------------------------------------------------------
 |                  week
 |----------------------------------------------------------------------------------------------------
 */
describe("Week Manipulations on Instance", () => {

	it("Can be reset to the identical time on first day of the week", () => {
	    let samay = new Samay(2005,3,31,16,30,30,500);
	    let clone = samay.clone();
	    
	    clone.startOfWeek();
	    expect(clone._hours).toBe(samay._hours);
	    expect(clone._minutes).toBe(samay._minutes);
	    expect(clone._seconds).toBe(samay._seconds);
	    expect(clone._milliseconds).toBe(samay._milliseconds);
	    expect(clone._date).toBe(28);
	    expect(clone._month).toBe(samay._month);
	    expect(clone._year).toBe(samay._year);
	})

	it("Can be reset to the identical time last day of week", () => {
	    let samay = new Samay(2005,3,31,16,30,30,500);
	    let clone = samay.clone();
	    
	    clone.endOfWeek();
	    expect(clone._hours).toBe(samay._hours);
	    expect(clone._minutes).toBe(samay._minutes);
	    expect(clone._seconds).toBe(samay._seconds);
	    expect(clone._milliseconds).toBe(samay._milliseconds);
	    expect(clone._date).toBe(3);
	    expect(clone._month).toBe(4);
	    expect(clone._year).toBe(samay._year);
	})

	it("Can be reset to the identical time in the previous week", () => {
	    let samay = new Samay(2007,7,16,1,20,15,0);
	    let clone = samay.clone();
	    
	    clone.previousWeek();
	    
	    expect(clone._date).toBe(samay._date-7);
	    expect(clone._month).toBe(samay._month);
	    expect(clone._year).toBe(samay._year);
	    expect(clone._hours).toBe(samay._hours);
	    expect(clone._minutes).toBe(samay._minutes);
	    expect(clone._seconds).toBe(samay._seconds);
	})

	it("Can be reset to the identical time in the next week", () => {
	    let samay = new Samay(2007,7,16,1,20,15,0);
	    let clone = samay.clone();
	    
	    clone.nextWeek();
	    
	    expect(clone._date).toBe(samay._date+7);
	    expect(clone._month).toBe(samay._month);
	    expect(clone._year).toBe(samay._year);
	    expect(clone._hours).toBe(samay._hours);
	    expect(clone._minutes).toBe(samay._minutes);
	    expect(clone._seconds).toBe(samay._seconds);
	})

	it("Can be reset to identical time in week before n weeks", () => {
	    let samay = new Samay(2007,7,16,1,20,15,0);
	    let clone = samay.clone();
	    
	    clone.weekBefore(5);
	    
	    expect(clone._date).toBe(11);
	    expect(clone._month).toBe(6);
	    expect(clone._year).toBe(samay._year);
	    expect(clone._hours).toBe(samay._hours);
	    expect(clone._minutes).toBe(samay._minutes);
	    expect(clone._seconds).toBe(samay._seconds);
	})

	it("Can be reset to identical time in week after n weeks", () => {
	    let samay = new Samay(2007,7,16,1,20,15,0);
	    let clone = samay.clone();
	    
	    clone.weekAfter(2);
	    
	    expect(clone._date).toBe(30);
	    expect(clone._month).toBe(samay._month);
	    expect(clone._year).toBe(samay._year);
	    expect(clone._hours).toBe(samay._hours);
	    expect(clone._minutes).toBe(samay._minutes);
	    expect(clone._seconds).toBe(samay._seconds);
	})
});

/*
 |----------------------------------------------------------------------------------------------------
 |                  day
 |----------------------------------------------------------------------------------------------------
 */
describe("Day Manipulations on Instance", () => {

	it("Can be reset to the start of the day", () => {
	    let samay = new Samay(2005,3,31,16,30,30,500);
	    let clone = samay.clone();
	    
	    clone.startOfDay();
	    expect(clone._hours).toBe(0);
	    expect(clone._minutes).toBe(0);
	    expect(clone._seconds).toBe(0);
	    expect(clone._milliseconds).toBe(1);
	    expect(clone._date).toBe(samay._date);
	    expect(clone._month).toBe(samay._month);
	    expect(clone._year).toBe(samay._year);
	})

	it("Can be reset to the end of the day", () => {
	    let samay = new Samay(2005,3,31,16,30,30,500);
	    let clone = samay.clone();
	    
	    clone.endOfDay();
	    expect(clone._hours).toBe(23);
	    expect(clone._minutes).toBe(59);
	    expect(clone._seconds).toBe(59);
	    expect(clone._milliseconds).toBe(999);
	    expect(clone._date).toBe(samay._date);
	    expect(clone._month).toBe(samay._month);
	    expect(clone._year).toBe(samay._year);
	})

	it("Can be reset to an identical time of the previous day", () => {
	    let samay = new Samay(2007,7,16,1,20,15,0);
	    let clone = samay.clone();
	    
	    clone.previousDay();
	    
	    expect(clone._date).toBe(samay._date-1);
	    expect(clone._month).toBe(samay._month);
	    expect(clone._year).toBe(samay._year);
	    expect(clone._hours).toBe(samay._hours);
	    expect(clone._minutes).toBe(samay._minutes);
	    expect(clone._seconds).toBe(samay._seconds);
	})

	it("Can be reset to an identical time of the next day", () => {
	    let samay = new Samay(2007,7,16,1,20,15,0);
	    let clone = samay.clone();
	    
	    clone.nextDay();
	    
	    expect(clone._date).toBe(samay._date+1);
	    expect(clone._month).toBe(samay._month);
	    expect(clone._year).toBe(samay._year);
	    expect(clone._hours).toBe(samay._hours);
	    expect(clone._minutes).toBe(samay._minutes);
	    expect(clone._seconds).toBe(samay._seconds);
	})
});