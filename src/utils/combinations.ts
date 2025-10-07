export type InputLists = Record<string, unknown[]>;

export function cartesianProductAllLists(lists: InputLists): unknown[][] {
  const entries = Object.entries(lists);
  if (entries.length === 0) return [];

  const results: unknown[][] = [];

  function backtrack(index: number, current: unknown[]) {
    if (index === entries.length) {
      results.push([...current]);
      return;
    }
    const [_, arr] = entries[index];
    for (const value of arr) {
      current.push(value);
      backtrack(index + 1, current);
      current.pop();
    }
  }

  backtrack(0, []);
  return results;
}

export function combineAsJsonObjects(lists: InputLists): Record<string, unknown>[] {
  // DEV branch behavior: use only lists whose elements are numbers
  const filteredEntries = Object.entries(lists).filter(([_, arr]) =>
    Array.isArray(arr) && arr.every(v => typeof v === 'number')
  );
  const filtered: InputLists = Object.fromEntries(filteredEntries);
  const keys = Object.keys(filtered);
  const tuples = cartesianProductAllLists(filtered);
  return tuples.map(tuple => {
    const obj: Record<string, unknown> = {};
    for (let i = 0; i < keys.length; i++) {
      obj[keys[i]] = tuple[i];
    }
    return obj;
  });
}

export const defaultSampleInput: InputLists = {
  numbers: [1, 2],
  moreNumbers: [10, 20],
  words: ['a', 'b'],
};


