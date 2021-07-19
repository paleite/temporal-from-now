import { temporalFromNow } from "./index";

describe("temporalFromNow", () => {
  it("should launch without crashing", () => {
    expect(temporalFromNow).not.toThrow();
  });
});
