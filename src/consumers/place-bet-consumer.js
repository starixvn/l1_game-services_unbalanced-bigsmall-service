import { helpers } from "sc-common";
import { Core } from "sc-game-base";

export default class PlaceBetConsumer extends Core.BaseEventConsumers.PlaceBetConsumer {
    composeBettingTimeValidationCriteria(roundId) {
        const configs = this.gameData.gameConfigs;
        const shakeThePlateTime = this.definition.durations.placingBets + this.definition.durations.shakeThePlateDuration;

        return [
            {
                failure: !configs.enabled,
                notice: this.getNoticeObj(helpers.noticeHelper.invalidBet),
            },
            {
                failure: roundId !== this.gameData.roundId,
                notice: this.getNoticeObj(helpers.noticeHelper.invalidBet, { gameRoundId: roundId }),
            },
            {
                failure:
                    this.gameData.remainingTime >= this.definition.durations.placingBets &&
                    this.gameData.remainingTime <= shakeThePlateTime,
                notice: this.getNoticeObj(helpers.noticeHelper.cannotPlaceBet),
            },
            {
                failure:
                    this.gameData.remainingTime <= this.definition.durations.lockingBet || this.gameData.remainingTime > shakeThePlateTime,
                notice: this.getNoticeObj(helpers.noticeHelper.placeBetNextRound),
            },
        ];
    }

    validateBetRequest(player, betChoice, amount, freeBet, roundId) {
        if (!amount || !betChoice) {
            return false;
        }

        const criteria = this.composeValidationCriteria(player, betChoice, amount, freeBet, roundId);
        const failedCriterion = criteria.find((criterion) => criterion.failure);

        if (failedCriterion) {
            this.publisher.publishToUser(player.UID, {
                remaing: this.gameData.remainingTime,
                endBet: -1,
                betChoice,
                notice: failedCriterion.notice,
            });

            return false;
        }

        return true;
    }
}
