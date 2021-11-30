function getDeepCopy(input) {
  return JSON.parse(JSON.stringify(input));
}

export { getDeepCopy };
