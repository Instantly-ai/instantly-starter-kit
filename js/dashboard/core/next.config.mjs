/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Allow an isolated build output (e.g. for capturing demo screenshots) without
  // clobbering a running dev server's .next. Defaults to the normal .next.
  distDir: process.env.NEXT_DIST_DIR || ".next",
}

export default nextConfig
