import React, { useState, useEffect, useRef } from "react";
import JsonEditor from "./components/JsonEditor";
import { transformJSXToJSON } from "./utilities/JSXToJSONTransformer";
import { transformJSONToJSX } from "./utilities/JSONToJSXTransformer";

const App: React.FC = () => {
  const [jsx, setJSX] = useState<string>(`
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h1">Hello World</Typography>
      </Grid>
    </Grid>
  `);

  const [json, setJson] = useState(() => transformJSXToJSON(jsx));
  const [error, setError] = useState<unknown>();

  const preventJsonUpdate = useRef(false);
  const preventJsxUpdate = useRef(false);

  useEffect(() => {
    try {
      if (preventJsonUpdate.current) {
        preventJsonUpdate.current = false;
        return;
      }
      preventJsxUpdate.current = true;
      setJson(transformJSXToJSON(jsx));
      setError("");
    } catch (e: unknown) {
      preventJsxUpdate.current = false;
      setError(e);
    }
  }, [jsx]);

  useEffect(() => {
    try {
      if (preventJsxUpdate.current) {
        preventJsxUpdate.current = false;
        return;
      }
      preventJsonUpdate.current = true;
      setJSX(transformJSONToJSX(json));
      setError("");
    } catch (e) {
      preventJsonUpdate.current = false;
      setError(e);
    }
  }, [json]);

  const handleJSXChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setJSX(e.target.value);
  };

  const handleJSONChange = (newJson: string) => {
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
          style={{ flex: 2, padding: "10px", fontSize: "12px" }}
        />
        <div style={{ flex: 3, width: "100%", overflow: "scroll" }}>
          <JsonEditor
            key={Math.random()}
            json={json}
            setJson={handleJSONChange}
          />
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
          style={{ flex: 1, padding: "10px", fontSize: "16px" }}
          readOnly
        />
      </div>
    </div>
  );
};

export default App;
