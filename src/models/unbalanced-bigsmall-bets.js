import mongoose from "mongoose";

const bet = {
    uid: { type: String, required: true },
    name: { type: String, required: true },

    big: { type: Number, default: 0 },
    small: { type: Number, default: 0 },
    totalAmount: { type: Number, default: 0 },

    betwin: { type: Number, default: 0 },
    time: { type: Date },
    odds: { type: Object },

    siteId: { type: String },
    freeBet: { type: Boolean, default: false },

    currency: { type: String, require: true },
    rate: { type: Number, require: true },

    playerId: { type: Number },
    operatorId: { type: String, required: false },
    roundId: { type: Number, default: 0 },
    paid: { type: Boolean, default: false },
};

const betLog = {
    uid: { type: String, required: true },
    name: { type: String, required: true },

    choice: { type: String, required: true },
    amount: { type: Number, default: 0, required: true },

    time: { type: Date },

    siteId: { type: String },
    freeBet: { type: Boolean, default: false },


    playerId: { type: Number },
    operatorId: { type: String, required: false },
    roundId: { type: Number, default: 0 },

    currency: { type: String, require: true },
    rate: { type: Number, require: true },

    clientSentTime: { type: Date },
    receivedTime: { type: Date },
};


export function getBetModel(modelName) {
    return mongoose.model(modelName, new mongoose.Schema(bet));
}

export function getBetLogModel(modelName) {
    return mongoose.model(modelName, new mongoose.Schema(betLog));
}
