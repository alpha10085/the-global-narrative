import config from "@/i18n/config";
import { readFile, getRootpath, writeFile, path, deleteFile } from "@/utils/fs";
import { gemini } from "@/utils/gemini";
import { layoutbody, pageBody } from "./default";
import fs from "fs-extra";
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

    if (defaultLocale && locales.includes(defaultLocale)) {
      locales = [defaultLocale, ...locales.filter((l) => l !== defaultLocale)];
    }

    const updated = locales.map((l) => `"${l}"`).join(", ");
    return `locales: [${updated}]`;
  });

  // === Handle getLanguagesMap entries ===
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
    } else if (newLocale && newLabel) {
      const keyRegex = new RegExp(`key:\\s*["']${newLocale}["']`);
      let updated = false;

      entries = entries.map((entry) => {
        if (keyRegex.test(entry)) {
          updated = true;
          return `{
        key: "${newLocale}",
        label: translations?.["${newLocale}"] || "${newLabel}",
      }`;
        }
        return entry;
      });

      if (!updated) {
        entries.push(`{
        key: "${newLocale}",
        label: translations?.["${newLocale}"] || "${newLabel}",
      }`);
      }
    }

    if (defaultLocale) {
      const defaultIndex = entries.findIndex((e) =>
        e.includes(`key: "${defaultLocale}"`)
      );
      if (defaultIndex > -1) {
        const [defaultEntry] = entries.splice(defaultIndex, 1);
        entries.unshift(defaultEntry);
      }
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

export const genrateLocale = async ({
  nextLang = config?.defaultLocale,
  label = "",
} = {}) => {
  if (!nextLang)
    return next({
      message: "lang is required",
    });
  try {
    const defaultMessages = (
      await import(`../../../../../i18n/locales/${config?.defaultLocale}.json`)
    ).default;

    const prompt = `
Translate the following JSON from "${config?.defaultLocale}" to "${nextLang}".
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

const moveFolder = async (oldPath, newPath) => {
  if (fs.existsSync(oldPath)) {
    await fs.copy(oldPath, newPath); // copy folder recursively
    await fs.remove(oldPath); // delete original folder
  }

  return true;
};

const appPath = path.join(getRootpath.rootSrcPath, "app");
const removeNextIntlFormLayout = async () => {
  const data = await readFile(path.join(appPath, "layout.jsx"));
  if (!data) return console.error("❌ Error reading file:", err);

  let updated = data
    // Remove the NextIntlClientProvider import
    .replace(
      /import\s*\{\s*NextIntlClientProvider\s*\}\s*from\s*["']next-intl["'];?\n?/g,
      ""
    )
    // Remove the dynamic import for messages
    .replace(
      /const messages = \([\s\S]*?import\(`\.\.\/i18n\/locales\/\$\{ValidateLocale\(locale, true\)\}\.json`\)[\s\S]*?\)\.default;\n*/g,
      ""
    )
    // Remove <NextIntlClientProvider ...>
    .replace(/<NextIntlClientProvider[\s\S]*?messages=\{messages\}>/, "")
    // Remove </NextIntlClientProvider>
    .replace(/<\/NextIntlClientProvider>/, "");

  await writeFile(path.join(appPath, "layout.jsx"), updated);
};
export const changeToWithRouting = async () => {
  try {
    const newPath = path.join(appPath, "[locale]");
    const foldersToMove = ["(dashboard)", "(routes)"];
    fs.mkdirSync(newPath, {
      recursive: true,
    });
    const promises = foldersToMove.map((f) => {
      const src = path.join(appPath, f);
      const dest = path.join(newPath, f);
      return moveFolder(src, dest);
    });
    try {
      await Promise.all(promises);

      await removeNextIntlFormLayout();
      await writeFile(path.join(newPath, "layout.jsx"), layoutbody);
      await writeFile(path.join(appPath, "page.jsx"), pageBody);
    } catch (err) {
      console.error("Error moving folders:", err);
    }
  } catch (error) {
    return null;
  }
};

export const transformLayoutCode = async () => {
  let updatedCode = await readFile(path.join(appPath, "layout.jsx"));

  // === Step 1: Ensure imports are present ===
  const importsToEnsure = [
    { name: "NextIntlClientProvider", from: "next-intl" },
    { name: "ValidateLocale", from: "@/i18n/request" },
  ];

  importsToEnsure.forEach(({ name, from }) => {
    const importRegex = new RegExp(
      `import\\s+\\{[^}]*\\b${name}\\b[^}]*\\}\\s+from\\s+["']${from}["']`
    );
    if (!importRegex.test(updatedCode)) {
      // Insert after the last import block
      const lastImportIndex = updatedCode.lastIndexOf("import");
      const nextLineIndex = updatedCode.indexOf("\n", lastImportIndex);
      updatedCode = `${updatedCode.slice(
        0,
        nextLineIndex
      )}\nimport { ${name} } from "${from}";${updatedCode.slice(
        nextLineIndex
      )}`;
    }
  });

  // === Step 2: Add messages import logic after `locale` ===
  const getLocaleLine = /const\s+locale\s*=\s*await\s+getLocale\(\);/;
  if (getLocaleLine.test(updatedCode) && !updatedCode.includes("messages =")) {
    updatedCode = updatedCode.replace(getLocaleLine, (match) => {
      return `${match}\n  const messages = (await import(\`../i18n/locales/\${ValidateLocale(locale, true)}.json\`)).default;`;
    });
  }

  // === Step 3: Inject NextIntlClientProvider inside <body> ===
  const bodyTagRegex = /<body([^>]*)>([\s\S]*?)<\/body>/;
  const match = updatedCode.match(bodyTagRegex);

  if (match && !updatedCode.includes("<NextIntlClientProvider")) {
    const bodyAttrs = match[1];
    const bodyContent = match[2];

    // Preserve all content inside the provider
    const wrappedBody = `
<body${bodyAttrs}>
  <NextIntlClientProvider locale={locale} messages={messages}>
${bodyContent.trim().startsWith("<") ? "    " : ""}${bodyContent.trim()}
  </NextIntlClientProvider>
</body>`;

    updatedCode = updatedCode.replace(bodyTagRegex, wrappedBody);
  }
  await writeFile(path.join(appPath, "layout.jsx"), updatedCode);
};

export const changeToWithoutRouting = async () => {
  try {
    const newPath = path.join(appPath, "[locale]");
    const foldersToMove = ["(dashboard)", "(routes)"];
    fs.mkdirSync(newPath, {
      recursive: true,
    });
    const promises = foldersToMove?.map((f) => {
      const src = path.join(newPath, f);
      const dest = path.join(appPath, f);
      return moveFolder(src, dest);
    });
    try {
      await Promise.all(promises);
      await transformLayoutCode();
      await deleteFile(path.join(newPath, "layout.jsx"));
      await deleteFile(path.join(appPath, "page.jsx"));
      fs.rmdirSync(newPath, { recursive: true });
    } catch (err) {
      console.error("Error moving folders:", err);
    }
  } catch (error) {
    return null;
  }
};
