import { GameClientDriver, normalUser, eventTypes } from "sc-game-service-integration-utils";
import { socketOptions } from "./stubs/test-data";
import { initUserSession } from "./helpers";

describe("place-bet-successfully", () => {
    let normalUserClientDriver;

    beforeAll(() => {
        normalUserClientDriver = new GameClientDriver(socketOptions, initUserSession(normalUser));
    });

    afterAll(() => {
        normalUserClientDriver.close();
    });

    beforeEach(() => {
        normalUserClientDriver.off(normalUserClientDriver.gameName);
    });

    describe("when user join game", () => {
        it("should receive signed in response", (done) => {
            // Assert

            normalUserClientDriver.once(eventTypes.signedIn, (message) => {
                expect(true).toBe(true);
                done();
            });
        });

        it("should receive game configs when ingame", (done) => {
            // Arrange
            const expectedOdds = { big: 1.96, small: 1.96 };

            // Act
            normalUserClientDriver.sendInGameEvent();

            // Assert
            normalUserClientDriver.handleInGameEvent((inGameData) => {
                if (inGameData?.gameConfigs) {
                    expect(inGameData.gameConfigs.odds).toStrictEqual(expectedOdds);

                    done();
                }
            });
        });

        afterAll(() => {
            normalUserClientDriver.off(normalUserClientDriver.gameName);
        });
    });

    describe("when place bet successful", () => {
        //TODO clean up listener before running tests

        it("should receive endBet with approriate amount", (done) => {
            // Arrange
            const betChoice = "big";
            const amount = 100;

            // Act
            setTimeout(() => {
                normalUserClientDriver.sendBetEvent(betChoice, amount);
            }, 13000);

            // Assert
            normalUserClientDriver.handleEndBetEvent((endBetData) => {
                console.log(`received endBet`);
                console.log(endBetData);

                if (endBetData?.endBet) {
                    expect(endBetData.endBet).toStrictEqual(amount);
                    done();
                }
            });
        });
    });
});
