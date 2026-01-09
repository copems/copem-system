import pool from "../congig/database.js";

class OccupancyUseType {
    constructor(ou_type_id, ou_group_id) {
        this.ou_type_id = ou_type_id;
        this.ou_group_id = ou_group_id;
        this.ou_type_desc = null;
    }

    // Getters
    getOuTypeId() {
        return this.ou_type_id;
    }

    getOuGroupId() {
        return this.ou_group_id;
    }

    getOuTypeDesc() {
        return this.ou_type_desc;
    }

    // Setters
    setOuTypeId(ou_type_id) {
        this.ou_type_id = ou_type_id;
    }

    setOuGroupId(ou_group_id) {
        this.ou_group_id = ou_group_id;
    }

    setOuTypeDesc(ou_type_desc) {
        this.ou_type_desc = ou_type_desc;
    }
}

export default OccupancyUseType;