import { Core } from "sc-game-base";

export default class ProcessBetQueue extends Core.Crons.ProcessBetQueue {
    async upsertBet(player, roundId, bet, rate) {
        if (!this.betsRepository.exists({ uid: player.UID, roundId })) {
            this.gameData.betCount[bet.betChoice] = (this.gameData.betCount[bet.betChoice] ?? 0) + 1;
        }

        super.upsertBet(player, roundId, bet, rate);
    }
}
