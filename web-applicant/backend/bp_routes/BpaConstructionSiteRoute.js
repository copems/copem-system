import express from "express";
import {
    saveBpaConstructionSite,
    getBpaConstructionSiteById,
    updateBpaConstructionSite,
    getBpaConstructionSitesByApplicant,
    getBpaConstructionSitesByBarangay
} from "../bp_controllers/BpaConstructionSiteController.js";

const router = express.Router();

/**
 * @route   POST /api/bpa-construction-site
 * @desc    Create a new BPA construction site
 * @access  Public
 */
router.post("/", async (req, res) => {
    try {
        const bpacSiteId = await saveBpaConstructionSite(req.body);
        res.status(201).json({
            success: true,
            message: "BPA construction site created successfully",
            data: { bpac_site_id: bpacSiteId }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

/**
 * @route   GET /api/bpa-construction-site/:id
 * @desc    Get BPA construction site by ID
 * @access  Public
 */
router.get("/:id", async (req, res) => {
    try {
        const site = await getBpaConstructionSiteById(req.params.id);
        
        if (!site) {
            return res.status(404).json({
                success: false,
                message: "BPA construction site not found"
            });
        }

        res.status(200).json({
            success: true,
            data: site
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

/**
 * @route   PUT /api/bpa-construction-site/:id
 * @desc    Update BPA construction site by ID
 * @access  Public
 */
router.put("/:id", async (req, res) => {
    try {
        const updated = await updateBpaConstructionSite(req.params.id, req.body);
        
        if (!updated) {
            return res.status(404).json({
                success: false,
                message: "BPA construction site not found or update failed"
            });
        }

        res.status(200).json({
            success: true,
            message: "BPA construction site updated successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

/**
 * @route   GET /api/bpa-construction-site/applicant/:applicantId
 * @desc    Get all BPA construction sites by applicant ID
 * @access  Public
 */
router.get("/applicant/:applicantId", async (req, res) => {
    try {
        const sites = await getBpaConstructionSitesByApplicant(req.params.applicantId);
        
        res.status(200).json({
            success: true,
            data: sites
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

/**
 * @route   GET /api/bpa-construction-site/barangay/:brgyCode
 * @desc    Get all BPA construction sites by barangay code
 * @access  Public
 */
router.get("/barangay/:brgyCode", async (req, res) => {
    try {
        const sites = await getBpaConstructionSitesByBarangay(req.params.brgyCode);
        
        res.status(200).json({
            success: true,
            data: sites
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

export default router;