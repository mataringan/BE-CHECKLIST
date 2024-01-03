const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { v4: uuidv4 } = require("uuid");

const ChecklistItem = new Schema(
    {
        _id: {
            type: String,
            default: uuidv4,
        },
        checklistId: {
            type: String,
            default: uuidv4,
            ref: "Checklist",
        },
        itemName: {
            type: String,
            required: true,
        },
        status: {
            type: Boolean,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("ChecklistItem", ChecklistItem);
