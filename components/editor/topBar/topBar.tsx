import { useEffect, useState } from "react";
import {
  useEditor,
  useModels,
  useModelIndex,
  useMonaco,
  modelInfoType,
  modelsInfoType,
} from "../editorContext";
import PlayButton from "./rightButtons";
import styles from "./topBar.module.css";
import Tab from "./tab";
import NewFileButton from "./plusNewFile/plusNewFile";
import { addNewModel, setModelsFromInfo } from "../mountFunctions";
type TopBarProps = {
  editorId: string;
  modelsInfo: modelsInfoType;
};

export type PlusModelFunc = (
  filename: string,
  language: "javascript" | "typescript" | "json"
) => void;

export default function TopBar({ editorId, modelsInfo }: TopBarProps) {
  const [models, setModels] = useModels();
  const [ctxEditor, setCtxEditor] = useEditor();
  const [selectedIdx, setSelectedIdx] = useModelIndex();
  const [monaco, setMonaco] = useMonaco();

  //curry function adding from mount
  const plusModel = (
    filename: string,
    language: "javascript" | "typescript" | "json"
  ) =>
    addNewModel(
      {
        isInitial: true,
        isShown: true,
        isReadOnly: false,
        value: "",
        isTested: false,
        filename,
        language,
      },
      models!.length,
      monaco!,
      ctxEditor!,
      setModels,
      setSelectedIdx
    );

  function dragTabMove(draggedIdx: number, draggedToIdx: number) {
    if (models) {
      let newModels = [...models];
      //drag left
      if (draggedIdx > draggedToIdx) {
        newModels.splice(draggedToIdx, 0, models[draggedIdx]);
        newModels.splice(draggedIdx + 1, 1);
      } else {
        //drag right
        newModels.splice(draggedToIdx + 1, 0, models[draggedIdx]);
        newModels.splice(draggedIdx, 1);
      }
      setModels(newModels);
      setSelectedIdx(draggedToIdx);
    }
  }

  function deleteTab(index: number) {
    if (models) {
      let newModels = [...models];
      newModels.splice(index, 1);
      setModels(newModels);
    }
  }
  //if model is readonly make editor readonly
  //Since this code could go anywhere should I extract a custom hook?
  useEffect(() => {
    if (ctxEditor && models && selectedIdx !== undefined) {
      ctxEditor.updateOptions({ readOnly: models[selectedIdx].isReadOnly });
    }
  }, [selectedIdx]);

  return (
    <div className={styles.bar}>
      {models &&
        models
          .filter((model) => model.isShown)
          .map((model, index) => (
            <Tab
              key={index}
              model={model}
              index={index}
              dragTabMove={dragTabMove}
              deleteTab={deleteTab}
            />
          ))}
      <NewFileButton plusModel={plusModel} />
      <PlayButton modelsInfo={modelsInfo} editorId={editorId} />
    </div>
  );
}
