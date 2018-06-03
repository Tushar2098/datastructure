import React, { Component } from 'react';

export default class Queue extends Component {
    constructor(props) {
        super(props);
        this.state = {
            storage: [],
            capacity: this.props.capacity || 10
        };
    }

    isFull() {
        const { capacity, storage } = this.state;
        return capacity === storage.length;
    }

    isEmpty() {
        const { storage } = this.state;
        return 0 === storage.length;
    }

    reset() {
        this.input.value = '';
    }
    
    enqueue(value) {
        if (this.isFull()) {
            throw new Error('Queue Overflow!!');
        }
        this.setState(({ storage }) => ({ storage: [...storage, value] }));
        this.reset();
    }

    dequeue() {
        if (this.isEmpty()) {
            throw new Error('Queue underflow!!');
        }
        let storage = this.state.storage;
        const removed = storage.shift();
        this.setState(({ storage }) => {
            return {
                storage: [...storage]
            };
        });
        return removed;
    }

    front() {
        if (this.isEmpty()) {
            throw new Error('Queue underflow!!');
        }
        return this.state.storage[0];
    }

    rear() {
        if (this.isEmpty()) {
            throw new Error('Queue underflow!!');
        }
        return this.state.storage[this.storage.length - 1];
    }

    onInputChange(e) {
        this.inputVal = e.target.value;
    }

    componentDidMount = () => {
        this.enqueue(1);
        this.enqueue(2);
        this.enqueue(3);
        this.enqueue(4);
        this.enqueue(5);
    };

    render() {
        return (
            <section className="queue">
                <header>
                    <input type="text" ref={input => (this.input = input)} />
                </header>
                <ul className="queue__list">
                    {this.state.storage.map((data, index) => (
                        <li key={index} className="queue__item">
                            {data}
                        </li>
                    ))}
                </ul>
                <div className="actions">
                    <ul className="actions__list">
                        <li className="actions__item">
                            <button onClick={() => this.enqueue(this.input.value)}>Enqueue</button>
                        </li>
                        <li className="actions__item">
                            <button onClick={() => this.dequeue()}>Dequeue</button>
                        </li>
                    </ul>
                </div>
            </section>
        );
    }
}
