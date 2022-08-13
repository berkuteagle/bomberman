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
        this.#height = 13;
        this.#width = 31;

        this.#state = Array(this.#height * this.#width).fill(0);
        this.clear();
    }

    clear() {
        this.#state.forEach((_, idx, arr) => {
            const row = getRow(idx, this.#width);
            const col = getCol(idx, this.#width);

            if (!row || row === (this.#height - 1) || !col || col === (this.#width - 1) || crossOven(row, col)) {
                arr[idx] = 9;
            }
        });

        // corner of first player
        this.#state[getIdx(1,1, this.#width)] = 8;
        this.#state[getIdx(1,2, this.#width)] = 8;
        this.#state[getIdx(2,1, this.#width)] = 8;

        // corner of second player
        this.#state[getIdx(this.#height - 2, this.#width - 2, this.#width)] = 8;
        this.#state[getIdx(this.#height - 2, this.#width - 3, this.#width)] = 8;
        this.#state[getIdx(this.#height - 3, this.#width - 2, this.#width)] = 8;

        // corner of third player
        this.#state[getIdx(1, this.#width - 2, this.#width)] = 8;
        this.#state[getIdx(1, this.#width - 3, this.#width)] = 8;
        this.#state[getIdx(2, this.#width - 2, this.#width)] = 8;

        // corner of fourth player
        this.#state[getIdx(this.#height - 2, 1, this.#width)] = 8;
        this.#state[getIdx(this.#height - 2, 2, this.#width)] = 8;
        this.#state[getIdx(this.#height - 3, 1, this.#width)] = 8;
    }

    print() {
        let row = '';
        for (let y = 0; y < this.#height; y++) {
            for (let x = 0; x < this.#width; x++) {
                row += (this.#state[x + y * this.#width]) || ' ';
            }
            row += '\n';
        }
        console.log(row);
    }

    fill(pattern) {
        const data = Array.from(pattern).map((i) => +i);
        let dataIdx = 0;
        this.#state.forEach((val, idx, arr) => {
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
        return this.#height;
    }

    get width() {
        return this.#width;
    }
}
