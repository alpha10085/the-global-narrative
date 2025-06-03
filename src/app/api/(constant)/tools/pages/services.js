import { getRootpath } from "@/utils/fs";
import fs from "fs";
import path from "path";
import config from "@/i18n/config";
import { createComponent } from "../components/services";
import { Asynchandler } from "../helpers";
import {
  checkisExists,
  createFolder,
  importFile,
  writeFile,
} from "@/utils/fs";
import { systemLogger } from "@/utils/consoleProxy";

const createStylesFile = Asynchandler(async (folderPath) => {
  const stylesPath = path.join(folderPath, "styles.module.css");
  await writeFile(
    stylesPath,
    `.main {
    
}`,
    {
      autoFormate: true,
      overwrite: true,
    }
  );

  return true;
});
const createNotFoundFile = Asynchandler(async (folderPath) => {
  const notfoundPath = path.join(folderPath, "not-found.jsx");

  await writeFile(
    notfoundPath,
    `"use client";
import ErrorNotFound from "@/Components/NotFound/NotFound";

export default function NotFound() {
  return <ErrorNotFound />;
}
`,
    {
      autoFormate: true,
      overwrite: true,
    }
  );

  return true;
});
const createLoadingFile = Asynchandler(async (folderPath) => {
  const loadingPath = path.join(folderPath, "loading.jsx");

  fs.writeFileSync(loadingPath);

  await writeFile(
    loadingPath,
    `"use client";
import Img from "@/Components/Shared/img/Img";
import LoadingLayout from "@/Components/Shared/LoadingLayout/LoadingLayout";
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
`,
    {
      autoFormate: true,
      overwrite: true,
    }
  );

  return true;
});
const createErrorFile = Asynchandler(async (folderPath) => {
  const errorPath = path.join(folderPath, "error.jsx");

  await writeFile(
    errorPath,
    `"use client";
import ErrorPage from "@/Components/Shared/ErrorPage/ErrorPage";
const handler = (props) => <ErrorPage {...props} />;
export default handler;
`,
    {
      autoFormate: true,
      overwrite: true,
    }
  );
  return true;
});
const CraetePageFile = Asynchandler(async (options, folderPath) => {
  const { name, styles, pageStrategy, metadata, ssrFetcher = false } = options;
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
     <section className={\`${styles ? "${styles.main}" : ""}\`}>
     ${
       ssrFetcher
         ? `
    <SSRFetcher
      //  Component={""} // main component (CSR)
      //  path="" // api route
      //  options={""} //  api options (SSR APi)
      //  Fallback={""} // loading fullback - skeletons or spinner
      //  data={""} // context data
      //  props={""} // custom props
    />
      `
         : ""
     }
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

  const lines = [];

  // Conditional imports
  const importIf = (condition, line) => {
    if (condition) lines.push(line);
  };

  // Add imports
  importIf(styles, `import styles from "./styles.module.css";`);
  importIf(
    pageStrategy === "SSRWrapper",
    `import SsrWrapper from "@/Components/Shared/SsrWrapper/SsrWrapper";`
  );
  importIf(
    pageStrategy !== "SSRWrapper" && options.ssrFetcher,
    `import SSRFetcher from "@/Components/Shared/SSRFetcher/SSRFetcher";`
  );
  importIf(metadata, `import { metadataHandler } from "@/utils/metadata";`);
  importIf(withApi, `import { getPage } from "@/lib/pages";`);

  const pageContent = importFile(selectedPageType, lines);

  await writeFile(pagePath, pageContent, {
    autoFormate: true,
    overwrite: true,
  });
  return true;
});

export const createPage = async (options, onError = () => {}) => {
  const result = {};
  try {
    const {
      name = "",
      pageStrategy = null,
      componentname = null,
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

    if (
      checkisExists(
        path.join(pagePath, "page.jsx"),
        path.join(pagePath, "page.js")
      )
    )
      return onError({
        message: `❌ ${name} folder already exists!`,
      });
    // create the page directory
    createFolder(pagePath);

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
        pathToFile: [],
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
    systemLogger("🚀 ~ createPage ~ error:", error);
    result.error = error;
    result.success = false;
  }
  return result;
};
