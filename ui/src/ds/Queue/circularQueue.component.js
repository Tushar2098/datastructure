import React, { Component } from "react";
import DonutChart from "../../charts/donut";

class CircularQueue extends Component {
    storage = [];
    front = -1;
    rear = -1;
    constructor(props) {
        super(props);
        this.state = {
            storage: this.storage,
            capacity: this.props.capacity || 10,
            front: this.front,
            rear: this.rear
        };
    }

    reset() {
        this.setState(({ front, rear }) => ({ front: -1, rear: -1 }));
    }

    increment(number) {
        return (number + 1) % this.state.capacity;
    }

    isFull() {
        return this.increment(this.state.rear) === this.state.front;
    }

    isEmpty() {
        return this.state.rear === -1 && this.state.front === -1;
    }

    updatePosition() {}

    enqueue(record) {
        if (this.isFull()) {
            throw new Error("Queue overflow!!");
        }
        if (this.isEmpty()) {
            this.front = this.increment(this.state.front);
        }
        this.rear = this.increment(this.state.rear);

        this.storage[this.rear] = record;
        this.setState({
            storage: this.storage,
            front: this.front,
            rear: this.rear
        });
    }

    render() {
        return (
            <div>
                <header>
                    <input type="text" ref={input => (this.input = input)} />
                </header>
                <footer>
                    <div className="actions">
                        <ul className="actions__list">
                            <li className="actions__item">
                                <button
                                    onClick={() =>
                                        this.enqueue(+this.input.value)
                                    }
                                >
                                    Enqueue
                                </button>
                            </li>
                            <li className="actions__item">
                                <button onClick={() => this.dequeue()}>
                                    Dequeue
                                </button>
                            </li>
                        </ul>
                    </div>
                </footer>
                <DonutChart data={this.state.storage} />
            </div>
        );
    }
}

export default CircularQueue;
