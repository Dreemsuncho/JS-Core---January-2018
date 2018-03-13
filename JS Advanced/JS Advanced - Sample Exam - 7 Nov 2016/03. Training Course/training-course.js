
class TrainingCourse {

    constructor(title, trainer) {
        this.title = title;
        this.trainer = trainer;

        this.topics = [];
    }

    get firstTopic() {
        return this.topics[0];
    }

    get lastTopic() {
        return this.topics[this.topics.length - 1];
    }

    addTopic(title, date) {
        this.topics.push({
            title: title,
            date: date
        });
        this.topics.sort((t1, t2) => t1.date - t2.date);
        return this;
    }

    toString() {
        let result = `Course "${this.title}" by ${this.trainer}\n`;
        let topics = this.topics.map(t => ` * ${t.title} - ${t.date}`).join("\n");
        return result + topics;
    }
}
