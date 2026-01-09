import pool from "../congig/database.js";

class Province {
    constructor(prov_id) {
        this.prov_id = prov_id;
        this.prov_code = null;
        this.prov_name = null;
        this.reg_code = null;
    }

    // Getters
    getProvId() {
        return this.prov_id;
    }

    getProvCode() {
        return this.prov_code;
    }

    getProvName() {
        return this.prov_name;
    }

    getRegCode() {
        return this.reg_code;
    }

    // Setters
    setProvId(prov_id) {
        this.prov_id = prov_id;
    }

    setProvCode(prov_code) {
        this.prov_code = prov_code;
    }

    setProvName(prov_name) {
        this.prov_name = prov_name;
    }

    setRegCode(reg_code) {
        this.reg_code = reg_code;
    }
}

export default Province;