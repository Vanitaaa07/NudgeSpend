import { FaPlus, FaExchangeAlt, FaBullseye, FaMoneyBillWave, FaPiggyBank, FaChartBar } from 'react-icons/fa';

const actions = [
  { label: 'Add Income', icon: <FaPlus />, color: 'bg-green-500' },
  { label: 'Transfer', icon: <FaExchangeAlt />, color: 'bg-blue-500' },
  { label: 'Set Goal', icon: <FaBullseye />, color: 'bg-purple-500' },
  { label: 'Pay Bill', icon: <FaMoneyBillWave />, color: 'bg-orange-500' },
  { label: 'Save Money', icon: <FaPiggyBank />, color: 'bg-pink-500' },
  { label: 'View Report', icon: <FaChartBar />, color: 'bg-indigo-500' },
];

export default function QuickActions() {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-lg font-bold mb-4">Quick Actions</h3>
      <div className="grid grid-cols-2 gap-4">
        {actions.map((action, index) => (
          <div key={index} className="flex items-center gap-3">
            <div className={`p-2 text-white rounded ${action.color}`}>
              {action.icon}
            </div>
            <div>
              <p className="font-semibold text-sm">{action.label}</p>
              <p className="text-xs text-gray-500">
                {action.label === 'Add Income' && 'Record new income'}
                {action.label === 'Transfer' && 'Move money between accounts'}
                {action.label === 'Set Goal' && 'Create savings goal'}
                {action.label === 'Pay Bill' && 'Record bill payment'}
                {action.label === 'Save Money' && 'Add to savings'}
                {action.label === 'View Report' && 'Generate spending report'}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
