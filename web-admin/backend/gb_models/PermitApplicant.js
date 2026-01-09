import pool from "../congig/database.js";

//field declaration
class PermitApplicant {
    constructor(applicant_id, user_id) {
        this.applicant_id = applicant_id;
        this.user_id = user_id;
        this.lastname = null;
        this.firstname = null;
        this.middlename = null;
        this.contact_no = null;
        this.tin_no = null;
        this.brgy_code = null;
        this.house_no = null;
        this.street = null;
    }

    // Getters
    getApplicantId() {
        return this.applicant_id;
    }

    getUserId() {
        return this.user_id;
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

    getContactNo() {
        return this.contact_no;
    }

    getTinNo() {
        return this.tin_no;
    }

    getBrgyCode() {
        return this.brgy_code;
    }

    getHouseNo() {
        return this.house_no;
    }

    getStreet() {
        return this.street;
    }

    // Setters
    setApplicantId(applicant_id) {
        this.applicant_id = applicant_id;
    }

    setUserId(user_id) {
        this.user_id = user_id;
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

    setContactNo(contact_no) {
        this.contact_no = contact_no;
    }

    setTinNo(tin_no) {
        this.tin_no = tin_no;
    }

    setBrgyCode(brgy_code) {
        this.brgy_code = brgy_code;
    }

    setHouseNo(house_no) {
        this.house_no = house_no;
    }

    setStreet(street) {
        this.street = street;
    }
}

export default PermitApplicant;