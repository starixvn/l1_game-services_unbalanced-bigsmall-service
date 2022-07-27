import awilix from "awilix";
import { MultipleGamesContainerRegistry } from "sc-multiple-games-base";
import UnbalanacedBigSmallPlaceBetConsumer from "./consumers/unbalanced-bigsmall-place-bet-consumer";
import Bot from "./crons/bot";
import GameCron from "./crons/game-cron";

const { asClass, asValue } = awilix;

export default class UnbalancedBigSmallContainerRegistry extends MultipleGamesContainerRegistry {
    register(appConfigs, definition, gameData) {
        super.register(appConfigs, definition, gameData);

        this.registerRepositories(definition.repositories);

        return this.container;
    }

    registerRepositories(repositories) {
        this.container.register({
            roundsRepository: asValue(repositories.roundsRepository),
            betsRepository: asValue(repositories.betsRepository),
            resultsRepository: asValue(repositories.resultsRepository),
            betLogsRepository: asValue(repositories.betLogsRepository),
        });
    }

    registerConsumers() {
        super.registerConsumers();

        this.container.register({
            placeBetConsumer: asClass(UnbalanacedBigSmallPlaceBetConsumer).singleton(),
        });
    }

    registerCrons() {
        super.registerCrons();

        this.container.register({
            bot: asClass(Bot).singleton(),
            gameCron: asClass(GameCron).singleton().proxy(),
        });
    }
}
