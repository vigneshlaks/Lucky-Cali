const ROOT_X = 800;
const ROOT_Y = 100;
const LEVEL_2_Y = 300;
const LEVEL_3_Y = 400;
const LEVEL_4_Y = 500;
const X_SPACING = 150;

export const skillsData = {
  handstands: {
    nodes: [
      {
        id: 'wall-hs',
        label: 'Wall Handstand',
        scores: { balance: 3, pull: 0, push: 2, legs: 1, conditioning: 1 },
        type: 'static'
      },
      {
        id: 'free-hs',
        label: 'Free Handstand',
        level: 2,
        scores: { balance: 4, pull: 0, push: 3, legs: 2, conditioning: 2 },
        type: 'static'
      },
      {
        id: 'one-arm-hs',
        label: 'One-arm Handstand',
        x: ROOT_X,
        y: LEVEL_3_Y,
        level: 3,
        scores: { balance: 5, pull: 0, push: 4, legs: 3, conditioning: 3 },
        type: 'static'
      }
    ],
    edges: [
      { source: 'wall-hs', target: 'free-hs' },
      { source: 'free-hs', target: 'one-arm-hs' }
    ]
  },
  pushups: {
    nodes: [
      {
        id: 'floor-pu',
        label: 'Floor Pushup',
        x: ROOT_X,
        y: ROOT_Y,
        level: 1,
        scores: { balance: 1, pull: 0, push: 2, legs: 1, conditioning: 1 },
        type: 'dynamic'
      },
      {
        id: 'diamond-pu',
        label: 'Diamond Pushup',
        x: ROOT_X,
        y: LEVEL_2_Y,
        level: 2,
        scores: { balance: 2, pull: 0, push: 3, legs: 1, conditioning: 1 },
        type: 'dynamic'
      },
      {
        id: 'one-arm-pu',
        label: 'One-arm Pushup',
        x: ROOT_X,
        y: LEVEL_3_Y,
        level: 3,
        scores: { balance: 3, pull: 0, push: 4, legs: 2, conditioning: 2 },
        type: 'dynamic'
      },
      {
        id: 'planche-pu',
        label: 'Planche Pushup',
        x: ROOT_X,
        y: LEVEL_4_Y,
        level: 4,
        scores: { balance: 4, pull: 0, push: 5, legs: 2, conditioning: 3 },
        type: 'dynamic'
      }
    ],
    edges: [
      { source: 'floor-pu', target: 'diamond-pu' },
      { source: 'diamond-pu', target: 'one-arm-pu' },
      { source: 'one-arm-pu', target: 'planche-pu' }
    ]
  },
  pullups: {
    nodes: [
      {
        id: 'negative-pullup',
        label: 'Negative Pullup',
        x: ROOT_X,
        y: ROOT_Y,
        level: 1,
        scores: { balance: 1, pull: 2, push: 0, legs: 1, conditioning: 1 },
        type: 'dynamic'
      },
      {
        id: 'pullup',
        label: 'Pullup',
        x: ROOT_X,
        y: LEVEL_2_Y,
        level: 2,
        scores: { balance: 2, pull: 3, push: 0, legs: 1, conditioning: 2 },
        type: 'dynamic'
      },
      {
        id: 'l-pullup',
        label: 'L-Pullup',
        x: ROOT_X,
        y: LEVEL_3_Y,
        level: 3,
        scores: { balance: 3, pull: 4, push: 0, legs: 2, conditioning: 3 },
        type: 'dynamic'
      },
      {
        id: 'oac',
        label: 'One Arm Chin (OAC)',
        x: ROOT_X,
        y: LEVEL_4_Y,
        level: 4,
        scores: { balance: 4, pull: 5, push: 0, legs: 3, conditioning: 4 },
        type: 'dynamic'
      }
    ],
    edges: [
      { source: 'negative-pullup', target: 'pullup' },
      { source: 'pullup', target: 'l-pullup' },
      { source: 'l-pullup', target: 'oac' }
    ]
  },
  dips: {
    nodes: [
      {
        id: 'pb-dip',
        label: 'Parallel Bar Dip',
        x: ROOT_X,
        y: ROOT_Y,
        level: 1,
        scores: { balance: 1, pull: 0, push: 2, legs: 1, conditioning: 1 },
        type: 'dynamic'
      },
      {
        id: 'ring-dip',
        label: 'Ring Dip',
        x: ROOT_X,
        y: LEVEL_2_Y,
        level: 2,
        scores: { balance: 2, pull: 0, push: 3, legs: 1, conditioning: 1 },
        type: 'dynamic'
      },
      {
        id: 'l-dip',
        label: 'L-Dip',
        x: ROOT_X,
        y: LEVEL_3_Y,
        level: 3,
        scores: { balance: 3, pull: 0, push: 4, legs: 2, conditioning: 2 },
        type: 'dynamic'
      },
      {
        id: 'russian-dip',
        label: 'Russian Dip',
        x: ROOT_X,
        y: LEVEL_4_Y,
        level: 4,
        scores: { balance: 4, pull: 0, push: 5, legs: 2, conditioning: 3 },
        type: 'dynamic'
      }
    ],
    edges: [
      { source: 'pb-dip', target: 'ring-dip' },
      { source: 'ring-dip', target: 'l-dip' },
      { source: 'l-dip', target: 'russian-dip' }
    ]
  },
  frontLever: {
    nodes: [
      {
        id: 'tuck-fl',
        label: 'Tuck Front Lever',
        x: ROOT_X,
        y: ROOT_Y,
        level: 1,
        scores: { balance: 2, pull: 2, push: 0, legs: 1, conditioning: 1 },
        type: 'static'
      },
      {
        id: 'adv-tuck-fl',
        label: 'Advanced Tuck Front Lever',
        x: ROOT_X - X_SPACING,
        y: LEVEL_2_Y,
        level: 2,
        scores: { balance: 3, pull: 3, push: 0, legs: 1, conditioning: 2 },
        type: 'static'
      },
      {
        id: 'straddle-fl',
        label: 'Straddle Front Lever',
        x: ROOT_X - X_SPACING,
        y: LEVEL_3_Y,
        level: 3,
        scores: { balance: 4, pull: 4, push: 0, legs: 2, conditioning: 3 },
        type: 'static'
      },
      {
        id: 'full-fl',
        label: 'Full Front Lever',
        x: ROOT_X - X_SPACING,
        y: LEVEL_4_Y,
        level: 4,
        scores: { balance: 5, pull: 5, push: 0, legs: 3, conditioning: 4 },
        type: 'static'
      }
    ],
    edges: [
      { source: 'tuck-fl', target: 'adv-tuck-fl' },
    { source: 'adv-tuck-fl', target: 'straddle-fl' },
    { source: 'straddle-fl', target: 'full-fl' },
    ]
  },
  rows: {
    nodes: [
      {
        id: 'bodyweight-row',
        label: 'Bodyweight Row',
        x: ROOT_X,
        y: ROOT_Y,
        level: 1,
        scores: { balance: 1, pull: 2, push: 0, legs: 1, conditioning: 1 },
        type: 'dynamic',
      },
      {
        id: 'tucked-row',
        label: 'Tucked Row',
        x: ROOT_X,
        y: LEVEL_2_Y,
        level: 2,
        scores: { balance: 2, pull: 3, push: 0, legs: 1, conditioning: 2 },
        type: 'dynamic',
      },
      {
        id: 'adv-tucked-row',
        label: 'Advanced Tucked Row',
        x: ROOT_X,
        y: LEVEL_3_Y,
        level: 3,
        scores: { balance: 3, pull: 4, push: 0, legs: 2, conditioning: 3 },
        type: 'dynamic',
      },
      {
        id: 'one-arm-row',
        label: 'One-arm Row',
        x: ROOT_X,
        y: LEVEL_4_Y,
        level: 4,
        scores: { balance: 4, pull: 5, push: 0, legs: 3, conditioning: 4 },
        type: 'dynamic',
      },
    ],
    edges: [
      { source: 'bodyweight-row', target: 'tucked-row' },
      { source: 'tucked-row', target: 'adv-tucked-row' },
      { source: 'adv-tucked-row', target: 'one-arm-row' },
    ],
  },

  squats: {
    nodes: [
      {
        id: 'bodyweight-squat',
        label: 'Bodyweight Squat',
        x: ROOT_X,
        y: ROOT_Y,
        level: 1,
        scores: { balance: 1, pull: 0, push: 1, legs: 2, conditioning: 1 },
        type: 'dynamic',
      },
      {
        id: 'pistol-squat',
        label: 'Pistol Squat',
        x: ROOT_X,
        y: LEVEL_2_Y,
        level: 2,
        scores: { balance: 2, pull: 0, push: 1, legs: 3, conditioning: 2 },
        type: 'dynamic',
      },
      {
        id: 'shrimp-squat',
        label: 'Shrimp Squat',
        x: ROOT_X,
        y: LEVEL_3_Y,
        level: 3,
        scores: { balance: 3, pull: 0, push: 1, legs: 4, conditioning: 3 },
        type: 'dynamic',
      },
    ],
    edges: [
      { source: 'bodyweight-squat', target: 'pistol-squat' },
      { source: 'pistol-squat', target: 'shrimp-squat' },
    ],
  },

  lunges: {
    nodes: [
      {
        id: 'lunge',
        label: 'Lunge',
        x: ROOT_X,
        y: ROOT_Y,
        level: 1,
        scores: { balance: 1, pull: 0, push: 1, legs: 2, conditioning: 1 },
        type: 'dynamic',
      },
      {
        id: 'jump-lunge',
        label: 'Jump Lunge',
        x: ROOT_X,
        y: LEVEL_2_Y,
        level: 2,
        scores: { balance: 2, pull: 0, push: 1, legs: 3, conditioning: 2 },
        type: 'dynamic',
      },
      {
        id: 'split-squat',
        label: 'Split Squat',
        x: ROOT_X,
        y: LEVEL_3_Y,
        level: 3,
        scores: { balance: 3, pull: 0, push: 1, legs: 4, conditioning: 3 },
        type: 'dynamic',
      },
    ],
    edges: [
      { source: 'lunge', target: 'jump-lunge' },
      { source: 'jump-lunge', target: 'split-squat' },
    ],
  },

  muscleUps: {
    nodes: [
      {
        id: 'false-grip-mu',
        label: 'False Grip Muscle Up',
        x: ROOT_X,
        y: ROOT_Y,
        level: 1,
        scores: { balance: 2, pull: 3, push: 2, legs: 1, conditioning: 2 },
        type: 'dynamic',
      },
      {
        id: 'kipping-mu',
        label: 'Kipping Muscle Up',
        x: ROOT_X,
        y: LEVEL_2_Y,
        level: 2,
        scores: { balance: 3, pull: 4, push: 3, legs: 1, conditioning: 3 },
        type: 'dynamic',
      },
      {
        id: 'strict-mu',
        label: 'Strict Muscle Up',
        x: ROOT_X,
        y: LEVEL_3_Y,
        level: 3,
        scores: { balance: 4, pull: 5, push: 4, legs: 2, conditioning: 4 },
        type: 'dynamic',
      },
    ],
    edges: [
      { source: 'false-grip-mu', target: 'kipping-mu' },
      { source: 'kipping-mu', target: 'strict-mu' },
    ],
  },

  handstandPushups: {
    nodes: [
      {
        id: 'wall-hspu',
        label: 'Wall Handstand Pushup',
        x: ROOT_X,
        y: ROOT_Y,
        level: 1,
        scores: { balance: 2, pull: 0, push: 3, legs: 1, conditioning: 1 },
        type: 'static',
      },
      {
        id: 'free-hspu',
        label: 'Free Handstand Pushup',
        x: ROOT_X,
        y: LEVEL_2_Y,
        level: 2,
        scores: { balance: 3, pull: 0, push: 4, legs: 1, conditioning: 2 },
        type: 'static',
      },
      {
        id: 'pike-hspu',
        label: 'Pike Handstand Pushup',
        x: ROOT_X,
        y: LEVEL_3_Y,
        level: 3,
        scores: { balance: 4, pull: 0, push: 5, legs: 2, conditioning: 3 },
        type: 'static',
      },
    ],
    edges: [
      { source: 'wall-hspu', target: 'free-hspu' },
      { source: 'free-hspu', target: 'pike-hspu' },
    ],
  },

  planche: {
    nodes: [
      {
        id: 'tuck-planche',
        label: 'Tuck Planche',
        x: ROOT_X,
        y: ROOT_Y,
        level: 1,
        scores: { balance: 2, pull: 0, push: 3, legs: 1, conditioning: 2 },
        type: 'static',
      },
      {
        id: 'adv-tuck-planche',
        label: 'Advanced Tuck Planche',
        x: ROOT_X - X_SPACING,
        y: LEVEL_2_Y,
        level: 2,
        scores: { balance: 3, pull: 0, push: 4, legs: 1, conditioning: 3 },
        type: 'static',
      },
      {
        id: 'straddle-planche',
        label: 'Straddle Planche',
        x: ROOT_X - X_SPACING,
        y: LEVEL_3_Y,
        level: 3,
        scores: { balance: 4, pull: 0, push: 5, legs: 2, conditioning: 4 },
        type: 'static',
      },
      {
        id: 'full-planche',
        label: 'Full Planche',
        x: ROOT_X - X_SPACING,
        y: LEVEL_4_Y,
        level: 4,
        scores: { balance: 5, pull: 0, push: 6, legs: 3, conditioning: 5 },
        type: 'static',
      },
    ],
    edges: [
      { source: 'tuck-planche', target: 'adv-tuck-planche' },
      { source: 'adv-tuck-planche', target: 'straddle-planche' },
      { source: 'straddle-planche', target: 'full-planche' },
    ],
  },
}
