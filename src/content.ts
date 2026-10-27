/**
 * Every word on the page. SELENE is a concept brand — names, dates and
 * missions are illustrative placeholders, and the page says so.
 */

export const brand = {
  name: 'Selene',
  wordmark: 'SELENE',
  email: 'crew@selene.space',
};

export const nav = [
  {label: 'Log', href: '#log'},
  {label: 'Trajectory', href: '#trajectory'},
  {label: 'Capacity', href: '#capacity'},
];

export const hero = {
  title: 'EARTHRISE',
  kicker: 'A concept for lunar expeditions',
  site: 'Mare Tranquillitatis · 0.67°N 23.47°E',
};

export const intro = {
  eyebrow: 'Mission log',
  heading: 'The first holiday that leaves the planet.',
  body: 'Four days out, a week on the surface, and one view nobody has ever forgotten. This is the trip, frame by frame.',
};

export const log = [
  {tag: 'T−0', title: 'Launch', body: 'Nine minutes of thunder, then silence and the curve of the Earth.', image: '/media/cards/m1-launch.webp'},
  {tag: 'Day 3', title: 'Lunar orbit', body: 'The far side scrolls past the window. Your hand on the glass.', image: '/media/cards/m2-orbit.webp'},
  {tag: 'Day 4', title: 'Base Tranquillity', body: 'Pressurised domes, a hot meal, and a skylight pointed home.', image: '/media/cards/m3-base.webp'},
  {tag: 'Day 5', title: 'First steps', body: 'Footprints that will outlast every building you have ever seen.', image: '/media/cards/m4-walk.webp'},
];

/** Legs of the Earth → Moon trajectory, in drawing order. */
export const trajectory = {
  eyebrow: 'Trajectory',
  heading: '384,400 km, drawn as you scroll.',
  legs: [
    {day: 'Day 0', title: 'Parking orbit', body: 'Two laps of the Earth while the crew and craft are checked.'},
    {day: 'Day 0', title: 'Trans-lunar injection', body: 'A six-minute burn and you are on your way. No turning back for three days.'},
    {day: 'Day 3', title: 'Lunar orbit insertion', body: 'The engine fires behind the Moon, out of contact with Earth. Then: capture.'},
    {day: 'Day 4', title: 'Descent', body: 'Twelve minutes from orbit to the dust of Tranquillity.'},
  ],
};

export const missions = {
  eyebrow: 'Missions',
  heading: 'Three ways to leave.',
  note: 'Concept missions — durations illustrative.',
  items: [
    {name: 'Orbiter', days: 6, lines: ['Two lunar orbits', 'Far-side flyover', 'Earthrise from orbit'], cta: 'Join the Orbiter list'},
    {name: 'Lander', days: 10, lines: ['Four nights at Base Tranquillity', 'Two surface EVAs', 'Earthrise from the surface'], cta: 'Join the Lander list', featured: true},
    {name: 'Resident', days: 28, lines: ['A full lunar day and night', 'Rover traverse to the highlands', 'Science crew rotation'], cta: 'Join the Resident list'},
  ],
};

export const reserve = {
  eyebrow: 'Reserve',
  heading: 'Put your name on the manifest.',
  body: 'No payment, no commitment. We’ll write when the next window opens.',
  /** Illustrative launch window for the countdown (the Apollo 11 anniversary). */
  window: '2031-07-20T20:17:00Z',
  windowLabel: 'Next launch window (concept)',
};

// ---------------------------------------------------------------------------
// Capacity Connect
// ---------------------------------------------------------------------------

export const capacity = {
  eyebrow: 'Capacity Connect',
  heading: 'Mission operations & flight crew learning platform.',
  body: 'Comprehensive training curricula for lunar telemetry, deep-space signal processing, and orbital link protocols. Master your operational tier before launch.',
  features: [
    {
      title: 'Structured Curricula',
      body: 'Role-based tracks spanning link budgets, DSP, antenna operations, and real-time mission telemetry.',
    },
    {
      title: 'Interactive Assessments',
      body: 'Validate your operational readiness with graded technical assessments across all orbital flight phases.',
    },
    {
      title: 'Progress Tracking',
      body: 'Real-time skill trajectory analytics, milestone achievements, and module completion metrics.',
    },
    {
      title: 'Tiered Certification',
      body: 'Verified learning paths from Signal foundation to Uplink Elite ground station specialist.',
    },
  ],
};

export const capacityPlans = {
  eyebrow: 'Plans',
  heading: 'Three capacities.',
  note: 'Concept tiers — bandwidth illustrative.',
  items: [
    {
      name: 'Signal',
      bandwidth: '1',
      unit: 'Mbps',
      lines: ['Standard uplink window', 'Text and telemetry', 'Mission log access'],
      cta: 'Join the Signal list',
      featured: false,
    },
    {
      name: 'Relay',
      bandwidth: '10',
      unit: 'Mbps',
      lines: [
        'Extended uplink window',
        'Audio and low-res video',
        'Live telemetry feed',
        'Earthrise still frames',
      ],
      cta: 'Join the Relay list',
      featured: true,
    },
    {
      name: 'Uplink',
      bandwidth: '100',
      unit: 'Mbps',
      lines: [
        'Continuous uplink',
        'Full HD Earthrise feed',
        'Crew comms access',
        'Dedicated ground station slot',
      ],
      cta: 'Join the Uplink list',
      featured: false,
    },
  ],
};
