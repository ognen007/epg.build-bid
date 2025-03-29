import { useEffect, useState, Fragment } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Clock, AlertCircle, Loader2 } from "lucide-react";

// Define TypeScript interfaces for the data structure
interface Hold {
  hold: string;
  counter: number;
  timestamp: string;
}

interface Project {
  id: string;
  name: string;
  time: Hold[];
}

export const ContractorProjectTimeline = () => {
  // Extract the contractor's full name from the URL params
  const { contractorFullName } = useParams();
  console.log("Contractor Full Name from URL:", contractorFullName);

  // State to manage the fetched data, loading state, and error state
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Function to fetch data from the backend
  const fetchHoldDurations = async () => {
    try {
      const response = await axios.get(
        `https://epg-backend.onrender.com/api/projects/pipeline/contractor/${contractorFullName}`
      );

      // Log the API response for debugging
      console.log("API Response:", response.data);

      // Validate the API response structure
      if (!Array.isArray(response.data)) {
        throw new Error("Invalid API response structure");
      }

      // Update state with the raw backend data
      setProjects(response.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching data:", err);
      setError("Failed to fetch data. Please try again later.");
      setLoading(false);
    }
  };

  // Fetch data when the component mounts or when the contractorFullName changes
  useEffect(() => {
    fetchHoldDurations();
  }, [contractorFullName]);

  // Render loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="w-8 h-8 text-orange-600 animate-spin" />
      </div>
    );
  }

  // Render error state
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-md text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <p className="text-gray-700">{error}</p>
        </div>
      </div>
    );
  }

  // Render the main content
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {contractorFullName || "Unknown Contractor"}
          </h1>
          <p className="text-lg text-gray-600">
            Project Timeline Overview
          </p>
        </div>

        {projects.length === 0 ? (
          <div className="bg-white p-8 rounded-xl shadow-lg text-center">
            <AlertCircle className="w-16 h-16 text-orange-600 mx-auto mb-4" />
            <p className="text-xl text-gray-700">No projects found for this contractor.</p>
          </div>
        ) : (
          <div className="space-y-8">
            {projects.map((project) => (
              <div
                key={project.id}
                className="bg-white rounded-xl shadow-lg p-6 transition-all hover:shadow-xl"
              >
                <h2 className="text-2xl font-semibold text-gray-800 mb-6 pb-4 border-b">
                  {project.name}
                </h2>

                {!project.time || project.time.length === 0 ? (
                  <p className="text-gray-600 text-center py-4">
                    No holds recorded for this project.
                  </p>
                ) : (
                  <div className="space-y-6">
                    {project.time.map((hold, idx) => {
                      const durationInMinutes = Math.floor(hold.counter / 60);
                      const durationInHours = Math.floor(durationInMinutes / 60);

                      return (
                        <Fragment key={idx}>
                          <div className="flex items-start gap-4">
                            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center">
                              <Clock className="w-6 h-6 text-orange-600" />
                            </div>

                            <div className="flex-grow">
                              <div className="flex items-center justify-between mb-2">
                                <h3 className="text-lg font-medium text-gray-900">
                                  {hold.hold}
                                </h3>
                                <span className="text-sm font-medium text-gray-500">
                                  {durationInHours > 0 && `${durationInHours}h `}
                                  {durationInMinutes % 60}m
                                </span>
                              </div>

                              <div className="relative mt-2">
                                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                                  <div
                                    className="h-full bg-orange-600 rounded-full transition-all duration-500"
                                    style={{
                                      width: `${
                                        (hold.counter /
                                          project.time.reduce(
                                            (acc, h) => acc + h.counter,
                                            0
                                          )) *
                                        100
                                      }%`,
                                    }}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                          {idx < project.time.length - 1 && (
                            <div className="ml-6 w-0.5 h-6 bg-gray-200 mx-auto" />
                          )}
                        </Fragment>
                      );
                    })}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};