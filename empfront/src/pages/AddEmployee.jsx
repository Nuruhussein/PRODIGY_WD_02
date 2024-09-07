import React, { useState } from "react";
import AddEmployeeForm from "../components/AddEmployeeForm";
import axios from "axios";
import { baseurl } from "../Urls";
const AddEmployee = () => {
  const [employees, setEmployees] = useState([]);

  const handleAddEmployee = (newEmployee) => {
    setEmployees([...employees, newEmployee]);
  };

  return (
    <div className="max-w-screen-xl h-screen mx-auto flex flex-col justify-center items-center px-4 md:px-8">
      <div className="max-w-lg mx-auto">
        <h3 className="text-gray-800 text-xl font-bold sm:text-2xl">
          Add New Employee
        </h3>
        <p className="text-gray-600 mt-2">
          Fill out the form below to add a new employee.
        </p>
        <div className="mt-8">
          <AddEmployeeForm onAdd={handleAddEmployee} />
        </div>
      </div>
    </div>
  );
};

export default AddEmployee;
