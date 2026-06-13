import DropZone from "./DropZone";
import JobDescription from "./JobDescription";
import Todo from "./Todo";
import AnalyzeButton from "./AnalyzeButton";
import { useState } from "react";
import ScoreCircle from "./ScoreCircle";
import KeywordAnalysis from "./KeywordAnalysis";
import useAnalyze from "../hooks/useAnalyze";
import picture from "../assets/image.png";

type View = "upload" | "result";
function Body() {
  const [view, setView] = useState<View>("upload");
  const [file, setFile] = useState<File | null>(null);
  const [errorCode, setErrorCode] = useState<number | null>(null);
  const [resumeText, setResumeText] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const mutation = useAnalyze();
  const canSubmit = Boolean((file || resumeText) && jobDescription);

  function onClick() {
    if (!canSubmit) {
      return;
    }
    const data = new FormData();
    if (file) {
      data.append("resume_file", file);
    }
    data.append("resume_text", resumeText);
    data.append("job_description", jobDescription);

    mutation.mutate(data, {
      onSuccess: () => setView("result"), // ← switches view when done
      onError: (error) => {
        setView("result");
        console.log(error.status);
        if (error.status) {
          setErrorCode(error.status);
        }
      },
    });
  }

  return (
    <>
      <main className=" flex flex-col overflow-hidden p-8 pt-6 bg-slate-50">
        <Tabs view={view} setView={setView} />
        {view == "upload" ? (
          <>
            <Description />

            <div className="flex flex-1 flex-col md:flex-row min-h-0 gap-6 ">
              <DropZone
                setResume={setFile}
                setResumeText={setResumeText}
                resumeText={resumeText}
              />
              <JobDescription
                jobDescription={jobDescription}
                setJobDescription={setJobDescription}
              />
            </div>
            <AnalyzeButton
              mutation={mutation}
              canSubmit={canSubmit}
              onClick={onClick}
            />
          </>
        ) : (
          <>
            {mutation.isSuccess ? (
              <AnalysisComplete data={mutation.data} />
            ) : mutation.isError ? (
              <AnanlysIsNotComplete
                text="Sorry we had an issue analysing the resume and job description."
                setView={setView}
                errorCode={errorCode}
              />
            ) : (
              <AnanlysIsNotComplete
                text="Please upload resume and job description to see the results"
                setView={setView}
                errorCode={errorCode}
              />
            )}
          </>
        )}
      </main>
    </>
  );
}

interface AnanlysIsNotCompleteInterface {
  text: string;
  setView: (arg0: View) => void;
  errorCode: number | null;
}
function AnanlysIsNotComplete({
  text,
  setView,
  errorCode,
}: AnanlysIsNotCompleteInterface) {
  return (
    <>
      <div className="bg-slate-50 h-screen m-8 rounded-2xl ">
        <div className=" flex flex-1 items-center justify-center m-0 p-0 ">
          <img
            src={picture}
            alt="File logo"
            className="w-100 h-100 object-contain"
          />
        </div>
        <div className=" flex flex-1 items-center justify-center ">
          <span className="font-bold text-2xl  ">
            {errorCode === 429 ? "Limit Reached" : "Missing Information"}
          </span>
        </div>
        <div className=" flex flex-1 items-center justify-center text-center m-4">
          <span className=" text-sm  text-slate-500 text-center">
            {" "}
            {errorCode === 429
              ? "You have reached the limit of analysis made. Please try again later"
              : text}
          </span>
        </div>
        <div className="flex flex-1 justify-center m-8">
          <button
            onClick={() => setView("upload")}
            className="bg-indigo-500 p-4 rounded-2xl text-white font-bold hover:bg-indigo-300  active:scale-95"
          >
            Upload
          </button>
        </div>
      </div>
    </>
  );
}
function AnalysisComplete({ data }: any) {
  console.log(data);
  return (
    <>
      <div className="flex flex-col flex-1">
        <div className=" flex items-center justify-center">
          <span className=" tracking-wide font-manrope flex items-center justify-center  text-xs bg-indigo-100 px-3 py-1 rounded-full m-8 font-bold text-indigo-600 uppercase">
            analysis complete
          </span>
        </div>
        <div className=" flex items-center justify-center">
          <span className=" font-manrope flex items-center justify-center  text-4xl font-bold ">
            Results
          </span>
        </div>
        <ScoreCircle score={data.score} />
        <div className="flex justify-center align-middle items-center">
          <span className=" font-manrope font-medium leading-relaxed text-slate-600 text-center max-w-xl mx-auto mt-2 mb-12 text-xs">
            {data.summary}
          </span>
        </div>
        <div className="md:flex  gap-6 px-4 w-full max-w-5xl mx-auto">
          <KeywordAnalysis data={data} />
          <Todo data={data} />
        </div>
      </div>
    </>
  );
}
function Description() {
  return (
    <div className="mt-8">
      <span className="text-4xl font-bold block">New Analysis</span>
      <span className=" block text-lg font-normal text-[#475569] leading-relaxed mt-2">
        Upload your resume and job description to see if they match!
      </span>
    </div>
  );
}

function Tabs({
  view,
  setView,
}: {
  view: View;
  setView: (view: View) => void;
}) {
  return (
    <>
      <div className="flex items-center border-b-2 border-slate-100 gap-8">
        <button
          className={`font-manrope text-sm font-semibold tracking-tight pb-4 -mb-px transition-all duration-200 ${view == "upload" ? "text-indigo-600 border-b-2 border-indigo-600" : "text-slate-400 border-b-2 border-transparent hover:text-slate-600"} hover:font-bold`}
          onClick={() => {
            setView("upload");
          }}
        >
          1. Upload
        </button>
        <button
          className={`font-manrope text-sm font-semibold tracking-tight pb-4 -mb-px transition-all duration-200 ${view == "result" ? "text-indigo-600 border-b-2 border-indigo-600" : "text-slate-400 border-b-2 border-transparent hover:text-slate-600"} hover:font-bold`}
          onClick={() => {
            setView("result");
          }}
        >
          2. Result
        </button>
      </div>
    </>
  );
}

export default Body;
