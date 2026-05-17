"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const leadSchema = new mongoose_1.default.Schema({
    name: String,
    email: String,
    status: {
        type: String,
        enum: ["new", "contacted", "qualified", "lost"],
        default: "new",
    },
    source: {
        type: String,
        enum: ["website", "instagram", "referral"],
    },
}, {
    timestamps: true,
});
exports.default = mongoose_1.default.model("Lead", leadSchema);
