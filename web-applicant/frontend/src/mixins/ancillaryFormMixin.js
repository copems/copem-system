/**
 * Mixin for ancillary permit forms to load and populate application data
 */
import { fetchApplicationDataFromStorage } from "@/services/applicationDataService";

export const ancillaryFormMixin = {
  data() {
    return {
      loading: true,
      formData: {
        // Applicant Information
        lastName: "",
        firstName: "",
        middleInitial: "",
        tin: "",
        contactNo: "",
        addressStreet: "",
        addressBarangay: "",
        addressCity: "",
        zipCode: "",
        // Construction Information
        ownershipType: "",
        occupancyType: "",
        lotNo: "",
        blkNo: "",
        tctNo: "",
        taxDecNo: "",
        constructionStreet: "",
        constructionBarangay: "",
        constructionCity: "",
        // Application Number
        applicationNumber: "",
      },
      applicationNumberArray: new Array(8).fill(""),
    };
  },
  async mounted() {
    await this.loadApplicationData();
  },
  methods: {
    async loadApplicationData() {
      this.loading = true;
      try {
        const result = await fetchApplicationDataFromStorage();
        
        if (!result.success || !result.data) {
          console.error("Failed to load application data:", result.message);
          this.loading = false;
          return;
        }
        
        const data = result.data;
        
        // Populate applicant information
        if (data.applicant) {
          // Get name from user account if available, otherwise from applicant
          const user = JSON.parse(localStorage.getItem("user") || "{}");
          this.formData.lastName = user.last_name || data.applicant.last_name || "";
          this.formData.firstName = user.first_name || data.applicant.first_name || "";
          this.formData.middleInitial = (user.middle_name || data.applicant.middle_name || "").substring(0, 2);
          this.formData.tin = data.applicant.tin_no || "";
          this.formData.contactNo = data.applicant.contact_no || "";
          this.formData.addressStreet = `${data.applicant.house_no || ""} ${data.applicant.street || ""}`.trim();
        }
        
        // Populate address from barangay data
        if (data.barangay) {
          this.formData.addressBarangay = data.barangay.brgy_name || "";
          if (data.barangay.citymun_name) {
            this.formData.addressCity = data.barangay.citymun_name;
          }
        }
        
        // Populate construction information
        if (data.construction) {
          this.formData.taxDecNo = data.construction.tax_declaration_no || "";
        }
        
        // Populate construction site
        if (data.site) {
          this.formData.lotNo = data.site.lot_no || "";
          this.formData.blkNo = data.site.blk_no || "";
          this.formData.tctNo = data.site.tct_no || "";
          this.formData.constructionStreet = data.site.street || "";
          
          if (data.barangay) {
            this.formData.constructionBarangay = data.barangay.brgy_name || "";
            this.formData.constructionCity = data.barangay.citymun_name || "";
          }
        }
        
        // Populate ownership type
        if (data.ownershipType) {
          this.formData.ownershipType = data.ownershipType.ot_desc || "";
        }
        
        // Populate occupancy type
        if (data.occupancyType) {
          this.formData.occupancyType = data.occupancyType.ou_type_desc || "";
        }
        
        // Populate application number
        if (data.applicationNumber) {
          this.formData.applicationNumber = data.applicationNumber;
          // Convert application number to array for input boxes
          const appNo = data.applicationNumber.replace(/[^A-Z0-9]/g, "").substring(0, 8);
          this.applicationNumberArray = appNo.split("").concat(new Array(8 - appNo.length).fill(""));
        }
        
        if (this.isFormComplete !== undefined) {
          this.isFormComplete = true;
        }
      } catch (error) {
        console.error("Error loading application data:", error);
      } finally {
        this.loading = false;
      }
    },
  },
};
