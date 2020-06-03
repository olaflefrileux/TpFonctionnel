export interface Party {
    id: number,
    playerOnePass: number,
    playerTwoPass: number,
    grid: CellState[],
    isFinished: boolean
}

export enum CellState {
    EMPTY,
    CROSS,
    CIRCLE
}