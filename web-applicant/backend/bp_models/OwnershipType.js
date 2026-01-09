import pool from "../congig/database.js";

class OwnershipType {
    constructor(ot_id) {
        this.ot_id = ot_id;
        this.ot_desc = null;
    }

    // Getters
    getOtId() {
        return this.ot_id;
    }

    getOtDesc() {
        return this.ot_desc;
    }

    // Setters
    setOtId(ot_id) {
        this.ot_id = ot_id;
    }

    setOtDesc(ot_desc) {
        this.ot_desc = ot_desc;
    }
}

export default OwnershipType;