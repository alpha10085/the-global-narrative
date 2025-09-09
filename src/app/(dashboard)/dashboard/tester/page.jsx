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

const SCHEMA_TYPES = ["pages", "collections", "components"];

const DashboardTester = () => {
  const [logs, setLogs] = useState([]);
  const [running, setRunning] = useState(false);
  const [selectedType, setSelectedType] = useState("collections");
  const [selectedSchema, setSelectedSchema] = useState(null);

  // Filter schemas by type
  const filteredSchemas = schemas.filter((s) => s.type === selectedType);

  /**
   * Run test for the selected schema only
   */
  const handleRunTest = async () => {
    if (!selectedSchema) return;
    setRunning(true);
    setLogs([]);

    const result = await runCrudTest(selectedSchema);
    setLogs([result]);

    setRunning(false);
  };

  return (
    <div className={styles.container}>
      {/* Schema type buttons */}
      <div className={styles.filterButtons}>
        {SCHEMA_TYPES.map((type) => (
          <button
            key={type}
            className={`${styles.btn} ${
              selectedType === type ? styles.active : ""
            }`}
            onClick={() => {
              setSelectedType(type);
              setSelectedSchema(null); // reset schema when type changes
            }}
            disabled={running}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </button>
        ))}
      </div>

      {/* Schema selection list */}
      <div className={styles.selector}>
        <h3 className={styles.selectorTitle}>Available Schemas</h3>
        <div className={styles.schemaList}>
          {filteredSchemas.map((schema) => (
            <div
              key={schema.key}
              className={`${styles.schemaItem} ${
                selectedSchema?.key === schema.key ? styles.selected : ""
              }`}
              onClick={() => !running && setSelectedSchema(schema)}
            >
              {schema.key}
            </div>
          ))}
        </div>
      </div>

      {/* Run Test button */}
      <button
        onClick={handleRunTest}
        disabled={running || !selectedSchema}
        className={styles.btn}
      >
        {running ? "Running Test..." : `Run Test`}
      </button>

      {/* Logs */}
      <div className={styles.logsContainer}>
        {logs.map((log, i) => (
          <div key={i} className={styles.logItem}>
            <h1>{log.schema}</h1>
            <ul className={styles.list}>
              <li>
                Create: {log.create === null ? "—" : log.create ? "✅" : "❌"}
              </li>
              <li>
                Update: {log.update === null ? "—" : log.update ? "✅" : "❌"}
              </li>
              <li>
                Delete: {log.delete === null ? "—" : log.delete ? "✅" : "❌"}
              </li>
            </ul>

            {/* Validation results */}
            {log.validation && (
              <details className={styles.detail} open>
                <summary className="mb-10">Validation Results</summary>

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
                <pre>{JSON.stringify(log.createData, null, 2)}</pre>
              </details>
            )}
            {log.updatedData && (
              <details className={styles.detail}>
                <summary>Updated Data</summary>
                <pre>{JSON.stringify(log.updatedData, null, 2)}</pre>
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
      //     className={`${styles.modeBtn} ${
      //       testMode === "clean" ? styles.active : ""
      //     }`}
      //     onClick={() => setTestMode("clean")}
      //   >
      //     Clean Test
      //   </button>
      //   <button
      //     className={`${styles.modeBtn} ${
      //       testMode === "errors" ? styles.active : ""
      //     }`}
      //     onClick={() => setTestMode("errors")}
      //   >
      //     Error Test
      //   </button>
      // </div>


 */
