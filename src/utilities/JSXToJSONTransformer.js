import * as Babel from "@babel/standalone";
import syntaxJSX from "@babel/plugin-syntax-jsx";
Babel.registerPlugin("syntaxJSX", syntaxJSX);
export function transformJSXToJSON(jsx) {
  const ast = Babel.transform(jsx, {
    plugins: ["syntaxJSX"],
    ast: true,
    code: false,
  }).ast;
  function traverse(node) {
    if (!node) return null;
    if (node.type === "JSXElement") {
      const component = node.openingElement.name.name;
      const props = {};
      node.openingElement.attributes.forEach((attr) => {
        console.log(attr);
        if (attr?.value?.type === "JSXExpressionContainer") {
          props[attr.name.name] = attr.value.expression.value;
        } else {
          props[attr.name.name] = attr.value?.value ?? true;
        }
      });
      const children = node.children
        .map(traverse)
        .filter((child) => child !== null);
      return { component, props, children };
    }
    if (node.type === "JSXText") {
      return node.value.trim() ? node.value.replace(/\s*\n\s*/g, "") : null;
    }
    return null;
  }
  const body = ast?.program.body ?? [];
  if (body.length === 0 || body[0].type !== "ExpressionStatement") {
    return null;
  }
  return traverse(body[0].expression);
}
