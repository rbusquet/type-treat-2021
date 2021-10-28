// You're working on your uber-for-toilet-papering-a-house startup
// and people keep giving you nonsense lengths for how much toilet
// paper they are going to need. You initially gave the input a
// lot of flexibility, but felt like maybe `string` is a bit too
// much freedom.

// You've heard of template literals, maybe they could be useful?

type Unit = "cm" | "in";

type Forbidden = "+" | "-";

type Length<T extends string> = T extends `${Forbidden}${string}` ? never : T;

// Your API function, we'll be using the input to this function
// to validate if your type is right or not

// inspiration from https://twitter.com/danvdk/status/1453503071087169536
type Digit = "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9";

function req<N extends "0" | `${Digit}${number | ""}${Unit}`>(
  input: Length<N>
) {
  // Remove NaN, minus values,
  // Do some work
}

// To get started, here's some examples which should always fail

const shouldFail = () => {
  // @ts-expect-error
  req("");
  // @ts-expect-error
  req("apx");
  // @ts-expect-error
  req("rem");
  // @ts-expect-error
  req("abc");
};

// Start here, you Length to be able to check for a number and an "in" prefix

const simpleInputs = () => {
  req("0in");
  req("12in");
};

// What about more than one prefix for the folks who think in cm?

const extraUnits = () => {
  req("1.5cm");
  req("20cm");
};

// It feels right that if you pass "0", you should be able to go unit-less

const handleZero = () => {
  req("0");
};

// What about allowing whitespace between the number and the unit?

const handleWhitespace = () => {
  req("12 cm");
  req("14 in");
};

// If you have all of the above passing, congrats! That's more than enough
// to have completed the challenge. This challenge has a secret *experts* section
// for people who really want to test themselves.

const thingsWhichComplicateTheMatter = () => {
  // This is an allowed number using bigint notation, it's allowed, just
  // the annotation is unique, ideally you catch big numbers in the JS
  req(`${0.3e21}cm`);

  // Minus numbers don't make sense in our case, can you ensure that
  // it only accepts positive numbers?
  // @ts-expect-error
  req("-12cm");

  // It is possible to raise an error with these two, can you
  // figure out how? We know of two implementations, one simpler with
  // an interesting trade-off, and another which accurately can catch these
  // cases without that trade-off.
  // @ts-expect-error
  req(`${Infinity}cm`);
  // @ts-expect-error
  req(`${NaN}cm`);
};
