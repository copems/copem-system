import express from "express";
import {
    savePermitApplicant,
    getPermitApplicantById,
    getPermitApplicantByUserId,
    getPermitApplicantByUsername,
    getAllPermitApplicants,
    updatePermitApplicant,
    getPermitApplicantDetails
} from "../gb_controllers/PermitApplicantController.js";

const router = express.Router();

/**
 * @route   GET /api/permit-applicant
 * @desc    Get all permit applicants
 * @access  Public
 */
router.get("/", async (req, res) => {
    try {
        const applicants = await getAllPermitApplicants();
        res.status(200).json({
            success: true,
            data: applicants
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

/**
 * @route   POST /api/permit-applicant
 * @desc    Create a new permit applicant
 * @access  Public
 */
router.post("/", async (req, res) => {
    try {
        console.log('[POST /api/permit-applicant] Request body:', JSON.stringify(req.body, null, 2));
        const applicantId = await savePermitApplicant(req.body);
        console.log('[POST /api/permit-applicant] Created applicant_id:', applicantId);
        res.status(201).json({
            success: true,
            message: "Permit applicant created successfully",
            data: { applicant_id: applicantId }
        });
    } catch (error) {
        console.error('[POST /api/permit-applicant] Error:', error.message);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

/**
 * @route   GET /api/permit-applicant/user/:userId
 * @desc    Get permit applicant by user ID
 * @access  Public
 */
router.get("/user/:userId", async (req, res) => {
    try {
        const applicant = await getPermitApplicantByUserId(req.params.userId);
        
        if (!applicant) {
            return res.status(404).json({
                success: false,
                message: "Permit applicant not found for this user"
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
 * @route   GET /api/permit-applicant/username/:username
 * @desc    Get permit applicant by username (for checking existing draft)
 * @access  Public
 */
router.get("/username/:username", async (req, res) => {
    try {
        const applicant = await getPermitApplicantByUsername(req.params.username);
        
        if (!applicant) {
            return res.status(404).json({
                success: false,
                message: "Permit applicant not found for this username"
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
 * @route   GET /api/permit-applicant/id/:id
 * @desc    Get permit applicant by ID (for verifying applicant exists)
 * @access  Public
 */
router.get("/id/:id", async (req, res) => {
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
 * @route   GET /api/permit-applicant/:username
 * @desc    Get permit applicant by username
 * @access  Public
 */
router.get("/:username", async (req, res) => {
    try {
        const applicant = await getPermitApplicantDetails(req.params.username);
        
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