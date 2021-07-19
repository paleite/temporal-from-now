import { Temporal } from "@js-temporal/polyfill";

type PastFuture = "past" | "future";

function assertNever(arg0: never): never {
  throw new Error(`Invalid argument: ${JSON.stringify(arg0)}`);
}

const temporalFormat = (pf: PastFuture) => {
  switch (pf) {
    case "past":
      return formatPast;
    case "future":
      return formatFuture;
    default:
      return assertNever(pf);
  }
};

const formatFuture = (time: string) => `in ${time}`;
const formatPast = (time: string) => `${time} ago`;
const formatSeconds = (time: number) => `${Math.abs(time)} seconds`;

const temporalFromNow = (instant: Temporal.Instant): string => {
  const duration = instant.since(Temporal.now.instant(), {
    largestUnit: "hour",
    smallestUnit: "second",
  });
  const pastFuture: PastFuture = duration.sign === -1 ? "past" : "future";
  const format = temporalFormat(pastFuture);

  const result = format(
    formatSeconds(
      duration.round({
        largestUnit: "second",
        smallestUnit: "second",
      })["seconds"]
    )
  );
  return result;
};

export { temporalFromNow };
