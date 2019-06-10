// i want to random generate entries for my join table between hosts and languages
// create a random number, either 1 or 2, generate entries based on this number

const languageIdx = (num) => {
  return Math.ceil(Math.random() * num);
}

const randomLanguages = () => {
  const numOfLanguages = Math.ceil(Math.random() * 2);
  if ( numOfLanguages === 1 ) {

  } else if ( numOfLanguages  === 2 ) {

  }
}