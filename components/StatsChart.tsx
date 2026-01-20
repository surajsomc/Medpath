'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts'

const chartData = [
  { month: 'Jan', students: 120 },
  { month: 'Feb', students: 180 },
  { month: 'Mar', students: 240 },
  { month: 'Apr', students: 280 },
  { month: 'May', students: 320 },
  { month: 'Jun', students: 350 },
]

const chartConfig = {
  students: {
    label: 'Active Students',
    color: 'hsl(var(--primary))',
  },
}

export default function StatsChart() {
  return (
    <Card className="border-0 shadow-lg">
      <CardHeader>
        <CardTitle>Student Growth</CardTitle>
        <CardDescription>Active pre-med students over time</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
            data={chartData}
            margin={{
              left: 0,
              right: 0,
              top: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200" />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" />}
            />
            <Area
              dataKey="students"
              type="natural"
              fill="var(--color-students)"
              fillOpacity={0.4}
              stroke="var(--color-students)"
              strokeWidth={2}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
