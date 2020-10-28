import { useEffect } from "react";
import { useEditor, useModels, useModelIndex } from "../editorContext";
import { modelType, modelsType } from "../editorContext";
import styles from "./topBar.module.css";
import LanguageIcon from "./languageIcon";
import { useDrag, useDrop } from "react-dnd";

type TabProps = {
  model: modelType;
  index: number;
  dragTabMove: (draggedIdx: number, draggedToIdx: number) => void;
  deleteTab: (index: number) => void;
};
type DragTabItem = {
  type: string;
  index: number;
};
export default function Tab({
  model,
  index,
  dragTabMove,
  deleteTab,
}: TabProps) {
  const [selectedIdx, setSelectedIdx] = useModelIndex();
  const [ctxEditor, setCtxEditor] = useEditor();
  const [{ isDragging }, drag] = useDrag({
    item: { type: "moveIdx", index },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });
  const [{ isOver }, drop] = useDrop({
    accept: "moveIdx",
    drop: (item: DragTabItem) => {
      dragTabMove(item.index, index);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  return (
    <span ref={drag}>
      <span
        onMouseDown={() => {
          setSelectedIdx(index);
          ctxEditor?.setModel(model.model);
        }}
        className={styles.tab}
        key={index}
        ref={drop}
        style={{
          backgroundColor:
            selectedIdx === index ? "#1D2021" : isOver ? "#4F4F4F" : "#2d3233",
        }}
      >
        <LanguageIcon language={model.language} />
        <span>{model.model.uri.path.substring(1)}</span>
        <span className={styles.delete} onClick={() => deleteTab(index)}>
          x
        </span>
      </span>
    </span>
  );
}
