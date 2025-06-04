export const errorReportTemplate = (data = {}) => {
  const {
    message = "",
    stack = "",
    date = new Date().toLocaleDateString(),
    ip = "Unknown IP",
    location = {},
    os = "Unknown OS",
    browser = "Unknown Browser",
  } = data;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Error Report</title>
  <style>
    body {
      background-color: #0f1117;
      color: #f3f4f6;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      padding: 40px 20px;
      line-height: 1.6;
    }

    .info-section {
      background-color: #1a1c23;
      border-left: 4px solid #3b82f6;
      padding: 16px 20px;
      border-radius: 8px;
            width: 900px;
      max-width: 95%;
      box-shadow: 0 2px 6px rgba(0,0,0,0.2);
    }

    .info-section h2 {
      margin: 0 0 10px;
      font-size: 20px;
      color: #ffffff;
      border-bottom: 1px solid #2c2f36;
          border-top: 1px solid #2c2f36;
      padding: 10px 0 ;
    }
.info-section .fr-title {
    border-top: 0px solid #2c2f36;
}
    .info-section p {
      margin: 4px 0;
      color: #d1d5db;
      font-size: 14px;
            padding: 8px 0 ;
    }


    .code-window {
      background-color: #1e1e1e;
      border: 1px solid #333;
      border-radius: 8px;
      overflow: hidden;
      width: 900px;
      max-width: 95%;
      box-shadow: 0 0 10px rgba(0,0,0,0.5);

            background-color: #1a1c23;
      border-left: 4px solid #3b82f6;

      box-shadow: 0 2px 6px rgba(0,0,0,0.2);
    }

    .code-header {
            background-color: #1a1c23;
      padding: 10px;
      color: #ccc;
      font-size: 14px;
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .span-header {
      margin: auto 5px;
    }

    .code-content {
      background-color: #1e1e1e;
      padding: 10px 20px;
      font-family: monospace;
      font-size: 14px;
      overflow-x: auto;
      color: white;
      line-height: 1.8;
    }
  </style>
</head>
<body>
  <div class="info-section">
    <h2 class="fr-title">Report information</h2>
    <p><strong>Date:</strong> ${date}</p>
    ${
      data?.route?.client
        ? `<p><strong>Page Route:</strong> ${data?.route?.client}</p>`
        : ""
    }
     ${
       data?.route?.server
         ? `<p><strong>server Route:</strong> ${data?.route?.server}</p>`
         : ""
     }
    <p><strong>IP:</strong> ${ip}</p>
    <h2>Location</h2>
    <p><strong>Country:</strong> ${location?.country || "N/A"}</p>
    <p><strong>Timezone:</strong> ${location?.timezone || "N/A"}</p>
    <h2>System information</h2>
    <p><strong>Operating System:</strong> ${os}</p>
    <p><strong>Browser:</strong> ${browser}</p>
     <h2>Error Details</h2>
    <div id="codeContent" class="code-content">
       ${stack?.trim()}
    </div>
  </div>
</body>
</html>
`;
};
