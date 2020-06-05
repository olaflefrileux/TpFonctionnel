export interface Party {
    id: number,
    grid: CellState[],
    isFinished: boolean
}

export enum CellState {
    CLEAR = "Clear",
    CROSS = "Cross",
    CIRCLE = "Circle",
    EMPTY = ""
}

export interface PartyStatus {
    "status": CellState
}