import express from "express";
import {
    saveApplicantGovId,
    getApplicantGovIdById,
    updateApplicantGovId,
    getApplicantGovIdsByApplicant,
    deactivateApplicantGovId
} from "../gb_controllers/ApplicantGovIdController.js";

const router = express.Router();

/**
 * @route   POST /api/applicant-gov-id
 * @desc    Create a new applicant government ID
 * @access  Public
 */
router.post("/", async (req, res) => {
    try {
        const agidId = await saveApplicantGovId(req.body);
        res.status(201).json({
            success: true,
            message: "Applicant government ID created successfully",
            data: { agid_id: agidId }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

/**
 * @route   GET /api/applicant-gov-id/:id
 * @desc    Get applicant government ID by ID
 * @access  Public
 */
router.get("/:id", async (req, res) => {
    try {
        const govId = await getApplicantGovIdById(req.params.id);
        
        if (!govId) {
            return res.status(404).json({
                success: false,
                message: "Applicant government ID not found"
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
 * @route   PUT /api/applicant-gov-id/:id
 * @desc    Update applicant government ID by ID
 * @access  Public
 */
router.put("/:id", async (req, res) => {
    try {
        const updated = await updateApplicantGovId(req.params.id, req.body);
        
        if (!updated) {
            return res.status(404).json({
                success: false,
                message: "Applicant government ID not found or update failed"
            });
        }

        res.status(200).json({
            success: true,
            message: "Applicant government ID updated successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

/**
 * @route   GET /api/applicant-gov-id/applicant/:applicantId
 * @desc    Get all government IDs by applicant ID
 * @access  Public
 */
router.get("/applicant/:applicantId", async (req, res) => {
    try {
        const govIds = await getApplicantGovIdsByApplicant(req.params.applicantId);
        
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
 * @route   PATCH /api/applicant-gov-id/:id/deactivate
 * @desc    Deactivate applicant government ID
 * @access  Public
 */
router.patch("/:id/deactivate", async (req, res) => {
    try {
        const deactivated = await deactivateApplicantGovId(req.params.id);
        
        if (!deactivated) {
            return res.status(404).json({
                success: false,
                message: "Applicant government ID not found or deactivation failed"
            });
        }

        res.status(200).json({
            success: true,
            message: "Applicant government ID deactivated successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

export default router;