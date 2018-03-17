

const expect = require("chai").expect;
const StringBuilder = require("./string-builder.js");


describe("StringBuilder", function () {
    
    it("should have constructor", function () {
        let proto = Object.getPrototypeOf(new StringBuilder());
        let sbProps = Object.getOwnPropertyNames(proto);
        let propsMustExist = [
            "constructor",
            "append",
            "prepend",
            "insertAt",
            "remove",
            "toString"
        ]
        propsMustExist.forEach(prop => expect(sbProps.includes(prop)).equal(true))
    });

    it("should be initialize without argument", function () {
        let sb = new StringBuilder();
        expect(sb.toString()).equal("");
    });

    it("should be initialize with argument", function () {
        let arg = "1";
        let sb = new StringBuilder(arg);
        expect(sb.toString()).equal(arg);
    });

    it("should throw when initialize with number arg", function () {
        let arg = 1;
        let shouldThrow = () => new StringBuilder(arg);
        expect(shouldThrow).throw(TypeError);
    });

    it("should have _stringArray member", function () {
        let sb = new StringBuilder();
        expect(sb.hasOwnProperty("_stringArray")).equal(true);
    });

    it("should have _stringArray member empty 'Array' instance", function () {
        let sb = new StringBuilder();
        expect(sb._stringArray instanceof Array).equal(true);
    });

    it("should have _stringArray member 'Array' instance with data [1,2,3]", function () {
        let sbData = "123";
        let sb = new StringBuilder(sbData);
        expect(sb._stringArray[0]).equal(sbData[0])
        expect(sb._stringArray[1]).equal(sbData[1])
        expect(sb._stringArray[2]).equal(sbData[2])
        expect(sb._stringArray.length).equal(sbData.length);
    });

    it("should append string element", function () {
        let sb = new StringBuilder();
        let argToAppend = "1";
        sb.append(argToAppend);
        expect(sb.toString()).equal(argToAppend);
    });

    it("should append few string elements", function () {
        let sb = new StringBuilder();
        let argToAppend1 = "1";
        let argToAppend2 = "2";
        sb.append(argToAppend1);
        sb.append(argToAppend2);
        expect(sb.toString()).equal(argToAppend1 + argToAppend2);
    });

    it("should throw when append no string element", function () {
        let sb = new StringBuilder();
        let argToAppend = 1;
        let shouldThrow = () => sb.append(argToAppend);
        expect(shouldThrow).throw(TypeError);
    });


    it("should prepend string element", function () {
        let argConstructor = "0"
        let sb = new StringBuilder(argConstructor);
        let argToAppend = "1";
        sb.prepend(argToAppend);
        expect(sb.toString()).equal(argToAppend + argConstructor);
    });

    it("should prepend few string elements", function () {
        let argConstructor = "0"
        let sb = new StringBuilder(argConstructor);
        let argToAppend1 = "1";
        let argToAppend2 = "2";
        sb.prepend(argToAppend1);
        sb.prepend(argToAppend2);
        expect(sb.toString()).equal(argToAppend2 + argToAppend1 + argConstructor);
    });

    it("should throw when append no string element", function () {
        let sb = new StringBuilder();
        let argToAppend = 1;
        let shouldThrow = () => sb.prepend(argToAppend);
        expect(shouldThrow).throw(TypeError);
    });

    it("should insert at", function () {
        let argConstructor = "0123456789"
        let sb = new StringBuilder(argConstructor);
        let argToInsert = "10";
        sb.insertAt(argToInsert, 1);
        expect(sb.toString()).equal("0" + argToInsert + "123456789");
    });

    it("should throw when insert at arg is not string", function () {
        let argConstructor = "0123456789"
        let sb = new StringBuilder(argConstructor);
        let argToInsert = 10;
        let shouldThrow = () => sb.insertAt(argToInsert, 1);
        expect(shouldThrow).throw(TypeError);
    });

    it("should insert at index correctly", function () {
        // Arrange
        let param = "Param";
        let chunk = "Chunk"
        let sb   = new StringBuilder(param);

        // Act
        sb.insertAt(chunk, 1);

        let expected = JSON.stringify(Array.from("PChunkaram"));
        let actual = JSON.stringify(sb._stringArray);
        // Assert
        expect(actual).equal(expected);
    });

    it("should remove correctly", function () {
        let argConstructor = "0123456789";
        let sb = new StringBuilder(argConstructor);
        sb.remove(1, 3);
        expect(sb.toString()).equal("0456789");
    });

    it("should remove correctly nothing", function () {
        let argConstructor = "0123456789";
        let sb = new StringBuilder(argConstructor);
        sb.remove(1, 0);
        expect(sb.toString()).equal(argConstructor);
    });

});