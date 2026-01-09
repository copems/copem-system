import pool from "../congig/database.js";

class CityMun {
    constructor(citymun_id, prov_id) {
        this.citymun_id = citymun_id;
        this.citymun_code = null;
        this.zipcode = null;
        this.citymun_name = null;
        this.prov_id = prov_id;
    }

    // Getters
    getCitymunId() {
        return this.citymun_id;
    }

    getCitymunCode() {
        return this.citymun_code;
    }

    getZipcode() {
        return this.zipcode;
    }

    getCitymunName() {
        return this.citymun_name;
    }

    getProvId() {
        return this.prov_id;
    }

    // Setters
    setCitymunId(citymun_id) {
        this.citymun_id = citymun_id;
    }

    setCitymunCode(citymun_code) {
        this.citymun_code = citymun_code;
    }

    setZipcode(zipcode) {
        this.zipcode = zipcode;
    }

    setCitymunName(citymun_name) {
        this.citymun_name = citymun_name;
    }

    setProvId(prov_id) {
        this.prov_id = prov_id;
    }
}

export default CityMun;