import express from "express";
import {
    saveLotOwnerGovId,
    getLotOwnerGovIdById,
    updateLotOwnerGovId,
    getLotOwnerGovIdsByLotOwner,
    deactivateLotOwnerGovId
} from "../gb_controllers/LotOwnerGovIdController.js";

const router = express.Router();

/**
 * @route   POST /api/lot-owner-gov-id
 * @desc    Create a new lot owner government ID
 * @access  Public
 */
router.post("/", async (req, res) => {
    try {
        const logId = await saveLotOwnerGovId(req.body);
        res.status(201).json({
            success: true,
            message: "Lot owner government ID created successfully",
            data: { log_id: logId }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

/**
 * @route   GET /api/lot-owner-gov-id/:id
 * @desc    Get lot owner government ID by ID
 * @access  Public
 */
router.get("/:id", async (req, res) => {
    try {
        const govId = await getLotOwnerGovIdById(req.params.id);
        
        if (!govId) {
            return res.status(404).json({
                success: false,
                message: "Lot owner government ID not found"
            });
        }

        res.status(200).json({
            success: true,
            data: govId
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

/**
 * @route   PUT /api/lot-owner-gov-id/:id
 * @desc    Update lot owner government ID by ID
 * @access  Public
 */
router.put("/:id", async (req, res) => {
    try {
        const updated = await updateLotOwnerGovId(req.params.id, req.body);
        
        if (!updated) {
            return res.status(404).json({
                success: false,
                message: "Lot owner government ID not found or update failed"
            });
        }

        res.status(200).json({
            success: true,
            message: "Lot owner government ID updated successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

/**
 * @route   GET /api/lot-owner-gov-id/lot-owner/:lotOwnerId
 * @desc    Get all government IDs by lot owner ID
 * @access  Public
 */
router.get("/lot-owner/:lotOwnerId", async (req, res) => {
    try {
        const govIds = await getLotOwnerGovIdsByLotOwner(req.params.lotOwnerId);
        
        res.status(200).json({
            success: true,
            data: govIds
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

/**
 * @route   PATCH /api/lot-owner-gov-id/:id/deactivate
 * @desc    Deactivate lot owner government ID
 * @access  Public
 */
router.patch("/:id/deactivate", async (req, res) => {
    try {
        const deactivated = await deactivateLotOwnerGovId(req.params.id);
        
        if (!deactivated) {
            return res.status(404).json({
                success: false,
                message: "Lot owner government ID not found or deactivation failed"
            });
        }

        res.status(200).json({
            success: true,
            message: "Lot owner government ID deactivated successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

export default router;