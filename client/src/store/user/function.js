import * as actionTypes from './action';

//user
export function logIn(user) {
    return { type: actionTypes.LOGIN, user }
}
export function logOut() {
    return { type: actionTypes.LOGOUT}
}
export function getPatients(patients) {
    return { type: actionTypes.GETPATIENTS, patients }
}
export function getPatient(patient) {
    return { type: actionTypes.GETPATIENT, patient }
}
export function createTip(tip) {
    return { type: actionTypes.CREATETIP, tip }
}
export function getTips(tips) {
    return { type: actionTypes.GETTIPS, tips }
}
export function deleteTip(tip) {
    return { type: actionTypes.DELETETIP, tip }
}
export function getConditions(conditions) {
    return { type: actionTypes.GETCONDITIONS, conditions }
}
