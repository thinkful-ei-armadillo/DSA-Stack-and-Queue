class _Node {
    constructor(data, next){
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

function main(){
    // let starTrek = new Stack;
    // starTrek.push('Kirk');
    // starTrek.push('Spock');
    // starTrek.push('McCoy');
    // starTrek.push('Scotty');
    //console.log(starTrek);
    //console.log(peek(starTrek));
    //console.log(isEmpty(starTrek));
    //display(starTrek);
    // starTrek.pop();
    // starTrek.pop();
    // display(starTrek);
    // console.log(is_palindrome('racecar'));
    // console.log(is_palindrome('Tauhida'));
    console.log(matchingParentheses('2 + (5 * 6)'));
    console.log(matchingParentheses('2 + ((5 * 6)'));
}

main();