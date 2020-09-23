import React, { useState } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'

import { Game } from './app/features/Game'
import { Lobby } from './app/features/Lobby'

export const App = () => {
    const [userColor, setUserColor] = useState(null)
    const [skill, setSkill] = useState(null)

    const ComputerRoute = props => {
        if (props.userColor && props.skill) {
            return <Game
                gameType='computer'
                userColor={props.userColor}
                skill={props.skill}
            />
        } else {
            return <Redirect to='/lobby' />
        }
    }

    return (
        <div className="App">
            <Switch>
                <Route path="/local">
                    <Game gameType='local' />
                </Route>
                <Route path="/computer">
                    <ComputerRoute userColor={userColor} skill={skill} />
                </Route>
                <Route path='/'>
                    <Lobby setUserColor={setUserColor} setSkill={setSkill} />
                </Route>
            </Switch>
        </div>
    )
}