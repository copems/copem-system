import pool from "../congig/database.js";

class GovIdType {
    constructor(git_id) {
        this.git_id = git_id;
        this.git_desc = null;
    }

    // Getters
    getGitId() {
        return this.git_id;
    }

    getGitDesc() {
        return this.git_desc;
    }

    // Setters
    setGitId(git_id) {
        this.git_id = git_id;
    }

    setGitDesc(git_desc) {
        this.git_desc = git_desc;
    }
}

export default GovIdType;