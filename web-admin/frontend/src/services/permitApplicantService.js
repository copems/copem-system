import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

/**
 * Permit Applicant Service
 * Handles all API calls related to permit applicants
 */

/**
 * Create a new permit applicant
 * @param {Object} applicantData - The applicant data
 * @returns {Promise<Object>} The created applicant response
 */
export const createPermitApplicant = async (applicantData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/permit-applicant`, applicantData);
        return response.data;
    } catch (error) {
        console.error('Error creating permit applicant:', error);
        throw error.response?.data || error;
    }
};

/**
 * Get permit applicant by ID
 * @param {number} applicantId - The applicant ID
 * @returns {Promise<Object>} The applicant data
 */
export const getPermitApplicantById = async (applicantId) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/permit-applicant/${applicantId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching permit applicant:', error);
        throw error.response?.data || error;
    }
};

/**
 * Get permit applicant by user ID
 * @param {number} userId - The user ID
 * @returns {Promise<Object>} The applicant data
 */
export const getPermitApplicantByUserId = async (userId) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/permit-applicant/user/${userId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching permit applicant by user ID:', error);
        throw error.response?.data || error;
    }
};

/**
 * Update permit applicant
 * @param {number} applicantId - The applicant ID
 * @param {Object} applicantData - The updated applicant data
 * @returns {Promise<Object>} The update response
 */
export const updatePermitApplicant = async (applicantId, applicantData) => {
    try {
        const response = await axios.put(`${API_BASE_URL}/permit-applicant/${applicantId}`, applicantData);
        return response.data;
    } catch (error) {
        console.error('Error updating permit applicant:', error);
        throw error.response?.data || error;
    }
};

/**
 * Get all permit applicants (if endpoint exists)
 * @returns {Promise<Object>} List of all applicants
 */
export const getAllPermitApplicants = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/permit-applicant`);
        return response.data;
    } catch (error) {
        console.error('Error fetching all permit applicants:', error);
        throw error.response?.data || error;
    }
};

export default {
    createPermitApplicant,
    getPermitApplicantById,
    getPermitApplicantByUserId,
    updatePermitApplicant,
    getAllPermitApplicants
};