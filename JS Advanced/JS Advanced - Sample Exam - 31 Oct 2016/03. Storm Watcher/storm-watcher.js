

class StormWatcher {
    constructor(temperature, humidity, pressure, windSpeed) {
        this.id = StormWatcher._getNextId();
        this.temperature = temperature;
        this.humidity = humidity;
        this.pressure = pressure;
        this.windSpeed = windSpeed;
    }

    toString() {
        let isStormy = this._checkWeather();

        let result = `Reading ID: ${this.id}`;
        result += `\nTemperature: ${this.temperature}*C`;
        result += `\nRelative Humidity: ${this.humidity}%`;
        result += `\nPressure: ${this.pressure}hpa`;
        result += `\nWind Speed: ${this.windSpeed}m/s`;
        result += `\nWeather: ${isStormy ? "Stormy" : "Not stormy"}`;

        return result;
    }

    _checkWeather() {
        return this.temperature < 20 && this.windSpeed > 25 && (this.pressure < 700 || this.pressure > 900)
    }

    static _getNextId() {
        if (StormWatcher.counter === undefined) {
            StormWatcher.counter = 0
        }
        return StormWatcher.counter++;
    }
}


let record1 = new StormWatcher(32, 66, 760, 12);
console.log(record1.toString());

console.log("-------------------------------------")

let record2 = new StormWatcher(10, 40, 680, 30);
console.log(record2.toString());
