import { jsx as _jsx } from "react/jsx-runtime";
import JSONInput from "react-json-editor-ajrm";
import locale from "react-json-editor-ajrm/locale/en";
const JsonEditor = ({ json, setJson }) => {
    return (_jsx("div", { children: _jsx(JSONInput, { width: "100%", id: "json-editor", placeholder: json, locale: locale, onBlur: (e) => setJson(e.jsObject) }) }));
};
export default JsonEditor;
