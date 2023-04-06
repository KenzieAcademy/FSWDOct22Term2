# Switch Statements
We know that we can use if statements to create trees of logic.
But in scenarios where every conditional statement is making a comparison
between one entity that is the same in all conditional statments,
and a second entity that is different between all conditional statements,
using if/else if/else can get a wee bit verbose.

Switch statements are built to handle these scenarios a bit more cleanly.
You provide the entity you are comparing to the switch statement,
and the body of the switch statement consists of a sequence of case blocks.

Each case block is provided the value to compare against the switch value,
and subsequent code to run when the switch value matches the case value.

Example:

```js
if(error.status === 400) {
  console.log("Bad request")
} else if (error.status === 401) {
  console.log("Unauthorized")
} else if (error.status == 422) {
  console.log("Unprocessable entity")
} else {
  console.log("Internal server error")
}
```

Can be handled as:
```js
switch(error.status) {
  case 400:
    console.log("Bad request")
    break; // key difference: unlike if/else if/else, once the logic enters
    // a case block, it will hit all subsequent case blocks unless a return or break
    // is hit
  case 401: 
    console.log("Unauthorized");
    break;
  case 422:
    console.log("Unprocessable entity");
    break;
  default: // this is essentially the "else"
    console.log("Internal server error");
    break;
}
```