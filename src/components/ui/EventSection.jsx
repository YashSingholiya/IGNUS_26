import React from "react";

function EventSection({
  sectionClass,
  bg,
  mask,
  maskClass,
  title,
  events,
  align = "left",
  comingSoon = false,
}) {
  return (
    <section className={sectionClass}>
      <div className={`${sectionClass}-bg`}>
        <img className={`${sectionClass}-image`} src={bg} alt={title} />
      </div>

      {mask && (
        <div className={maskClass}>
          <img src={mask} alt={`${title} mask`} />
        </div>
      )}

      <div className={`${sectionClass}-wrapper`}>
        <div className={`${sectionClass}-heading`}>{title}</div>

        <div className={`${sectionClass}-subheading-wrapper`}>
          <span className="line" />
          <div className={`${sectionClass}-subheading`}>IGNUS’26</div>
          <span className="line" />
        </div>
      </div>

      {comingSoon ? (
        <div className={`${sectionClass}-events`}>COMING SOON...</div>
      ) : (
        <div className={`${sectionClass}-events`}>
          {events.map((e, i) => (
            <div key={i} className="event-item">
              {e}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default EventSection;
