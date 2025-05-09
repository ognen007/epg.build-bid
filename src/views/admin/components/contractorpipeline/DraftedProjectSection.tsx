import { Calendar, Forward } from 'lucide-react';
import { ProjectType } from '../../../../types/project';
import axios from 'axios'; // Import axios for making API calls
import { sendNotificationToUser } from '../../../../services/notificationEndpoints';
import { DraftedCardHolder } from '../../../../components/contractor/components/holders/DraftedCardHolder';
import { sendProjectToContractor } from '../../../../services/admin/contractorpipeline/contractorPipeline';

interface ProjectProposalsProps {
  proposals?: ProjectType[];
  fullName: any;
  contractorId: string;
}

export function DraftedProjectSection({ fullName, contractorId, proposals = [] }: ProjectProposalsProps) {
  // Filter proposals to only include projects with status "awaiting_approval"
  const filteredProposals = proposals.filter(
    (proposal) => proposal.status === 'awaiting_approval'
  );

  const handleSendToContractor = async (projectId: string) => {
    try {
      const response = await sendProjectToContractor(projectId);
      console.log('Project status updated successfully:', response);
      await sendNotificationToUser(contractorId, "Recieved Project", "You recieved a project");
      window.location.reload();
    } catch (error: any) {
      console.error('Failed to update project status:', error);
      alert(error.message || "Failed to send project.");
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold text-gray-900">Prospecting</h2>
      {filteredProposals.length === 0 ? (
        <DraftedCardHolder label='No Drafted Projects'/>
      ) : (
        <div className="grid gap-4">
          {filteredProposals.map((proposal) => (
            <div
              key={proposal.id}
              className={`bg-white rounded-lg shadow-sm p-6 ${
                proposal.highIntent === true ? 'border-l-[5px] border-red-500' : ''
              }`}
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">{proposal.name}</h3>
                  <p className="text-sm text-gray-600 mt-1">{proposal.description}</p>
                </div>
                <span className="text-lg font-semibold text-gray-900">
                  ${proposal.valuation?.toLocaleString()}
                </span>
              </div>

              <div className="flex items-center text-sm text-gray-500 mb-4">
                <Calendar className="h-4 w-4 mr-1" />
                Due {new Date(proposal.deadline).toLocaleDateString()}
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  className="flex items-center bg-orange-600 text-white text-sm font-medium py-2 px-4 rounded-lg hover:bg-orange-700 transition-colors duration-200"
                  onClick={() => handleSendToContractor(proposal.id)} // Trigger the API call
                >
                  <Forward className="h-4 w-4 mr-2" />
                  Send to Contractor
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
