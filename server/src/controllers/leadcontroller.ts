import { Request, Response } from "express";

import Lead from "../models/Lead";

export const createLead = async (
  req: Request,
  res: Response
) => {
  try {
    const lead = await Lead.create(req.body);

    res.status(201).json(lead);
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
  }
};

export const getLeads = async (
  req: Request,
  res: Response
) => {
  try {
    const page = Number(req.query.page) || 1;

    const limit = 10;

    const skip = (page - 1) * limit;

    const search = req.query.search || "";

    const status = req.query.status;

    const source = req.query.source;

    const sort = req.query.sort;

    const query: any = {};

    if (status) {
      query.status = status;
    }

    if (source) {
      query.source = source;
    }

    if (search) {
      query.$or = [
        {
          name: {
            $regex: search,
            $options: "i",
          },
        },

        {
          email: {
            $regex: search,
            $options: "i",
          },
        },
      ];
    }

    const sortOption =
      sort === "oldest" ? 1 : -1;

    const total = await Lead.countDocuments(query);

    const leads = await Lead.find(query)
      .sort({
        createdAt: sortOption,
      })
      .skip(skip)
      .limit(limit);

    res.json({
      leads,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
  }
};

export const getSingleLead = async (
  req: Request,
  res: Response
) => {
  const lead = await Lead.findById(req.params.id);

  res.json(lead);
};

export const updateLead = async (
  req: Request,
  res: Response
) => {
  const lead = await Lead.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );

  res.json(lead);
};

export const deleteLead = async (
  req: Request,
  res: Response
) => {
  await Lead.findByIdAndDelete(req.params.id);

  res.json({
    message: "Lead Deleted",
  });
};