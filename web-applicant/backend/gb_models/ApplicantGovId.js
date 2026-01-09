import pool from "../congig/database.js";

class ApplicantGovId {
    constructor(agid_id, applicant_id) {
        this.agid_id = agid_id;
        this.id_no = null;
        this.date_issued = null;
        this.place_issued = null;
        this.applicant_id = applicant_id;
        this.is_active = true;
    }

    // Getters
    getAgidId() {
        return this.agid_id;
    }

    getIdNo() {
        return this.id_no;
    }

    getDateIssued() {
        return this.date_issued;
    }

    getPlaceIssued() {
        return this.place_issued;
    }

    getApplicantId() {
        return this.applicant_id;
    }

    getIsActive() {
        return this.is_active;
    }

    // Setters
    setAgidId(agid_id) {
        this.agid_id = agid_id;
    }

    setIdNo(id_no) {
        this.id_no = id_no;
    }

    setDateIssued(date_issued) {
        this.date_issued = date_issued;
    }

    setPlaceIssued(place_issued) {
        this.place_issued = place_issued;
    }

    setApplicantId(applicant_id) {
        this.applicant_id = applicant_id;
    }

    setIsActive(is_active) {
        this.is_active = is_active;
    }
}

export default ApplicantGovId;