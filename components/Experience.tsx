
"use client";

import { experience } from "@/lib/data";

export default function Experience() {
  return (
    <div className="experience">
      {experience.map((item, index) => (
        <article className="experience-item" key={item.company}>
          <div className="experience-marker">
            <span className="mono">0{index + 1}</span>
          </div>

          <div className="experience-content">
            <div className="experience-top">
              <div>
                <h3>{item.role}</h3>
                <p className="experience-company">{item.company}</p>
              </div>

              <div className="experience-meta mono">
                <span>{item.period}</span>
                <span>{item.type}</span>
              </div>
            </div>

            <ul>
              {item.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </div>
        </article>
      ))}
    </div>
  );
}
