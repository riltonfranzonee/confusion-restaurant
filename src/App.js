import React from 'react';
import './App.css';
import Main from './components/MainComponent'
import {BrowserRouter} from 'react-router-dom'

export default class App extends React.Component {

render(){
  return (
    <BrowserRouter>
        <div>
            <Main/>
        </div>
    </BrowserRouter>
  )}
}

