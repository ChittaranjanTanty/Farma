const model = require("../config/geminiConfig");

const generate = async (prompt) => {
    try {
        const result = await model.generateContent(prompt);
        return result.response.text();
    } catch (err) {
        console.error("Error generating content:", err);
        throw new Error("Failed to generate content.");
    }
};

module.exports = { generate };