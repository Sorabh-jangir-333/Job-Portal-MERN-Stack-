import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";



const PostJob = () => {
  const [jobData, setJobData] = useState({
    title: "",
    company: "",
    location: "",
    salary: "",
    jobType: "",
    description: "",
  });

  const handleChange = (e) => {
    setJobData({ ...jobData, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
  
      if (!token) {
        return toast.error("User not authenticated. Please log in.");
      }
  
      const res = await axios.post(
        "http://localhost:5000/api/jobs",
        {
          title: jobData.title,
          description: jobData.description,
          location: jobData.location,
          salary: jobData.salary,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
  
      toast.success("Job posted successfully!");
  
      // Redirect after 5 seconds
      setTimeout(() => {
        navigate("/employer-dashboard");
      }, 5000);
    } catch (error) {
      console.error("Error:", error.response?.data || error);
      toast.error(error.response?.data?.msg || "Failed to post job");
    }
  };
  
  

  return (
    <Container className="mt-5">
      <motion.h2
        className="text-center fw-bold"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Post a Job
      </motion.h2>
      <motion.div
        className="p-4 shadow rounded bg-light mt-4"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Form onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Col>
              <Form.Control type="text" name="title" placeholder="Job Title" onChange={handleChange} required />
            </Col>
            <Col>
              <Form.Control type="text" name="company" placeholder="Company Name" onChange={handleChange} required />
            </Col>
          </Row>
          <Row className="mb-3">
            <Col>
              <Form.Control type="text" name="location" placeholder="Location" onChange={handleChange} required />
            </Col>
            <Col>
              <Form.Control type="number" name="salary" placeholder="Salary" onChange={handleChange} required />
            </Col>
          </Row>
          <Form.Select name="jobType" onChange={handleChange} required className="mb-3">
            <option value="">Select Job Type</option>
            <option value="Full-Time">Full-Time</option>
            <option value="Part-Time">Part-Time</option>
            <option value="Internship">Internship</option>
          </Form.Select>
          <Form.Control as="textarea" rows={4} name="description" placeholder="Job Description" onChange={handleChange} required className="mb-3" />
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button variant="primary" type="submit" className="w-100 ">
              Post Job
            </Button>
          </motion.div>
        </Form>
      </motion.div>
    </Container>
  );
};

export default PostJob;
