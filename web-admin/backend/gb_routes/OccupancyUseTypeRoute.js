import express from "express";
import {
    saveOccupancyUseType,
    getOccupancyUseTypeById,
    updateOccupancyUseType,
    getOccupancyUseTypesByGroup,
    getAllOccupancyUseTypes
} from "../gb_controllers/OccupancyUseTypeController.js";

const router = express.Router();

/**
 * @route   POST /api/occupancy-use-type
 * @desc    Create a new occupancy use type
 * @access  Public
 */
router.post("/", async (req, res) => {
    try {
        const ouTypeId = await saveOccupancyUseType(req.body);
        res.status(201).json({
            success: true,
            message: "Occupancy use type created successfully",
            data: { ou_type_id: ouTypeId }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

/**
 * @route   GET /api/occupancy-use-type/:id
 * @desc    Get occupancy use type by ID
 * @access  Public
 */
router.get("/:id", async (req, res) => {
    try {
        const ouType = await getOccupancyUseTypeById(req.params.id);
        
        if (!ouType) {
            return res.status(404).json({
                success: false,
                message: "Occupancy use type not found"
            });
        }

        res.status(200).json({
            success: true,
            data: ouType
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

/**
 * @route   PUT /api/occupancy-use-type/:id
 * @desc    Update occupancy use type by ID
 * @access  Public
 */
router.put("/:id", async (req, res) => {
    try {
        const updated = await updateOccupancyUseType(req.params.id, req.body);
        
        if (!updated) {
            return res.status(404).json({
                success: false,
                message: "Occupancy use type not found or update failed"
            });
        }

        res.status(200).json({
            success: true,
            message: "Occupancy use type updated successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

/**
 * @route   GET /api/occupancy-use-type/group/:groupId
 * @desc    Get all occupancy use types by group ID
 * @access  Public
 */
router.get("/group/:groupId", async (req, res) => {
    try {
        const ouTypes = await getOccupancyUseTypesByGroup(req.params.groupId);
        
        res.status(200).json({
            success: true,
            data: ouTypes
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

/**
 * @route   GET /api/occupancy-use-type
 * @desc    Get all occupancy use types
 * @access  Public
 */
router.get("/", async (req, res) => {
    try {
        const ouTypes = await getAllOccupancyUseTypes();
        
        res.status(200).json({
            success: true,
            data: ouTypes
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

export default router;