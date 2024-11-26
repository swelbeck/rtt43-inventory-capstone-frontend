import "./Dashboard.css";

export default function Dashboard() {
  return (
    <div className="dashboard-metrics">
      <div className="metric">
        <h3>Total Inventory Items</h3>
        <p>42</p>
      </div>
      <div className="metric">
        <h3>Shopping List</h3>
        <p>12 items</p>
      </div>
      <div className="metric">
        <h3>Bought Items</h3>
        <p>8 items</p>
      </div>
    </div>
  );
}
