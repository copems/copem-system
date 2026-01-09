import pool from "../congig/database.js";

class LotOwnerGovId {
    constructor(log_id, bpacs_lot_owner_id) {
        this.log_id = log_id;
        this.id_no = null;
        this.date_issued = null;
        this.place_issued = null;
        this.bpacs_lot_owner_id = bpacs_lot_owner_id;
        this.is_active = true;
    }

    // Getters
    getLogId() {
        return this.log_id;
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

    getBpacsLotOwnerId() {
        return this.bpacs_lot_owner_id;
    }

    getIsActive() {
        return this.is_active;
    }

    // Setters
    setLogId(log_id) {
        this.log_id = log_id;
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

    setBpacsLotOwnerId(bpacs_lot_owner_id) {
        this.bpacs_lot_owner_id = bpacs_lot_owner_id;
    }

    setIsActive(is_active) {
        this.is_active = is_active;
    }
}

export default LotOwnerGovId;