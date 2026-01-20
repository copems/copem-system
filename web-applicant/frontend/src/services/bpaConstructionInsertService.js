import api from './api';

const bpaConstructionService = {
  /**
   * Create a new BPA construction record
   * @param {Object} constructionData - The BPA construction data
   * @param {string} constructionData.application_no - Application number
   * @param {number} constructionData.applicant_id - Applicant ID
   * @param {string} constructionData.area_no - Area number
   * @param {number} constructionData.ownership_type_id - Ownership type ID
   * @param {number} constructionData.bpac_site_id - Construction site ID
   * @param {number} constructionData.work_scope_type_id - Work scope type ID
   * @param {string} constructionData.workscope_remarks - Work scope remarks
   * @param {number} constructionData.ou_type_id - Occupancy use type ID
   * @param {string} constructionData.ou_type_others - Other occupancy use type
   * @param {number} constructionData.num_units - Number of units
   * @param {number} constructionData.num_storey - Number of storeys
   * @param {number} constructionData.total_floor_area - Total floor area
   * @param {number} constructionData.lot_area - Lot area
   * @param {number} constructionData.building_cost - Building cost
   * @param {number} constructionData.electrical_cost - Electrical cost
   * @param {number} constructionData.electrical_equipment_cost - Electrical equipment cost
   * @param {number} constructionData.mechanical_cost - Mechanical cost
   * @param {number} constructionData.mechanical_equipment_cost - Mechanical equipment cost
   * @param {number} constructionData.electronic_cost - Electronic cost
   * @param {number} constructionData.electronic_equipment_cost - Electronic equipment cost
   * @param {number} constructionData.plumbing_cost - Plumbing cost
   * @param {number} constructionData.plumbing_equipment_cost - Plumbing equipment cost
   * @param {Date|string} constructionData.construction_date - Construction date
   * @param {Date|string} constructionData.completion_date - Completion date
   * @param {number} constructionData.applicant_gov_id - Applicant government ID
   * @param {number} constructionData.bpacs_lot_owner_id - Lot owner ID
   * @param {number} constructionData.bpacs_lo_gov_id - Lot owner government ID
   * @param {number} constructionData.bpac_supervisor_id - Supervisor ID
   * @returns {Promise<Object>} Response object with success status and data
   */
  async create(constructionData) {
    try {
      const response = await api.post('/bpa-construction', constructionData);
      return {
        success: true,
        data: response.data,
        message: response.data.message || 'BPA construction created successfully',
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to create BPA construction',
        error: error.response?.data?.error || error.message,
      };
    }
  },

  /**
   * Get BPA construction record by ID
   * @param {number} id - BPA construction ID
   * @returns {Promise<Object>} Response object with success status and data
   */
  async getById(id) {
    try {
      const response = await api.get(`/bpa-construction/${id}`);
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to fetch BPA construction',
        error: error.response?.data?.error || error.message,
      };
    }
  },

  /**
   * Update BPA construction record
   * @param {number} id - BPA construction ID
   * @param {Object} constructionData - The construction data to update
   * @returns {Promise<Object>} Response object with success status and data
   */
  async update(id, constructionData) {
    try {
      const response = await api.put(`/bpa-construction/${id}`, constructionData);
      return {
        success: true,
        data: response.data,
        message: response.data.message || 'BPA construction updated successfully',
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to update BPA construction',
        error: error.response?.data?.error || error.message,
      };
    }
  },

  /**
   * Get all BPA construction records by applicant ID
   * @param {number} applicantId - Applicant ID
   * @returns {Promise<Object>} Response object with success status and data
   */
  async getByApplicant(applicantId) {
    try {
      const response = await api.get(`/bpa-construction/applicant/${applicantId}`);
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to fetch BPA constructions by applicant',
        error: error.response?.data?.error || error.message,
      };
    }
  },

  /**
   * Get BPA construction record by application number
   * @param {string} applicationNo - Application number
   * @returns {Promise<Object>} Response object with success status and data
   */
  async getByApplicationNo(applicationNo) {
    try {
      const response = await api.get(`/bpa-construction/application/${applicationNo}`);
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to fetch BPA construction by application number',
        error: error.response?.data?.error || error.message,
      };
    }
  },

  /**
   * Delete BPA construction record
   * @param {number} id - BPA construction ID
   * @returns {Promise<Object>} Response object with success status and data
   */
  async delete(id) {
    try {
      const response = await api.delete(`/bpa-construction/${id}`);
      return {
        success: true,
        data: response.data,
        message: response.data.message || 'BPA construction deleted successfully',
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to delete BPA construction',
        error: error.response?.data?.error || error.message,
      };
    }
  },

  /**
   * Get the latest draft for an applicant
   * @param {number} applicantId - Applicant ID
   * @returns {Promise<Object>} Response object with success status and data
   */
  async getLatestDraft(applicantId) {
    try {
      const response = await api.get(`/bpa-construction/applicant/${applicantId}/draft`);
      return {
        success: true,
        data: response.data?.data || null,
      };
    } catch (error) {
      // If 404, it just means no draft exists - not an error
      if (error.response?.status === 404) {
        return {
          success: true,
          data: null,
        };
      }
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to fetch latest draft',
        error: error.response?.data?.error || error.message,
      };
    }
  },

  /**
   * Submit complete construction information (site + construction data)
   * This is a helper method that creates both site and construction records
   * @param {Object} completeData - Object containing both site and construction data
   * @param {Object} completeData.siteData - Construction site data
   * @param {Object} completeData.constructionData - BPA construction data (without bpac_site_id)
   * @returns {Promise<Object>} Response object with success status and both IDs
   */
  async submitCompleteConstruction(completeData) {
    const { siteData, constructionData } = completeData;
    
    try {
      // First, create the construction site
      const siteResponse = await this.createSite(siteData);
      
      if (!siteResponse.success) {
        return {
          success: false,
          message: 'Failed to create construction site',
          error: siteResponse.error,
        };
      }

      const bpacSiteId = siteResponse.data.data.bpac_site_id;

      // Then, create the construction record with the site ID
      const constructionResponse = await this.create({
        ...constructionData,
        bpac_site_id: bpacSiteId,
      });

      if (!constructionResponse.success) {
        return {
          success: false,
          message: 'Construction site created but failed to create construction record',
          error: constructionResponse.error,
          partialData: { bpac_site_id: bpacSiteId },
        };
      }

      return {
        success: true,
        message: 'Complete construction information submitted successfully',
        data: {
          bpac_site_id: bpacSiteId,
          bpac_id: constructionResponse.data.data.bpac_id,
        },
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to submit complete construction information',
        error: error.message,
      };
    }
  },

  /**
   * Helper method to create construction site (internal use)
   * @private
   */
  async createSite(siteData) {
    try {
      const response = await api.post('/bpa-construction-site', siteData);
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.error || error.message,
      };
    }
  },
};

export default bpaConstructionService;
