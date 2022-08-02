import Chance from "chance";

import { generateRawResultForHash, generateResult, getSettlementResult } from "../../../src/helpers";

describe("getSettlementResult", () => {
    const chance = new Chance();

    describe("when total points is 10", () => {
        it.each`
            dices
            ${[1, 3, 6]}
            ${[6, 3, 1]}
            ${[6, 1, 3]}
            ${[1, 6, 3]}
            ${[3, 1, 6]}
            ${[3, 6, 1]}
        `("Settlement result with $dices should be SMALL", ({ dices }) => {
            const expected = {
                big: false,
                small: true,
            };

            //Act
            const result = getSettlementResult(dices);

            //Assert
            expect(result).toStrictEqual(expected);
        });
    });

    describe("when total points is 3", () => {
        it.each`
            dices
            ${[1, 1, 1]}
        `("Settlement result with $dices should be SMALL", ({ dices }) => {
            const expected = {
                big: false,
                small: true,
            };

            //Act
            const result = getSettlementResult(dices);

            //Assert
            expect(result).toStrictEqual(expected);
        });
    });

    describe("when total points is 11", () => {
        it.each`
            dices
            ${[1, 4, 6]}
            ${[6, 4, 1]}
            ${[1, 6, 4]}
            ${[6, 1, 4]}
            ${[4, 1, 6]}
            ${[4, 6, 1]}
        `("Settlement result with $dices should be BIG", ({ dices }) => {
            const expected = {
                big: true,
                small: false,
            };

            //Act
            const result = getSettlementResult(dices);

            //Assert
            expect(result).toStrictEqual(expected);
        });
    });

    describe("when total points is 18", () => {
        it.each`
            dices
            ${[6, 6, 6]}
        `("Settlement result with $dices should be BIG", ({ dices }) => {
            const expected = {
                big: true,
                small: false,
            };

            //Act
            const result = getSettlementResult(dices);

            //Assert
            expect(result).toStrictEqual(expected);
        });
    });

    describe("when total points is in (3,10)", () => {
        // arrange
        const total = chance.integer({ min: 4, max: 9 });

        it.each`
            total
            ${total}
        `("Settlement result with $total points should be SMALL", () => {
            const dice1 = chance.integer({ min: 1, max: Math.min(6, total - 2) });
            const dice2 = chance.integer({ min: 1, max: Math.min(6, total - dice1 - 1) });
            const dice3 = total - dice1 - dice2;
            const roundResult = { dice1, dice2, dice3 };

            const expected = {
                big: false,
                small: true,
            };

            //Act
            const result = getSettlementResult(roundResult);

            //Assert
            expect(result).toStrictEqual(expected);
        });
    });

    describe("when total points is in (11,18)", () => {
        // arrange
        const total = chance.integer({ min: 12, max: 17 });

        it.each`
            total
            ${total}
        `("Settlement result with $total points should be BIG", () => {
            const dice1 = chance.integer({ min: 1, max: 6 });
            const dice2 = chance.integer({ min: 1, max: Math.min(6, total - dice1 - 1) });
            const dice3 = total - dice1 - dice2;
            const roundResult = { dice1, dice2, dice3 };

            const expected = {
                big: true,
                small: false,
            };

            //Act
            const result = getSettlementResult(roundResult);

            //Assert
            expect(result).toStrictEqual(expected);
        });
    });
});

describe("generateResult", () => {
    describe("when not passing mode", () => {
        it("should return enough results", () => {
            // act
            const result = generateResult();

            // assert
            expect(Object.keys(result).length).toBe(3);
            expect(Object.values(result).every((dice) => dice >= 1 && dice <= 6)).toBeTrue();
        });
    });

    describe("when not passing a out of range mode", () => {
        it("should return enough results", () => {
            // act
            const result = generateResult(10);

            // assert
            expect(Object.keys(result).length).toBe(3);
            expect(Object.values(result).every((dice) => dice >= 1 && dice <= 6)).toBeTrue();
        });
    });

    describe("when not passing a valid mode", () => {
        it("should return enough results", () => {
            // act
            const result = generateResult(2);

            // assert
            expect(Object.keys(result).length).toBe(3);
            expect(Object.values(result).every((dice) => dice >= 1 && dice <= 6)).toBeTrue();
        });
    });
});

describe("generateRawResultForHash", () => {
    it("should format result in unicode", () => {
        // Arrange
        const roundResult = { dice1: 1, dice2: 2, dice3: 3 };

        // Act
        const actualResult = generateRawResultForHash(roundResult);

        // Assert
        expect(actualResult).toStrictEqual("{1,2,3}");
    });
});
