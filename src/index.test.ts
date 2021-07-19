import { Temporal } from "@js-temporal/polyfill";
import { temporalFromNow } from "./index";

const now = Temporal.now;
const temporalSpy = jest
  .spyOn(now, "instant")
  .mockImplementation(() => Temporal.Instant.from("2021-07-19T18:24:25Z"));
const testInstant = Temporal.Instant.from("2021-07-19T12:58:12Z");

describe("temporalFromNow", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should run without crashing", () => {
    expect(() => temporalFromNow(testInstant)).not.toThrow();
  });

  it("should return the correct string from the past", () => {
    expect(temporalFromNow(testInstant)).toMatchInlineSnapshot(
      `"19573 seconds ago"`
    );

    expect(temporalSpy).toHaveBeenCalledTimes(1);
    expect(temporalSpy.mock.results[0]?.value).toBeInstanceOf(Temporal.Instant);
  });

  it("should return the correct string from the future", () => {
    const futureInstant = Temporal.Instant.from("2021-08-19T18:24:25Z");
    expect(temporalFromNow(futureInstant)).toMatchInlineSnapshot(
      `"in 2678400 seconds"`
    );
  });
});
