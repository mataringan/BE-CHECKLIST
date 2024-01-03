const express = require("express");

const { authorize } = require("../middleware/authorize");
const { register, login } = require("../controllers/authController");
const {
    createChecklist,
    getAllChecklist,
    deleteChecklist,
} = require("../controllers/checklistController");
const {
    createItemChecklist,
    getAllItemChecklistById,
    updateStatusChecklistItem,
    deleteItemChecklis,
    renameChecklistItem,
    getAllItemChecklistByChecklistId,
} = require("../controllers/checklistItemController");

const router = express.Router();

// Auth

router.post("/register", register);

router.post("/login", login);

// Checklist
router.post("/checklist", authorize, createChecklist);

router.get("/checklist", authorize, getAllChecklist);

router.delete("/checklist/:id", authorize, deleteChecklist);

// Checklist Item
router.post("/checklist/:checklistId/item", authorize, createItemChecklist);

router.get(
    "/checklist/:checklistId/item",
    authorize,
    getAllItemChecklistByChecklistId
);

router.get(
    "/checklist/:checklistId/item/:checklistItemId",
    authorize,
    getAllItemChecklistById
);

router.put(
    "/checklist/:checklistId/item/:checklistItemId",
    authorize,
    updateStatusChecklistItem
);

router.delete(
    "/checklist/:checklistId/item/:checklistItemId",
    authorize,
    deleteItemChecklis
);

router.put(
    "/checklist/:checklistId/item/rename/:checklistItemId",
    authorize,
    renameChecklistItem
);

module.exports = router;
