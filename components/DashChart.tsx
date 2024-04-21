"use client";

import { Status } from "@prisma/client";
import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis } from "recharts";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

interface Props {
  data: {
    name: Status;
    total: number;
  }[];
}

const DashChart = ({ data }: Props) => {
  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle>Ticket Counts</CardTitle>
      </CardHeader>
      <CardContent className="pl-2">
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={data}>
            <XAxis
              dataKey="name"
              stroke="#8884d8"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="#8884d8"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <Bar dataKey="total" fill="#8884d8" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default DashChart;
