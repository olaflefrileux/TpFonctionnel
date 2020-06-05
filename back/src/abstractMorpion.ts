export interface Party {
    id: number,
    grid: CellState[],
    isFinished: boolean,
    actions: number
}

export enum CellState {
    CLEAR = "Clear",
    CROSS = "Cross",
    CIRCLE = "Circle",
    EMPTY = "",
    TIE = "Tie"
}

export interface PartyStatus {
    "status": CellState
}