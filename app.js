// LaserGrid Game Logic (M0–M3)
// Only HTML, CSS, Vanilla JS. No frameworks.


// --- Puzzle Pack (M8) ---
const PUZZLES = [
  {
    id: 1,
    title: 'Tutorial Grid',
    gridSize: 4,
    requiredLasers: 2,
    difficulty: 'Easy',
    pack: 'starter',
    cores: [
      { row: 0, col: 1, value: 2 },
      { row: 1, col: 3, value: 1 },
      { row: 2, col: 0, value: 1 },
    ],
  },
  {
    id: 2,
    title: 'Crossfire',
    gridSize: 4,
    requiredLasers: 3,
    difficulty: 'Easy',
    pack: 'starter',
    cores: [
      { row: 0, col: 2, value: 2 },
      { row: 1, col: 1, value: 2 },
      { row: 2, col: 3, value: 1 },
      { row: 3, col: 0, value: 1 },
    ],
  },
  {
    id: 3,
    title: 'Cornered',
    gridSize: 4,
    requiredLasers: 3,
    difficulty: 'Medium',
    pack: 'starter',
    cores: [
      { row: 0, col: 0, value: 1 },
      { row: 0, col: 3, value: 2 },
      { row: 3, col: 3, value: 2 },
    ],
  },
  {
    id: 4,
    title: 'Double Trouble',
    gridSize: 4,
    requiredLasers: 4,
    difficulty: 'Medium',
    pack: 'starter',
    cores: [
      { row: 1, col: 1, value: 2 },
      { row: 1, col: 2, value: 2 },
      { row: 2, col: 1, value: 2 },
      { row: 2, col: 2, value: 2 },
    ],
  },
  {
    id: 5,
    title: 'Laser Alley',
    gridSize: 4,
    requiredLasers: 2,
    difficulty: 'Easy',
    pack: 'starter',
    cores: [
      { row: 1, col: 0, value: 1 },
      { row: 1, col: 2, value: 1 },
      { row: 2, col: 1, value: 2 },
    ],
  },
  {
    id: 6,
    title: 'Diagonal Dance',
    gridSize: 4,
    requiredLasers: 3,
    difficulty: 'Medium',
    pack: 'starter',
    cores: [
      { row: 0, col: 0, value: 1 },
      { row: 1, col: 1, value: 2 },
      { row: 2, col: 2, value: 2 },
      { row: 3, col: 3, value: 1 },
    ],
  },
  {
    id: 7,
    title: 'Edge Case',
    gridSize: 4,
    requiredLasers: 3,
    difficulty: 'Medium',
    pack: 'starter',
    cores: [
      { row: 0, col: 1, value: 1 },
      { row: 3, col: 2, value: 2 },
      { row: 2, col: 0, value: 1 },
      { row: 1, col: 3, value: 2 },
    ],
  },
  {
    id: 8,
    title: 'Split Decision',
    gridSize: 4,
    requiredLasers: 3,
    difficulty: 'Medium',
    pack: 'starter',
    cores: [
      { row: 0, col: 2, value: 1 },
      { row: 2, col: 1, value: 2 },
      { row: 3, col: 0, value: 2 },
      { row: 1, col: 3, value: 1 },
    ],
  },
  {
    id: 9,
    title: 'Core Quartet',
    gridSize: 4,
    requiredLasers: 4,
    difficulty: 'Hard',
    pack: 'starter',
    cores: [
      { row: 0, col: 1, value: 2 },
      { row: 1, col: 2, value: 2 },
      { row: 2, col: 3, value: 2 },
      { row: 3, col: 0, value: 2 },
    ],
  },
  {
    id: 10,
    title: 'Laser Maze',
    gridSize: 4,
    requiredLasers: 4,
    difficulty: 'Hard',
    pack: 'starter',
    cores: [
      { row: 0, col: 0, value: 2 },
      { row: 0, col: 3, value: 2 },
      { row: 3, col: 0, value: 2 },
      { row: 3, col: 3, value: 2 },
    ],
  },
  {
    id: 11,
    title: 'Tight Corners',
    gridSize: 4,
    requiredLasers: 4,
    difficulty: 'Hard',
    pack: 'starter',
    cores: [
      { row: 0, col: 1, value: 2 },
      { row: 1, col: 2, value: 2 },
      { row: 2, col: 1, value: 2 },
      { row: 3, col: 2, value: 2 },
    ],
  },
  {
    id: 12,
    title: 'The Gauntlet',
    gridSize: 4,
    requiredLasers: 5,
    difficulty: 'Hard',
    pack: 'starter',
    cores: [
      { row: 0, col: 0, value: 2 },
      { row: 0, col: 2, value: 2 },
      { row: 1, col: 1, value: 2 },
      { row: 2, col: 3, value: 2 },
      { row: 3, col: 1, value: 2 },
    ],
  },
];

// --- M12D: Challenge Phrase Bank ---
const CHALLENGE_PHRASES = {
  Perfect: [
    'Perfect beam path. Can you find another way in exactly {target} toggles?',
    'Solved with no wasted moves. Can you match {target} toggles?',
    'Clean. Exact. Perfect. Can you solve it differently in {target} toggles?'
  ],
  'Clean Solve': [
    'Clean solve. Can you make it perfect in exactly {target} toggles?',
    'Close to perfect. Can you solve it in exactly {target} toggles?',
    'Nice path. But can you finish with no wasted moves: {target} toggles?'
  ],
  'Scrappy Solve': [
    'I got there eventually. Can you solve it in exactly {target} toggles?',
    'Messy, but solved. Can you find the perfect {target}-toggle path?',
    'That took some experimenting. Can you solve it cleaner in {target} toggles?'
  ],
  'Laser Chaos': [
    'My grid was chaos. Can you solve it in exactly {target} toggles?',
    'Laser chaos, but I survived. Can you find the perfect {target}-toggle solve?',
    'I brute-forced the beams. Can you solve it cleanly in {target} toggles?'
  ]
};

// --- Local Storage Key (M9) ---
const STORAGE_KEY = 'lasergrid_mvp_save_data';

// --- Game State (M4–M10) ---
let currentPuzzleIndex = 0;
let puzzle = { ...PUZZLES[0] };
let lasers = [];
let toggles = 0;
let timer = 0; // seconds
let timerInterval = null;
let timerStarted = false;
let win = false;
let emojiTimeline = [];
let lastPerfectCores = 0;
let selectedChallengePhrase = '';
let celebratingWin = false;

// --- Analytics (M18) ---
let firstMoveTracked = false;

function trackEvent(eventName, params = {}) {
  if (typeof gtag !== 'function') return;
  try {
    gtag('event', eventName, params);
  } catch (e) {
    // Analytics should never break gameplay.
  }
}

function getAnalyticsPuzzleParams() {
  return {
    puzzle_id: puzzle.id,
    puzzle_title: puzzle.title,
    grid_size: `${puzzle.gridSize}x${puzzle.gridSize}`,
    required_lasers: puzzle.requiredLasers
  };
}

// --- Utility Functions ---
function getCurrentPuzzle() {
  return PUZZLES[currentPuzzleIndex];
}

// --- Utility Functions ---
function isCoreCell(row, col) {
  return puzzle.cores.some(core => core.row === row && core.col === col);
}

function getCoreAt(row, col) {
  return puzzle.cores.find(core => core.row === row && core.col === col);
}

function isLaserCell(row, col) {
  return lasers.some(l => l.row === row && l.col === col);
}

function calculateCorePower(core) {
  // Count lasers in same row and column as this core
  let count = 0;
  for (const l of lasers) {
    if (l.row === core.row || l.col === core.col) count++;
  }
  return count;
}

function getCoreState(core) {
  const power = calculateCorePower(core);
  if (power < core.value) return 'under';
  if (power === core.value) return 'perfect';
  return 'over';
}

function calculateAllCoreStates() {
  return puzzle.cores.map(core => ({
    ...core,
    power: calculateCorePower(core),
    state: getCoreState(core),
  }));
}


function resetGame(clearSave = true) {
  lasers = [];
  toggles = 0;
  timer = 0;
  timerStarted = false;
  win = false;
  emojiTimeline = [];
  lastPerfectCores = 0;
  firstMoveTracked = false;
  selectedChallengePhrase = '';
  celebratingWin = false;
  stopTimer();
  updateLaserCount();
  updateToggleCount();
  updateTimer();
  updateLiveTrail();
  hideVictoryModal();
  renderBoard();
  if (clearSave) {
    clearSaveData();
  }
}


function toggleLaser(row, col) {
  if (win || celebratingWin) return; // No toggles after win or during celebration
  if (isCoreCell(row, col)) return; // Can't place on core
  const idx = lasers.findIndex(l => l.row === row && l.col === col);
  // Save state for emoji logic
  const beforePerfect = countPerfectCores();
  let moveType = '';
  let afterOverload = false;
  if (idx !== -1) {
    lasers.splice(idx, 1); // Remove laser
    moveType = 'remove';
  } else {
    lasers.push({ row, col });
    moveType = 'place';
  }
  // Start timer on first valid toggle
  if (!timerStarted) {
    startTimer();
    timerStarted = true;
  }
  toggles++;
  // --- Analytics: first_move ---
  if (!firstMoveTracked) {
    trackEvent('first_move', getAnalyticsPuzzleParams());
    firstMoveTracked = true;
  }
  // After move, check for overloads and perfects
  const afterPerfect = countPerfectCores();
  afterOverload = isAnyCoreOverloaded();
  // Record emoji for this move
  let emoji = recordMoveEmoji(moveType, beforePerfect, afterPerfect, afterOverload);
  emojiTimeline.push(emoji);
  lastPerfectCores = afterPerfect;
  renderBoard();
  updateLaserCount();
  updateToggleCount();
  updateLiveTrail();
  checkWin();
  saveGameState();
}


function updateLaserCount() {
  const el = document.getElementById('laser-count');
  el.textContent = `Lasers: ${lasers.length} / ${puzzle.requiredLasers}`;
  if (lasers.length > puzzle.requiredLasers) {
    el.classList.add('warning');
  } else {
    el.classList.remove('warning');
  }
}

function updateToggleCount() {
  document.getElementById('toggle-count').textContent = `Toggles: ${toggles}`;
}

function updateTimer() {
  document.getElementById('timer').textContent = formatTime(timer);
}

function updateLiveTrail() {
  const el = document.getElementById('live-trail-emojis');
  if (!el) return;
  el.textContent = emojiTimeline.join(' ');
}


function updatePuzzleHeader() {
  document.getElementById('puzzle-number').textContent = `Puzzle #${puzzle.id}`;
  const titleEl = document.getElementById('puzzle-title');
  if (!titleEl) return;
  const difficulty = puzzle.difficulty ? `${puzzle.difficulty} · ` : '';
  const laserText = `Solve with exactly ${puzzle.requiredLasers} laser${puzzle.requiredLasers === 1 ? '' : 's'}`;
  titleEl.innerHTML = `${escapeHtml(puzzle.title)}<br><span style="font-size:0.78em;color:#9df4ff;opacity:0.95;">${escapeHtml(difficulty + laserText)}</span>`;
}

// --- Rendering (M1–M3) ---

function renderBoard() {
  const board = document.getElementById('board');
  board.innerHTML = '';
  const coreStates = calculateAllCoreStates();

  // For beam highlighting, collect all rows/cols with lasers
  const beamRows = new Set(lasers.map(l => l.row));
  const beamCols = new Set(lasers.map(l => l.col));

  for (let row = 0; row < puzzle.gridSize; row++) {
    for (let col = 0; col < puzzle.gridSize; col++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      // Beam highlight
      if (beamRows.has(row)) cell.classList.add('beam-row');
      if (beamCols.has(col)) cell.classList.add('beam-col');

      if (isCoreCell(row, col)) {
        cell.classList.add('core');
        const core = getCoreAt(row, col);
        const state = getCoreState(core);
        cell.classList.add(`core-${state}`);
        cell.textContent = core.value;
        cell.title = `Target Core: needs ${core.value} power`;
      } else if (isLaserCell(row, col)) {
        cell.classList.add('laser');
        cell.innerHTML = '<span class="laser-icon" aria-label="Laser">&#9889;</span>';
        cell.title = 'Remove laser';
        cell.addEventListener('click', () => toggleLaser(row, col));
        cell.addEventListener('touchstart', e => { e.preventDefault(); toggleLaser(row, col); }, { passive: false });
      } else {
        cell.classList.add('empty');
        cell.title = 'Place laser';
        cell.addEventListener('click', () => toggleLaser(row, col));
        cell.addEventListener('touchstart', e => { e.preventDefault(); toggleLaser(row, col); }, { passive: false });
      }
      board.appendChild(cell);
    }
  }
}
// --- Puzzle Selection (M8) ---
function populatePuzzleSelect() {
  const select = document.getElementById('puzzle-select');
  select.innerHTML = '';
  PUZZLES.forEach((pz, idx) => {
    const opt = document.createElement('option');
    opt.value = idx;
    opt.textContent = `#${pz.id}: ${pz.title}${pz.difficulty ? ' · ' + pz.difficulty : ''}`;
    select.appendChild(opt);
  });
  select.value = currentPuzzleIndex;
}

function switchPuzzle(idx) {
  if (idx < 0 || idx >= PUZZLES.length) return;
  currentPuzzleIndex = idx;
  puzzle = { ...PUZZLES[currentPuzzleIndex] };
  selectedChallengePhrase = '';
  updatePuzzleHeader();
  resetGame(false);
  firstMoveTracked = false;
  updateLiveTrail();
  saveGameState();
  populatePuzzleSelect();
  // --- Analytics: puzzle_changed ---
  trackEvent('puzzle_changed', getAnalyticsPuzzleParams());
}

function nextPuzzle() {
  let idx = (currentPuzzleIndex + 1) % PUZZLES.length;
  switchPuzzle(idx);
}
// --- Local Storage Save/Restore (M9) ---
function saveGameState() {
  try {
    const data = {
      currentPuzzleIndex,
      lasers,
      toggles,
      timer,
      timerStarted,
      win,
      emojiTimeline,
      selectedChallengePhrase
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {}
}

function loadGameState() {
  try {
    const data = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (!data) return;
    if (typeof data.currentPuzzleIndex === 'number' && data.currentPuzzleIndex >= 0 && data.currentPuzzleIndex < PUZZLES.length) {
      currentPuzzleIndex = data.currentPuzzleIndex;
      puzzle = { ...PUZZLES[currentPuzzleIndex] };
      lasers = Array.isArray(data.lasers) ? data.lasers : [];
      toggles = typeof data.toggles === 'number' ? data.toggles : 0;
      timer = typeof data.timer === 'number' ? data.timer : 0;
      timerStarted = !!data.timerStarted;
      win = !!data.win;
      emojiTimeline = Array.isArray(data.emojiTimeline) ? data.emojiTimeline : [];
      lastPerfectCores = countPerfectCores();
      selectedChallengePhrase = typeof data.selectedChallengePhrase === 'string'
        ? data.selectedChallengePhrase
        : '';
      updatePuzzleHeader();
      populatePuzzleSelect();
      renderBoard();
      updateLaserCount();
      updateToggleCount();
      updateTimer();
      updateLiveTrail();
      if (win) {
        stopTimer();
        showVictoryModal();
      } else if (timerStarted) {
        startTimer();
      }
    }
  } catch (e) {}
}

function clearSaveData() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (e) {}
}

// --- Win Helper ---
function isSolved() {
  const allPerfect = puzzle.cores.every(core => getCoreState(core) === 'perfect');
  return allPerfect && lasers.length === puzzle.requiredLasers;
}

// --- Timer Functions ---
function startTimer() {
  if (timerInterval) return;
  timerInterval = setInterval(() => {
    timer++;
    updateTimer();
  }, 1000);
}

function stopTimer() {
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }
}

function formatTime(secs) {
  const m = Math.floor(secs / 60).toString().padStart(2, '0');
  const s = (secs % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

// --- Win Condition & Modal ---
function checkWin() {
  if (win) return;
  if (isSolved()) {
    win = true;
    celebratingWin = true;
    stopTimer();
    // Ensure final move is marked as winning move (replace last emoji)
    if (emojiTimeline.length > 0) {
      emojiTimeline[emojiTimeline.length - 1] = '🏆';
      updateLiveTrail();
    }
    renderBoard();
    updateLaserCount();
    updateToggleCount();
    updateTimer();
    // --- Analytics: puzzle_solved ---
    const rank = getRank();
    trackEvent('puzzle_solved', {
      ...getAnalyticsPuzzleParams(),
      toggles,
      time_seconds: timer,
      rank
    });
    showCelebration();
    setTimeout(() => {
      celebratingWin = false;
      hideCelebration();
      showVictoryModal();
      saveGameState();
    }, 3000);
    return;
  }
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function setResultStatCard(id, icon, value, label) {
  const el = document.getElementById(id);
  if (!el) return;
  el.innerHTML = `
    <span class="stat-icon" aria-hidden="true">${icon}</span>
    <span class="stat-value">${escapeHtml(value)}</span>
    <span class="stat-label">${escapeHtml(label)}</span>
  `;
}

function formatChallengePhrase(phrase) {
  const text = String(phrase || '');
  const splitIndex = text.indexOf('. ');
  if (splitIndex === -1) {
    return `<strong>${escapeHtml(text)}</strong>`;
  }
  const first = text.slice(0, splitIndex + 1);
  const second = text.slice(splitIndex + 2);
  return `<strong>${escapeHtml(first)}</strong><span>${escapeHtml(second)}</span>`;
}

function showVictoryModal() {
  document.getElementById('victory-modal').style.display = 'flex';
  const result = getResultData();
  document.getElementById('modal-puzzle').textContent = `Puzzle #${result.puzzleId} · ${result.puzzleTitle} · ${result.difficulty}`;
  document.getElementById('modal-size').textContent = result.gridSize;

  setResultStatCard('modal-lasers', '⚡', result.requiredLasers, 'Lasers');
  setResultStatCard('modal-time', '⏱', result.time, 'Time');
  setResultStatCard('modal-toggles', '↻', result.toggles, 'Toggles');
  setResultStatCard('modal-rank', '★', result.rank, 'Rank');

  document.getElementById('modal-challenge').innerHTML = formatChallengePhrase(result.challengePhrase);
  document.getElementById('modal-emoji-timeline').textContent = result.timeline;
  document.getElementById('share-confirm').style.display = 'none';
}

function hideVictoryModal() {
  document.getElementById('victory-modal').style.display = 'none';
}

// --- Rank & Emoji Timeline ---
function getRank() {
  const req = puzzle.requiredLasers;
  if (toggles === req) return 'Perfect';
  if (toggles <= req * 2) return 'Clean Solve';
  if (toggles <= req * 4) return 'Scrappy Solve';
  return 'Laser Chaos';
}

function countPerfectCores() {
  return puzzle.cores.filter(core => getCoreState(core) === 'perfect').length;
}

function isAnyCoreOverloaded() {
  return puzzle.cores.some(core => getCoreState(core) === 'over');
}

function recordMoveEmoji(moveType, beforePerfect, afterPerfect, afterOverload) {
  // 1. If the move wins, emoji will be replaced with 🏆 in checkWin().
  // 2. Else if any core becomes overloaded after the move, record 💥.
  if (afterOverload) return '💥';
  // 3. Else if the number of perfect cores increased compared with before the move, record ✅.
  if (afterPerfect > beforePerfect) return '✅';
  // 4. Else if the move removed a laser, record ↩️.
  if (moveType === 'remove') return '↩️';
  // 5. Else record ⚡.
  return '⚡';
}

// --- Share Logic (M12D) ---
function getChallengePhrase(rank, target) {
  if (selectedChallengePhrase) return selectedChallengePhrase;

  const phrases = CHALLENGE_PHRASES[rank] || CHALLENGE_PHRASES['Laser Chaos'];
  const chosen = phrases[Math.floor(Math.random() * phrases.length)];

  selectedChallengePhrase = chosen.replaceAll('{target}', String(target));
  return selectedChallengePhrase;
}

function getResultData() {
  const rank = getRank();
  return {
    puzzleId: puzzle.id,
    puzzleTitle: puzzle.title,
    difficulty: puzzle.difficulty || 'Practice',
    gridSize: `${puzzle.gridSize}x${puzzle.gridSize}`,
    requiredLasers: puzzle.requiredLasers,
    toggles,
    time: formatTime(timer),
    rank,
    timeline: emojiTimeline.join(' '),
    challengePhrase: getChallengePhrase(rank, puzzle.requiredLasers),
    url: window.location.href || '[URL]'
  };
}

function generateShareText() {
  const result = getResultData();
  return `LaserGrid #${result.puzzleId}\n${result.gridSize} · ${result.requiredLasers} Lasers\n\nSolved in ${result.toggles} toggles · ${result.time}\nRank: ${result.rank}\n\n${result.timeline}\n\n${result.challengePhrase}\n${result.url}`;
}

function copyShareText() {
  const text = generateShareText();
  // --- Analytics: copy_result_clicked ---
  trackEvent('copy_result_clicked', {
    puzzle_id: puzzle.id,
    rank: getRank(),
    toggles
  });
  if (navigator.clipboard) {
    navigator.clipboard.writeText(text).then(() => {
      showShareConfirm();
    }).catch(() => {
      showShareFallback(text);
    });
  } else {
    try {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      const success = document.execCommand('copy');
      document.body.removeChild(textarea);
      if (success) {
        showShareConfirm();
      } else {
        showShareFallback(text);
      }
    } catch (e) {
      showShareFallback(text);
    }
  }
}

function showShareFallback(text) {
  const modal = document.getElementById('share-fallback-modal');
  const textarea = document.getElementById('share-fallback-text');
  textarea.value = text;
  modal.style.display = 'flex';
}

function showShareConfirm() {
  const el = document.getElementById('share-confirm');
  el.style.display = 'block';
  setTimeout(() => { el.style.display = 'none'; }, 1200);
}


function initGame() {
    // Share fallback modal logic
    const shareFallbackModal = document.getElementById('share-fallback-modal');
    const closeShareFallbackBtn = document.getElementById('close-share-fallback-btn');
    closeShareFallbackBtn.addEventListener('click', () => {
      shareFallbackModal.style.display = 'none';
    });
    shareFallbackModal.addEventListener('click', (e) => {
      if (e.target === shareFallbackModal) shareFallbackModal.style.display = 'none';
    });
  // Help modal logic (M7)
  const helpBtn = document.getElementById('help-btn');
  const helpModal = document.getElementById('help-modal');
  const closeHelpBtn = document.getElementById('close-help-btn');
  helpBtn.addEventListener('click', () => {
    helpModal.style.display = 'flex';
    // --- Analytics: help_opened ---
    trackEvent('help_opened', {
      puzzle_id: puzzle.id,
      puzzle_title: puzzle.title
    });
  });
  closeHelpBtn.addEventListener('click', () => {
    helpModal.style.display = 'none';
  });
  helpModal.addEventListener('click', (e) => {
    if (e.target === helpModal) helpModal.style.display = 'none';
  });

  // Puzzle select logic (M8)
  const puzzleSelect = document.getElementById('puzzle-select');
  puzzleSelect.addEventListener('change', e => {
    switchPuzzle(Number(e.target.value));
  });
  document.getElementById('next-puzzle-btn').addEventListener('click', nextPuzzle);

  document.getElementById('reset-btn').addEventListener('click', () => {
    trackEvent('reset_clicked', {
      puzzle_id: puzzle.id,
      puzzle_title: puzzle.title,
      grid_size: `${puzzle.gridSize}x${puzzle.gridSize}`
    });
    resetGame(true);
  });
  document.getElementById('close-modal-btn').addEventListener('click', hideVictoryModal);
  const shareResultBtn = document.getElementById('share-result-btn');
  if (shareResultBtn) {
    shareResultBtn.addEventListener('click', shareResult);
  }
  document.getElementById('share-btn').addEventListener('click', copyShareText);

  document.getElementById('download-image-btn').addEventListener('click', downloadVictoryImage);

  // Initial load
  loadGameState();
  if (!localStorage.getItem(STORAGE_KEY)) {
    // If no save, show first puzzle
    puzzle = { ...PUZZLES[0] };
    currentPuzzleIndex = 0;
    updatePuzzleHeader();
    populatePuzzleSelect();
    resetGame(false);
  }
  updateLiveTrail(); // Ensure trail is initialized
  // --- Analytics: game_loaded ---
  trackEvent('game_loaded', {
    puzzle_id: puzzle.id,
    puzzle_title: puzzle.title,
    grid_size: `${puzzle.gridSize}x${puzzle.gridSize}`
  });
}

document.addEventListener('DOMContentLoaded', initGame);

function createVictoryImageCanvas() {
  const result = getResultData();
  const canvas = document.createElement('canvas');
  canvas.width = 1080;
  canvas.height = 1350;
  const ctx = canvas.getContext('2d');
  const centerX = canvas.width / 2;

  const bg = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
  bg.addColorStop(0, '#070d18');
  bg.addColorStop(0.55, '#10131a');
  bg.addColorStop(1, '#060914');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const cardX = 72;
  const cardY = 62;
  const cardW = 936;
  const cardH = 1218;
  const radius = 36;

  ctx.save();
  ctx.shadowColor = 'rgba(126, 234, 255, 0.65)';
  ctx.shadowBlur = 34;
  ctx.fillStyle = '#151922';
  roundRect(ctx, cardX, cardY, cardW, cardH, radius);
  ctx.fill();
  ctx.restore();

  ctx.save();
  const borderGrad = ctx.createLinearGradient(cardX, cardY, cardX + cardW, cardY + cardH);
  borderGrad.addColorStop(0, 'rgba(126, 234, 255, 0.75)');
  borderGrad.addColorStop(0.5, 'rgba(199, 125, 255, 0.55)');
  borderGrad.addColorStop(1, 'rgba(126, 234, 255, 0.35)');
  ctx.strokeStyle = borderGrad;
  ctx.lineWidth = 3;
  roundRect(ctx, cardX, cardY, cardW, cardH, radius);
  ctx.stroke();
  ctx.restore();

  // Title
  ctx.save();
  ctx.textAlign = 'center';
  ctx.textBaseline = 'alphabetic';
  ctx.font = 'bold 66px Arial, sans-serif';
  ctx.fillStyle = '#bff6ff';
  ctx.shadowColor = '#7eeaff';
  ctx.shadowBlur = 18;
  ctx.fillText('Congratulations!', centerX, cardY + 112);
  ctx.restore();

  // Decorative mini grid (non-spoiler)
  drawResultMiniGrid(ctx, centerX - 72, cardY + 182, 144);

  // Puzzle summary
  ctx.save();
  ctx.textAlign = 'center';
  ctx.font = 'bold 28px Arial, sans-serif';
  ctx.fillStyle = '#9ff2ff';
  ctx.shadowColor = 'rgba(126,234,255,0.45)';
  ctx.shadowBlur = 8;
  drawWrappedText(ctx, `Puzzle #${result.puzzleId} · ${result.puzzleTitle} · ${result.difficulty} · ${result.gridSize}`, centerX, cardY + 388, cardW - 180, 32, 'center', 2);
  ctx.restore();

  // Stats row
  const statW = 178;
  const statH = 126;
  const statGap = 22;
  const statTotalW = statW * 4 + statGap * 3;
  const statStartX = centerX - statTotalW / 2;
  const statY = cardY + 456;
  const stats = [
    { icon: '⚡', value: result.requiredLasers, label: 'Lasers' },
    { icon: '⏱', value: result.time, label: 'Time' },
    { icon: '↻', value: result.toggles, label: 'Toggles' },
    { icon: '★', value: result.rank, label: 'Rank', accent: '#00ff99' }
  ];

  stats.forEach((stat, index) => {
    drawStatCard(
      ctx,
      statStartX + index * (statW + statGap),
      statY,
      statW,
      statH,
      stat.icon,
      stat.value,
      stat.label,
      stat.accent
    );
  });

  // Challenge panel
  const challengeY = statY + statH + 72;
  const challengeH = drawChallengePanel(ctx, result.challengePhrase, cardX + 66, challengeY, cardW - 132);

  // Trail
  const trailY = challengeY + challengeH + 86;
  ctx.save();
  ctx.textAlign = 'left';
  ctx.font = 'bold 36px Arial, sans-serif';
  ctx.fillStyle = '#9ff2ff';
  ctx.fillText('Trail:', cardX + 110, trailY);
  ctx.font = '40px Arial, sans-serif';
  ctx.fillStyle = '#ffffff';
  drawWrappedText(ctx, result.timeline || '🏆', cardX + 225, trailY, cardW - 310, 50, 'left', 2);
  ctx.restore();

  // Footer link, intentionally lower to balance the card vertically.
  const footerY = cardY + cardH - 116;
  ctx.save();
  ctx.textAlign = 'center';
  ctx.font = 'bold 34px Arial, sans-serif';
  ctx.fillStyle = '#9ff2ff';
  ctx.fillText('Play LaserGrid:', centerX, footerY);
  ctx.font = '28px Arial, sans-serif';
  ctx.fillStyle = '#e0e6ed';
  drawWrappedText(ctx, result.url, centerX, footerY + 44, cardW - 160, 36, 'center', 2);
  ctx.restore();

  return canvas;
}

function drawResultMiniGrid(ctx, x, y, size) {
  const radius = 18;
  const cell = size / 4;

  ctx.save();
  roundRect(ctx, x, y, size, size, radius);
  ctx.clip();

  const boardGrad = ctx.createLinearGradient(x, y, x + size, y + size);
  boardGrad.addColorStop(0, '#081522');
  boardGrad.addColorStop(0.55, '#121927');
  boardGrad.addColorStop(1, '#0b1020');
  ctx.fillStyle = boardGrad;
  ctx.fillRect(x, y, size, size);

  for (let row = 0; row < 4; row++) {
    for (let col = 0; col < 4; col++) {
      const px = x + col * cell + 7;
      const py = y + row * cell + 7;
      const s = cell - 14;
      ctx.save();
      ctx.globalAlpha = 0.62;
      ctx.fillStyle = '#172333';
      roundRect(ctx, px, py, s, s, 8);
      ctx.fill();
      ctx.strokeStyle = 'rgba(126,234,255,0.22)';
      ctx.lineWidth = 1;
      roundRect(ctx, px, py, s, s, 8);
      ctx.stroke();
      ctx.restore();
    }
  }

  ctx.save();
  ctx.strokeStyle = 'rgba(126,234,255,0.26)';
  ctx.lineWidth = 1.5;
  for (let i = 1; i < 4; i++) {
    ctx.beginPath();
    ctx.moveTo(x + i * cell, y + 8);
    ctx.lineTo(x + i * cell, y + size - 8);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x + 8, y + i * cell);
    ctx.lineTo(x + size - 8, y + i * cell);
    ctx.stroke();
  }
  ctx.restore();

  // Contained victory beams. These are clipped to the mini-grid only.
  ctx.save();
  ctx.globalAlpha = 0.72;
  const hBeam = ctx.createLinearGradient(x + 8, y, x + size - 8, y);
  hBeam.addColorStop(0, 'rgba(199,125,255,0)');
  hBeam.addColorStop(0.18, 'rgba(199,125,255,0.70)');
  hBeam.addColorStop(0.5, 'rgba(126,234,255,0.95)');
  hBeam.addColorStop(0.82, 'rgba(199,125,255,0.70)');
  hBeam.addColorStop(1, 'rgba(126,234,255,0)');
  ctx.fillStyle = hBeam;
  ctx.shadowColor = '#c77dff';
  ctx.shadowBlur = 12;
  ctx.fillRect(x + 8, y + size * 0.53 - 4, size - 16, 8);

  const vBeam = ctx.createLinearGradient(x, y + 8, x, y + size - 8);
  vBeam.addColorStop(0, 'rgba(126,234,255,0)');
  vBeam.addColorStop(0.18, 'rgba(126,234,255,0.70)');
  vBeam.addColorStop(0.5, 'rgba(199,125,255,0.92)');
  vBeam.addColorStop(0.82, 'rgba(126,234,255,0.70)');
  vBeam.addColorStop(1, 'rgba(126,234,255,0)');
  ctx.fillStyle = vBeam;
  ctx.shadowColor = '#7eeaff';
  ctx.shadowBlur = 12;
  ctx.fillRect(x + size * 0.55 - 4, y + 8, 8, size - 16);
  ctx.restore();

  const glowPoints = [
    [0.28, 0.28],
    [0.72, 0.34],
    [0.50, 0.68]
  ];
  for (const [gx, gy] of glowPoints) {
    ctx.save();
    ctx.beginPath();
    ctx.arc(x + size * gx, y + size * gy, size * 0.055, 0, Math.PI * 2);
    ctx.fillStyle = '#00ff99';
    ctx.shadowColor = '#00ff99';
    ctx.shadowBlur = 18;
    ctx.fill();
    ctx.restore();
  }

  ctx.restore();

  ctx.save();
  ctx.strokeStyle = 'rgba(126,234,255,0.75)';
  ctx.lineWidth = 2;
  ctx.shadowColor = '#7eeaff';
  ctx.shadowBlur = 12;
  roundRect(ctx, x, y, size, size, radius);
  ctx.stroke();
  ctx.restore();
}

function drawStatCard(ctx, x, y, w, h, icon, value, label, accent = '#7eeaff') {
  ctx.save();
  const cardGrad = ctx.createLinearGradient(x, y, x, y + h);
  cardGrad.addColorStop(0, '#102033');
  cardGrad.addColorStop(1, '#0d141f');
  ctx.fillStyle = cardGrad;
  ctx.strokeStyle = 'rgba(126,234,255,0.58)';
  ctx.lineWidth = 2;
  ctx.shadowColor = 'rgba(126,234,255,0.36)';
  ctx.shadowBlur = 10;
  roundRect(ctx, x, y, w, h, 13);
  ctx.fill();
  ctx.stroke();
  ctx.restore();

  ctx.save();
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.font = '30px Arial, sans-serif';
  ctx.fillStyle = accent;
  ctx.shadowColor = accent;
  ctx.shadowBlur = 8;
  ctx.fillText(icon, x + w / 2, y + 28);

  const valueText = String(value);
  ctx.shadowBlur = 0;
  ctx.fillStyle = valueText.length > 9 ? '#dffaff' : '#ffffff';
  ctx.font = valueText.length > 9 ? 'bold 23px Arial, sans-serif' : 'bold 31px Arial, sans-serif';
  drawWrappedText(ctx, valueText, x + w / 2, y + 66, w - 18, 27, 'center', 2);

  ctx.font = '20px Arial, sans-serif';
  ctx.fillStyle = '#9ff2ff';
  ctx.fillText(label, x + w / 2, y + h - 20);
  ctx.restore();
}

function drawChallengePanel(ctx, text, x, y, w) {
  const h = 148;
  ctx.save();
  const panelGrad = ctx.createLinearGradient(x, y, x + w, y + h);
  panelGrad.addColorStop(0, '#102033');
  panelGrad.addColorStop(0.65, '#171a26');
  panelGrad.addColorStop(1, '#251334');
  ctx.fillStyle = panelGrad;
  ctx.strokeStyle = 'rgba(126,234,255,0.58)';
  ctx.lineWidth = 2;
  ctx.shadowColor = 'rgba(126,234,255,0.25)';
  ctx.shadowBlur = 8;
  roundRect(ctx, x, y, w, h, 18);
  ctx.fill();
  ctx.stroke();
  ctx.restore();

  ctx.save();
  const iconX = x + 48;
  const iconY = y + h / 2;
  ctx.strokeStyle = '#7eeaff';
  ctx.fillStyle = '#121927';
  ctx.lineWidth = 3;
  ctx.shadowColor = '#7eeaff';
  ctx.shadowBlur = 10;
  ctx.beginPath();
  ctx.arc(iconX, iconY, 24, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
  ctx.fillStyle = '#7eeaff';
  ctx.beginPath();
  ctx.moveTo(iconX, iconY - 13);
  ctx.lineTo(iconX + 6, iconY);
  ctx.lineTo(iconX, iconY + 13);
  ctx.lineTo(iconX - 6, iconY);
  ctx.closePath();
  ctx.fill();
  ctx.restore();

  const phrase = String(text || '');
  const splitIndex = phrase.indexOf('. ');
  const first = splitIndex > -1 ? phrase.slice(0, splitIndex + 1) : phrase;
  const second = splitIndex > -1 ? phrase.slice(splitIndex + 2) : '';
  const textX = x + 92;
  const textW = w - 120;

  ctx.save();
  ctx.textAlign = 'left';
  ctx.fillStyle = '#bff6ff';
  ctx.font = 'bold 29px Arial, sans-serif';
  let nextY = drawWrappedText(ctx, first, textX, y + 52, textW, 34, 'left', 2);
  if (second) {
    ctx.font = '27px Arial, sans-serif';
    ctx.fillStyle = '#dffaff';
    drawWrappedText(ctx, second, textX, nextY + 4, textW, 32, 'left', 2);
  }
  ctx.restore();

  return h;
}

function drawWrappedText(ctx, text, x, y, maxWidth, lineHeight, align = 'left', maxLines = Infinity) {
  const value = String(text || '');
  const words = value.split(/\s+/).filter(Boolean);
  const previousAlign = ctx.textAlign;
  ctx.textAlign = align;
  let line = '';
  let linesDrawn = 0;

  for (let i = 0; i < words.length; i++) {
    const testLine = line ? `${line} ${words[i]}` : words[i];
    const metrics = ctx.measureText(testLine);
    if (metrics.width > maxWidth && line) {
      if (linesDrawn < maxLines) {
        ctx.fillText(line, x, y);
        y += lineHeight;
        linesDrawn++;
      }
      line = words[i];
    } else {
      line = testLine;
    }
  }

  if (line && linesDrawn < maxLines) {
    ctx.fillText(line, x, y);
    y += lineHeight;
  }

  ctx.textAlign = previousAlign;
  return y;
}

function downloadVictoryImage() {
  // --- Analytics: share_result_clicked ---
  trackEvent('share_result_clicked', {
    puzzle_id: puzzle.id,
    rank: getRank(),
    toggles
  });

  try {
    const result = getResultData();
    const canvas = createVictoryImageCanvas();
    const link = document.createElement('a');
    link.download = `lasergrid-result-puzzle-${result.puzzleId}.png`;
    link.href = canvas.toDataURL('image/png');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (err) {
    console.error('Image download failed:', err);
    alert('Image download failed. Please use Copy Result for now.');
  }
}

async function createVictoryImageFile() {
  const result = getResultData();
  const canvas = createVictoryImageCanvas();

  const blob = await new Promise((resolve, reject) => {
    canvas.toBlob((generatedBlob) => {
      if (generatedBlob) {
        resolve(generatedBlob);
      } else {
        reject(new Error('Could not create result image.'));
      }
    }, 'image/png');
  });

  return new File(
    [blob],
    `lasergrid-result-puzzle-${result.puzzleId}.png`,
    { type: 'image/png' }
  );
}

async function shareResult() {
  // --- Analytics: share_result_clicked ---
  trackEvent('share_result_clicked', {
    puzzle_id: puzzle.id,
    rank: getRank(),
    toggles
  });

  const result = getResultData();
  const text = `I solved LaserGrid #${result.puzzleId}: ${result.puzzleTitle} (${result.difficulty}) in ${result.toggles} toggles. ${result.challengePhrase}`;
  const shareData = {
    title: 'LaserGrid Result',
    text,
    url: result.url
  };

  if (!navigator.share) {
    showShareFallback(generateShareText());
    return;
  }

  try {
    const file = await createVictoryImageFile();
    const fileShareData = {
      ...shareData,
      files: [file]
    };

    if (!navigator.canShare || navigator.canShare(fileShareData)) {
      await navigator.share(fileShareData);
      return;
    }
  } catch (err) {
    // If the image/file path fails, fall back to text + URL share below.
  }

  try {
    await navigator.share(shareData);
  } catch (err) {
    // AbortError usually means the user dismissed the native share sheet.
    if (err && err.name === 'AbortError') return;
    showShareFallback(generateShareText());
  }
}

function wrapCanvasText(ctx, text, x, y, maxWidth, lineHeight, centered = false) {
  const words = String(text || '').split(' ');
  let line = '';
  const startX = x;

  for (let i = 0; i < words.length; i++) {
    const testLine = line ? `${line} ${words[i]}` : words[i];
    const metrics = ctx.measureText(testLine);

    if (metrics.width > maxWidth && line) {
      ctx.fillText(line, startX, y);
      line = words[i];
      y += lineHeight;
    } else {
      line = testLine;
    }
  }

  if (line) {
    ctx.fillText(line, startX, y);
    y += lineHeight;
  }

  return y;
}

function roundRect(ctx, x, y, width, height, radius) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
}

// --- M13B: Victory Celebration Overlay ---
function showCelebration() {
  document.body.classList.add('win-flash');
  const board = document.getElementById('board');
  if (board) board.classList.add('celebrating-win');
  const overlay = document.getElementById('win-celebration');
  if (overlay) {
    overlay.style.display = 'flex';
    overlay.setAttribute('aria-hidden', 'false');
  }
}

function hideCelebration() {
  document.body.classList.remove('win-flash');
  const board = document.getElementById('board');
  if (board) board.classList.remove('celebrating-win');
  const overlay = document.getElementById('win-celebration');
  if (overlay) {
    overlay.style.display = 'none';
    overlay.setAttribute('aria-hidden', 'true');
  }
}
