const Checklist = require("../models/checklist");
const { v4: uuid } = require("uuid");

module.exports = {
    async createChecklist(req, res) {
        try {
            const { name } = req.body;

            const createChecklist = await Checklist.create({
                _id: uuid(),
                name,
            });

            res.status(201).json({
                status: "success",
                message: "successfully created checklist data",
                data: createChecklist,
            });
        } catch (error) {
            return res.status(500).json({
                status: "error",
                message: error.message,
            });
        }
    },

    async getAllChecklist(req, res) {
        try {
            const checklist = await Checklist.find();

            res.status(200).json({
                status: "success",
                message: "Successfully retrieve all checklist data",
                data: checklist,
            });
        } catch (error) {
            return res.status(500).json({
                status: "error",
                message: error.message,
            });
        }
    },

    async deleteChecklist(req, res) {
        try {
            const _id = req.params.id;

            const checklist = await Checklist.findById(_id);

            if (!checklist) {
                return res.status(404).json({
                    status: "error",
                    message: "checklist data not found",
                });
            }

            await Checklist.findByIdAndDelete(_id);

            res.status(200).json({
                status: "success",
                message: "successfully deleted the checklist data",
            });
        } catch (error) {
            return res.status(500).json({
                status: "error",
                message: error.message,
            });
        }
    },
};
