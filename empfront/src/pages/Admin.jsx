import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../components/AuthContext";
import { baseurl } from "../Urls";
import Sidebar from "../components/Sidebar";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import the CSS

const Employees = () => {
  const [tableItems, setTableItems] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [metrics, setMetrics] = useState({
    averageSalary: 0,
    numberOfEmployees: 0,
    totalSalary: 0,
  });
  const { isAuthenticated, logout } = useContext(AuthContext);

  useEffect(() => {
    const fetchEmployees = async () => {
      setLoading(true);
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get(`${baseurl}/api/employees`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const employees = response.data;
        setTableItems(employees);

        // Calculate metrics
        const numberOfEmployees = employees.length;
        const totalSalary = employees.reduce((acc, emp) => acc + emp.salary, 0);
        const averageSalary =
          numberOfEmployees > 0 ? totalSalary / numberOfEmployees : 0;

        setMetrics({
          averageSalary: averageSalary.toFixed(2),
          numberOfEmployees,
          totalSalary: totalSalary.toFixed(2),
        });
      } catch (error) {
        console.log(error);
        setError("Failed to fetch employees");
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${baseurl}/api/employees/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Employee deleted successfully!");

      setTableItems(tableItems.filter((item) => item._id !== id));
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete employee");
      setError("Failed to delete employee");
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-10 ml-64">
        {/* Add margin to make space for the sidebar */}
        <div className="max-w-screen-xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12">
            <div className="bg-gradient-to-r from-green-400 to-teal-400 p-6 rounded-lg shadow-lg border border-gray-200">
              <h4 className="text-lg font-semibold text-white">
                Average Salary
              </h4>
              <p className="text-2xl font-bold text-white">
                ${metrics.averageSalary}
              </p>
            </div>
            <div className="bg-gradient-to-r from-blue-400 to-indigo-400 p-6 rounded-lg shadow-lg border border-gray-200">
              <h4 className="text-lg font-semibold text-white">
                Number of Employees
              </h4>
              <p className="text-2xl font-bold text-white">
                {metrics.numberOfEmployees}
              </p>
            </div>
            <div className="bg-gradient-to-r from-purple-400 to-pink-400 p-6 rounded-lg shadow-lg border border-gray-200">
              <h4 className="text-lg font-semibold text-white">Total Salary</h4>
              <p className="text-2xl font-bold text-white">
                ${metrics.totalSalary}
              </p>
            </div>
          </div>

          {error && <div className="text-red-600 mt-4">{error}</div>}
          {loading ? (
            <div className="flex justify-center items-center mt-12">
              <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-600"></div>
            </div>
          ) : (
            <div className="mt-12 shadow-sm border rounded-lg overflow-x-auto">
              <table className="w-full table-auto text-sm text-left">
                <thead className="bg-gray-100 text-gray-700 font-medium border-b">
                  <tr>
                    <th className="py-3 px-6">Username</th>
                    <th className="py-3 px-6">Email</th>
                    <th className="py-3 px-6">Position</th>
                    <th className="py-3 px-6">Salary</th>
                    <th className="py-3 px-6"></th>
                  </tr>
                </thead>
                <tbody className="text-gray-600 divide-y">
                  {tableItems.map((item, idx) => (
                    <tr
                      key={idx}
                      className="hover:bg-gray-50 transition duration-150"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        {item.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {item.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {item.position}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        ${item.salary}
                      </td>
                      <td className="text-right px-6 whitespace-nowrap">
                        <a
                          href={`/editemployee/${item._id}`}
                          className="py-2 px-3 font-medium text-indigo-600 hover:text-indigo-500 duration-150 hover:bg-gray-100 rounded-lg"
                        >
                          Edit
                        </a>
                        <button
                          className="py-2 leading-none px-3 font-medium text-red-600 hover:text-red-500 duration-150 hover:bg-gray-100 rounded-lg"
                          onClick={() => handleDelete(item._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
      <ToastContainer /> {/* Include ToastContainer in your component tree */}
    </div>
  );
};

export default Employees;
