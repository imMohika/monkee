export const TokenType = {
  ILLEGAL: "ILLEGAL", // unkown token
  EOF: "EOF", // end of file

  // identifiers + literals
  IDENT: "IDENT", // add, x, y,...
  INT: "INT", // 0123...

  // Operatos
  ASSIGN: "=",
  PLUS: "+",
  MINUS: "-",
  BANG: "!",
  STAR: "*",
  SLASH: "/",

  LESS_THAN: "<",
  GREATER_THAN: ">",

  EQUALS: "==",
  NOT_EQUAL: "!=",

  // Delimiters
  COMMA: ",",
  SEMICOLON: ";",

  // Brackets
  LEFT_PAREN: "(",
  RIGHT_PAREN: ")",
  LEFT_BRACE: "{",
  RIGHT_BRACE: "}",
  LEFT_BRACKET: "[",
  RIGHT_BRACKET: "]",

  // Keywords
  FUNCTION: "FUNCTION",
  LET: "LET",
  IF: "IF",
  ELSE: "ELSE",
  TRUE: "TRUE",
  FALSE: "FALSE",
  RETURN: "RETURN",
} as const;


export type TokenType = keyof typeof TokenType;
export type TokenLiteral = string

export interface Token {
  type: TokenType;
  literal: TokenLiteral;
}

export const newToken = (type: TokenType, literal: TokenLiteral): Token => ({ type, literal })

const ReservedWords = {
  "fn": newToken("FUNCTION", "fn"),
  "let": newToken("LET", "let"),
  "if": newToken("IF", "if"),
  "else": newToken("ELSE", "else"),
  "true": newToken("TRUE", "true"),
  "false": newToken("FALSE", "false"),
  "return": newToken("RETURN", "return"),
} as const;

type ReservedWord = keyof typeof ReservedWords;

export const lookupWord = (word: string): Token => {
  const reserved = ReservedWords[word as ReservedWord];
  if (reserved) {
    return reserved;
  }

  return newToken("IDENT", word)
}
