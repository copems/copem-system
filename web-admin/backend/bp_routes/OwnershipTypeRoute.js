import express from "express";
import {
    saveOwnershipType,
    getOwnershipTypeById,
    updateOwnershipType,
    getAllOwnershipTypes
} from "../bp_controllers/OwnershipTypeController.js";

const router = express.Router();

/**
 * @route   POST /api/ownership-type
 * @desc    Create a new ownership type
 * @access  Public
 */
router.post("/", async (req, res) => {
    try {
        const otId = await saveOwnershipType(req.body);
        res.status(201).json({
            success: true,
            message: "Ownership type created successfully",
            data: { ot_id: otId }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

/**
 * @route   GET /api/ownership-type/:id
 * @desc    Get ownership type by ID
 * @access  Public
 */
router.get("/:id", async (req, res) => {
    try {
        const ownershipType = await getOwnershipTypeById(req.params.id);
        
        if (!ownershipType) {
            return res.status(404).json({
                success: false,
                message: "Ownership type not found"
            });
        }

        res.status(200).json({
            success: true,
            data: ownershipType
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

/**
 * @route   PUT /api/ownership-type/:id
 * @desc    Update ownership type by ID
 * @access  Public
 */
router.put("/:id", async (req, res) => {
    try {
        const updated = await updateOwnershipType(req.params.id, req.body);
        
        if (!updated) {
            return res.status(404).json({
                success: false,
                message: "Ownership type not found or update failed"
            });
        }

        res.status(200).json({
            success: true,
            message: "Ownership type updated successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

/**
 * @route   GET /api/ownership-type
 * @desc    Get all ownership types
 * @access  Public
 */
router.get("/", async (req, res) => {
    try {
        const ownershipTypes = await getAllOwnershipTypes();
        
        res.status(200).json({
            success: true,
            data: ownershipTypes
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

export default router;