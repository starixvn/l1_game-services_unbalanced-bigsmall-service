import { Core } from "sc-game-base";
import { GameDefinition } from "sc-multiple-games-base";

import appConfigs from "./app-configs";
import gameSettings from "./game-settings";
import UnbalancedBigSmallContainerRegistry from "./unbalanced-big-small-container-registry";

export class App extends Core.BaseGameApp {
    /**
     * @param {GameDefinition[]} definitions
     */
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

const run = async () => {
    const definitions = gameSettings.map((gameSetting) => new GameDefinition(gameSetting));
    const app = new App("Unbalanced Big Small", appConfigs);
    await app.run();
    await app.startGames(definitions);
};

run();
