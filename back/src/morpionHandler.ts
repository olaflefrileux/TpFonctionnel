import { Party, CellState, PartyStatus } from "./abstractMorpion";

class MorpionHandler {
    private games: Array<Party>;

    constructor() {
        this.games = new Array<Party>();
    }

    public createGame() {
        const o = {
            id: this.getRandomNumber(),
            grid: new Array<CellState>(),
            isFinished: false,
            actions: 0
            
        };
        for (let x = 0; x < 9; x++) {
            o.grid[x] = CellState.CLEAR;
        }
        this.games.push(o);
        return { "id": o.id.toString() };
    }

    public getRandomNumber(): number {
        return Math.floor(Math.random() * Math.floor(10000));
    }

    public play(gameId: number, player: string, cell: number): PartyStatus {
        const game = this.games.find(game => game.id === gameId);

        if (game === undefined || game.isFinished) {
            return { "status": CellState.EMPTY };
        }

        if (this.isAvailable(game, player, cell)) {
            game.actions += 1;
            const winner = this.checkWinner(game);
            if (winner !== CellState.EMPTY) {
                game.isFinished = true;
            }
            return { "status": winner};
        }
        return { "status": CellState.EMPTY};
    }

    isAvailable(game: Party, player: string, cell: number): boolean {
        if (game.grid[cell] === CellState.CLEAR) {
            game.grid[cell] = player === 'Cross' ? CellState.CROSS : CellState.CIRCLE;
            return true;
        } else {
            return false;
        }
    }

    checkWinner(game: Party): CellState {
        for (let x = 0; x < 3; x++) {
            if (game.grid[x] === game.grid[x + 3] && game.grid[x + 3] === game.grid[x + 6]) {
                if (game.grid[x] === CellState.CIRCLE) {
                    return CellState.CIRCLE;
                } else if (game.grid[x] === CellState.CROSS) {
                    return CellState.CROSS;
                }
            }
        }
        for (let x = 0; x < 7; x += 3) {
            if (game.grid[x] === game.grid[x + 1] && game.grid[x + 1] === game.grid[x + 2]) {
                if (game.grid[x] === CellState.CIRCLE) {
                    return CellState.CIRCLE;
                } else if (game.grid[x] === CellState.CROSS) {
                    return CellState.CROSS;
                }
            }
        }
        if (game.grid[0] === game.grid[4] && game.grid[4] === game.grid[8]) {
            if (game.grid[0] === CellState.CIRCLE) {
                return CellState.CIRCLE;
            } else if (game.grid[0] === CellState.CROSS) {
                return CellState.CROSS;
            }
        }
        if (game.grid[2] === game.grid[4] && game.grid[4] === game.grid[6]) {
            if (game.grid[2] === CellState.CIRCLE) {
                return CellState.CIRCLE;
            } else if (game.grid[2] === CellState.CROSS) {
                return CellState.CROSS;
            }
        }
        if (game.actions >= 9) {
            return CellState.TIE;
        }
        return CellState.EMPTY;
    }

    public getGrid(id: number) {
        const game = this.games.find(game => game.id === id);

        if (game === undefined) {
            return;
        }

        console.log(game)

        return {
            "grid": [
                [game.grid[0], game.grid[1], game.grid[2]],
                [game.grid[3], game.grid[4], game.grid[5]],
                [game.grid[6], game.grid[7], game.grid[8]]
            ]
        };
    }
}
export const morpionHandler = new MorpionHandler();