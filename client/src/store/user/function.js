import * as actionTypes from "./action";

//user
export function logIn(user) {
  return { type: actionTypes.LOGIN, user };
}
export function logOut() {
  return { type: actionTypes.LOGOUT };
}
export function getPatients(patients) {
  return { type: actionTypes.GETPATIENTS, patients };
}
export function getPatient(patient) {
  return { type: actionTypes.GETPATIENT, patient };
}
export function createTip(tip) {
  return { type: actionTypes.CREATETIP, tip };
}
export function getTips(tips) {
  return { type: actionTypes.GETTIPS, tips };
}
export function createPost(post) {
  return { type: actionTypes.CREATEPOST, post };
}
export function addReply(post) {
  return { type: actionTypes.ADDREPLY, post };
}
export function getPosts(posts) {
  return { type: actionTypes.GETPOSTS, posts };
}
export function deleteTip(tip) {
  return { type: actionTypes.DELETETIP, tip };
}
export function getConditions(conditions) {
  return { type: actionTypes.GETCONDITIONS, conditions };
}
