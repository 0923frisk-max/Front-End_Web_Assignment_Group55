/* ============================================
   APEX FORCE ESPORT - Shared JavaScript
   ============================================ */

// ===== STORAGE HELPERS =====
function setCookie(name, value, days) {
  const d = new Date();
  d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
  document.cookie = name + "=" + encodeURIComponent(value) + ";expires=" + d.toUTCString() + ";path=/";
}
function getCookie(name) {
  const cname = name + "=";
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i].trim();
    if (c.indexOf(cname) === 0) return decodeURIComponent(c.substring(cname.length));
  }
  return "";
}
function deleteCookie(name) { setCookie(name, "", -1); }
function getLS(key, def) {
  try { return JSON.parse(localStorage.getItem(key)) || def; } catch(e) { return def; }
}
function setLS(key, val) { localStorage.setItem(key, JSON.stringify(val)); }
function getSS(key, def) {
  try { return JSON.parse(sessionStorage.getItem(key)) || def; } catch(e) { return def; }
}
function setSS(key, val) { sessionStorage.setItem(key, JSON.stringify(val)); }

// ===== AUTH =====
let currentUser = null;

function initUsers() {
  if (!getLS('cs2_users', null)) {
    setLS('cs2_users', [{
      username:"demo",
      email:"demo@apexforce.my",
      password:"demo123",
      steam:"STEAM_0:1:12345678",
      role:"player",
      avatar: IMG.defaultProfile,
      bio:"Passionate CS2 player and demo account user. APEX FORCE ESPORT fan!",
      rank:"Legendary Eagle",
      position:"AWPer",
      createdAt:new Date().toISOString()
    }]);
  }
}

function handleLogin(e) {
  e.preventDefault();
  const user = document.getElementById('loginUser').value.trim();
  const pass = document.getElementById('loginPass').value;
  const remember = document.getElementById('rememberMe').checked;
  const users = getLS('cs2_users', []);
  const found = users.find(u => (u.username === user || u.email === user) && u.password === pass);
  if (found) {
    currentUser = found;
    setSS('cs2_currentUser', found);
    if (remember) setCookie('cs2_remember', found.username, 7);
    else deleteCookie('cs2_remember');
    showToast("Welcome back, " + found.username + "!");
    setTimeout(() => { window.location.href = 'profile.html'; }, 800);
  } else {
    showToast("Invalid username or password!", "error");
  }
}

function handleRegister(e) {
  e.preventDefault();
  const username = document.getElementById('regUser').value.trim();
  const email = document.getElementById('regEmail').value.trim();
  const pass = document.getElementById('regPass').value;
  const pass2 = document.getElementById('regPass2').value;
  if (pass !== pass2) { showToast("Passwords do not match!", "error"); return; }
  const users = getLS('cs2_users', []);
  if (users.find(u => u.username === username)) { showToast("Username already taken!", "error"); return; }
  if (users.find(u => u.email === email)) { showToast("Email already registered!", "error"); return; }
  const newUser = {
    username, email, password: pass,
    steam: document.getElementById('regSteam').value,
    role: document.getElementById('regRole').value,
    avatar: IMG.defaultProfile,
    bio: "", rank: "Silver", position: "Rifler",
    createdAt: new Date().toISOString()
  };
  users.push(newUser);
  setLS('cs2_users', users);
  currentUser = newUser;
  setSS('cs2_currentUser', newUser);
  showToast("Account created! Welcome, " + username + "!");
  setTimeout(() => { window.location.href = 'profile.html'; }, 800);
}

function logout() {
  currentUser = null;
  sessionStorage.removeItem('cs2_currentUser');
  deleteCookie('cs2_remember');
  updateAuthUI();
  showToast("Logged out successfully");
  setTimeout(() => { window.location.href = 'index.html'; }, 500);
}

function updateAuthUI() {
  const navAuth = document.getElementById('navAuth');
  const navUser = document.getElementById('navUser');
  if (!navAuth || !navUser) return;
  if (currentUser) {
    navAuth.classList.add('d-none');
    navUser.classList.remove('d-none');
    navUser.classList.add('d-flex');
    const avatarEl = document.getElementById('navAvatar');
    if (avatarEl) avatarEl.src = currentUser.avatar || IMG.defaultProfile;
  } else {
    navAuth.classList.remove('d-none');
    navUser.classList.add('d-none');
    navUser.classList.remove('d-flex');
  }
}

function togglePassword(inputId, iconEl) {
  const input = document.getElementById(inputId);
  const showing = input.type === 'text';
  input.type = showing ? 'password' : 'text';
  iconEl.classList.toggle('fa-eye', showing);
  iconEl.classList.toggle('fa-eye-slash', !showing);
}

function switchAuthTab(tab) {
  document.querySelectorAll('.auth-tab').forEach(t => t.classList.remove('active'));
  const loginForm = document.getElementById('loginForm');
  const regForm = document.getElementById('registerForm');
  if (tab === 'login') {
    document.getElementById('tabLogin').classList.add('active');
    loginForm.style.display = 'block';
    regForm.style.display = 'none';
  } else {
    document.getElementById('tabRegister').classList.add('active');
    loginForm.style.display = 'none';
    regForm.style.display = 'block';
  }
}

// ===== PROFILE =====
function loadProfile() {
  if (!currentUser) { window.location.href = 'login.html'; return; }
  const avatar = document.getElementById('profileAvatar');
  if (avatar) avatar.src = currentUser.avatar || IMG.defaultProfile;
  const nameEl = document.getElementById('profileName');
  if (nameEl) nameEl.textContent = currentUser.username;
  const steamEl = document.getElementById('profileSteam');
  if (steamEl) steamEl.textContent = currentUser.steam || 'Not linked';
  const emailEl = document.getElementById('profileEmail');
  if (emailEl) emailEl.textContent = currentUser.email;
  const bioEl = document.getElementById('profileBio');
  if (bioEl) bioEl.textContent = currentUser.bio || '';
  const roleEl = document.getElementById('profileRoleBadge');
  if (roleEl) roleEl.textContent = currentUser.role.charAt(0).toUpperCase() + currentUser.role.slice(1);
  const editName = document.getElementById('editName');
  if (editName) editName.value = currentUser.username;
  const editEmail = document.getElementById('editEmail');
  if (editEmail) editEmail.value = currentUser.email;
  const editAvatar = document.getElementById('editAvatar');
  if (editAvatar) editAvatar.value = currentUser.avatar || '';
  const editBio = document.getElementById('editBio');
  if (editBio) editBio.value = currentUser.bio || '';
  const editSteam = document.getElementById('editSteam');
  if (editSteam) editSteam.value = currentUser.steam || '';
  const editRank = document.getElementById('editRank');
  if (editRank) editRank.value = currentUser.rank || 'Silver';
  const editPosition = document.getElementById('editPosition');
  if (editPosition) editPosition.value = currentUser.position || 'Rifler';
  const statSince = document.getElementById('statSince');
  if (statSince && currentUser.createdAt) {
    statSince.textContent = new Date(currentUser.createdAt).toLocaleDateString();
  }
  renderFavorites();
  renderFavoritePlayers();

}

// ===== RESTFUL API: randomuser.me (jQuery $.ajax GET) =====
function fetchRandomAvatar() {
  const btn = document.getElementById('randomAvatarBtn');
  const status = document.getElementById('avatarApiStatus');
  if (btn) { btn.disabled = true; btn.innerHTML = '<i class="fas fa-spinner fa-spin me-1"></i>Loading...'; }
  if (status) status.textContent = 'Calling https://randomuser.me/api/ ...';
  $.ajax({
    url: 'https://randomuser.me/api/',
    method: 'GET',
    dataType: 'json',
    success: function(res) {
      const person = res && res.results && res.results[0];
      const photoUrl = person ? person.picture.large : '';
      const editAvatar = document.getElementById('editAvatar');
      const preview = document.getElementById('profileAvatar');
      if (photoUrl) {
        if (editAvatar) editAvatar.value = photoUrl;
        if (preview) preview.src = photoUrl;
        if (status) status.textContent = `Loaded avatar for ${person.name.first} ${person.name.last} (via randomuser.me REST API)`;
        showToast('Random avatar fetched from randomuser.me API');
      } else if (status) {
        status.textContent = 'No result returned from API.';
      }
    },
    error: function() {
      if (status) status.textContent = 'Failed to reach randomuser.me API. Check your connection.';
      showToast('randomuser.me API request failed');
    },
    complete: function() {
      if (btn) { btn.disabled = false; btn.innerHTML = '<i class="fas fa-random me-1"></i>Randomize (randomuser.me API)'; }
    }
  });
}

// ===== RESTFUL API: GitHub Users API (jQuery $.ajax GET) =====
function fetchGithubUser() {
  const usernameInput = document.getElementById('githubUsername');
  const result = document.getElementById('githubResult');
  if (!usernameInput || !result) return;
  const username = usernameInput.value.trim();
  if (!username) { result.innerHTML = '<p style="color:var(--danger)">Please enter a GitHub username.</p>'; return; }
  result.innerHTML = '<p style="color:var(--text-secondary)"><i class="fas fa-spinner fa-spin me-1"></i>Calling https://api.github.com/users/' + username + ' ...</p>';
  $.ajax({
    url: 'https://api.github.com/users/' + encodeURIComponent(username),
    method: 'GET',
    dataType: 'json',
    success: function(user) {
      result.innerHTML = `
        <div class="d-flex align-items-center gap-3">
          <img src="${user.avatar_url}" alt="${user.login}" style="width:64px;height:64px;border-radius:50%;object-fit:cover;border:2px solid var(--primary)">
          <div>
            <strong>${user.name || user.login}</strong> <span style="color:var(--text-secondary)">@${user.login}</span>
            <p class="mb-0" style="color:var(--text-secondary);font-size:0.85rem">${user.bio || 'No bio available'}</p>
            <p class="mb-0" style="font-size:0.8rem">
              <i class="fas fa-code-branch me-1"></i>${user.public_repos} repos &nbsp;
              <i class="fas fa-users me-1"></i>${user.followers} followers &nbsp;
              <a href="${user.html_url}" target="_blank">View on GitHub</a>
            </p>
          </div>
        </div>`;
    },
    error: function(xhr) {
      result.innerHTML = `<p style="color:var(--danger)">GitHub API error: ${xhr.status === 404 ? 'User not found' : 'Request failed'}</p>`;
    }
  });
}

// ===== RESTFUL API: Country Info (jQuery $.ajax GET) =====
function fetchCountryInfo() {
  const queryInput = document.getElementById('countryQuery');
  const result = document.getElementById('countryResult');
  if (!queryInput || !result) return;

  const query = queryInput.value.trim();
  if (!query) {
    result.innerHTML = '<p style="color:var(--danger)">Please enter a country name.</p>';
    return;
  }

  result.innerHTML = '<p style="color:var(--text-secondary)"><i class="fas fa-spinner fa-spin me-1"></i>Loading country information...</p>';

  // The old restcountries.com/v3.1 endpoint is no longer reliable.
  // Use APICountries instead; it is a public RESTful country-data API and
  // does not require exposing an API key in this frontend assignment.
  const apiUrl = 'https://www.apicountries.com/name/' + encodeURIComponent(query);

  function renderCountry(c) {
    if (!c) {
      result.innerHTML = '<p style="color:var(--danger)">Country not found.</p>';
      return;
    }

    // Support both the APICountries response shape and REST Countries-like shapes.
    const countryName = typeof c.name === 'string'
      ? c.name
      : (c.name && (c.name.common || c.name.official)) || query;

    const capital = Array.isArray(c.capital)
      ? (c.capital[0] || 'N/A')
      : (c.capital || 'N/A');

    const region = c.region || c.subregion || 'N/A';
    const population = Number(c.population || 0);

    let languages = 'N/A';
    if (Array.isArray(c.languages)) {
      languages = c.languages.map(lang => lang.name || lang.nativeName || lang).filter(Boolean).join(', ') || 'N/A';
    } else if (c.languages && typeof c.languages === 'object') {
      languages = Object.values(c.languages).join(', ') || 'N/A';
    }

    // Build a valid flag IMAGE URL. Some country datasets return c.flag as
    // an emoji (e.g. 🇲🇾), which cannot be used as an <img src>.
    const alpha2Code = (c.alpha2Code || c.cca2 || (c.codes && c.codes.alpha_2) || '').toLowerCase();
    const directFlagUrl =
      (c.flags && (c.flags.svg || c.flags.png)) ||
      (c.flag && typeof c.flag === 'object' && (c.flag.svg || c.flag.png)) ||
      (typeof c.flag === 'string' && /^https?:\/\//i.test(c.flag) ? c.flag : '');

    const flagUrl = directFlagUrl ||
      (alpha2Code ? `https://flagcdn.com/${alpha2Code}.svg` : '');

    const flagHtml = flagUrl
      ? `<img src="${flagUrl}" alt="${countryName} flag" style="width:64px;height:44px;object-fit:cover;border-radius:4px;border:1px solid var(--border)">`
      : '<div style="width:64px;height:44px;display:flex;align-items:center;justify-content:center;border:1px solid var(--border);border-radius:4px"><i class="fas fa-flag"></i></div>';

    result.innerHTML = `
      <div class="d-flex align-items-center gap-3">
        ${flagHtml}
        <div>
          <strong>${countryName}</strong>
          <p class="mb-0" style="color:var(--text-secondary);font-size:0.85rem">
            Capital: ${capital} &bull; Region: ${region} &bull; Population: ${population ? population.toLocaleString() : 'N/A'}<br>
            Languages: ${languages}
          </p>
        </div>
      </div>`;
  }

  $.ajax({
    url: apiUrl,
    method: 'GET',
    dataType: 'json',
    timeout: 10000,
    success: function(res) {
      const c = Array.isArray(res) ? res[0] : (res && res.data ? (Array.isArray(res.data) ? res.data[0] : res.data) : res);
      renderCountry(c);
    },
    error: function() {
      // Fallback dataset keeps the demo usable if the public API is temporarily unavailable.
      $.ajax({
        url: 'https://raw.githubusercontent.com/mledoze/countries/master/countries.json',
        method: 'GET',
        dataType: 'json',
        timeout: 10000,
        success: function(data) {
          const list = Array.isArray(data) ? data : (data && Array.isArray(data.data) ? data.data : []);
          const q = query.toLowerCase();
          const c = list.find(item => {
            const name = typeof item.name === 'string'
              ? item.name
              : (item.name && item.name.common) || '';
            return name.toLowerCase() === q;
          }) || list.find(item => {
            const name = typeof item.name === 'string'
              ? item.name
              : (item.name && item.name.common) || '';
            return name.toLowerCase().includes(q);
          });

          if (c) renderCountry(c);
          else result.innerHTML = '<p style="color:var(--danger)">Country not found.</p>';
        },
        error: function() {
          result.innerHTML = '<p style="color:var(--danger)">Country information request failed. Please check your internet connection and try again.</p>';
        }
      });
    }
  });
}


// ===== RESTFUL API: REST Countries - League Country Info (ranking.html) =====
function loadLeagueCountryInfo() {
  const card = document.getElementById('leagueCountryCard');
  console.log(card)
  if (!card) return;
  $.ajax({
    url: 'https://countries.dev/name/Malaysia',
    method: 'GET',
    dataType: 'json',
    success: function(res) {
      const c = Array.isArray(res) ? res[0] : res;
      if (!c || !c.name) { card.innerHTML = '<p style="color:var(--danger);margin:0">Country data not found.</p>'; return; }
      const languages = Array.isArray(c.languages) ? c.languages.map(l => l.name).join(', ') : 'N/A';
      const flagUrl = (c.flags && (c.flags.svg || c.flags.png)) || '';
      card.innerHTML = `
        <div class="d-flex align-items-center gap-3 flex-wrap">
          ${flagUrl ? `<img src="${flagUrl}" alt="${c.name} flag" style="width:72px;height:48px;object-fit:cover;border-radius:6px;border:1px solid var(--border)">` : ''}
          <div class="flex-grow-1">
            <h6 class="mb-1"><i class="fas fa-trophy me-2" style="color:var(--primary)"></i>${c.name} - Host of APEX FORCE ESPORT CS2 League</h6>
            <p class="mb-0" style="color:var(--text-secondary);font-size:0.85rem">
              Capital: ${c.capital || 'N/A'} &bull; Region: ${c.subregion || c.region} &bull; Population: ${(c.population || 0).toLocaleString()}<br>
              Languages: ${languages}
            </p>
          </div>
          <span class="badge" style="background:rgba(255,107,0,0.15);color:var(--primary);font-size:0.7rem">via countries.dev API</span>
        </div>`;
    },
    error: function() {
      card.innerHTML = '<p style="color:var(--danger);margin:0">Failed to load country info from countries.dev API.</p>';
    }
  });
}
loadLeagueCountryInfo();


// ===== RESTFUL API: QuickChart.io - Player Role Performance Chart (ranking.html) =====
function renderRoleStatsChart() {
  const wrap = document.getElementById('roleStatsChartWrap');
  const img = document.getElementById('roleStatsChart');
  if (!wrap || !img) return;
  const msgEl = wrap.querySelector('p');

  const showKD = document.getElementById('statToggleKD')?.checked;
  const showWinRate = document.getElementById('statToggleWinRate')?.checked;
  const showRating = document.getElementById('statToggleRating')?.checked;

  if (!showKD && !showWinRate && !showRating) {
    img.style.display = 'none';
    if (msgEl) { msgEl.style.display = 'block'; msgEl.innerHTML = '<span style="color:var(--text-secondary)">Select at least one stat to display the chart.</span>'; }
    return;
  }

  const roles = ['AWPer', 'Rifler', 'IGL', 'Support', 'Lurker', 'Entry Fragger'];
  const avg = arr => arr.length ? arr.reduce((a, b) => a + b, 0) / arr.length : 0;

  const kdData = [], winRateData = [], ratingData = [];
  roles.forEach(role => {
    const group = PLAYERS.filter(p => p.role === role);
    kdData.push(+avg(group.map(p => p.kd)).toFixed(2));
    winRateData.push(+avg(group.map(p => p.winrate)).toFixed(1));
    ratingData.push(+avg(group.map(p => p.rating)).toFixed(2));
  });

  // Build datasets based on which checkboxes are selected
  const hasLeftAxisMetric = showKD || showRating; // K/D & Rating share a left axis (similar scale)
  const datasets = [];
  const titleParts = [];
  if (showKD) { datasets.push({ label: 'K/D', data: kdData, backgroundColor: '#FF6B00', yAxisID: 'y-kd' }); titleParts.push('K/D'); }
  if (showRating) { datasets.push({ label: 'Rating', data: ratingData, backgroundColor: '#4299E1', yAxisID: 'y-kd' }); titleParts.push('Rating'); }
  if (showWinRate) { datasets.push({ label: 'Win Rate (%)', data: winRateData, backgroundColor: '#48BB78', yAxisID: 'y-pct' }); titleParts.push('Win Rate'); }

  // Build the Y axes to match exactly what's being shown
  const yAxes = [];
  if (hasLeftAxisMetric) {
    yAxes.push({ id: 'y-kd', type: 'linear', position: 'left', ticks: { fontColor: '#ffffff', beginAtZero: true }, gridLines: { color: 'rgba(255,255,255,0.08)' }, scaleLabel: { display: true, labelString: showKD && showRating ? 'K/D & Rating' : (showKD ? 'K/D' : 'Rating'), fontColor: '#ffffff' } });
  }
  if (showWinRate) {
    yAxes.push({ id: 'y-pct', type: 'linear', position: hasLeftAxisMetric ? 'right' : 'left', ticks: { fontColor: '#ffffff', beginAtZero: true, max: 100 }, gridLines: { drawOnChartArea: !hasLeftAxisMetric, color: 'rgba(255,255,255,0.08)' }, scaleLabel: { display: true, labelString: 'Win Rate (%)', fontColor: '#ffffff' } });
  }

  const chartConfig = {
    type: 'bar',
    data: { labels: roles, datasets: datasets },
    options: {
      title: { display: true, text: 'Average ' + titleParts.join(' + ') + ' by Player Role', fontColor: '#ffffff', fontSize: 16 },
      legend: { labels: { fontColor: '#ffffff' } },
      scales: {
        xAxes: [{ ticks: { fontColor: '#ffffff' }, gridLines: { color: 'rgba(255,255,255,0.08)' } }],
        yAxes: yAxes
      }
    }
  };

  const quickChartURL = 'https://quickchart.io/chart?width=900&height=420&devicePixelRatio=2&backgroundColor=%2312161f&format=png&c=';
  const url = quickChartURL + encodeURIComponent(JSON.stringify(chartConfig));

  if (msgEl) { msgEl.style.display = 'block'; 
    msgEl.innerHTML = '<i class="fas fa-spinner fa-spin me-1"></i>Loading chart from QuickChart.io API...'; 
  }
  img.style.display = 'none';

  $.ajax({
    url: url,
    method: 'GET',
    xhrFields: { responseType: 'blob' }, // tell jQuery to hand back a raw Blob instead of trying to parse text/JSON
    success: function(blob) {
      // Clean up the previous object URL so we don't leak memory across re-renders
      if (window._roleChartObjectUrl) URL.revokeObjectURL(window._roleChartObjectUrl);
      const objectUrl = URL.createObjectURL(blob);
      window._roleChartObjectUrl = objectUrl;
      img.onload = function() {
        if (msgEl) msgEl.style.display = 'none';
        img.style.display = 'inline-block';
      };
      img.src = objectUrl;
    },
    error: function() {
      if (msgEl) msgEl.innerHTML = '<span style="color:var(--danger)">Failed to load chart from QuickChart.io API.</span>';
    }
  });
}
renderRoleStatsChart();



function saveProfile(e) {
  e.preventDefault();
  if (!currentUser) return;
  currentUser.username = document.getElementById('editName').value.trim();
  currentUser.email = document.getElementById('editEmail').value.trim();
  currentUser.avatar = document.getElementById('editAvatar').value.trim();
  currentUser.bio = document.getElementById('editBio').value.trim();
  currentUser.steam = document.getElementById('editSteam').value.trim();
  currentUser.rank = document.getElementById('editRank').value;
  currentUser.position = document.getElementById('editPosition').value;
  const users = getLS('cs2_users', []);
  const idx = users.findIndex(u => u.email === currentUser.email || u.username === currentUser.username);
  if (idx >= 0) users[idx] = currentUser;
  setLS('cs2_users', users);
  setSS('cs2_currentUser', currentUser);
  loadProfile();
  updateAuthUI();
  showToast("Profile updated successfully!");
}

function switchProfileTab(tab, el) {
  document.querySelectorAll('.profile-nav-item').forEach(i => i.classList.remove('active'));
  document.querySelectorAll('.profile-section').forEach(s => s.classList.remove('active'));
  el.classList.add('active');
  document.getElementById('profile-' + tab).classList.add('active');
}

function changePassword(e) {
  e.preventDefault();
  const cur = document.getElementById('curPass').value;
  const nw = document.getElementById('newPass').value;
  if (cur !== currentUser.password) { showToast("Current password incorrect!", "error"); return; }
  currentUser.password = nw;
  const users = getLS('cs2_users', []);
  const idx = users.findIndex(u => u.email === currentUser.email);
  if (idx >= 0) users[idx] = currentUser;
  setLS('cs2_users', users);
  setSS('cs2_currentUser', currentUser);
  showToast("Password changed successfully!");
  e.target.reset();
}

// ===== RANKINGS =====
function renderRankings() {
  const search = (document.getElementById('rankSearch')?.value || '').toLowerCase();
  const sort = document.getElementById('rankSort')?.value || 'points';
  let filtered = TEAMS.filter(t => t.name.toLowerCase().includes(search) || t.region.toLowerCase().includes(search));
  if (sort === 'points') filtered.sort((a,b) => b.points - a.points);
  else if (sort === 'wins') filtered.sort((a,b) => b.wins - a.wins);
  else if (sort === 'winrate') filtered.sort((a,b) => (b.wins/(b.wins+b.losses)) - (a.wins/(a.wins+a.losses)));
  const tbody = document.getElementById('rankingsBody');
  if (tbody) {
    tbody.innerHTML = filtered.map((t, i) => {
      const wr = Math.round(t.wins / (t.wins + t.losses) * 100);
      const rankClass = i === 0 ? 'rank-1' : i === 1 ? 'rank-2' : i === 2 ? 'rank-3' : 'rank-other';
      return `<tr>
        <td><span class="rank-badge ${rankClass}">${i+1}</span></td>
        <td><img src="${t.logo}" class="team-logo-img" alt="${t.name}"> <strong>${t.name}</strong></td>
        <td><strong style="color:var(--primary)">${t.points}</strong></td>
        <td style="color:var(--success)">${t.wins}</td>
        <td style="color:var(--danger)">${t.losses}</td>
        <td>${wr}%</td>
        <td><i class="fas fa-map-marker-alt me-1" style="color:var(--text-secondary)"></i>${t.region}</td>
        <td><button class="btn btn-sm" style="border:1px solid var(--primary);color:var(--primary);background:transparent" onclick="showTeamDetail('${t.name}')">Details</button></td>
      </tr>`;
    }).join('');
  }
  const cnt = document.getElementById('rankCount');
  if (cnt) cnt.textContent = filtered.length + ' teams';
  const homeBody = document.getElementById('homeRankings');
  if (homeBody) {
    const top5 = [...TEAMS].sort((a,b) => b.points - a.points).slice(0, 5);
    homeBody.innerHTML = top5.map((t, i) => {
      const wr = Math.round(t.wins / (t.wins + t.losses) * 100);
      const rankClass = i === 0 ? 'rank-1' : i === 1 ? 'rank-2' : i === 2 ? 'rank-3' : 'rank-other';
      return `<tr><td><span class="rank-badge ${rankClass}">${i+1}</span></td><td><img src="${t.logo}" class="team-logo-img" alt="${t.name}"> <strong>${t.name}</strong></td><td><strong style="color:var(--primary)">${t.points}</strong></td><td>${t.wins}-${t.losses}</td><td>${wr}%</td><td>${t.region}</td></tr>`;
    }).join('');
  }
}

function showTeamDetail(name) {
  const t = TEAMS.find(x => x.name === name);
  if (!t) return;
  const wr = Math.round(t.wins / (t.wins + t.losses) * 100);
  const roster = PLAYERS.filter(p => p.team === name);

  const hasWebsite = Boolean(t.website);
  const websiteText = hasWebsite ? "Website / Social Media" : "No Website";
  const websiteHref = hasWebsite ? `href="${t.website}" target="_blank" rel="noopener noreferrer"` : "javascript:void(0)";
  const websiteClass = hasWebsite ? "btn-outline-custom" : "btn-outline-secondary disabled";

  document.getElementById('teamModalName').innerHTML = `<img src="${t.logo}" class="team-logo-img me-2" alt="${t.name}"> ${t.name}`;
  document.getElementById('teamModalBody').innerHTML = `
    <p style="color:var(--text-secondary)">${t.bio}</p>
    <p style="font-style:italic;color:${t.color};font-weight:600;font-size:0.85rem">"${t.tagline}"</p>
    <div class="row g-3 mb-3">
      <div class="col-4 text-center"><div style="font-size:1.5rem;font-weight:800;color:var(--primary)">${t.points}</div><small style="color:var(--text-secondary)">Points</small></div>
      <div class="col-4 text-center"><div style="font-size:1.5rem;font-weight:800;color:var(--success)">${t.wins}</div><small style="color:var(--text-secondary)">Wins</small></div>
      <div class="col-4 text-center"><div style="font-size:1.5rem;font-weight:800">${wr}%</div><small style="color:var(--text-secondary)">Win Rate</small></div>
    </div>
    <div class="d-flex justify-content-between align-items-center flex-wrap gap-2">
      <div>
        <strong>Region:</strong> ${t.region} | <strong>Founded:</strong> ${t.founded} | <strong>Captain:</strong> ${t.captain}
      </div>
      <a ${websiteHref} class="btn btn-sm ${websiteClass} d-flex align-items-center gap-1" title="${hasWebsite ? 'Visit ' + t.name + ' website' : 'No website available'}">
        <i class="fas fa-globe"></i> ${websiteText}
      </a>
    </div>
    <h6 class="mt-3 mb-2">Roster (${roster.length} players)</h6>
    <div class="d-flex flex-wrap gap-2">
      ${roster.length ? roster.map(p => `<span class="badge" style="background:var(--bg-dark);padding:8px 14px;border-radius:20px;border:1px solid var(--border)"><img src="${p.avatar}" style="width:20px;height:20px;border-radius:50%;margin-right:5px;vertical-align:middle"> ${p.nick} <small style="color:var(--text-secondary)">(${p.role})</small></span>`).join('') : '<span style="color:var(--text-secondary)">No roster data</span>'}
    </div>
  `;
  new bootstrap.Modal(document.getElementById('teamModal')).show();
}

// ===== EVENTS / TIMELINE =====
let currentEventFilter = 'upcoming';

function filterEvents(filter, el) {
  currentEventFilter = filter;
  document.querySelectorAll('.nav-link[data-filter]').forEach(l => {
    l.classList.remove('active');
    l.style.color = 'var(--text-secondary)';
  });
  if (el) { el.classList.add('active'); el.style.color = 'var(--primary)'; }
  renderEvents();
}

function renderEvents() {
  const list = document.getElementById('eventsList');
  if (list) {
    const filtered = EVENTS.filter(e => e.status === currentEventFilter);
    if (filtered.length === 0) {
      list.innerHTML = '<div class="col-12 text-center py-5" style="color:var(--text-secondary)"><i class="fas fa-calendar-times" style="font-size:3rem"></i><p class="mt-3">No events found.</p></div>';
    } else {
      list.innerHTML = filtered.map(e => {
    const d = new Date(e.date);
    const favs = getLS('cs2_favorites', []);
    const isFav = favs.includes(e.id);
    return `<div class="col-md-6 col-lg-4">
      <div class="card-custom">
        <div style="background-image:url('${e.banner}');background-size:cover;background-position:center;border-radius:8px;height:140px;margin-bottom:16px;position:relative;overflow:hidden">
          <div style="position:absolute;inset:0;background:linear-gradient(to top,rgba(10,14,23,0.8),transparent)"></div>
          <span class="badge" style="position:absolute;bottom:10px;left:10px;background:rgba(255,107,0,0.9);color:#fff;padding:6px 12px;border-radius:20px;font-weight:700">${e.prize}</span>
        </div>
        <h5 class="mb-2">${e.name}</h5>
        <div class="d-flex align-items-center gap-2 mb-2">
          <div class="event-date"><div class="day">${d.getDate()}</div><div class="month">${d.toLocaleString('default',{month:'short'})}</div></div>
          <div><small style="color:var(--text-secondary)"><i class="fas fa-map-marker-alt me-1"></i>${e.location}</small></div>
        </div>
        <p style="color:var(--text-secondary);font-size:0.85rem;margin-bottom:12px">${e.desc.substring(0,80)}...</p>
        <div class="d-flex justify-content-between align-items-center mb-3">
          <span class="badge" style="background:var(--bg-dark);color:var(--text-secondary)">${e.teams} teams</span>
          <span style="color:var(--text-secondary);font-size:0.8rem">${e.format}</span>
        </div>
        <div class="d-flex gap-2">
          <button class="btn-primary-custom flex-grow-1" style="padding:8px;font-size:0.85rem" onclick="showEventDetail(${e.id})">Details</button>
          <button class="btn-outline-custom" style="padding:8px 14px" onclick="toggleFavorite(${e.id})"><i class="fas fa-star" style="color:${isFav?'var(--primary)':'var(--text-secondary)'}"></i></button>
        </div>
      </div>
    </div>`;
      }).join('');
    }
  }
  const homeList = document.getElementById('homeEvents');
  if (homeList) {
    const upcoming = EVENTS.filter(e => e.status === 'upcoming').slice(0, 3);
    homeList.innerHTML = upcoming.map(e => {
      const d = new Date(e.date);
      return `<div class="col-md-4">
        <div class="card-custom">
          <div style="background-image:url('${e.banner}');background-size:cover;background-position:center;border-radius:8px;height:120px;margin-bottom:12px;position:relative">
            <div style="position:absolute;inset:0;background:linear-gradient(to top,rgba(10,14,23,0.7),transparent)"></div>
          </div>
          <h6 class="mb-1">${e.name}</h6>
          <p style="color:var(--text-secondary);font-size:0.8rem;margin-bottom:8px"><i class="fas fa-calendar me-1"></i>${d.toLocaleDateString()} • ${e.location}</p>
          <span class="badge" style="background:rgba(255,107,0,0.2);color:var(--primary)">${e.prize}</span>
        </div>
      </div>`;
    }).join('');
  }
}

function renderMatchTimeline() {
  const timeline = document.getElementById('matchTimeline');
  if (!timeline) return;
  const filter = document.getElementById('timelineFilter')?.value || 'all';
  let matches = MATCHES;
  if (filter !== 'all') matches = MATCHES.filter(m => m.status === filter);
  // Sort by date
  matches.sort((a,b) => new Date(a.date) - new Date(b.date));
  timeline.innerHTML = matches.map((m, i) => {
    const d = new Date(m.date);
    const team1 = TEAMS.find(t => t.name === m.team1);
    const team2 = TEAMS.find(t => t.name === m.team2);
    const statusBadge = m.status === 'past'
      ? `<span class="badge" style="background:rgba(72,187,120,0.2);color:var(--success)">Final: ${m.score} - ${m.winner} wins</span>`
      : m.status === 'ongoing'
      ? `<span class="badge" style="background:rgba(239,68,68,0.2);color:#ef4444"><i class="fas fa-circle me-1" style="font-size:0.5rem;animation:pulse 1s infinite"></i>LIVE NOW</span>`
      : `<span class="badge" style="background:rgba(255,107,0,0.2);color:var(--primary)">${m.round}</span>`;
    return `<div class="timeline-item">
      <div class="timeline-dot"></div>
      <div class="timeline-card">
        <div class="timeline-match-banner" style="background-image:url('${m.banner}')">
          <div class="timeline-match-teams">
            <div class="timeline-team">
              <img src="${team1?.logo || IMG.defaultProfile}" alt="${m.team1}">
              <span class="timeline-team-name">${m.team1}</span>
            </div>
            <div class="timeline-vs">VS</div>
            <div class="timeline-team">
              <img src="${team2?.logo || IMG.defaultProfile}" alt="${m.team2}">
              <span class="timeline-team-name">${m.team2}</span>
            </div>
          </div>
        </div>
        <div class="timeline-info">
          <div class="timeline-event-name">${m.eventName}</div>
          ${statusBadge}
          <div class="timeline-meta mt-2">
            <div class="timeline-meta-item"><i class="fas fa-map-marker-alt"></i> ${m.venue}, ${m.city}</div>
            <div class="timeline-meta-item"><i class="fas fa-calendar"></i> ${d.toLocaleDateString('en-GB')}</div>
            <div class="timeline-meta-item"><i class="fas fa-trophy"></i> ${m.prize}</div>
            <div class="timeline-meta-item"><i class="fas fa-crosshairs"></i> ${m.format}</div>
          </div>
          <div class="timeline-time-badge"><i class="fas fa-clock me-1"></i>${m.time} MYT</div>
        </div>
      </div>
    </div>`;
  }).join('');
}

function showEventDetail(id) {
  const e = EVENTS.find(x => x.id === id);
  if (!e) return;
  document.getElementById('eventModalName').textContent = e.name;
  const isPast = e.status === 'past';
  document.getElementById('eventModalBody').innerHTML = `
    <div style="background-image:url('${e.banner}');background-size:cover;background-position:center;height:160px;border-radius:8px;margin-bottom:16px;position:relative">
      <div style="position:absolute;inset:0;background:linear-gradient(to top,rgba(10,14,23,0.8),transparent)"></div>
    </div>
    <p style="color:var(--text-secondary)">${e.desc}</p>
    <div class="row g-3 mb-3">
      <div class="col-md-6"><strong>Date:</strong> ${new Date(e.date).toLocaleDateString()}${e.endDate ? ' - ' + new Date(e.endDate).toLocaleDateString() : ''}</div>
      <div class="col-md-6"><strong>Location:</strong> ${e.location}</div>
      <div class="col-md-6"><strong>Prize Pool:</strong> <span style="color:var(--primary)">${e.prize}</span></div>
      <div class="col-md-6"><strong>Teams:</strong> ${e.teams}</div>
      <div class="col-12"><strong>Format:</strong> ${e.format}</div>
    </div>
    ${isPast ? `<div class="alert" style="background:rgba(72,187,120,0.1);border:1px solid var(--success);color:var(--success)"><i class="fas fa-trophy me-2"></i>Winner: <strong>${e.winner}</strong></div>` : ''}
    ${!isPast ? `<a href="tickets.html" class="btn-primary-custom w-100 d-block text-center"><i class="fas fa-ticket-alt me-2"></i>Get Tickets</a>` : ''}
  `;
  new bootstrap.Modal(document.getElementById('eventModal')).show();
}

function registerEvent(id) {
  if (!currentUser) { showToast("Please login to register!", "error"); setTimeout(()=>{window.location.href='login.html';},800); return; }
  const regs = getLS('cs2_registrations', []);
  if (regs.find(r => r.eventId === id && r.user === currentUser.username)) {
    showToast("You're already registered for this event!");
  } else {
    regs.push({eventId: id, user: currentUser.username, date: new Date().toISOString()});
    setLS('cs2_registrations', regs);
    showToast("Successfully registered! Check your email for details.");
  }
  bootstrap.Modal.getInstance(document.getElementById('eventModal')).hide();
}

function toggleFavorite(id) {
  if (!currentUser) { showToast("Please login to save favorites!", "error"); setTimeout(()=>{window.location.href='login.html';},800); return; }
  let favs = getLS('cs2_favorites', []);
  if (favs.includes(id)) {
    favs = favs.filter(f => f !== id);
    showToast("Removed from favorites");
  } else {
    favs.push(id);
    showToast("Added to favorites!");
  }
  setLS('cs2_favorites', favs);
  renderEvents();
  renderFavorites();
}

function renderFavorites() {
  const el = document.getElementById('favEventsList');
  if (!el) return;
  const favs = getLS('cs2_favorites', []);
  const favEvents = EVENTS.filter(e => favs.includes(e.id));
  if (favEvents.length === 0) {
    el.innerHTML = '<div class="text-center py-5" style="color:var(--text-secondary)"><i class="fas fa-star" style="font-size:3rem;color:var(--border)"></i><p class="mt-3">No favorite events yet. Browse events and click the star to save them!</p><a href="events.html" class="btn-outline-custom">Browse Events</a></div>';
    return;
  }
  el.innerHTML = '<div class="row g-3">' + favEvents.map(e => {
    const d = new Date(e.date);
    return `<div class="col-md-6"><div class="card-custom d-flex align-items-center gap-3">
      <img src="${e.banner}" style="width:60px;height:60px;border-radius:8px;object-fit:cover">
      <div class="flex-grow-1"><h6 class="mb-1">${e.name}</h6><small style="color:var(--text-secondary)">${d.toLocaleDateString()} • ${e.location}</small></div>
      <button class="btn btn-sm" style="color:var(--danger)" onclick="toggleFavorite(${e.id})"><i class="fas fa-trash"></i></button>
    </div></div>`;
  }).join('') + '</div>';
}

// ===================================================== PLAYERS =====

// ===== FAVORITE PLAYERS (localStorage) =====
function isFavPlayer(id) {
  const favs = getLS('cs2_favPlayers', []);
  return favs.includes(id);
}

function toggleFavoritePlayer(id) {
  if (!currentUser) {
    showToast("Please login to save favorite players!", "error");
    setTimeout(() => { window.location.href = 'login.html'; }, 800);
    return;
  }
  let favs = getLS('cs2_favPlayers', []);
  if (favs.includes(id)) {
    favs = favs.filter(f => f !== id);
    showToast("Removed from favorite players");
  } else {
    favs.push(id);
    showToast("Added to favorite players!");
  }
  setLS('cs2_favPlayers', favs);
  renderPlayers();
  renderFavoritePlayers();
}

function renderFavoritePlayers() {
  const el = document.getElementById('favPlayersList');
  if (!el) return;
  const favs = getLS('cs2_favPlayers', []);
  const favPlayers = PLAYERS.filter(p => favs.includes(p.id));
  if (favPlayers.length === 0) {
    el.innerHTML = '<div class="text-center py-5" style="color:var(--text-secondary)"><i class="fas fa-star" style="font-size:3rem;color:var(--border)"></i><p class="mt-3">No favorite players yet. Browse players and click the star to save them!</p><a href="players.html" class="btn-outline-custom">Browse Players</a></div>';
    return;
  }
  el.innerHTML = '<div class="row g-3">' + favPlayers.map(p => {
    return `<div class="col-md-6"><div class="card-custom d-flex align-items-center gap-3">
      <img src="${p.avatar}" style="width:56px;height:56px;border-radius:50%;object-fit:cover">
      <div class="flex-grow-1"><h6 class="mb-1">${p.nick}</h6><small style="color:var(--text-secondary)">${p.team || 'No Team'} • ${p.role}</small></div>
      <button class="btn btn-sm" style="color:var(--danger)" onclick="toggleFavoritePlayer(${p.id})"><i class="fas fa-trash"></i></button>
    </div></div>`;
  }).join('') + '</div>';
}


function updatePlayerHeader() {
  const playerCountEl = document.getElementById('headerPlayerCount');
  const teamCountEl = document.getElementById('headerTeamCount');

  if (playerCountEl && teamCountEl) {
    const totalPlayers = PLAYERS.length;

    const uniqueTeams = new Set(
      PLAYERS
        .map(p => p.team)
        .filter(teamName => teamName !== "" && teamName.toLowerCase() !== "no team")
    );

    playerCountEl.textContent = totalPlayers;
    teamCountEl.textContent = uniqueTeams.size;
  }
}

function renderPlayers() {
  
  updatePlayerHeader();

  const list = document.getElementById('playersList');
  if (list) {
    const search = (document.getElementById('playerSearch')?.value || '').toLowerCase();
    const teamFilter = document.getElementById('playerTeamFilter')?.value || '';
    const roleFilter = document.getElementById('playerRoleFilter')?.value || '';
    let filtered = PLAYERS.filter(p => p.nick.toLowerCase().includes(search) || p.realName.toLowerCase().includes(search));
    if (teamFilter) filtered = filtered.filter(p => (p.team || "No Team") === teamFilter);
    //if (teamFilter) filtered = filtered.filter(p => p.team === teamFilter);
    if (roleFilter) filtered = filtered.filter(p => p.role === roleFilter);
    
    filtered.sort((a, b) => {
      if (b.kd !== a.kd) {
        return b.kd - a.kd;        
      }
      if (b.winrate !== a.winrate) {
        return b.winrate - a.winrate; 
      }
      return b.rating - a.rating;     
    });    

    list.innerHTML = filtered.map(p => {
      const team = TEAMS.find(t => t.name === p.team);

      const teamName = p.team || "No Team";
      const teamLogo = team?.logo || IMG.defaultProfile;

      return `
    <div class="col-md-6 col-lg-4 col-xl-3">
      <div class="player-card">
        <img src="${p.avatar}" class="player-avatar" alt="${p.nick}">
        <h5 class="mb-0">${p.nick}</h5>
        <p style="color:var(--text-secondary);font-size:0.8rem;margin-bottom:8px">${p.realName}</p>
        <div class="d-flex justify-content-center gap-2 mb-2">
          <img src="${team?.logo || IMG.defaultProfile}" class="team-logo-img" style="width:28px;height:28px" alt="${p.team}">
          <span class="badge" style="background:rgba(255,107,0,0.2);color:var(--primary);align-self:center">${p.team}</span>
        </div>
        <span class="badge mb-2" style="background:var(--bg-dark);color:var(--text-secondary)">${p.role}</span>
        <div class="d-flex justify-content-around mt-3">
          <div><div style="font-weight:800;color:var(--primary)">${p.kd}</div><small style="color:var(--text-secondary)">K/D</small></div>
          <div><div style="font-weight:800">${p.winrate}%</div><small style="color:var(--text-secondary)">Win</small></div>
          <div><div style="font-weight:800">${p.rating}</div><small style="color:var(--text-secondary)">Rating</small></div>
        </div>
        <div class="d-flex gap-2 mt-3">
          <button class="btn-outline-custom flex-grow-1" style="padding:6px;font-size:0.8rem" onclick="showPlayerDetail(${p.id})">View Profile</button>
          <button class="btn-outline-custom" style="padding:6px 12px" onclick="toggleFavoritePlayer(${p.id})" title="${isFavPlayer(p.id) ? 'Remove from favorites' : 'Add to favorites'}">
            <i class="fas fa-star" style="color:${isFavPlayer(p.id) ? 'var(--primary)' : 'var(--text-secondary)'}"></i>
          </button>
        </div>
      </div>
    </div>`;
    }).join('');
  }
  const homeList = document.getElementById('homePlayers');
  if (homeList) {
    const featured = [...PLAYERS].sort((a, b) => b.rating - a.rating).slice(0, 4);
    homeList.innerHTML = featured.map(p => {
      const team = TEAMS.find(t => t.name === p.team);
      return `
      <div class="col-md-3 col-sm-6">
        <div class="player-card">
          <img src="${p.avatar}" class="player-avatar" style="width:70px;height:70px" alt="${p.nick}">
          <h6 class="mb-0">${p.nick}</h6>
          <small style="color:var(--text-secondary)">${p.team}</small>
          <div class="mt-2"><span class="badge" style="background:rgba(255,107,0,0.2);color:var(--primary)">${p.role}</span></div>
        </div>
      </div>`;
    }).join('');
  }
}

function showPlayerDetail(id) {
  const p = PLAYERS.find(x => x.id === id);
  if (!p) return;
  const team = TEAMS.find(t => t.name === p.team);

  const teamName = p.team || "No Team";
  const teamLogo = team?.logo || IMG.defaultProfile;

  const hasEmail = Boolean(p.email);
  const buttonText = hasEmail ? "Contact" : "No Contact";
  const buttonHref = hasEmail ? `href="mailto:${p.email}"` : "javascript:void(0)";
  const buttonClass = hasEmail ? "btn-outline-custom" : "btn-outline-secondary disabled";  
  
  document.getElementById('playerModalName').textContent = p.nick;
  document.getElementById('playerModalBody').innerHTML = `
    <div class="text-center mb-3">
      <img src="${p.avatar}" class="rounded-circle" style="width:100px;height:100px;object-fit:cover;border:3px solid var(--primary)">
      <h5 class="mt-2 mb-0">${p.realName}</h5>
      <p style="color:var(--text-secondary)">@${p.nick} • ${p.country} • Age: ${p.age}</p>
      <div class="d-flex justify-content-center gap-2 mt-2">
        <img src="${team?.logo || IMG.defaultProfile}" class="team-logo-img" alt="${p.team}">
        <span class="badge" style="background:rgba(255,107,0,0.2);color:var(--primary);align-self:center">${p.team}</span>
      </div>
    </div>
    <div class="row g-2 text-center mb-3">
      <div class="col-4"><div style="font-size:1.3rem;font-weight:800;color:var(--primary)">${p.kd}</div><small style="color:var(--text-secondary)">K/D Ratio</small></div>
      <div class="col-4"><div style="font-size:1.3rem;font-weight:800">${p.winrate}%</div><small style="color:var(--text-secondary)">Win Rate</small></div>
      <div class="col-4"><div style="font-size:1.3rem;font-weight:800">${p.rating}</div><small style="color:var(--text-secondary)">HLTV Rating</small></div>
    </div>
    <div class="d-flex justify-content-between align-items-center pt-2 border-top">
      <div>
        <strong>Role:</strong> ${p.role} &nbsp;|&nbsp; <strong>Team:</strong> ${p.team}
      </div>
      <a ${buttonHref} class="btn btn-sm ${buttonClass} d-flex align-items-center gap-1" title="${hasEmail ? 'Contact ' + p.nick : 'No contact available'}">
        <i class="bi bi-envelope-fill"></i> ${buttonText}
      </a>
    </div>
  `;
  new bootstrap.Modal(document.getElementById('playerModal')).show();
}

function initTeamFilter() {
  const sel = document.getElementById('playerTeamFilter');
  if (sel && sel.options.length <= 1) {
    TEAMS.forEach(t => {
      const opt = document.createElement('option');
      opt.value = t.name; opt.textContent = t.name;
      sel.appendChild(opt);
    });

    const noTeamOpt = document.createElement('option');
    noTeamOpt.value = "No Team";
    noTeamOpt.textContent = "No Team (Free Agents)";
    sel.appendChild(noTeamOpt);
  }
}

// ===== SHOP / CART =====
let cart = getLS('cs2_cart', []);

function renderShop() {
  const list = document.getElementById('shopList');
  if (!list) return;
  list.innerHTML = PRODUCTS.map(p => `
    <div class="col-md-6 col-lg-3">
      <div class="card-custom">
        <div style="background-image:url('${p.banner}');background-size:cover;background-position:center;border-radius:8px;height:120px;margin-bottom:12px;position:relative;display:flex;align-items:center;justify-content:center">
          <div style="position:absolute;inset:0;background:rgba(10,14,23,0.4)"></div>
          <span style="font-size:2.5rem;position:relative;z-index:2">${p.img}</span>
        </div>
        <span class="badge mb-2" style="background:var(--bg-dark);color:var(--text-secondary)">${p.category}</span>
        <h6 class="mb-1">${p.name}</h6>
        <p style="color:var(--text-secondary);font-size:0.8rem;margin-bottom:12px">${p.desc}</p>
        <div class="d-flex justify-content-between align-items-center">
          <strong style="color:var(--primary);font-size:1.1rem">RM ${p.price.toFixed(2)}</strong>
          <button class="btn-primary-custom" style="padding:6px 14px;font-size:0.8rem" onclick="addToCart(${p.id})"><i class="fas fa-cart-plus me-1"></i>Add</button>
        </div>
      </div>
    </div>
  `).join('');
}

function addToCart(id) {
  const product = PRODUCTS.find(p => p.id === id);
  if (!product) return;
  const existing = cart.find(c => c.id === id);
  if (existing) existing.qty++;
  else cart.push({...product, qty: 1});
  setLS('cs2_cart', cart);
  updateCartUI();
  showToast(product.name + " added to cart!");
}

function removeFromCart(id) {
  cart = cart.filter(c => c.id !== id);
  setLS('cs2_cart', cart);
  updateCartUI();
}

function updateCartQty(id, delta) {
  const item = cart.find(c => c.id === id);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) cart = cart.filter(c => c.id !== id);
  setLS('cs2_cart', cart);
  updateCartUI();
}

function updateCartUI() {
  const count = cart.reduce((s, c) => s + c.qty, 0);
  const countEl = document.getElementById('cartCount');
  if (countEl) countEl.textContent = count;
  const itemsEl = document.getElementById('cartItems');
  if (!itemsEl) return;
  if (cart.length === 0) {
    itemsEl.innerHTML = '<p class="text-center py-4" style="color:var(--text-secondary)"><i class="fas fa-shopping-cart" style="font-size:2rem"></i><br>Your cart is empty</p>';
  } else {
    itemsEl.innerHTML = cart.map(c => `
      <div class="d-flex align-items-center gap-2 mb-3 pb-3" style="border-bottom:1px solid var(--border)">
        <div style="font-size:1.5rem">${c.img}</div>
        <div class="flex-grow-1">
          <small style="font-weight:600">${c.name}</small>
          <div style="color:var(--primary);font-size:0.85rem">RM ${c.price.toFixed(2)}</div>
        </div>
        <div class="d-flex align-items-center gap-1">
          <button class="btn btn-sm" style="background:var(--bg-dark);color:#fff;border:1px solid var(--border)" onclick="updateCartQty(${c.id},-1)">-</button>
          <span style="min-width:24px;text-align:center">${c.qty}</span>
          <button class="btn btn-sm" style="background:var(--bg-dark);color:#fff;border:1px solid var(--border)" onclick="updateCartQty(${c.id},1)">+</button>
        </div>
        <button class="btn btn-sm" style="color:var(--danger)" onclick="removeFromCart(${c.id})"><i class="fas fa-trash"></i></button>
      </div>
    `).join('');
  }
  const total = cart.reduce((s, c) => s + c.price * c.qty, 0);
  const totalEl = document.getElementById('cartTotal');
  if (totalEl) totalEl.textContent = 'RM ' + total.toFixed(2);
}

function toggleCart() {
  const drawer = document.getElementById('cartDrawer');
  const overlay = document.getElementById('cartOverlay');
  if (!drawer || !overlay) return;
  drawer.classList.toggle('open');
  overlay.classList.toggle('open');
}

function checkout() {
  if (cart.length === 0) { showToast("Your cart is empty!", "error"); return; }
  if (!currentUser) { showToast("Please login to checkout!", "error"); toggleCart(); setTimeout(()=>{window.location.href='login.html';},800); return; }
  const total = cart.reduce((s, c) => s + c.price * c.qty, 0);
  const orders = getLS('cs2_orders', []);
  orders.push({user: currentUser.username, items: cart, total, date: new Date().toISOString()});
  setLS('cs2_orders', orders);
  cart = [];
  setLS('cs2_cart', cart);
  updateCartUI();
  toggleCart();
  showToast("Order placed! Total: RM " + total.toFixed(2));
}

// ===== SOCIAL FEED =====
function renderSocialFeed() {
  const el = document.getElementById('twitterFeed');
  if (!el) return;
  el.innerHTML = TWEETS.map(t => `
    <div class="tweet">
      <div style="font-weight:600;font-size:0.85rem">${t.handle} <span style="color:var(--text-secondary);font-weight:400">• ${t.time}</span></div>
      <div style="color:var(--text-primary);font-size:0.85rem;margin-top:2px">${t.text}</div>
    </div>
  `).join('');
}

// ===== SUBSCRIPTION PLANS =====
function renderSubPlans() {
  const el = document.getElementById('subPlans');
  if (!el) return;
  el.innerHTML = SUB_PLANS.map(plan => `
    <div class="col-md-4">
      <div class="sub-plan ${plan.featured ? 'featured' : ''}">
        <h4 style="font-weight:800">${plan.name}</h4>
        <div class="sub-price">RM ${plan.price}<span>/${plan.period}</span></div>
        <ul class="sub-features">
          ${plan.features.map(f => `<li class="${f.enabled ? '' : 'disabled'}"><i class="fas ${f.enabled ? 'fa-check' : 'fa-times'}"></i>${f.text}</li>`).join('')}
        </ul>
        <button class="${plan.featured ? 'btn-primary-custom' : 'btn-outline-custom'} w-100" onclick="subscribePlan('${plan.name}')">
          ${plan.price === 0 ? 'Get Started' : 'Subscribe Now'}
        </button>
      </div>
    </div>
  `).join('');
}

function subscribePlan(name) {
  if (!currentUser) { showToast("Please login to subscribe!", "error"); setTimeout(()=>{window.location.href='login.html';},800); return; }
  showToast("Successfully subscribed to " + name + " plan!");
}

function saveNotificationSettings(e) {
  e.preventDefault();
  const settings = {
    email: document.getElementById('notifEmail')?.checked,
    match: document.getElementById('notifMatch')?.checked,
    news: document.getElementById('notifNews')?.checked,
    sms: document.getElementById('notifSms')?.checked,
    browser: document.getElementById('notifBrowser')?.checked
  };
  setLS('cs2_notifSettings', settings);
  showToast("Notification settings saved!");
}

// ===== MISC =====
function showToast(msg, type) {
  type = type || 'success';
  const toast = document.getElementById('toast');
  if (!toast) { alert(msg); return; }
  document.getElementById('toastMsg').textContent = msg;
  toast.style.borderColor = type === 'error' ? 'var(--danger)' : 'var(--primary)';
  toast.classList.add('show');
  setTimeout(function() { toast.classList.remove('show'); }, 3000);
}

function subscribeNewsletter() {
  const email = document.getElementById('newsletterEmail')?.value;
  if (!email || !email.includes('@')) { showToast("Please enter a valid email!", "error"); return; }
  const subs = getLS('cs2_newsletter', []);
  if (!subs.includes(email)) { subs.push(email); setLS('cs2_newsletter', subs); }
  showToast("Subscribed to newsletter!");
  if (document.getElementById('newsletterEmail')) document.getElementById('newsletterEmail').value = '';
}

function submitContact(e) {
  e.preventDefault();
  showToast("Message sent! We'll get back to you soon.");
  e.target.reset();
}

// ===== SET ACTIVE NAV LINK =====
function setActiveNav(pageId) {
  document.querySelectorAll('.nav-link[data-page]').forEach(l => {
    l.classList.toggle('active', l.dataset.page === pageId);
  });
}

// ===== INIT =====
function initApp() {
  initUsers();
  const savedUser = getSS('cs2_currentUser', null);
  if (savedUser) {
    currentUser = savedUser;
  } else {
    const remembered = getCookie('cs2_remember');
    if (remembered) {
      const users = getLS('cs2_users', []);
      const found = users.find(u => u.username === remembered);
      if (found) { currentUser = found; setSS('cs2_currentUser', found); }
    }
  }
  updateAuthUI();
  if (!getCookie('cs2_theme')) setCookie('cs2_theme', 'dark', 365);
  updateCartUI();
}
