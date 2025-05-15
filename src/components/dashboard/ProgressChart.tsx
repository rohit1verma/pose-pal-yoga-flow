
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  TooltipProps
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";

interface ProgressData {
  date: string;
  score: number;
  accuracy?: number;
  duration?: number;
}

interface ProgressChartProps {
  data: ProgressData[];
  title: string;
  description?: string;
}

const ProgressChart = ({ data, title, description }: ProgressChartProps) => {
  const CustomTooltip = ({ active, payload, label }: TooltipProps<number, string>) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-gray-800 p-3 border border-gray-200 dark:border-gray-700 rounded-md shadow-md">
          <p className="font-medium">{label}</p>
          <p className="text-yoga-blue">Score: {payload[0].value}</p>
          {payload[1] && <p className="text-yoga-green">Accuracy: {payload[1].value}%</p>}
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5
              }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey="score"
                stroke="#4A90E2"
                activeDot={{ r: 8 }}
                strokeWidth={2}
              />
              {data[0]?.accuracy !== undefined && (
                <Line
                  type="monotone"
                  dataKey="accuracy"
                  stroke="#6FCF97"
                  strokeWidth={2}
                />
              )}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProgressChart;
