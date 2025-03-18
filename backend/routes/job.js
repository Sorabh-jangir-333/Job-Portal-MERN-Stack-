const express = require("express");
const fs = require("fs");
const path = require("path");
const multer = require("multer");
const Job = require("../models/Job");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const router = express.Router();

// Ensure uploads folder exists
const UPLOADS_DIR = path.join(__dirname, "../uploads");
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

// Multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOADS_DIR);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// ✅ POST - Create a new Job (Employers only)
router.post(
  "/",
  authMiddleware,
  roleMiddleware(["employer"]),
  async (req, res) => {
    try {
      const { title, description, location, salary } = req.body;

      if (!title || !description || !location || !salary) {
        return res.status(400).json({ msg: "Please provide all job details" });
      }

      const newJob = new Job({
        title,
        description,
        location,
        salary,
        postedBy: req.user.id, // ✅ Corrected employer reference
      });

      await newJob.save();
      res.status(201).json({ msg: "Job posted successfully!", job: newJob });
    } catch (error) {
      console.error("Error posting job:", error);
      res.status(500).json({ msg: "Server error" });
    }
  }
);

// ✅ GET - List all Jobs
router.get("/", async (req, res) => {
  try {
    const jobs = await Job.find().populate("employer", "name email"); // Fetch employer details
    res.json(jobs);
  } catch (error) {
    console.error("Error fetching jobs:", error);
    res.status(500).json({ msg: "Server error" });
  }
});

// ✅ POST - Apply for a Job (Job Seekers with Resume Upload)
router.post(
  "/:id/apply",
  authMiddleware,
  roleMiddleware(["jobseeker"]),
  upload.single("resume"),
  async (req, res) => {
    try {
      const job = await Job.findById(req.params.id);
      if (!job) return res.status(404).json({ msg: "Job not found" });

      // ✅ Prevent duplicate applications
      const alreadyApplied = job.applicants.some(
        (applicant) => applicant.user.toString() === req.user.id
      );
      if (alreadyApplied) {
        return res.status(400).json({ msg: "You have already applied for this job" });
      }

      if (!req.file) {
        return res.status(400).json({ msg: "Resume is required" });
      }

      const resumePath = req.file.path;

      // ✅ Save application details
      job.applicants.push({ user: req.user.id, resume: resumePath });
      await job.save();

      res.json({ msg: "Job application submitted successfully!", resume: resumePath });
    } catch (error) {
      console.error("Error applying for job:", error);
      res.status(500).json({ msg: "Server error" });
    }
  }
);

module.exports = router;
