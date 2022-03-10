export function alphabetize(array, key) {
  return array.sort((a, b) => a[key].localeCompare(b[key]))
}

export function pluralize(count, word) {
  const dictionary = {
    'boxes': 'box',
    'shelves': 'shelf',
    'rooms': 'room'
  }

  if (count === 1) {
    return dictionary[word]
  } else {
    return word
  }
}