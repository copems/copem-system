/**
 * Service to fetch complete application data for populating forms
 * Fetches applicant information, construction information, and signatory data
 */

const API_BASE_URL = "http://localhost:3000/api";

/**
 * Fetch complete application data by application number
 * @param {string} applicationNumber - The application number
 * @returns {Promise<Object>} Complete application data
 */
export const fetchApplicationData = async (applicationNumber) => {
  try {
    // Fetch BPA construction data by application number
    const constructionResponse = await fetch(
      `${API_BASE_URL}/bpa-construction/application/${applicationNumber}`
    );
    
    if (!constructionResponse.ok) {
      throw new Error("Failed to fetch construction data");
    }
    
    const constructionResult = await constructionResponse.json();
    if (!constructionResult.success || !constructionResult.data) {
      throw new Error("Application data not found");
    }
    
    const constructionData = constructionResult.data;
    const applicantId = constructionData.applicant_id;
    const bpacId = constructionData.bpac_id;
    
    // Fetch applicant data
    const applicantResponse = await fetch(
      `${API_BASE_URL}/permit-applicant/id/${applicantId}`
    );
    
    let applicantData = null;
    if (applicantResponse.ok) {
      const applicantResult = await applicantResponse.json();
      if (applicantResult.success && applicantResult.data) {
        applicantData = applicantResult.data;
      }
    }
    
    // Fetch applicant government ID
    let govIdData = null;
    if (applicantId) {
      const govIdResponse = await fetch(
        `${API_BASE_URL}/applicant-gov-id/applicant/${applicantId}`
      );
      if (govIdResponse.ok) {
        const govIdResult = await govIdResponse.json();
        if (govIdResult.success && govIdResult.data && govIdResult.data.length > 0) {
          govIdData = govIdResult.data[0];
        }
      }
    }
    
    // Fetch construction site data
    let siteData = null;
    if (constructionData.bpac_site_id) {
      const siteResponse = await fetch(
        `${API_BASE_URL}/bpa-construction-site/${constructionData.bpac_site_id}`
      );
      if (siteResponse.ok) {
        const siteResult = await siteResponse.json();
        if (siteResult.success && siteResult.data) {
          siteData = siteResult.data;
        }
      }
    }
    
    // Fetch supervisor data
    let supervisorData = null;
    if (constructionData.bpac_supervisor_id) {
      const supervisorResponse = await fetch(
        `${API_BASE_URL}/bpac-supervisors/${constructionData.bpac_supervisor_id}`
      );
      if (supervisorResponse.ok) {
        const supervisorResult = await supervisorResponse.json();
        if (supervisorResult.success && supervisorResult.data) {
          supervisorData = supervisorResult.data;
        }
      }
    }
    
    // Fetch lot owner data
    let lotOwnerData = null;
    if (constructionData.bpacs_lot_owner_id) {
      const lotOwnerResponse = await fetch(
        `${API_BASE_URL}/bpa-cs-lot-owner/${constructionData.bpacs_lot_owner_id}`
      );
      if (lotOwnerResponse.ok) {
        const lotOwnerResult = await lotOwnerResponse.json();
        if (lotOwnerResult.success && lotOwnerResult.data) {
          lotOwnerData = lotOwnerResult.data;
        }
      }
    }
    
    // Fetch work scope type
    let workScopeType = null;
    if (constructionData.work_scope_type_id) {
      const workScopeResponse = await fetch(
        `${API_BASE_URL}/work-scope-type/${constructionData.work_scope_type_id}`
      );
      if (workScopeResponse.ok) {
        const workScopeResult = await workScopeResponse.json();
        if (workScopeResult.success && workScopeResult.data) {
          workScopeType = workScopeResult.data;
        }
      }
    }
    
    // Fetch ownership type
    let ownershipType = null;
    if (constructionData.ownership_type_id) {
      const ownershipResponse = await fetch(
        `${API_BASE_URL}/ownership-type/${constructionData.ownership_type_id}`
      );
      if (ownershipResponse.ok) {
        const ownershipResult = await ownershipResponse.json();
        if (ownershipResult.success && ownershipResult.data) {
          ownershipType = ownershipResult.data;
        }
      }
    }
    
    // Fetch occupancy use type
    let occupancyType = null;
    if (constructionData.ou_type_id) {
      const occupancyResponse = await fetch(
        `${API_BASE_URL}/occupancy-use-type/${constructionData.ou_type_id}`
      );
      if (occupancyResponse.ok) {
        const occupancyResult = await occupancyResponse.json();
        if (occupancyResult.success && occupancyResult.data) {
          occupancyType = occupancyResult.data;
        }
      }
    }
    
    // Fetch barangay data for address
    let barangayData = null;
    if (siteData && siteData.brgy_code) {
      // Try to get barangay by brgy_code from the site data
      // First try to get by ID if brgy_code is an ID
      const barangayResponse = await fetch(
        `${API_BASE_URL}/barangay/${siteData.brgy_code}`
      );
      if (barangayResponse.ok) {
        const barangayResult = await barangayResponse.json();
        if (barangayResult.success && barangayResult.data) {
          barangayData = barangayResult.data;
        }
      }
    }
    
    // Also try to get barangay from applicant's brgy_code
    if (!barangayData && applicantData && applicantData.brgy_code) {
      const barangayResponse = await fetch(
        `${API_BASE_URL}/barangay/${applicantData.brgy_code}`
      );
      if (barangayResponse.ok) {
        const barangayResult = await barangayResponse.json();
        if (barangayResult.success && barangayResult.data) {
          barangayData = barangayResult.data;
        }
      }
    }
    
    return {
      success: true,
      data: {
        applicant: applicantData,
        govId: govIdData,
        construction: constructionData,
        site: siteData,
        supervisor: supervisorData,
        lotOwner: lotOwnerData,
        workScopeType: workScopeType,
        ownershipType: ownershipType,
        occupancyType: occupancyType,
        barangay: barangayData,
        applicationNumber: applicationNumber,
      },
    };
  } catch (error) {
    console.error("Error fetching application data:", error);
    return {
      success: false,
      message: error.message || "Failed to fetch application data",
      error: error,
    };
  }
};

/**
 * Fetch application data using localStorage values
 * @returns {Promise<Object>} Complete application data
 */
export const fetchApplicationDataFromStorage = async () => {
  const applicationNumber = localStorage.getItem("application_number");
  if (!applicationNumber) {
    return {
      success: false,
      message: "Application number not found in localStorage",
    };
  }
  return await fetchApplicationData(applicationNumber);
};
