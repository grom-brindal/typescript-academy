import React, { useState } from "react";
import Markdown from "./markdown";
import MCQ from "./MCQ"

export default function MCQMaker () {
  const [markdownSource, setMarkdownSource] = useState("");
  const [answersText, setAnswersText] = useState(["hellow world"]);
  const [solutionText, setSolutionText] = useState("This is the solution");
  const [promptText, setPromptText] = useState("This is the prompt");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [correctIndex, setCorrectIndex] = useState(0);
  //This sends the textinput to the correct place
  function setText(idx: number, payload: string) {
    if (idx == -1) {
      setSolutionText(payload);
    } else if (idx === -2) {
      setPromptText(payload);
    } else {
      let answers = [...answersText];
      answers[selectedIndex] = payload;
      setAnswersText(answers);
    }
  }

  function getText(idx: number) {
    switch (idx) {
      case -2:
        return promptText;
      case -1:
        return solutionText;
      default:
        return answersText[selectedIndex];
    }
  }

  return (
    <>
      <textarea
        style={{ backgroundColor: "black", width: 600 }}
        onChange={({ currentTarget }) => {
          setText(selectedIndex, currentTarget.value);
        }}
        value={getText(selectedIndex)}
      />
      <button
        onClick={() => {
          let answers = [...answersText];
          answers.splice(selectedIndex + 1, 0, "hello");
          setAnswersText(answers);
        }}
      >
        Make new ans
      </button>
      <div
        onClick={() => setSelectedIndex(-2)}
        className="px-1 py-1 text-gray-300"
      >
        <Markdown content={promptText} />
      </div>
      <div
        onClick={() => setSelectedIndex(-1)}
        className="bg-green-800 px-1 py-1 text-gray-300 flex flex-row"
      >
        <Markdown content={solutionText} />
      </div>
      {answersText.map((answer, index) => (
        <div
          key={index}
          onClick={() => setSelectedIndex(index)}
          className="flex flex-row"
        >
          <input
            type="checkbox"
            onChange={() => setCorrectIndex(index)}
            checked={index === correctIndex}
          />
          <Markdown content={answer} />
          <div
            onClick={() => {
              let answers = [...answersText];
              answers.splice(index, 1);
              setAnswersText(answers);
            }}
            className="ml-4 text-red-700"
          >
            X
          </div>
        </div>
      ))}
      <button onClick={()=> {navigator.clipboard.writeText(
        JSON.stringify({ promptText, solutionText, answersText, correctIndex })
      );}}>CLIP IT</button>
      <hr />
      <MCQ info={{ promptText, solutionText, answersText, correctIndex }} />
    </>
  );
};
