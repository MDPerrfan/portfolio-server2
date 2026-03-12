import Project from "../models/projectModels.js";

export const getProjects = async(req, res) => {
    try {
        const projects = await Project.find().sort({ createdAt: -1 });
        res.json({ success: true, projects });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const getProject = async(req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        if (!project) return res.status(404).json({ success: false, message: "Project not found" });
        res.json({ success: true, project });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const createProject = async(req, res) => {
    try {
        const { title, description, githubUrl, liveUrl } = req.body;
        if (!title || !description) {
            return res.status(400).json({ success: false, message: "Title and description are required" });
        }
        const project = await Project.create({ title, description, githubUrl, liveUrl });
        res.status(201).json({ success: true, project });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const updateProject = async(req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        if (!project) return res.status(404).json({ success: false, message: "Project not found" });

        const updated = await Project.findByIdAndUpdate(
            req.params.id, {...req.body }, { new: true }
        );
        res.json({ success: true, project: updated });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const deleteProject = async(req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        if (!project) return res.status(404).json({ success: false, message: "Project not found" });
        await Project.findByIdAndDelete(req.params.id);
        res.json({ success: true, message: "Project deleted" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};