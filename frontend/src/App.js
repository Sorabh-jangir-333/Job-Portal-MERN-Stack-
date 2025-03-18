import { Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import JobList from "./components/JobList";
import JobDetails from "./pages/JobDetails";
import JobListings from "./pages/JobListings";
import MyApplications from "./pages/MyApplications";
import EmployeDashboard from "./pages/EmployeDashboard";
import Navbar from "./components/Navbar";
import PostJob from "./pages/PostJob";
import ApplyJob from "./pages/ApplyJob";

function App() {
  return (
      <div className="container-fluid p-0">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
          <Route path="/jobs" element={<JobList />} />
          <Route path="/job/:id" element={<JobDetails />} />
          <Route path="/job-listings" element={<JobListings />} />
          <Route path="/my-applications" element={<MyApplications />} />
          <Route path="/employer-dashboard" element={<EmployeDashboard />} />
          <Route path="/post-job" element={<PostJob />} />
          <Route path="/apply/:jobId" element={<ApplyJob />} />
          </Routes>
      </div>
  );
}

export default App;
