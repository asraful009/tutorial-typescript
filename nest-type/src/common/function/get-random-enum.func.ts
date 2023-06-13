import { faker } from '@faker-js/faker';

export function getRandomEnumValue<E>(
  enumObj: E,
  randomIndex: number | number[] = undefined,
): E[keyof E] {
  const enumValues = Object.values(enumObj);
  let index = 0;
  if (Array.isArray(randomIndex)) {
    index =
      randomIndex[
        faker.helpers.rangeToNumber({ min: 0, max: randomIndex.length - 1 })
      ];
  } else if (typeof randomIndex === 'number') {
    index = randomIndex;
  } else {
    index = Math.floor(Math.random() * enumValues.length);
  }

  return enumValues[index];
}
