function ConvertHandler() {

  this.getNum = function (input) {
    let numRegex = /[a-zA-Z]{1,3}$/
    let replaced = input.replace(numRegex, "")
    let result;
    if (replaced.length > 0) {
      if (replaced.includes('/')) {
        if (replaced.match(/\//g).length > 1) {
          throw new Error('doble fraction found')
        } else {
          let values = replaced.split('/')
          let num1 = Number(values[0])
          let num2 = Number(values[1])
          result = num1 / num2
        }
      } else {
        if (isNaN(replaced)) {
          throw new Error('input is not a number')
        }
        if (Number(replaced) > 0) {
          result = Number(replaced)
        } else {
          throw new Error('input is a negative number')
        }
      }
    } else {
      result = 1
    }
    return result;
  };

  this.getUnit = function (input) {
    let result
    let unitRegex = /(gal|L|lbs|kg|km|mi)$/ig
    let unit = input.match(unitRegex)
    if (unit == null) {
      throw new Error('invalid unit')
    } else {
      switch (true) {
        case /gal$/i.test(input):
          result = 'gal'; break;
        case /L$/i.test(input):
          result = 'L'; break;
        case /lbs$/i.test(input):
          result = 'lbs'; break;
        case /kg$/i.test(input):
          result = 'kg'; break;
        case /km$/i.test(input):
          result = 'km'; break;
        case /mi$/i.test(input):
          result = 'mi'; break;
      }
    }
    return result;
  };

  this.getReturnUnit = function (initUnit) {
    let result = {
      'gal': 'L',
      'L': 'gal',
      'lbs': 'kg',
      'kg': 'lbs',
      'mi': 'km',
      'km': 'mi'
    }
    return result[initUnit];
  };

  this.spellOutUnit = function (unit) {
    let result = {
      'gal': 'gallons',
      'L': 'liters',
      'lbs': 'pounds',
      'kg': 'kilograms',
      'mi': 'miles',
      'km': 'kilometers'
    }
    return result[unit];
  };

  this.convert = function (initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;

    switch (initUnit) {
      case 'gal':
        result = galToL * initNum; break;
      case 'L':
        result = initNum / galToL; break;
      case 'lbs':
        result = lbsToKg * initNum; break;
      case 'kg':
        result = initNum / lbsToKg; break;
      case 'mi':
        result = miToKm * initNum; break;
      case 'km':
        result = initNum / miToKm; break;
      default:
        result = 'error unit';
    }
    return Math.round(result * Math.pow(10, 5)) / Math.pow(10, 5);
  };

  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    let result;
    result = {
      "initNum": initNum,
      "initUnit": initUnit,
      "returnNum": returnNum,
      "returnUnit": returnUnit,
      "string": `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`
    }
    return result;
  };

}

module.exports = ConvertHandler;
