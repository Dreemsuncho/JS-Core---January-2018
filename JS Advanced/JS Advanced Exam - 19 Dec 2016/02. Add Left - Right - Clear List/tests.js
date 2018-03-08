
const makeList = require("./makeList.js");
const expect = require("chai").expect;

describe("makeList", function () {
    let myList = {};

    beforeEach(function () {
        myList = makeList();
    });

    it("should print empty string when no data is provided", function () {
        // Arrange Act Assert
        expect(myList.toString()).equal("");
    });

    it("should have one when add on left", function () {
        // Arrange
        let element = "1";
        // Act
        myList.addLeft(element)

        let result = myList.toString()
        // Assert
        expect(result).equal(element);
    })

    it("should have one when add on right", function () {
        // Arrange
        let element = "1";
        // Act
        myList.addRight(element)

        let result = myList.toString()
        // Assert
        expect(result).equal(element);
    })

    it("should have result '1, 2' when add consecutive on right", function () {
        // Arrange
        let element1 = "1";
        let element2 = "2";
        // Act
        myList.addRight(element1);
        myList.addRight(element2);

        let result = myList.toString();
        let expected = element1 + ", " + element2
        // Assert
        expect(result).equal(expected)
    })

    it("should have result '2, 1' when add consecutive on left", function () {
        // Arrange
        let element1 = "1";
        let element2 = "2";
        // Act
        myList.addLeft(element1);
        myList.addLeft(element2);
        
        let result = myList.toString();
        let expected = element2 + ", " + element1
        // Assert
        expect(result).equal(expected)
    })
    
    it("should stringify empty string when is clear", function () {
        // Arrange
        let element1 = "1";
        let element2 = "2";

        myList.addLeft(element1);
        myList.addLeft(element2);

        // Act
        myList.clear();

        let result = myList.toString();
        // Assert
        expect(result).equal("");
    })
});
