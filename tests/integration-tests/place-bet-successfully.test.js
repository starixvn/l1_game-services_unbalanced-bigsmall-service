import { GameClientDriver, normalUser, eventTypes } from "sc-game-service-integration-utils";
import { socketOptions } from "./stubs/test-data";
import { initUserSession } from "./helpers";

describe("User successfully place a bet", () => {
    const betChoice = "big";
    const oppositeBetChoice = "small";
    const amount = 100;
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

    describe("GIVEN user join game", () => {
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
                    expect(inGameData.roundHistory).toBeArrayOfSize(2);

                    done();
                }
            });
        });
    });

    describe("AND user place a bet", () => {
        it("should receive endBet with approriate amount", async (done) => {
            // Arrange
            await new Promise((r) => setTimeout(r, 13000));

            // Act
            normalUserClientDriver.sendBetEvent(betChoice, amount);

            // Assert
            normalUserClientDriver.handleEndBetEvent((endBetData) => {
                if (endBetData?.endBet) {
                    expect(endBetData.endBet).toStrictEqual(amount);
                    done();
                }
            });
        });

        it("THEN user bet to opposite choice, system should return hedge bet error ", async (done) => {
            // Act
            normalUserClientDriver.sendBetEvent(oppositeBetChoice, amount);

            // Assert
            normalUserClientDriver.handleEndBetEvent((endBetData) => {
                if (endBetData?.endBet) {
                    expect(endBetData.endBet).toEqual(-1);
                    expect(endBetData.betChoice).toEqual("small");
                    expect(endBetData.notice.errorCode).toEqual("SB1939");
                    done();
                }
            });
        });
    });

    describe("THEN the round is end", () => {
        it("user should receive settlement result", async (done) => {
            // Arrange
            await new Promise((r) => setTimeout(r, 20000));

            // Act

            // Assert
            normalUserClientDriver.handleEndGameEvent((endBetData) => {
                console.log(endBetData);
                if (endBetData?.finish) {
                    expect(endBetData.finish.result).not.toBeNull();
                    done();
                }
            });
        }, 40000);
    });

    describe("THEN user able to get bet history", () => {
        it("should receive bet history", async (done) => {
            // Act
            normalUserClientDriver.sendGetHistoryEvent();

            // Assert
            normalUserClientDriver.handleGetHistoryEvent((data) => {
                console.log(data);
                if (data?.history) {
                    expect(data.history.total).toBe(3);
                    expect(data.history.betLogs).toBeArrayOfSize(3);
                    expect(data.history.betLogs.filter((bet) => bet[betChoice] === amount)).toBeArrayOfSize(1);
                    done();
                }
            });
        });
    });
});
