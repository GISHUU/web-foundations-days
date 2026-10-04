let notes = [
  { id: 1, text: "Buy milk and bread", category: "personal" },
  { id: 2, text: "Finish the Day 3 assignment", category: "study" },
  { id: 3, text: "Email the project report to Grace", category: "work" },
  { id: 4, text: "Revise JavaScript arrays", category: "study" },
  { id: 5, text: "Call mum", category: "personal" },
];

function searchNotes(word) {
  return notes.filter(note =>
    note.text.toLowerCase().includes(word.toLowerCase())
  );
}

function longestNote() {
  if (notes.length === 0) {
    return null;
  }

  return notes.reduce((longest, note) =>
    note.text.length > longest.text.length ? note : longest
  );
}

function countByCategory() {
  const counts = {};

  for (const note of notes) {
    if (!counts[note.category]) {
      counts[note.category] = 0;
    }

    counts[note.category]++;
  }

  return counts;
}

function getSummary() {
  const counts = countByCategory();
  const count = notes.length;
  const word = count === 1 ? "note" : "notes";

  return `${count} ${word}: ${counts.personal || 0} personal, ${counts.work || 0} work, ${counts.study || 0} study.`;
}

function isDuplicate(text) {
  const normalizedText = text.trim().toLowerCase();

  return notes.some(note =>
    note.text.trim().toLowerCase() === normalizedText
  );
}

function addNote(text, category) {
  if (text.length < 1 || text.length > 200) {
    console.log("Note must be between 1 and 200 characters.");
    return false;
  }

  if (isDuplicate(text)) {
    console.log("Note already exists.");
    return false;
  }

  if (!["personal", "work", "study"].includes(category)) {
    console.log("Invalid category.");
    return false;
  }

  const newId = notes.length + 1;

  notes.push({
    id: newId,
    text: text.trim(),
    category: category
  });

  return true;
}


// Tests

console.log(searchNotes("day"));
// Expected: [{ id: 2, text: "Finish the Day 3 assignment", category: "study" }]

console.log(searchNotes("xyz"));
// Expected: []

console.log(longestNote());
// Expected: note with text "Email the project report to Grace"

console.log("Empty longest note test:", []);
// Expected: [] (demonstrates an empty array, not an empty notes

const originalNotes = notes;
notes = [];
console.log("Empty longest note test:", longestNote());
// Expected: null
notes = originalNotes;

console.log(countByCategory());
// Expected: { personal: 2, study: 2, work: 1 }

console.log(getSummary());
// Expected: "5 notes: 2 personal, 1 work, 2 study."

console.log(isDuplicate("  BUY MILK AND BREAD  "));
// Expected: true

console.log(isDuplicate("Something completely new"));
// Expected: false

console.log(addNote("Learn Bash scripting", "study"));
// Expected: true

console.log(addNote("Buy milk and bread", "personal"));
// Expected: false

console.log(addNote("", "study"));
// Expected: false
