import express from "express";
import {
    saveBarangay,
    getBarangayById,
    updateBarangay,
    getBarangaysByCityMun
} from "../gb_controllers/BarangayController.js";

const router = express.Router();

/**
 * @route   POST /api/barangay
 * @desc    Create a new barangay
 * @access  Public
 */
router.post("/", async (req, res) => {
    try {
        const brgyId = await saveBarangay(req.body);
        res.status(201).json({
            success: true,
            message: "Barangay created successfully",
            data: { brgy_id: brgyId }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

/**
 * @route   GET /api/barangay/:id
 * @desc    Get barangay by ID
 * @access  Public
 */
router.get("/:id", async (req, res) => {
    try {
        const barangay = await getBarangayById(req.params.id);
        
        if (!barangay) {
            return res.status(404).json({
                success: false,
                message: "Barangay not found"
            });
        }

        res.status(200).json({
            success: true,
            data: barangay
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

/**
 * @route   PUT /api/barangay/:id
 * @desc    Update barangay by ID
 * @access  Public
 */
router.put("/:id", async (req, res) => {
    try {
        const updated = await updateBarangay(req.params.id, req.body);
        
        if (!updated) {
            return res.status(404).json({
                success: false,
                message: "Barangay not found or update failed"
            });
        }

        res.status(200).json({
            success: true,
            message: "Barangay updated successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

/**
 * @route   GET /api/barangay/city-mun/:citymunId
 * @desc    Get all barangays by city/municipality ID
 * @access  Public
 */
router.get("/city-mun/:citymunId", async (req, res) => {
    try {
        const barangays = await getBarangaysByCityMun(req.params.citymunId);
        
        res.status(200).json({
            success: true,
            data: barangays
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

export default router;