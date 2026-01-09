import pool from "../congig/database.js";

/**
 * Save a new city/municipality record
 * @param {Object} cityMunData - The city/municipality data
 * @param {string} cityMunData.citymun_code - City/Municipality code
 * @param {string} cityMunData.zipcode - Zipcode
 * @param {string} cityMunData.citymun_name - City/Municipality name
 * @param {number} cityMunData.prov_id - Province ID
 * @returns {Promise<number>} The newly created citymun_id
 */
export const saveCityMun = async (cityMunData) => {
    const { citymun_code, zipcode, citymun_name, prov_id } = cityMunData;

    try {
        const [result] = await pool.query(
            `CALL sp_InsertCityMun(?, ?, ?, ?, @p_citymun_id)`,
            [citymun_code, zipcode, citymun_name, prov_id]
        );

        const [rows] = await pool.query('SELECT @p_citymun_id AS citymun_id');
        return rows[0].citymun_id;
    } catch (error) {
        throw new Error(`Error saving city/municipality: ${error.message}`);
    }
};

/**
 * Get city/municipality by ID
 * @param {number} citymunId - The city/municipality ID
 * @returns {Promise<Object|null>} The city/municipality record or null if not found
 */
export const getCityMunById = async (citymunId) => {
    try {
        const [rows] = await pool.query(
            `CALL sp_GetCityMunById(?)`,
            [citymunId]
        );

        return rows[0]?.[0] || null;
    } catch (error) {
        throw new Error(`Error fetching city/municipality: ${error.message}`);
    }
};

/**
 * Update city/municipality record
 * @param {number} citymunId - The city/municipality ID
 * @param {Object} cityMunData - The city/municipality data to update
 * @returns {Promise<boolean>} True if update was successful
 */
export const updateCityMun = async (citymunId, cityMunData) => {
    const { citymun_code, zipcode, citymun_name, prov_id } = cityMunData;

    try {
        await pool.query(
            `CALL sp_UpdateCityMun(?, ?, ?, ?, ?)`,
            [citymunId, citymun_code, zipcode, citymun_name, prov_id]
        );

        return true;
    } catch (error) {
        throw new Error(`Error updating city/municipality: ${error.message}`);
    }
};

/**
 * Get all cities/municipalities by province ID
 * @param {number} provId - The province ID
 * @returns {Promise<Array>} Array of city/municipality records
 */
export const getCityMunsByProvince = async (provId) => {
    try {
        const [rows] = await pool.query(
            `CALL sp_GetCityMunsByProvince(?)`,
            [provId]
        );

        return rows[0] || [];
    } catch (error) {
        throw new Error(`Error fetching cities/municipalities by province: ${error.message}`);
    }
};