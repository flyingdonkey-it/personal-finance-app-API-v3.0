import {
  ComposedChart,
  Line,
  Bar,
  XAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { formatCurrency } from '../utils/formatCurrency';

//Rewriting tooltip function to show custom text
function CustomTooltip({ active, payload }) {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <p className="font-semibold label bg-[#24CCA7]">{`${formatCurrency(payload[0].value)}`}</p>
      </div>
    );
  }

  return null;
};

export function CustomBarChart({ data, width, aspect }) {
  return (
    <ResponsiveContainer width={width} height="100%" aspect={aspect}>
      <ComposedChart
        width={700}
        height={400}
        data={data}
        margin={{
          top: 0,
          right: 20,
          bottom: 0,
          left: 30,
        }}
      >
        <XAxis dataKey="key" scale="band" />
        <Tooltip content={<CustomTooltip />} />
        <Bar dataKey="value" barSize={20} fill="#436BD7" />
        <Line type="monotone" dataKey="normalizedValue" stroke="#4A56E2" strokeWidth={5} dot={false} />
      </ComposedChart>
    </ResponsiveContainer>
  );
}