

class Task {
    static comparator(a, b) {
        let statusLevel = {
            "In Progress": 1,
            "Open": 2,
            "Complete": 3
        }

        let levelA = a.isOverdue === true
            ? 0 : statusLevel[a.status]

        let levelB = b.isOverdue === true
            ? 0 : statusLevel[b.status]

        let result = levelA - levelB;

        if (result === 0) {
            result = a.deadline - b.deadline;
        }

        return result;
    }

    constructor(title, deadline) {
        this.title = title;
        this.deadline = deadline;
        this.status = "Open";
    }

    get deadline() {
        return this._deadline
    }

    set deadline(date) {
        if (date < Date.now()) {
            throw Error("Deadline is in the past!");
        }
        this._deadline = date;
    }

    get isOverdue() {
        let result = false;

        if (this.status !== "Complete" &&
            this.deadline < Date.now()) {
            result = true
        }
        return result;
    }

    set status(val) {
        this._status = val
    }

    get status() {
        return this._status;
    }


    toString() {
        let statusIcon = this._getStatusIcon();
        let deadline = this._getDeadLine();

        let result = `[${statusIcon}] ${this.title}${deadline}`

        return result;
    }

    _getDeadLine() {
        let result;

        if (this.isOverdue === true) {
            result = " (overdue)"
        }
        else if (this.status === "Complete") {
            result = ""
        }
        else {
            result = ` (deadline: ${this._deadline})`
        }

        return result;
    }

    _getStatusIcon() {
        let result;

        switch (this.status) {
            case "Open":
                result = "\u2731";
                break;
            case "In Progress":
                result = "\u219D";
                break;
            case "Complete":
                result = "\u2714";
                break;
        }

        if (this.isOverdue === true) {
            result = "\u26A0";
        }

        return result;
    }
}

// let date1 = new Date();
// date1.setDate(date1.getDate() + 7); // Set date 7 days from now
// let task1 = new Task('JS Homework', date1);
// let date2 = new Date();
// date2.setFullYear(date2.getFullYear() + 1); // Set date 1 year from now
// let task2 = new Task('Start career', date2);
// console.log(task1 + '\n' + task2);
// let date3 = new Date();
// date3.setDate(date3.getDate() + 3); // Set date 3 days from now
// let task3 = new Task('football', date3);
// // Create two tasks with deadline set to current time
// let task4 = new Task('Task 4', new Date()); 
// let task5 = new Task('Task 5', new Date());
// task1.status = 'In Progress';
// task3.status = 'In Progress';
// task5.status = "Complete";
// let tasks = [task1, task2, task3, task4, task5];
// setTimeout(() => {
//   tasks.sort(Task.comparator);
//   console.log(tasks.join('\n'));
// }, 1000); // Sort and print 
// should throw an Error
// let overdueTask = new Task('Overdue Task', new Date(2005, '4', '20'));
// // should throw an Error
// task1.deadline = new Date(2005, '4', '20');
