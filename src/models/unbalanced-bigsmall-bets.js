import mongoose from "mongoose";

const bet = {
    uid: { type: String, required: true },
    name: { type: String, required: true },
    phien: { type: Number, required: true },

    big: { type: Number, default: 0 },
    small: { type: Number, default: 0 },

    thanhtoan: { type: Boolean, default: false },
    betwin: { type: Number, default: 0 },
    time: { type: Date },
    odds: { type: Object },

    memberId: { type: Number },
    siteId: { type: String },
    freeBet: { type: Boolean, default: false },

    playerId: { type: Number },
    operatorId: { type: String, required: false },
    roundId: { type: Number, default: 0 },
    paid: { type: Boolean, default: false },
};

const bets = mongoose.model(
    "unbalancedbigsmall_cuoc",
    new mongoose.Schema({
        ...bet,
        currency: { type: String, require: true },
        rate: { type: Number, require: true },
    })
);
const tmpBets = mongoose.model("unbalancedbigsmall_tmpcuoc", new mongoose.Schema(bet));

export { bets, tmpBets };
