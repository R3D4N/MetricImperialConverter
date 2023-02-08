const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function () {
    // #1
    test('is a whole number', function () {
        assert.isNumber(convertHandler.getNum('4gal'), 'int')
    })
    // #2
    test('is a decimal number', function () {
        assert.isNumber(convertHandler.getNum('4.2gal'), 'decimal')
    })
    // #3
    test('is a fractial input', function () {
        assert.isNumber(convertHandler.getNum('4/2gal'), 'fractial')
    })
    // #4
    test('is a fractial input with decimal', function () {
        assert.isNumber(convertHandler.getNum('4.2/2gal'), 'fractial-decimal')
    })
    // #5
    test('not double fraction', function () {
        assert.throw(() => { convertHandler.getNum('4/5/5gal') })
    })
    // #6
    test('default numerical 1', function () {
        assert.strictEqual(convertHandler.getNum('kg'), 1, 'default number 1')
    })
    // #7
    test('valid input unit', function () {
        assert.include(['gal', 'L', 'lbs', 'kg', 'km', 'mi'], convertHandler.getUnit('4kg'), 'correct unit')
    })
    // #8
    test('valid input unit', function () {
        assert.throw(() => { convertHandler.getUnit('4/5galo') })
    })
    // #9
    test('return valid input', function () {
        assert.include(['gal', 'L', 'lbs', 'kg', 'km', 'mi'], convertHandler.getUnit('4kG'), 'correct unit')
    })
    // #10
    test('return valid spelled-out', function () {
        assert.include(['gallons', 'liters', 'pounds', 'kilograms', 'kilometers', 'miles'], convertHandler.spellOutUnit('kg'), 'correct spelled-out string')
    })
    // #11
    test('convert gal to L', function(){
        assert.strictEqual(convertHandler.getReturnUnit('gal'),'L', 'convert gal to L')
    })
    // #12
    test('convert L to gal', function(){
        assert.strictEqual(convertHandler.getReturnUnit('L'),'gal', 'convert L to gal')
    })
    // #13
    test('convert mi to Km', function(){
        assert.strictEqual(convertHandler.getReturnUnit('mi'),'km', 'convert mi to Km')
    })
    // #14
    test('convert Km to mi', function(){
        assert.strictEqual(convertHandler.getReturnUnit('km'),'mi', 'convert Km to mi')
    })
    // #15
    test('convert lbs to Kg', function(){
        assert.strictEqual(convertHandler.getReturnUnit('lbs'),'kg', 'convert lbs to Kg')
    })
    // #16
    test('convert Kg to lbs', function(){
        assert.strictEqual(convertHandler.getReturnUnit('kg'),'lbs', 'convert Kg to lbs')
    })
});