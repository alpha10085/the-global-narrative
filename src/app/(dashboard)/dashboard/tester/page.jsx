/**
 * File: page.jsx
 * Purpose:
 * - Main component for the Dashboard Tester.
 * - Allows selecting schema type (pages, collections, components).
 * - Allows selecting a specific schema under that type.
 * - Runs CRUD tests only for the chosen schema.
 */

"use client";
import React, { useState } from "react";
import schemas from "@/_Dashboard/configuration/schemas";
import styles from "./page.module.css";
import { runCrudTest } from "./servies";
import useDynamicState from "@/hooks/useDynamicState";
import { useTheme } from "@/_Dashboard/context/ThemeCTX";

const SCHEMA_TYPES = ["pages", "collections", "components"];

const DashboardTester = () => {
  const { theme } = useTheme();
  const [state, updateState, resetState] = useDynamicState({
    logs: [],
    running: false,
    selectedType: "collections",
    selectedSchema: null,
  });

  // Filter schemas by type
  const filteredSchemas = schemas.filter((s) => s.type === state.selectedType);

  /**
   * Run test for the selected schema only
   */
  const handleRunTest = async () => {
    if (!state.selectedSchema) return;

    updateState({ running: true, logs: [] });

    const result = await runCrudTest(state.selectedSchema);
    updateState({ logs: [result], running: false });
  };

  return (
    <div className={`${styles.container} ${theme.color}`}>
      {/* Schema type buttons */}
      <div className={styles.filterButtons}>
        {SCHEMA_TYPES.map((type) => (
          <button
            key={type}
            onClick={() =>
              updateState({ selectedType: type, selectedSchema: null })
            }
            disabled={state.running}
            className={`${styles.btn}
            ${theme.color} ${theme.bord10} ${theme.button}  ${theme.btn30}
            ${state.selectedType === type ? "active" : ""}`}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </button>
        ))}
      </div>

      {/* Schema selection list */}
      <div className={styles.selector}>
        <h3 className={`${styles.selectorTitle} ${theme.color}`}>
          Available Schemas
        </h3>
        <div className={styles.schemaList}>
          {filteredSchemas.map((schema) => (
            <div
              key={schema.key}
              className={`${styles.schemaItem} 
              ${theme.button}  ${theme.bord10} ${theme.color} ${theme.btn30}
              ${state.selectedSchema?.key === schema.key ? "active" : ""}`}
              onClick={() =>
                !state.running && updateState({ selectedSchema: schema })
              }
            >
              {schema.key}
            </div>
          ))}
        </div>
      </div>

      {/* Run Test button */}
      <button
        onClick={handleRunTest}
        disabled={state.running || !state.selectedSchema}
        className={`${styles.btn}  ${theme.button}  ${theme.bord10} ${theme.color} ${theme.btn30} `}
      >
        {state.running ? "Running Test..." : `Run Test`}
      </button>

      {/* Logs */}
      <div
        className={`${styles.logsContainer} ${
          !state.running && state.logs.length > 0 ? styles.show : ""
        }`}
      >
        {state.logs.map((log, i) => (
          <div
            key={i}
            className={`${styles.logItem} ${theme.background} ${theme.bord10}`}
          >
            <div className={styles.logHeader}>
              <h1 className={`${theme.color} ${styles.schemaName}`}>
                {log.schema}
              </h1>
              <div className={styles.statusGroup}>
                <span className={`${theme.color} ${styles.status}`}>
                  Create: {log.create === null ? "—" : log.create ? "✅" : "❌"}
                </span>
                <span className={`${theme.color} ${styles.status}`}>
                  Update: {log.update === null ? "—" : log.update ? "✅" : "❌"}
                </span>
                <span className={`${theme.color} ${styles.status}`}>
                  Delete: {log.delete === null ? "—" : log.delete ? "✅" : "❌"}
                </span>
              </div>
            </div>

            {/* Validation results */}
            {log.validation && (
              <details className={styles.detail} open>
                <summary className="mb-10">
                  Validation Dashboard Results
                </summary>

                {Object.entries(log.validation).map(([stage, val]) => (
                  <div key={stage} className={styles.validationStage}>
                    <strong>
                      {stage.charAt(0).toUpperCase() + stage.slice(1)}:
                    </strong>{" "}
                    {val?.success === true
                      ? "✅ All fields valid"
                      : val?.success === false
                      ? "❌ Some fields failed"
                      : "⚠ Validation not run"}
                    {!val?.success && val?.errors?.length > 0 && (
                      <ul className={styles.validationList}>
                        {val.errors.map((err, i) => (
                          <li key={i}>❌ {err}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </details>
            )}
            {/* Extra debug info */}
            {log.createData && (
              <details className={styles.detail}>
                <summary>Create Data</summary>
                <pre
                  className={`${
                    theme.name == "light" ? styles.lightPre : styles.darkPre
                  }  `}
                >
                  {JSON.stringify(log.createData, null, 2)}
                </pre>
              </details>
            )}
            {log.updatedData && (
              <details className={styles.detail}>
                <summary>Updated Data</summary>
                <pre
                  className={`${
                    theme.name == "light" ? styles.lightPre : styles.darkPre
                  } `}
                >
                  {JSON.stringify(log.updatedData, null, 2)}
                </pre>
              </details>
            )}
            {log.errors && (
              <details className={styles.detail} open>
                <summary>Error Case Results</summary>
                <ul>
                  {log.errors.map((err, i) => (
                    <li key={i}>{err}</li>
                  ))}
                </ul>
              </details>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardTester;

/*
  const [testMode, setTestMode] = useState("clean");

      // <div className={styles.testMode}>
      //   <button
      //     className={`${styles.modeBtn}
             ${theme.background} ${theme.color} ${theme.bord10} ${theme.hoverBg10} 
              ${
      //       testMode === "clean" ? styles.active : ""
      //     }`}
      //     onClick={() => setTestMode("clean")}
      //   >
      //     Clean Test
      //   </button>
      //   <button
      //     className={`${styles.modeBtn}
             ${theme.background} ${theme.color} ${theme.bord10} ${theme.hoverBg10} 
              ${
      //       testMode === "errors" ? styles.active : ""
      //     }`}
      //     onClick={() => setTestMode("errors")}
      //   >
      //     Error Test
      //   </button>
      // </div>


 */
