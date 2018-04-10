

let PaymentPackage = require("./payment-package.js");
let expect = require("chai").expect;


describe("PaymentPackage", function () {
    it("should init correct with name(str) and val(number)", function () {
        let name = "name";
        let value = 1;
        let pp;
        let shouldNotThrow = () => pp = new PaymentPackage(name, value);

        expect(shouldNotThrow).not.throw();
        expect(pp.name).equal(name)
        expect(pp.value).equal(value)
        expect(pp.VAT).equal(20)
        expect(pp.active).equal(true)
    });

    it("should throw when one or more arguments are invalid", function () {
        let shouldThrow1 = () => new PaymentPackage();
        let shouldThrow2 = () => new PaymentPackage("");
        let shouldThrow3 = () => new PaymentPackage("Arg");
        let shouldThrow4 = () => new PaymentPackage("Arg", -1);
        let shouldThrow5 = () => new PaymentPackage("Arg", "-1");

        expect(shouldThrow1).throw();
        expect(shouldThrow2).throw();
        expect(shouldThrow3).throw();
        expect(shouldThrow4).throw();
        expect(shouldThrow5).throw();
    });

    it("should have prop names", function () {
        let pp = new PaymentPackage("Name", 1);
        ["_name", "_value", "_VAT", "_active"].forEach(prop => {
            pp.hasOwnProperty(prop);
        });
    })

    it("should prototype have prop names", function () {
        let pp = new PaymentPackage("Name", 1);
        ["constructor", "name", "value", "VAT", "active", "toString"].forEach(prop => {
            Object.getPrototypeOf(pp).hasOwnProperty(prop);
        });
    })

    it("should name prop work as expected", function () {
        let pp = new PaymentPackage("Name", 1);
        let nameToAssign = "Name1";

        pp.name = nameToAssign;
        let shouldThrow = () => pp.name = "";
        let shouldThrow2 = () => pp.name = 1;

        expect(pp.name).equal(nameToAssign);
        expect(shouldThrow).throw();
        expect(shouldThrow2).throw();
    });

    it("should value prop work as expected", function () {
        let pp = new PaymentPackage("Name", 1);
        let valueToAssign = 2;

        pp.value = valueToAssign;
        let shouldThrow = () => pp.value = -1;
        let shouldThrow2 = () => pp.value = "1";

        expect(pp.value).equal(valueToAssign);
        expect(shouldThrow).throw();
        expect(shouldThrow2).throw();
    });

    it("should VAT prop work as expected", function () {
        let pp = new PaymentPackage("Name", 1);
        let valueToAssign = 2;

        pp.VAT = valueToAssign;
        let shouldThrow = () => pp.VAT = -1;
        let shouldThrow2 = () => pp.VAT = "1";

        expect(pp.VAT).equal(valueToAssign);
        expect(shouldThrow).throw();
        expect(shouldThrow2).throw();
    });

    it("should active work as expected", function () {
        let pp = new PaymentPackage("Name", 1);
        let valueToAssign = false;

        pp.active = valueToAssign;
        let shouldThrow = () => pp.active = 1;
        expect(pp.active).equal(valueToAssign)
        expect(shouldThrow).throw();
    });

    it("stringify correctly", function () {
        let pp = new PaymentPackage("Name", 1);

        let expected = `Package: Name
- Value (excl. VAT): 1
- Value (VAT 20%): 1.2`

        expect(pp.toString()).equal(expected);

        let expected2 = `Package: Name (inactive)
- Value (excl. VAT): 1
- Value (VAT 20%): 1.2`

        pp.active = false;
        expect(pp.toString()).equal(expected2)
    });
});