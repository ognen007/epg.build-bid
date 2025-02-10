import React, { useState } from "react";
import { Handle, Position } from "@xyflow/react";
import axios from "axios";

export interface Contractor {
  id: string;
  fullName: string;
  email: string;
  companyName: string;
  specialty: string;
  estimatorId: string;
}

interface CustomInputNodeProps {
  data: {
    label: string;
    estimatorFullName: string;
    estimatorId: string;
    contractors: Contractor[];
    assignedContractors: Contractor[];
    onAssignContractor: (estimatorId: string, contractorId: string) => void;
  };
}

const CustomInputNode: React.FC<CustomInputNodeProps> = ({ data }) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const handleSelectContractor = async (contractor: Contractor) => {
    console.log(`Contractor selected: ${contractor.fullName}`);
    
    // Check if contractor.id and estimatorFullName are available
    if (!contractor.id || !data.estimatorFullName) {
      console.error("Contractor or Estimator Full Name is missing");
      return; // Return early if any required data is missing
    }
  
    try {
      console.log(`Sending PUT request to assign contractor ${contractor.id} to estimator ${data.estimatorFullName}`);
  
 
      console.log('PUT request response:');
      console.log(data.estimatorFullName, contractor.id)
  
      // After successfully assigning the contractor, trigger the callback to update the UI state
      await data.onAssignContractor(data.estimatorFullName, contractor.id);
  
      // Close the dropdown menu
      setShowDropdown(false);
    } catch (error) {
      console.error("Error assigning contractor:", error);
    }
  };
  
  
  return (
    <div className="p-4 rounded-2xl shadow-lg w-64 relative border border-gray-300 bg-white">
      {/* Display Estimator Full Name */}
      <p className="text-lg font-semibold text-black-800">{data.estimatorFullName}</p>

      {/* Display Assigned Contractors */}
      <div className="mt-2">
        {data.assignedContractors.length > 0 ? (
          data.assignedContractors.map((contractor) => (
            <p key={contractor.id} className="text-sm text-gray-800">
              {contractor.fullName}
            </p>
          ))
        ) : (
          <p className="text-sm text-gray-500">No assigned contractors</p>
        )}
      </div>

      {/* Add Contractor Button */}
      <button
        className="w-full mt-2 bg-gray-200 text-gray-700 py-1 rounded-md hover:bg-gray-300"
        onClick={() => setShowDropdown(!showDropdown)}
      >
        Assign Contractor
      </button>

      {/* Contractors Dropdown */}
      {showDropdown && data.contractors.length > 0 && (
        <ul className="absolute z-10 mt-1 max-h-40 w-full overflow-auto rounded-lg border border-gray-300 bg-white shadow-lg">
          {data.contractors.map((contractor) => (
            <li
              key={contractor.id}
              className="cursor-pointer px-4 py-2 hover:bg-orange-100"
              onClick={() => handleSelectContractor(contractor)} // Trigger PUT request when a contractor is selected
            >
              {contractor.fullName}
            </li>
          ))}
        </ul>
      )}

      {/* Flow Handles */}
      <Handle type="source" position={Position.Right} />
      <Handle type="target" position={Position.Left} />
    </div>
  );
};

export default CustomInputNode;
