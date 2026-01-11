import express from "express";
import {
    saveBpaConstruction,
    getBpaConstructionById,
    updateBpaConstruction,
    getBpaConstructionsByApplicant,
    getBpaConstructionByApplicationNo
} from "../bp_controllers/BpaConstructionController.js";

const router = express.Router();

/**
 * @route   POST /api/bpa-construction
 * @desc    Create a new BPA construction
 * @access  Public
 */
router.post("/", async (req, res) => {
    try {
        const bpacId = await saveBpaConstruction(req.body);
        res.status(201).json({
            success: true,
            message: "BPA construction created successfully",
            data: { bpac_id: bpacId }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

/**
 * @route   GET /api/bpa-construction/:id
 * @desc    Get BPA construction by ID
 * @access  Public
 */
router.get("/:id", async (req, res) => {
    try {
        const bpaConstruction = await getBpaConstructionById(req.params.id);
        
        if (!bpaConstruction) {
            return res.status(404).json({
                success: false,
                message: "BPA construction not found"
            });
        }

        res.status(200).json({
            success: true,
            data: bpaConstruction
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

/**
 * @route   PUT /api/bpa-construction/:id
 * @desc    Update BPA construction by ID
 * @access  Public
 */
router.put("/:id", async (req, res) => {
    try {
        const updated = await updateBpaConstruction(req.params.id, req.body);
        
        if (!updated) {
            return res.status(404).json({
                success: false,
                message: "BPA construction not found or update failed"
            });
        }

        res.status(200).json({
            success: true,
            message: "BPA construction updated successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

/**
 * @route   GET /api/bpa-construction/applicant/:applicantId
 * @desc    Get all BPA constructions by applicant ID
 * @access  Public
 */
router.get("/applicant/:applicantId", async (req, res) => {
    try {
        const constructions = await getBpaConstructionsByApplicant(req.params.applicantId);
        
        res.status(200).json({
            success: true,
            data: constructions
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

/**
 * @route   GET /api/bpa-construction/application/:applicationNo
 * @desc    Get BPA construction by application number
 * @access  Public
 */
router.get("/application/:applicationNo", async (req, res) => {
    try {
        const construction = await getBpaConstructionByApplicationNo(req.params.applicationNo);
        
        if (!construction) {
            return res.status(404).json({
                success: false,
                message: "BPA construction not found"
            });
        }

        res.status(200).json({
            success: true,
            data: construction
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

export default router;