import express from "express";
import {
    saveBpApplicationStatus,
    getBpApplicationStatusById,
    updateBpApplicationStatus,
    getBpApplicationStatusesByBpac,
    getLatestBpApplicationStatusByBpac,
    getBpApplicationStatusesByStatus
} from "../bp_controllers/BpApplicationStatusController.js";

const router = express.Router();

/**
 * @route   POST /api/bp-application-status
 * @desc    Create a new BP application status
 * @access  Public
 */
router.post("/", async (req, res) => {
    try {
        const bpaStatusId = await saveBpApplicationStatus(req.body);
        res.status(201).json({
            success: true,
            message: "BP application status created successfully",
            data: { bpa_status_id: bpaStatusId }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

/**
 * @route   GET /api/bp-application-status/:id
 * @desc    Get BP application status by ID
 * @access  Public
 */
router.get("/:id", async (req, res) => {
    try {
        const status = await getBpApplicationStatusById(req.params.id);
        
        if (!status) {
            return res.status(404).json({
                success: false,
                message: "BP application status not found"
            });
        }

        res.status(200).json({
            success: true,
            data: status
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

/**
 * @route   PUT /api/bp-application-status/:id
 * @desc    Update BP application status by ID
 * @access  Public
 */
router.put("/:id", async (req, res) => {
    try {
        const updated = await updateBpApplicationStatus(req.params.id, req.body);
        
        if (!updated) {
            return res.status(404).json({
                success: false,
                message: "BP application status not found or update failed"
            });
        }

        res.status(200).json({
            success: true,
            message: "BP application status updated successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

/**
 * @route   GET /api/bp-application-status/bpac/:bpacId
 * @desc    Get all BP application statuses by BPA Construction ID
 * @access  Public
 */
router.get("/bpac/:bpacId", async (req, res) => {
    try {
        const statuses = await getBpApplicationStatusesByBpac(req.params.bpacId);
        
        res.status(200).json({
            success: true,
            data: statuses
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

/**
 * @route   GET /api/bp-application-status/bpac/:bpacId/latest
 * @desc    Get latest BP application status by BPA Construction ID
 * @access  Public
 */
router.get("/bpac/:bpacId/latest", async (req, res) => {
    try {
        const status = await getLatestBpApplicationStatusByBpac(req.params.bpacId);
        
        if (!status) {
            return res.status(404).json({
                success: false,
                message: "No status found for this BPA Construction"
            });
        }

        res.status(200).json({
            success: true,
            data: status
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

/**
 * @route   GET /api/bp-application-status/status/:statusDesc
 * @desc    Get all BP applications by status (0->Submitted, 1->In Review, 2->Approved, 3->Rejected)
 * @access  Public
 */
router.get("/status/:statusDesc", async (req, res) => {
    try {
        const statuses = await getBpApplicationStatusesByStatus(req.params.statusDesc);
        
        res.status(200).json({
            success: true,
            data: statuses
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

export default router;