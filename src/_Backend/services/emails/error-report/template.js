export const errorReportTempalte = ({
  message = "",
  stack = "",
  date = new Date().toLocaleDateString(),
}) => {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Error Message Viewer</title>
  <style>
    body {
      background-color: #1e1e1e;
      color: #d4d4d4;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      padding: 20px;
    }
    .code-window {
      background-color: #1e1e1e;
      border: 1px solid #333;
      border-radius: 8px;
      overflow: hidden;
     width: 900px;
    max-width: 95%;

      box-shadow: 0 0 10px rgba(0,0,0,0.5);
    }
    .code-header {
    background-color: #333;
    padding: 10px;
    color: #ccc;
    font-size: 14px;
    align-items: center;
    gap: 10px;
    display: flex;

    }
 .span-header {
    margin: auto 5px;
    }
    .code-content {
      background-color: #1e1e1e;
      padding: 10px 20px;
      font-family: monospace;
      font-size: 14px;
      white-space: pre-wrap;
      overflow-x: auto;
      color:white;

    }
    .copy-btn {
      background-color: #444;
      border: none;
      color: #ccc;
      padding: 4px 8px;
      border-radius: 4px;
      cursor: pointer;
    }
    .copy-btn:hover {
      background-color: #555;
    }
      .date {
          font-weight: 400;
         letter-spacing: 0.5px;
         margin: 0;
         
         color:black;
         margin: 5px 0 ;
}
         .title {
         color:black;
         font-size:20px;
         margin:0;
         }
  </style>
</head>
<body
 style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;"
>
<h1 class="title" >${message}</h1>
<p class="date" >At ${date}</p>
  <div class="code-window">
    <div class="code-header">
      <div class="span-header">Error Details</div>
     
    </div>
    <div id="codeContent" class="code-content">
 ${stack}
    </div>
  </div>
</body>
</html>
`;
};
