import {
    roundCeilToDigits,
    roundFloorToDigits,
    roundToDigits,
} from "../helpers";

describe("Test formatters", () => {
    describe("roundCeilToDigits, should round to ceil", () => {
        test("Case 1", () => {
            expect(roundCeilToDigits(10.1234, 2)).toEqual(10.13);
        });
        test("Case 2", () => {
            expect(roundCeilToDigits(1034.000000001, 2)).toEqual(1034.01);
        });
        test("Case 3", () => {
            expect(roundCeilToDigits(0.49999, 2)).toEqual(0.5);
        });
        test("Case 4", () => {
            expect(roundCeilToDigits(0.35555, 2)).toEqual(0.36);
        });
    });

    describe("roundToDigits, should round to closest", () => {
        test("Case 1", () => {
            expect(roundToDigits(10.1234, 2)).toEqual(10.12);
        });
        test("Case 2", () => {
            expect(roundToDigits(1034.000000001, 2)).toEqual(1034);
        });
        test("Case 3", () => {
            expect(roundToDigits(0.49999, 2)).toEqual(0.5);
        });
        test("Case 4", () => {
            expect(roundToDigits(0.35555, 2)).toEqual(0.36);
        });
    });

    describe("roundFloorToDigits, should round to floor", () => {
        test("Case 1", () => {
            expect(roundFloorToDigits(10.1234, 2)).toEqual(10.12);
        });
        test("Case 2", () => {
            expect(roundFloorToDigits(1034.000000001, 2)).toEqual(1034);
        });
        test("Case 3", () => {
            expect(roundFloorToDigits(0.49999, 2)).toEqual(0.49);
        });
        test("Case 4", () => {
            expect(roundFloorToDigits(0.35555, 2)).toEqual(0.35);
        });
    });
});
