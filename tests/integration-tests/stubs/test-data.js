const game = {
    id: 51,
    name: "UnbalancedBigSmall2",
};

const gameConfig = {
    type: 0,
    name: "unbalancedbigsmall2",
    enabled: true,
    botenabled: false,
    minbet: 1,
    maxbet: 2000,
    disabledround: null,
    bot_maxbet: 10,
    hour_maxbot: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    disabled_message: "Game đang được bảo trì, vui lòng quay lại sau 10 phút.",
    choices_maxbet: { big: 2000, small: 2000 },
    odds: {
        big: 1.96,
        small: 1.96,
    },
    delayStartTime: 0,
    enableFreeBet: false,
    slotsConfig: null,
    siteExclusions: [],
    smartBotEnabled: false,
    smartBotGroupRatio: 0,
    isBeta: true,
    gameId: 51,
    randomMode: 0,
};

const currencyData = { code: "USD", name: "$US" };

const userBetData = (uid) => {
    return [
        {
            roundId: 1,
            uid: uid,
            betwin: 0,
            currency: "$US",
            amount: 100,
            choice: "big",
            playerId: 1,
            name: "NormalUser",
            operatorId: "dummy-partner-id",
            rate: 1,
            siteId: "111",
            paid: true,
        },
        {
            roundId: 2,
            uid: uid,
            betwin: 0,
            currency: "$US",
            amount: 100,
            choice: "small",
            playerId: 1,
            name: "NormalUser",
            operatorId: "dummy-partner-id",
            rate: 1,
            siteId: "111",
            paid: true,
        },
    ];
};

const rounds = [
    {
        id: 1,
        result: { dice1: 4, dice2: 4, dice3: 1 },
        settlementResult: { big: false, small: true },
    },
    {
        id: 2,
        result: { dice1: 1, dice2: 2, dice3: 6 },
        settlementResult: { big: false, small: true },
    },
];

const socketOptions = {
    socketUri: "http://localhost:5001/user/unbalancedbigsmall2",
    gameName: game.name,
    proxyRoute: "/socket.io",
};

export { game, gameConfig, currencyData, rounds, socketOptions, userBetData };
