import { useEffect, useState, Dispatch, SetStateAction } from "react";
import MonacoEditor from "./monacoEditor";
// import dynamic from "next/dynamic";
// let MonacoEditor = dynamic(() => import("./monacoEditor"), { ssr: false });
import { EditorProvider, modelInfoType, modelsInfoType } from "./editorContext";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

export default function Editor({
  id,
  modelsInfo,
  onSuccess,
  onFailure,
  submissionCount,
}: {
  id: string;
  modelsInfo: modelsInfoType;
  onSuccess?: Dispatch<SetStateAction<number>>;
  onFailure?: Function;
  submissionCount?: number;
}) {
  return (
    <DndProvider backend={HTML5Backend}>
      <EditorProvider>
        <MonacoEditor
          submissionCount={submissionCount}
          onSuccess={onSuccess}
          onFailure={onFailure}
          id={id}
          modelsInfo={modelsInfo}
        />
      </EditorProvider>
    </DndProvider>
  );
}
