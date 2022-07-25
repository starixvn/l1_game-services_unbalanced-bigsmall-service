import { initAPIStub, stubUserService } from "sc-game-service-integration-utils";
import { GameDefinition } from "sc-multiple-games-base";

import appConfigs from "../../../src/app-configs.IGT";
import gameSettings from "../../../src/game-settings";
import UnbalancedBigSmallApp from "../../../src/unbalanced-bigsmall-app";

export const run = async () => {
    initAPIStub(appConfigs.apiSettings.apiUrl);
    stubUserService(appConfigs);
    const definitions = [gameSettings[0]].map((gameSetting) => new GameDefinition(gameSetting));

    const app = new UnbalancedBigSmallApp("Unbalanced Big Small", appConfigs);
    await app.run();
    await app.startGames(definitions);
};

run();
