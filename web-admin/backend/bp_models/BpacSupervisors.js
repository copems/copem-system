import pool from "../congig/database.js";

class BpacSupervisors {
    constructor(bpac_supervisor_id, brgy_code) {
        this.bpac_supervisor_id = bpac_supervisor_id;
        this.lastname = null;
        this.firstname = null;
        this.middlename = null;
        this.address_details = null;
        this.brgy_code = brgy_code;
        this.prc_no = null;
        this.validity = null;
        this.ptr_no = null;
        this.issued_date = null;
        this.issued_at = null;
        this.tin_no = null;
    }

    // Getters
    getBpacSupervisorId() {
        return this.bpac_supervisor_id;
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

    getPrcNo() {
        return this.prc_no;
    }

    getValidity() {
        return this.validity;
    }

    getPtrNo() {
        return this.ptr_no;
    }

    getIssuedDate() {
        return this.issued_date;
    }

    getIssuedAt() {
        return this.issued_at;
    }

    getTinNo() {
        return this.tin_no;
    }

    // Setters
    setBpacSupervisorId(bpac_supervisor_id) {
        this.bpac_supervisor_id = bpac_supervisor_id;
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

    setPrcNo(prc_no) {
        this.prc_no = prc_no;
    }

    setValidity(validity) {
        this.validity = validity;
    }

    setPtrNo(ptr_no) {
        this.ptr_no = ptr_no;
    }

    setIssuedDate(issued_date) {
        this.issued_date = issued_date;
    }

    setIssuedAt(issued_at) {
        this.issued_at = issued_at;
    }

    setTinNo(tin_no) {
        this.tin_no = tin_no;
    }
}

export default BpacSupervisors;