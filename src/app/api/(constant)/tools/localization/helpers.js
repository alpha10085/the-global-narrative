import config from "@/i18n/config";
import { readFile, getRootpath, writeFile, path } from "@/utils/fs";
import { gemini } from "@/utils/gemini";

export const updateLanguageConfig = async ({
  route = null,
  defaultLocale = null,
  locale = null,
  remove = false,
} = {}) => {
  const newLocale = locale?.key || null;
  const newLabel = locale?.label || null;
  const configPath = path.join(getRootpath.rootSrcPath, "i18n", "config.js");
  let content = await readFile(configPath);

  // Extract current defaultLocale from file if not passed explicitly
  let currentDefaultLocale = defaultLocale;
  if (!currentDefaultLocale) {
    const defaultLocaleMatch = content.match(
      /defaultLocale:\s*["']([a-zA-Z-]+)["']/
    );
    if (defaultLocaleMatch) {
      currentDefaultLocale = defaultLocaleMatch[1];
    }
  }

  // If trying to remove the defaultLocale, block removal
  if (remove && newLocale === currentDefaultLocale) {
    console.warn(
      `Cannot remove locale "${newLocale}" because it is the defaultLocale. Please change defaultLocale first.`
    );
    // Do not proceed with removal, just return early or continue without removing
    remove = false;
  }

  // === Handle locales array ===
  content = content.replace(/locales:\s*\[([^\]]*)\]/, (match, p1) => {
    let locales = p1
      .split(",")
      .map((l) => l.trim().replace(/^"|"$/g, ""))
      .filter(Boolean);

    if (remove && newLocale) {
      locales = locales.filter((l) => l !== newLocale);
    } else if (newLocale && !locales.includes(newLocale)) {
      locales.push(newLocale);
    }

    const updated = locales.map((l) => `"${l}"`).join(", ");
    return `locales: [${updated}]`;
  });

  // === Handle getlanguagesMap entries ===
  content = content.replace(/return\s+\[\s*((?:.|\n)*?)\s*\];/, (_, body) => {
    let entries = body
      .split("},")
      .map((entry) => entry.trim())
      .filter(Boolean)
      .map((entry) => {
        if (!entry.endsWith("}")) entry += "}";
        return entry;
      });

    if (remove && newLocale) {
      entries = entries.filter(
        (entry) => !entry.includes(`key: "${newLocale}"`)
      );
    } else if (
      newLocale &&
      newLabel &&
      !entries.some((e) => e.includes(`key: "${newLocale}"`))
    ) {
      entries.push(`{
      key: "${newLocale}",
      label: translations?.${newLocale} || "${newLabel}",
    }`);
    }

    return `return [\n    ${entries.join(",\n    ")}\n];`;
  });

  // === Update route if needed ===
  if (typeof route === "boolean") {
    content = content.replace(/route:\s*(true|false)/, `route: ${route}`);
  }

  // === Update defaultLocale ===
  if (defaultLocale) {
    content = content.replace(
      /defaultLocale:\s*["'][a-zA-Z-]+["']/,
      `defaultLocale: "${defaultLocale}"`
    );
  }

  // === Write back the file ===
  await writeFile(configPath, content, {
    autoFormate: true,
    overwrite: true,
  });
};

export const genrateLocale = async ({ nextLang, label } = {}) => {
  if (!nextLang)
    return next({
      message: "lang is required",
    });
  try {
    const defaultMessages = (
      await import(`../../../../../i18n/locales/${config.defaultLocale}.json`)
    ).default;

    const prompt = `
Translate the following JSON from "${config.defaultLocale}" to "${nextLang}".
Keep the keys the same and only translate the values. Return only valid JSON.

JSON:
${JSON.stringify(defaultMessages, null, 2)}
      `.trim();

    const geminiResponse = await gemini(prompt);
    const rawText = geminiResponse?.candidates?.[0]?.content?.parts?.[0]?.text;

    const cleanedText = rawText
      ?.replace(/^```json\s*/i, "")
      ?.replace(/```$/, "");

    const parsedResult = JSON.parse(cleanedText);

    if (!config.locales?.includes(nextLang)) {
      await updateLanguageConfig({
        locale: { key: nextLang, label },
      });
    }

    await writeFile(
      path.join(getRootpath.rootSrcPath, "i18n", "locales", `${nextLang}.json`),
      parsedResult
    );
    return {
      error: false,

      success: true,
    };
  } catch (error) {
    return {
      error: true,
      success: false,
      details: error?.message,
    };
  }
};
