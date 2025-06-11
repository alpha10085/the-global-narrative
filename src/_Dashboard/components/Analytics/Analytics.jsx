"use client";

import { systemLogger } from "@/utils/consoleProxy";
import React, { useEffect } from "react";

const Analytics = () => {
  useEffect(() => {
    fetch("/api/Analytics", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ pathname: window?.location?.pathname }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to send analytics");
        return res.json();
      })
      .then((data) => {
        systemLogger("✅ Analytics sent:", data);
      })
      .catch((err) => {
        console.error("❌ Analytics error:", err.message);
      });
  }, []);

  return <div>Analytics</div>;
};

export default Analytics;
