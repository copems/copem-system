import pool from "../congig/database.js";

class OccupancyUseGroup {
    constructor(ou_group_id) {
        this.ou_group_id = ou_group_id;
        this.ou_group_code = null;
        this.ou_group_desc = null;
    }

    // Getters
    getOuGroupId() {
        return this.ou_group_id;
    }

    getOuGroupCode() {
        return this.ou_group_code;
    }

    getOuGroupDesc() {
        return this.ou_group_desc;
    }

    // Setters
    setOuGroupId(ou_group_id) {
        this.ou_group_id = ou_group_id;
    }

    setOuGroupCode(ou_group_code) {
        this.ou_group_code = ou_group_code;
    }

    setOuGroupDesc(ou_group_desc) {
        this.ou_group_desc = ou_group_desc;
    }
}

export default OccupancyUseGroup;