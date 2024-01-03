const ChecklistItem = require("../models/checkListItem");
const Checklist = require("../models/checklist");

const { v4: uuid } = require("uuid");

module.exports = {
    async createItemChecklist(req, res) {
        try {
            const { itemName } = req.body;
            const { checklistId } = req.params;

            const checklist = await Checklist.findById(checklistId);
            if (!checklist) {
                return res.status(404).json({
                    status: "error",
                    message: "Checklist not found",
                });
            }

            const createdItem = await ChecklistItem.create({
                _id: uuid(),
                checklistId,
                itemName,
                status: false,
            });

            res.status(201).json({
                status: "success",
                message: "Item successfully created in the checklist",
                data: createdItem,
            });
        } catch (error) {
            return res.status(500).json({
                status: "error",
                message: error.message,
            });
        }
    },

    async getAllItemChecklistByChecklistId(req, res) {
        try {
            const { checklistId } = req.params;

            const checklist = await Checklist.findById(checklistId);
            if (!checklist) {
                return res.status(404).json({
                    status: "error",
                    message: "Checklist not found",
                });
            }

            const checkListItem = await ChecklistItem.find({
                checklistId,
            });

            if (!checkListItem) {
                return res.status(404).json({
                    status: "error",
                    message: "Checklist Item not found",
                });
            }

            res.status(201).json({
                status: "success",
                message: "Successfully retrieve all checklist item",
                data: checkListItem,
            });
        } catch (error) {
            return res.status(500).json({
                status: "error",
                message: error.message,
            });
        }
    },

    async getAllItemChecklistById(req, res) {
        try {
            const { checklistId, checklistItemId } = req.params;

            const checklist = await Checklist.findById(checklistId);
            if (!checklist) {
                return res.status(404).json({
                    status: "error",
                    message: "Checklist not found",
                });
            }

            const checkListItem = await ChecklistItem.findOne({
                _id: checklistItemId,
            });

            if (!checkListItem) {
                return res.status(404).json({
                    status: "error",
                    message: "Checklist Item not found",
                });
            }

            res.status(201).json({
                status: "success",
                message: "Successfully retrieve all checklist item",
                data: checkListItem,
            });
        } catch (error) {
            return res.status(500).json({
                status: "error",
                message: error.message,
            });
        }
    },

    async updateStatusChecklistItem(req, res) {
        try {
            const { checklistId, checklistItemId } = req.params;

            const checklist = await Checklist.findById(checklistId);
            if (!checklist) {
                return res.status(404).json({
                    status: "error",
                    message: "Checklist not found",
                });
            }

            const checkListItem = await ChecklistItem.findOne({
                _id: checklistItemId,
            });

            if (!checkListItem) {
                return res.status(404).json({
                    status: "error",
                    message: "Checklist Item not found",
                });
            }

            // const updateStatus = await ChecklistItem.findByIdAndUpdate(
            //     checklistItemId,
            //     { $set: { status: false } },
            //     { new: true }
            // );

            checkListItem._id = checkListItem._id;
            checkListItem.itemName = checkListItem.itemName;
            checkListItem.status = true;

            await checkListItem.save();

            res.status(200).json({
                status: "success",
                message: "item checklist update was successful",
                data: checkListItem,
            });
        } catch (error) {
            return res.status(500).json({
                status: "error",
                message: error.message,
            });
        }
    },

    async renameChecklistItem(req, res) {
        try {
            const { checklistId, checklistItemId } = req.params;
            const { itemName } = req.body;

            const checklist = await Checklist.findById(checklistId);
            if (!checklist) {
                return res.status(404).json({
                    status: "error",
                    message: "Checklist not found",
                });
            }

            const checkListItem = await ChecklistItem.findOne({
                _id: checklistItemId,
            });

            if (!checkListItem) {
                return res.status(404).json({
                    status: "error",
                    message: "Checklist Item not found",
                });
            }

            // const updateStatus = await ChecklistItem.findByIdAndUpdate(
            //     checklistItemId,
            //     { $set: { itemName } },
            //     { new: true }
            // );

            checkListItem._id = checkListItem._id;
            checkListItem.itemName = itemName;
            checkListItem.status = checkListItem.status;

            await checkListItem.save();

            res.status(200).json({
                status: "success",
                message: "rename item successful",
                data: checkListItem,
            });
        } catch (error) {
            return res.status(500).json({
                status: "error",
                message: error.message,
            });
        }
    },

    async deleteItemChecklis(req, res) {
        try {
            const { checklistId, checklistItemId } = req.params;

            const checklist = await Checklist.findById(checklistId);
            if (!checklist) {
                return res.status(404).json({
                    status: "error",
                    message: "Checklist not found",
                });
            }

            const checkListItem = await ChecklistItem.findOne({
                _id: checklistItemId,
            });

            if (!checkListItem) {
                return res.status(404).json({
                    status: "error",
                    message: "Checklist Item not found",
                });
            } else {
                await ChecklistItem.findByIdAndDelete(checklistItemId);
            }

            res.status(200).json({
                status: "success",
                message: "successfully deleted the item checklist ",
            });
        } catch (error) {
            return res.status(500).json({
                status: "error",
                message: error.message,
            });
        }
    },
};
