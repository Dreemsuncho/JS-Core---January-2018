
const StringBuilder = require("./string-builder");
const assert = require("assert")
const expect = require("chai").expect

describe("StringBuilder", function () {
    let builder;

    it("should instantiated with a string argument or without anything", function () {
        // Arrange
        let withoutParam = () => builder = new StringBuilder();
        let withParam = () => builder = new StringBuilder("Param")

        // Act Assert
        expect(withoutParam).not.throw();
        expect(withParam).not.throw();
    });

    it("should throw with invalid constructor argument", function () {
        // Arrange
        let withInvalidParam = () => builder = new StringBuilder(1);
        // Act Assert
        expect(withInvalidParam).throw();
    });

    it("should has all properties", function () {
        // Arrange
        builder = new StringBuilder();
        let proto = Object.getPrototypeOf(builder);

        // Act Assert
        expect(proto.hasOwnProperty("constructor")).equal(true, "StringBuilder has not property: 'constructor'")
        expect(proto.hasOwnProperty("append")).equal(true, "StringBuilder has not property: 'append'")
        expect(proto.hasOwnProperty("prepend")).equal(true, "StringBuilder has not property: 'prepend'")
        expect(proto.hasOwnProperty("insertAt")).equal(true, "StringBuilder has not property: 'insertAt'")
        expect(proto.hasOwnProperty("remove")).equal(true, "StringBuilder has not property: 'remove'")
        expect(proto.hasOwnProperty("toString")).equal(true, "StringBuilder has not property: 'toString'")
        expect(proto.hasOwnProperty("toString")).equal(true, "StringBuilder has not property: 'toString'")
    });

    
    it("should have empty array data", function () {
        // Arrange
        builder = new StringBuilder();
        // Act Assert
        expect(builder._stringArray instanceof Array).equal(true);
        expect(builder._stringArray.length).equal(0);
    });

    it("should data in form of string Array", function () {
        // Arrange
        let param = "Param";
        builder = new StringBuilder(param);

        let expected = JSON.stringify(Array.from(param));
        let actual = JSON.stringify(builder._stringArray);
        // Act Assert
        expect(actual).equal(expected);
    });

    it("should append correctly", function () {
        // Arrange
        let param = "Param";
        let chunk = "Chunk"
        builder = new StringBuilder(param);

        // Act
        builder.append(chunk)

        let expected = JSON.stringify(Array.from(param + chunk));
        let actual = JSON.stringify(builder._stringArray);
        // Assert
        expect(actual).equal(expected);
    });

    it("should prepend correctly", function () {
        // Arrange
        let param = "Param";
        let chunk = "Chunk"
        builder = new StringBuilder(param);

        // Act
        builder.prepend(chunk);

        let expected = JSON.stringify(Array.from(chunk + param));
        let actual = JSON.stringify(builder._stringArray);
        // Assert
        expect(actual).equal(expected);
    });

    it("should insert at index correctly", function () {
        // Arrange
        let param = "Param";
        let chunk = "Chunk"
        builder = new StringBuilder(param);

        // Act
        builder.insertAt(chunk, 1);

        let expected = JSON.stringify(Array.from("PChunkaram"));
        let actual = JSON.stringify(builder._stringArray);
        // Assert
        expect(actual).equal(expected);
    });

    it("should remove at index correctly", function () {
        // Arrange
        let param = "Param";
        builder = new StringBuilder(param);

        // Act
        builder.remove(1, 2);

        let expected = JSON.stringify(Array.from("Pam"));
        let actual = JSON.stringify(builder._stringArray);
        // Assert
        expect(actual).equal(expected);
    });

    it("should convert data into String correctly", function () {
        // Arrange
        let param = "Param";
        builder = new StringBuilder(param);

        // Act
        let result = builder.toString();

        // Assert
        expect(result).equal(param);
    });

    it("should throw when append with invalid param", function (){
        // Arrange
        builder = new StringBuilder("Param");
        // Act
        let throwAppend = () => builder.append(1);
        // Assert
        expect(throwAppend).throw();
    });

    it("should throw when prepend with invalid param", function (){
        // Arrange
        builder = new StringBuilder("Param");
        // Act
        let throwPrepend = () => builder.prepend(1);
        // Assert
        expect(throwPrepend).throw();
    });

    it("should throw when insertAt with invalid param", function (){
        // Arrange
        builder = new StringBuilder("Param");
        // Act
        let throwInsertAt = () => builder.insertAt(1);
        // Assert
        expect(throwInsertAt).throw();
    });
});