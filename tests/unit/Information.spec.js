import Samay from '@/Samay';

describe("Informative Features", () => {

	it("Can dettermine the day of year represented by the current instance", () => {
		let date = new Samay(2016,6,23,0,0,0);

		expect(date.dayOfYear()).toBe(175);
	});

	it("Can determine the week of year represented by the current instance", () => {

	    let samay = new Samay(2011,7,4,0,0,0,0);
	    
	    let days = samay.dayOfYear();
	    let weekNumber = Math.ceil(days/7);
	    expect(samay.weekOfYear()).toBe(weekNumber);
	});

	it("Can determine the week of month to which the current instance representation belongs", () => {
	    let samay = new Samay(2003,9,18,0,0,0,0);
	    
	    let weekNumber = Math.ceil(samay._date/7);
	    expect(samay.weekOfMonth()).toBe(weekNumber);
	});

	it("Can determine the total weeks in the month represented by the current instance", () => {
	    let samay = new Samay(2010,11,17,0,0,0,0);
	    
	    expect(samay.weeksInMonth()).toBe(5);
	});

	it("Can calculate the number of days in the month represented by the current instance", () => {
	    let samay = new Samay(2004,2,14,0,0,0,0);
	    let clone = samay.clone().addMonths(5);
	    
	    expect(samay.daysInMonth()).toBe(29);
	    expect(clone.daysInMonth()).toBe(31);    
	});

	it("Can determine the quarter number to which the current instance belongs", () => {
	    let samay = new Samay(2008,5,29,0,0,0,0);
	    
	    expect(samay.quarterOfYear()).toBe(2);
	})
})