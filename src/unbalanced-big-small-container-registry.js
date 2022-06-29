import awilix from "awilix";
import { Core } from "sc-game-base";
import { bets, rounds, tmpBets, results } from "./models/index";

const { asClass, asValue } = awilix;

export default class UnbalancedBigSmallContainerRegistry extends Core.ContainerRegistry {
    registerModels() {
        super.registerModels();

        this.container.register({
            roundsRepository: asValue(rounds),
            betsRepository: asValue(bets),
            tempBetsRepository: asValue(tmpBets),
            resultsRepository: asValue(results),
        });
    }
}
