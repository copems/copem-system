import api from './api';

const constructionSiteService = {
  /**
   * Create a new construction site record
   * @param {Object} siteData - The construction site data
   * @param {number} siteData.applicant_id - Applicant ID
   * @param {string} siteData.lot_no - Lot number
   * @param {string} siteData.block_no - Block number
   * @param {string} siteData.tct_no - TCT number
   * @param {string} siteData.tax_dec_no - Tax declaration number
   * @param {string} siteData.street - Street
   * @param {string} siteData.brgy_code - Barangay Code
   * @param {boolean} siteData.applicant_owned - Whether owned by applicant
   * @returns {Promise<Object>} Response object with success status and data
   */
  async create(siteData) {
    try {
      const response = await api.post('/bpa-construction-site', siteData);
      return {
        success: true,
        data: response.data,
        message: response.data.message || 'Construction site created successfully',
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to create construction site',
        error: error.response?.data?.error || error.message,
      };
    }
  },

  /**
   * Get construction site by ID
   * @param {number} id - Construction site ID
   * @returns {Promise<Object>} Response object with success status and data
   */
  async getById(id) {
    try {
      const response = await api.get(`/bpa-construction-site/${id}`);
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to fetch construction site',
        error: error.response?.data?.error || error.message,
      };
    }
  },

  /**
   * Update construction site record
   * @param {number} id - Construction site ID
   * @param {Object} siteData - The construction site data to update
   * @returns {Promise<Object>} Response object with success status and data
   */
  async update(id, siteData) {
    try {
      const response = await api.put(`/bpa-construction-site/${id}`, siteData);
      return {
        success: true,
        data: response.data,
        message: response.data.message || 'Construction site updated successfully',
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to update construction site',
        error: error.response?.data?.error || error.message,
      };
    }
  },

  /**
   * Get all construction sites by applicant ID
   * @param {number} applicantId - Applicant ID
   * @returns {Promise<Object>} Response object with success status and data
   */
  async getByApplicant(applicantId) {
    try {
      const response = await api.get(`/bpa-construction-site/applicant/${applicantId}`);
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to fetch construction sites',
        error: error.response?.data?.error || error.message,
      };
    }
  },

  /**
   * Get all construction sites by barangay code
   * @param {string} brgyCode - Barangay code
   * @returns {Promise<Object>} Response object with success status and data
   */
  async getByBarangay(brgyCode) {
    try {
      const response = await api.get(`/bpa-construction-site/barangay/${brgyCode}`);
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to fetch construction sites by barangay',
        error: error.response?.data?.error || error.message,
      };
    }
  },

  /**
   * Delete construction site record
   * @param {number} id - Construction site ID
   * @returns {Promise<Object>} Response object with success status and data
   */
  async delete(id) {
    try {
      const response = await api.delete(`/bpa-construction-site/${id}`);
      return {
        success: true,
        data: response.data,
        message: response.data.message || 'Construction site deleted successfully',
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to delete construction site',
        error: error.response?.data?.error || error.message,
      };
    }
  },
};

export default constructionSiteService;
