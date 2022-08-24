import { GameDefinition } from "sc-multiple-games-base";
import { Core } from "sc-game-base";
import gameSettings from "../../../src/game-settings";
import Bot from "../../../src/crons/bot";

const definition = new GameDefinition(gameSettings[0]);
const gameConfigs = {
    minbet: 1,
    bot_maxbet: 100,
    choices_maxbet: {
        big: 100,
        small: 100,
    },
};
let gameData;

function initBot() {
    return new Bot(definition, gameData);
}

describe("getBetChoice", () => {
    it.each([
        [{ big: 10 }, "small"],
        [{ small: 10 }, "big"],
        [{ big: 10, small: 40 }, "big"],
        [{ big: 50, small: 40 }, "small"],
    ])("Should return correct bet choice based on total bets", (totalBets, expectedChoice) => {
        //Arrange
        gameData.totalBets = totalBets;
        const bot = initBot();
        bot.balancingRatio = 30;

        //Act
        const result = bot.getBetChoice();

        //Assert
        expect(result).toEqual(expectedChoice);
    });
});

describe("place bet ", () => {
    it("Should increase gameData.totalBets", () => {
        //Arrange
        const bot = initBot();
        const currentTotal = bot.getTotalBetAmount();

        //Act
        bot.placeBet();

        //Assert
        expect(bot.getTotalBetAmount()).toBeGreaterThan(currentTotal);
    });

    it("Should increase betCount", () => {
        //Arrange
        const bot = initBot();

        //Act
        bot.placeBet();

        //Assert
        expect(gameData.betCount).not.toBeEmpty();
    });
});

beforeEach(() => {
    gameData = new Core.GameData(definition.durations.wholeRound);
    gameData.gameConfigs = gameConfigs;
    gameData.betCount = {};
});
