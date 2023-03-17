import heroes from "../heroes";

const getHighestHeroId = () => {
  let max = 1;
  heroes.forEach((hero) => (max = max >= hero.id ? max : hero.id));
  return max;
};

export const createHero = (name, alias, powers) => {
  const newHero = {
    id: getHighestHeroId() + 1,
    name: name,
    alias: alias,
    powers: powers ? powers : [],
  };

  heroes.push(newHero);
  return newHero;
};

export const removeHero = (id) => {
  let i;
  let hero = heroes.find((hero, idx) => {
    if (hero.id === Number(id)) i = idx;
    return hero.id === Number(id);
  });
  if (!hero) return null;

  heroes.splice(i, 1);

  return hero;
};

export const updateHero = (id, updatedData) => {
  console.log(updatedData);
  const { name, alias } = updatedData;
  let hero = heroes.find((hero) => hero.id === Number(id));

  hero.name = name;
  hero.alias = alias;

  return hero;
};

export const getAllHeroes = () => heroes;

export const getHeroById = (id) =>
  heroes.find((hero) => hero.id === Number(id));

export const addPowerToHero = (id, power) => {
  const hero = heroes.find((hero) => hero.id === Number(id));

  if (!hero) return null;

  if (!hero.powers.some((pow) => pow.toLowerCase() === power.toLowerCase())) {
    hero.powers.push(power);
  }

  return hero;
};
