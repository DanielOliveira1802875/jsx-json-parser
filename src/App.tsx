import React, { useState, useEffect, useRef } from "react";

import { transformJSXToJSON } from "./utilities/JSXToJSONTransformer";
import { transformJSONToJSX } from "./utilities/JSONToJSXTransformer";
import JsonEditor from "./components/JsonEditor.tsx";

const App = () => {
  const [jsx, setJSX] = useState<string>(`
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h4">JSON to JSX</Typography>
      </Grid>
    </Grid>
  `);

  const [json, setJson] = useState(() => transformJSXToJSON(jsx));
  const [error, setError] = useState<unknown>();

  const preventJsonUpdate = useRef(false);
  const preventJsxUpdate = useRef(false);

  useEffect(() => {
    if (preventJsonUpdate.current) {
      preventJsonUpdate.current = false;
      return;
    }
    try {
      setJson(transformJSXToJSON(jsx));
      setError("");
    } catch (e: unknown) {
      setError(e);
    }
  }, [jsx]);

  useEffect(() => {
    if (preventJsxUpdate.current) {
      preventJsxUpdate.current = false;
      return;
    }
    try {
      setJSX(transformJSONToJSX(json));
      setError("");
    } catch (e) {
      setError(e);
    }
  }, [json]);

  const handleJSXChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    preventJsxUpdate.current = true;
    setJSX(e.target.value);
  };

  const handleJSONChange = (newJson: string) => {
    preventJsonUpdate.current = true;
    setJson(newJson);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        height: "100vh",
        width: "100vw",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          height: "100vh",
          width: "70vw",
        }}
      >
        <textarea
          value={jsx}
          onChange={handleJSXChange}
          style={{
            flex: 2,
            padding: "10px",
            fontSize: "12px",
            resize: "none",
          }}
        />
        <div style={{ flex: 3, width: "100%", overflow: "scroll" }}>
          <JsonEditor json={json} setJson={handleJSONChange} />
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          height: "100vh",
          width: "30vw",
        }}
      >
        <textarea
          value={error as string}
          style={{
            flex: 2,
            padding: "10px",
            fontSize: "12px",
            resize: "none",
          }}
          readOnly
        />
        <textarea
          value={JSON.stringify(json, null, 2)
            .replace(/\n/g, "\\n")
            .replace(/\t/g, "\\t")
            .replace(/"/g, '\\"')}
          style={{
            flex: 3,
            padding: "10px",
            fontSize: "12px",
            resize: "none",
          }}
          readOnly
        />
      </div>
    </div>
  );
};

export default App;
