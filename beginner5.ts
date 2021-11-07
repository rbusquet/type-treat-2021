// For the Halloween weekend, you've decided to change the
// set of colors for your your website to be spooky themed

// While you're here, you may as well act like a good scout
// and improve the codebase while you're here:

const scheme = {
  background: "#242424",
  textColor: "#ffa52d",
  highlightOne: "#cafe37",
  highlightTwo: "#9e20ff",
} as const;

// It looks like your type which represents all possible
// colors is out of date, can you change this type to
// be created directly from the keys of `scheme` above?

type SchemeNames = keyof typeof scheme;

// It looks like there's this useful function `possibleSchemeItems`
// which would return the names of the colours but it returns a
// strings array. Can you improve this?

function possibleSchemeItems(colors: typeof scheme): SchemeNames[] {
  const keys = Object.keys(colors) as SchemeNames[];
  return keys;
}
const s = possibleSchemeItems(scheme);

// You spotted another case of an outdated string union, can
// you clean this up to by looking at the type of schema and
// then indexing ot the possible schema names?

type PossibleColors = typeof scheme[SchemeNames];

// Now that you've cleaned up these types, you want to make
// sure that there's a copy of the original scheme still around.
// Can you make sure that the `previousScheme` below still has
// the same keys as the `scheme` up above?

type Scheme = { [k in SchemeNames]: string };

// @ts-expect-error
const previousScheme: Scheme = {
  background: "#111111",
  textColor: "#c60800",
  highlightOne: "#006ba1",
  //   highlightTwo: "#111111",
};
