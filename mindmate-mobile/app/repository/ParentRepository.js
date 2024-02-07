import Repository from "./Repository";

const getParentDetails = (id) => {
  return Repository.get("/parent/" + id);
};

const updateParentDetails = (details) => {
  return Repository.put("/parent/", details);
};

const changePassword = (passwordDetails) => {
  return Repository.put("/parent/password/change", passwordDetails);
};

export { getParentDetails, updateParentDetails, changePassword };
