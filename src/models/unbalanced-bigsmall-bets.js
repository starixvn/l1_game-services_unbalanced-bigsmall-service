import mongoose from "mongoose";

const bet = {
    uid: { type: String, required: true },
    name: { type: String, required: true },
    phien: { type: Number, required: true },

    big: { type: Number, default: 0 },
    small: { type: Number, default: 0 },
    totalAmount: { type: Number, default: 0 },

    thanhtoan: { type: Boolean, default: false },
    betwin: { type: Number, default: 0 },
    time: { type: Date },
    odds: { type: Object },

    memberId: { type: Number },
    siteId: { type: String },
    freeBet: { type: Boolean, default: false },

    currency: { type: String, require: true },
    rate: { type: Number, require: true },
    partnerId: { type: String, required: false },

    playerId: { type: Number },
    operatorId: { type: String, required: false },
    roundId: { type: Number, default: 0 },
    paid: { type: Boolean, default: false },
};

const betLog = {
    uid: { type: String, required: true },
    name: { type: String, required: true },
    phien: { type: Number, required: true },

    choice: { type: string, required: true },
    amount: { type: Number, default: 0, required: true },

    thanhtoan: { type: Boolean, default: false },
    betwin: { type: Number, default: 0 },
    time: { type: Date },
    odds: { type: Object },

    memberId: { type: Number },
    siteId: { type: String },
    freeBet: { type: Boolean, default: false },

    currency: { type: String, require: true },
    rate: { type: Number, require: true },
    partnerId: { type: String, required: false },

    playerId: { type: Number },
    operatorId: { type: String, required: false },
    roundId: { type: Number, default: 0 },
    paid: { type: Boolean, default: false },

    clientSentTime: { type: Date },
    receivedTime: { type: Date },
};

const bets = mongoose.model("unbalancedbigsmall_bet", new mongoose.Schema(bet));

const betLogs = mongoose.model("unbalancedbigsmall_betlog", new mongoose.Schema(betLog));

export { bets, betLogs };
