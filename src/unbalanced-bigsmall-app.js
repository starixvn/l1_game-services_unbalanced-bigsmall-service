import { Core } from "sc-game-base";
import UnbalancedBigSmallContainerRegistry from "./unbalanced-big-small-container-registry";
import GameData from "./game-data";
//import { registerViewModule } from "sc-game-base-view-module";
import { registerViewModule } from "./view-module/register-view-module";

export default class UnbalancedBigSmallApp extends Core.BaseGameApp {
    startGames(definitions) {
        definitions.forEach(async (definition) => {
            const gameData = new GameData(definition.durations.wholeRound);
            gameData.viewPlayers = {};

            const container = new UnbalancedBigSmallContainerRegistry().register(this.appConfigs, definition, gameData);
            await this.startGame(container);
            registerViewModule({ socketServer: this.socketServer }, container, definition);
        });
    }
}
