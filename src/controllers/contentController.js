const contentService = require("../services/contentService");

const generateContent = async (req, res) => {
    try {
        const { question } = req.body;
        if (!question) {
            return res.status(400).json({ error: "No question provided" });
        }

        const result = await contentService.generate(question);
        res.json({ result });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = { generateContent };
