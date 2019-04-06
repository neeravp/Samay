import Samay from '@/Samay';

describe("Difference Calculations", () => {

	it("Can calculate the difference in seconds", () => {
		let date = new Samay(2010,5,23,14,23,32,500);
		let clone = date.clone()
		clone.addSeconds(17);

		expect(date.diffInSeconds(clone)).toBe(-17);
	})

	it("Can calculate the difference in minutes", () => {
	    let samay = new Samay(2010,5,23,14,23,32,500);
	    let clone = samay.clone();
	    
	    clone.addMinutes(9);
	    expect(samay.diffInMinutes(clone)).toBe(-9);
	})

	it("Can calculate the difference in hours", () => {
	    let samay = new Samay(2010,5,23,14,23,32,500);
	    let clone = samay.clone();
	    
	    clone.subtractHours(9);
	    expect(samay.diffInHours(clone)).toBe(9);
	})

	it("Can calculate the difference in days", () => {
	    let samay = new Samay(2010,5,23,14,23,32,500);
	    let clone = samay.clone();
	    
	    clone.addDays(7);
	    expect(samay.diffInDays(clone)).toBe(-7);
	})

	it("Can calculate the difference in weeks", () => {
	    let samay = new Samay(2010,5,23,14,23,32,500);
	    let clone = samay.clone();
	    
	    clone.subtractWeeks(1);
	    expect(samay.diffInWeeks(clone)).toBe(1);
	})

	it("Can calculate the difference in months", () => {
	    let samay = new Samay(2010,5,23,14,23,32,500);
	    let clone = samay.clone().addMonths(-5);
	    
	    expect(samay.diffInMonths(clone)).toBe(5);
	})

	it("Can calculate the difference in quarters", () => {
	    let samay = new Samay(2010,5,23,14,23,32,500);
	    let clone = samay.clone().addQuarters(1);
	  
	    expect(samay.diffInQuarters(clone)).toBe(-1);
	})

	it("Can calculate difference in years", () => {
	    let samay = new Samay(2010,5,23,14,23,32,500);
	    let clone = samay.clone();
	    
	    clone.addYears(15);
	    expect(samay.diffInYears(clone)).toBe(-15);
	})

	it("Can calculate the difference in human readable string", () => {
	    let samay = new Samay(2010,5,23,14,23,32,500);
	    let clone = samay.clone();
	    
	    clone.addDays(5);
	    expect(samay.diffForHumans(clone)).toBe('5 days before');
	    
	    clone.addDays(3);
	    expect(samay.diffForHumans(clone)).toBe('1 week before');
	    
	})
})