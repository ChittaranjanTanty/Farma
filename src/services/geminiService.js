const { GoogleGenerativeAI } = require("@google/generative-ai");
const { GEMINI_API_KEY } = require("../config/config");

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

const generateAdvisory = async (cropType, cropName, activity, weather) => {
    const prompt = `
        Generate a *short and clear* agricultural advisory (2-3 lines per section).  

        *📌 Inputs:*
        - *Crop Type:* ${cropType}
        - *Crop Name:* ${cropName}
        - *Activity:* ${activity}
        - *Weather Forecast (Next 5 Days):*  
        ${JSON.stringify(weather, null, 2)}

        *📢 Output Format:*  
        - *📅 Date-wise Weather Summary* (Max 2 lines per day)  
        - *⚠ Risks & Warnings* (Highlight potential threats in max 2 lines)  
        - *🌱 Decision (Proceed/Delay) & Why?* (Max 2 lines)  
        - *🚜 Farmer Actions* (Max 3 points, 1 line each)  

        Now, generate a *similar concise advisory* for the given inputs.
    `;

    try {
        const result = await model.generateContent(prompt);
        return result.response.text();
    } catch (err) {
        console.error("Gemini API Error:", err);
        return "Advisory generation failed.";
    }
};

module.exports = { generateAdvisory };
