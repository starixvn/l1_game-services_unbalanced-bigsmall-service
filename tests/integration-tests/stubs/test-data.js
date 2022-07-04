const game = {
    id: 49,
    name: "UnbalancedBigSmall",
};

const gameConfig = {
    type: 0,
    name: "unbalancedbigsmall",
    enabled: true,
    botenabled: false,
    minbet: 0,
    maxbet: 0,
    disabledround: null,
    bot_maxbet: 10,
    hour_maxbot: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    disabled_message: "Game đang được bảo trì, vui lòng quay lại sau 10 phút.",
    choices_maxbet: null,
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
    gameId: 49,
    randomMode: 0,
};

const currencyData = { code: "USD", name: "$US" };

const userBetData = (uid) => {
    return [
        {
            phien: 1,
            roundId: 1,
            uid: uid,
            betwin: 0,
            currency: "$US",
            amount: 100,
            choice: "big",
            memberId: 1,
            playerId: 1,
            name: "NormalUser",
            partnerId: "dummy-partner-id",
            operatorId: "dummy-partner-id",
            rate: 1,
            siteId: "111",
            thanhtoan: true,
            win: false,
        },
        {
            phien: 2,
            roundId: 2,
            uid: uid,
            betwin: 0,
            currency: "$US",
            amount: 100,
            choice: "small",
            memberId: 1,
            playerId: 1,
            name: "NormalUser",
            partnerId: "dummy-partner-id",
            operatorId: "dummy-partner-id",
            rate: 1,
            siteId: "111",
            thanhtoan: true,
            win: false,
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
    socketUri: "http://localhost:5001/user/unbalanced",
    gameName: game.name,
    proxyRoute: "/socket.io",
};

export { game, gameConfig, currencyData, rounds, socketOptions, userBetData };
