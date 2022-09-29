import { generateResult, getSettlementResult as settle, generateRawResultForHash } from "./helpers/result-helper";
import { getBetLogModel, getBetModel, getResultModel, getRoundModel } from "./models";
import { allGamesHistoriesModel } from "sc-multiple-games-base";

const choicesMapper = { big: 1, small: 2 };
const choices = ["big", "small"];
const hedgeBetGroups = [["big", "small"]];

const allGamesBetsRepository = allGamesHistoriesModel("megabigsmall_histories");

export default [
    {
        id: 50,
        name: "UnbalancedBigSmall1",
        configName: "unbalancedbigsmall1",
        durations: {
            wholeRound: 60,
            placingBets: 50,
            lockingBet: 5,
            shakeThePlateDuration: 2,
        },
        choices,
        hedgeBetGroups,
        choicesMapper,
        generateResult,
        settle,
        generateRawResultForHash,
        repositories: {
            roundsRepository: getRoundModel("unbalancedbigsmall1_round"),
            betsRepository: getBetModel("unbalancedbigsmall1_bet"),
            betLogsRepository: getBetLogModel("unbalancedbigsmall1_betlog"),
            resultsRepository: getResultModel("unbalancedbigsmall1_result"),
            allGamesBetsRepository,
        },
        numberOfRoundHistory: 100,
    },
    {
        id: 51,
        name: "UnbalancedBigSmall2",
        configName: "unbalancedbigsmall2",
        durations: {
            wholeRound: 40,
            placingBets: 30,
            lockingBet: 5,
            shakeThePlateDuration: 2,
        },
        choices,
        hedgeBetGroups,
        choicesMapper,
        generateResult,
        settle,
        generateRawResultForHash,
        repositories: {
            roundsRepository: getRoundModel("unbalancedbigsmall2_round"),
            betsRepository: getBetModel("unbalancedbigsmall2_bet"),
            betLogsRepository: getBetLogModel("unbalancedbigsmall2_betlog"),
            resultsRepository: getResultModel("unbalancedbigsmall2_result"),
            allGamesBetsRepository,
        },
        numberOfRoundHistory: 100,
    },
    {
        id: 54,
        name: "UnbalancedBigSmall3",
        configName: "unbalancedbigsmall3",
        durations: {
            wholeRound: 60,
            placingBets: 50,
            lockingBet: 5,
            shakeThePlateDuration: 2,
        },
        choices,
        hedgeBetGroups,
        choicesMapper,
        generateResult,
        settle,
        generateRawResultForHash,
        repositories: {
            roundsRepository: getRoundModel("unbalancedbigsmall3_round"),
            betsRepository: getBetModel("unbalancedbigsmall3_bet"),
            betLogsRepository: getBetLogModel("unbalancedbigsmall3_betlog"),
            resultsRepository: getResultModel("unbalancedbigsmall3_result"),
            allGamesBetsRepository,
        },
        numberOfRoundHistory: 100,
    },
    {
        id: 55,
        name: "UnbalancedBigSmall4",
        configName: "unbalancedbigsmall4",
        durations: {
            wholeRound: 40,
            placingBets: 30,
            lockingBet: 5,
            shakeThePlateDuration: 2,
        },
        choices,
        hedgeBetGroups,
        choicesMapper,
        generateResult,
        settle,
        generateRawResultForHash,
        repositories: {
            roundsRepository: getRoundModel("unbalancedbigsmall4_round"),
            betsRepository: getBetModel("unbalancedbigsmall4_bet"),
            betLogsRepository: getBetLogModel("unbalancedbigsmall4_betlog"),
            resultsRepository: getResultModel("unbalancedbigsmall4_result"),
            allGamesBetsRepository,
        },
        numberOfRoundHistory: 100,
    },
];
