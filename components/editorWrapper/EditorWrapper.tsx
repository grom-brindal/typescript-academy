import { useState, useEffect } from "react";
import Editor from "../editor/Editor";
import { modelsInfoType } from "../editor/editorContext";
import ErrorIcon from "@material-ui/icons/Error";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";

function CompletionDisplay({completed}: {completed: boolean}) {
  if (!completed) {
    return (
      <div className="flex-row align-middle mt-2">
        <ErrorIcon className="ml-2" style={{ color: "DarkRed" }}></ErrorIcon>
        <span className="ml-3 mt-12 text-red-600">Problem not solved</span>
      </div>
    );
  } else {
    return (
      <div className="flex-row align-middle mt-2">
        <CheckCircleIcon className="ml-2" style={{ color: "green" }} />
        <span className="ml-3 mt-12 text-green-600">Problem solved!</span>
      </div>
    );
  }
}

export default function EditorWrapper({
  id,
  modelsInfo,
}: {
  id: string;
  modelsInfo: modelsInfoType;
}) {
  //changes in submissionCount trigger function call to runTest in Editor
  const [submissionCount, setSubmissionCount] = useState(0);
  //successCount triggers effect in parent. I wonder what the best pattern for this is?
  const [successCount, setSuccessCount] = useState(0);
  return (
    <div>
      <Editor
        submissionCount={submissionCount}
        id={id}
        modelsInfo={modelsInfo}
        onSuccess={setSuccessCount}
      />
      <div className="flex-row flex align-middle">
        <button
          className="bg-blue-800 hover:bg-blue-900 text-white font-bold py-1 px-4 mt-1 rounded"
          onClick={() => setSubmissionCount((count) => count + 1)}
        >
          Grade Problem
        </button>
        <CompletionDisplay completed={successCount > 0}/>
      </div>
    </div>
  );
}
