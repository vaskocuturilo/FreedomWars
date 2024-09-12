let state = {};

const canvas = document.getElementById("game");
canvas.width = window.innerWidth * window.devicePixelRatio;
canvas.height = window.innerHeight * window.devicePixelRatio;
canvas.style.width = window.innerWidth + "px";
canvas.style.height = window.innerHeight + "px";
const ctx = canvas.getContext("2d");

const currentHour = new Date().getHours();

const isNight = currentHour >= 18 || currentHour < 6;

const settings = {
  numberOfPlayers: 1,
  mode: isNight ? "dark" : "light",
};

state = {
  backgroundBuildings: [],
  buildings: [],
  shift: 0,
  scale: 1,
  stars: generateStars(100),
};

draw();

function draw() {
  ctx.save();

  ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

  drawBackgroundSky();

  ctx.translate(0, window.innerHeight);
  ctx.scale(1, -1);

  ctx.translate(state.shift, 0);
  ctx.scale(state.scale, state.scale);

  drawBackgroundSunOrMoon();

  ctx.restore();
}

function drawBackgroundSky() {
  const gradient = ctx.createLinearGradient(0, 0, 0, window.innerHeight);
  if (settings.mode === "dark") {
    gradient.addColorStop(1, "#27507F");
    gradient.addColorStop(0, "#58A8D8");
  } else {
    gradient.addColorStop(1, "#F8BA85");
    gradient.addColorStop(0, "#FFC28E");
  }

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

  if (settings.mode === "dark") {
    ctx.fillStyle = "white";
    state.stars.forEach((star) => {
      ctx.fillRect(star.x, star.y, 1, 1);
    });
  }
}

function drawBackgroundSunOrMoon() {
  if (settings.mode === "dark") {
    ctx.fillStyle = "rgba(255, 255, 255, 0.6)";
    ctx.beginPath();
    ctx.arc(
      window.innerWidth - 200,
      window.innerHeight - 100,
      100,
      0,
      2 * Math.PI
    );
    ctx.fill();
  } else {
    ctx.fillStyle = "yellow";
    ctx.beginPath();
    ctx.arc(100, window.innerHeight - 100, 50, 0, 2 * Math.PI);
    ctx.fill();
  }
}

function generateStars(count) {
  const stars = [];
  for (let i = 0; i < count; i++) {
    const star = {
      x: Math.random() * window.innerWidth,
      y: (Math.random() * window.innerHeight) / 2,
    };
    stars.push(star);
  }
  return stars;
}
