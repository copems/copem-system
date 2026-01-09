import pool from "../congig/database.js";

class Barangay {
    constructor(brgy_id, citymun_id) {
        this.brgy_id = brgy_id;
        this.brgy_code = null;
        this.brgy_name = null;
        this.citymun_id = citymun_id;
    }

    // Getters
    getBrgyId() {
        return this.brgy_id;
    }

    getBrgyCode() {
        return this.brgy_code;
    }

    getBrgyName() {
        return this.brgy_name;
    }

    getCitymunId() {
        return this.citymun_id;
    }

    // Setters
    setBrgyId(brgy_id) {
        this.brgy_id = brgy_id;
    }

    setBrgyCode(brgy_code) {
        this.brgy_code = brgy_code;
    }

    setBrgyName(brgy_name) {
        this.brgy_name = brgy_name;
    }

    setCitymunId(citymun_id) {
        this.citymun_id = citymun_id;
    }
}

export default Barangay;