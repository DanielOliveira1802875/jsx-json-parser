import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect, useRef } from "react";
import JsonEditor from "./components/JsonEditor";
import { transformJSXToJSON } from "./utilities/JSXToJSONTransformer";
import { transformJSONToJSX } from "./utilities/JSONToJSXTransformer";
const App = () => {
    const [jsx, setJSX] = useState(`
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h1">Hello World</Typography>
      </Grid>
    </Grid>
  `);
    const [json, setJson] = useState(() => transformJSXToJSON(jsx));
    const [error, setError] = useState();
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
        }
        catch (e) {
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
        }
        catch (e) {
            preventJsonUpdate.current = false;
            setError(e);
        }
    }, [json]);
    const handleJSXChange = (e) => {
        setJSX(e.target.value);
    };
    const handleJSONChange = (newJson) => {
        setJson(newJson);
    };
    return (_jsxs("div", { style: {
            display: "flex",
            flexDirection: "row",
            height: "100vh",
            width: "100vw",
        }, children: [_jsxs("div", { style: {
                    display: "flex",
                    flexDirection: "column",
                    height: "100vh",
                    width: "70vw",
                }, children: [_jsx("textarea", { value: jsx, onChange: handleJSXChange, style: { flex: 2, padding: "10px", fontSize: "12px" } }), _jsx("div", { style: { flex: 3, width: "100%", overflow: "scroll" }, children: _jsx(JsonEditor, { json: json, setJson: handleJSONChange }, Math.random()) })] }), _jsx("div", { style: {
                    display: "flex",
                    flexDirection: "column",
                    height: "100vh",
                    width: "30vw",
                }, children: _jsx("textarea", { value: error, style: { flex: 1, padding: "10px", fontSize: "16px" }, readOnly: true }) })] }));
};
export default App;
