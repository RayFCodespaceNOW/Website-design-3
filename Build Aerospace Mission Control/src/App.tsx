import { useEffect, useMemo, useState } from "react";

type Page = "overview" | "mission" | "spacecraft" | "crew" | "research" | "community" | "reference";

const pages: { id: Page; label: string }[] = [
  { id: "overview", label: "Overview" },
  { id: "mission", label: "Mission" },
  { id: "spacecraft", label: "Spacecraft" },
  { id: "crew", label: "Crew" },
  { id: "research", label: "Research" },
  { id: "community", label: "Education" },
  { id: "reference", label: "Sources" },
];

const meta: Record<Page, { title: string; description: string }> = {
  overview: {
    title: "AURORA | A Human Mars Exploration Concept",
    description:
      "An independent educational concept exploring the science, systems, and open questions behind human exploration of Mars.",
  },
  mission: {
    title: "Mission | AURORA",
    description:
      "Explore the mission phases and use an illustrative transit-time calculator for a hypothetical crewed Mars mission.",
  },
  spacecraft: {
    title: "Spacecraft | AURORA",
    description:
      "Explore the major systems a crewed Mars mission would need and the engineering questions they raise.",
  },
  crew: {
    title: "Crew | AURORA",
    description:
      "Learn about the complementary professional roles that could contribute to a future human Mars mission.",
  },
  research: {
    title: "Research | AURORA",
    description: "Open questions in Mars science, exploration, and planetary protection.",
  },
  community: {
    title: "Education | AURORA",
    description:
      "Classroom activities and ideas for introducing students to Mars exploration.",
  },
  reference: {
    title: "Sources | AURORA",
    description:
      "Fact sources, image credits and project notes for the AURORA educational concept.",
  },
};

const images = {
  mars: "https://images-assets.nasa.gov/image/PIA00407/PIA00407~large.jpg",
  surface:
    "https://images-assets.nasa.gov/image/PIA17948/PIA17948~orig.jpg",
  planet:
    "https://images-assets.nasa.gov/image/PIA14832/PIA14832~large.jpg",
  terrain:
    "https://images-assets.nasa.gov/image/PIA16161/PIA16161~orig.jpg",
};

function Arrow({ back = false }: { back?: boolean }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d={back ? "M19 12H5m5 5-5-5 5-5" : "M5 12h14m-5-5 5 5-5 5"} />
    </svg>
  );
}

function Logo() {
  return (
    <span className="logo" aria-hidden="true">
      <i />
      <b />
      <em />
    </span>
  );
}

function Kicker({ children, index }: { children: React.ReactNode; index: string }) {
  return (
    <div className="kicker">
      <span>{index}</span>
      <i />
      {children}
    </div>
  );
}

function SectionTitle({
  kicker,
  index,
  title,
  intro,
}: {
  kicker: string;
  index: string;
  title: string;
  intro?: string;
}) {
  return (
    <header className="section-title">
      <Kicker index={index}>{kicker}</Kicker>
      <h2>{title}</h2>
      {intro && <p>{intro}</p>}
    </header>
  );
}

function PageLinks({
  go,
  previous,
  next,
}: {
  go: (page: Page) => void;
  previous: { id: Page; label: string };
  next: { id: Page; label: string };
}) {
  return (
    <div className="page-links wrap">
      <button onClick={() => go(previous.id)}>
        <Arrow back /> <span>Previous</span>
        <b>{previous.label}</b>
      </button>
      <button onClick={() => go(next.id)}>
        <span>Continue</span>
        <b>{next.label}</b> <Arrow />
      </button>
    </div>
  );
}

function OrbitDiagram() {
  return (
    <div className="orbit-diagram" role="img" aria-labelledby="orbit-title orbit-description">
      <span id="orbit-title" className="sr-only">
      Simplified diagram of planetary orbits and a hypothetical Earth-to-Mars transfer
      </span>
      <span id="orbit-description" className="sr-only">
        The diagram is illustrative and not to scale. A dashed line shows one possible transfer
        between Earth's and Mars's orbits; it is not a trajectory or mission plan.
      </span>
      <div className="orbit o-mercury" />
      <div className="orbit o-venus" />
      <div className="orbit o-earth" />
      <div className="orbit o-mars" />
      <span className="sun" />
      <span className="planet mercury" />
      <span className="planet venus" />
      <span className="planet earth" />
      <span className="planet mars" />
      <span className="planet mars launch" />
      <svg className="flight-path" viewBox="0 0 700 360" preserveAspectRatio="none">
        <path d="M145 238 C265 40 480 52 594 175" />
      </svg>
      <span className="path-label">Illustrative orbital transfer · not to scale</span>
    </div>
  );
}

function Overview({ go }: { go: (page: Page) => void }) {
  const facts = [
    ["01", "Solar day", "24.6 hours", "A Martian day is called a sol."],
    ["02", "Surface gravity", "3.71 m/s²", "About 38% of Earth's surface gravity."],
    ["03", "Atmosphere", "About 95% CO₂", "Mars has a very thin, carbon-dioxide-rich atmosphere."],
    ["04", "Diameter", "About 6,780 km", "Mars is about half Earth's diameter."],
    ["05", "One Mars year", "687 days", "A little under two Earth years."],
  ];
  const paths: { id: Page; no: string; title: string; text: string }[] = [
    {
      id: "mission",
      no: "01",
      title: "Mission",
      text: "Explore mission phases, constraints and an illustrative transit-time calculator.",
    },
    {
      id: "spacecraft",
      no: "02",
      title: "Spacecraft",
      text: "Explore the systems and engineering challenges behind a crewed mission.",
    },
    {
      id: "crew",
      no: "03",
      title: "Crew",
      text: "Learn about the different roles a human exploration mission would require.",
    },
    {
      id: "research",
      no: "04",
      title: "Research",
      text: "Explore open questions about Mars science and future exploration.",
    },
    {
      id: "community",
      no: "05",
      title: "Education",
      text: "Find approachable classroom prompts for exploring Mars.",
    },
  ];

  return (
    <>
      <section className="hero wrap">
        <div className="hero-copy">
          <Kicker index="001">An independent educational concept</Kicker>
          <h1>
            A human
            <br />
            <span>mission to Mars.</span>
          </h1>
          <p className="hero-lead">
            What would it take to send people to Mars—and bring them safely home?
          </p>
          <p className="hero-body">
            Explore the science, systems and difficult trade-offs behind human exploration of the
            Red Planet. AURORA is a concept project, not a real mission or flight plan.
          </p>
          <div className="hero-actions">
            <button className="primary-btn" onClick={() => go("mission")}>
              Explore the mission <Arrow />
            </button>
            <button className="quiet-btn" onClick={() => go("spacecraft")}>
              Explore the spacecraft <Arrow />
            </button>
          </div>
          <div className="mission-stamp">
            <span>AURORA</span>
            <b>Educational concept</b>
            <i>Human Mars exploration</i>
          </div>
        </div>
        <div className="hero-visual">
          <img
            src={images.mars}
            alt="Global color view of Mars assembled from NASA Viking mission images"
          />
          <div className="hero-grid" />
          <div className="target-ring" />
          <span className="visual-data top">
            Destination: Mars
            <br />
            NASA archive image
          </span>
          <span className="visual-data bottom">
            Mars
            <br />
            Global view
          </span>
          <div className="hero-caption">
            <span>01</span>
            <p>Destination profile</p>
            <b>The red planet</b>
          </div>
        </div>
      </section>

      <section className="orbit-section">
        <div className="wrap split-heading">
          <SectionTitle
            kicker="Flight architecture"
            index="01"
            title="A journey shaped by orbital mechanics."
            intro="Earth and Mars are moving targets. A transfer depends on their positions, the spacecraft and mission goals. This simplified diagram is for context only—not a flight trajectory."
          />
          <OrbitDiagram />
        </div>
      </section>

      <section className="expertise wrap">
        <SectionTitle
          kicker="Mission disciplines"
          index="02"
          title="Exploration takes a team."
          intro="Science, engineering, medicine and mission operations all contribute to planning and supporting human exploration."
        />
        <div className="discipline-row">
          {["Science", "Engineering", "Medicine", "Leadership"].map((item, i) => (
            <article key={item}>
              <span>0{i + 1}</span>
              <div className={`discipline-symbol d${i + 1}`} />
              <h3>{item}</h3>
            </article>
          ))}
        </div>
      </section>

      <section className="facts-section">
        <div className="wrap">
          <SectionTitle
            kicker="Field notes"
            index="03"
            title="Five things to know about the destination"
            intro="A few useful reference facts about Mars. Values are rounded; sources are listed on the Sources page."
          />
          <div className="facts-grid">
            {facts.map(([no, label, value, note]) => (
              <article key={no}>
                <span>{no}</span>
                <h3>{label}</h3>
                <strong>{value}</strong>
                <p>{note}</p>
              </article>
            ))}
          </div>
          <p className="source-note">
            Mars imagery is from NASA missions. See Sources for image credits and links.
          </p>
        </div>
      </section>

      <section className="choose-path wrap">
        <SectionTitle kicker="Choose a path" index="04" title="Where would you like to start?" />
        <div className="path-grid">
          {paths.map((path) => (
            <button key={path.id} onClick={() => go(path.id)}>
              <span>{path.no}</span>
              <div>
                <h3>{path.title}</h3>
                <p>{path.text}</p>
              </div>
              <Arrow />
            </button>
          ))}
        </div>
      </section>
    </>
  );
}

const timeline = [
  {
    stage: "Phase 1 · Planning",
    title: "Design around the mission",
    text: "Science goals, crew health, launch systems, landing capability and return plans all shape the mission. Many of these challenges remain open.",
  },
  {
    stage: "Phase 2 · Departure",
    title: "Travel beyond Earth",
    text: "A spacecraft would leave Earth and spend months in transit. Duration depends on the trajectory, propulsion and launch opportunity.",
  },
  {
    stage: "Phase 3 · Arrival",
    title: "Enter, descend and land",
    text: "Mars's thin atmosphere makes slowing down difficult, especially for heavy payloads. Landing people safely remains a major engineering challenge.",
  },
  {
    stage: "Phase 4 · Surface operations",
    title: "Work with limited support",
    text: "A crew could conduct science and maintain equipment, but would need to operate with communication delays and limited help from Earth.",
  },
  {
    stage: "Phase 5 · Return",
    title: "Leave Mars and travel home",
    text: "A complete mission needs a reliable way to depart Mars and return the crew to Earth. The surface vehicle, supplies and return plan must work together.",
  },
  {
    stage: "Phase 6 · Recovery",
    title: "Support the crew after landing",
    text: "Medical recovery, mission review and analysis of returned samples and data would help scientists and engineers learn from the mission.",
  },
];

function Mission({ go }: { go: (page: Page) => void }) {
  const [fast, setFast] = useState(true);
  const [stay, setStay] = useState(30);
  const transit = fast ? 180 : 260;
  const total = transit * 2 + stay;
  return (
    <>
      <InteriorHero
        index="01"
        kicker="Mission overview"
        title="The challenges of a human Mars mission"
        text="A high-level look at the phases and constraints of a hypothetical crewed mission. This concept is not a proposed or approved flight plan."
        image={images.surface}
      />
      <section className="content-section wrap two-col">
        <SectionTitle kicker="Goals and limits" index="01" title="What we try to do" />
        <div className="number-list">
          {[
            "Understand the systems needed to transport a crew to Mars and return them safely.",
            "Study Martian geology and past environments that may have supported microbial life.",
            "Examine the medical, operational and technical challenges of working far from Earth.",
          ].map((text, i) => (
            <p key={text}>
              <span>0{i + 1}</span>
              {text}
            </p>
          ))}
          <aside>
            <b>What this project does not cover</b>
            <p>
              AURORA is an educational concept, not an engineering design. It has no approved
              hardware, budget, schedule or launch date. The examples on this site are not mission
              recommendations.
            </p>
          </aside>
        </div>
      </section>
      <section className="timeline-section">
        <div className="wrap">
          <SectionTitle kicker="Mission timeline" index="02" title="From launch pad to home" />
          <div className="timeline">
            {timeline.map((item, i) => (
              <article key={item.stage}>
                <span className="timeline-no">0{i + 1}</span>
                <div>
                  <small>{item.stage}</small>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              </article>
            ))}
          </div>
          <p className="source-note">
            Illustrative imagery; see Sources for the image credits.
          </p>
        </div>
      </section>
      <section className="planner wrap">
        <SectionTitle
          kicker="Try it"
          index="03"
          title="Trip-length planner"
          intro="Adjust the assumed one-way transit and surface stay to see how the arithmetic changes. Real mission durations depend on orbital geometry, propulsion and mission design."
        />
        <div className="planner-grid">
          <div className="planner-controls">
            <label>Illustrative one-way transit</label>
            <button className={fast ? "selected" : ""} onClick={() => setFast(true)}>
              <span>Short transit</span>
              <b>about 180 days</b>
              <p>A simplified example, not a selected trajectory.</p>
            </button>
            <button className={!fast ? "selected" : ""} onClick={() => setFast(false)}>
              <span>Long transit</span>
              <b>about 260 days</b>
              <p>A simplified example to compare with the shorter transit.</p>
            </button>
            <div className="fuel-key">
              <b>About these examples</b>
              <p>
                These rounded values are for exploring the calculator only. They are not mission
                estimates.
              </p>
            </div>
            <label htmlFor="stay">Time on Mars: {stay} days</label>
            <input
              id="stay"
              type="range"
              min="30"
              max="500"
              step="10"
              value={stay}
              onChange={(event) => setStay(Number(event.target.value))}
            />
          </div>
          <div className="planner-result">
            <span>Estimated mission duration</span>
            <div className="duration">
              <strong>{total}</strong>
              <b>days total</b>
            </div>
            <div className="duration-grid">
              <p>
                <strong>{transit}</strong>
                days outbound
              </p>
              <p>
                <strong>{stay}</strong>
                days on Mars
              </p>
              <p>
                <strong>{transit}</strong>
                days return
              </p>
              <p>
                <strong>{(total / 30.44).toFixed(1)}</strong>
                months total
              </p>
            </div>
            <p>This total is only the sum of the values selected above.</p>
            <small>
              This simple calculator assumes the return transit equals the outbound transit. It
              omits launch windows, orbital mechanics, surface logistics and other mission phases;
              it is not a flight plan.
            </small>
          </div>
        </div>
      </section>
      <PageLinks
        go={go}
        previous={{ id: "overview", label: "Overview" }}
        next={{ id: "spacecraft", label: "Spacecraft" }}
      />
    </>
  );
}

function InteriorHero({
  index,
  kicker,
  title,
  text,
  image,
}: {
  index: string;
  kicker: string;
  title: string;
  text: string;
  image: string;
}) {
  return (
    <section className="interior-hero">
      <div className="wrap">
        <div>
          <Kicker index={index}>{kicker}</Kicker>
          <h1>{title}</h1>
          <p>{text}</p>
        </div>
        <img src={image} alt="" />
        <span className="hero-index">{index} / 07</span>
      </div>
    </section>
  );
}

const systems = [
  {
    name: "Landing System",
    short: "Landing module",
    lead: "Decelerates and protects the crew and cargo during descent.",
    body: "Mars's thin atmosphere provides limited braking for large payloads. Entry, descent and landing are among the most demanding parts of a human mission concept.",
  },
  {
    name: "Crew habitat",
    short: "Crew habitat",
    lead: "Supports crew living, work, exercise and health monitoring.",
    body: "A habitat must provide a safe environment for months away from Earth, including life support, sleep, work areas and exercise equipment.",
  },
  {
    name: "Radiation shelter",
    short: "Radiation shield",
    lead: "Provides a more protected area during elevated radiation events.",
    body: "Space radiation is a serious design concern. Shielding approaches involve trade-offs in mass and materials; no protection system is specified in this concept.",
  },
  {
    name: "Supply module",
    short: "Supply module",
    lead: "Carries food, spares, tools and other mission supplies.",
    body: "Supply planning depends on crew size, mission duration and system reliability. Recycling can reduce some needs, but not every resource can be recovered completely.",
  },
  {
    name: "Propulsion system",
    short: "Propulsion system",
    lead: "Changes the spacecraft's speed and direction during flight.",
    body: "Mission propulsion depends on trajectory, spacecraft mass and technology. The launch vehicle and in-space propulsion are distinct systems; this concept selects neither.",
  },
  {
    name: "Solar arrays",
    short: "Solar arrays",
    lead: "Can generate electrical power from sunlight.",
    body: "Mars receives less sunlight than Earth because it orbits farther from the Sun. Dust and other environmental conditions can affect surface power systems.",
  },
];

function SpacecraftDiagram({
  active,
  select,
}: {
  active: number;
  select: (value: number) => void;
}) {
  return (
    <div
      className="ship-diagram"
      role="group"
      aria-label="Interactive conceptual spacecraft diagram; not to scale."
    >
      <div className="solar-array top-array" />
      <div className="solar-array bottom-array" />
      <div className="ship-body">
        <span className="nose" />
        <span className="module m-hab" />
        <span className="module m-shelter" />
        <span className="module m-supply" />
        <span className="engine" />
      </div>
      {systems.map((system, i) => (
        <button
          key={system.name}
          className={`ship-pin pin-${i + 1} ${active === i ? "active" : ""}`}
          onClick={() => select(i)}
          aria-label={`View ${system.name}`}
        >
          {i + 1}
        </button>
      ))}
    </div>
  );
}

function Spacecraft({ go }: { go: (page: Page) => void }) {
  const [active, setActive] = useState(0);
  return (
    <>
      <InteriorHero
        index="02"
        kicker="Technology"
        title="Connected systems, distinct roles"
        text="A human Mars mission would depend on reliable transportation, life support, communications, surface systems and a return capability. This concept explores those roles without specifying a real vehicle."
        image={images.planet}
      />
      <div className="disclaimer wrap">
        <span>Concept note</span>
        <p>This conceptual diagram is not an actual spacecraft design.</p>
      </div>
      <section className="systems-section wrap">
        <SectionTitle
          kicker="Spacecraft Components"
          index="01"
          title="Six systems. One mission."
          intro="A rough sketch, not to scale or an engineering design."
        />
        <div className="systems-interface">
          <SpacecraftDiagram active={active} select={setActive} />
          <div className="system-panel">
            <span>0{active + 1} / 06</span>
            <small>{systems[active].short}</small>
            <h3>{systems[active].name}</h3>
            <strong>{systems[active].lead}</strong>
            <p>{systems[active].body}</p>
          </div>
        </div>
        <div className="system-tabs">
          {systems.map((system, i) => (
            <button
              key={system.name}
              className={active === i ? "active" : ""}
              onClick={() => setActive(i)}
            >
              <span>0{i + 1}</span>
              {system.short}
            </button>
          ))}
        </div>
        <p className="source-note">
          The diagram is an original illustration, not a spacecraft design. The NASA spacecraft
          image depicts a robotic mission concept, not AURORA.
        </p>
      </section>
      <PageLinks
        go={go}
        previous={{ id: "mission", label: "Mission" }}
        next={{ id: "crew", label: "Crew" }}
      />
    </>
  );
}

const crew = [
  {
    initials: "01",
    name: "Mission commander",
    role: "Leadership",
    origin: "Fictional role",
    bio: "Coordinates decisions, crew operations and communication across the mission. A commander would need experience leading teams in complex, high-risk environments.",
  },
  {
    initials: "02",
    name: "Flight surgeon",
    role: "Crew health",
    origin: "Fictional role",
    bio: "Supports crew health before, during and after the mission. Medical planning must account for limited equipment, delayed communication and the effects of long-duration spaceflight.",
  },
  {
    initials: "03",
    name: "Geologist",
    role: "Planetary science",
    origin: "Fictional role",
    bio: "Studies rocks, landforms and the history of water on Mars. Field observations and carefully selected samples could help scientists investigate the planet's past environments.",
  },
  {
    initials: "04",
    name: "Flight systems engineer",
    role: "Engineering",
    origin: "Fictional role",
    bio: "Monitors and maintains spacecraft and surface systems. Engineering plans must anticipate equipment failures and enable the crew to diagnose and repair problems far from Earth.",
  },
];

function Crew({ go }: { go: (page: Page) => void }) {
  return (
    <>
      <InteriorHero
        index="03"
        kicker="Mission roles"
        title="A team built around complementary skills"
        text="These are illustrative roles, not a real crew or a proposed crew size. A human mission would require expertise across health, science, engineering and operations."
        image={images.terrain}
      />
      <section className="crew-section wrap">
        <SectionTitle
          kicker="Illustrative roles"
          index="01"
          title="Different expertise, shared responsibility."
          intro="The profiles below describe capabilities a mission might need; they do not represent real or selected astronauts."
        />
        <div className="crew-grid">
          {crew.map((person, i) => (
            <article key={person.name}>
              <div className={`crew-avatar avatar-${i + 1}`}>
                <span>{person.initials}</span>
                <i />
              </div>
              <div className="crew-id">
                <span>Role 0{i + 1}</span>
                <b>{person.role}</b>
              </div>
              <h3>{person.name}</h3>
              <small>{person.origin}</small>
              <p>{person.bio}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="expertise-banner">
        <div className="wrap">
          <Kicker index="02">Team architecture</Kicker>
          <h2>Mission design is a team effort.</h2>
          <p>
            In addition to these examples, a real program would draw on expertise in robotics,
            communications, operations, psychology and many other fields.
          </p>
          <small>
            These are example roles only—not an announced crew or staffing plan.
          </small>
        </div>
      </section>
      <div className="wrap">
        <p className="source-note">NASA rover imagery; see Sources for image credits.</p>
      </div>
      <PageLinks
        go={go}
        previous={{ id: "spacecraft", label: "Spacecraft" }}
        next={{ id: "research", label: "Research" }}
      />
    </>
  );
}

const researchQuestions = [
  [
    "What can Martian rocks tell us about past environments?",
    "Which minerals and geological features can help reconstruct when liquid water was present and what conditions may have existed?",
  ],
  [
    "Could Mars ever have supported microbial life?",
    "No life has been confirmed on Mars. How could future missions search responsibly for evidence of past or present microbial life?",
  ],
  [
    "How can exploration protect Mars and Earth?",
    "What practices can help avoid contaminating places of scientific interest and protect Earth when samples are returned?",
  ],
];

function Research({ go }: { go: (page: Page) => void }) {
  return (
    <>
      <InteriorHero
        index="04"
        kicker="Research questions"
        title="What we still want to know"
        text="Mars still has unsolved mysteries. Here are a few questions worth investigating."
        image={images.surface}
      />
      <section className="research-section wrap">
        <SectionTitle         kicker="Mars science" index="01" title="Open questions" />
        <div className="question-list">
          {researchQuestions.map(([title, text], i) => (
            <article key={title}>
              <span>0{i + 1}</span>
              <div>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            </article>
          ))}
        </div>
        <p className="source-note">NASA rover imagery; see Sources for image credits.</p>
      </section>
      <section className="research-principles">
        <div className="wrap principles-grid">
          <article>
            <span>01</span>
            <h3>Make evidence traceable</h3>
            <p>
              Clear methods, accessible data and careful citations help readers assess scientific
              findings and understand their limits.
            </p>
            <small>
              AURORA is an independent educational concept. It is not an agency, active mission
              or launch schedule.
            </small>
          </article>
          <article>
            <span>02</span>
            <h3>Exploration has real trade-offs</h3>
            <p>
              Human spaceflight involves significant technical, financial and health risks.
              Scientific goals, planetary protection and public priorities all matter.
            </p>
            <small>
              This site describes open questions; it does not claim that a crewed mission is
              currently planned.
            </small>
          </article>
        </div>
      </section>
      <div className="wrap source-cta">
        <button onClick={() => go("reference")}>
          Sources and credits <Arrow />
        </button>
      </div>
      <PageLinks
        go={go}
        previous={{ id: "crew", label: "Crew" }}
        next={{ id: "community", label: "Education" }}
      />
    </>
  );
}

const gallery = [
  {
    type: "Sample post · Spacecraft sketch",
    title: "A ship with room for a garden",
    caption:
      "A sample caption: “I added a plant room so the crew can grow some of their food on the trip.”",
    className: "sketch-ship",
    alt: "A playful hand-drawn spacecraft with round windows, fins and stars.",
  },
  {
    type: "Sample post · School activity",
    title: "Space ideas on the lunch table",
    caption:
      "A sample community display could collect drawings and questions from a classroom event without showing student faces.",
    className: "sketch-school",
    alt: "A school building, trees and a table with colorful spacecraft drawings, with no people shown.",
  },
  {
    type: "Sample post · Rover idea",
    title: "Big wheels for a bumpy world",
    caption:
      "A sample caption: “My rover has wide wheels so it can get over rocks and carry tools.”",
    className: "sketch-rover",
    alt: "A simple rover with large wheels, a camera mast and a red rocky landscape.",
  },
];

function Community({ go }: { go: (page: Page) => void }) {
  return (
    <>
      <InteriorHero
        index="05"
        kicker="Classroom and community"
        title="Mars ideas start close to home"
        text="Use these sample prompts to help students explore planetary science, engineering and the questions behind space exploration."
        image={images.terrain}
      />
      <section className="gallery-section wrap">
        <SectionTitle
          kicker="A sample classroom gallery"
          index="01"
          title="Ideas from the next generation"
          intro="These are made-up example posts to show how a future school or community showcase could look. The artwork is illustrative, not submitted by real students."
        />
        <div className="gallery-grid">
          {gallery.map((item, i) => (
            <article key={item.title}>
              <div className={`sketch ${item.className}`} role="img" aria-label={item.alt}>
                <span>0{i + 1}</span>
                <i />
              </div>
              <small>{item.type}</small>
              <h3>{item.title}</h3>
              <p>{item.caption}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="classroom-section">
        <div className="wrap">
          <SectionTitle
            kicker="Things a class could try"
            index="02"
            title="How a school project could work"
          />
          <div className="classroom-steps">
            <article>
              <span>01</span>
              <h3>Start small</h3>
              <p>
                Ask a teacher whether one class would like to try a short drawing or design
                activity. Share a simple prompt, give students time to create, and invite them to
                write a sentence about their idea.
              </p>
            </article>
            <article>
              <span>02</span>
              <h3>Make a classroom gallery</h3>
              <p>
                Display the work at school first. If the school and families approve sharing it,
                choose a few pieces for a community post and explain what the students designed.
              </p>
            </article>
          </div>
          <aside className="safety-note">
            <b>Keep students safe</b>
            <p>
              Get school and parent or guardian permission before sharing student work. Leave out
              children's full names, faces, schedules and identifying details. These sample posts
              are fictional; no school event or partnership is being claimed.
            </p>
          </aside>
          <p className="source-note">
            The illustrations above are original CSS artwork. The Mars photograph is a NASA rover
            image, separate from the sample classroom gallery.
          </p>
        </div>
      </section>
      <PageLinks
        go={go}
        previous={{ id: "research", label: "Research" }}
        next={{ id: "reference", label: "Sources" }}
      />
    </>
  );
}

function Reference({ go }: { go: (page: Page) => void }) {
  return (
    <>
      <InteriorHero
        index="06"
        kicker="Sources and credits"
        title="Sources & notes"
        text="Explore the sources behind the science summaries, image credits and notes on this educational concept."
        image={images.mars}
      />
      <section className="reference-section wrap">
        <div className="reference-block">
          <Kicker index="01">Sources for facts</Kicker>
          <h2>Start with primary sources.</h2>
          <p>Fact summaries are paraphrased. Follow these links to the source material.</p>
          <article>
            <a href="https://science.nasa.gov/mars/facts/" target="_blank" rel="noreferrer">
              NASA — Mars Facts
            </a>
            <p>
              Reference for Mars's average distance from the Sun, size, rotation period, orbital
              period and potential for past life.
            </p>
          </article>
          <article>
            <a href="https://science.nasa.gov/mars/" target="_blank" rel="noreferrer">
              NASA — Mars exploration
            </a>
            <p>
              Background on robotic exploration and the science questions that guide Mars missions.
            </p>
          </article>
          <article>
            <b>Model assumptions</b>
            <p>
              The trip-length calculator uses example values selected for comparison. Its totals
              are arithmetic only; they are not based on a mission design or trajectory analysis.
            </p>
          </article>
        </div>
        <div className="reference-block">
          <Kicker index="02">Image and media credits</Kicker>
          <h2>Images and media credits</h2>
          <div className="credit-table">
            <div className="table-head">
              <span>Item</span>
              <span>Where used</span>
              <span>Source and rights</span>
            </div>
            {[
              [
                "Global Color Views of Mars, PIA 00407",
                "Overview",
                "NASA/JPL/USGS. NASA image record.",
                "https://images.nasa.gov/details/PIA00407",
              ],
              [
                "Solar system diagram",
                "Overview",
                "Original CSS/SVG illustration; not to scale and not a trajectory.",
              ],
              [
                "Spacecraft diagram",
                "Spacecraft",
                "Original CSS illustration; a concept diagram, not a real spacecraft design.",
              ],
              [
                "Classroom gallery",
                "Education",
                "Original CSS illustrations; sample activities, not student submissions.",
              ],
              [
                "Martian Landscape With Rock Rows and Mount Sharp Stereo, PIA 17948",
                "Mission, Crew, Research",
                "NASA/JPL-Caltech. NASA image record.",
                "https://images.nasa.gov/details/PIA17948",
              ],
              [
                "Curiosity Approaching Mars, Artist Concept, PIA 14832",
                "Spacecraft",
                "NASA/JPL-Caltech. NASA image record. Robotic mission concept.",
                "https://images.nasa.gov/details/PIA14832",
              ],
              [
                "Hello, MAHLI, PIA 16161",
                "Education",
                "NASA/JPL-Caltech/MSSS. NASA image record.",
                "https://images.nasa.gov/details/PIA16161",
              ],
              [
                "Fonts",
                "All pages",
                "Google Fonts (Barlow Condensed, IBM Plex Mono and Inter).",
              ],
              ["Audio and video", "None", "None used."],
            ].map((row) => (
              <div key={row[0]}>
                <span>{row[0]}</span>
                <span>{row[1]}</span>
                <span>
                  {row[2]}
                  {row[3] && (
                    <>
                      {" "}
                      <a href={row[3]} target="_blank" rel="noreferrer">
                        View image record
                      </a>
                    </>
                  )}
                </span>
              </div>
            ))}
          </div>
          <p>
            NASA photographs load from NASA's image archive and require an internet connection.
          </p>
        </div>
        <div className="reference-block">
          <Kicker index="03">How the site is built</Kicker>
          <h2>Project notes</h2>
          <p>
            AURORA is an independent educational concept. The site is built with React, TypeScript,
            Vite and CSS. It does not claim affiliation with NASA, ESA or any space agency.
          </p>
          <p>
            This site does not provide mission, medical or engineering advice. No real crew,
            spacecraft, launch date or mission plan is represented.
          </p>
        </div>
      </section>
      <PageLinks
        go={go}
        previous={{ id: "community", label: "Education" }}
        next={{ id: "overview", label: "Back to Overview" }}
      />
    </>
  );
}

function App() {
  const [page, setPage] = useState<Page>(() => {
    const hash = window.location.hash.slice(1) as Page;
    return pages.some((item) => item.id === hash) ? hash : "overview";
  });
  const [menuOpen, setMenuOpen] = useState(false);

  const go = (next: Page) => {
    setPage(next);
    setMenuOpen(false);
    window.history.pushState(null, "", `#${next}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    document.title = meta[page].title;
    let description = document.querySelector('meta[name="description"]');
    if (!description) {
      description = document.createElement("meta");
      description.setAttribute("name", "description");
      document.head.appendChild(description);
    }
    description.setAttribute("content", meta[page].description);
  }, [page]);

  useEffect(() => {
    const onBack = () => {
      const hash = window.location.hash.slice(1) as Page;
      if (pages.some((item) => item.id === hash)) setPage(hash);
    };
    window.addEventListener("popstate", onBack);
    return () => window.removeEventListener("popstate", onBack);
  }, []);

  const content = useMemo(() => {
    switch (page) {
      case "mission":
        return <Mission go={go} />;
      case "spacecraft":
        return <Spacecraft go={go} />;
      case "crew":
        return <Crew go={go} />;
      case "research":
        return <Research go={go} />;
      case "community":
        return <Community go={go} />;
      case "reference":
        return <Reference go={go} />;
      default:
        return <Overview go={go} />;
    }
  }, [page]);

  return (
    <main>
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>
      <header className="site-header">
        <div className="header-inner">
          <button className="brand" onClick={() => go("overview")} aria-label="AURORA overview">
            <Logo />
            <span>AURORA</span>
          </button>
          <div className="mission-status">
            <i />
            Independent <span>educational concept</span>
          </div>
          <nav className={menuOpen ? "open" : ""} aria-label="Primary navigation">
            {pages.map((item) => (
              <button
                key={item.id}
                className={page === item.id ? "active" : ""}
                onClick={() => go(item.id)}
              >
                {item.label}
              </button>
            ))}
          </nav>
          <button
            className="menu-button"
            onClick={() => setMenuOpen((value) => !value)}
            aria-expanded={menuOpen}
          >
            Menu <span>{menuOpen ? "×" : "+"}</span>
          </button>
        </div>
      </header>
      <div id="main-content" key={page} className="page-enter">
        {content}
      </div>
      <footer>
        <div className="wrap footer-grid">
          <div className="footer-brand">
            <Logo />
            <span>AURORA</span>
          </div>
          <p>
            AURORA is an independent educational concept about human exploration of Mars. It is not
            a real mission, spacecraft program or agency.
          </p>
          <div>
            <span>Educational concept</span>
            <b>Not a real mission</b>
          </div>
          <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>Back to top ↑</button>
        </div>
      </footer>
    </main>
  );
}

export default App;
