
let Sumator = require("./sumator.js")
let expect = require("chai").expect;

describe("Sumator", function () {

    let sumator;

    beforeEach(function () {
        sumator = new Sumator();
    })

    it("should have empty array data", function () {
        // Arrange Act
        let data = JSON.stringify(sumator.data)
        let expected = JSON.stringify([])
        // Assert
        expect(data).equal(expected)
    });

    it("should have all members", function () {
        // Arrange Act
        let proto = Object.getPrototypeOf(sumator)
        let members = Object.getOwnPropertyNames(proto)

        let expectedMembers = [
            "constructor",
            "add",
            "sumNums",
            "removeByFilter",
            "toString"
        ]

        // Assert
        expectedMembers.forEach(m => {
            expect(members.includes(m)).equal(true);
        })
    });

    it("should add item succesfully", function () {
        // Arrange
        let number = 1;
        let str = "str";
        let str2 = "str2";

        // Act
        sumator.add(number)
        sumator.add(str)

        let data = sumator.data;
        // Assert
        expect(data.includes(number)).equal(true)
        expect(data.includes(str)).equal(true)
        expect(data.includes(str2)).equal(false)
    });

    it("should sum correctly", function () {
        // Arrange
        let num1 = 1;
        let num2 = "2";
        let num3 = "3";
        let num4 = "4";
        let num5 = 5;
        let num6 = 6;

        sumator.add(num1)
        sumator.add(num2)
        sumator.add(num3)
        sumator.add(num4)
        sumator.add(num5)
        sumator.add(num6)

        let expected = num1 + num5 + num6;
        // Act
        let result = sumator.sumNums()

        // Arrange
        expect(result).equal(expected);
    });

    it("should return 0 when data have no numbers", function () {
        // Arrange
        let item1 = undefined;
        let item2 = "2";
        let item3 = "3";
        let item4 = "4";
        let item5 = {};
        let item6 = [1, 2, 3, 4, 5, 6];

        sumator.add(item1)
        sumator.add(item2)
        sumator.add(item3)
        sumator.add(item4)
        sumator.add(item5)
        sumator.add(item6)

        let expected = 0;
        // Act
        let result = sumator.sumNums()

        // Arrange
        expect(result).equal(expected);
    });

    it("should remove filtered data", function () {
        // Arrange
        let item1 = undefined;
        let item2 = 2;
        let item3 = 3;
        let item4 = 4;
        let item5 = {};
        let item6 = [1, 2, 3, 4, 5, 6];

        sumator.add(item1)
        sumator.add(item2)
        sumator.add(item3)
        sumator.add(item4)
        sumator.add(item5)
        sumator.add(item6)

        let filter = (item) => typeof item === "number";

        // Act
        sumator.removeByFilter(filter);

        let data = sumator.data;
        // Assert
        expect(data.length).equal(3);
        expect(data[0]).equal(undefined)
        expect(JSON.stringify(data[1])).equal(JSON.stringify(item5))
        expect(JSON.stringify(data[2])).equal(JSON.stringify(item6))
    });

    it("should convert data into string", function () {
        // Arrange
        let items = [undefined, 2, 3, 4, {}, [1, 2, 3, 4, 5, 6]]
        let item1 = items[0];
        let item2 = items[1];
        let item3 = items[2];
        let item4 = items[3];
        let item5 = items[4];
        let item6 = items[5];

        sumator.add(item1);
        sumator.add(item2);
        sumator.add(item3);
        sumator.add(item4);
        sumator.add(item5);
        sumator.add(item6);

        let expected = items.join(", ");
        // Act
        let result = sumator.toString();

        // Assert
        expect(result).equal(expected);        
    });

    it("should return '(empty)' when have no data in", function () {
        // Arrange Act
        let expected = "(empty)"
        let result = sumator.toString();
        // Assert
        expect(result).equal(expected);
    });
});