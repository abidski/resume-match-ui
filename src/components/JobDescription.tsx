import { BriefcaseBusiness } from "lucide-react";
interface JobDescriptionProps {
  jobDescription: string;
  setJobDescription: (text: string) => void;
}
function JobDescription({
  jobDescription,
  setJobDescription,
}: JobDescriptionProps) {
  return (
    <>
      <div className="mt-8 h-auto w-full min-h-0 flex flex-col flex-1">
        <div className="flex">
          <BriefcaseBusiness className="text-indigo-600" />
          <p className="text-xl mb-4 pl-3 font-bold">Job Description</p>
        </div>
        <div className=" bg-white border border-slate-100 shadow-sm w-full flex-1 rounded-2xl p-8 flex flex-col ">
          <textarea
            placeholder="Paste job description here ..."
            className="h-110 mb-8 resize-none m-3 font-normal text-s text-slate-400 border border-slate-100 rounded-2xl bg-slate-50 flex-1 p-4 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
          ></textarea>
          <div className="flex items-center">
            <div className=" h-px bg-gray-200 w-1/4 flex-1" />
          </div>
        </div>
      </div>
    </>
  );
}

export default JobDescription;
