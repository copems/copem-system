import pool from "../config/database.js";

class OccupancyUseGroup {
    constructor(ou_group_id) {
        this.ou_group_id = ou_group_id;
        this.ou_group_desc = null;
    }

    // Getters
    getOuGroupId() {
        return this.ou_group_id;
    }

    getOuGroupDesc() {
        return this.ou_group_desc;
    }

    // Setters
    setOuGroupId(ou_group_id) {
        this.ou_group_id = ou_group_id;
    }

    setOuGroupDesc(ou_group_desc) {
        this.ou_group_desc = ou_group_desc;
    }
}

export default OccupancyUseGroup;
