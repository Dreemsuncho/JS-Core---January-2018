

const createList = require("./create-list.js");
const expect = require("chai").expect;

describe("createList", function () {

    let list;
    beforeEach(function () {
        list = createList();
    });

    it("should have empty data when is initialized", function () {
        // Arrange Act Assert
        expect(list.toString()).equal("");
    });

    it("should have data '1' when add '1'", function () {
        // Arrange Act
        list.add(1);
        // Assert
        expect(list.toString()).equal("1");
    });

    it("should have data '1, 2' when add '1' and '2'", function () {
        // Arrange Act
        list.add(1);
        list.add(2);
        // Assert
        expect(list.toString()).equal("1, 2");
    });

    
    it("should add different objects in list", function () {
        // Arrange Act
        list.add(1);
        list.add("two");
        list.add({ tree: 3 })
        // Assert
        expect(list.toString()).equal("1, two, [object Object]");
    });

    it("should first become last when shift left", function () {
        // Arrange
        list.add(1);
        list.add(2);
        list.add(3);
        // Act
        list.shiftLeft();
        // Assert
        expect(list.toString()).equal("2, 3, 1");
    });

    it("should last become first when shift right", function () {
        // Arrange
        list.add(1);
        list.add(2);
        list.add(3);
        // Act
        list.shiftRight();
        // Assert
        expect(list.toString()).equal("3, 1, 2");
    });
    
    it("should return true when swap first and last item(zero-first)", function () {
        // Arrange
        list.add(1);
        list.add(2);
        list.add(3);
        // Act
        let result = list.swap(0, 2);
        // Assert
        expect(result).to.be.true;
    });

    it("should swap first and last item(zero-first)", function () {
        // Arrange
        list.add(1);
        list.add(2);
        list.add(3);
        // Act
        list.swap(0, 2);
        // Assert
        expect(list.toString()).equal("3, 2, 1");
    });

    it("should return true when swap first and last item(zero-last)", function () {
        // Arrange
        list.add(1);
        list.add(2);
        list.add(3);
        // Act
        let result = list.swap(2, 0);
        // Assert
        expect(result).to.be.true;
    });

    it("should swap first and last item(zero-last)", function () {
        // Arrange
        list.add(1);
        list.add(2);
        list.add(3);
        // Act
        list.swap(2, 0);
        // Assert
        expect(list.toString()).equal("3, 2, 1");
    });

    it("should return false when swap larger indexes first", function () {
        // Arrange
        list.add(1);
        list.add(2);
        list.add(3);
        // Act
        let result = list.swap(3, 0);
        // Assert
        expect(result).to.be.false;
    });

    it("should return false when swap larger indexes second", function () {
        // Arrange
        list.add(1);
        list.add(2);
        list.add(3);
        // Act
        let result = list.swap(0, 3);
        // Assert
        expect(result).to.be.false;
    });

    it("should do nothing when swap larger indexes first", function () {
        // Arrange
        list.add(1);
        list.add(2);
        list.add(3);
        // Act
        list.swap(3, 0);
        // Assert
        expect(list.toString()).equal("1, 2, 3");
    });

    it("should do nothing when swap larger indexes second", function () {
        // Arrange
        list.add(1);
        list.add(2);
        list.add(3);
        // Act
        list.swap(0, 3);
        // Assert
        expect(list.toString()).equal("1, 2, 3");
    });

    it("should return false when swap negative indexes first", function () {
        // Arrange
        list.add(1);
        list.add(2);
        list.add(3);
        // Act
        let result = list.swap(-2, 0);
        // Assert
        expect(result).to.be.false;
    });

    it("should return false when swap negative indexes second", function () {
        // Arrange
        list.add(1);
        list.add(2);
        list.add(3);
        // Act
        let result = list.swap(0, -2);
        // Assert
        expect(result).to.be.false;
    });

    it("should do nothing when swap negative indexes first", function () {
        // Arrange
        list.add(1);
        list.add(2);
        list.add(3);
        // Act
        list.swap(-2, 0);
        // Assert
        expect(list.toString()).equal("1, 2, 3");
    });

    it("should do nothing when swap negative indexes second", function () {
        // Arrange
        list.add(1);
        list.add(2);
        list.add(3);
        // Act
        list.swap(0, -2);
        // Assert
        expect(list.toString()).equal("1, 2, 3");
    });

    it("should return false when swap string indexes first", function () {
        // Arrange
        list.add(1);
        list.add(2);
        list.add(3);
        // Act
        let result = list.swap("1", 1);
        // Assert
        expect(result).to.be.false;
    });

    it("should return false when swap string indexes second", function () {
        // Arrange
        list.add(1);
        list.add(2);
        list.add(3);
        // Act
        let result = list.swap(1, "1");
        // Assert
        expect(result).to.be.false;
    });

    it("should do nothing when swap string indexes first", function () {
        // Arrange
        list.add(1);
        list.add(2);
        list.add(3);
        // Act
        list.swap("1", 1);
        // Assert
        expect(list.toString()).equal("1, 2, 3");
    });

    it("should do nothing when swap string indexes second", function () {
        // Arrange
        list.add(1);
        list.add(2);
        list.add(3);
        // Act
        list.swap(1, "1");
        // Assert
        expect(list.toString()).equal("1, 2, 3");
    });
    
    it("should return false when swap same indexes", function () {
        // Arrange
        list.add(1);
        list.add(2);
        list.add(3);
        // Act
        let result = list.swap(1, 1);
        // Assert
        expect(result).to.be.false;
    });

    it("should do nothing when swap same indexes", function () {
        // Arrange
        list.add(1);
        list.add(2);
        list.add(3);
        // Act
        list.swap(1, 1);
        // Assert
        expect(list.toString()).equal("1, 2, 3");
    });
});

