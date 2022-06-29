import { Core } from "sc-game-base";

import appConfigs from "./app-configs";
import gameSettings from "./game-settings";
import { generateResult, getSettlementResult } from "./helpers/result-helper";
import UnbalancedBigSmallContainerRegistry from "./unbalanced-big-small-container-registry";

const run = async () => {
    const definition = new Core.GameDefinition(gameSettings, generateResult, getSettlementResult);
    const gameData = new Core.GameData(gameSettings.durations.wholeRound);
    const container = new UnbalancedBigSmallContainerRegistry().register(appConfigs, definition, gameData);
    const app = new Core.BaseGameApp("UnbalancedBigSmall", appConfigs);
    await app.run();
    await app.startGame(container);
};

run();
