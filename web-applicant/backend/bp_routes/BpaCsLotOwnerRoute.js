import express from "express";
import {
    saveBpaCsLotOwner,
    getBpaCsLotOwnerById,
    updateBpaCsLotOwner,
    getBpaCsLotOwnersBySite,
    getBpaCsLotOwnersByBarangay
} from "../bp_controllers/BpaCsLotOwnerController.js";

const router = express.Router();

/**
 * @route   POST /api/bpa-cs-lot-owner
 * @desc    Create a new BPA construction site lot owner
 * @access  Public
 */
router.post("/", async (req, res) => {
    try {
        const bpacsLotOwnerId = await saveBpaCsLotOwner(req.body);
        res.status(201).json({
            success: true,
            message: "BPA CS lot owner created successfully",
            data: { bpacs_lot_owner_id: bpacsLotOwnerId }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

/**
 * @route   GET /api/bpa-cs-lot-owner/:id
 * @desc    Get BPA construction site lot owner by ID
 * @access  Public
 */
router.get("/:id", async (req, res) => {
    try {
        const lotOwner = await getBpaCsLotOwnerById(req.params.id);
        
        if (!lotOwner) {
            return res.status(404).json({
                success: false,
                message: "BPA CS lot owner not found"
            });
        }

        res.status(200).json({
            success: true,
            data: lotOwner
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

/**
 * @route   PUT /api/bpa-cs-lot-owner/:id
 * @desc    Update BPA construction site lot owner by ID
 * @access  Public
 */
router.put("/:id", async (req, res) => {
    try {
        const updated = await updateBpaCsLotOwner(req.params.id, req.body);
        
        if (!updated) {
            return res.status(404).json({
                success: false,
                message: "BPA CS lot owner not found or update failed"
            });
        }

        res.status(200).json({
            success: true,
            message: "BPA CS lot owner updated successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

/**
 * @route   GET /api/bpa-cs-lot-owner/site/:siteId
 * @desc    Get all lot owners by construction site ID
 * @access  Public
 */
router.get("/site/:siteId", async (req, res) => {
    try {
        const lotOwners = await getBpaCsLotOwnersBySite(req.params.siteId);
        
        res.status(200).json({
            success: true,
            data: lotOwners
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

/**
 * @route   GET /api/bpa-cs-lot-owner/barangay/:brgyCode
 * @desc    Get all lot owners by barangay code
 * @access  Public
 */
router.get("/barangay/:brgyCode", async (req, res) => {
    try {
        const lotOwners = await getBpaCsLotOwnersByBarangay(req.params.brgyCode);
        
        res.status(200).json({
            success: true,
            data: lotOwners
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

export default router;