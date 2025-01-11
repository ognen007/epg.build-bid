import { ConstructionSection } from "./ConstructionSection";
import { PreConstructionSection } from "./PreConstructionSection";


export function ProjectWorkflowView() {
  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <PreConstructionSection />
      <ConstructionSection />
    </div>
  );
}