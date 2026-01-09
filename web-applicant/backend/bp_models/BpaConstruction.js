import pool from "../congig/database.js";

class BpaConstruction {
    constructor(bpac_id, applicant_id, bpac_site_id, work_scope_type_id, ou_type_id, applicant_gov_id, bpacs_lot_owner_id, bpacs_lo_gov_id, bpac_supervisor_id) {
        this.bpac_id = bpac_id;
        this.application_no = null;
        this.applicant_id = applicant_id;
        this.area_no = null;
        this.ownership_type_id = null;
        this.bpac_site_id = bpac_site_id;
        this.work_scope_type_id = work_scope_type_id;
        this.workscope_remarks = null;
        this.ou_type_id = ou_type_id;
        this.ou_type_others = null;
        this.num_units = null;
        this.num_storey = null;
        this.total_floor_area = null;
        this.lot_area = null;
        this.building_cost = null;
        this.electrical_cost = null;
        this.electrical_equipment_cost = null;
        this.mechanical_cost = null;
        this.mechanical_equipment_cost = null;
        this.electronic_cost = null;
        this.electronic_equipment_cost = null;
        this.plumbing_cost = null;
        this.plumbing_equipment_cost = null;
        this.construction_date = null;
        this.completion_date = null;
        this.applicant_gov_id = applicant_gov_id;
        this.bpacs_lot_owner_id = bpacs_lot_owner_id;
        this.bpacs_lo_gov_id = bpacs_lo_gov_id;
        this.bpac_supervisor_id = bpac_supervisor_id;
    }

    // Getters
    getBpacId() {
        return this.bpac_id;
    }

    getApplicationNo() {
        return this.application_no;
    }

    getApplicantId() {
        return this.applicant_id;
    }

    getAreaNo() {
        return this.area_no;
    }

    getOwnershipTypeId() {
        return this.ownership_type_id;
    }

    getBpacSiteId() {
        return this.bpac_site_id;
    }

    getWorkScopeTypeId() {
        return this.work_scope_type_id;
    }

    getWorkscopeRemarks() {
        return this.workscope_remarks;
    }

    getOuTypeId() {
        return this.ou_type_id;
    }

    getOuTypeOthers() {
        return this.ou_type_others;
    }

    getNumUnits() {
        return this.num_units;
    }

    getNumStorey() {
        return this.num_storey;
    }

    getTotalFloorArea() {
        return this.total_floor_area;
    }

    getLotArea() {
        return this.lot_area;
    }

    getBuildingCost() {
        return this.building_cost;
    }

    getElectricalCost() {
        return this.electrical_cost;
    }

    getElectricalEquipmentCost() {
        return this.electrical_equipment_cost;
    }

    getMechanicalCost() {
        return this.mechanical_cost;
    }

    getMechanicalEquipmentCost() {
        return this.mechanical_equipment_cost;
    }

    getElectronicCost() {
        return this.electronic_cost;
    }

    getElectronicEquipmentCost() {
        return this.electronic_equipment_cost;
    }

    getPlumbingCost() {
        return this.plumbing_cost;
    }

    getPlumbingEquipmentCost() {
        return this.plumbing_equipment_cost;
    }

    getConstructionDate() {
        return this.construction_date;
    }

    getCompletionDate() {
        return this.completion_date;
    }

    getApplicantGovId() {
        return this.applicant_gov_id;
    }

    getBpacsLotOwnerId() {
        return this.bpacs_lot_owner_id;
    }

    getBpacsLoGovId() {
        return this.bpacs_lo_gov_id;
    }

    getBpacSupervisorId() {
        return this.bpac_supervisor_id;
    }

    // Setters
    setBpacId(bpac_id) {
        this.bpac_id = bpac_id;
    }

    setApplicationNo(application_no) {
        this.application_no = application_no;
    }

    setApplicantId(applicant_id) {
        this.applicant_id = applicant_id;
    }

    setAreaNo(area_no) {
        this.area_no = area_no;
    }

    setOwnershipTypeId(ownership_type_id) {
        this.ownership_type_id = ownership_type_id;
    }

    setBpacSiteId(bpac_site_id) {
        this.bpac_site_id = bpac_site_id;
    }

    setWorkScopeTypeId(work_scope_type_id) {
        this.work_scope_type_id = work_scope_type_id;
    }

    setWorkscopeRemarks(workscope_remarks) {
        this.workscope_remarks = workscope_remarks;
    }

    setOuTypeId(ou_type_id) {
        this.ou_type_id = ou_type_id;
    }

    setOuTypeOthers(ou_type_others) {
        this.ou_type_others = ou_type_others;
    }

    setNumUnits(num_units) {
        this.num_units = num_units;
    }

    setNumStorey(num_storey) {
        this.num_storey = num_storey;
    }

    setTotalFloorArea(total_floor_area) {
        this.total_floor_area = total_floor_area;
    }

    setLotArea(lot_area) {
        this.lot_area = lot_area;
    }

    setBuildingCost(building_cost) {
        this.building_cost = building_cost;
    }

    setElectricalCost(electrical_cost) {
        this.electrical_cost = electrical_cost;
    }

    setElectricalEquipmentCost(electrical_equipment_cost) {
        this.electrical_equipment_cost = electrical_equipment_cost;
    }

    setMechanicalCost(mechanical_cost) {
        this.mechanical_cost = mechanical_cost;
    }

    setMechanicalEquipmentCost(mechanical_equipment_cost) {
        this.mechanical_equipment_cost = mechanical_equipment_cost;
    }

    setElectronicCost(electronic_cost) {
        this.electronic_cost = electronic_cost;
    }

    setElectronicEquipmentCost(electronic_equipment_cost) {
        this.electronic_equipment_cost = electronic_equipment_cost;
    }

    setPlumbingCost(plumbing_cost) {
        this.plumbing_cost = plumbing_cost;
    }

    setPlumbingEquipmentCost(plumbing_equipment_cost) {
        this.plumbing_equipment_cost = plumbing_equipment_cost;
    }

    setConstructionDate(construction_date) {
        this.construction_date = construction_date;
    }

    setCompletionDate(completion_date) {
        this.completion_date = completion_date;
    }

    setApplicantGovId(applicant_gov_id) {
        this.applicant_gov_id = applicant_gov_id;
    }

    setBpacsLotOwnerId(bpacs_lot_owner_id) {
        this.bpacs_lot_owner_id = bpacs_lot_owner_id;
    }

    setBpacsLoGovId(bpacs_lo_gov_id) {
        this.bpacs_lo_gov_id = bpacs_lo_gov_id;
    }

    setBpacSupervisorId(bpac_supervisor_id) {
        this.bpac_supervisor_id = bpac_supervisor_id;
    }
}

export default BpaConstruction;