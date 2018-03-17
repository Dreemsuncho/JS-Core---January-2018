


class Task {

    static comparator(a, b) {
        if (a.isOverdue === true && b.isOverdue === false) {
            return -1;
        }
        else if (a.isOverdue === false && b.isOverdue === true) {
            return 1;
        }
        else if (a.status === "In Progress" && b.status !== "In Progress") {
            return -1;
        }
        else if (a.status !== "In Progress" && b.status === "In Progress") {
            return 1;
        }
        else if (a.status === "Open" && b.status !== "Open") {
            return -1;
        }
        else if (a.status !== "Open" && b.status === "Open") {
            return 1;
        }
        else if (a.status === "Complete" && b.status !== "Complete") {
            return -1;
        }
        else if (a.status !== "Complete" && b.status === "Complete") {
            return 1;
        }
        else {
            return a.deadline - b.deadline;
        }
    }

    constructor(title, date) {

        this.title = title;
        this.deadline = date;
        this.status = "Open";

        this._statusIcons = {
            "Open": "\u2731",
            "In Progress": "\u219D",
            "Complete": "\u2714",
            "Overdue": "\u26A0",
        }
    }


    get title() {
        return this._title;
    }

    set title(title) {
        this._title = title;
    }

    get deadline() {
        return this._deadline;
    }
    set deadline(date) {
        if (Date.now() > date) { throw Error }
        this._deadline = date;
    }

    get status() {
        return this._status;
    }
    set status(status) {
        this._status = status;
    }

    get isOverdue() {
        let result = (Date.now() > this.deadline && this.status !== "Complete")
            ? true
            : false;

        if (result === true) {
            this.status = "Overdue";
        }

        return result;
    }

    toString() {
        this.isOverdue

        let result = "";

        result += `[${this._statusIcons[this.status]}]`;
        result += ` ${this.title}`;
        if (this.status !== "Complete") {
            result += ` ${this.isOverdue ? `(overdue)` : `(deadline: ${this.deadline})`}`;
        }
        return result;
    }

}

let expect = require("chai").expect;
let sinon = require("sinon");


let task;
let dateInTheFuture = new Date();
dateInTheFuture.setDate(60);
expect(() => task = new Task('Actual Task', dateInTheFuture), "Instance creation failed, make sure you have submitted a class").to.not.throw();

let dateWayAhead = new Date();
dateWayAhead.setDate(90);
let clock = sinon.useFakeTimers(dateWayAhead.getTime());

// Open and Overdue
expect(task.isOverdue, "Task should be overdue").to.be.true;
let string = task.toString();
expect(string).to.contains('[\u26A0]', "Task icon doesn't match status");
expect(string).to.contains('Actual Task', "Task name is not correctly displayed");
expect(string).to.contains('overdue', "Task should display (overdue)");

// In Progress and Overdue
task.status = 'In Progress';
string = task.toString();
console.log(string)
expect(string).to.contains('[\u26A0]', "Task icon doesn't match status");
expect(string).to.contains('Actual Task', "Task name is not correctly displayed");
expect(string).to.contains('overdue', "Task should display (overdue)");

// Complete and Overdue (shows complete)
task.status = 'Complete';
string = task.toString();
expect(string).to.contains('[\u2714]', "Task icon doesn't match status, completed tasks cannot be overdue");
expect(string).to.contains('Actual Task', "Task name is not correctly displayed");
expect(string).to.not.contains('overdue', "Completed task should not be overdue");

clock.restore();