import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getAgents } from '../slices/userSlice';
import { getAllLeads } from '../slices/leadSlice';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend);

const PerformanceChart = () => {
  const dispatch = useDispatch();
  const leads = useSelector((state) => state?.leads?.leads || []);
  const allAgents = useSelector((state) => state?.user?.allAgents || []);

  useEffect(() => {
    if (!allAgents.length) {
      dispatch(getAgents());
    }
  }, [dispatch, allAgents]);

  useEffect(() => {
    if (!leads.length) {
      dispatch(getAllLeads());
    }
  }, [dispatch, leads.length]);

  if (!allAgents.length || !leads.length) {
    return <p>Loading performance data...</p>;
  }

  const closedCasesByAgent = allAgents.map(agent => {
    const closedCount = leads.filter(
      lead =>
        lead.status?.toLowerCase() === 'closed' &&
        lead.salesAgent?._id === agent._id
    ).length;

    return {
      name: agent.name,
      count: closedCount,
    };
  });

  const sortedAgents = closedCasesByAgent.sort((a, b) => b.count - a.count);

  const labels = sortedAgents.map(agent => agent.name);
  const closedCounts = sortedAgents.map(agent => agent.count);

  const data = {
    labels,
    datasets: [
      {
        label: 'Total Closed Cases',
        data: closedCounts,
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.3,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        precision: 0,
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default PerformanceChart;
