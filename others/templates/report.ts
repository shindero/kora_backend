import moment from "moment";

export const template = ({ data }) => {
  const today = new Date();
return `
  <!doctype html>
  <html>
     <head>
        <meta charset="utf-8">
        <title>PDF Result Template</title>
        <style>
        #customers {
          font-family: Arial, Helvetica, sans-serif;
          border-collapse: collapse;
          width: 100%;
        }
        
        #customers td, #customers th {
          border: 1px solid #ddd;
          padding: 8px;
        }
        
        #customers tr:nth-child(even){background-color: #f2f2f2;}
        
        #customers tr:hover {background-color: #ddd;}
        
        #customers th {
          padding-top: 12px;
          padding-bottom: 12px;
          text-align: left;
          background-color: #04AA6D;
          color: white;
        }
        .flex {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        </style>
     </head>
     <body>
     <h1>Requested time interval: ${data.dateFrom} - ${data.dateUntil}</h1>
     <div class="flex">
     ${data.projects.map(item => `
     <h1>Project: ${item.projectInfo.name}</h1>
      <h2>Total: ${(item.projectInfo.totalProjectTime)} h</h2>
      <table id="customers">
      <tr>
        <th>Task</th>
        <th>Time spent (HH:MM)</th>
      </tr>
      ${item.projectInfo.tasks.map(task => `
      <tr>
        <td>${task.taskInfo.name}</td>
        <td>${task.taskInfo.totalTaskTime}</td>
      </tr>
      `)}
      </table>
  `)}
     </body>
  </html>
  `;
};
