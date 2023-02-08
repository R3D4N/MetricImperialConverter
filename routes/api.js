'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  
  let convertHandler = new ConvertHandler();
  app.route('/api/convert').get((req, res)=>{
    let message = []
    let input = req.query.input
    let initNum,initUnit
    try {
      initNum = convertHandler.getNum(input)
    } catch (error) {
      message.push('invalid number')
    }
    try {
      initUnit = convertHandler.getUnit(input)
    } catch (error) {
      message.push('invalid unit')
    }
    if(message.length != 0){
      res.send(message.length>1 ? 'invalid number and unit' : message[0])
    }else{
      let returnNum = convertHandler.convert(initNum, initUnit)
      let returnUnit = convertHandler.getReturnUnit(initUnit)
      let data = convertHandler.getString(initNum, initUnit, returnNum, returnUnit)
      res.send(data)
    }
  })

};
