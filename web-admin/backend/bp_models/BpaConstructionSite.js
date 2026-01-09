import pool from "../congig/database.js";

class BpaConstructionSite {
    constructor(bpac_site_id, applicant_id, brgy_code) {
        this.bpac_site_id = bpac_site_id;
        this.applicant_id = applicant_id;
        this.lot_no = null;
        this.block_no = null;
        this.tct_no = null;
        this.street = null;
        this.brgy_code = brgy_code;
        this.applicant_owned = null;
    }

    // Getters
    getBpacSiteId() {
        return this.bpac_site_id;
    }

    getApplicantId() {
        return this.applicant_id;
    }

    getLotNo() {
        return this.lot_no;
    }

    getBlockNo() {
        return this.block_no;
    }

    getTctNo() {
        return this.tct_no;
    }

    getStreet() {
        return this.street;
    }

    getBrgyCode() {
        return this.brgy_code;
    }

    getApplicantOwned() {
        return this.applicant_owned;
    }

    // Setters
    setBpacSiteId(bpac_site_id) {
        this.bpac_site_id = bpac_site_id;
    }

    setApplicantId(applicant_id) {
        this.applicant_id = applicant_id;
    }

    setLotNo(lot_no) {
        this.lot_no = lot_no;
    }

    setBlockNo(block_no) {
        this.block_no = block_no;
    }

    setTctNo(tct_no) {
        this.tct_no = tct_no;
    }

    setStreet(street) {
        this.street = street;
    }

    setBrgyCode(brgy_code) {
        this.brgy_code = brgy_code;
    }

    setApplicantOwned(applicant_owned) {
        this.applicant_owned = applicant_owned;
    }
}

export default BpaConstructionSite;