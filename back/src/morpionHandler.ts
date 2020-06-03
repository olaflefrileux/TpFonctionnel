import { Party, CellState } from "./abstractMorpion";

class MorpionHandler {
    private games: Array<Party>;

    constructor() {
        this.games = new Array<Party>();
    }

    public createGame() {
        const o = {
            id: this.getRandomNumber(),
            playerOnePass: this.getRandomNumber(),
            playerTwoPass: this.getRandomNumber(),
            grid: new Array<CellState>(),
            isFinished: false
        };
        for (let x = 0; x < 9; x++) {
            o.grid[x] = CellState.EMPTY;
        }
        this.games.push(o);
        return Promise.resolve(3);
    }

    public getRandomNumber(): number {
        return Math.floor(Math.random() * Math.floor(10000));
    }

    public getGamesList() {
        return Promise.resolve(this.games.length);
    }

    public joinGame(gameId: number) {
        return new Promise((resolve, reject) => {
            const game = this.games.find(game => game.id === gameId);
            game !== undefined ? resolve(game.playerTwoPass) : reject();
        })
    }

    public play(gameId: number, cell: number) {
        const game = this.games.find(game => game.id === gameId);

        if (game === undefined || game.isFinished) {
            return;
        }

        if (this.isAvailable(game, cell)) {
            const winner = this.checkWinner(game);
            if (winner !== -1) {
                game.isFinished = true;
                // send event winner
                return winner;
            }
        }
    }

    isAvailable(game: Party, cell: number): boolean {
        if (game.grid[cell] !== CellState.EMPTY) {
            game.grid[cell] = CellState.CIRCLE
            return true;
        } else {
            return false;
        }
    }

    checkWinner(game: Party): number {
            for (let x = 0; x < 3; x++) {
                if (game.grid[x] === game.grid[x + 3] && game.grid[x + 3] === game.grid[x + 6]) {
                    if (game.grid[x] === CellState.CIRCLE) {
                        return game.playerOnePass;
                    } else if (game.grid[x] === CellState.CROSS) {
                        return game.playerTwoPass;
                    }
                }
                if (game.grid[x] === game.grid[x + 1] && game.grid[x + 1] === game.grid[x + 2]) {
                    if (game.grid[x] === CellState.CIRCLE) {
                        return game.playerOnePass;
                    } else if (game.grid[x] === CellState.CROSS) {
                        return game.playerTwoPass;
                    }
                }
            }
            if (game.grid[0] === game.grid[4] && game.grid[4] === game.grid[8]) {
                if (game.grid[0] === CellState.CIRCLE) {
                    return game.playerOnePass;
                } else if (game.grid[0] === CellState.CROSS) {
                    return game.playerTwoPass;
                }
            }
            if (game.grid[2] === game.grid[4] && game.grid[4] === game.grid[6]) {
                if (game.grid[2] === CellState.CIRCLE) {
                    return game.playerOnePass;
                } else if (game.grid[2] === CellState.CROSS) {
                    return game.playerTwoPass;
                }
            }
        return -1;
    }
}
export const morpionHandler = new MorpionHandler();