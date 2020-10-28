import circleStyles from "./plusCircle.module.css";
import dropdownStyles from "./dropdown.module.css";
import useOnclickOutside from "react-cool-onclickoutside";
import { PlusModelFunc } from "../topBar";
import { useRef, useState, useEffect } from "react";
import { modelInfoType } from "../../editorContext";

type newFileButtonProps = { plusModel: PlusModelFunc };
export default function NewFileButton({ plusModel }: newFileButtonProps) {
  const [openMenu, setOpenMenu] = useState(false);
  const [input, setInput] = useState("");
  const [fileType, setFileType] = useState("typescript");
  const ref = useOnclickOutside(() => {
    setOpenMenu(false);
  });

  const createModelOnEnter = () => {
    let extension = fileType === "typescript" ? ".ts" : ".js";
    plusModel(
      input + extension,
      fileType as "typescript" | "javascript" | "json"
    );
  };
  return (
    <div className={dropdownStyles.dropdown} ref={ref}>
      <button
        onClick={() => setOpenMenu(true)}
        className={`${circleStyles.circle} ${circleStyles.plus}`}
      ></button>
      {openMenu && (
        <div className={dropdownStyles.dropdownContent}>
          <input
            autoFocus
            placeholder="type file name, press enter"
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                createModelOnEnter();
                setOpenMenu(false);
              }
            }}
          ></input>
          <select
            onChange={(e) => setFileType(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                createModelOnEnter();
                setOpenMenu(false);
              }
            }}
          >
            <option value="typescript">.ts</option>
            <option value="javascript">.js</option>
          </select>
        </div>
      )}
    </div>
  );
}
