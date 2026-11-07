import { experience } from "@/lib/data";

export default function Experience() {
  return (
    <div className="experience-list">
      {experience.map((item) => (
        <article className="experience-entry" key={`${item.company}-${item.role}`}>
          <div className="experience-heading">
            <div>
              <p className="experience-period mono">{item.period}</p>
              <h3>{item.role}</h3>
              <p className="experience-company">{item.company}</p>
            </div>
            <span className="experience-marker" aria-hidden="true" />
          </div>
          <ul>
            {item.points.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        </article>
      ))}
    </div>
  );
}