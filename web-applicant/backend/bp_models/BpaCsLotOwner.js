import pool from "../congig/database.js";

class BpaCsLotOwner {
    constructor(bpacs_lot_owner_id, bpac_site_id, brgy_code) {
        this.bpacs_lot_owner_id = bpacs_lot_owner_id;
        this.bpac_site_id = bpac_site_id;
        this.lastname = null;
        this.firstname = null;
        this.middlename = null;
        this.address_details = null;
        this.brgy_code = brgy_code;
    }

    // Getters
    getBpacsLotOwnerId() {
        return this.bpacs_lot_owner_id;
    }

    getBpacSiteId() {
        return this.bpac_site_id;
    }

    getLastname() {
        return this.lastname;
    }

    getFirstname() {
        return this.firstname;
    }

    getMiddlename() {
        return this.middlename;
    }

    getAddressDetails() {
        return this.address_details;
    }

    getBrgyCode() {
        return this.brgy_code;
    }

    // Setters
    setBpacsLotOwnerId(bpacs_lot_owner_id) {
        this.bpacs_lot_owner_id = bpacs_lot_owner_id;
    }

    setBpacSiteId(bpac_site_id) {
        this.bpac_site_id = bpac_site_id;
    }

    setLastname(lastname) {
        this.lastname = lastname;
    }

    setFirstname(firstname) {
        this.firstname = firstname;
    }

    setMiddlename(middlename) {
        this.middlename = middlename;
    }

    setAddressDetails(address_details) {
        this.address_details = address_details;
    }

    setBrgyCode(brgy_code) {
        this.brgy_code = brgy_code;
    }
}

export default BpaCsLotOwner;