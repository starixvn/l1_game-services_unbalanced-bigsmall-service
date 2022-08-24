import { Core } from "sc-game-base";
import UnbalancedBigSmallContainerRegistry from "./unbalanced-big-small-container-registry";


export default class UnbalancedBigSmallApp extends Core.BaseGameApp {
    startGames(definitions) {
        definitions.forEach(async (definition) => {
            const container = new UnbalancedBigSmallContainerRegistry().register(
                this.appConfigs,
                definition,
                new Core.GameData(definition.durations.wholeRound)
            );
            await this.startGame(container);
        });
    }
}
