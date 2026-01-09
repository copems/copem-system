import pool from "../congig/database.js";

class WorkScopeType {
    constructor(ws_type_id) {
        this.ws_type_id = ws_type_id;
        this.scope_desc = null;
    }

    // Getters
    getWsTypeId() {
        return this.ws_type_id;
    }

    getScopeDesc() {
        return this.scope_desc;
    }

    // Setters
    setWsTypeId(ws_type_id) {
        this.ws_type_id = ws_type_id;
    }

    setScopeDesc(scope_desc) {
        this.scope_desc = scope_desc;
    }
}

export default WorkScopeType;