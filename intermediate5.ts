// You're running a bookshop, and during Halloween you
// have a special for horror books based on how many ghosts
// there are in the book.

interface Book {
  genre: string;
  applyDiscount: (discount: number) => void;
}

// For simplicity, we'll assume there are only two genres, but
// ideally we'd like to add as many as possible later down the line.

interface HorrorBook extends Book {
  genre: "horror";
  ghostCount: number;
  victimsCount: number;
}
interface RomanceBook extends Book {
  genre: "romance";
  protagonistName: string;
}

type Books = HorrorBook | RomanceBook;

// You want to handle the sale using an event-system, which looks like 'on[genre] => (book)'.
// To make your life easier, you have a map of the events to their books to their event name:

type IncomingBookMap = {
  onhorror: HorrorBook;
  onromance: RomanceBook;
};

// Your event system looks like this, but when you start to access the additional fields
// on each genre TypeScript starts to give errors. That's not great:

handleSale({
  onhorror(book) {
    book.applyDiscount(book.ghostCount * 5);
  },
  onromance(book) {
    console.error(
      `No romance books discount during Halloween, even though ${book.protagonistName} is great`
    );
  },
});

// Here's the function where you'll be doing the work, can you convert this function to handle
// passing through the correct type to the correct function. We're going to try and work on it incrementally, so
// don't feel like you need to jump to a perfect answer yet.

function handleSaleBase(events: Record<string, (e: Books) => void>) {
  // We're ignoring the implementation details for this function.
  // Meaning, the only possible work you need to do is in the `events` param above.
}

/// Step 1

// Can you make `handleSale` function only accept `onhorror` and `onromance` as keys?

function handleSale1(
  events: Record<keyof IncomingBookMap, (e: Books) => void>
) {
  // We're ignoring the implementation details for this function.
  // Meaning, the only possible work you need to do is in the `events` param above.
}
/// Step 2

// Now that `onother` is correctly raising an error, you can remove it.

// On that subject, can you make `handleSale` accept one of the real function being absent? For example, right now
// you have to include `onromance` but it does nothing. To pull this off you're going to need to
// make some pretty fundamental changes to the type of `events` as you'll need a mapping modifier.

// Tip: Don't use `Partial` for this.

function handleSale2(events: {
  [key in keyof IncomingBookMap]?: (e: Books) => void;
}) {
  // We're ignoring the implementation details for this function.
  // Meaning, the only possible work you need to do is in the `events` param above.
}

/// Step 3

// Now that the functions are set up, it's time to hit the main problem: the types
// for the `book` inside each function needs to be based on the name of the event.
// Can you pass that information through the type?

function handleSale3(events: {
  [key in keyof IncomingBookMap]?: (e: IncomingBookMap[key]) => void;
}) {
  // We're ignoring the implementation details for this function.
  // Meaning, the only possible work you need to do is in the `events` param above.
}

/// Bonus: Step 4

// Can we remove the need for `IncomingBookMap` all together, relying solely on `Books` to create the types?
// You'll need to use some template string manipulation to wrap up the entire function.

// type GenreEvent = ;

type GenreHandlers = `on${Books["genre"]}`;

type InferredBook<Handler extends `on${string}`> = Books & {
  genre: Handler extends `on${infer Genre}` ? Genre : never;
};

function handleSale4(events: {
  [Handler in GenreHandlers]?: (e: InferredBook<Handler>) => void;
}) {
  // We're ignoring the implementation details for this function.
  // Meaning, the only possible work you need to do is in the `events` param above.
}

// TIL: key re-mapping
// from blog post

type Events = {
  [Book in Books as `on${Book["genre"]}`]: (ev: Book) => void;
};
function handleSale(events: Events) {}
