import awilix from "awilix";
import { Core } from "sc-game-base";
import Bot from "./crons/bot";
import { UnbalancedBigSmallBets, UnbalancedBigSmallBetLogs, UnbalancedBigSmallRounds, UnbalancedBigSmallResults } from "./models/index";

const { asClass, asValue } = awilix;

export default class UnbalancedBigSmallContainerRegistry extends Core.ContainerRegistry {
    registerModels() {
        super.registerModels();

        this.container.register({
            roundsRepository: asValue(UnbalancedBigSmallRounds),
            betsRepository: asValue(UnbalancedBigSmallBets),
            resultsRepository: asValue(UnbalancedBigSmallResults),
            betLogsRepository: asValue(UnbalancedBigSmallBetLogs),
        });
    }

    registerCrons() {
        super.registerCrons();

        this.container.register({
            bot: asClass(Bot).singleton(),
        });
    }
}
