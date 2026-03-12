import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    githubUrl: {
        type: String,
        default: "",
    },
    liveUrl: {
        type: String,
        default: "",
    },
    imageUrl: {
        type: String,
        default: "",
    },
    imagePublicId: {
        type: String,
        default: "",
    },
}, { timestamps: true });

const Project = mongoose.model("Project", projectSchema);
export default Project;