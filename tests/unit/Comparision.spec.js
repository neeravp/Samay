import Samay from '@/Samay';

describe("Perform Comparisions", () => {


	it('Can check equality of dates', () => {    
	    let samay = new Samay(2010,5,23,14,23,32,500);
	    let clone = samay.clone();
	    
	    expect(samay.eq(clone)).toBe(true);
	    
	    //Equality in strict mode
	    clone.addMilliseconds(50);
	    expect(samay.eq(clone, true)).toBe(false);
	    //Vs Equality in non-strict mode
	    expect(samay.eq(clone)).toBe(true);
	    
	    clone.addDays(9);
	    expect(samay.eq(clone.addDays(9))).toBe(false);
	});

	it('Can check inequality of dates', () => {    
	    let samay = new Samay(2010,5,23,14,23,32,500);
	    let clone = samay.clone();
	    
	    expect(samay.ne(clone)).toBe(false);
	    clone.addDays(9);
	    expect(samay.ne(clone)).toBe(true);
	});

	it('Can check if given date is less than the date compared against', () => {    
	    let samay = new Samay(2010,5,23,14,23,32,500);
	    let clone = samay.clone();
	    
	    clone.addDays(9);
	    expect(samay.lt(clone)).toBe(true);
	});

	it('Can check if given date is less than or equal to the date compared against', () => {    
	    let samay = new Samay(2010,5,23,14,23,32,500);
	    let clone = samay.clone();
	    
	    clone.addDays(9);
	    expect(samay.lte(clone)).toBe(true);
	});

	it('Can compare two datesCan check if given date is greater than the date compared against', () => {    
	    let samay = new Samay(2010,5,23,14,23,32,500);
	    let clone = samay.clone();
	    
	    clone.subtractDays(10);
	    expect(samay.gt(clone)).toBe(true);
	});

	it('Can compare two datesCan check if given date is greater than or equal to the date compared against', () => {    
	    let samay = new Samay(2010,5,23,14,23,32,500);
	    let clone = samay.clone();
	    
	    clone.subtractDays(10);
	    expect(samay.gte(clone)).toBe(true);
	});

	it('Can determine if the given date falls between two dates', () => {
	    let samay = new Samay(2010,5,23,14,23,32,500);
	    let from = new Samay(2010,5,23,0,0,0,0);
	    let upto = new Samay(2010,5,27,14,23,32,500);
	    
	    //Default check excluding the boundaries i.e. check whether the samay > from and samay < upto
	    expect(samay.between(from, upto)).toBe(false);
	    
	    //Check including the boundaries i.e. check whether the samay >= from and samay <= upto
	    expect(samay.between(from, upto, true)).toBe(true);
	    
	    //Check by comparing the _time property i.e. check whether the samay._time >= from._time and samay._time <= upto._time
	    expect(samay.between(from, upto, null, true)).toBe(true);
	    
	    expect(samay.clone().subtractDays(1).between(from, upto, true)).toBe(false);
	});
})