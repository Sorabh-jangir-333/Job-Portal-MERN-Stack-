import { Link } from "react-router-dom";
import { Container, Button, Row, Col, Card } from "react-bootstrap";
import { motion } from "framer-motion";
import "./Home.css"; // Import the updated CSS

const Home = () => {
  return (
    <div className="dark-gradient-bg">
      <Container
        fluid
        className="min-vh-100 d-flex flex-column align-items-center justify-content-center"
      >
        {/* Hero Section */}
        <motion.div
          className="text-center py-5 w-100 hero-section shadow-lg rounded p-5 mt-5"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className="fw-bold display-4 text-neon">Find Your Dream Job</h1>
          <p className="fs-5 text-light">Join thousands of job seekers and employers today!</p>
        </motion.div>

        {/* Action Buttons */}
        <Row className="justify-content-center my-4">
          <Col xs="auto">
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <Link to="/jobs">
                <Button variant="outline-light" size="lg" className="neon-btn px-5 py-3">
                  Browse Jobs
                </Button>
              </Link>
            </motion.div>
          </Col>
          <Col xs="auto">
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <Link to="/post-job">
                <Button variant="outline-light" size="lg" className="neon-btn px-5 py-3">
                  Post a Job
                </Button>
              </Link>
            </motion.div>
          </Col>
        </Row>

        {/* Features Section */}
        <Container className="my-5">
          <h2 className="text-center mb-4 text-neon">Why Choose Us?</h2>
          <Row className="g-4">
            {[
              { title: "Verified Employers", text: "Only trusted companies post jobs." },
              { title: "Easy Application", text: "Apply in just a few clicks." },
              { title: "Job Alerts", text: "Stay updated with new opportunities." },
            ].map((feature, index) => (
              <Col md={4} key={index}>
                <motion.div whileHover={{ scale: 1.1, rotate: 2 }} transition={{ duration: 0.3 }}>
                  <Card className="feature-card text-center p-3 border-0 bg-dark text-light">
                    <Card.Body>
                      <Card.Title className="fw-bold text-neon">{feature.title}</Card.Title>
                      <Card.Text>{feature.text}</Card.Text>
                    </Card.Body>
                  </Card>
                </motion.div>
              </Col>
            ))}
          </Row>
        </Container>

        {/* Animated Stats Section */}
        <Container className="text-center my-5">
          <h2 className="text-neon">Trusted by Thousands</h2>
          <Row className="mt-3">
            {[
              { value: "5,000+", label: "Job Listings" },
              { value: "10,000+", label: "Active Users" },
              { value: "1,500+", label: "Successful Hires" },
            ].map((stat, index) => (
              <Col md={4} key={index} className="mb-3">
                <motion.div
                  whileHover={{ scale: 1.2 }}
                  transition={{ duration: 0.3 }}
                  className="stat-box p-3 bg-dark shadow-lg rounded-lg text-light"
                >
                  <h3 className="fw-bold text-neon display-4">{stat.value}</h3>
                  <p className="text-muted fs-5">{stat.label}</p>
                </motion.div>
              </Col>
            ))}
          </Row>
        </Container>
      </Container>
    </div>
  );
};

export default Home;
