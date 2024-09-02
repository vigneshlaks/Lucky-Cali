export const trainMiddleTabs = [
    { id: "dashboard", label: "Dashboard", path: "/train" },
    { id: "skilltree", label: "Skill Tree", path: "/train/flowdiagram" },
    { id: "posts", label: "Posts", path: "/train/posts"},
    { id: "logs", label: "Logs", path: "/train/logs"}
  ];
 
export const competeMiddleTabs = [
  { id: "contest", label: "Contest", path: "/compete/contest" },
  { id: "leaderboard", label: "Leaderboard", path: "/compete/leaderboard" }, 
  ];

export const trainDefaultEndTabs = [
    { id: "compete", label: "Compete", path: "/compete" },
    { id: "guide", label: "Guide", path: "/guide/" },
    { id: "signin", label: "Sign In", path: "/auth/login"}
  ];

export const competeDefaultEndTabs = [
  { id: "train", label: "Train", path: "/train" },
  { id: "guide", label: "Guide", path: "/guide/" },
  { id: "signin", label: "Sign In", path: "/auth/login"}
  ];

export const trainAuthEndTabs = [
  { id: "compete", label: "Compete", path: "/compete" },
  { id: "guide", label: "Guide", path: "/guide/" },
  { id: "profile", label: "Profile", path: "/train/profile"}
];

export const competeAuthEndTabs = [
  { id: "train", label: "Train", path: "/train" },
  { id: "guide", label: "Guide", path: "/guide/" },
  { id: "profile", label: "Profile", path: "/train/profile"}
];