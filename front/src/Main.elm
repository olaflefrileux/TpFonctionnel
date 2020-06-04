
module Main exposing (..)

import Browser
import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (..)
import Http
import Json.Decode as D exposing (Decoder, field, string)
import Json.Encode as E


main =
  Browser.element
    { init = init
    , update = update
    , subscriptions = subscriptions
    , view = view
    }

{- Model -}

type alias Model = 
  {
    id: String,
    grid: List (List State),
    playerTurn: State,
    status: String,
    error: String
  }

{- Init -}

init : () -> (Model, Cmd Msg)
init start = 
  (initModel "", getGame)


{- Sub -}

subscriptions: Model -> Sub Msg
subscriptions model = 
  Sub.none

{- Update -}

type State
  = Clear
  | Cross
  | Circle

type alias Position = 
  {
   x: Int, 
   y: Int
  } 


type Msg
  = AddShape Position
  | NewGame
  | GetGame (Result Http.Error String)
  | PlayerChoice (Result Http.Error String)
  | GetGrid (Result Http.Error (List (List State)))

update : Msg -> Model -> (Model, Cmd Msg)
update msg model = 
  case msg of
    AddShape position ->
      ( model, playerChoice model position )
    NewGame ->
      ( initModel "", getGame )
    GetGame res ->
      case res of
        Ok id ->
          ( initModel id, Cmd.none )
        Err _ ->
          (updateError model "GetGame", Cmd.none)
    PlayerChoice res ->
      case res of
        Ok status ->
          ( updateStatus model status, getGrid model)
        Err _ ->
          (updateError model "PlayerChoice", Cmd.none)
    GetGrid res ->
      case res of
        Ok grid ->
          ( updateGrid model grid |> updatePlayerTurn, Cmd.none)
        Err _ ->
          (updateError model "GetGrid", Cmd.none)
      

{- Api -}

getGame : Cmd Msg
getGame =
  Http.post
  {
    url = baseUrl ++ "create",
    body = Http.emptyBody,
    expect = Http.expectJson GetGame getGameDecoder
  }

getGameDecoder : Decoder String
getGameDecoder = 
  field "id" string

playerChoice : Model -> Position -> Cmd Msg
playerChoice model position = 
  Http.post
  {
    url = baseUrl ++ "play",
    body = Http.jsonBody <|
      E.object
        [
          ( "id", E.string model.id ),
          ( "playerTurn", E.string (stateToString model.playerTurn) ),
          ( "x", E.int position.x),
          ( "y", E.int position.y)
        ],
    expect = Http.expectJson PlayerChoice playerChoiceDecoder
  }

playerChoiceDecoder : Decoder String
playerChoiceDecoder = 
  field "status" string

getGrid : Model -> Cmd Msg
getGrid model = 
  Http.get 
  { 
    url = baseUrl ++ "grid/" ++  model.id,
    expect = Http.expectJson GetGrid getGridDecoder
  }
getGridDecoder : Decoder (List (List State))
getGridDecoder = 
  field "grid" ( D.list ( D.list stateDecoder) )

stateDecoder : Decoder State
stateDecoder = 
  D.string
        |> D.andThen (\str ->
           case str of
                "Clear" ->
                  D.succeed Clear
                "Cross" ->
                  D.succeed Cross
                "Circle" ->
                  D.succeed Circle
                _ ->
                  D.fail <| "Trying to decode info, but version "
        )
{- Helper -}

baseUrl = "http://localhost:8081/morpion/"

stateToString : State -> String
stateToString value = 
  case value of
    Clear ->
      "Clear"
    Cross ->
      "Cross"
    Circle ->
      "Circle"

returnPosition : Int -> Int -> Position
returnPosition x y =
  { x = x, y = y }

initModel : String -> Model
initModel id =
  { 
    id = id,
    grid = [ 
      [ Clear, Clear, Clear],
      [ Clear, Clear, Clear],
      [ Clear, Clear, Clear]
    ],
    playerTurn = Circle,
    status = "",
    error = ""
  }

updateStatus : Model -> String -> Model
updateStatus model status = 
  { model | status = status }

updateError : Model -> String -> Model
updateError model error = 
  { model | error = error }

updateGrid : Model -> List (List State) -> Model
updateGrid model grid =
 { model | grid = grid }

updatePlayerTurn : Model -> Model
updatePlayerTurn model =
  case model.playerTurn of
  Cross -> { model | playerTurn = Circle }
  _ -> { model | playerTurn = Cross }

{- View -}

rowItem: String -> Html Msg
rowItem id =
    div []
        [ text id ]

view: Model -> Html Msg
view model = 
  div [ class "container"]
    [
      h1 [class "title"] [text "Tic Tac Toe"],
      button [ class "button",  onClick NewGame] [text "Nouvelle partie"],
      div [class "game"]
      (List.indexedMap (\y elm -> div [ class "row"] (List.indexedMap(\x el -> div [classList [("cell", True), (stateToString el, True)], onClick (AddShape (returnPosition x y) )] [ span [][]]) elm)) model.grid)
    ]

