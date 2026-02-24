import { describe, it, expect, beforeEach, vi } from "vitest";

describe("ENV module", () => {
  // Store original env to restore after tests
  const originalEnv = process.env;

  beforeEach(() => {
    // Reset modules and environment before each test
    vi.resetModules();
    process.env = { ...originalEnv };
  });

  it("should export an ENV object", async () => {
    const { ENV } = await import("./env.js");
    expect(ENV).toBeDefined();
    expect(typeof ENV).toBe("object");
  });

  it("should contain PORT property from process.env", async () => {
    process.env.PORT = "3000";
    const { ENV } = await import("./env.js");
    expect(ENV).toHaveProperty("PORT");
    expect(ENV.PORT).toBe("3000");
  });

  it("should contain DB_URL property from process.env", async () => {
    process.env.DB_URL = "mongodb://localhost:27017/testdb";
    const { ENV } = await import("./env.js");
    expect(ENV).toHaveProperty("DB_URL");
    expect(ENV.DB_URL).toBe("mongodb://localhost:27017/testdb");
  });

  it("should contain NODE_ENV property from process.env", async () => {
    process.env.NODE_ENV = "test";
    const { ENV } = await import("./env.js");
    expect(ENV).toHaveProperty("NODE_ENV");
    expect(ENV.NODE_ENV).toBe("test");
  });

  it("should handle undefined environment variables", async () => {
    delete process.env.PORT;
    delete process.env.DB_URL;
    delete process.env.NODE_ENV;
    const { ENV } = await import("./env.js");
    expect(ENV.PORT).toBeUndefined();
    expect(ENV.DB_URL).toBeUndefined();
    expect(ENV.NODE_ENV).toBeUndefined();
  });

  it("should export all three required properties", async () => {
    process.env.PORT = "5000";
    process.env.DB_URL = "mongodb://localhost:27017/db";
    process.env.NODE_ENV = "development";
    const { ENV } = await import("./env.js");
    expect(Object.keys(ENV)).toEqual(
      expect.arrayContaining(["PORT", "DB_URL", "NODE_ENV"])
    );
    expect(Object.keys(ENV).length).toBe(3);
  });

  it("should handle production NODE_ENV", async () => {
    process.env.NODE_ENV = "production";
    process.env.PORT = "8080";
    const { ENV } = await import("./env.js");
    expect(ENV.NODE_ENV).toBe("production");
    expect(ENV.PORT).toBe("8080");
  });

  it("should handle development NODE_ENV", async () => {
    process.env.NODE_ENV = "development";
    const { ENV } = await import("./env.js");
    expect(ENV.NODE_ENV).toBe("development");
  });

  it("should preserve environment variable types as strings", async () => {
    process.env.PORT = "3000";
    const { ENV } = await import("./env.js");
    expect(typeof ENV.PORT).toBe("string");
  });

  it("should handle empty string environment variables", async () => {
    process.env.PORT = "";
    process.env.DB_URL = "";
    process.env.NODE_ENV = "";
    const { ENV } = await import("./env.js");
    expect(ENV.PORT).toBe("");
    expect(ENV.DB_URL).toBe("");
    expect(ENV.NODE_ENV).toBe("");
  });

  it("should handle special characters in DB_URL", async () => {
    process.env.DB_URL = "mongodb://user:p@ssw0rd@localhost:27017/db?authSource=admin";
    const { ENV } = await import("./env.js");
    expect(ENV.DB_URL).toBe("mongodb://user:p@ssw0rd@localhost:27017/db?authSource=admin");
  });

  it("should not mutate process.env when ENV is accessed", async () => {
    process.env.PORT = "4000";
    const originalPort = process.env.PORT;
    const { ENV } = await import("./env.js");
    ENV.PORT; // Access the property
    expect(process.env.PORT).toBe(originalPort);
  });
});