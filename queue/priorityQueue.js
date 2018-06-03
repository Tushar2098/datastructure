function PriorityQueue(capacity) {
    this.storage = [];
    this.capacity = capacity;
}
PriorityQueue.prototype.enqueue = function(ele) {
    if (this.isFull()) {
        throw new Error('Queue Overflow!!');
    }
    let added = false;
    for (let i = 0; i < this.storage.length; i++) {
        const item = this.storage[i];
        if (ele.priority < item.priority) {
            this.storage.splice(i, 0, ele);
            added = true;
            break;
        }
    }

    if (!added) {
        this.storage.push(ele);
    }
};

PriorityQueue.prototype.dequeue = function() {
    if (this.isEmpty()) {
        throw new Error('Queue underflow!!');
    }
    return this.storage.shift();
};

PriorityQueue.prototype.front = function() {
    if (this.isEmpty()) {
        throw new Error('Queue underflow!!');
    }
    return this.storage[0];
};

PriorityQueue.prototype.rear = function() {
    if (this.isEmpty()) {
        throw new Error('Queue underflow!!');
    }
    return this.storage[this.storage.length - 1];
};

PriorityQueue.prototype.isEmpty = function() {
    return this.storage.length === 0;
};

PriorityQueue.prototype.isFull = function() {
    return this.storage.length === this.capacity;
};

PriorityQueue.prototype.print = function() {
    let str = '';
    this.storage.forEach(val => {
        str += val + ' ';
    });
    return str;
};
const queue = new PriorityQueue(5);
queue.enqueue({ value: 'Tushar', priority: 3 });
queue.enqueue({ value: 'Swati', priority: 2 });
queue.enqueue({ value: 'Anajan', priority: 1 });
queue.enqueue({ value: 'Vinod', priority: 1 });
queue.enqueue({ value: 'Gunjan', priority: 1 });
console.log(queue.rear());
console.log(queue.dequeue());
console.log(queue.front());
console.log(queue.isEmpty());
console.log(queue);
