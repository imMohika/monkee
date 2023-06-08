import { assert, test } from "vitest";
import { Token, newToken } from "./token";
import { Lexer } from "./lexer";

test("nextToken (simple)", () => {
  const input = "=+(),;";

  const expected: Token[] = [
    newToken("ASSIGN", "="),
    newToken("PLUS", "+"),
    newToken("LEFT_PAREN", "("),
    newToken("RIGHT_PAREN", ")"),
    newToken("COMMA", ","),
    newToken("SEMICOLON", ";"),
  ];

  const lexer = new Lexer(input);

  expected.forEach(token => {
    const curr = lexer.nextToken();

    assert.equal(curr.type, token.type);
    assert.equal(curr.literal, token.literal);
  })
})


test("nextToken (extended)", () => {
  const input = `
  let five = 5;
  let ten = 10;
  let add = fn(x,y) {
    x + y;
  };
  let result = add(five, ten);
  
  !-/*<>;
  if else true false return;
  == !=;
  `;


  const expected: Token[] = [
    newToken("LET", "let"),
    newToken("IDENT", "five"),
    newToken("ASSIGN", "="),
    newToken("INT", "5"),
    newToken("SEMICOLON", ";"),

    newToken("LET", "let"),
    newToken("IDENT", "ten"),
    newToken("ASSIGN", "="),
    newToken("INT", "10"),
    newToken("SEMICOLON", ";"),

    newToken("LET", "let"),
    newToken("IDENT", "add"),
    newToken("ASSIGN", "="),
    newToken("FUNCTION", "fn"),
    newToken("LEFT_PAREN", "("),
    newToken("IDENT", "x"),
    newToken("COMMA", ","),
    newToken("IDENT", "y"),
    newToken("RIGHT_PAREN", ")"),
    newToken("LEFT_BRACE", "{"),
    newToken("IDENT", "x"),
    newToken("PLUS", "+"),
    newToken("IDENT", "y"),
    newToken("SEMICOLON", ";"),
    newToken("RIGHT_BRACE", "}"),
    newToken("SEMICOLON", ";"),

    newToken("LET", "let"),
    newToken("IDENT", "result"),
    newToken("ASSIGN", "="),
    newToken("IDENT", "add"),
    newToken("LEFT_PAREN", "("),
    newToken("IDENT", "five"),
    newToken("COMMA", ","),
    newToken("IDENT", "ten"),
    newToken("RIGHT_PAREN", ")"),
    newToken("SEMICOLON", ";"),

    newToken("BANG", "!"),
    newToken("MINUS", "-"),
    newToken("SLASH", "/"),
    newToken("STAR", "*"),
    newToken("LESS_THAN", "<"),
    newToken("GREATER_THAN", ">"),
    newToken("SEMICOLON", ";"),

    newToken("IF", "if"),
    newToken("ELSE", "else"),
    newToken("TRUE", "true"),
    newToken("FALSE", "false"),
    newToken("RETURN", "return"),
    newToken("SEMICOLON", ";"),

    newToken("EQUALS", "=="),
    newToken("NOT_EQUAL", "!="),
    newToken("SEMICOLON", ";"),

    newToken("EOF", "\0"),
  ];

  const lexer = new Lexer(input);

  expected.forEach(token => {
    const curr = lexer.nextToken();

    assert.equal(curr.type, token.type, `lexer: ${JSON.stringify(lexer)}`);
    assert.equal(curr.literal, token.literal, `lexer: ${JSON.stringify(lexer)}`);
  })
})
