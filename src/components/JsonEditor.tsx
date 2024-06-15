import React from "react";
import JSONInput from "react-json-editor-ajrm";
import locale from "react-json-editor-ajrm/locale/en";

interface JsonEditorProps {
  json: string;
  setJson: (json: string) => void;
}

const JsonEditor: React.FC<JsonEditorProps> = ({ json, setJson }) => {
  return (
    <div style={{ position: "relative" }}>
      <JSONInput
        width={"100%"}
        id="json-editor"
        placeholder={json}
        locale={locale}
        onBlur={(e) => setJson(e.jsObject)}
      />
    </div>
  );
};

export default JsonEditor;
