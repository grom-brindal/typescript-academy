import React, {
  useState,
  useCallback,
  useEffect,
  Dispatch,
  SetStateAction,
} from "react";
import Editor, { monaco, Monaco } from "@monaco-editor/react";
import monacoForType, { editor } from "monaco-editor";
import {
  useEditor,
  useMonaco,
  useModels,
  useModelIndex,
  useConsoleMessages,
  modelsType,
  modelInfoType,
  modelType,
} from "./editorContext";
import TopBar from "./topBar/topBar";
import {
  setDynamicHeight,
  setModelsFromInfo,
  setTheme,
  setRunnerModel,
} from "./mountFunctions";
import { runTestFile } from "./utils/runFile";
import dynamic from "next/dynamic";
let ConsoleLog = dynamic(() => import("./consoleLog"), { ssr: false });

type MonacoEditorProps = {
  id: string;
  modelsInfo: modelInfoType[];
  submissionCount?: number;
  onSuccess?: Dispatch<SetStateAction<number>>;
  onFailure?: Function;
};

function App({
  id,
  modelsInfo,
  submissionCount,
  onSuccess,
  onFailure,
}: MonacoEditorProps) {
  const [height, setHeight] = useState(20);
  const [monacoInstance, setMonacoInstance] = useMonaco();
  const [selectedIdx, setSelectedIdx] = useModelIndex();
  const [models, setModels] = useModels();
  const [ctxEditor, setCtxEditor] = useEditor();
  const [consoleMessages, setConsoleMessages] = useConsoleMessages();
  const editorCallbackRef = useCallback((ref: editor.IStandaloneCodeEditor) => {
    setCtxEditor(ref);
  }, []);
  const handleEditorDidMount = (
    _valueGetter: () => string,
    editor: editor.IStandaloneCodeEditor
  ) => {
    monaco.init().then((monaco) => {
      setDynamicHeight(editor, setHeight);
      setTheme(monaco);
      setMonacoInstance(monaco);
      editorCallbackRef(editor);
      setModelsFromInfo(modelsInfo, monaco, editor, setModels, setSelectedIdx);
      setRunnerModel(monaco, setModels);

      let options = monaco.languages.typescript.javascriptDefaults.getCompilerOptions();
      monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
        ...options,
        strict: true,
        allowJs: true,
      });
    });
  };

  //Run tests when submission count increases//
  useEffect(() => {
    if (typeof submissionCount !== "undefined") {
      const runTests = async () => {
        await runTestFile(id, monacoInstance, models, setConsoleMessages);
      };
      //do not run on mount
      if (submissionCount !== 0) {
        runTests();
      }
    }
  }, [submissionCount]);

  return (
    <>
      <div>
        <TopBar editorId={id} modelsInfo={modelsInfo}></TopBar>
        <div style={{ height }}>
          <Editor
            options={{
              scrollBeyondLastLine: false,
              minimap: {
                enabled: false,
              },
              overviewRulerLanes: 0,
              scrollbar: {
                alwaysConsumeMouseWheel: false,
              },
              wordWrap: "on",
              wrappingStrategy: "advanced",
            }}
            editorDidMount={handleEditorDidMount}
            language="typescript"
          />
        </div>
        <div style={{ backgroundColor: "#242424" }}>
          <ConsoleLog
            onSuccess={onSuccess}
            onFailure={onFailure}
            editorId={id}
          ></ConsoleLog>
        </div>
      </div>
    </>
  );
}

export default App;