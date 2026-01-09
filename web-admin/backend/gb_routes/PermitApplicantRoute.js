import express from "express";
import {
    savePermitApplicant,
    getPermitApplicantById,
    updatePermitApplicant
} from "../gb_controllers/PermitApplicantController.js";

const router = express.Router();

/**
 * @route   POST /api/permit-applicant
 * @desc    Create a new permit applicant
 * @access  Public
 */
router.post("/", async (req, res) => {
    try {
        const applicantId = await savePermitApplicant(req.body);
        res.status(201).json({
            success: true,
            message: "Permit applicant created successfully",
            data: { applicant_id: applicantId }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

/**
 * @route   GET /api/permit-applicant/:id
 * @desc    Get permit applicant by ID
 * @access  Public
 */
router.get("/:id", async (req, res) => {
    try {
        const applicant = await getPermitApplicantById(req.params.id);
        
        if (!applicant) {
            return res.status(404).json({
                success: false,
                message: "Permit applicant not found"
            });
        }

        res.status(200).json({
            success: true,
            data: applicant
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

/**
 * @route   PUT /api/permit-applicant/:id
 * @desc    Update permit applicant by ID
 * @access  Public
 */
router.put("/:id", async (req, res) => {
    try {
        const updated = await updatePermitApplicant(req.params.id, req.body);
        
        if (!updated) {
            return res.status(404).json({
                success: false,
                message: "Permit applicant not found or update failed"
            });
        }

        res.status(200).json({
            success: true,
            message: "Permit applicant updated successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

export default router;