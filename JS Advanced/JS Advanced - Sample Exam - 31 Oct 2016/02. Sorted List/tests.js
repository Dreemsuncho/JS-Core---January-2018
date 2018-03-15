
const SortedList = require("./sorted-list.js");
const expect = require("chai").expect;

describe("SortedList", function () {

    let list;
    beforeEach(function () {
        list = new SortedList();
    });

    it("have properties on prototype", function () {
        // Arrange Act Assert
        expect(SortedList.prototype.hasOwnProperty("constructor")).equal(true);
        expect(SortedList.prototype.hasOwnProperty("add")).equal(true);
        expect(SortedList.prototype.hasOwnProperty("remove")).equal(true);
        expect(SortedList.prototype.hasOwnProperty("get")).equal(true);
        expect(SortedList.prototype.hasOwnProperty("size")).equal(true);
    });

    it("should have a constructor", function () {
        // Arrange Act Assert
        expect(typeof SortedList).equal("function");
    });

    it("should be correct instance", function () {
        // Arrange Act Assert
        expect(list instanceof SortedList).equal(true)
    });

    it("should have zero elements when initialize", function () {
        // Arrange Act Assert
        expect(list.size).equal(0);
    });

    it("should have 1 element when add 1", function () {
        // Arrange
        let element = 1;
        // Act
        list.add(element);
        // Assert
        expect(list.size).equal(1);
    });

    it("should have two elements when add", function () {
        // Arrange
        let elem1 = 1;
        let elem2 = "2";
        // Act
        list.add(elem1);
        list.add(elem2);
        // Assert
        expect(list.size).equal(2);
    });

    it("should remove 1 element from list", function () {
        // Arrange
        let elem1 = 1;
        let elem2 = "2";

        list.add(elem1);
        list.add(elem2);

        // Act
        list.remove(1);
        // Assert
        expect(list.size).equal(1);
    });

    it("should mid element from list", function () {
        // Arrange
        let elem1 = 1;
        let elem2 = "2";
        let elem3 = { tree: "tree" };

        list.add(elem1);
        list.add(elem2);
        list.add(elem3);

        // Act
        list.remove(1);
        // Assert
        expect(list.get(0)).equal(elem1);
        expect(list.get(1)).equal(elem3);
    });

    it("should throw when remove from empty list", function () {
        // Arrange Act
        let shouldThrow = () => list.remove(0);
        // Assert
        expect(shouldThrow).throw();
    });

    it("should throw when remove with negative index", function () {
        // Arrange Act
        list.add(1);
        list.add(2);
        let shouldThrow = () => list.remove(-1);
        // Assert
        expect(shouldThrow).throw();
    });

    it("should throw when remove with index above or equal list length", function () {
        // Arrange Act
        list.add(1);
        list.add(2);
        let shouldThrow = () => list.remove(2);
        let shouldThrow2 = () => list.remove(3);
        // Assert
        expect(shouldThrow).throw();
        expect(shouldThrow2).throw();
    });

    it("should get correct indexes", function () {
        // Arrange
        let elem1 = 1;
        let elem2 = "2";
        let elem3 = { tree: "tree" };

        list.add(elem1);
        list.add(elem2);
        list.add(elem3);

        // Act
        let result1 = list.get(0);
        let result2 = list.get(1);
        let result3 = list.get(2);

        // Assert
        expect(result1).equal(elem1);
        expect(result2).equal(elem2);
        expect(result3).equal(elem3);
    });

    it("should throw when get when empty collection", function () {
        // Arrange
        let shouldThrow = () => list.get(0);
        // Act Assert
        expect(shouldThrow).throw();
    });

    it("should throw when get with negative index", function () {
        // Arrange
        list.add(1);
        list.add(2);
        list.add(3);
        let shouldThrow = () => list.get(-1);
        // Act Assert
        expect(shouldThrow).throw();
    });

    it("should throw when get with index above or equal list length", function () {
        // Arrange
        list.add(1);
        list.add(2);
        list.add(3);
        let shouldThrow1 = () => list.get(3);
        let shouldThrow2 = () => list.get(4);
        // Act Assert
        expect(shouldThrow1).throw();
        expect(shouldThrow2).throw();
    });

    it("should list be sorted", function () {
        // Arrange
        let elem4 = 4;
        let elem2 = 2;
        let elem1 = 1;
        let elem5 = 5;
        let elem6 = 6;
        let elem3 = 3;

        list.add(elem4);
        list.add(elem2);
        list.add(elem1);
        list.add(elem5);
        list.add(elem6);
        list.add(elem3);

        // Act
        let first = list.get(0);
        let second = list.get(1);
        let third = list.get(2);
        let fourth = list.get(3);
        let fifth = list.get(4);
        let sixth = list.get(5);

        // Assert
        expect(first).equal(elem1)
        expect(second).equal(elem2)
        expect(third).equal(elem3)
        expect(fourth).equal(elem4)
        expect(fifth).equal(elem5)
        expect(sixth).equal(elem6)
    });
});
