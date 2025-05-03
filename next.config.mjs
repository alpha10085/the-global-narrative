import createNextIntlPlugin from "next-intl/plugin";

// Specify the path to your i18n configuration file
const withNextIntl = createNextIntlPlugin("./src/i18n/request.js");

/** @type {import('next').NextConfig} */
const nextConfig = {
images: { domains: ["img.youtube.com", "res.cloudinary.com", "127.0.0.1", "img.freepik.com", "images.pexels.com", "cc-plus.com", "pbs.twimg.com", "encrypted-tbn0.gstatic.com", "narrativesummit.com"] },
reactStrictMode: false,
experimental: { turbo: { resolveAlias: { canvas: "./empty-module.ts" } } }
};

export default withNextIntl(nextConfig);
