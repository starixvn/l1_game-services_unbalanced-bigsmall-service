import { Core } from "sc-game-base";
import { RunningRoundInfoPublisher } from "../../../src/event-publishers/running-round-info-publisher";

describe("RunningRoundInfoPublisher", () => {
    const gameData = new Core.GameData(0);
    gameData.betCount = { odd: 10, even: 10 };
    const publisher = new RunningRoundInfoPublisher("game name", gameData);

    beforeAll(() => {
        // Arrange
        spyOn(Core.BaseEventPublishers.RunningRoundInfoPublisher.prototype, "publish");
    });

    it("should inherit Core.BaseEventPublishers.RunningRoundInfoPublisher", () => {
        expect(publisher instanceof Core.BaseEventPublishers.RunningRoundInfoPublisher).toBeTruthy();
    });

    describe("publish", () => {
        beforeAll(() => {
            // Act
            publisher.publish();
        });

        it("should super.publish", () => {
            // Assert
            expect(Core.BaseEventPublishers.RunningRoundInfoPublisher.prototype.publish).toHaveBeenCalled();
        });
    });
});
