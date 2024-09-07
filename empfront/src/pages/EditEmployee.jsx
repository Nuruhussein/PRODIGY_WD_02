import React from "react";
import { useParams } from "react-router-dom";
import EditEmployeeForm from "../components/EditEmployeeForm";

const EditEmployee = () => {
  const { id } = useParams(); // Fetch the employee ID from the route parameters
  console.log(id);
  return (
    <div className="max-w-screen-xl mx-auto px-4 md:px-8">
      <div className="max-w-lg mx-auto">
        <h3 className="text-gray-800 text-xl font-bold sm:text-2xl">
          Edit Employee
        </h3>
        <p className="text-gray-600 mt-2">
          Update the details below to edit the employee.
        </p>
        <div className="mt-8">
          <EditEmployeeForm employeeId={id} />
        </div>
      </div>
    </div>
  );
};

export default EditEmployee;
