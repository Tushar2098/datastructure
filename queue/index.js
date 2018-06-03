function Queue(capacity) {
    this.storage = [];
    this.capacity = capacity;
}
Queue.prototype.enqueue = function(value) {
    if (this.storage.length < this.capacity) {
        this.storage.push(value);
        return this.storage;
    }
    throw new Error('Queue Overflow!!');
};

Queue.prototype.dequeue = function() {
    if (this.isEmpty()) {
        throw new Error('Queue underflow!!');
    }
    return this.storage.shift();
};

Queue.prototype.front = function() {
    if (this.isEmpty()) {
        throw new Error('Queue underflow!!');
    }
    return this.storage[0];
};

Queue.prototype.rear = function() {
    if (this.isEmpty()) {
        throw new Error('Queue underflow!!');
    }
    return this.storage[this.storage.length - 1];
};

Queue.prototype.isEmpty = function() {
    return this.storage.length === 0;
};

Queue.prototype.print = function() {
    let str = '';
    this.storage.forEach(val => {
        str += val + ' ';
    });
    return str;
};
const queue = new Queue(5);
queue.enqueue(10);
queue.enqueue(20);
queue.enqueue(30);
queue.enqueue(40);
queue.enqueue(50);
console.log(queue.rear());
console.log(queue.dequeue());
console.log(queue.front());
console.log(queue.isEmpty());
console.log(queue.print());
queue.enqueue(60);
console.log(queue);
