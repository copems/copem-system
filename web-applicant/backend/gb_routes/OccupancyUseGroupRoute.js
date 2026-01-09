import express from "express";
import {
    saveOccupancyUseGroup,
    getOccupancyUseGroupById,
    updateOccupancyUseGroup,
    getAllOccupancyUseGroups
} from "../gb_controllers/OccupancyUseGroupController.js";

const router = express.Router();

/**
 * @route   POST /api/occupancy-use-group
 * @desc    Create a new occupancy use group
 * @access  Public
 */
router.post("/", async (req, res) => {
    try {
        const ouGroupId = await saveOccupancyUseGroup(req.body);
        res.status(201).json({
            success: true,
            message: "Occupancy use group created successfully",
            data: { ou_group_id: ouGroupId }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

/**
 * @route   GET /api/occupancy-use-group/:id
 * @desc    Get occupancy use group by ID
 * @access  Public
 */
router.get("/:id", async (req, res) => {
    try {
        const ouGroup = await getOccupancyUseGroupById(req.params.id);
        
        if (!ouGroup) {
            return res.status(404).json({
                success: false,
                message: "Occupancy use group not found"
            });
        }

        res.status(200).json({
            success: true,
            data: ouGroup
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

/**
 * @route   PUT /api/occupancy-use-group/:id
 * @desc    Update occupancy use group by ID
 * @access  Public
 */
router.put("/:id", async (req, res) => {
    try {
        const updated = await updateOccupancyUseGroup(req.params.id, req.body);
        
        if (!updated) {
            return res.status(404).json({
                success: false,
                message: "Occupancy use group not found or update failed"
            });
        }

        res.status(200).json({
            success: true,
            message: "Occupancy use group updated successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

/**
 * @route   GET /api/occupancy-use-group
 * @desc    Get all occupancy use groups
 * @access  Public
 */
router.get("/", async (req, res) => {
    try {
        const ouGroups = await getAllOccupancyUseGroups();
        
        res.status(200).json({
            success: true,
            data: ouGroups
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

export default router;