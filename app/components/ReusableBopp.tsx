import {
  RefreshCw,
  Droplets,
  ShoppingBag,
  Megaphone,
} from "lucide-react";

const benefits = [
  {
    icon: RefreshCw,
    title: "Designed for Repeated Use",
    text: "Made to stay useful beyond a single purchase.",
  },
  {
    icon: Droplets,
    title: "Better Moisture Resistance",
    text: "Practical protection for everyday carrying.",
  },
  {
    icon: ShoppingBag,
    title: "Built for Everyday Carrying",
    text: "Strong construction designed for repeated use.",
  },
  {
    icon: Megaphone,
    title: "Your Branding Keeps Moving",
    text: "Every reuse gives your brand another opportunity to be seen.",
  },
];

export default function ReusableBopp() {
  return (
    <section className="reusable-bopp">
      <div className="reusable-bopp-container">
        <div className="reusable-bopp-heading">
          <p className="reusable-bopp-eyebrow">DESIGNED FOR REUSE</p>

          <h2>
            Built to Be <span>Carried Again.</span>
          </h2>

          <p className="reusable-bopp-intro">
            Maruti BOPP bags are designed for repeated everyday use,
            stronger carrying and lasting brand visibility.
          </p>
        </div>

        <div className="reusable-bopp-benefits">
          {benefits.map((benefit) => {
            const Icon = benefit.icon;

            return (
              <article
                className="reusable-bopp-benefit"
                key={benefit.title}
              >
                <div className="reusable-bopp-icon">
                  <Icon size={21} strokeWidth={1.8} />
                </div>

                <div>
                  <h3>{benefit.title}</h3>
                  <p>{benefit.text}</p>
                </div>
              </article>
            );
          })}
        </div>

        <div className="reusable-bopp-message">
          <p>SMARTER EVERYDAY PACKAGING</p>

          <h3>
            More use. <span>More visibility.</span> More value.
          </h3>

          <p className="reusable-bopp-message-text">
            A small difference in packaging cost can create more everyday
            utility and more opportunities for your brand to stay visible.
          </p>
        </div>
      </div>
    </section>
  );
}