import { p1_reroll, scythe, attack, melee } from "./attacks.mjs";

// BUILD TEAM
export class Player {
  constructor(attack = 118, strength = 118, ranged = 99, magic = 99) {
    this.attackLevel = attack;
    this.strengthLevel = strength;
    this.rangedLevel = ranged;
    this.magicLevel = magic;
    this.hp = 99;
    this.weaponCooldown = 0;
    this.potionCooldown = 0;
    this.bpRangeStr = 60;
    this.scytheStr = 142;
    this.scytheAcc = 162;
    this.clawStr = 123;
    this.clawAcc = 94;
    this.swiftStr = 75;
    this.swiftAcc = 66;
  }

  calcEffectiveRangeStrength() {
    return this.rangedLevel * 1.23 + 8;
  }

  calcRangeMaxHit() {
    return Math.floor(
      (this.calcEffectiveRangeStrength() * (this.bpRangeStr + 64)) / 640 + 0.5
    );
  }

  calcEffectiveRangeAttack() {
    return this.rangedLevel + 8;
  }

  calcRangeAttackRoll() {
    return this.calcEffectiveRangeAttack() * 63;
  }

  calculateSangMaxHit() {
    if (Math.floor(this.magicLevel / 3) <= 5) {
      return Math.floor(5 * this.magicDamage);
    }
    return Math.floor(Math.floor(this.magicLevel / 3) * this.magicDamage);
  }

  calculateEffectiveMagicLevel() {
    return Math.floor(this.magicLevel * 1.25) + 9;
  }

  calculateSangRoll() {
    return this.calculateEffectiveMagicLevel() * (this.magicBonus + 64);
  }

  calculateEffectiveStrength() {
    return Math.floor(this.strengthLevel * 1.23) + 3 + 8;
  }

  calculateScytheMax() {
    return Math.floor(
      (this.calculateEffectiveStrength() * (this.scytheStr + 64) + 320) / 640
    );
  }

  calculateClawMax() {
    return Math.floor(
      (this.calculateEffectiveStrength() * (this.clawStr + 64) + 320) / 640
    );
  }

  calculateSwiftMax() {
    return Math.floor(
      (this.calculateEffectiveStrength() * (this.swiftStr + 64) + 320) / 640
    );
  }

  calculateEfectiveAttack() {
    return Math.floor(this.attackLevel * 1.2) + 8;
  }

  calculateScytheRoll() {
    return this.calculateEfectiveAttack() * (this.scytheAcc + 64);
  }

  calculateClawRoll() {
    return this.calculateEfectiveAttack() * (this.clawAcc + 64);
  }

  calculateSwiftRoll() {
    return this.calculateEfectiveAttack() * (this.swiftAcc + 64);
  }

  get scytheMax() {
    return this.calculateScytheMax();
  }

  get scytheRoll() {
    return this.calculateScytheRoll();
  }

  get clawRoll() {
    return this.calculateClawRoll();
  }

  get swiftRoll() {
    return this.calculateSwiftRoll();
  }

  get clawMax() {
    return this.calculateClawMax();
  }

  get swiftMax() {
    return this.calculateSwiftMax();
  }

  get sangMax() {
    return this.calculateSangMaxHit();
  }

  get sangRoll() {
    return this.calculateSangRoll();
  }

  get bpMax() {
    return this.calcRangeMaxHit();
  }

  get bpRoll() {
    return this.calcRangeAttackRoll();
  }

  calculateMageDefRoll() {
    return 29 * 84;
  }

  calculateRangeDefRoll() {
    return 29 * 84;
  }

  calculateSlashDefRoll() {
    return 29 * 84;
  }

  calculateHitChance(attackRoll, defenseRoll) {
    if (attackRoll > defenseRoll) {
      return 1 - (defenseRoll + 2) / (2 * (attackRoll + 1));
    }
    return attackRoll / (2 * (defenseRoll + 1));
  }

  get bpAccuracy() {
    return this.calculateHitChance(this.bpRoll, this.calculateRangeDefRoll());
  }
  get sangAccuracy() {
    return this.calculateHitChance(this.sangRoll, this.calculateMageDefRoll());
  }
  get scytheAccuracy() {
    return this.calculateHitChance(
      this.scytheRoll,
      this.calculateSlashDefRoll()
    );
  }
  get swiftAccuracy() {
    return this.calculateHitChance(
      this.swiftRoll,
      this.calculateSlashDefRoll()
    );
  }
  get clawAccuracy() {
    return this.calculateHitChance(
      this.scytheRoll,
      this.calculateSlashDefRoll()
    );
  }

  get bp() {
    return [2, attack(this.bpMax, this.bpAccuracy)];
  }

  get sang() {
    return [2, attack(this.sangMax, this.sangAccuracy)];
  }

  get swift() {
    return [1, melee(this.swiftMax, this.swiftAccuracy)];
  }

  get clawScratch() {
    return [1, melee(this.clawMax, this.clawAccuracy)];
  }

  get scythe() {
    return [1, melee(this.scytheMax, this.scytheAccuracy)];
  }

  get dawnbringer() {
    return [2, Math.floor(Math.random() * 75) + 75];
  }
}

//SET UNIQUE INFO
const mage = new Player();
mage.magicBonus = 75;
mage.scytheStr = 130;
mage.magicDamage = 1.22;

const meleeFreeze = new Player();
meleeFreeze.magicBonus = 75;
meleeFreeze.scytheStr = 130;
meleeFreeze.magicDamage = 1.22;

const range = new Player();
range.magicBonus = 28;
range.scytheStr = 130;
range.magicDamage = 1;

const meleeDPS = new Player();
meleeDPS.magicBonus = 28;
meleeDPS.magicDamage = 1;

const players = [mage, meleeFreeze, range, meleeDPS];
let thralls = 2;

const hato = false;
const rato = !false;
const godbook = false;

function p1() {
  // RESET EACH PLAYER
  players.forEach((player, index) => {
    player.attackLevel = 118
    player.strengthLevel = 118
    player.magicLevel = 99
    player.rangedLevel = 99
    player.hp = 99
    player.weaponCooldown = 0
    player.potionCooldown = 0
    player.damageTaken = 0
    if (index === 0) {
      player.magicLevel = 112
    }
  })

  // RESET VERZIK
  let verzikHP = 1750
  let timer = 0

  // DEFINE DAMAGE QUEUE
  let queue = []

  while (verzikHP > 0) {
    timer++
    // HANDLE DAMAGE QUEUE
    queue.forEach((attack, index) => {
      if (attack) {
        attack[0]--
        if (attack[0] === 0) {
          verzikHP -= attack[1]
          // REMOVE FROM QUEUE
          queue.splice(index, 1)
        }
      }
    })
    // DECRIMENT PLAYER COOLDOWNS (WEAPON AND POTION)
    players.forEach(player => {
      player.weaponCooldown--;
      if (player.weaponCooldown < 0) {
        player.weaponCooldown = 0;
      }
      player.potionCooldown--;
      if (player.potionCooldown < 0) {
        player.potionCooldown = 0;
      }
    })

    // HATO
    if (hato) {
      //NO LIGHTBEARERS
      players.forEach(player => {
        player.scytheStr = 142
      })

      // HANDLE DAWNBRINGER SPECS
      if (timer === 1 || timer === 47 || timer === 51) {
        queue.push(mage.dawnbringer);
        mage.weaponCooldown = 4;
      };
      if (timer === 6 || timer === 42 || timer === 56) {
        queue.push(meleeFreeze.dawnbringer);
        meleeFreeze.weaponCooldown = 4;
      };
      if (timer === 11 || timer === 34 || timer === 61) {
        queue.push(range.dawnbringer);
        range.weaponCooldown = 4;
      };
      if (timer === 16 || timer === 20 || timer === 66) {
        queue.push(meleeDPS.dawnbringer);
        meleeDPS.weaponCooldown = 4;
      };

      //HANDLE BLOWPIPES
      if (timer === 35) {
        queue.push(mage.bp)
        mage.weaponCooldown = 3
        queue.push(meleeFreeze.bp)
        meleeFreeze.weaponCooldown = 3;
      };
      if (timer === 49) {
        queue.push(range.bp);
        range.weaponCooldown = 3;
        queue.push(meleeDPS.bp);
        meleeDPS.weaponCooldown = 3;
      }

      //HANDLE SANGS
      if (timer === 20) {
        queue.push(mage.sang);
        mage.weaponCooldown = 4;
        queue.push(meleeFreeze.sang);
        meleeFreeze.weaponCooldown = 4;
        queue.push(range.sang);
        range.weaponCooldown = 4;
      }
      if (timer === 34) {
        queue.push(meleeDPS.sang);
        meleeDPS.weaponCooldown = 4;
      }

      //HANDLE TANKED AUTOS
      if (timer === 21) {
        let damage = Math.floor(Math.random() * 69);
        meleeDPS.hp -= damage;
        meleeDPS.damageTaken += damage;
      }
      if (timer === 49) {
        let damage1 = Math.floor(Math.random() * 69);
        let damage2 = Math.floor(Math.random() * 69);
        mage.hp -= damage1;
        mage.damageTaken += damage1;
        meleeFreeze.hp -= damage2;
        meleeFreeze.damageTaken += damage2;
      }
      if (timer === 63) {
        players.forEach(player => {
          let damage = Math.floor(Math.random() * 69);
          player.hp -= damage;
          player.damageTaken += damage;
        })
      }
    };

    // RATO
    if (rato) {
      // HANDLE DAWNBRINGER SPECS
      if (timer === 16 || timer === 20 || timer === 43) {
        queue.push(mage.dawnbringer);
        mage.weaponCooldown = 4;
      };
      if (timer === 11 || timer === 25 || timer === 39) {
        queue.push(meleeFreeze.dawnbringer);
        meleeFreeze.weaponCooldown = 4;
      };
      if (timer === 6 || timer === 30 || timer === 34) {
        queue.push(range.dawnbringer);
        range.weaponCooldown = 4;
      };
      if (timer === 1 || timer === 48 || timer === 52) {
        queue.push(meleeDPS.dawnbringer);
        meleeDPS.weaponCooldown = 4;
      };

      //HANDLE BLOWPIPES
      if (timer === 21) {
        queue.push(meleeDPS.bp);
        meleeDPS.weaponCooldown = 3;
      }

      //HANDLE SANGS
      if (timer === 48) {
        queue.push(meleeFreeze.sang);
        meleeFreeze.weaponCooldown = 4;
        queue.push(range.sang);
        range.weaponCooldown = 4;
      }
      if (timer === 34) {
        queue.push(mage.sang);
        mage.weaponCooldown = 4;
      }

      //HANDLE TANKED AUTOS
      if (timer === 21) {
        let damage1 = Math.floor(Math.random() * 69);
        let damage2 = Math.floor(Math.random() * 69);
        let damage3 = Math.floor(Math.random() * 69);
        meleeFreeze.hp -= damage1;
        meleeFreeze.damageTaken += damage1;
        range.hp -= damage2;
        range.damageTaken += damage2;
        meleeDPS.hp -= damage3;
        meleeDPS.damageTaken += damage3;
      };
      if (timer === 35) {
        let damage1 = Math.floor(Math.random() * 69);
        let damage2 = Math.floor(Math.random() * 69);
        let damage3 = Math.floor(Math.random() * 69);
        meleeFreeze.hp -= damage1;
        meleeFreeze.damageTaken += damage1;
        range.hp -= damage2;
        range.damageTaken += damage2;
        mage.hp -= damage3;
        mage.damageTaken += damage3;
      };
      if (timer === 49) {
        let damage1 = Math.floor(Math.random() * 69);
        let damage2 = Math.floor(Math.random() * 69);
        mage.hp -= damage1;
        mage.damageTaken += damage1;
        meleeDPS.hp -= damage2;
        meleeDPS.damageTaken += damage2;
      };

      // HANDLE CONDITIONAL TANK
      players.forEach((player, index) => {
        if (index === 0) {
          if (player.damageTaken > 61) {
            if (timer === 61) {
              player.weaponCooldown += 2;
            }
          }
        }
        if (index != 0) {
          if (player.damageTaken > 61) {
            if (timer === 62) {
              player.weaponCooldown += 1
            }
          }
        }
        if (player.damageTaken > 61 && timer === 63) {
          queue.push(player.bp);
          player.weaponCooldown = 3;
        }
      })
    };

    // GODBOOK
    if (godbook) {
      thralls = 4;
      //NO LB ON RANGE
      range.scytheStr = 142
      // HANDLE DAWNBRINGER SPECS
      if (timer === 1 || timer === 5 || timer === 9) {
        queue.push(mage.dawnbringer);
        mage.weaponCooldown = 4;
      };
      if (timer === 14 || timer === 18 || timer === 22) {
        queue.push(meleeFreeze.dawnbringer);
        meleeFreeze.weaponCooldown = 4;
      };
      if (timer === 27 || timer === 31 || timer === 35) {
        queue.push(range.dawnbringer);
        range.weaponCooldown = 4;
      };
      if (timer === 40 || timer === 44 || timer === 48) {
        queue.push(meleeDPS.dawnbringer);
        meleeDPS.weaponCooldown = 4;
      };

      //HANDLE SWIFT && SCRATCH && 6Tick
      if (timer === 1) {
        queue.push(meleeFreeze.swift);
        meleeFreeze.weaponCooldown = 3;
        range.weaponCooldown++;
        queue.push(meleeDPS.clawScratch);
        meleeDPS.weaponCooldown = 4;
      }

      //HANDLE TANKED AUTOS
      if (timer === 21 || timer === 35 || timer === 49 || timer === 63) {
        players.forEach(player => {
          let damage = Math.floor(Math.floor(Math.random() * 69));
          player.hp -= damage;
          player.damageTaken += damage;
        })
      }
    };

    // HANDLE SCYTHES && BREWS && RESTORES
    players.forEach(player => {
      // SCYTHES
      if (player.weaponCooldown === 0) {
        queue.push(player.scythe);
        player.weaponCooldown = 5;
      }

      // BREW (DONT BREW AFTER 4TH AUTO)
      if (timer < 63 && player.potionCooldown === 0) {
        if (player.hp < 70) {
          player.hp += 16;
          player.attackLevel = player.attackLevel - (Math.floor(player.attackLevel * .1) + 2);
          player.strengthLevel = player.strengthLevel - (Math.floor(player.strengthLevel * .1) + 2);
          player.rangedLevel = player.rangedLevel - (Math.floor(player.rangedLevel * .1) + 2);
          player.magicLevel = player.magicLevel - (Math.floor(player.magicLevel * .1) + 2);
          player.potionCooldown = 3;
        }
      }

      // RESTORE
      if (player.potionCooldown === 0 && player.strengthLevel < 99) {
        if (player.hp > 70) {
          player.attackLevel += 32;
          if (player.attackLevel > 99) {
            player.attackLevel = 99;
          };
          player.strengthLevel += 32;
          if (player.strengthLevel > 99) {
            player.strengthLevel = 99;
          };
          player.rangedLevel += 32;
          if (player.attackLevel > 99) {
            player.attackLevel = 99;
          };
          player.magicLevel += 32;
          if (player.attackLevel > 99) {
            player.attackLevel = 99;
          };
          player.potionCooldown = 3;
        }
      }
    });

    // HANDLE THRALLS
    if ((timer + 2) % 4 === 0) {
      for (let i = 0; i < thralls; i++) {
        let damageRoll = (Math.floor(Math.random() * 4));
        let damage = p1_reroll(10, damageRoll);
        queue.push([1, damage]);
      }
    }

  }

  let killTime = ((timer + 2) * 0.6).toFixed(1)
  // console.log(killTime)
  // players.forEach(player => {
  //   console.log(`HP : ${player.hp}  |  STR : ${player.strengthLevel}  |  DMG : ${player.damageTaken}`)
  // })

  return killTime
}


let trials = 1000000;
let values = [];
let averageCount = 0;

for (let i = 0; i < trials; i++) {
  let number = p1()
  values.push(parseFloat(number)); //CONVERT STRING TO NUMBER
  averageCount += parseFloat(number)
}

// GET AVERAGE
let average = (averageCount/trials).toFixed(2)

// SORT ARRAY ASCENDING ORDER
values.sort((a, b) => a - b);

// FIND MEDIAN
let median;
const middleIndex = Math.floor(values.length / 2);
if (values.length % 2 === 0) {
  median = (values[middleIndex - 1] + values[middleIndex]) / 2;
} else {
  median = values[middleIndex];
}

//SORT ASCENDING ORDER
values.sort((a, b) => a -b)

// CALCULATE FREQUENCY
let frequencies = {};
values.forEach(value => {
  frequencies[value] = (frequencies[value] || 0) + 1;
});

// SORT FREQUENCIES AS AN ARRAY OF OBJECTS
let sortedFrequencies = Object.entries(frequencies).map(([key, value]) => ({ [key]: (value / trials * 100).toFixed(2) + '%' }));
sortedFrequencies.sort((a, b) => parseFloat(Object.keys(a)[0]) - parseFloat(Object.keys(b)[0]));


// YAY NUMBERS
if (hato) {
  console.log('HATO : NO LIGHTBEARERS')
}
if (rato) { 
  console.log('RATO : LIGHTBEARER ON P1, P2, AND P3')
}
if (godbook) {
  console.log('GODBOOK : LIGHTBEARER ON P1 & P2')
}
console.log(`MEDIAN : ${median} | AVERAGE : ${average}`)
console.log(sortedFrequencies);