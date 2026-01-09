import express from "express";
import {
    saveBpacSupervisor,
    getBpacSupervisorById,
    updateBpacSupervisor,
    getBpacSupervisorsByBarangay,
    getAllBpacSupervisors,
    searchBpacSupervisorByPrcNo
} from "../bp_controllers/BpacSupervisorsController.js";

const router = express.Router();

/**
 * @route   POST /api/bpac-supervisors
 * @desc    Create a new BPAC supervisor
 * @access  Public
 */
router.post("/", async (req, res) => {
    try {
        const bpacSupervisorId = await saveBpacSupervisor(req.body);
        res.status(201).json({
            success: true,
            message: "BPAC supervisor created successfully",
            data: { bpac_supervisor_id: bpacSupervisorId }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

/**
 * @route   GET /api/bpac-supervisors/:id
 * @desc    Get BPAC supervisor by ID
 * @access  Public
 */
router.get("/:id", async (req, res) => {
    try {
        const supervisor = await getBpacSupervisorById(req.params.id);
        
        if (!supervisor) {
            return res.status(404).json({
                success: false,
                message: "BPAC supervisor not found"
            });
        }

        res.status(200).json({
            success: true,
            data: supervisor
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

/**
 * @route   PUT /api/bpac-supervisors/:id
 * @desc    Update BPAC supervisor by ID
 * @access  Public
 */
router.put("/:id", async (req, res) => {
    try {
        const updated = await updateBpacSupervisor(req.params.id, req.body);
        
        if (!updated) {
            return res.status(404).json({
                success: false,
                message: "BPAC supervisor not found or update failed"
            });
        }

        res.status(200).json({
            success: true,
            message: "BPAC supervisor updated successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

/**
 * @route   GET /api/bpac-supervisors/barangay/:brgyCode
 * @desc    Get all BPAC supervisors by barangay code
 * @access  Public
 */
router.get("/barangay/:brgyCode", async (req, res) => {
    try {
        const supervisors = await getBpacSupervisorsByBarangay(req.params.brgyCode);
        
        res.status(200).json({
            success: true,
            data: supervisors
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

/**
 * @route   GET /api/bpac-supervisors
 * @desc    Get all BPAC supervisors
 * @access  Public
 */
router.get("/", async (req, res) => {
    try {
        const supervisors = await getAllBpacSupervisors();
        
        res.status(200).json({
            success: true,
            data: supervisors
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

/**
 * @route   GET /api/bpac-supervisors/search/prc/:prcNo
 * @desc    Search BPAC supervisors by PRC number
 * @access  Public
 */
router.get("/search/prc/:prcNo", async (req, res) => {
    try {
        const supervisors = await searchBpacSupervisorByPrcNo(req.params.prcNo);
        
        res.status(200).json({
            success: true,
            data: supervisors
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

export default router;