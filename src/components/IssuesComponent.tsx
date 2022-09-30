import React, { useContext, useEffect, useState } from "react";
import { Issue } from "../util/types";
import {
  AreaChart,
  XAxis,
  CartesianGrid,
  YAxis,
  Area,
  Tooltip,
} from "recharts";
import { GitLabContext } from "./GitlabProvider";

function IssuesComponent() {
  const [issues, setIssues] = useState<Issue[]>([]);
  const [amount, setAmount] = useState<number>(0);

  const context = useContext(GitLabContext);

  useEffect(() => {
    const tempIssues = context.issues;
    if (tempIssues !== null) setIssues(tempIssues);
    console.log(tempIssues);
  }, [context.issues]);
  function createData(
    title: string,
    assignee: string,
    created: Date,
    closed: Date | null,
    description: string
  ) {
    return {
      title,
      assignee,
      created,
      closed,
      description,
    };
  }

  const myData: ReturnType<typeof createData>[] = issues.map((issue) => {
    return createData(
      issue.title,
      issue.author.username,
      issue.created_at,
      issue.closed_at,
      issue.description
    );
  });

  function countActive(now: Date) {
    let active = 0;
    myData.filter((issue) => {
      const thisDate = new Date(issue.created);
      if (thisDate < now) {
        issue.closed === null ? (active += 1) : (active += 0);
      }
    });
    return active;
  }

  function countClosed() {
    let closed = 0;
    myData.filter((issue) => {
      issue.closed !== null ? (closed += 1) : (closed += 0);
    });
    return closed;
  }

  const graphData = [
    {
      date: "12.09",
      issues: countActive(new Date(2022, 8, 12)),
    },
    {
      date: "13.09",
      issues: countActive(new Date(2022, 8, 13)),
    },
    {
      date: "14.09",
      issues: countActive(new Date(2022, 8, 14)),
    },
    {
      date: "15.09",
      issues: countActive(new Date(2022, 8, 15)),
    },
    {
      date: "16.09",
      issues: countActive(new Date(2022, 8, 16)),
    },
    {
      date: "17.09",
      issues: countActive(new Date(2022, 8, 17)),
    },
    {
      date: "18.09",
      issues: countActive(new Date(2022, 8, 18)),
    },
    {
      date: "19.09",
      issues: countActive(new Date(2022, 8, 19)),
    },
    {
      date: "20.09",
      issues: countActive(new Date(2022, 8, 20)),
    },
    {
      date: "21.09",
      issues: countActive(new Date(2022, 8, 21)),
    },
    {
      date: "22.09",
      issues: countActive(new Date(2022, 8, 22)),
    },
    {
      date: "23.09",
      issues: countActive(new Date(2022, 8, 23)),
    },
    {
      date: "24.09",
      issues: countActive(new Date(2022, 8, 24)),
    },
    {
      date: "25.09",
      issues: countActive(new Date(2022, 8, 25)),
    },
    {
      date: "26.09",
      issues: countActive(new Date(2022, 8, 26)),
    },
    {
      date: "27.09",
      issues: countActive(new Date(2022, 8, 27)),
    },
    {
      date: "28.09",
      issues: countActive(new Date(2022, 8, 28)),
    },
    {
      date: "29.09",
      issues: countActive(new Date(2022, 8, 29)),
    },
    {
      date: "30.09",
      issues: countActive(new Date(2022, 8, 30)),
    },
    {
      date: "01.10",
      issues: countActive(new Date(2022, 9, 1)),
    },
    {
      date: "02.10",
      issues: countActive(new Date(2022, 9, 2)),
    },
    {
      date: "03.10",
      issues: countActive(new Date(2022, 9, 3)),
    },
    {
      date: "04.10",
      issues: countActive(new Date(2022, 9, 4)),
    },
  ];

  return (
    <div style={{ display: "grid", gridTemplateColumns: "500px 150px" }}>
      <div>
        <h3 style={{ textAlign: "center" }}>Active issues over time</h3>
        <AreaChart width={500} height={250} data={graphData}>
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#154734" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#154734" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="date" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="issues"
            stroke="#8884d8"
            fillOpacity={1}
            fill="url(#colorUv)"
          />
        </AreaChart>
      </div>
      <div
        style={{ textAlign: "center", paddingTop: "50px", paddingLeft: "10px" }}
      >
        <p>Total issues:</p>
        <h3>{myData.length}</h3>
        <p>Total closed issues:</p>
        <h3>{countClosed()}</h3>
      </div>
    </div>
  );
}

export default IssuesComponent;
