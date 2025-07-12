export default function CardStats() {
  const cards = [
    { title: 'Budget', value: '$2,340', color: 'bg-purple-500' },
    { title: 'Total Spent', value: '$2,340', color: 'bg-purple-500' },
    { title: 'Remaining', value: '$1,160', color: 'bg-green-600' },
    { title: 'Savings Rate', value: '23%', color: 'bg-orange-500' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {cards.map((card, index) => (
        <div key={index} className={`p-6 rounded-lg text-white ${card.color}`}>
          <p>{card.title}</p>
          <h2 className="text-2xl font-bold">{card.value}</h2>
        </div>
      ))}
    </div>
  );
}
