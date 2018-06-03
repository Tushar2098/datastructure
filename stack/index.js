function Stack() {
    this.count = 0;
    this.storage = {};
}

Stack.prototype.push = function(value) {
    this.storage[this.count] = value;
    this.count++;
    return this.count;
};
Stack.prototype.pop = function() {
    if (this.count === 0) {
        return;
    }
    this.count--;
    const result = this.storage[this.count];
    delete this.storage[this.count];
    return result;
};
Stack.prototype.peek = function() {
    if (this.count === 0) {
        return;
    }
    return this.storage[this.count - 1];
};

const stack = new Stack();
stack.push(1);
stack.push(3);
stack.push(2);
stack.pop();
stack.peek();
