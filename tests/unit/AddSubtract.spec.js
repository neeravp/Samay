import Samay from '@/Samay';
describe("Addition Subtraction", () => {

	let samay, clone;
	beforeEach(() => {
	    samay = new Samay(2015,9,5,9,30,14,500);
	    clone = samay.clone();
	})

	it("can add and subtract years", () => {

	    expect(clone._year).toBe(2015)

	    clone.addYears(4);
	    expect(clone._year).toBe(2019)  

	    clone.subtractYears(2);
	    expect(clone._year).toBe(2017)
	})

	it("can add and subtract quarters", () => {

	    expect(clone._month).toBe(9)

	    clone.addQuarters(2);
	    expect(clone._month).toBe(3)
	    expect(clone._year).toBe(2016)

	    clone.subtractQuarters(3);
	    expect(clone._month).toBe(6)
	    expect(clone._year).toBe(2015)	
	})

	it("can add and subtract months", () => {

	    expect(clone._month).toBe(9)

	    clone.addMonths(4);
	    expect(clone._month).toBe(1)
	    expect(clone._year).toBe(2016)	

	    clone.subtractMonths(2);
	    expect(clone._month).toBe(11)
	    expect(clone._year).toBe(2015)	
	})

	it("can add and subtract weeks", () => {

	    expect(clone._date).toBe(5)	

	    clone.addWeeks(3);
	    expect(clone._date).toBe(26)	

	    clone.subtractWeeks(1);
	    expect(clone._date).toBe(samay._date+14)
	})

	it("can add and subtract days", () => {

	    expect(clone._date).toBe(5)

	    clone.addDays(21);
	    expect(clone._date).toBe(26)

	    clone.subtractDays(9);
	    expect(clone._date).toBe(17)
	})

	it("can add and subtract hours", () => {

	    expect(clone._hours).toBe(9)

	    clone.addHours(6);
	    expect(clone._hours).toBe(15)

	    clone.subtractHours(5);
	    expect(clone._hours).toBe(10)
	})

	it("can add and subtract minutes", () => {

	    expect(clone._minutes).toBe(30)

	    clone.addMinutes(15);
	    expect(clone._minutes).toBe(45)

	    clone.subtractMinutes(37);
	    expect(clone._minutes).toBe(8)
	})

	it("can add and subtract seconds", () => {

	    expect(clone._seconds).toBe(14)	

	    clone.addSeconds(30);
	    expect(clone._seconds).toBe(44)

	    clone.subtractSeconds(40);
	    expect(clone._seconds).toBe(4)
	})

	it("can add and subtract milliseconds", () => {

	    expect(clone._milliseconds).toBe(500)

	    clone.addMilliseconds(50);
	    expect(clone._milliseconds).toBe(550)
	    	    
	    clone.subtractMilliseconds(25);
	    expect(clone._milliseconds).toBe(525)
	})
})