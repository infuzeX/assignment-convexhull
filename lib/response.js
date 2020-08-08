const response = ( success , data , res) => {
  return res.json({success , data});
}

module.exports = response;