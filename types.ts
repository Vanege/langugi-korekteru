export type WordRow = {
  english: string
  esperanto: string
  langugu: string
  trap: string | null
}

export const emptyWordRowFactory = (): WordRow => {
  return {
    english: '',
    esperanto: '',
    langugu: '',
    trap: null
  }
}

// the text to check is divided into elements that can be words (any string of allowed characters), or an other character
export type ParsedElement = {
  // a parsed element is a word if every character of the original string is a word character
  isAWord: boolean;
  string: string;
}
