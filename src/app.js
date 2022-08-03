import { GameDefinition } from "sc-multiple-games-base";

import appConfigs from "./app-configs";
import gameSettings from "./game-settings";
import UnbalancedBigSmallApp from "./unbalanced-bigsmall-app";

const run = async () => {
    const definitions = gameSettings.map((gameSetting) => new GameDefinition(gameSetting));
    const app = new UnbalancedBigSmallApp("Unbalanced Big Small", appConfigs);
    await app.run();
    app.startGames(definitions);
};

run();
