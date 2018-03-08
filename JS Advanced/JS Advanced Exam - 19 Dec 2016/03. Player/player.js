

class Player {
    constructor(nickName) {
        this.name = nickName;
        this.scores = []
    }

    addScore(score) {
        if (isNaN(score) === false && score !== null) {
            this.scores.push(Number(score));
        }
        return this
    }

    get scoreCount() {
        return this.scores.length;
    }

    get highestScore() {
        let result = Math.max(...this.scores)

        return result === -Infinity
            ? undefined
            : result
    }

    get topFiveScore() {
        return this.scores
            .sort((a, b) => b - a)
            .slice(0, 5);
    }

    toString() {
        return this.name + ": [" + this.scores.sort((a, b) => b - a) + "]";
    }
}
