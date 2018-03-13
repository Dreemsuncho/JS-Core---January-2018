

const list = require("./list.js")
const expect = require("chai").expect;

describe("List", function () {
    it("should have empty data when is initialized", function () {
        // Arrange Act
        let actual = list.toString()
        let expected = ""
        // Assert
        expect(actual).equal(expected);
    });

    it("should have one (1) data when one is added", function () {
        // Arrange Act
        let numberToAdd = 1
        list.add(numberToAdd)
        let actual = list.toString()

        // Assert
        expect(actual).equal(numberToAdd.toString())
    });

    it("should have '1, 2' data when '1' and '2' is added", function () {
        // Arrange Act
        let numberToAdd1 = 1
        let numberToAdd2 = 2
        list.add(numberToAdd1)
        list.add(numberToAdd2)
        
        let actual = list.toString()
        
        let expected = `${numberToAdd1}, ${numberToAdd2}`;
        // Assert
        expect(actual).equal(expected);
    });
    
    it("should have '1, 2' when delete last number", function () {
        // Arrange Act
        let numberToAdd1 = 1
        let numberToAdd2 = 2
        let numberToAdd3 = 3
        list.add(numberToAdd1)
        list.add(numberToAdd2)
        list.add(numberToAdd3)
        // Arrange Act Assert
        list.delete(2)
        let result = list.toString();

        expect(result).equal("1, 2")
    });

    it("should return undefined and delete nothing when index is invalid", function () {
        // Arrange Act
        let result = list.delete(2)
        let data = list.toString();

        // Assert
        expect(result).equal(undefined)
        expect(data).equal("");
    });

    it("should return undefined when try to delete with negative index", function () {
        // Arrange Act Assert
        expect(list.delete(-1)).equal(undefined);
    });

    it("should just print correct results", function () {
        // Arrange Act
        let numberToAdd1 = 1
        let numberToAdd2 = 2
        list.add(numberToAdd1)
        list.add(numberToAdd2)
        // Arrang Act Assert
        expect(list.toString()).equal("1, 2");
    });
});

