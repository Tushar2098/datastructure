import React, { Component } from "react";
import Queue from "./ds/Queue/queue.component";
import CircularQueue from "./ds/Queue/circularQueue.component";

class App extends Component {
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <h1 className="App-title">Learning DataStructure</h1>
                </header>
                <Queue />
                <hr />
                <CircularQueue />
            </div>
        );
    }
}

export default App;
