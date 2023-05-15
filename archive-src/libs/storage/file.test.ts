import { jest, describe, expect, it, beforeAll } from "@jest/globals";
import { uploadWithPaths, uploadWithValues } from "./file";

jest.setTimeout(10 * 1000);
describe.skip("file", () => {
  const files = ["./public/clean1.jpg", "./public/clean2.jpg"];
  it("uploadFile bulk", async () => {
    const results = await uploadWithPaths(files);
    expect(results).toEqual("hello");
  });

  it("uploadFile single", async () => {
    const results = await uploadWithPaths([files[0]]);
    expect(results).toEqual("hello");
  });

  it("#uploadWithValues", async () => {
    const cid = await uploadWithValues([{ a: 123 }]);
    expect(typeof cid).toEqual("string");
  });
});
