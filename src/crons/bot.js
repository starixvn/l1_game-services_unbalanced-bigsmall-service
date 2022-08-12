import { Core } from "sc-game-base";

export default class Bot extends Core.Crons.BaseBot {
    async placeBet(bot) {
        const choice = this.getBetChoice();
        const minBet = this.getMinBet();
        const maxBet = this.getMaxBet(choice);
        const betAmount = this.getBetAmount(minBet, maxBet);

        if (this.gameData.remainingTime > this.definition.durations.lockingBet) {
            this.gameData.totalBets[choice] = (this.gameData.totalBets[choice] ?? 0) + betAmount;
            this.gameData.betCount[choice] = (this.gameData.betCount[choice] || 0) + 1;
            this.totalTickets++;
        }
    }

    async reset() {
        await super.reset();

        const configs = this.gameData.gameConfigs;

        if (configs?.botenabled) {
            const bots = await this.userInfosRepository.find({ type: true, disabled: false }, "id name").lean().exec();

            this.bots = this.chance.shuffle(bots).slice(0, this.maxNumberOfBots);
        } else {
            this.bots = [];
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
        this.definition.choices.forEach((choice) => (total += this.gameData.totalBets[choice] ?? 0));

        return total;
    }

    getBetAmount(minBet, maxBet) {
        return this.chance.integer({ min: minBet, max: maxBet });
    }

    getMaxBet(choice) {
        const gameConfigs = this.gameData.gameConfigs;

        return gameConfigs.bot_maxbet;
    }
}
