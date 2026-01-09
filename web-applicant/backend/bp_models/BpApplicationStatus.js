import pool from "../congig/database.js";

class BpApplicationStatus {
    constructor(bpa_status_id, bpac_id) {
        this.bpa_status_id = bpa_status_id;
        this.bpac_id = bpac_id;
        this.status_desc = null;
        this.remarks = null;
        this.date_conducted = null;
    }

    // Getters
    getBpaStatusId() {
        return this.bpa_status_id;
    }

    getBpacId() {
        return this.bpac_id;
    }

    getStatusDesc() {
        return this.status_desc;
    }

    getRemarks() {
        return this.remarks;
    }

    getDateConducted() {
        return this.date_conducted;
    }

    // Setters
    setBpaStatusId(bpa_status_id) {
        this.bpa_status_id = bpa_status_id;
    }

    setBpacId(bpac_id) {
        this.bpac_id = bpac_id;
    }

    setStatusDesc(status_desc) {
        this.status_desc = status_desc;
    }

    setRemarks(remarks) {
        this.remarks = remarks;
    }

    setDateConducted(date_conducted) {
        this.date_conducted = date_conducted;
    }
}

export default BpApplicationStatus;