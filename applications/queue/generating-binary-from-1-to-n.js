/**
 * Generating binary number from 1 to n
 */

function Queue() {
    this.storage = [];
}
Queue.prototype.enqueue = function(value) {
    this.storage.push(value);
    return this.storage;
};

Queue.prototype.dequeue = function() {
    if (this.isEmpty()) {
        return;
    }
    return this.storage.shift();
};

Queue.prototype.front = function() {
    if (this.isEmpty()) {
        return 'Queue is underflow';
    }
    return this.storage[0];
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

// 1 10 11 100 101
function generateBinary(num) {
    const queue = new Queue();
    queue.enqueue('1');
    while (num--) {
        let str1 = queue.front()
        queue.dequeue();
        console.log(str1);
        queue.enqueue(str1 + 0);
        queue.enqueue(str1 + 1);
    }

    console.log(queue);
}

generateBinary(5);
