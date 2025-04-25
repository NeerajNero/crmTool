import PerformanceChart from "../components/PerformanceChart"
const ReportPage = () => {
  return (
    <div style={{ maxWidth: '900px', margin: 'auto' }}>
      <h2>Performance Overview</h2>
      <PerformanceChart />
    </div>
  )
}

export default ReportPage