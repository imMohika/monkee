import { Token, lookupWord, newToken } from "./token";
import { isDigit, isLetter, isWhitespace } from "./utils";

export class Lexer {
  position: number = 0; // points to current char
  readPosition: number = 0; // after the current char
  ch!: string; // current char

  constructor(private input: string) {
    this.readNextChar();
  }

  readNextChar() {
    if (this.readPosition >= this.input.length) {
      this.ch = "\0"
    } else {
      this.ch = this.input[this.readPosition]!; // TODO: do something for !
    }

    this.position = this.readPosition;
    this.readPosition += 1;
  }

  nextToken(): Token {
    this.skipWhitespace();

    let token: Token;
    switch (this.ch) {
      case "=":
        if (this.peek() === "=") {
          token = newToken("EQUALS", "==");
          this.readNextChar();
        } else {
          token = newToken("ASSIGN", this.ch);
        }
        break;

      case ";":
        token = newToken("SEMICOLON", this.ch);
        break;

      case "(":
        token = newToken("LEFT_PAREN", this.ch);
        break;

      case ")":
        token = newToken("RIGHT_PAREN", this.ch);
        break;

      case ",":
        token = newToken("COMMA", this.ch);
        break;

      case "+":
        token = newToken("PLUS", this.ch);
        break;

      case "!":
        if (this.peek() === "=") {
          token = newToken("NOT_EQUAL", "!=");
          this.readNextChar();
        } else {
          token = newToken("BANG", this.ch);
        }
        break;
      case "/":
        token = newToken("SLASH", this.ch);
        break;
      case "*":
        token = newToken("STAR", this.ch);
        break;
      case "<":
        token = newToken("LESS_THAN", this.ch);
        break;
      case ">":
        token = newToken("GREATER_THAN", this.ch);
        break;
      case "-":
        token = newToken("MINUS", this.ch);
        break;

      case "{":
        token = newToken("LEFT_BRACE", this.ch);
        break;

      case "}":
        token = newToken("RIGHT_BRACE", this.ch);
        break;

      case "\0":
        token = newToken("EOF", this.ch);
        break;

      default:
        if (isLetter(this.ch)) {
          const ident = this.readIdentifier();
          return lookupWord(ident);
        }
        if (isDigit(this.ch)) {
          return newToken("INT", this.readNumber());
        }
        token = newToken("ILLEGAL", this.ch)
    }

    this.readNextChar();
    return token;
  }

  peek(length = 1) {
    if (this.readPosition + length > this.input.length) {
      return "\0"
    }

    return this.input.slice(this.readPosition, this.readPosition + length);
  }

  eatWhileTrue(fn: (ch: string) => boolean): string {
    const start = this.position;
    while (fn(this.ch)) {
      this.readNextChar()
    }
    return this.input.slice(start, this.position);
  }

  readIdentifier(): string {
    return this.eatWhileTrue(isLetter);
  }

  readNumber(): string {
    return this.eatWhileTrue(isDigit);
  }

  skipWhitespace(): void {
    while (isWhitespace(this.ch)) {
      this.readNextChar()
    }
  }
}
