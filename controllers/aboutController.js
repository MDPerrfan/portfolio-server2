import About from "../models/About.js";

export const getAbout = async(req, res) => {
    try {
        let about = await About.findOne();
        if (!about) {
            about = await About.create({});
        }

        res.json({ success: true, about });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const updateAbout = async(req, res) => {
    try {
        const { name, title, description, email, phone, location, github, linkedin } = req.body;

        const about = await About.findOneAndUpdate({}, { name, title, description, email, phone, location, github, linkedin }, { new: true, upsert: true });

        res.json({ success: true, about });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};