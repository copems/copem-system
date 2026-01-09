import express from "express";
import {
    saveCityMun,
    getCityMunById,
    updateCityMun,
    getCityMunsByProvince
} from "../gb_controllers/CityMunController.js";

const router = express.Router();

/**
 * @route   POST /api/city-mun
 * @desc    Create a new city/municipality
 * @access  Public
 */
router.post("/", async (req, res) => {
    try {
        const citymunId = await saveCityMun(req.body);
        res.status(201).json({
            success: true,
            message: "City/Municipality created successfully",
            data: { citymun_id: citymunId }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

/**
 * @route   GET /api/city-mun/:id
 * @desc    Get city/municipality by ID
 * @access  Public
 */
router.get("/:id", async (req, res) => {
    try {
        const cityMun = await getCityMunById(req.params.id);
        
        if (!cityMun) {
            return res.status(404).json({
                success: false,
                message: "City/Municipality not found"
            });
        }

        res.status(200).json({
            success: true,
            data: cityMun
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

/**
 * @route   PUT /api/city-mun/:id
 * @desc    Update city/municipality by ID
 * @access  Public
 */
router.put("/:id", async (req, res) => {
    try {
        const updated = await updateCityMun(req.params.id, req.body);
        
        if (!updated) {
            return res.status(404).json({
                success: false,
                message: "City/Municipality not found or update failed"
            });
        }

        res.status(200).json({
            success: true,
            message: "City/Municipality updated successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

/**
 * @route   GET /api/city-mun/province/:provId
 * @desc    Get all cities/municipalities by province ID
 * @access  Public
 */
router.get("/province/:provId", async (req, res) => {
    try {
        const cityMuns = await getCityMunsByProvince(req.params.provId);
        
        res.status(200).json({
            success: true,
            data: cityMuns
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

export default router;