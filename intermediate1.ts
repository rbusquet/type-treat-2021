// Costume prep time, you figure "why not dress up like
// the antagonists in the Squid Game?", it seems pretty easy
// based on your old Casa de Papel outfit.
// ( https://duckduckgo.com/?q=casa+de+papel&iax=images&ia=images)

// You set aside time to figure out what you're going to need to
// convert the constume and sketch out the potential work to
// give yourself an idea of timescale:

import { search, printer } from "type-or-treat";

const findOldCostume = () => {
  const jumpSuit = search.attic() || search.closet() || search.garage();
  const estimate = 30;
  return { jumpSuit, estimate };
};

const createNewMask = (costume: ReturnType<typeof findOldCostume>) => {
  const mask = printer.printMask();
  mask.shape = "circle";
  costume.estimate += 60;
  return { ...costume, mask };
};

const createBodyCamera = (costume: ReturnType<typeof createNewMask>) => {
  const camera = printer.printCamera();
  // It will need painting too
  costume.estimate += 45;
  return { ...costume, camera };
};

const assembleCostume = () => {
  return createBodyCamera(createNewMask(findOldCostume()));
};

// Great, this creates an assembly line of all the parts and
// the work you need to do. However, it relies on `any`s which
// makes working with the actual costume a bit ambiguous:

const costume = assembleCostume();
//    ^?

// Can you think of a way to fix the inference without creating
// new `type`s or `interface`s, or replacing the anys with `{ ... }`?

// Ideally this typeof problem can be solved so that you can
// make a change in one of the functions and not need to update the types.

// You'll know it worked when this line raises an error
// @ts-expect-error Property 'time' does not exist on type '{ camera: Camera; mask: Mask; jumpSuit: Jumpsuit; estimate: number; }'.ts(2339)
console.log(`It should take about ${costume.time} minutes`);

// Now that we've got a working pipeline, can you generate a type
// which represents the end-state of assembleCostume so that others
// can re-use it later?

type AssembledCostume = ReturnType<typeof assembleCostume>;
