const _width = Symbol('width');
const _height = Symbol('height');
const _state = Symbol('state');

function getRow(index, width) {
    return Math.floor(index / width);
}

function getCol(index, width) {
    return index % width;
}

function crossOven(row, col) {
    return !(row % 2 || col % 2);
}

function getIdx(row, col, width) {
    return row * width + col;
}

export default class Level {
    constructor() {
        this[_height] = 13;
        this[_width] = 31;

        this[_state] = Array(this[_height] * this[_width]).fill(0);
        this.clear();
    }

    clear() {
        this[_state].forEach((_, idx, arr) => {
            const row = getRow(idx, this[_width]);
            const col = getCol(idx, this[_width]);

            if (!row || row === (this[_height] - 1) || !col || col === (this[_width] - 1) || crossOven(row, col)) {
                arr[idx] = 9;
            }
        });

        // corner of first player
        this[_state][getIdx(1,1, this[_width])] = 8;
        this[_state][getIdx(1,2, this[_width])] = 8;
        this[_state][getIdx(2,1, this[_width])] = 8;

        // corner of second player
        this[_state][getIdx(this[_height] - 2, this[_width] - 2, this[_width])] = 8;
        this[_state][getIdx(this[_height] - 2, this[_width] - 3, this[_width])] = 8;
        this[_state][getIdx(this[_height] - 3, this[_width] - 2, this[_width])] = 8;

        // corner of third player
        this[_state][getIdx(1, this[_width] - 2, this[_width])] = 8;
        this[_state][getIdx(1, this[_width] - 3, this[_width])] = 8;
        this[_state][getIdx(2, this[_width] - 2, this[_width])] = 8;

        // corner of fourth player
        this[_state][getIdx(this[_height] - 2, 1, this[_width])] = 8;
        this[_state][getIdx(this[_height] - 2, 2, this[_width])] = 8;
        this[_state][getIdx(this[_height] - 3, 1, this[_width])] = 8;
    }

    print() {
        let row = '';
        for (let y = 0; y < this[_height]; y++) {
            for (let x = 0; x < this[_width]; x++) {
                row += (this[_state][x + y * this[_width]]) || ' ';
            }
            row += '\n';
        }
        console.log(row);
    }

    fill(pattern) {
        const data = Array.from(pattern).map((i) => +i);
        let dataIdx = 0;
        this[_state].forEach((val, idx, arr) => {
            if (val < 8) {
                arr[idx] = data[dataIdx];
                dataIdx++;
                if (dataIdx === data.length) {
                    dataIdx = 0;
                }
            }
        });
    }

    get height() {
        return this[_height];
    }

    get width() {
        return this[_width];
    }
}
