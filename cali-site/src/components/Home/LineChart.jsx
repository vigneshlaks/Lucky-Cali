import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { lineChartData } from "../../config/lineChartData";

const LineChartExample = () => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart
        width={730}
        height={250}
        data={lineChartData}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="pv" stroke="#FFFFFF" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default LineChartExample;
