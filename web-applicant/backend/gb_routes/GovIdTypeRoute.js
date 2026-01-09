import express from "express";
import {
    saveGovIdType,
    getGovIdTypeById,
    updateGovIdType,
    getAllGovIdTypes
} from "../gb_controllers/GovIdTypeController.js";

const router = express.Router();

/**
 * @route   POST /api/gov-id-type
 * @desc    Create a new government ID type
 * @access  Public
 */
router.post("/", async (req, res) => {
    try {
        const gitId = await saveGovIdType(req.body);
        res.status(201).json({
            success: true,
            message: "Government ID type created successfully",
            data: { git_id: gitId }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

/**
 * @route   GET /api/gov-id-type/:id
 * @desc    Get government ID type by ID
 * @access  Public
 */
router.get("/:id", async (req, res) => {
    try {
        const govIdType = await getGovIdTypeById(req.params.id);
        
        if (!govIdType) {
            return res.status(404).json({
                success: false,
                message: "Government ID type not found"
            });
        }

        res.status(200).json({
            success: true,
            data: govIdType
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

/**
 * @route   PUT /api/gov-id-type/:id
 * @desc    Update government ID type by ID
 * @access  Public
 */
router.put("/:id", async (req, res) => {
    try {
        const updated = await updateGovIdType(req.params.id, req.body);
        
        if (!updated) {
            return res.status(404).json({
                success: false,
                message: "Government ID type not found or update failed"
            });
        }

        res.status(200).json({
            success: true,
            message: "Government ID type updated successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

/**
 * @route   GET /api/gov-id-type
 * @desc    Get all government ID types
 * @access  Public
 */
router.get("/", async (req, res) => {
    try {
        const govIdTypes = await getAllGovIdTypes();
        
        res.status(200).json({
            success: true,
            data: govIdTypes
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

export default router;