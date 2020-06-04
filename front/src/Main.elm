
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
    status: String
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
    url = baseUrl ++ "play/",
    body = Http.jsonBody <|
      E.object
        [
          ( "id", E.string model.id ),
          ( "playerTurn", E.string stateToString model.playerTurn ),
          ( "x" E.int position.x),
          ( "y" E.int position.y)
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
    url = baseUrl ++  model.id,
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
        )
{- Helper -}

baseUrl = "/morpion/"

stateToString : State -> String
stateToString value = 
  case value of
    Clear ->
      "Clear"
    Cross ->
      "Cross"
    Circle ->
      "Circle"

{- returnPosition : String -> String -> Position
returnPosition x y =
  { x = String.toInt x, y = String.toInt y } -}





updatePlayerTurn : Model -> String -> Model


