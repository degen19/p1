//re-roll formula
export const p1_reroll = (num, damage) => {
  let random = Math.floor(Math.random() * (num + 1));
  if (random <= damage) {
    return random;
  }
  return damage;
};

//weapons
export function scythe(max, acc) {
  let big = max;
  let medium = Math.floor(big / 2);
  let small = Math.floor(medium / 2);

  let big_hit = 0;
  let medium_hit = 0;
  let small_hit = 0;

  if (Math.random() <= acc) {
    big_hit = Math.floor(Math.random() * (big + 1));
  }
  if (Math.random() <= acc) {
    medium_hit = Math.floor(Math.random() * (medium + 1));
  }
  if (Math.random() <= acc) {
    small_hit = Math.floor(Math.random() * (small + 1));
  }

  let totalDamage = 0;

  totalDamage += p1_reroll(10, big_hit);
  totalDamage += p1_reroll(10, medium_hit);
  totalDamage += p1_reroll(10, small_hit);

  return totalDamage;
}

export function attack(max, acc) {
  let totalDamage = 0;
  if (Math.random() <= acc) {
    totalDamage += Math.floor(Math.random() * (max + 1));
  }

  return p1_reroll(3, totalDamage);
}

export function melee(max, acc) {
  let totalDamage = 0;
  if (Math.random() <= acc) {
    totalDamage += Math.floor(Math.random() * (max + 1));
  }

  return p1_reroll(10, totalDamage);
}


