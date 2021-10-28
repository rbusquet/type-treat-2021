// You've got yourself bunch of bowls of candy, but the bowls are
// just "generic" bowls. You can put anything in them, and get anything
// back out of them.

function getBowl<T>(items: T) {
  return { items };
}

const chewyMixBowl = getBowl({
  colors: ["red", "green", "blue"],
  strawberries: "some",
});
//     ^?

const candiedApplesBowl = getBowl({
  types: ["Tanghulu", "Maçã do amor", "Toffee Apples"],
});
//      ^?

// This is a shame, because ideally this would raise a compiler arror:

// @ts-expect-error
candiedApplesBowl.items.type[0];

// Can you think of a way to let the parameter of `getBowl` keep the type
// of `items` through the function?

// Spoilers below as a part of the extension of this example

// Still a bit further for those on large screens

// Cool, there it is

// You've got yourself bunch of bowls of candy, but the bowls are
// just "generic" bowls. You grab a few fancy branded :tm: bowls and
// fill the bowls with their candy.

function fillBowl<T extends string>(candy: T) {
  return { candy };
}

const marsBowl = fillBowl("mars");
const snickersBowl = fillBowl("snickers");
const skittlesBowl = fillBowl("skittles");

// It turns out that a few kids are picky though,
// and only want to get one type of  candy from each bowl.

const giveOutSnickers = (str: "snickers") => {};
const giveOutSkittles = (str: "skittles") => {};
const giveOutMarsBars = (str: "mars") => {};

// This means you will need to extend the `fillBowl` to
// handle passing a specific string literal through the
// the function. You will only need to add two words to
// the function to make this work.

giveOutSnickers(snickersBowl.candy);
giveOutSkittles(skittlesBowl.candy);
giveOutMarsBars(marsBowl.candy);
