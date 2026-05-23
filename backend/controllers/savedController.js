const prisma = require("../lib/prisma");

/**
 * Toggle save status of a college for the authenticated user.
 * POST /save/:collegeId
 */
async function toggleSaveCollege(req, res, next) {
  try {
    const userId = req.user.id;
    const collegeId = parseInt(req.params.collegeId, 10);

    if (isNaN(collegeId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid college ID format.",
      });
    }

    // 1. Check if the college exists
    const college = await prisma.college.findUnique({
      where: { id: collegeId },
    });

    if (!college) {
      return res.status(404).json({
        success: false,
        message: "College not found.",
      });
    }

    // 2. Check if already saved
    const existingSave = await prisma.savedCollege.findUnique({
      where: {
        userId_collegeId: {
          userId,
          collegeId,
        },
      },
    });

    if (existingSave) {
      // Unsave (Delete)
      await prisma.savedCollege.delete({
        where: {
          userId_collegeId: {
            userId,
            collegeId,
          },
        },
      });

      return res.status(200).json({
        success: true,
        saved: false,
        message: "College removed from saved list.",
      });
    } else {
      // Save (Create)
      await prisma.savedCollege.create({
        data: {
          userId,
          collegeId,
        },
      });

      return res.status(200).json({
        success: true,
        saved: true,
        message: "College saved successfully.",
      });
    }
  } catch (error) {
    next(error);
  }
}

/**
 * Fetch all colleges saved by the authenticated user.
 * GET /saved
 */
async function getSavedColleges(req, res, next) {
  try {
    const userId = req.user.id;

    const savedRecords = await prisma.savedCollege.findMany({
      where: { userId },
      include: {
        college: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    // Extract the college objects from the join records
    const colleges = savedRecords.map((record) => record.college);

    res.status(200).json({
      success: true,
      count: colleges.length,
      colleges,
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  toggleSaveCollege,
  getSavedColleges,
};
