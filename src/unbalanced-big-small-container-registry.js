import awilix from "awilix";
import { MultipleGamesContainerRegistry } from "sc-multiple-games-base";
import PlaceBetConsumer from "./consumers/place-bet-consumer";
import Bot from "./crons/bot";
import GameCron from "./crons/game-cron";
import ProcessBetQueue from "./crons/process-bet-queue";
import { RunningRoundInfoPublisher } from "./event-publishers/running-round-info-publisher";
import { ViewConsumer, BaseViewRouter, GameStatusPublisher, RoundResultPublisher } from "sc-game-base-view-module";

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
            allGamesBetsRepository: asValue(repositories.allGamesBetsRepository),
        });
    }

    registerConsumers() {
        super.registerConsumers();

        this.container.register({
            placeBetConsumer: asClass(PlaceBetConsumer).singleton(),
            viewConsumer: asClass(ViewConsumer).singleton(),
        });
    }

    registerCrons() {
        super.registerCrons();

        this.container.register({
            bot: asClass(Bot).singleton(),
            gameCron: asClass(GameCron).singleton().proxy(),
            processBetQueue: asClass(ProcessBetQueue).singleton().proxy(),
        });
    }

    registerRouters() {
        super.registerRouters();

        this.container.register({
            baseViewRouter: asClass(BaseViewRouter).proxy(),
        });
    }

    registerPublishers() {
        super.registerPublishers();

        this.container.register({
            runningRoundInfoPublisher: asClass(RunningRoundInfoPublisher).singleton(),
            gameStatusPublisher: asClass(GameStatusPublisher).singleton(),
            roundResultPublisher: asClass(RoundResultPublisher).singleton(),
        });
    }
}
