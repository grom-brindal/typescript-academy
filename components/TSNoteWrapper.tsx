import {FunctionComponent} from "react"

const TSNote: FunctionComponent = ({children})  => {
  return (
    <div className="pt-1 bg-blue-800">
      {children}
    </div>
  );
}

export default TSNote