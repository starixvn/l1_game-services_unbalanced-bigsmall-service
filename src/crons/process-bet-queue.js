import { Core } from "sc-game-base";

export default class ProcessBetQueue extends Core.Crons.ProcessBetQueue {
    async upsertBet(player, roundId, bet, rate) {
        if (!(await this.betsRepository.exists({ uid: player.UID, roundId }))) {
            this.gameData.betCount[bet.betChoice] = (this.gameData.betCount[bet.betChoice] ?? 0) + 1;
        }

        super.upsertBet(player, roundId, bet, rate);
    }

    generatePlacingBetResult(player, balance, bet, rate) {
        const { amount, freeBet, betChoice } = bet;
        const { ownBets } = this.gameData.ingame[player.profile.name] || { ownBets: {} };

        return {
            remaing: this.gameData.remainingTime,
            ownBets: ownBets,
            endBet: amount,
            betChoice,
            freeBet,
            user: { ...balance },
        };
    }

    handleFailedBet(player, notice, bet) {
        const { betChoice } = bet;
        this.decreaseBetTracks(player.profile.name, bet);

        if (notice.apiError) {
            this.placeBetPublisher.publishGameFailedBet(player.UID, {
                remaing: this.gameData.remainingTime,
                endBet: -1,
                betChoice,
                apiError: notice.apiError,
            });
        } else if (notice.kickedOut) {
            this.placeBetPublisher.publishGameFailedBet(player.UID, {
                remaing: this.gameData.remainingTime,
                endBet: -1,
                betChoice,
                kickedOut: notice.kickedOut,
            });
        } else {
            this.placeBetPublisher.publishGameFailedBet(player.UID, {
                remaing: this.gameData.remainingTime,
                endBet: -1,
                betChoice,
                notice,
            });
        }
    }
}
