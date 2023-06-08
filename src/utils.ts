export const isDigit = (ch: string): boolean => {
  return '0' <= ch && ch <= "9"
}

export const isLetter = (ch: string): boolean => {
  return 'a' <= ch && ch <= "z"
    || "A" <= ch && ch <= "Z"
    || ch === "_";  // Identify '_' as a letter to support variable names like foo_bar
}

export const isWhitespace = (ch: string): boolean => {
  return ch === " " || ch === "\t" || ch === "\n" || ch === "\r"
}
