import { stubMongoose } from "jest-micro-auto-stub";
import { GameDefinition } from "sc-multiple-games-base";
import { Core } from "sc-game-base";
import mongoose from "mongoose";
import ProcessBetQueue from "../../../src/crons/process-bet-queue";
import gameSettings from "../../../src/game-settings";

const definition = new GameDefinition(gameSettings[0]);
const gameData = new Core.GameData();
gameData.betCount = {};
const betsRepository = stubMongoose(mongoose.Model);
const player = {
    UID: 1,
    profile: {
        name: "player",
    },
};

function initProcessBetQueue() {
    return new ProcessBetQueue({ definition, gameData, betsRepository });
}

describe("upsert bet", () => {
    describe("when bet doesnt exist", () => {
        it("should increase betCount by 1", async () => {
            //Arrrange
            const processBetQueue = initProcessBetQueue();
            betsRepository.exists.mockReturnValueOnce(false);

            //Act
            await processBetQueue.upsertBet(player, 1, { betChoice: "big", amount: 10 }, 1);

            //Assert
            expect(gameData.betCount.big).toEqual(1);
        });
    });

    describe("when bet exists", () => {
        it("should'n increase betCount by 1", async () => {
            //Arrange
            const processBetQueue = initProcessBetQueue();
            betsRepository.exists.mockReturnValueOnce(true);
            gameData.betCount = { big: 1 };

            //Act
            await processBetQueue.upsertBet(player, 1, { betChoice: "big", amount: 10 }, 1);

            //Assert
            expect(gameData.betCount.big).toEqual(1);
        });
    });
});

afterEach(() => {
    jest.resetAllMocks();
    gameData.betCount = {};
});
