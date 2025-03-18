import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

const MyApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          toast.error("Please login to view your applications.");
          return;
        }

        const res = await axios.get("http://localhost:5000/api/users/my-applications", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setApplications(res.data);
      } catch (error) {
        toast.error("Error fetching applications.");
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.8 }} 
      className="container p-6 d-flex flex-column align-items-center"
    >
      <h2 className="text-2xl font-bold mb-4">My Applications</h2>

      {loading ? (
        <p>Loading...</p>
      ) : applications.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {applications.map((app) => (
            <motion.div 
              key={app._id} 
              initial={{ opacity: 0, scale: 0.8 }} 
              animate={{ opacity: 1, scale: 1 }} 
              transition={{ duration: 0.5 }}
              className="border p-4 rounded shadow-md bg-white"
            >
              <h3 className="text-xl font-bold">{app.job.title}</h3>
              <p className="text-gray-600">{app.job.company}</p>
              <p className="text-sm text-gray-500">Status: {app.status}</p>
            </motion.div>
          ))}
        </div>
      ) : (
        <p>No applications found.</p>
      )}
    </motion.div>
  );
};

export default MyApplications;
