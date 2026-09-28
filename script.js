document.addEventListener('DOMContentLoaded', function () {
  const startButton = document.getElementById('startBtn');
  const intro = document.getElementById('intro');
  const mainContent = document.getElementById('mainContent');
  const lineElement = document.getElementById('line');
  const finalBlock = document.getElementById('final');
  const msgYes = document.getElementById('msgYes');
  const bgMusic = document.getElementById('bgMusic');
  const btnNo = document.getElementById('btnNo');
  const btnYes = document.getElementById('btnYes');

  // Tạo hiệu ứng trái tim bay nền lung linh
  setInterval(() => {
    const heart = document.createElement('div');
    heart.classList.add('heart-particle');
    heart.innerHTML = ['❤️', '💖', '✨', '💕', '🌸'][Math.floor(Math.random() * 5)];
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.animationDuration = (Math.random() * 3 + 3) + 's';
    document.getElementById('heartsBg').appendChild(heart);
    setTimeout(() => heart.remove(), 6000);
  }, 400);

  const lines = [
    "Từ lần đầu gặp cậu, tớ đã biết tim mình không ổn.",
    "Mỗi tin nhắn từ cậu làm tớ rung lên từng nhịp.",
    "Tớ đã nghĩ mãi… liệu có nên nói điều này không.",
    "Nhưng nếu không nói thì sẽ tiếc cả đời.",
    "Nên hôm nay, tớ quyết định nói ra...",
    "Tớ thích cậu!"
  ];

  let currentLine = 0;

  startButton.addEventListener('click', () => {
    intro.classList.remove('active');
    mainContent.classList.add('active');
    playBackgroundMusic();
    showLine(lines[currentLine]);
  });

  function playBackgroundMusic() {
    bgMusic.play().catch((error) => {
      console.error('Lỗi phát nhạc:', error);
    });
  }

  function showLine(text) {
    lineElement.innerHTML = '';
    let charIndex = 0;
    const p = document.createElement('p');
    p.style.margin = '0';
    lineElement.appendChild(p);

    const typingInterval = setInterval(() => {
      if (charIndex < text.length) {
        p.innerHTML += text.charAt(charIndex);
        charIndex++;
      } else {
        clearInterval(typingInterval);
        setTimeout(() => fadeOutCurrentLine(() => {
          currentLine++;
          if (currentLine < lines.length) {
            showLine(lines[currentLine]);
          } else {
            lineElement.style.display = 'none';
            finalBlock.classList.add('active');
          }
        }), 850);
      }
    }, 70);
  }

  function fadeOutText(callback) {
    // Tên hàm hỗ trợ
    callback();
  }

  function fadeOutCurrentLine(callback) {
    lineElement.classList.add('fade-out');
    setTimeout(() => {
      lineElement.classList.remove('fade-out');
      lineElement.innerHTML = '';
      callback();
    }, 500);
  }

  // Khi bấm Đồng ý
  btnYes.addEventListener('click', () => {
    finalBlock.classList.remove('active');
    msgYes.classList.add('active');
    bgMusic.pause();
    bgMusic.currentTime = 0;

    if (typeof confetti === 'function') {
      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6 }
      });
    }
  });

  let noScale = 1;
  let yesScale = 1;

  const noMessages = [
    "Không",
    "Thật á? 🥺",
    "Suy nghĩ lại đi...",
    "Bấm nhầm đúng hông?",
    "Đồng ý đi mừaa ~"
  ];
  let msgIndex = 0;

  function handleNoAction(e) {
    e.preventDefault();
    noScale -= 0.15;
    yesScale += 0.3;

    if (noScale <= 0.1) {
      noScale = 0.1;
      btnNo.style.display = 'none';
    } else {
      btnNo.style.transform = `scale(${noScale})`;
      msgIndex = (msgIndex + 1) % noMessages.length;
      btnNo.innerText = noMessages[msgIndex];
    }

    btnYes.style.transform = `scale(${yesScale})`;
  }

  btnNo.addEventListener('click', handleNoAction);
});