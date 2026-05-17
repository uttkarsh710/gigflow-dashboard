import express from "express";

import {
  createLead,
  getLeads,
  getSingleLead,
  updateLead,
  deleteLead,
} from "../controllers/leadcontroller";

import { protect } from "../Middlewares/authMiddlewares" ;

const router = express.Router();

router.use(protect);

router
  .route("/")
  .post(createLead)
  .get(getLeads);

router
  .route("/:id")
  .get(getSingleLead)
  .put(updateLead)
  .delete(deleteLead);

export default router;