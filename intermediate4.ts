// You're in charge of running pumpkin rating competitions, you have
// a few to run and you've just got the size competition working.

interface Competitor {
  /** In lbs */
  weight: number;
}

interface SizeCompetition extends Competitor {}

interface DecorativeCompetition extends Competitor {
  theme: string;
}

// Your code works great when you were only handling competitions
// about the size of a pumpkin but when you started to handle cases like
// the decoration competitions - you found that that you didn't have
// the ability to access some of the extra fields found on the
// DecorativeCompetition! Can you extend the `check` function below
// to remove the compiler error below?

const check = <T extends Competitor>(data: T[]) => {
  return data.map((competitor) => {
    if (competitor.weight > 2121.5)
      throw new Error("Stop the show, world record hit!");
    return { ...competitor, judge: (...args: T[keyof T][]) => {} };
  });
};

const sizeCompetitors = [
  { weight: 219 },
  { weight: 120 },
  { weight: 1376 },
  { weight: 23 },
];
const decorativeCompetitors = [
  { theme: "movies", weight: 63 },
  { theme: "portrait", weight: 44 },
];

// The size competition works great

const sizeCompetition = check(sizeCompetitors);
//    ^?
sizeCompetition.forEach((competitor) => {
  competitor.judge(competitor.weight);
});

// The decorative competition isn't passing the type-check though

const decorativeCompetition = check(decorativeCompetitors);
//    ^?

decorativeCompetition.forEach((competitor) => {
  competitor.judge(competitor.weight, competitor.theme);
});
