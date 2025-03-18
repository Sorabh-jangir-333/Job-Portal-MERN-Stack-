const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema({
  title: String,
  description: String,
  company: String,
  location: String,
  salary: Number,
  jobType: String,
  employer: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  applicants: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      resume: String, // Store resume file path
    },
  ],
});

const Job = mongoose.model("Job", JobSchema);
module.exports = Job;
