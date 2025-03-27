const { fetchWeatherData } = require("../services/weatherService");
const { generateAdvisory } = require("../services/geminiService");

const generateAdvisoryController = async (req, res) => {
    try {
        const { location, cropType, cropName, activity } = req.body;

        if (!location || !cropType || !cropName || !activity) {
            return res.status(400).json({ error: "Missing required parameters" });
        }

        const forecast = await fetchWeatherData(location);
        const advisory = await generateAdvisory(cropType, cropName, activity, forecast);

        res.json({ location, cropName, forecast, advisory });
    } catch (error) {
        console.error("Error generating advisory:", error);
        res.status(500).json({ error: "Failed to generate advisory" });
    }
};

module.exports = { generateAdvisoryController };
