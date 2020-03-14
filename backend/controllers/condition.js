const Condition = require('../models/condition');

exports.getConditions = (req, res, next) => {
// req.body.symptoms.forEach(symptom => {

// })
  const pageSize = +req.query.pagesize; // The + sign converts the strings to numbers
  const currentPage = +req.query.page;
  // const conditionQuery = Condition.find({$or:[ {symptoms : { $in : [req.body[]]}}, {symptoms: { $in : [req.body]}}]});
  const conditionQuery = Condition.find({ symptoms : { $all : [req.body]}});
  let fetchedConditions;
  if(pageSize && currentPage) {
    conditionQuery
    .skip(pageSize * (currentPage - 1))
    .limit(pageSize);
  }
  conditionQuery.find().then(documents => {
    fetchedConditions = documents;
    return Condition.count();
  })
  .then(count => {
    res.status(200).json({
      message: 'Conditions Fetched Succesfully',
      conditions: fetchedConditions,
      totalConditions: count
    });
  })
  .catch(error => {
    res.status(500).json({
      message: 'Could not retrieve conditions'
    });
  });
}
