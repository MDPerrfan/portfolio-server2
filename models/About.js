import mongoose from "mongoose"
const aboutSchema = new mongoose.Schema({
    name: { type: String, default: "Mohammed Parves" },
    title: { type: String, default: "Full Stack Developer" },
    description: { type: String, default: "" },
    email: { type: String, default: "" },
    phone: { type: String, default: "" },
    location: { type: String, default: "Chittagong, Bangladesh" },
    github: { type: String, default: "" },
    linkedin: { type: String, default: "" },
}, { timestamps: true });
const About = mongoose.model("About", aboutSchema);
export default About;