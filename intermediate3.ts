// You've set up a little poster making business, and for halloween
// you're doing specials when people have halloween parties. The best
// feature is that you make the titles extra spooky!

// You noticed that code which you thought would work is raising an
// error from TypeScript down at the `addTadaEmoji`. It seems that `makeTitle`
// isn't keeping the type is loosing the string literal when it comes in -
// can you make it pass by changing the definition of `makeTitle`?

function makeTitle<T extends string>(
  str: T
): `<spooky>${Uppercase<T>}</spooky>` {
  return `<spooky>${str.toUpperCase() as Uppercase<T>}</spooky>`;
}

const requiresTadaEmoji = (str: string) => {
  return str === "<spooky>PARTY</spooky>";
};
const addTadaEmoji = (str: "<spooky>PARTY</spooky>") => `:tada:${str}:party:`;
const addToPoster = (str: string) => {};

const setupHeader = () => {
  const title = makeTitle("party");

  if (requiresTadaEmoji(title)) {
    addTadaEmoji(title);
  }

  addToPoster(title);
};

// Let's be honest, this system you've set up is a little janky
// because it has to interact with a machine learning program. The
// program gives you back a comma-separated string for the footer
// information. You convert this into a footer but find yourself
// losing type information when you use this function:

function setupFooter<
  Name extends string,
  Date extends string,
  Address extends string
>(str: `${Name},${Date},${Address}`) {
  // validate string etc
  return {
    name: str.split(",")[0] as Name,
    date: str.split(",")[1] as Date,
    address: str.split(",")[2] as Address,
  };
}

// Ideally so that you get the right types below

const footer = setupFooter("Danger McShane,Halloween 2021,The Internet");
footer.name;
//      ^?
footer.date;
//      ^?
footer.address;
//      ^?
