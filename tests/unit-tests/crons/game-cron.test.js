import { GameDefinition } from "sc-multiple-games-base";
import { Core } from "sc-game-base";
import gameSettings from "../../../src/game-settings";
import GameCron from "../../../src/crons/game-cron";

const definition = new GameDefinition(gameSettings[0]);
const gameData = new Core.GameData();
gameData.betCount = {};

function initCron() {
    return new GameCron({ definition, gameData });
}

describe("resetForNewRound", () => {
    it("should reset betCount", () => {
        //Arrange
        gameData.betCount = { big: 10, small: 12 };
        const cron = initCron();

        //Act
        cron.resetForNewRound();

        //Assert
        expect(gameData.betCount).toStrictEqual({});
    });
});
