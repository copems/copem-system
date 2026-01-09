import express from "express";
import {
    saveProvince,
    getProvinceById,
    updateProvince,
    getProvincesByRegion
} from "../gb_controllers/ProvinceController.js";

const router = express.Router();

/**
 * @route   POST /api/province
 * @desc    Create a new province
 * @access  Public
 */
router.post("/", async (req, res) => {
    try {
        const provinceId = await saveProvince(req.body);
        res.status(201).json({
            success: true,
            message: "Province created successfully",
            data: { prov_id: provinceId }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

/**
 * @route   GET /api/province/:id
 * @desc    Get province by ID
 * @access  Public
 */
router.get("/:id", async (req, res) => {
    try {
        const province = await getProvinceById(req.params.id);
        
        if (!province) {
            return res.status(404).json({
                success: false,
                message: "Province not found"
            });
        }

        res.status(200).json({
            success: true,
            data: province
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

/**
 * @route   PUT /api/province/:id
 * @desc    Update province by ID
 * @access  Public
 */
router.put("/:id", async (req, res) => {
    try {
        const updated = await updateProvince(req.params.id, req.body);
        
        if (!updated) {
            return res.status(404).json({
                success: false,
                message: "Province not found or update failed"
            });
        }

        res.status(200).json({
            success: true,
            message: "Province updated successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

/**
 * @route   GET /api/province/region/:regCode
 * @desc    Get all provinces by region code
 * @access  Public
 */
router.get("/region/:regCode", async (req, res) => {
    try {
        const provinces = await getProvincesByRegion(req.params.regCode);
        
        res.status(200).json({
            success: true,
            data: provinces
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

export default router;