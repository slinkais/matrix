var symbolSize = 26;
var streams = [];

function setup() {
    createCanvas(innerWidth, innerHeight);
    textSize(symbolSize);
    populateScreen();
}

function populateScreen() {
    var x = 0;
    streams = [];
    for (var i = 0; i <= width / symbolSize; i++) {
        var stream = new Stream();
        stream.generateSymbols(x, random(0, -1000));
        streams.push(stream);
        x += symbolSize;
    }
}

function windowResized() {
    resizeCanvas(innerWidth, innerHeight);
    populateScreen();
}

function draw() {
    background(0, 150);
    streams.forEach(function (stream) {
        stream.render();
    })
}

function Symbol(x, y, speed, first) {
    this.x = x;
    this.y = y;
    this.value;
    this.speed = speed;
    this.switchInterval = round(random(2, 20));
    this.first = first;

    this.setToRandomSymbol = function () {
        if (frameCount % this.switchInterval == 0) {
            this.value = String.fromCharCode(
                0x30A0 + round(random(0, 96))
            );
        } else {
            this.value = this.value || String.fromCharCode(
                0x30A0 + round(random(0, 96))
            );
        }
    }

    this.rain = function () {
        this.y = (this.y >= height) ? 0 : this.y += this.speed;
    }
}

function Stream() {
    this.symbols = [];
    this.totalSymbols = round(random(1, height / symbolSize));
    this.speed = random(5, 20);

    this.generateSymbols = function (x, y) {
        var first = round(random(0, 3)) == 3;
        for (var i = 0; i <= this.totalSymbols; i++) {
            symbol = new Symbol(x, y, this.speed, first);
            symbol.setToRandomSymbol();
            this.symbols.push(symbol);
            y -= symbolSize;
            first = false;
        }
    }

    this.render = function () {
        this.symbols.forEach(function (symbol) {
            symbol.setToRandomSymbol();
            if (symbol.first) {
                fill(180, 255, 180);
            } else {
                fill(0, 255, 70);
            }
            text(symbol.value, symbol.x, symbol.y);
            symbol.rain();
        })
    }
}