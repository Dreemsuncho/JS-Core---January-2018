class PaymentProcessor {

    _setOptions(options) {
        if (options !== undefined) {
            let types = options["types"];
            let precision = options["precision"];
            if (types !== undefined)
                this.options["types"] = types;
            if (precision !== undefined)
                this.options["precision"] = precision;
        }
    }

    _isPaymentIdExist(id) {
        return this.payments.some(p => p.id === id);
    }

    _isTypeExist(type) {
        return this.options.types.includes(type);
    }

    constructor(options) {
        this.options = {
            types: ["service", "product", "other"],
            precision: 2
        };
        this._setOptions(options)
        this.payments = []
    }

    registerPayment(id, name, type, value) {
        // A valid payment will have an ID and name that are non-empty strings, a value that is a number and a type that is listed in options. 
        let isIdExist = this._isPaymentIdExist(id);
        let isTypeExist = this._isTypeExist(type);
        if (id === "" || name === "" || isIdExist === true || typeof value !== "number" || isTypeExist === false) {
            throw Error;
        }

        this.payments.push({
            id: id,
            name: name,
            type: type,
            value: value
        });
    }

    deletePayment(id) {
        let isIdExist = this._isPaymentIdExist(id);

        if (isIdExist === false) {
            throw Error;
        }
        else {
            this.payments = this.payments.filter(p => p.id !== id);
        }
    }

    get(id) {
        let isIdExist = this._isPaymentIdExist(id);

        if (isIdExist === false) {
            throw Error;
        }
        else {
            let payment = this.payments.filter(p => p.id === id)[0];
            let info = `Details about payment ID: ${payment.id}
- Name: ${payment.name}
- Type: ${payment.type}
- Value: ${Number(payment.value).toFixed(this.options.precision)}`

            return info
        }

    }

    setOptions(options) {
        this._setOptions(options);
    }

    toString() {
        let total = 0;
        this.payments.forEach(p => {
            if (p !== undefined) {
                total += p.value
            }
        })
        let result = `Summary:\n - Payments: ${this.payments.length}\n - Balance: ${Number(total).toFixed(this.options.precision)}`;
        return result;
    }
}

// Initialize processor with default options
const generalPayments = new PaymentProcessor();
generalPayments.registerPayment('0001', 'Microchips', 'product', 15000);
generalPayments.registerPayment('01A3', 'Biopolymer', 'product', 23000);
console.log(generalPayments.toString());

// Should throw an error (invalid type)
// generalPayments.registerPayment('E028', 'Rare-earth elements', 'materials', 8000);

generalPayments.setOptions({ types: ['product', 'material'] });
generalPayments.registerPayment('E028', 'Rare-earth elements', 'material', 8000);
console.log(generalPayments.get('E028'));
generalPayments.registerPayment('CF15', 'Enzymes', 'material', 55000);

// // Should throw an error (ID not found)
// generalPayments.deletePayment('E027');
// // Should throw an error (ID not found)
// generalPayments.get('E027');

generalPayments.deletePayment('E028');
console.log(generalPayments.toString());

// Initialize processor with custom types
const servicePyaments = new PaymentProcessor({ types: ['service'] });
servicePyaments.registerPayment('01', 'HR Consultation', 'service', 3000);
servicePyaments.registerPayment('02', 'Discount', 'service', -1500);
console.log(servicePyaments.toString());

// Initialize processor with custom precision
const transactionLog = new PaymentProcessor({ precision: 5 });
transactionLog.registerPayment('b5af2d02-327e-4cbf', 'Interest', 'other', 0.00153);
console.log(transactionLog.toString());
