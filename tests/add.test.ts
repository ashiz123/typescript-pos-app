import {add} from "../src/opertions/add.js";


describe('test add', () => {
    it('should return the sum', () => {
        expect(add(5,3)).toBe(8);
    });

    it("adds numbers typed as number", () => {
        const a: number = 5;
        const b: number = 10;
        const result: number = add(a, b);
        expect(result).toBe(15);
    });
})