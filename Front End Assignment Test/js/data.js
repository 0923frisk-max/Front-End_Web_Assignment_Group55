/* ============================================
   APEX FORCE ESPORT - Data
   Teams, Players, Events, Products
   ============================================ */

// Image paths (relative to project root)
const IMG = {
  clubLogo: 'Image Folder/Club Logo/our_logo.jpg',
  cs2Banner: 'Image Folder/Banner Image/CS2banner.png',
  cs2Banner2: 'Image Folder/Banner Image/CS2_banner.png',
  defaultProfile: 'Image Folder/Default profile image/default_profile.png',
  eventMatch1: 'Image Folder/Event Schedule Image/IMG-20260808-WA0001.jpg', // Wolves vs Dragons
  eventMatch2: 'Image Folder/Event Schedule Image/IMG-20260808-WA0004.jpg', // Falcons vs Titans
  eventMatch3: 'Image Folder/Event Schedule Image/IMG-20260808-WA0007.jpg', // Nova vs Aspire
  teams: {
    'Arctic Wolves': 'Image Folder/Team Logo/team_wolves_icon.jpg',
    'Inferno Dragons': 'Image Folder/Team Logo/team_inferno_icon.jpg',
    'Golden Falcons': 'Image Folder/Team Logo/team_golden_icon.jpg',
    'Ocean Titans': 'Image Folder/Team Logo/team_ocean_icon.jpg',
    'Nova Esports': 'Image Folder/Team Logo/team_nova_icon.jpg',
    'Aspire Esports': 'Image Folder/Team Logo/team_aspire_icon.jpg'
  }
};

// ===== TEAMS (6 teams, each with 5+ players) =====
const TEAMS = [
  {
    name: "Arctic Wolves",
    logo: IMG.teams['Arctic Wolves'],
    points: 2850,
    wins: 42,
    losses: 12,
    region: "Kuala Lumpur",
    founded: 2019,
    captain: "FrostByte",
    tagline: "UNITED BY FROST. DRIVEN BY VICTORY.",
    bio: "One of Malaysia's most established esports organizations, known for their icy calm under pressure and aggressive late-round tactics. The Arctic Wolves have dominated the national circuit for three consecutive seasons.",
    color: "#3B82F6"
  },
  {
    name: "Inferno Dragons",
    logo: IMG.teams['Inferno Dragons'],
    points: 2640,
    wins: 38,
    losses: 15,
    region: "Selangor",
    founded: 2013,
    captain: "Blaze",
    tagline: "BURN THE LIMITS. CONQUER ALL.",
    bio: "Veteran Malaysian esports team with a fiery CS:GO legacy. The Dragons bring explosive energy and fearless aggression to every match, burning through their opponents with calculated ferocity.",
    color: "#EF4444"
  },
  {
    name: "Golden Falcons",
    logo: IMG.teams['Golden Falcons'],
    points: 2520,
    wins: 35,
    losses: 17,
    region: "Penang",
    founded: 2016,
    captain: "Talons",
    tagline: "SPEED. PRECISION. VICTORY.",
    bio: "Rising powerhouse from Penang with a young, talented roster. The Falcons strike with lightning speed and pinpoint precision, soaring above the competition with their high-flying playstyle.",
    color: "#F59E0B"
  },
  {
    name: "Ocean Titans",
    logo: IMG.teams['Ocean Titans'],
    points: 2380,
    wins: 33,
    losses: 19,
    region: "Johor",
    founded: 2020,
    captain: "TideCaller",
    tagline: "STRENGTH IN UNITY. TITANS FOREVER.",
    bio: "Fast-emerging team from southern Malaysia, drawing strength from the deep. The Titans play with overwhelming force and unbreakable unity, crashing through defenses like tidal waves.",
    color: "#06B6D4"
  },
  {
    name: "Nova Esports",
    logo: IMG.teams['Nova Esports'],
    points: 2150,
    wins: 30,
    losses: 22,
    region: "Sabah",
    founded: 2021,
    captain: "Shadow",
    tagline: "RISE FROM THE DARKNESS.",
    bio: "East Malaysian representatives making waves in the national scene. Nova plays with mysterious, shadowy tactics, striking from the darkness and leaving opponents guessing.",
    color: "#6366F1"
  },
  {
    name: "Aspire Esports",
    logo: IMG.teams['Aspire Esports'],
    points: 1920,
    wins: 27,
    losses: 25,
    region: "Perak",
    founded: 2018,
    captain: "Alpha",
    tagline: "REACH FOR THE PEAK.",
    bio: "Disciplined tactical squad with strong team coordination from Perak. Aspire never settles, always reaching higher and pushing beyond limits to claim victory.",
    color: "#D4AF37"
  }
];

// ===== PLAYERS (5 per team = 30 players) =====
const PLAYERS = [
  // Arctic Wolves (5)
  { id: 1, nick: "FrostByte", realName: "Ahmad Khairi", team: "Arctic Wolves", role: "AWPer", kd: 1.42, winrate: 78, rating: 1.35, country: "Malaysia", age: 22, avatar: "https://i.pravatar.cc/150?img=12" },
  { id: 2, nick: "IceBreaker", realName: "Lim Wei Xiang", team: "Arctic Wolves", role: "IGL", kd: 1.18, winrate: 78, rating: 1.22, country: "Malaysia", age: 24, avatar: "https://i.pravatar.cc/150?img=33" },
  { id: 3, nick: "SnowStorm", realName: "Muhammad Faiz", team: "Arctic Wolves", role: "Rifler", kd: 1.35, winrate: 76, rating: 1.30, country: "Malaysia", age: 21, avatar: "https://i.pravatar.cc/150?img=15" },
  { id: 4, nick: "Glacier", realName: "Tan Fang Yi", team: "Arctic Wolves", role: "Support", kd: 1.10, winrate: 77, rating: 1.08, country: "Malaysia", age: 23, avatar: "https://i.pravatar.cc/150?img=60" },
  { id: 5, nick: "Permafrost", realName: "Daniel Wong", team: "Arctic Wolves", role: "Lurker", kd: 1.22, winrate: 75, rating: 1.15, country: "Malaysia", age: 20, avatar: "https://i.pravatar.cc/150?img=68" },

  // Inferno Dragons (5)
  { id: 6, nick: "Blaze", realName: "Jake Tan", team: "Inferno Dragons", role: "Entry Fragger", kd: 1.38, winrate: 72, rating: 1.32, country: "Malaysia", age: 23, avatar: "https://i.pravatar.cc/150?img=51" },
  { id: 7, nick: "Ember", realName: "Nurul Aina", team: "Inferno Dragons", role: "Rifler", kd: 1.25, winrate: 71, rating: 1.18, country: "Malaysia", age: 21, avatar: "https://i.pravatar.cc/150?img=45" },
  { id: 8, nick: "Pyro", realName: "Zulkifli Bin Omar", team: "Inferno Dragons", role: "AWPer", kd: 1.40, winrate: 73, rating: 1.33, country: "Malaysia", age: 25, avatar: "https://i.pravatar.cc/150?img=3" },
  { id: 9, nick: "Cinder", realName: "Vivian Tan", team: "Inferno Dragons", role: "Support", kd: 1.08, winrate: 70, rating: 1.02, country: "Malaysia", age: 22, avatar: "https://i.pravatar.cc/150?img=20" },
  { id: 10, nick: "InfernoKing", realName: "Gary Lim", team: "Inferno Dragons", role: "IGL", kd: 1.15, winrate: 72, rating: 1.12, country: "Malaysia", age: 26, avatar: "https://i.pravatar.cc/150?img=53" },

  // Golden Falcons (5)
  { id: 11, nick: "Talons", realName: "Amirul Hakim", team: "Golden Falcons", role: "IGL", kd: 1.20, winrate: 67, rating: 1.15, country: "Malaysia", age: 24, avatar: "https://i.pravatar.cc/150?img=8" },
  { id: 12, nick: "SkyHawk", realName: "Siti Nurhaliza", team: "Golden Falcons", role: "AWPer", kd: 1.36, winrate: 68, rating: 1.28, country: "Malaysia", age: 20, avatar: "https://i.pravatar.cc/150?img=47" },
  { id: 13, nick: "DiveBomb", realName: "Hafiz Rahman", team: "Golden Falcons", role: "Entry Fragger", kd: 1.30, winrate: 66, rating: 1.22, country: "Malaysia", age: 21, avatar: "https://i.pravatar.cc/150?img=11" },
  { id: 14, nick: "Wingman", realName: "Chew Wei Jie", team: "Golden Falcons", role: "Support", kd: 1.05, winrate: 65, rating: 1.00, country: "Malaysia", age: 23, avatar: "https://i.pravatar.cc/150?img=22" },
  { id: 15, nick: "GoldFeather", realName: "Kumar A/L Raju", team: "Golden Falcons", role: "Lurker", kd: 1.18, winrate: 67, rating: 1.10, country: "Malaysia", age: 22, avatar: "https://i.pravatar.cc/150?img=36" },

  // Ocean Titans (5)
  { id: 16, nick: "TideCaller", realName: "Ong Zheng Yang", team: "Ocean Titans", role: "IGL", kd: 1.16, winrate: 64, rating: 1.12, country: "Malaysia", age: 25, avatar: "https://i.pravatar.cc/150?img=14" },
  { id: 17, nick: "Kraken", realName: "Muhammad Iqbal", team: "Ocean Titans", role: "AWPer", kd: 1.33, winrate: 65, rating: 1.25, country: "Malaysia", age: 22, avatar: "https://i.pravatar.cc/150?img=25" },
  { id: 18, nick: "Abyss", realName: "Tan Li Mei", team: "Ocean Titans", role: "Rifler", kd: 1.22, winrate: 63, rating: 1.15, country: "Malaysia", age: 21, avatar: "https://i.pravatar.cc/150?img=40" },
  { id: 19, nick: "Neptune", realName: "David Chen", team: "Ocean Titans", role: "Entry Fragger", kd: 1.28, winrate: 64, rating: 1.20, country: "Malaysia", age: 23, avatar: "https://i.pravatar.cc/150?img=55" },
  { id: 20, nick: "Coral", realName: "Nur Hidayah", team: "Ocean Titans", role: "Support", kd: 1.02, winrate: 62, rating: 0.98, country: "Malaysia", age: 20, avatar: "https://i.pravatar.cc/150?img=49" },

  // Nova Esports (5)
  { id: 21, nick: "Shadow", realName: "Reza Bin Ahmad", team: "Nova Esports", role: "Lurker", kd: 1.31, winrate: 58, rating: 1.20, country: "Malaysia", age: 24, avatar: "https://i.pravatar.cc/150?img=58" },
  { id: 22, nick: "NovaStar", realName: "Wong Kar Wai", team: "Nova Esports", role: "AWPer", kd: 1.37, winrate: 60, rating: 1.30, country: "Malaysia", age: 21, avatar: "https://i.pravatar.cc/150?img=62" },
  { id: 23, nick: "Void", realName: "Aisyah Binti Ramli", team: "Nova Esports", role: "IGL", kd: 1.12, winrate: 57, rating: 1.08, country: "Malaysia", age: 23, avatar: "https://i.pravatar.cc/150?img=38" },
  { id: 24, nick: "Cosmic", realName: "Lee Chong Wei", team: "Nova Esports", role: "Rifler", kd: 1.24, winrate: 59, rating: 1.16, country: "Malaysia", age: 22, avatar: "https://i.pravatar.cc/150?img=17" },
  { id: 25, nick: "Eclipse", realName: "Puvaneswaran A/L Muniandy", team: "Nova Esports", role: "Support", kd: 1.06, winrate: 56, rating: 1.02, country: "Malaysia", age: 25, avatar: "https://i.pravatar.cc/150?img=42" },

  // Aspire Esports (5)
  { id: 26, nick: "Alpha", realName: "Syafiq Bin Osman", team: "Aspire Esports", role: "IGL", kd: 1.19, winrate: 52, rating: 1.13, country: "Malaysia", age: 26, avatar: "https://i.pravatar.cc/150?img=59" },
  { id: 27, nick: "Peak", realName: "Chong Xin Yi", team: "Aspire Esports", role: "AWPer", kd: 1.34, winrate: 54, rating: 1.26, country: "Malaysia", age: 21, avatar: "https://i.pravatar.cc/150?img=44" },
  { id: 28, nick: "Summit", realName: "Muhammad Danish", team: "Aspire Esports", role: "Rifler", kd: 1.21, winrate: 53, rating: 1.14, country: "Malaysia", age: 22, avatar: "https://i.pravatar.cc/150?img=28" },
  { id: 29, nick: "Climber", realName: "Yap Wei Lun", team: "Aspire Esports", role: "Entry Fragger", kd: 1.27, winrate: 51, rating: 1.18, country: "Malaysia", age: 20, avatar: "https://i.pravatar.cc/150?img=31" },
  { id: 30, nick: "Horizon", realName: "Nurul Izzati", team: "Aspire Esports", role: "Support", kd: 1.04, winrate: 50, rating: 0.99, country: "Malaysia", age: 23, avatar: "https://i.pravatar.cc/150?img=50" }
];

// ===== EVENTS / MATCHES (Timeline style) =====
const MATCHES = [
  {
    id: 1,
    eventName: "APEX National Championship 2026 - Quarter Finals",
    team1: "Arctic Wolves",
    team2: "Inferno Dragons",
    banner: IMG.eventMatch1,
    venue: "National Esports Stadium",
    city: "Kuala Lumpur",
    date: "2026-09-15",
    time: "19:00",
    format: "BO3",
    prize: "RM 100,000",
    status: "upcoming",
    round: "Quarter Final"
  },
  {
    id: 2,
    eventName: "APEX National Championship 2026 - Quarter Finals",
    team1: "Golden Falcons",
    team2: "Ocean Titans",
    banner: IMG.eventMatch2,
    venue: "Penang Esports Centre",
    city: "Penang",
    date: "2026-09-15",
    time: "21:30",
    format: "BO3",
    prize: "RM 100,000",
    status: "upcoming",
    round: "Quarter Final"
  },
  {
    id: 3,
    eventName: "APEX National Championship 2026 - Quarter Finals",
    team1: "Nova Esports",
    team2: "Aspire Esports",
    banner: IMG.eventMatch3,
    venue: "Penang Arena",
    city: "Penang",
    date: "2026-09-16",
    time: "19:00",
    format: "BO3",
    prize: "RM 100,000",
    status: "upcoming",
    round: "Quarter Final"
  },
  {
    id: 4,
    eventName: "Summer Showdown Season 2 - Semi Finals",
    team1: "Arctic Wolves",
    team2: "Golden Falcons",
    banner: IMG.eventMatch1,
    venue: "Kuala Lumpur Arena",
    city: "Kuala Lumpur",
    date: "2026-08-22",
    time: "20:00",
    format: "BO3",
    prize: "RM 25,000",
    status: "upcoming",
    round: "Semi Final"
  },
  {
    id: 5,
    eventName: "Summer Showdown Season 2 - Semi Finals",
    team1: "Inferno Dragons",
    team2: "Ocean Titans",
    banner: IMG.eventMatch2,
    venue: "National Esports Stadium",
    city: "Kuala Lumpur",
    date: "2026-08-23",
    time: "20:00",
    format: "BO3",
    prize: "RM 25,000",
    status: "upcoming",
    round: "Semi Final"
  },
  {
    id: 6,
    eventName: "Rookie Cup August - Grand Finals",
    team1: "Nova Esports",
    team2: "Aspire Esports",
    banner: IMG.eventMatch3,
    venue: "Penang Esports Centre",
    city: "Penang",
    date: "2026-08-30",
    time: "18:00",
    format: "BO5",
    prize: "RM 10,000",
    status: "upcoming",
    round: "Grand Final"
  },
  {
    id: 7,
    eventName: "Penang Esports Festival - Opening Match",
    team1: "Golden Falcons",
    team2: "Nova Esports",
    banner: IMG.eventMatch2,
    venue: "SPICE Arena",
    city: "Penang",
    date: "2026-10-05",
    time: "14:00",
    format: "BO3",
    prize: "RM 50,000",
    status: "upcoming",
    round: "Group Stage"
  },
  {
    id: 8,
    eventName: "National Qualifiers - Week 3",
    team1: "Arctic Wolves",
    team2: "Ocean Titans",
    banner: IMG.eventMatch1,
    venue: "Online",
    city: "Online",
    date: "2026-08-13",
    time: "21:00",
    format: "BO1",
    prize: "RM 15,000",
    status: "ongoing",
    round: "Qualifier"
  },
  {
    id: 9,
    eventName: "Spring Invitational 2026 - Grand Final",
    team1: "Arctic Wolves",
    team2: "Inferno Dragons",
    banner: IMG.eventMatch1,
    venue: "National Esports Stadium",
    city: "Kuala Lumpur",
    date: "2026-04-15",
    time: "19:00",
    format: "BO5",
    prize: "RM 40,000",
    status: "past",
    round: "Grand Final",
    winner: "Arctic Wolves",
    score: "3-1"
  }
];

// ===== EVENTS (Tournament-level) =====
const EVENTS = [
  { id: 1, name: "APEX National Championship 2026", date: "2026-09-15", endDate: "2026-09-20", location: "National Esports Stadium, Kuala Lumpur", status: "upcoming", prize: "RM 100,000", teams: 16, format: "BO3 Group Stage + Playoffs", desc: "The biggest CS2 tournament in Malaysia. Top 16 teams compete for the national title and a spot in the SEA qualifiers.", banner: IMG.eventMatch1 },
  { id: 2, name: "Summer Showdown Season 2", date: "2026-08-20", endDate: "2026-08-25", location: "Online", status: "upcoming", prize: "RM 25,000", teams: 8, format: "BO3 Double Elimination", desc: "Online tournament open to all registered teams. Great opportunity for amateur teams to gain ranking points.", banner: IMG.eventMatch2 },
  { id: 3, name: "Rookie Cup August", date: "2026-08-28", endDate: "2026-08-30", location: "Online", status: "upcoming", prize: "RM 10,000", teams: 32, format: "BO1 Swiss + BO3 Finals", desc: "For teams outside the top 8 rankings. Perfect for new and rising teams to prove themselves.", banner: IMG.eventMatch3 },
  { id: 4, name: "Penang Esports Festival", date: "2026-10-05", endDate: "2026-10-07", location: "SPICE Arena, Penang", status: "upcoming", prize: "RM 50,000", teams: 12, format: "BO3 Group + Playoffs", desc: "LAN event in Penang featuring top Malaysian teams plus invited SEA teams.", banner: IMG.eventMatch2 },
  { id: 5, name: "National Qualifiers - Week 3", date: "2026-08-12", endDate: "2026-08-14", location: "Online", status: "ongoing", prize: "RM 15,000", teams: 24, format: "BO1 Swiss", desc: "Weekly qualifying circuit for the National Championship. Top 4 advance.", banner: IMG.eventMatch3 },
  { id: 6, name: "Spring Invitational 2026", date: "2026-04-10", endDate: "2026-04-15", location: "Kuala Lumpur Arena", status: "past", prize: "RM 40,000", teams: 10, format: "BO3 Round Robin", winner: "Arctic Wolves", desc: "Invitation-only event featuring the top 10 teams from the 2025 season.", banner: IMG.eventMatch1 }
];

// ===== PRODUCTS / TICKETS =====
const PRODUCTS = [
  { id: 1, name: "APEX National Championship - 1 Day Pass", price: 45.00, img: "🎟️", category: "Tickets", desc: "Single day pass to the APEX National Championship 2026. Access to all matches that day.", banner: IMG.eventMatch1 },
  { id: 2, name: "APEX National Championship - Full Event Pass", price: 180.00, img: "🎫", category: "Tickets", desc: "Full 5-day pass including all group stage and playoff matches. Priority seating.", banner: IMG.eventMatch1 },
  { id: 3, name: "VIP Meet & Greet Package", price: 299.00, img: "⭐", category: "Tickets", desc: "Full event ticket + exclusive meet and greet with pro players + merch bundle + backstage access.", banner: IMG.eventMatch2 },
  { id: 4, name: "Penang Esports Festival - Weekend Pass", price: 80.00, img: "🎪", category: "Tickets", desc: "2-day weekend pass to the Penang Esports Festival at SPICE Arena.", banner: IMG.eventMatch2 },
  { id: 5, name: "Summer Showdown - Online Viewing Pass", price: 15.00, img: "📺", category: "Tickets", desc: "Premium streaming access with multi-view, player POVs, and exclusive commentary.", banner: IMG.eventMatch3 },
  { id: 6, name: "APEX FORCE ESPORT Jersey 2026", price: 129.90, img: "👕", category: "Apparel", desc: "Official 2026 season jersey with customizable name and number. Moisture-wicking fabric.", banner: IMG.cs2Banner },
  { id: 7, name: "APEX FORCE ESPORT Hoodie", price: 159.90, img: "🧥", category: "Apparel", desc: "Premium cotton blend hoodie with embroidered logo. Warm and stylish.", banner: IMG.cs2Banner },
  { id: 8, name: "Pro Player Mousepad XL", price: 79.90, img: "🖱️", category: "Accessories", desc: "Extended size mousepad with official league artwork. 900x400mm, stitched edges.", banner: IMG.cs2Banner }
];

// ===== TWEETS =====
const TWEETS = [
  { handle: "@APEXForceMY", text: "🏆 The National Championship 2026 bracket is LIVE! Check out the group stage matchups on our events page. #CS2MY #EsportsMY", time: "2h ago" },
  { handle: "@APEXForceMY", text: "🔥 Arctic Wolves extend their winning streak to 8 matches! Can anyone stop them? Catch the action this weekend. #CS2MY", time: "5h ago" },
  { handle: "@APEXForceMY", text: "📢 Registration for Rookie Cup August is now OPEN! Amateur teams, this is your chance to shine. Link in bio. #CS2MY", time: "1d ago" },
  { handle: "@APEXForceMY", text: "🎮 Shoutout to @FrostByte_CS2 for hitting a 1.42 K/D ratio this month! Absolute monster with the AWP. #CS2MY #MVP", time: "2d ago" }
];

// ===== SUBSCRIPTION PLANS =====
const SUB_PLANS = [
  {
    name: "Free",
    price: 0,
    period: "forever",
    features: [
      { text: "Browse rankings and events", enabled: true },
      { text: "Watch free stream highlights", enabled: true },
      { text: "Basic match notifications", enabled: true },
      { text: "Multi-view streaming", enabled: false },
      { text: "Player POV access", enabled: false },
      { text: "Exclusive behind-the-scenes", enabled: false },
      { text: "Early ticket access", enabled: false },
      { text: "Merchandise discount", enabled: false }
    ]
  },
  {
    name: "Pro Fan",
    price: 19.90,
    period: "month",
    featured: true,
    features: [
      { text: "Browse rankings and events", enabled: true },
      { text: "Watch free stream highlights", enabled: true },
      { text: "Basic match notifications", enabled: true },
      { text: "Multi-view streaming", enabled: true },
      { text: "Player POV access", enabled: true },
      { text: "Exclusive behind-the-scenes", enabled: true },
      { text: "Early ticket access (24h)", enabled: true },
      { text: "Merchandise discount", enabled: false }
    ]
  },
  {
    name: "Ultimate",
    price: 49.90,
    period: "month",
    features: [
      { text: "Browse rankings and events", enabled: true },
      { text: "Watch free stream highlights", enabled: true },
      { text: "Basic match notifications", enabled: true },
      { text: "Multi-view streaming", enabled: true },
      { text: "Player POV access", enabled: true },
      { text: "Exclusive behind-the-scenes", enabled: true },
      { text: "Early ticket access (48h)", enabled: true },
      { text: "15% merchandise discount", enabled: true }
    ]
  }
];
