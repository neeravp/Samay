import Samay from "@/Samay";
import funcViaMixin from "./fixtures/funcViaMixin";
import MixinFactory from "@/utils/MixinFactory";
		// MixinFactory.add(Samay, { get unformattedDate() { return this._date}} );
describe("Configuration Options", () => {

	it("Can configure the day on which the week starts", () => {
		let date = new Samay(2016,1,4,0,0,0);
		expect(Samay._startOfWeek).toBe("Monday");
		expect(date._dayOfWeek).toBe(1);
		expect(date._day).toBe("Monday");

		Samay.startOfWeek = "Sunday";
		let date1 = new Samay(2016,1,4,0,0,0);
		expect(Samay._startOfWeek).toBe("Sunday");
		expect(date1._dayOfWeek).toBe(2);
		expect(date1._day).toBe("Monday");
	})

	it("Can configure the weekly offs", () => {
		expect(Samay._weekOffs).toEqual(["Saturday", "Sunday"]);

		Samay.weekOffs = ["Friday", "Saturday"];
		expect(Samay._weekOffs).not.toEqual(["Saturday", "Sunday"]);
		expect(Samay._weekOffs).toEqual(["Friday", "Saturday"]);
	})

	it("Can have added functionality via mixin", () => {
		expect(Samay.funcViaMixin).toBeUndefined();
		
		Samay.mixin(funcViaMixin);
		let date = new Samay(2019,1,1);
		
		expect(date.funcViaMixin).toBeDefined();
		expect(date.funcViaMixin('John')).toBe("Hello, John")
	})
})