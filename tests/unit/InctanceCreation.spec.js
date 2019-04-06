import Samay from '@/Samay';

describe("Instance Creation", () => {
	
	it("Sway now creates a representation of current moment", () => {
	    let samay = Samay.now();
	    
	    let date = new Date();
	    
	    expect(typeof samay).toBe('object');
	    expect(Object.getOwnPropertyNames(samay).length).toBe(12);
	    
	    expect(samay._date).toBe(date.getDate());
	    
	    expect(samay._month-1).toBe(date.getMonth());
	    
	    expect(samay._year).toBe(date.getFullYear());
	    
	    expect(samay._hours).toBe(date.getHours());
	    
	    expect(samay._minutes).toBe(date.getMinutes());
	    
	    expect(samay._tzOffset).toBe(date.getTimezoneOffset());
	})

	it("Can clone an existing instance", () => {
	    let samay = new Samay('2017-01-01 09:30:14');
	    let clone = samay.clone();
	    
	    let props = Object.getOwnPropertyNames(clone);
	    props.forEach(prop => {
	        expect(clone[prop]).toBe(samay[prop]);
	    });
	})
})