export default {
    id: 49,
    name: "UnbalancedBigSmall",
    configName: "unbalancedbigsmall",
    durations: {
        wholeRound: 61,
        placingBets: 50,
        balancingBetTime: 9,
        lockingBet: 5,
        shakeThePlateDuration: 2,
    },
    choices: ["big", "small"],
    choicesMapper: { big: 1, small: 2 },
};
