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
import runFile, { runTestFile } from "./utils/runFile";
import useCtrlRunFile from "./hooks/useCtrlRunFile"
import dynamic from "next/dynamic";
const ConsoleLog = dynamic(() => import("./consoleLog"), {
  ssr: false,
});

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
  const [ctrlCounter, setControlCounter] =  useState(0)
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
      //Trigger useEffect with the control counter
      editor.addCommand(
        monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter,
        () => setControlCounter(count => count + 1)
      );
      monaco.languages.typescript.typescriptDefaults.setEagerModelSync(true);
      let options = monaco.languages.typescript.javascriptDefaults.getCompilerOptions();
      monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
        ...options,
        strict: true,
        allowJs: true,
      });
    });
  };

  //Gets triggered on ctrl+enter, hack to avoid getting trapped in closures.
  useEffect(() => {
    if(ctrlCounter > 0){
      runFile(id, monacoInstance, models, selectedIdx, setConsoleMessages)
    }
  }, [ctrlCounter])

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
            loading={
              <div
                style={{
                  backgroundColor: "#1E1E1E",
                  color: "#919191",
                  paddingBottom: "10px",
                  width: "100%",
                  textAlign: "center",
                }}
              >
                Loading...
              </div>
            }
          />
        </div>
        <div style={{ backgroundColor: "#242424" }}>
          {ConsoleLog && (
            <ConsoleLog
              onSuccess={onSuccess}
              onFailure={onFailure}
              editorId={id}
            ></ConsoleLog>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
