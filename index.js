'use strict';

class _Node {
  constructor(data, next, prev){
    this.data = data;
    this.next = next;
    
  }
}

class Stack {
  constructor(){
    this.top = null;
  }
  push(data) {
    if(this.top === null) {
      this.top = new _Node(data, null);
      return this.top;
    }
    const node = new _Node(data, this.top);
    this.top = node;
  }
  pop() {
    const node = this.top;
    this.top = node.next;
    return node.data;
  }
}

class Queue {
  constructor() {
    this.first = null;
    this.last = null;
  }

  enqueue(data) {
    const node = new _Node(data);

    if (this.first === null) {
      this.first = node;
    }

    if (this.last) {
      this.last.next = node;
    }
    //make the new node the last item on the queue
    this.last = node;
  }

  dequeue() {
    //if the queue is empty, there is nothing to return
    if (this.first === null) {
      return;
    }
    const node = this.first;
    this.first = this.first.next;
    //if this is the last item in the queue
    if (node === this.last) {
      this.last = null;
    }
    return node.value;
  }
}

class DLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
  }
  insertFirst(item){
    let newNode = new _Node(item, this.head, null);
    if(this.head !== null ){
      this.head.prev = newNode;
    } 
    this.head = newNode;
    if(this.tail === null){ 
      this.tail = newNode;
    }
  }
  insertLast(item){
    let newNode = new _Node(item, null, this.tail);
    if(this.tail !== null){
      this.tail.next = newNode;
    }
    this.tail = newNode;
    if(this.head === null ){
      this.head = newNode;
    } 
  }  
  insertAfter(item, prevItem){ 
    let currentNode = this.head;
    while(currentNode.value !== prevItem){
      if(currentNode === null){
        console.log('Item not found');
        return;
      } 
      currentNode = currentNode.next;
    }
    if(currentNode === this.last){
      insertLast(item);
    }
    else{
      let newNode = new _Node(item,currentNode.next,currentNode); 
      newNode.next = currentNode.next; 
      newNode.prev = currentNode; 
      currentNode.next.previous = newNode; 
      currentNode.next = newNode; 
    }
  }
  remove(item){
    if (!this.head){
      return null;
    }
    let current = this.head;
    while(current.value !== item){
      current = current.next;
      if(current === null){
        console.log('Item to remove is not on the list');
        return null;
      }   
    }
    //found it - now remove it

    //if the node to be removed is head, make the next node head
    if(current === this.head){
      this.head = current.next;
      //return;
    } else{
      current.prev.next = current.next;
    }
           
    //delete last node
    if(current === this.tail){
      this.tail = current.prev;
    } else{
      current.next.prev = current.prev;
    }
  }
}  

// class QueMutation {
//     constructor() {
//       this.first = new DoubleLinkedList;
//       this.last = this.first.tail;
//     }

//     enqueue(data)
//   }

class DoubleQueue {
  constructor() {
    this.first = new DLinkedList;
    this.last = this.first.tail;
  }

  enqueue(data) {
    return(this.first.insertLast(data));
  }

  dequeue() {
    //if the queue is empty, there is nothing to return
    if (this.last === null) {
      return null;
    }
    return this.first.remove();
  }

}


//outside queue functions

function peekQueue(queue){
  if(queue.first === null){
    return null;
  }
  return queue.first.data;

}

function isEmptyQueue(queue){
  if(queue.first === null){
    return true;
  } else {
    return false;
  }
}

function displayQueue(queue){
  if(queue.first === null){
    return null;
  }
  let first = queue.first;
  let next = queue.first.next;
  console.log(first);
  

  while (next !== undefined) {
    console.log(next);
    next = next.next;
  }

}




// outsite stack functions
function peek(stack){
  if(stack.top === null){
    return null;
  }
  //console.log(stack.top);
  return stack.top.data;
}

function isEmpty(stack){
  if(stack.top === null){
    return true;
  } else {
    return false;
  }
}

function display(stack){
  if(stack.top === null){
    return null;
  }
  let top = stack.top;
  let next = stack.top.next;

  console.log('top: ', top);

  while(next !== null){
    console.log(next);
    next = next.next;
  }
}

function is_palindrome(s){
  s = s.toLowerCase().replace(/[^a-zA-Z0-9]/g, "");
  // input: racecar
  // output: true
  // input: Tauhida
  // output: false
  // Put each character into a stack
  // Save the stack
  let firstStack = new Stack;
  let lastStack = new Stack;
  for(let i = 0; i < s.length; i++){
    firstStack.push(s.charAt(i));
  }
    
  for(let i = s.length - 1; i >= 0; i--){
    lastStack.push(s.charAt(i));
  }
  // While loop with both stacks
  // At each iteration, pop firstStack and pop lastStack and compare
  // If ever false, then return false
  // Otherwise return true

  while(!isEmpty(firstStack) && !isEmpty(lastStack)){
    let firstLetter = firstStack.pop();
    let lastLetter = lastStack.pop();

    if(firstLetter !== lastLetter){
      return false;
    } else {
      return true;
    }
  }

  // if(firstStack === lastStack){
  //     console.log('true')
  //     return true;
  // } else {
  //     return false;
  // }

}

function matchingParentheses(expression){
  // input: '2 + (5 * 6)'
  // output: true
  // input: '2 + ( 5 * 6'
  // output: Missing parens at position 10

  let expressionStack = new Stack;
  for(let i = 0; i < expression.length; i++){
    if(expression.charAt(i) === '('){
      expressionStack.push(expression.charAt(i));
    } 
    else if(!isEmpty(expressionStack) && expression.charAt(i) === ')'){
      expressionStack.pop();
    } 
    else if(isEmpty(expressionStack) && expression.charAt(i) === ')'){
      return false;
    }
  }
  if(isEmpty(expressionStack)){
    return true;
  } else {
    return false;
  }
}

//input [3,5,1,4,2] -- output [1, 2, 3, 4, 5]

function sortStack(stack){
  
  let holder = new Stack;
  console.log(isEmpty(stack));
  //   console.log(temp);

  // push temp to holder
  //pop next number from stack to = temp
  //compare new temp to holder.top
  //if holder.top > temp then pop holder and push value to stack
  //if holder.top < temp then push temp to holder & assign temp to new stack.top
  //if stack is empty then holder.pop and stack.push until holder is empty
  //return stack

  while (isEmpty(stack) === false){
    let temp = stack.pop(); 
    console.log('temp', temp);
    console.log('peek', peek(holder));
    while (!isEmpty(holder) && peek(holder) > temp) {
      stack.push(holder.pop());
    }
    holder.push(temp);
    console.log('peek', peek(holder));


    // if(isEmpty(holder) === true){
    //   holder.push(temp);
    //   temp = stack.pop();
    // } else {
      
    //   if (peek(holder) < temp) {
          
    //     holder.push(temp);
    //     temp = stack.pop();
    //   } else {
    //     stack.push(holder.pop());
    //   }

  }
  while (!isEmpty(holder)) {
    stack.push(holder.pop());
  }

  
}

  

//   console.log(isEmpty(stack));
//   display(holder);
//   display(stack);
//   console.log(temp);

// }

function main(){
  let starTrek = new DoubleQueue;
  starTrek.enqueue('Kirk');
  starTrek.enqueue('Spock');
  //   starTrek.enqueue('Uhura');
  //   starTrek.enqueue('Sulu');
  //   starTrek.enqueue('Checkov');
  //console.log(starTrek);
  //console.log(peek(starTrek));
  //console.log(isEmpty(starTrek));
  //display(starTrek);
  // starTrek.pop();
  // starTrek.pop();
  // display(starTrek);
  // console.log(is_palindrome('racecar'));
  // console.log(is_palindrome('Tauhida'));
  //   console.log(matchingParentheses('2 + (5 * 6)'));
  //   console.log(matchingParentheses('2 + ((5 * 6)'));
  //   console.log(starTrek);
  //   console.log(isEmptyQueue(starTrek));
  //   starTrek.dequeue();
  //   starTrek.dequeue();
  
  displayQueue(starTrek);
//   display(starTrek);
}

main();