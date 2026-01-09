import express from "express";
import {
    saveWorkScopeType,
    getWorkScopeTypeById,
    updateWorkScopeType,
    getAllWorkScopeTypes
} from "../bp_controllers/WorkScopeTypeController.js";

const router = express.Router();

/**
 * @route   POST /api/work-scope-type
 * @desc    Create a new work scope type
 * @access  Public
 */
router.post("/", async (req, res) => {
    try {
        const wsTypeId = await saveWorkScopeType(req.body);
        res.status(201).json({
            success: true,
            message: "Work scope type created successfully",
            data: { ws_type_id: wsTypeId }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

/**
 * @route   GET /api/work-scope-type/:id
 * @desc    Get work scope type by ID
 * @access  Public
 */
router.get("/:id", async (req, res) => {
    try {
        const workScopeType = await getWorkScopeTypeById(req.params.id);
        
        if (!workScopeType) {
            return res.status(404).json({
                success: false,
                message: "Work scope type not found"
            });
        }

        res.status(200).json({
            success: true,
            data: workScopeType
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

/**
 * @route   PUT /api/work-scope-type/:id
 * @desc    Update work scope type by ID
 * @access  Public
 */
router.put("/:id", async (req, res) => {
    try {
        const updated = await updateWorkScopeType(req.params.id, req.body);
        
        if (!updated) {
            return res.status(404).json({
                success: false,
                message: "Work scope type not found or update failed"
            });
        }

        res.status(200).json({
            success: true,
            message: "Work scope type updated successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

/**
 * @route   GET /api/work-scope-type
 * @desc    Get all work scope types
 * @access  Public
 */
router.get("/", async (req, res) => {
    try {
        const workScopeTypes = await getAllWorkScopeTypes();
        
        res.status(200).json({
            success: true,
            data: workScopeTypes
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

export default router;