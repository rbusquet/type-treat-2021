// Welcome back from your robotics hack camp! You've been asked if
// you can use your new skills to make a robot which handles
// mixing the punch for an upcoming party.

// Punch is an interesting drink because you can put all sorts of things
// into it, yet it is always classed as "punch" when you make a cup.

type Punch = {
  flavour: string;
  ingredients: (string | { fruit: string; number: number })[];
};

// We've mapped out what will happen at your party, can you write a class
// which works with all the below code?

class PunchMixer<CupType> {
  private _punch: Punch = {
    flavour: "Punch",
    ingredients: [],
  };

  public get punch(): Punch {
    return this._punch;
  }
  public set punch(ingredientOrPunch: Punch | Punch["ingredients"][number]) {
    switch (typeof ingredientOrPunch) {
      case "string":
        this._punch.ingredients.push(ingredientOrPunch);
        break;
      case "object": {
        if ("flavour" in ingredientOrPunch) {
          this._punch = ingredientOrPunch;
        } else {
          this._punch.ingredients.push(ingredientOrPunch);
        }
      }
    }
  }
  public vend(): CupType {
    return {} as CupType;
  }
}

// (if you want to try this without classes, you can drop the new below,
// but otherwise, please leave this code alone)

const mixer = new PunchMixer();

// Some actions which happen during the party, mainly used to validate
// your class works as expected

const enterTheParty = (name: string) => {};
const grabAGlass = (name: string, punch: Punch) => {};
const topUpPunch = (name: string, punch: Punch) => {};
const addIce = (punch: Punch) => {};

function partyStarts() {
  addIce(mixer.punch);

  enterTheParty("A");
  mixer.punch = "Guiness 0.0";

  enterTheParty("B");
  mixer.punch = { fruit: "strawberries", number: 6 };

  enterTheParty("C");
  grabAGlass("B", mixer.punch);
  topUpPunch("C", mixer.punch);

  mixer.punch = { fruit: "grapes", number: 23 };
  mixer.punch = "Pineapple Juice";

  // (optional, if you run this code sample, this should not error)
  if (mixer.punch.ingredients.length !== 4) {
    console.error("Something got mixed up in the punch");
  }
}

// Part 2 is a few lines below this
partyStarts();

// Congrats, that worked out well (we hope!) so you'd like
// to scale your operation to handle many mixers in the party.
// To do that you'd like to make the class generically available
// and to have a function for vending out their classes - no need
// to worry too much about the implementation details here just
// get the types working as expected.

type SoloCup = { color: "red" };
type Glass = { size: "small" };

function partiesAtAnyScale() {
  const livingRoomMixer = new PunchMixer<SoloCup>();
  const kitchenMixer = new PunchMixer<Glass>();

  enterTheParty("A");
  kitchenMixer.punch = "Stryyk";
  const glass = kitchenMixer.vend();
  //    ^?
  glass.size;

  enterTheParty("B");
  livingRoomMixer.punch = "Rhubarb Juice";
  const cup = livingRoomMixer.vend();
  //    ^?
  cup.color;
}
