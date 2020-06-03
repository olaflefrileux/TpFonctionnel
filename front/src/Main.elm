
module Main exposing (..)

import Browser
import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (..)

main =
  Browser.element
    { init = init
    , update = update
    , subscriptions = subscriptions
    , view = view
    }

--Model

type alias Model = 
  {
    grid : List (List State)
  }

init : () -> (Model, Cmd Msg)
init _ = 
  (createGrid "-1", NewGame)

type State
  = Empty
  | Cross
  | Circle


type Msg 
  = AddPawn Int
  | NewGame

createGrid : String -> Model
createGrid id =
  { 
    grid = [ 
      [ Empty, Empty, Empty],
      [ Empty, Empty, Empty],
      [ Empty, Empty, Empty]
    ]
  }

-- SUBSCRIPTIONS

subscriptions : Model -> Sub Msg
subscriptions model =
  Sub.none

--UPDATE 

caseString : State -> String
caseString state = 
  case state of 
    Empty -> 
      "Empty"
    Cross -> 
      "Cross"
    Circle -> 
      "Circle"

update : Msg -> Model -> (Model, Cmd Msg)
update msg model =
  case msg of
    NewGame -> 
      (createGrid "")



-- HELPER


--View
view : Model -> Html Msg
view model =
  div [ ]
    [
      button
      [ class "buttons"] [text "New Game" ]
    , div 
      [ class "gridContainer"
      , style "display" "flex"
      ]
      (List.indexedMap (\i elm -> div 
                          [ class "column", onClick (AddPawn i) ]
                          (List.map(\n -> div
                                            [ 
                                              class (caseString n)
                                            ]
                                            [ 
                                              li [] []
                                            ]) elm)
                                        
        ) model.grid)
    ]