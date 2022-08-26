import { Core } from "sc-game-base";

export default class GameCron extends Core.Crons.BaseGameCron {
    async getLastArchiveRound() {
        const { configName } = this.definition;
        const archiveStatus = await this.archiveStatusesRepository.findOne({ name: configName }, "lastArcId").lean().exec();

        return archiveStatus ? archiveStatus.lastArcId["_rounds"] + 1 : 1;
    }

    resetForNewRound() {
        super.resetForNewRound();
        this.gameData.betCount = {};
    }

    // async proceed() {
    //     const { durations } = this.definition;

    //     if (this.gameData.remainingTime === durations.wholeRound) {
    //         await this.checkGameStatus();
    //     }

    //     if (this.isStartingTime(this.gameData.remainingTime, durations)) {
    //         this.resetForNewRound();
    //         this.bot && (await this.bot.reset());
    //     }

    //     if (this.gameData.remainingTime === durations.placingBets && this.resultsRepository) {
    //         await this.roundResultConsumer.generateResultAndPublishHash(this.gameData.lastResultRecord);
    //         this.gameData.settlementResultFromAdmin = {};
    //     }

    //     if (this.gameData.remainingTime === 0) {
    //         await this.settleGameRoundConsumer.settleRound(this.gameData);
    //     } else if (this.gameData.remainingTime < durations.placingBets) {
    //         this.bot && (await this.bot.run());
    //         this.runningRoundInfoPublisher.publish();
    //     }

    //     const { remainingTime } = this.gameData;
    //     this.runningRoundInfoPublisher.publishToAllUsers({ currentRemainingTime: remainingTime });

    //     if (!this.gameData.disabled) {
    //         this.gameData.remainingTime--;
    //         if (this.gameData.remainingTime < 0) {
    //             this.gameData.remainingTime = durations.wholeRound;
    //         }
    //     }
    // }
}
