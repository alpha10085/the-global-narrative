import { getRootpath } from "@/scripts/helpers";
import fs from "fs";
import path from "path";
import config from "@/i18n/config";
import { createComponent } from "../components/services";
import { Asynchandler } from "../helpers";

const createStylesFile = Asynchandler(async (folderPath) => {
  const stylesPath = path.join(folderPath, "styles.module.css");

  fs.writeFileSync(stylesPath, ``);

  return true;
});
const createNotFoundFile = Asynchandler(async (folderPath) => {
  const notfoundPath = path.join(folderPath, "not-found.jsx");

  fs.writeFileSync(
    notfoundPath,
    `"use client";
import ErrorNotFound from "@/components/NotFound/NotFound";

export default function NotFound() {
  return <ErrorNotFound />;
}
`
  );

  return true;
});
const createLoadingFile = Asynchandler(async (folderPath) => {
  const loadingPath = path.join(folderPath, "loading.jsx");

  fs.writeFileSync(
    loadingPath,
    `"use client";
import Img from "@/components/Shared/img/Img";
import LoadingLayout from "@/components/Shared/LoadingLayout/LoadingLayout";
import React, { useEffect } from "react";
import styles from "./page.module.css";
const Loading = () => {
  useEffect(() => {}, []);
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 50,
        background: "black",
      }}
      className="flex-c"
    >
      <LoadingLayout 
      color="white"
      />
    </div>
  );
};

export default Loading;
`
  );

  return true;
});
const createErrorFile = Asynchandler(async (folderPath) => {
  const errorPath = path.join(folderPath, "error.jsx");

  fs.writeFileSync(
    errorPath,
    `"use client";
import ErrorPage from "@/components/Shared/ErrorPage/ErrorPage";
const handler = (props) => <ErrorPage {...props} />;
export default handler;
`
  );
  return true;
});
const CraetePageFile = Asynchandler(async (options, folderPath) => {
  const { name, styles, pageStrategy, metadata } = options;
  const pagePath = path.join(folderPath, "page.jsx");
  const dynamicPath = name
    .split("/")
    .filter((part) => /^\[[a-zA-Z0-9_]+\]$/.test(part)) // Matches only [param] format
    .map((part) => part.slice(1, -1)); // Remove brackets

  const withApi = options?.getPage && !dynamicPath.length;
  const pageType = {
    default: `const Page = async (props) => {
  ${
    dynamicPath?.length
      ? `const { ${dynamicPath
          .map((val) => `${val} = "" `)
          .join(", ")} } = await props.params;`
      : ""
  }
  ${withApi ? ` const data = await getPage(\`${name}\`);` : ""}
    return (
     <section className={\`${styles ? "${styles.container}" : ""}\`}>

     </section>
    );
  };
    
  export default Page;`,
    SSRWrapper: `export default SsrWrapper({
  Component: () => <div>SSR Wrapper</div>,
  QueryFN: ${withApi ? `getPage` : `() => {}`},
  Querykey: [\`${dynamicPath.length ? dynamicPath[0] : name}\`],
  params: ${!!dynamicPath.length},
  searchParams: false,
  });
  `,
  };

  const selectedPageType = pageType?.[pageStrategy] || pageType.default;
  const pageContent = `
${styles ? `import styles from "./styles.module.css";` : ""}
${
  pageStrategy === "default" && options.ssrFetcher
    ? `import SsrWrapper from "@/components/Shared/SsrWrapper/SsrWrapper";\n`
    : ""
}
${
  metadata && withApi
    ? `import { metadataHandler } from "@/utils/metadata";\n`
    : ""
}
${withApi ? `import { getPage } from "@/lib/pages";\n` : ""}
${
  metadata && withApi
    ? `export const generateMetadata = metadataHandler(getPage, \`${name}\`);`
    : ""
}
${selectedPageType}
`.trim();
  // Write the page file
  fs.writeFileSync(pagePath, pageContent);
  return true;
});

export const createPage = async (options, onError = () => {}) => {
  const result = {};
  try {
    const {
      name = "",
      pageStrategy = null,
      componentname,
      pathToFile,
    } = options;
    // Check if the folder already exists
    const pagePath = path.join(
      getRootpath.rootSrcPath,
      "app",
      ...(config.route ? ["[locale]"] : []),
      ...pathToFile,
      name
    );
    console.log(pagePath);
    
    if (
      fs.existsSync(path.join(pagePath, "page.jsx")) ||
      fs.existsSync(path.join(pagePath, "page.js"))
    )
      return onError({
        message: `❌ ${name} folder already exists!`,
      });
    // create the page directory
    fs.mkdirSync(pagePath, { recursive: true });

    // create page file
    const result_page = await CraetePageFile(options, pagePath);
    result.page = result_page;
    // create style file
    if (options.styles && pageStrategy !== "SSRWrapper") {
      const result_styles = await createStylesFile(pagePath);
      result.styles = result_styles;
    }
    // create component file
    if (options?.component && componentname) {
      const result_Component = createComponent({
        name: componentname,
        helpers: true,
        icons: true,
        styles: true,
        pathToFile: [componentname],
      });
      result.component = result_Component;
    }
    // create loading file
    if (options.loadingFile) {
      const result_loadingFile = await createLoadingFile(pagePath);
      result.loadingFile = result_loadingFile;
    }
    // create error file
    if (options.errorFile) {
      const result_ErrorFile = await createErrorFile(pagePath);
      result.errorFile = result_ErrorFile;
    }
    // create not found file
    if (options.notFound) {
      const result_notFound = await createNotFoundFile(pagePath);
      result.notFound = result_notFound;
    }
    result.error = null;
    result.success = true;
  } catch (error) {
    console.log("🚀 ~ createPage ~ error:", error)
    result.error = error;
    result.success = false;
  }
  return result;
};
