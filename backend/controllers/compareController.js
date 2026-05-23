const prisma = require("../lib/prisma");

/**
 * Compare 2 to 3 colleges.
 * Expects { ids: [1, 2, 3] } in the body.
 */
async function compareColleges(req, res, next) {
  try {
    const { ids } = req.body;

    if (!ids || !Array.isArray(ids) || ids.length < 2 || ids.length > 3) {
      return res.status(400).json({
        success: false,
        message: "Please provide between 2 and 3 college IDs to compare.",
      });
    }

    // Parse IDs as integers
    const parsedIds = ids.map((id) => parseInt(id, 10)).filter((id) => !isNaN(id));

    if (parsedIds.length !== ids.length) {
      return res.status(400).json({
        success: false,
        message: "All college IDs must be valid integers.",
      });
    }

    const colleges = await prisma.college.findMany({
      where: {
        id: { in: parsedIds },
      },
    });

    // Reorder colleges to match the order of IDs sent by the client
    const orderedColleges = parsedIds
      .map((id) => colleges.find((c) => c.id === id))
      .filter((c) => c !== undefined);

    if (orderedColleges.length < 2) {
      return res.status(404).json({
        success: false,
        message: "Could not find at least 2 colleges for the provided IDs.",
      });
    }

    // Format the response specifically returning the requested compare features plus additional detailed ones
    const comparison = orderedColleges.map((c) => ({
      id: c.id,
      name: c.name,
      fees: c.fees,
      rating: c.rating,
      placementPercentage: c.placementPercentage,
      location: c.location,
      state: c.state,
      image: c.image,
      description: c.description,
      type: c.type,
      established: c.established,
      accreditation: c.accreditation,
      courses: c.courses,
      placements: c.placements,
    }));

    res.status(200).json({
      success: true,
      count: comparison.length,
      colleges: comparison,
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  compareColleges,
};
