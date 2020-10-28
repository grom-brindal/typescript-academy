import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { Console, Hook, Unhook } from "console-feed";
import { useConsoleMessages } from "./editorContext";

const LogsContainer = ({
  editorId,
  onSuccess,
  onFailure,
}: {
  editorId: string;
  onSuccess?: Dispatch<SetStateAction<number>>;
  onFailure?: Function;
}) => {
  const [logs, setLogs] = useConsoleMessages();
  const [debounceLogs, setDebounceLogs] = useState<any[]>([]);

  // run once!
  useEffect(() => {
    if (editorId === "3") {
      console.log("ons", onSuccess);
    }
    Hook(
      window.console,
      (log) => {
        // if (editorId === "3") {
        //   console.log("ons", onSuccess);
        // }
        // console.log("ons", onSuccess);
        if (log.data?.pop() === editorId) {
          //Problem completion determined by logs. How else?
          let lastItem = log.data?.slice(-1)[0];
          if (lastItem === "Problem solved") {
            onSuccess?.((count) => count + 1);
          }
          if (
            log.method === "error" &&
            typeof lastItem === "object" &&
            lastItem !== null &&
            "expected" in lastItem &&
            "returned" in lastItem
          ) {
            onFailure?.();
          }
          setLogs((logs: any) => [...logs, log]);
        }
      },
      false
    );
    return () => {
      Unhook(window.console as any);
    };
    //dependencies prevent stale
  }, [onSuccess, onFailure]);

  //Displayed logs are debounce of actual logs to prevent jerkiness.
  useEffect(
    //https://dev.to/gabe_ragland/debouncing-with-react-hooks-jci
    () => {
      // Set debouncedValue to value (passed in) after the specified delay
      const handler = setTimeout(() => {
        setDebounceLogs(logs);
      }, 50);

      return () => {
        clearTimeout(handler);
      };
    },
    // Only re-call effect if value changes
    // You could also add the "delay" var to inputs array if you ...
    // ... need to be able to change that dynamically.
    [logs]
  );

  return (
    <div style={{ backgroundColor: "#242424" }}>
      <Console
        logs={debounceLogs as any[]}
        styles={{ BASE_FONT_SIZE: 13 }}
        variant="dark"
      />
    </div>
  );
};

export default LogsContainer;
