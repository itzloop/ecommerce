// constructing dynamic query

const createUpdateQuery = (key, value, updateObj) => {
  delete updateObj.createdAt;
  delete updateObj.updatedAt;
  delete updateObj.__v;
  delete updateObj._id;
  const entries = Object.keys(updateObj);
  console.log(entries);
  const updates = {};
  for (let i = 0; i < entries.length; i++) {
    updates[entries[i]] = Object.values(updateObj)[i];
  }
  const query = {
    update: {
      $set: updates,
    },
  };
  obj = {};
  obj[key] = value;
  query["condition"] = obj;
  return query;
};

module.exports = createUpdateQuery;
