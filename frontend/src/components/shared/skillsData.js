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
        x: ROOT_X,
        y: LEVEL_2_Y,
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
  levers: {
    nodes: [
      {
        id: 'tuck-bl',
        label: 'Tuck Back Lever',
        x: ROOT_X,
        y: ROOT_Y,
        level: 1,
        scores: { balance: 2, pull: 2, push: 0, legs: 1, conditioning: 1 },
        type: 'static'
      },
      {
        id: 'adv-tuck-bl',
        label: 'Advanced Tuck Back Lever',
        x: ROOT_X - X_SPACING,
        y: LEVEL_2_Y,
        level: 2,
        scores: { balance: 3, pull: 3, push: 0, legs: 1, conditioning: 2 },
        type: 'static'
      },
      {
        id: 'straddle-bl',
        label: 'Straddle Back Lever',
        x: ROOT_X - X_SPACING,
        y: LEVEL_3_Y,
        level: 3,
        scores: { balance: 4, pull: 4, push: 0, legs: 2, conditioning: 3 },
        type: 'static'
      },
      {
        id: 'full-bl',
        label: 'Full Back Lever',
        x: ROOT_X - X_SPACING,
        y: LEVEL_4_Y,
        level: 4,
        scores: { balance: 5, pull: 5, push: 0, legs: 3, conditioning: 4 },
        type: 'static'
      },
      {
        id: 'tuck-fl',
        label: 'Tuck Front Lever',
        x: ROOT_X + X_SPACING,
        y: LEVEL_2_Y,
        level: 2,
        scores: { balance: 2, pull: 2, push: 0, legs: 1, conditioning: 1 },
        type: 'static'
      },
      {
        id: 'adv-tuck-fl',
        label: 'Advanced Tuck Front Lever',
        x: ROOT_X + X_SPACING,
        y: LEVEL_3_Y,
        level: 3,
        scores: { balance: 3, pull: 3, push: 0, legs: 1, conditioning: 2 },
        type: 'static'
      },
      {
        id: 'full-fl',
        label: 'Full Front Lever',
        x: ROOT_X + X_SPACING,
        y: LEVEL_4_Y,
        level: 4,
        scores: { balance: 4, pull: 4, push: 0, legs: 2, conditioning: 3 },
        type: 'static'
      }
    ],
    edges: [
      { source: 'tuck-bl', target: 'adv-tuck-bl' },
      { source: 'adv-tuck-bl', target: 'straddle-bl' },
      { source: 'straddle-bl', target: 'full-bl' },
      { source: 'tuck-bl', target: 'tuck-fl' },
      { source: 'tuck-fl', target: 'adv-tuck-fl' },
      { source: 'adv-tuck-fl', target: 'full-fl' }
    ]
  },
}
