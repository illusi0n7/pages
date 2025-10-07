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
    const [, arr] = entries[index];
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
  const keys = Object.keys(lists);
  const tuples = cartesianProductAllLists(lists);
  return tuples.map(tuple => {
    const obj: Record<string, unknown> = {};
    for (let i = 0; i < keys.length; i++) obj[keys[i]] = tuple[i];
    return obj;
  });
}

