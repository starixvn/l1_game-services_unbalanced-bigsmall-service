import { Core } from "sc-game-base";

export default class Bot extends Core.Crons.BaseBot {
    async placeBet(bot) {
        const choice = this.getBetChoice();
        const minBet = this.getMinBet();
        const maxBet = this.getMaxBet(choice);
        const betAmount = this.getBetAmount(minBet, maxBet);

        if (this.gameData.remainingTime > this.definition.durations.lockingBet) {
            this.gameData.totalBets[choice] = (this.gameData.totalBets[choice] ?? 0) + betAmount;
            this.totalTickets++;
        }
    }

    getBetChoice() {
        const totalBetAmount = this.getTotalBetAmount();
        const { choices } = this.definition;
        const { totalBets } = this.gameData;

        if (((totalBets[choices[0]] ?? 0) * 100) / totalBetAmount < 50) {
            return choices[0];
        }

        return choices[1];
    }

    getTotalBetAmount() {
        let total = 0;
        this.definition.choices.forEach((choice) => (total += this.gameData.totalBets[choice]));

        return total;
    }

    getBetAmount(minBet, maxBet) {
        return this.chance.integer({ min: minBet, max: maxBet });
    }

    getMaxBet(choice) {
        const gameConfigs = this.gameData.gameConfigs;
        const maxBetPerChoice = gameConfigs.choices_maxbet[choice];
        const botMaxBet = gameConfigs.bot_maxbet;

        return Math.min(maxBetPerChoice, botMaxBet);
    }
}
