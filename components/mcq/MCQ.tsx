import React, { useState } from "react";
import Markdown from "./markdown";

type MCQType = {
  promptText: string;
  solutionText: string;
  answersText: string[];
  correctIndex: number
};
function MCQ({ info }: { info: MCQType }) {
  const { promptText: prompt, answersText: answers, solutionText: solution, correctIndex } = info;
  const [graded, setGraded] = useState(false)
  const [selectedIdx, setSelectedIdx] = useState(-1);
  function changeSelection(idx: number){
    if(idx !== selectedIdx) {
      setGraded(false)
      setSelectedIdx(idx)
    }
  }
  return (
    <div>
      <div className="container border-gray-500 border px-4 rounded-lg">
        <div className="py-2 mt-2 border-gray-800 border-b">
          <Markdown content={prompt} />
          {graded && (selectedIdx === correctIndex ? (
            <div className="bg-green-800 border-2 rounded-xl border-green-600 px-2 py-1 mt-2">
              <Markdown content={solution} />
            </div>)
            : 
            (<div className="bg-red-800 border-2 rounded-xl border-red-600 px-2 py-1 mt-2">
              <Markdown content="Incorrect" />
            </div>
          ))}
        </div>

        {answers.map((answer, index) => (
          <div
            key={index}
            className="flex flex-row items-center border-gray-800 border-b py-1"
          >
            {/* text-indigo-600 */}
            <input
              type="radio"
              className="form-radio mr-4"
              value={index}
              onChange={() => changeSelection(index)}
              checked={index === selectedIdx}
            ></input>
            <Markdown content={answer} />
          </div>
        ))}
      </div>
      <button
        className="bg-blue-800 hover:bg-blue-900 text-white font-bold py-1 px-4 mt-1 rounded"
        onClick={() => setGraded(true)}
      >
        Grade Problem
      </button>
    </div>
  );
}

export default MCQ;
