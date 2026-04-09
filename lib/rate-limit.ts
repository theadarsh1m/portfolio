import { Redis } from "@upstash/redis";
import { Ratelimit } from "@upstash/ratelimit";

// Initialize Upstash Redis client
// These variables must be set in your .env or platform dashboard
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

// Create a new ratelimiter, that allows 3 requests per 24 hours
const ratelimit = new Ratelimit({
  redis: redis,
  limiter: Ratelimit.slidingWindow(3, "24 h"),
  analytics: true,
  prefix: "@upstash/ratelimit",
});

export async function checkRateLimit(ip: string) {
  // If credentials are missing, we log a warning but allow the request 
  // so the site doesn't break. This is a "fail-open" strategy.
  if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) {
    console.warn("UPSTASH_REDIS credentials missing. Rate limiting is currently disabled.");
    return { allowed: true };
  }

  try {
    const { success, limit, reset, remaining } = await ratelimit.limit(ip);

    if (!success) {
      return {
        allowed: false,
        error: "Too many requests. Please try again later.",
      };
    }

    return {
      allowed: true,
      remaining: remaining,
    };
  } catch (error) {
    console.error("Rate limit check failed:", error);
    // Fail-open strategy: if Redis is down, we allow the request.
    return { allowed: true };
  }
}
