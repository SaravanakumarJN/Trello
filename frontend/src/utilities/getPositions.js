const getPrevNextSameList = (sor_index, des_index, cards) => {
  let movement =
    sor_index === des_index ? "same" : sor_index > des_index ? "up" : "down";

  let prev;
  let next;
  if (movement === "same") {
    prev = des_index;
    next = des_index;
  } else if (movement === "up") {
    prev = des_index + 1 > cards.length ? des_index : des_index - 1;
    next = des_index;
  } else {
    prev = des_index;
    next = des_index - 1 < 0 ? des_index : des_index + 1;
  }

  let prev_position = undefined;
  let next_position = undefined;
  if (prev !== undefined && prev >= 0) {
    prev_position = cards[prev].position;
  }
  if (next !== undefined && next < cards.length) {
    next_position = cards[next].position;
  }

  return { prev_position, next_position };
};

let getPrevNextDiffList = (des_index, cards) => {
  let prev = des_index - 1;
  let next = des_index;

  let prev_position = undefined;
  let next_position = undefined;
  if (prev !== undefined && prev >= 0) {
    prev_position = cards[prev].position;
  }
  if (next !== undefined && next < cards.length) {
    next_position = cards[next].position;
  }

  return { prev_position, next_position };
};

export { getPrevNextSameList, getPrevNextDiffList };
