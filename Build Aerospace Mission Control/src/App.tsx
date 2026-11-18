import { useEffect, useMemo, useState } from "react";

type Page = "overview" | "mission" | "spacecraft" | "crew" | "research" | "community" | "reference";

const projectName = "Technology Student Association Website Design 2026-27";

const pages: { id: Page; label: string }[] = [
  { id: "overview", label: "Overview" },
  { id: "mission", label: "Mission" },
  { id: "spacecraft", label: "Spacecraft" },
  { id: "crew", label: "Crew" },
  { id: "research", label: "Research" },
  { id: "community", label: "Community" },
  { id: "reference", label: "Reference" },
];

const meta: Record<Page, { title: string; description: string }> = {
  overview: {
    title: projectName,
    description:
      "AURORA is a fictional concept for a mission to Mars. Explore the imaginary mission, spacecraft, crew and the questions we want to answer.",
  },
  mission: {
    title: `Mission | ${projectName}`,
    description:
      "The goals, timeline and trip-length planner for AURORA-1, a fictional crewed mission to Mars.",
  },
  spacecraft: {
    title: `Spacecraft | ${projectName}`,
    description:
      "Explore the six main systems of the AURORA spacecraft concept through interactive tools.",
  },
  crew: {
    title: `Crew | ${projectName}`,
    description:
      "Meet the four fictional AURORA-1 crew members and the roles a successful Mars mission would need.",
  },
  research: {
    title: `Research | ${projectName}`,
    description: "Explore six open questions about Mars that the AURORA crew could investigate.",
  },
  community: {
    title: `Community | ${projectName}`,
    description:
      "Sample classroom projects that bring Mars exploration to school communities and encourage younger generations to take part.",
  },
  reference: {
    title: `Reference | ${projectName}`,
    description:
      "Fact sources, image credits and project information for Technology Student Association Website Design 2026-27.",
  },
};

const images = {
  mars: "https://images-assets.nasa.gov/image/PIA17948/PIA17948~orig.jpg",
  surface:
    "https://images-assets.nasa.gov/image/PIA17948/PIA17948~orig.jpg",
  planet:
    "https://images-assets.nasa.gov/image/PIA14832/PIA14832~large.jpg",
  terrain:
    "https://images-assets.nasa.gov/image/PIA17948/PIA17948~orig.jpg",
  community:
    "https://images-assets.nasa.gov/image/PIA20602/PIA20602~medium.jpg",
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
        <b>{next.label}</b>
      </button>
    </div>
  );
}

function OrbitDiagram() {
  return (
    <div className="orbit-diagram" role="img" aria-labelledby="orbit-title orbit-description">
      <span id="orbit-title" className="sr-only">
      Top-down map of the inner solar system with a simplified Earth-to-Mars path
      </span>
      <span id="orbit-description" className="sr-only">
        The Sun is at the center. Around it are the orbits of Mercury, Venus, Earth and Mars. A
        dashed curve leaves Earth's orbit on the left, swings around the Sun, and meets Mars's
        orbit on the right, where Mars will be when the spacecraft arrives. A second, solid Mars
        shows where the planet is at launch.
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
      <span className="path-label">AURORA transfer · energy-efficient path</span>
    </div>
  );
}

function Overview({ go }: { go: (page: Page) => void }) {
  const facts = [
    ["01", "One Mars day", "24 h 37 min", "Called a “sol.” Close to an Earth day."],
    ["02", "Surface gravity", "3.7 m/s²", "About 38% of what you feel on Earth."],
    ["03", "Atmosphere", "95% CO₂", "Mostly carbon dioxide, so humans cannot breathe it."],
    ["04", "Width", "6,794 km", "About half the width of Earth."],
    ["05", "One Mars year", "687 days", "A little under two Earth years."],
  ];
  const paths: { id: Page; no: string; title: string; text: string }[] = [
    {
      id: "mission",
      no: "01",
      title: "Mission",
      text: "Goals, a timeline from launch to return, and a planner where you set the length of the trip.",
    },
    {
      id: "spacecraft",
      no: "02",
      title: "Spacecraft",
      text: "An interactive diagram of the six systems that keep four people alive.",
    },
    {
      id: "crew",
      no: "03",
      title: "Crew",
      text: "Meet the four fictional crew members and the jobs they would do.",
    },
    {
      id: "research",
      no: "04",
      title: "Research",
      text: "Questions about Mars and what we still need to learn.",
    },
    {
      id: "community",
      no: "05",
      title: "Community",
      text: "Sample school projects and ideas for sharing Mars exploration with a classroom, and the new generation.",
    },
  ];

  return (
    <>
      <section className="hero wrap">
        <div className="hero-copy">
          <Kicker index="001">A fictional Mars mission</Kicker>
          <h1>
            Four people. One planet.
            <br />
            <span>Hundreds of days from home.</span>
          </h1>
          <p className="hero-lead">
            Almost 1 year, a crewed mission of 4, hoping to land on Mars.
          </p>
          <p className="hero-body">
            It takes a lot of work to send a crew to and from Mars. Follow AURORA as we break
            boundaries.
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
            <b>Mission concept</b>
          </div>
        </div>
        <div className="hero-visual">
          <img src={images.mars} alt="Curiosity's view of rows of rocks and Mount Sharp on Mars" />
          <div className="hero-grid" />
          <div className="target-ring" />
          <span className="visual-data top">
            Target // Mars
            <br />
            Range 225M km
          </span>
          <span className="visual-data bottom">
            Orbital insertion
            <br />
            Vector nominal
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
            title="A path across the inner solar system."
            intro="Here's a top-down view of our solar system. The dashed line is a simplified, energy-efficient path for the AURORA mission. Planets are not to scale."
          />
          <OrbitDiagram />
        </div>
      </section>

      <section className="expertise wrap">
        <SectionTitle
          kicker="Mission disciplines"
          index="02"
          title="Mars Space Exploration Requires Many Jobs"
          intro="Science, Engineering, Medicine, and Leadership all contribute to a successful space exploration and research mission"
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
            intro="Figures from the European Space Agency's Mars fact page. See the Reference page."
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
            NASA/JPL-Caltech, PIA 17948 — Martian landscape with rocks (stereo). NASA image record.
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
    stage: "Stage 1 · Before launch",
    title: "Prepare and wait for the window",
    text: "Earth and Mars line up well for a trip only about once every 26 months, so missions must launch in a short window.",
  },
  {
    stage: "Stage 2 · Outbound",
    title: "The long way out",
    text: "AURORA-1 can pick a faster or slower route. A NASA planning study described a fast trajectory of about 180 days. How crews stay healthy and motivated for months in microgravity is still being studied.",
  },
  {
    stage: "Stage 3 · Arrival",
    title: "Enter orbit and descend",
    text: "A lander separates and carries the crew down. Mars’s thin atmosphere gives only some braking, which makes heavy landings hard.",
  },
  {
    stage: "Stage 4 · Surface",
    title: "Work on Mars",
    text: "Crew collect samples, test equipment and check for water ice. Messages to and from Earth take many minutes, so the crew must decide many things themselves.",
  },
  {
    stage: "Stage 5 · Return",
    title: "Wait, launch, and fly home",
    text: "The trip home also depends on where Earth and Mars are in their orbits, so crews may need to stay for a long time.",
  },
  {
    stage: "Stage 6 · After landing",
    title: "Recovery and review",
    text: "Doctors check the crew, and engineers study what worked, so the next mission can be safer.",
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
        kicker="Mission case"
        title="AURORA-1: the plan"
        text="A fictional crewed landing on Mars, made to show how a real mission would fit together."
        image={images.planet}
        imageAlt="Artist's concept of NASA's Curiosity spacecraft approaching Mars"
      />
      <section className="content-section wrap two-col">
        <SectionTitle kicker="Goals and limits" index="01" title="What we try to do" />
        <div className="number-list">
          {[
            "Land four people on Mars, let them work there, and bring them home safely.",
            "Study Mars’s rocks and ice to learn whether the planet was ever habitable.",
            "Test how people, machines and teamwork cope with long distance.",
          ].map((text, i) => (
            <p key={text}>
              <span>0{i + 1}</span>
              {text}
            </p>
          ))}
          <aside>
            <b>What this project does not cover</b>
            <p>
              This is not an engineering design. There is no budget, launch date or tested hardware.
              The route and schedule are examples, not plans for a real mission.
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
            NASA/JPL-Caltech, PIA 14832 — Artist’s concept of Curiosity approaching Mars. This
            depicts a robotic mission, not AURORA. NASA image record.
          </p>
        </div>
      </section>
      <section className="planner wrap">
        <SectionTitle
          kicker="Try it"
          index="03"
          title="Trip-length planner"
          intro="Choose a route and a stay on Mars. The planner adds up how long the crew would be away from Earth."
        />
        <div className="planner-grid">
          <div className="planner-controls">
            <label>Route (each way)</label>
            <button className={fast ? "selected" : ""} onClick={() => setFast(true)}>
              <span>Faster route</span>
              <b>about 180 days</b>
              <p>Matches the fast trajectory in a NASA planning study. Needs more fuel.</p>
            </button>
            <button className={!fast ? "selected" : ""} onClick={() => setFast(false)}>
              <span>Slower route</span>
              <b>about 260 days</b>
              <p>A round number we chose to show the trade-off. Uses less fuel.</p>
            </button>
            <div className="fuel-key">
              <b>Fuel consumption</b>
              <p>
                Relative fuel use for each route; exact amounts depend on spacecraft design and
                mission details.
              </p>
              <span>
                Faster route <i className="fuel high" />
              </span>
              <span>
                Slower route <i className="fuel low" />
              </span>
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
            <p>A middle-length stay balances research time against time away from Earth.</p>
            <small>
              Limits: this model assumes the return takes as long as the outbound trip and ignores
              planet alignment, so it is a teaching tool, not a flight plan.
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
  imageAlt,
}: {
  index: string;
  kicker: string;
  title: string;
  text: string;
  image: string;
  imageAlt: string;
}) {
  return (
    <section className="interior-hero">
      <div className="wrap">
        <div>
          <Kicker index={index}>{kicker}</Kicker>
          <h1>{title}</h1>
          <p>{text}</p>
        </div>
        <img src={image} alt={imageAlt} />
        <span className="hero-index">{index} / 07</span>
      </div>
    </section>
  );
}

const systems = [
  {
    name: "Landing System",
    short: "Landing module",
    lead: "Safely directs the crew from space orbit down to the surface",
    body: "The atmosphere on Mars is thin, mostly consisting of carbon dioxide and argon. During entry to the planet, your spaceship heats up making it one of many unsolved problems of landing a spacecraft.",
  },
  {
    name: "Crew habitat",
    short: "Crew habitat",
    lead: "Where the four people live, eat, exercise and work on the way to Mars.",
    body: "Long exposure to a weightless environment can weaken muscles and bones. To avoid this, exercise daily is key to keeping the crew healthy.",
  },
  {
    name: "Radiation shelter",
    short: "Radiation shield",
    lead: "A shelter built to withstand solar storms to keep the crew safe.",
    body: "Radiation outside Earth’s field is dangerous with high exposure. Solutions are still being researched.",
  },
  {
    name: "Supply module",
    short: "Supply module",
    lead: "Stores essential needs like food, repair parts, and water.",
    body: "Launching spacecrafts is expensive, so the crew needs to save and recycle essential items they can’t get during their journey.",
  },
  {
    name: "Propulsion System",
    short: "Propulsion system",
    lead: "Launches the spacecraft out of Earth's orbit towards Mars using powerful thrusters.",
    body: "Space exploration agencies have researched multiple engine types. AURORA does not choose one, because that needs engineering analysis and testing.",
  },
  {
    name: "Solar arrays",
    short: "Solar arrays",
    lead: "Converts sunlight into renewable energy for equipment, lights, and vitals.",
    body: "Mars is approximately 1.5 times farther from the Sun than Earth. This creates large dust storms and scattered debris.",
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
      aria-label="A side view of a typical Mars spacecraft with six labeled parts: Landing module at the front, crew habitat, radiation shelter, supply module, propulsion system, and solar arrays along the top-side and bottom-side. The same information is in the list next to this diagram."
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
        imageAlt="Artist's concept of NASA's Curiosity spacecraft approaching Mars"
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
          NASA/JPL-Caltech, PIA 14832 — Artist’s concept of Curiosity approaching Mars. This depicts
          a robotic mission, not the AURORA spacecraft shown below. NASA image record.
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
    initials: "NM",
    name: "Njeri Mwangi",
    role: "Commander",
    origin: "Nairobi, Kenya",
    bio: "Black Female Commander. Born in Nairobi, Kenya and immigrated to the United States to teach chemistry at Princeton University. Soon went to work on the Artemis Vl mission, then helped test multiple Mars environments and probes, to later get promoted to the Aurora space exploration program.",
  },
  {
    initials: "HY",
    name: "Hiroto Yamazaki",
    role: "Doctor & Scientist",
    origin: "Hiroshima, Japan",
    bio: "Japanese Male Doctor and Scientist. Born in Hiroshima Japan, he studied sports medicine at the University of Tokyo, where he also learnt English. Eventually the Aurora space exploration program recruited him.",
  },
  {
    initials: "GL",
    name: "Gonzales Lacasa",
    role: "Pilot",
    origin: "Mexico City, Mexico",
    bio: "Mexican Pilot. He was Born in Mexico City, Mexico. When he turned 14, his parents immigrated to the United States for better job opportunities. He got very interested in his fathers passion about the sky, and birds. He studied aerospace piloting for years to later apply for the US Air Force. He made it in and once he got too old to fly these types of jets, he applied for AURORA and got accepted to later become a pilot for Aurora.",
  },
  {
    initials: "LS",
    name: "Logan Smith",
    role: "Flight Engineer",
    origin: "Burlington, Vermont",
    bio: "Flight Engineer. Logan was born in Burlington, Vermont. He had great interest in mechanics, and generally how things work, from a very young age. When he entered the portal for a flight mechanics camp through his middle school, he discovered his strengths and was off to the races.",
  },
];

function Crew({ go }: { go: (page: Page) => void }) {
  return (
    <>
      <InteriorHero
        index="03"
        kicker="Crew roster"
        title="The four who would go"
        text="Real expeditions succeed when people and machines work together. These crew members are fictional, and each represents a skill set a Mars mission would need."
        image={images.terrain}
        imageAlt="Curiosity's view of rows of rocks and Mount Sharp on Mars"
      />
      <section className="crew-section wrap">
        <SectionTitle
          kicker="Meet the crew"
          index="01"
          title="One team. Four disciplines."
        />
        <div className="crew-grid">
          {crew.map((person, i) => (
            <article key={person.name}>
              <div className={`crew-avatar avatar-${i + 1}`}>
                <span>{person.initials}</span>
                <i />
              </div>
              <div className="crew-id">
                <span>Crew 0{i + 1}</span>
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
          <h2>Several Skill Sets Are Required.</h2>
          <p>
            A Mars team would need science, medicine, piloting, and engineering experience and
            practice to be a successful team under high pressure situations.
          </p>
          <small>
            These profiles are fictional and do not represent any astronauts or selected people
          </small>
        </div>
      </section>
      <div className="wrap">
        <p className="source-note">
          NASA/JPL-Caltech, PIA 17948 — A view of the Mars landscape from the Curiosity mission.
          This is a real NASA rover image, not a portrait of AURORA’s fictional crew. NASA image
          record.
        </p>
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
    "What equipment is needed for Mars exploration?",
    "What systems and equipment would be necessary for Mars surface operations, and what measurements would they provide?",
  ],
  [
    "What life-forms have been discovered on Mars?",
    "What effect do these life forms have on the actual planet and atmosphere around it?",
  ],
  [
    "How should Martian sites be managed?",
    "What routines and procedures could countries do to make a safer trip?",
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
        imageAlt="Curiosity's view of rows of rocks and Mount Sharp on Mars"
      />
      <section className="research-section wrap">
        <SectionTitle kicker="Want More Information?" index="01" title="Open questions" />
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
        <p className="source-note">
          NASA/JPL-Caltech, PIA 17948 — Martian landscape with rock rows and Mount Sharp (stereo).
          NASA image record.
        </p>
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
          Our sources <Arrow />
        </button>
      </div>
      <PageLinks
        go={go}
        previous={{ id: "crew", label: "Crew" }}
        next={{ id: "reference", label: "Reference" }}
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
        title="Mars ideas start close to home."
        text="Community and school projects invite younger students to think about Mars through classroom activities."
        image={images.community}
        imageAlt="NASA's Curiosity rover taking a self-portrait at the Okoruso drill hole on Mars"
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
            From the NASA archive — NASA/JPL-Caltech/MSSS, PIA 20602 — Curiosity self-portrait at
            the Okoruso drill hole. This NASA archive image is separate from the fictional sample
            posts above. NASA image record.
          </p>
        </div>
      </section>
      <PageLinks
        go={go}
        previous={{ id: "research", label: "Research" }}
        next={{ id: "reference", label: "Reference" }}
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
        title="Reference"
        text="Explore the sources behind the Mars facts and the credits for images and original work."
        image={images.mars}
        imageAlt="Curiosity's view of rows of rocks and Mount Sharp on Mars"
      />
      <section className="reference-section wrap">
        <div className="reference-block">
          <Kicker index="01">Sources for facts</Kicker>
          <h2>Fact-checkable sources</h2>
          <p>Facts are summarized in our own words. The mission concept and schedule are fictional.</p>
          <article>
            <a
              href="https://www.esa.int/articles/about-us/directorates/science/mars-express/facts-about-mars"
              target="_blank"
              rel="noreferrer"
            >
              European Space Agency. “Facts about Mars.” Mars Express.
            </a>
            <p>
              Used for: length of a sol (24 h 37 min), surface gravity (3.711 m/s²), atmosphere
              (95.32% carbon dioxide), diameter (6,794 km) and orbital period (687 Earth days). The
              “about 38% of Earth’s gravity” figure is our calculation: 3.711 divided by 9.81. URL:
              https://www.esa.int/articles/about-us/directorates/science/mars-express/facts-about-mars.
              Accessed 18 Nov. 2026.
            </p>
          </article>
          <article>
            <a href="https://science.nasa.gov/mars/facts/" target="_blank" rel="noreferrer">
              NASA. “Mars Facts.” NASA Science.
            </a>
            <p>
              Used for: evidence of Mars’s warmer, wetter past; the search for ancient life; average
              distance from the Sun; day and year lengths; and Mars’s moons. URL:
              https://science.nasa.gov/mars/facts/. Accessed 18 Nov. 2026.
            </p>
          </article>
          <article>
            <a href="https://nssdc.gsfc.nasa.gov/planetary/mars/marslaun.html" target="_blank" rel="noreferrer">
              NASA Space Science Data Coordinated Archive. “A Crewed Mission to Mars.”
            </a>
            <p>
              Used for historical mission-planning context, including launch opportunities about
              every 26 months. The page describes a reference concept, not a current NASA mission.
              URL: https://nssdc.gsfc.nasa.gov/planetary/mars/marslaun.html. Accessed 18 Nov. 2026.
            </p>
          </article>
        </div>
        <div className="reference-block">
          <Kicker index="02">Images, fonts and media</Kicker>
          <h2>Source and rights</h2>
          <div className="credit-table">
            <div className="table-head">
              <span>Item</span>
              <span>Where used</span>
              <span>Source and rights</span>
            </div>
            {[
              [
                "Solar system path illustration",
                "Overview",
                "Original SVG and CSS in src/App.tsx. Not to scale.",
              ],
              [
                "Spacecraft diagram",
                "Spacecraft",
                "Original CSS illustration in src/App.tsx. A concept drawing, not a real design.",
              ],
              [
                "Crew icons",
                "Crew",
                "CSS circles with initials. No photos of real people.",
              ],
              [
                "Fonts",
                "All pages",
                "Google Fonts, loaded from fonts.googleapis.com.",
              ],
              [
                "Martian Landscape With Rock Rows and Mount Sharp (Stereo), PIA 17948",
                "Overview, Crew, Research, Reference",
                "NASA/JPL-Caltech. NASA image record.",
                "https://images.nasa.gov/details/PIA17948",
              ],
              [
                "Curiosity Approaching Mars, Artist’s Concept, PIA 14832",
                "Mission, Spacecraft",
                "NASA/JPL-Caltech. NASA image record.",
                "https://images.nasa.gov/details/PIA14832",
              ],
              [
                "Curiosity Self-Portrait at Okoruso Drill Hole, PIA 20602",
                "Community",
                "NASA/JPL-Caltech/MSSS. NASA image record.",
                "https://images.nasa.gov/details/PIA20602",
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
            Archive images load directly from NASA’s image servers and require an internet
            connection. Captions identify the image credit and link to each NASA record.
          </p>
        </div>
        <div className="reference-block">
          <Kicker index="03">How the site is built</Kicker>
          <h2>Project notes</h2>
          <p>
            The site uses React, TypeScript, CSS and JavaScript. NASA archive images load directly
            from NASA’s image servers, and the fonts are loaded from Google Fonts. The site collects
            no personal information.
          </p>
          <p>
            Technology Student Association Website Design 2026-27 presents AURORA as a fictional
            educational concept. It is not endorsed by NASA, ESA or any other agency.
          </p>
        </div>
      </section>
      <PageLinks
        go={go}
        previous={{ id: "research", label: "Research" }}
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
            A fictional <span>Mars mission</span>
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
            Technology Student Association Website Design 2026-27 presents AURORA, a fictional
            Mars exploration concept. AURORA is not a real mission or spacecraft program.
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
