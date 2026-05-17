"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const leadcontroller_1 = require("../controllers/leadcontroller");
const authMiddlewares_1 = require("../Middlewares/authMiddlewares");
const router = express_1.default.Router();
router.use(authMiddlewares_1.protect);
router
    .route("/")
    .post(leadcontroller_1.createLead)
    .get(leadcontroller_1.getLeads);
router
    .route("/:id")
    .get(leadcontroller_1.getSingleLead)
    .put(leadcontroller_1.updateLead)
    .delete(leadcontroller_1.deleteLead);
exports.default = router;
