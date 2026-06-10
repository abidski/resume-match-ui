import { FileUp, FileText, XCircle, CheckCircle } from "lucide-react";
import { useState, useRef } from "react";
import { type DragEvent } from "react";

interface DropZoneProp {
  setResume: (file: File | null) => void;
  setResumeText: (text: string) => void;
  resumeText: string;
}

function DropZone({ setResume, setResumeText, resumeText }: DropZoneProp) {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const FILE_TYPES = ["application/pdf", "text/plain"];

  function handleBrowse() {
    inputRef.current?.click();
  }
  function onDragOver(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setIsDragging(true);
  }

  function onDragLeave(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setIsDragging(false);
  }
  function checkFile(file: File) {
    console.log(file);
    if (!FILE_TYPES.includes(file.type)) {
      setError("Wrong file type");
      return;
    }

    if (file.size > 10000000) {
      setError("file too big");
      return;
    }

    setError(null);
    setFile(file);
    setResume(file);
  }

  function onDrop(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setIsDragging(false);

    if (!e.dataTransfer.files[0]) {
      setError("File not found");
      return;
    }

    const droppedFile = e.dataTransfer.files[0];
    console.log(droppedFile);

    checkFile(droppedFile);
  }
  return (
    <>
      <div className="mt-8 w-full flex flex-col flex-1 min-h-0">
        <div className="flex">
          <FileText className="text-indigo-600" />
          <p className="text-xl mb-4 pl-3 font-bold">Upload Resume</p>
        </div>
        <div className=" bg-white border border-slate-100 shadow-sm w-full rounded-2xl p-8 flex flex-col flex-1 ">
          <input
            className="hidden"
            ref={inputRef}
            type="file"
            onChange={(e) => {
              const picked = e.target.files?.[0];
              if (picked) checkFile(picked);
            }}
          />
          <div
            className={`flex flex-col items-center justify-center text-center mb-2 border-2 border-dashed  p-12 flex-1 rounded-2xl
            ${
              isDragging
                ? "border-indigo-400 bg-indigo-50"
                : file
                  ? "border-green-300 bg-green-50"
                  : error
                    ? "border-red-300 bg-red-50"
                    : "border-slate-300 bg-slate-50"
            }`}
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
            onDrop={onDrop}
          >
            {file ? (
              <DropZoneAccepted file={file} handleBrowse={handleBrowse} />
            ) : error ? (
              <DropZoneError errorMessage={error} handleBrowse={handleBrowse} />
            ) : (
              <DropZoneDefault handleBrowse={handleBrowse} />
            )}
          </div>

          <div className="flex items-center gap-3">
            <div className=" h-px bg-gray-200 w-1/4 flex-1" />
            <span className="m-3 font-bold text-xs text-slate-400">
              OR PASTE TEXT
            </span>
            <div className=" h-px bg-gray-200 w-1/4 flex-1" />
          </div>

          <textarea
            placeholder="Paste your resume ..."
            className=" resize-none m-3 font-normal text-s text-slate-400 border border-slate-100 rounded-2xl bg-slate-50 flex-1 p-4"
            value={resumeText}
            onChange={(e) => setResumeText(e.target.value)}
          ></textarea>
        </div>
      </div>
    </>
  );
}

function DropZoneAccepted({
  file,
  handleBrowse,
}: {
  file: File;
  handleBrowse: () => void;
}) {
  return (
    <>
      <div className="flex w-12 h-12 rounded-xl items-center justify-center text-center bg-indigo-100 m-3">
        <CheckCircle className="text-green-400" />
      </div>
      <span className="font-bold text-lg text-green-500">{file.name}</span>
      <span className="text-slate-500 text-sm mt-1">PDF up to 10MB</span>
      <button
        className=" mt-3 border border-slate-200 font-semibold py-2 px-4 text-indigo-600 rounded-2xl hover:bg-slate-100 transition-colors shadow-sm  duration-200 active:scale-[0.98]"
        onClick={handleBrowse}
      >
        Browse Files
      </button>
    </>
  );
}
function DropZoneError({
  errorMessage,
  handleBrowse,
}: {
  errorMessage: string;
  handleBrowse: () => void;
}) {
  return (
    <>
      <div className="flex w-12 h-12 rounded-xl items-center justify-center text-center bg-indigo-100 m-3">
        <XCircle className="text-red-400" />
      </div>
      <span className="font-bold text-lg text-red-500">{errorMessage}</span>
      <span className="text-slate-500 text-sm mt-1">PDF, DOCX up to 10MB</span>
      <button
        className=" mt-3 border border-slate-200 font-semibold py-2 px-4 text-indigo-600 rounded-2xl hover:bg-slate-100 transition-colors shadow-sm  duration-200 active:scale-[0.98]"
        onClick={handleBrowse}
      >
        Browse Files
      </button>
    </>
  );
}
function DropZoneDefault({ handleBrowse }: { handleBrowse: () => void }) {
  return (
    <>
      <div className="flex w-12 h-12 rounded-xl items-center justify-center text-center bg-indigo-100 m-3">
        <FileUp className="text-indigo-600" />
      </div>
      <span className="font-bold text-lg text-slate-500">
        Drag and Drop resume here
      </span>
      <span className="text-slate-500 text-sm mt-1">PDF, DOCX up to 10MB</span>
      <button
        className=" mt-3 border border-slate-200 font-semibold py-2 px-4 text-indigo-600 rounded-2xl hover:bg-slate-100 transition-colors shadow-sm  duration-200 active:scale-[0.98] "
        onClick={handleBrowse}
      >
        Browse Files
      </button>
    </>
  );
}

export default DropZone;
