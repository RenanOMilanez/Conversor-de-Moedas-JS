// Fundo interativo de "rede digital"
const canvas = document.getElementById("tech-bg");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let points = [];

for (let i = 0; i < 100; i++) {
  points.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    vx: (Math.random() - 0.5) * 0.5,
    vy: (Math.random() - 0.5) * 0.5,
  });
}

function drawLines() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < points.length; i++) {
    const p1 = points[i];
    p1.x += p1.vx;
    p1.y += p1.vy;

    if (p1.x < 0 || p1.x > canvas.width) p1.vx *= -1;
    if (p1.y < 0 || p1.y > canvas.height) p1.vy *= -1;

    ctx.beginPath();
    ctx.arc(p1.x, p1.y, 1.5, 0, Math.PI * 2);
    ctx.fillStyle = "#00ffff";
    ctx.fill();

    for (let j = i + 1; j < points.length; j++) {
      const p2 = points[j];
      const dx = p1.x - p2.x;
      const dy = p1.y - p2.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < 100) {
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.strokeStyle = "rgba(0,255,255,0.1)";
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }
    }
  }
  requestAnimationFrame(drawLines);
}
drawLines();

// Função para conversão
async function convertCurrency() {
  const amount = document.getElementById('amount').value;
  const currency = document.getElementById('currency').value;
  const resultDiv = document.getElementById('result');

  if (!amount || amount <= 0) {
    resultDiv.innerText = "Digite um valor válido.";
    return;
  }

  try {
    const url = `https://economia.awesomeapi.com.br/json/last/${currency}-BRL`;
    const response = await fetch(url);
    const data = await response.json();

    const key = `${currency}BRL`;
    const rate = parseFloat(data[key].high);

    const converted = (amount / rate).toFixed(2);
    resultDiv.innerText = `R$ ${amount} = ${currency} ${converted}`;
  } catch (error) {
    resultDiv.innerText = "Erro ao buscar a cotação.";
    console.error(error);
  }
}
