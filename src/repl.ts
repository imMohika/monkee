import readline from "readline";
import { Lexer } from "./lexer";

const rl = readline.createInterface({
  input: process.stdin
})

rl.on("line", (input) => {
  const lexer = new Lexer(input);

  while (true) {
    const token = lexer.nextToken();
    console.log(token);
    if (token.type === "EOF") break;
  }
})
