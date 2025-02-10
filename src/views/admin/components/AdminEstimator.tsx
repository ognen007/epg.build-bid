import { useCallback, useEffect, useState } from 'react';
import {
  ReactFlow,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  BackgroundVariant,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import CustomInputNode from './CustomInputNode';
import { Contractor } from './CustomInputNode';
import axios from 'axios';

const nodeTypes = { customInputNode: CustomInputNode };

export const AdminEstimator = () => {
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [estimatorDetails, setEstimatorDetails] = useState([]);
  const [contractors, setContractors] = useState<Contractor[]>([]);
  const [assignedContractors, setAssignedContractors] = useState<Contractor[]>([]);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);

  const onConnect = useCallback(
    (params: any) => setEdges((eds): any => addEdge(params, eds)),
    [setEdges]
  );

  // Fetch estimator details
  useEffect(() => {
    const fetchEstimators = async () => {
      try {
        const response = await fetch('https://epg-backend.onrender.com/api/admin/assign-estimator/estimators');
        const data = await response.json();
        setEstimatorDetails(data);
  
        if (contractors.length > 0) {
          const generatedNodes = data.map((estimator: any, index: number) => ({
            id: `${estimator.id}`,
            type: 'customInputNode',
            position: { x: 250, y: 100 + index * 150 },
            data: {
              label: estimator.fullName,
              estimatorFullName: estimator.fullName, // Add estimatorFullName here
              estimatorId: estimator.id,
              contractors: contractors,
              assignedContractors: assignedContractors.filter(c => c.estimatorId === estimator.id),
              onAssignContractor: (estimatorId: string, contractorId: string) => {
                console.log(`Assigning contractor ${contractorId} to estimator ${estimatorId}`);
                assignEstimator(contractorId, estimator.fullName); // Pass estimatorFullName to the function
              },
            },
          }));
          
          setNodes(generatedNodes);
        }
      } catch (error) {
        console.error("Error fetching estimators:", error);
      }
    };
  
    fetchEstimators();
  }, [contractors, assignedContractors]);

  // Fetch Contractors without Estimator
  useEffect(() => {
    const fetchContractors = async () => {
      try {
        const response = await fetch('https://epg-backend.onrender.com/api/admin/assign-estimator/contractors/no-estimator');
        const data = await response.json();

        const formattedContractors = data.map((contractor: any) => ({
          id: contractor._id,
          fullName: contractor.fullName,
          email: contractor.email,
          companyName: contractor.companyName,
          specialty: contractor.specialty,
        }));

        setContractors(formattedContractors);
      } catch (error) {
        console.error("Error fetching contractors:", error);
      }
    };

    fetchContractors();
  }, []);

  useEffect(() => {
    const fetchAssignedContractors = async () => {
      try {
        const assignedEstimator = estimatorDetails.id; // Replace with actual estimator ID
        const response = await axios.get(
          `https://epg-backend.onrender.com/api/admin/assign-estimator/contractors/assigned-estimator/${assignedEstimator}`
        );

        const formattedEstimatorContractors = response.data.map((contractor: any) => ({
          id: contractor.id,
          fullName: contractor.fullName,
          email: contractor.email,
          companyName: contractor.companyName,
          specialty: contractor.specialty,
        }));

        setAssignedContractors(formattedEstimatorContractors);
      } catch (err) {
        console.error("Error fetching assigned contractors:", err);
      }
    };

    fetchAssignedContractors();
  }, []);

  // Assign Estimator to Contractor
  const assignEstimator = async ( contractorId: string, fullName: any) => {
    console.log(`Sending PUT request to assign estimator ${fullName} to contractor ${contractorId}`);
     // Send PUT request to assign the contractor to the estimator

    try {
      const response = await axios.put(
        `https://epg-backend.onrender.com/api/admin/assign-estimator/assign-estimator/${fullName}/${contractorId}`,
        {
          assignedEstimator: fullName, // Send the estimatorFullName as assignedEstimator
        }
      )
      console.log('PUT request response:', response);

      // Remove contractor from available list and add to assigned contractors
      setContractors((prev) =>
        prev.filter((contractor) => contractor.id !== contractorId)
      );

      setAssignedContractors((prev) => [...prev, response.data]);
    } catch (error) {
      console.error("Error assigning estimator:", error);
    }
  };

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
      >
        <Controls />
        <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
      </ReactFlow>
    </div>
  );
};
