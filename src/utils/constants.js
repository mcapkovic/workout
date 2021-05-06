export const DEFAULT_SUB_PAGE = "default-sub-page";
export const WORKOUT_SUB_PAGE = "workout-sub-page";
export const DETAILS_SUB_PAGE = "details-sub-page";

export const PUSH_UP = "pushUp"; // do not change!
export const SQUAT = "squat"; // do not change!
export const SIT_UP = "sitUp"; // do not change!
export const PULL_UP = "pullUp"; // do not change!
export const VR = "vr"; // do not change!
export const CYCLING = "cycling"; // do not change!
export const RUNNING = "running"; // do not change!
export const STEPPER = "stepper"; // do not change!

export const strings = {
  [PUSH_UP]: "push up",
  [SQUAT]: "squat",
  [SIT_UP]: "sit up",
  [PULL_UP]: "pull up",
  [VR]: "vr",
  [CYCLING]: "cycling",
  [RUNNING]: "running",
  [STEPPER]: "stepper",
};

export const UNITS = {
  m: { singular: "meter", plural: "meters", id: "m" },
  min: { singular: "minute", plural: "minutes", id: "min" },
  km: { singular: "kilometer", plural: "kilometers", id: "km" },
};

export const typeDefaultUnit = {
  [PUSH_UP]: "",
  [SQUAT]: "",
  [SIT_UP]: "",
  [PULL_UP]: "",
  [VR]: UNITS.min.id,
  [CYCLING]: UNITS.km.id,
  [RUNNING]: UNITS.km.id,
  [STEPPER]: "",
};

export const defaultClickerAdditions = {
  default: [1, 5, 10],
  [RUNNING]: [0.1, 0.5, 1],
  [STEPPER]: [1, 10, 50, 200, 1000],
};

export const SAVING = "saving";
export const ERROR = "error";
export const SAVED = "saved";

export const PRAISE_MESSAGES = [
  "well done",
  "amazing job",
  "you did it",
  "nice going",
  "nailed it",
  "fantastic job",
  "nicely done",
  "well made",
  "beautiful work",
  "perfect",
  "job well done",
  "magnificent job",
  "excellent work",
  "freaking awesome",
  "way to go",
  "bravo",
  "you rock",
  "congrats",
  "that is the spirit",
  "keep it coming",
  "excellent",
  "kudos",
  "sweet",
  "that is something",
  "hell of a job",
  "way to go",
  "fabulous job",
  "doing great",
  "remarkable job",
  "outstanding work",
  "bang-up job",
  "superb job",
  "magnificent job",
  "wonderful job",
  "doing so well",
  "doing so great",
  "make it big",
];
