export type SimDate = {
  seasonYear: number;
  dayIndex: number;
}

export function makeSimDate(
  seasonYear: number,
  dayIndex: number = 0
): SimDate {
  if (!Number.isInteger(seasonYear)) {
    throw new Error(
      `SimDate: seasonYear must be an integer (got ${seasonYear})`
    );
  }

  if (!Number.isInteger(dayIndex) || dayIndex < 0) {
    throw new Error(
      `SimDate: dayIndex must be an integer >= 0 (got ${dayIndex})`
    );
  }

  return Object.freeze({
    seasonYear,
    dayIndex,
  });
}