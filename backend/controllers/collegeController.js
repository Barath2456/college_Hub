const prisma = require("../lib/prisma");

/**
 * Fetch all colleges with optional search, location, and fees filters.
 */
async function getColleges(req, res, next) {
  try {
    const { search, location, feesRange } = req.query;

    const where = {};

    // 1. Search filter: search matches name or location (case-insensitive)
    if (search) {
      where.OR = [
        { name: { contains: search, mode: "insensitive" } },
        { location: { contains: search, mode: "insensitive" } },
      ];
    }

    // 2. Location filter
    if (location && location !== "all") {
      where.location = { equals: location, mode: "insensitive" };
    }

    // 3. Fees Range filter
    if (feesRange && feesRange !== "all") {
      switch (feesRange) {
        case "under-2":
          where.fees = { lte: 200000 };
          break;
        case "2-5":
          where.fees = { gte: 200000, lte: 500000 };
          break;
        case "5-10":
          where.fees = { gte: 500000, lte: 1000000 };
          break;
        case "above-10":
          where.fees = { gte: 1000000 };
          break;
        default:
          break;
      }
    }

    const colleges = await prisma.college.findMany({
      where,
      orderBy: { rating: "desc" },
    });

    res.status(200).json({
      success: true,
      count: colleges.length,
      colleges,
    });
  } catch (error) {
    next(error);
  }
}

/**
 * Fetch a single college by ID.
 */
async function getCollegeById(req, res, next) {
  try {
    const id = parseInt(req.params.id, 10);

    if (isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid college ID format. Must be an integer.",
      });
    }

    const college = await prisma.college.findUnique({
      where: { id },
    });

    if (!college) {
      return res.status(404).json({
        success: false,
        message: "College not found.",
      });
    }

    res.status(200).json({
      success: true,
      college,
    });
  } catch (error) {
    next(error);
  }
}

/**
 * Create a new college (admin endpoint for a complete MVP).
 */
async function createCollege(req, res, next) {
  try {
    const {
      name,
      location,
      state,
      fees,
      rating,
      placementPercentage,
      description,
      image,
      type,
      established,
      accreditation,
      courses,
      placements,
      reviews,
    } = req.body;

    // Validation
    if (!name || !location || !state || !fees || !rating || !placementPercentage || !description || !image || !type || !established || !accreditation) {
      return res.status(400).json({
        success: false,
        message: "Please fill in all mandatory fields.",
      });
    }

    const newCollege = await prisma.college.create({
      data: {
        name,
        location,
        state,
        fees: parseInt(fees, 10),
        rating: parseFloat(rating),
        placementPercentage: parseInt(placementPercentage, 10),
        description,
        image,
        type,
        established: parseInt(established, 10),
        accreditation,
        courses: courses || [],
        placements: placements || {},
        reviews: reviews || [],
      },
    });

    res.status(201).json({
      success: true,
      message: "College created successfully.",
      college: newCollege,
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getColleges,
  getCollegeById,
  createCollege,
};
