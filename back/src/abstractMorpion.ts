export interface Party {
    id: number,
    grid: CellState[],
    isFinished: boolean
}

export enum CellState {
    EMPTY = "Empty",
    CROSS = "Cross",
    CIRCLE = "Circle"
}

export interface PartyStatus {
    "status": CellState
}