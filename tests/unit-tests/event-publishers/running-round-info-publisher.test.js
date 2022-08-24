import { Core } from "sc-game-base";
import { RunningRoundInfoPublisher } from "../../../src/event-publishers/running-round-info-publisher";

function initPublisher(gameData) {
    return new RunningRoundInfoPublisher("UnbalancedBigSmall1", gameData);
}

describe("RunningRoundInfoPublisher", () => {
    const socketClient = { emit: jest.fn() };
    const gameData = new Core.GameData(0);
    gameData.betCount = { big: 10, small: 10 };
    gameData.realPlayers = {
        1: {
            socketClient,
        },
    };

    describe("publish", () => {
        beforeAll(() => {
            // Arrange
            spyOn(Core.BaseEventPublishers.RunningRoundInfoPublisher.prototype, "publish");
        });
        it("should super.publish", () => {
            //Arrage
            const publisher = initPublisher(gameData);
            // Assert
            publisher.publish();
            expect(Core.BaseEventPublishers.RunningRoundInfoPublisher.prototype.publish).toHaveBeenCalled();
        });
    });

    describe("publishBetPercentage", () => {
        it("should calculate bet percentage correctly", () => {
            //Arrange
            const publisher = initPublisher(gameData);

            //Act
            publisher.publishBetPercentage();

            // Assert
            expect(socketClient.emit).toHaveBeenCalledWith("UnbalancedBigSmall1", { betPercentage: { big: 50, small: 50 } });
        });
    });
});
