function Node(value = null, next = null) {
    this.value = value;
    this.next = next;
}
function LinkedList() {
    this.head = null;
}

LinkedList.prototype.isEmpty = function() {
    return this.head === null;
};

// [10] -> [15] -> [18] -> [20] -> null
// 1. create a node with value
// 2. assign its next to current head
// 3. update the current head with new node
LinkedList.prototype.prepend = function(value) {
    const node = new Node(value, this.head);
    this.head = node;
};

// [10] -> [15] -> [18] -> [20] -> null
// 1. create a node with value
// 2. traverse the node till last node
// 3. update last node's next to new node
LinkedList.prototype.append = function(value) {
    const node = new Node(value);
    if (this.isEmpty()) {
        this.head = node;
        return;
    }
    let currentNode = this.head;
    while (currentNode.next !== null) {
        currentNode = currentNode.next;
    }
    currentNode.next = node;
};

LinkedList.prototype.contains = function(value) {
    let currentNode = this.head;
    while (currentNode !== null) {
        if (currentNode.value === value) {
            return true;
        }
        currentNode = currentNode.next;
    }
    return false;
};

LinkedList.prototype.removeFrom = function(index) {};
LinkedList.prototype.insertAt = function(value, index) {};
LinkedList.prototype.indexof = function(value) {};

LinkedList.prototype.size = function() {
    let count = 0;
    let currentNode = this.head;
    while (currentNode !== null) {
        count++;
        currentNode = currentNode.next;
    }
    return count;
};

// [10] -> [15] -> [18] -> [20] -> null
//          cu
//  pre
LinkedList.prototype.remove = function(value) {
    if (!this.contains(value)) {
        return;
    }
    let currentNode = this.head;
    let previousNode = currentNode;
    //if first node
    if (this.head.value === value) {
        this.head = this.head.next;
        return;
    }
    while (currentNode !== null) {
        if (currentNode.value === value) {
            previousNode.next = currentNode.next;
        }
        previousNode = currentNode;
        currentNode = currentNode.next;
    }
};

LinkedList.prototype.print = function() {
    let currentNode = this.head;
    let str = '';
    while (currentNode !== null) {
        str += currentNode.value;
        if (currentNode.next !== null) {
            str += ', ';
        }
        currentNode = currentNode.next;
    }
    return `[${str}]`;
};

const ll = new LinkedList();
ll.prepend(10);
ll.prepend(3);
ll.append(13);
ll.append(18);
console.log(ll.contains(13));
// ll.remove(3);
// ll.remove(13);
// ll.remove(10);
console.log(ll.isEmpty());
console.log(ll.size());
console.log(ll.print());
console.log(JSON.stringify(ll, null, 4));
