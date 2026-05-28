// LaserGrid Game Logic (M0–M3)
// Only HTML, CSS, Vanilla JS. No frameworks.


// --- Puzzle Pack (M8) ---
const PUZZLES = [
  {
    id: 1,
    title: 'Tutorial Grid',
    gridSize: 4,
    requiredLasers: 2,
    cores: [
      { row: 0, col: 1, value: 2 },
      { row: 1, col: 3, value: 1 },
      { row: 2, col: 0, value: 1 },
    ],
    // intendedSolution: [ {row:0,col:0}, {row:1,col:1} ]
  },
  {
    id: 2,
    title: 'Crossfire',
    gridSize: 4,
    requiredLasers: 3,
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
    cores: [
      { row: 1, col: 1, value: 2 },
      { row: 1, col: 2, value: 2 },
      { row: 2, col: 1, value: 2 },
      { row: 2, col: 2, value: 2 },
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
  if (win) return; // No toggles after win
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
    opt.textContent = `#${pz.id}: ${pz.title}`;
    select.appendChild(opt);
  });
  select.value = currentPuzzleIndex;
}

function switchPuzzle(idx) {
  if (idx < 0 || idx >= PUZZLES.length) return;
  currentPuzzleIndex = idx;
  puzzle = { ...PUZZLES[currentPuzzleIndex] };
  selectedChallengePhrase = '';
  document.getElementById('puzzle-number').textContent = `Puzzle #${puzzle.id}`;
  document.getElementById('puzzle-title').textContent = puzzle.title;
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
      document.getElementById('puzzle-number').textContent = `Puzzle #${puzzle.id}`;
      document.getElementById('puzzle-title').textContent = puzzle.title;
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
    showVictoryModal();
  }
}

function showVictoryModal() {
  document.getElementById('victory-modal').style.display = 'flex';
  const result = getResultData();
  document.getElementById('modal-puzzle').textContent = `Puzzle #${result.puzzleId}`;
  document.getElementById('modal-size').textContent = result.gridSize;
  document.getElementById('modal-lasers').textContent = `Lasers: ${result.requiredLasers}`;
  document.getElementById('modal-time').textContent = `Time: ${result.time}`;
  document.getElementById('modal-toggles').textContent = `Toggles: ${result.toggles}`;
  document.getElementById('modal-rank').textContent = `Rank: ${result.rank}`;
  document.getElementById('modal-challenge').textContent = result.challengePhrase;
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
  document.getElementById('share-btn').addEventListener('click', copyShareText);

  document.getElementById('download-image-btn').addEventListener('click', downloadVictoryImage);

  // Initial load
  loadGameState();
  if (!localStorage.getItem(STORAGE_KEY)) {
    // If no save, show first puzzle
    puzzle = { ...PUZZLES[0] };
    currentPuzzleIndex = 0;
    document.getElementById('puzzle-number').textContent = `Puzzle #${puzzle.id}`;
    document.getElementById('puzzle-title').textContent = puzzle.title;
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

function downloadVictoryImage() {
  // --- Analytics: share_result_clicked ---
  trackEvent('share_result_clicked', {
    puzzle_id: puzzle.id,
    rank: getRank(),
    toggles
  });
  try {
    const result = getResultData();

    const canvas = document.createElement('canvas');
    canvas.width = 1080;
    canvas.height = 1350;
    const ctx = canvas.getContext('2d');

    // Background
    ctx.fillStyle = '#10131a';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Modal-like card
    const cardX = 90;
    const cardY = 110;
    const cardW = 900;
    const cardH = 1130;
    const radius = 42;

    ctx.fillStyle = '#181c24';
    roundRect(ctx, cardX, cardY, cardW, cardH, radius);
    ctx.fill();

    // Title
    ctx.textAlign = 'center';
    ctx.fillStyle = '#7eeaff';
    ctx.font = 'bold 72px Arial, sans-serif';
    ctx.fillText('Congratulations!', canvas.width / 2, 230);

    // Result details
    ctx.fillStyle = '#e0e6ed';
    ctx.font = '48px Arial, sans-serif';

    let y = 340;
    const centerX = canvas.width / 2;
    const lineGap = 66;

    ctx.fillText(`Puzzle #${result.puzzleId}`, centerX, y); y += lineGap;
    ctx.fillText(result.gridSize, centerX, y); y += lineGap;
    ctx.fillText(`Lasers: ${result.requiredLasers}`, centerX, y); y += lineGap;
    ctx.fillText(`Time: ${result.time}`, centerX, y); y += lineGap;
    ctx.fillText(`Toggles: ${result.toggles}`, centerX, y); y += lineGap;
    ctx.fillText(`Rank: ${result.rank}`, centerX, y); y += 88;

    // Challenge phrase
    ctx.fillStyle = '#ffe066';
    ctx.font = 'bold 44px Arial, sans-serif';
    y = wrapCanvasText(ctx, result.challengePhrase, centerX, y, 820, 56, true);
    y += 50;

    // Emoji timeline
    ctx.fillStyle = '#ffffff';
    ctx.font = '48px Arial, sans-serif';
    y = wrapCanvasText(ctx, result.timeline, centerX, y, 820, 64, true);
    y += 70;

    // Game link
    ctx.fillStyle = '#7eeaff';
    ctx.font = '30px Arial, sans-serif';
    ctx.fillText('Play LaserGrid:', centerX, y);
    y += 44;

    ctx.fillStyle = '#e0e6ed';
    ctx.font = '28px Arial, sans-serif';
    wrapCanvasText(ctx, result.url, centerX, y, 820, 38, true);

    // Download
    const link = document.createElement('a');
    link.download = `lasergrid-result-puzzle-${result.puzzleId}.png`;
    link.href = canvas.toDataURL('image/png');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (err) {
    console.error('Image download failed:', err);
    alert('Image download failed. Please use Copy Text for now.');
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
