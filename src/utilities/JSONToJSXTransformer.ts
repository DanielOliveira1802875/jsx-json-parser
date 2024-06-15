export function transformJSONToJSX(json: any, indentLevel: number = 0): string {
    if (!json) return '';

    const indent = '  '.repeat(indentLevel);

    function traverse(node: any, level: number): string {
        if (!node) return '';

        if (typeof node === 'string') {
            return `${'  '.repeat(level)}${node}\n`;
        }

        const { component, props, children } = node;

        const propsString = Object.keys(props || {})
            .map(key => {
                const value = props[key];
                if (typeof value === 'boolean' || value === undefined) {
                    return value || value === undefined ? `${key}` : '';
                }
                return `${key}={${JSON.stringify(value)}}`;
            })
            .filter(Boolean)
            .join(' ');

        const openingTag = `${'  '.repeat(level)}<${component}${propsString ? ' ' + propsString : ''}>`;
        const closingTag = `${'  '.repeat(level)}</${component}>`;

        const childrenString = (children || []).map(child => traverse(child, level + 1)).join('');

        if (childrenString.trim()) {
            return `${indent}${openingTag}\n${childrenString}${indent}${closingTag}\n`;
        } else {
            return `${indent}${openingTag}${closingTag}\n`;
        }
    }

    return traverse(json, indentLevel);
}
