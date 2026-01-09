import pool from "../congig/database.js";

/**
 * Save a new province record
 * @param {Object} provinceData - The province data
 * @param {string} provinceData.prov_code - Province code
 * @param {string} provinceData.prov_name - Province name
 * @param {string} provinceData.reg_code - Region code
 * @returns {Promise<number>} The newly created prov_id
 */
export const saveProvince = async (provinceData) => {
    const { prov_code, prov_name, reg_code } = provinceData;

    try {
        const [result] = await pool.query(
            `CALL sp_InsertProvince(?, ?, ?, @p_prov_id)`,
            [prov_code, prov_name, reg_code]
        );

        const [rows] = await pool.query('SELECT @p_prov_id AS prov_id');
        return rows[0].prov_id;
    } catch (error) {
        throw new Error(`Error saving province: ${error.message}`);
    }
};

/**
 * Get province by ID
 * @param {number} provId - The province ID
 * @returns {Promise<Object|null>} The province record or null if not found
 */
export const getProvinceById = async (provId) => {
    try {
        const [rows] = await pool.query(
            `CALL sp_GetProvinceById(?)`,
            [provId]
        );

        return rows[0]?.[0] || null;
    } catch (error) {
        throw new Error(`Error fetching province: ${error.message}`);
    }
};

/**
 * Update province record
 * @param {number} provId - The province ID
 * @param {Object} provinceData - The province data to update
 * @returns {Promise<boolean>} True if update was successful
 */
export const updateProvince = async (provId, provinceData) => {
    const { prov_code, prov_name, reg_code } = provinceData;

    try {
        await pool.query(
            `CALL sp_UpdateProvince(?, ?, ?, ?)`,
            [provId, prov_code, prov_name, reg_code]
        );

        return true;
    } catch (error) {
        throw new Error(`Error updating province: ${error.message}`);
    }
};

/**
 * Get all provinces by region code
 * @param {string} regCode - The region code
 * @returns {Promise<Array>} Array of province records
 */
export const getProvincesByRegion = async (regCode) => {
    try {
        const [rows] = await pool.query(
            `CALL sp_GetProvincesByRegion(?)`,
            [regCode]
        );

        return rows[0] || [];
    } catch (error) {
        throw new Error(`Error fetching provinces by region: ${error.message}`);
    }
};