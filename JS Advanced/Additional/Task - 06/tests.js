

const Sumator = require("./sumator.js");
const expect = require("chai").expect;


describe("Summator", function () {

    let sumator;
    beforeEach(function () {
        sumator = new Sumator();
    });

    it("should have constructor and properties", function () {
        let proto = Object.getPrototypeOf(sumator);
        let sumatorProps = Object.getOwnPropertyNames(proto);
        let propsShouldExist = ['constructor', 'add', 'sumNums', 'removeByFilter', 'toString'];

        propsShouldExist.forEach(prop => {
            expect(sumatorProps.includes(prop)).equal(true);
        });
    });

    it("should have member data=[]", function () {
        let sumatorPropNames = Object.getOwnPropertyNames(sumator);
        expect(sumatorPropNames[0]).equal("data");
        expect(sumator.data instanceof Array).equal(true);
    });

    it("should add number item in sumator data", function () {
        let itemToAdd = 1
        sumator.add(itemToAdd);
        let expected = JSON.stringify([itemToAdd]);
        let actual = JSON.stringify(sumator.data);
        expect(actual).equal(expected);
    });

    it("should add two number items in sumator data", function () {
        let itemToAdd1 = 1
        let itemToAdd2 = 1
        sumator.add(itemToAdd1);
        sumator.add(itemToAdd2);
        let expected = JSON.stringify([itemToAdd1, itemToAdd2]);
        let actual = JSON.stringify(sumator.data);
        expect(actual).equal(expected);
    });

    it("should add object item in sumator data", function () {
        let itemToAdd = {}
        sumator.add(itemToAdd);
        let expected = JSON.stringify([itemToAdd]);
        let actual = JSON.stringify(sumator.data);
        expect(actual).equal(expected);
    });

    it("should add two different objects item in sumator data", function () {
        let itemToAdd1 = { obj: 1 }
        let itemToAdd2 = [{ key: "val" }, itemToAdd1];
        sumator.add(itemToAdd1);
        sumator.add(itemToAdd2);
        let expected = JSON.stringify([itemToAdd1, itemToAdd2]);
        let actual = JSON.stringify(sumator.data);
        expect(actual).equal(expected);
    });

    it("should return 0 when sum empty sumator", function () {
        let result = sumator.sumNums();
        expect(result).equal(0);
    });

    it("should return 0 when sum data without numbers", function () {
        let itemToAdd1 = { obj: 1 }
        let itemToAdd2 = [{ key: "val" }, itemToAdd1];
        let result = sumator.sumNums();
        expect(result).equal(0);
    });

    it("should return 4 when sum data with few numbers", function () {
        let itemToAdd1 = { obj: 1 }
        let itemToAdd2 = [{ key: "val" }, itemToAdd1];
        let itemToAdd3 = 1;
        let itemToAdd4 = 3;
        sumator.add(itemToAdd1);
        sumator.add(itemToAdd2);
        sumator.add(itemToAdd3);
        sumator.add(itemToAdd4);
        let result = sumator.sumNums();
        expect(result).equal(itemToAdd3 + itemToAdd4);
    });

    it("shuld remove by numbers predicate", function () {
        let itemToAdd1 = { obj: 1 }
        let itemToAdd2 = [{ key: "val" }, itemToAdd1];
        let itemToAdd3 = 1;
        let itemToAdd4 = 3;
        sumator.add(itemToAdd1);
        sumator.add(itemToAdd2);
        sumator.add(itemToAdd3);
        sumator.add(itemToAdd4);
        sumator.removeByFilter(function (item) {
            return typeof item === "number";
        });
        let expected = JSON.stringify([itemToAdd1, itemToAdd2]);
        let actual = JSON.stringify(sumator.data);
        expect(expected).equal(actual);
    });

    it("should prit '(empty)' when sumator is empty", function () {
        expect(sumator.toString()).equal("(empty)")
    });

    it("should prit sumator items", function () {
        let itemToAdd1 = 1
        let itemToAdd2 = "2"
        let itemToAdd3 = { key1: 3, key2: "4" };
        sumator.add(itemToAdd1);
        sumator.add(itemToAdd2);
        sumator.add(itemToAdd3);
        expect(sumator.toString()).equal([itemToAdd1, itemToAdd2, itemToAdd3].join(", "));
    });
});
