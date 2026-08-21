export default function TrustBar() {
  const features = [
    {
      icon: "🏭",
      title: "Direct Manufacturer",
      text: "Quality-controlled production",
    },
    {
      icon: "🚚",
      title: "PAN India Delivery",
      text: "Reliable dispatch across India",
    },
    {
      icon: "🎨",
      title: "Custom Printing",
      text: "Logo printing and customized production from 1,000 pieces.",
    },
    {
      icon: "📦",
      title: "Bulk Order MOQ",
      text: "MOQ: 1,000 Pieces",
    },
  ];

  return (
    <section className="trust-section">
      <div className="trust-container">
        {features.map((item, index) => (
          <div className="trust-card" key={index}>
            <div className="trust-icon">{item.icon}</div>

            <h3>{item.title}</h3>

            <p>{item.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
