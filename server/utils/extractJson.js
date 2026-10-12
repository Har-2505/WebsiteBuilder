const extractJson = async (text) => {
    if (!text || typeof text !== "string") {
        return null;
    }

    const trimmed = text.trim();

    // 1. Try parsing directly (fast path when AI returns clean JSON)
    try {
        return JSON.parse(trimmed);
    } catch (_) {
        // Continue to cleanup strategies
    }

    // 2. Strip Markdown code fences: ```json ... ``` or ``` ... ```
    let cleaned = trimmed
        .replace(/^```json\s*/i, "")
        .replace(/^```\s*/i, "")
        .replace(/\s*```$/i, "")
        .trim();

    try {
        return JSON.parse(cleaned);
    } catch (_) {
        // Continue to brace extraction
    }

    // 3. Extract substring between first '{' and last '}'
    const firstBrace = cleaned.indexOf('{');
    const closeBrace = cleaned.lastIndexOf('}');
    if (firstBrace === -1 || closeBrace === -1 || closeBrace <= firstBrace) {
        return null;
    }

    let jsonString = cleaned.slice(firstBrace, closeBrace + 1);

    try {
        return JSON.parse(jsonString);
    } catch (_) {
        // Continue to sanitization
    }

    // 4. Sanitize unescaped control characters (common LLM issue with raw newlines in string literals)
    try {
        const sanitized = jsonString.replace(/[\u0000-\u001F]+/g, (match) => {
            if (match === "\n") return "\\n";
            if (match === "\r") return "\\r";
            if (match === "\t") return "\\t";
            return "";
        });
        return JSON.parse(sanitized);
    } catch (err) {
        console.warn("extractJson: Unable to parse JSON response:", err.message);
        return null;
    }
};

export default extractJson;