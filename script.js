/*
 * This code was written by Azuan — with love, bugs, and late-night heartbreaks.
 * Supported by XiezuMedia, who believed in the chaos.
 *
 * © 2025 Zykuan & XiezuMedia. All rights reserved.
 * Feel free to use or cherish it, like a good ex...
 * But remove this watermark? That’s like forgetting who loved you first.
 * And trust me — we notice.
 *
 * Don’t ghost the author.
 * www.instagram.com/zuanxfnd
 */


// Daftar grup WhatsApp yang akan ditampilkan di UI
const groups = [
  {
    title: "Calestia’s Number 💖",
    header: "Reach Your Favorite Bot",
    description:
      "The easiest way to reach your favorite bot! Start chatting and let the magic begin.",
    image: "https://nauval.cloud/download/soo.jpg   ",
    url: "https://wa.me/6282133532380   ",
    icon: "fa-phone",
    color: "bg-pink-500",
    buttonText: "Chat With Bot",
    buttonIcon: "fa-comment-dots"
  },
  {
    title: "Official Group 🌟",
    header: "Join Our Official Community",
    description:
      "Join the official group where all Calestars unite. Stay connected and be part of something amazing!",
    image: "https://nauval.cloud/download/cales.jpg   ",
    url: "https://chat.whatsapp.com/HDockZJ48S82HUhsxu85kH   ",
    icon: "fa-users",
    color: "bg-purple-500",
    buttonText: "Join Community",
    buttonIcon: "fa-user-friends"
  },
  {
    title: "Official Channel 📢",
    header: "Stay Updated with Us",
    description:
      "Stay updated with all the latest news and announcements in our official channel. No distractions, just the essentials!",
    image: "https://nauval.cloud/download/wa.jpg   ",
    url: "https://whatsapp.com/channel/0029VapSsRCGJP8CHvDLT11f",
    icon: "fa-bullhorn",
    color: "bg-blue-500",
    buttonText: "Follow to Channel",
    buttonIcon: "fa-bullhorn"
  }
];

let activeIndex = null;

/**
 * Inisialisasi daftar grup di halaman
 */
function initGroups() {
  const groupsContainer = document.getElementById("groups");
  groupsContainer.innerHTML = "";

  groups.forEach((group, index) => {
    const card = document.createElement("div");
    card.className = `
      group-card 
      bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 mb-1 hover:shadow-lg cursor-pointer 
      ${activeIndex === index ? "ring-2 ring-blue-500" : ""}
    `;
    card.style.opacity = "0";
    card.style.transform = "translateY(20px)";
    card.style.animation = `fadeInUp 0.5s ease-out ${index * 0.1}s forwards`;

    card.innerHTML = `
      <div class="p-5" onclick="toggleGroupDetail(${index}, event)">
        <div class="flex items-center gap-4">
          <div class="relative">
            <img src="${group.image}" alt="${group.title}" class="w-14 h-14 rounded-xl object-cover border-2 border-white shadow-sm">
            <span class="absolute -bottom-1 -right-1 ${group.color} w-6 h-6 rounded-full flex items-center justify-center text-white text-xs">
              <i class="fas ${group.icon}"></i>
            </span>
          </div>
          <div class="flex-1">
            <h3 class="font-bold text-gray-800">${group.title}</h3>
            <p class="text-sm text-gray-500 mt-1">${group.header.substring(0, 60)}...</p>
          </div>
          <i class="fas fa-chevron-down text-gray-400 transition-transform duration-300 ${
            activeIndex === index ? "transform rotate-180" : ""
          }"></i>
        </div>
      </div>
      <div id="detail-${index}" class="transition-all duration-300 overflow-hidden max-h-0">
        <div class="px-5 pb-5 pt-0 border-t border-gray-100">
          <p class="text-gray-600 text-sm mb-4">${group.description}</p>
          <a href="${group.url}" target="_blank" 
             class="inline-flex items-center justify-center w-full ${
               group.color.replace("500", "500")
             } hover:${group.color.replace("500", "600")} text-white py-2 px-4 rounded-lg shadow-sm transition-all">
            <i class="fas ${group.buttonIcon} mr-2"></i> <!-- Dinamis -->
            ${group.buttonText}
          </a>
        </div>
      </div>
    `;

    groupsContainer.appendChild(card);

    setTimeout(() => {
      card.style.opacity = "1";
      card.style.transform = "translateY(0)";
    }, index * 100);
  });
}

/**
 * Toggle detail grup saat diklik
 */
function toggleGroupDetail(index, event) {
  if (
    event.target.tagName === "A" ||
    event.target.parentElement.tagName === "A"
  )
    return;

  const detail = document.getElementById(`detail-${index}`);
  const allCards = document.querySelectorAll(".group-card");
  const allArrows = document.querySelectorAll(".fa-chevron-down");

  document.querySelectorAll('[id^="detail-"]').forEach((el, i) => {
    if (i !== index && el.classList.contains("max-h-[300px]")) {
      el.classList.remove("max-h-[300px]");
      el.classList.add("max-h-0");
      allCards[i].classList.remove("ring-2", "ring-blue-500");
      allArrows[i].classList.remove("rotate-180");
    }
  });

  if (detail.classList.contains("max-h-[300px]")) {
    detail.classList.remove("max-h-[300px]");
    detail.classList.add("max-h-0");
    allCards[index].classList.remove("ring-2", "ring-blue-500");
    allArrows[index].classList.remove("rotate-180");
    activeIndex = null;
  } else {
    detail.classList.remove("max-h-0");
    detail.classList.add("max-h-[300px]");
    allCards[index].classList.add("ring-2", "ring-blue-500");
    allArrows[index].classList.add("rotate-180");
    activeIndex = index;

    setTimeout(() => {
      detail.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }, 100);
  }
}

/**
 * Loader untuk animasi loading halaman
 */
const pageLoader = document.getElementById("page-loader");

function showLoader() {
  document.documentElement.style.scrollBehavior = "auto";
  const scrollPosition = window.scrollY;
  document.body.style.top = `-${scrollPosition}px`;
  document.body.classList.add("fixed", "w-full");

  if (pageLoader) {
    pageLoader.style.display = "flex";
    setTimeout(() => {
      pageLoader.style.opacity = "1";
    }, 10);
  }
}

function hideLoader() {
  if (pageLoader) {
    pageLoader.style.opacity = "0";
    setTimeout(() => {
      pageLoader.style.display = "none";
      document.body.classList.remove("fixed", "w-full");
      const scrollPosition = parseInt(document.body.style.top || "0") * -1;
      document.body.style.top = "";
      document.documentElement.style.scrollBehavior = "smooth";
      window.scrollTo({ top: scrollPosition, behavior: "auto" });

      // Tampilkan konten utama setelah loading selesai
      const mainContent = document.getElementById("main-content");
      if (mainContent) {
      mainContent.style.visibility = "visible";
      mainContent.style.opacity = "1";
      }

      initGroups(); // jika kamu punya fungsi inisialisasi
    }, 500);
  }
}


document.addEventListener("DOMContentLoaded", () => {
  const style = document.createElement("style");
  style.textContent = `
    @keyframes fadeInUp {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `;
  document.head.appendChild(style);
  showLoader();
  setTimeout(hideLoader, 1500);
});

window.toggleGroupDetail = toggleGroupDetail;

  const text = "Hey, Calestars!";
  const element = document.getElementById("typing-text");
  let index = 0;
  let isDeleting = false;

  function typeEffect() {
    if (!isDeleting) {
      element.textContent = text.slice(0, index++);
      if (index > text.length) {
        isDeleting = true;
        setTimeout(typeEffect, 1500); // delay sebelum hapus
        return;
      }
    } else {
      element.textContent = text.slice(0, --index);
      if (index === 0) {
        isDeleting = false;
      }
    }
    setTimeout(typeEffect, isDeleting ? 50 : 120);
  }

  // Mulai saat konten siap
  document.addEventListener("DOMContentLoaded", typeEffect);

  function animateCount(elementId, finalValue = 3000, cycleDuration = 2000, pauseAfterFinal = 4000) {
    const el = document.getElementById(elementId);

    function randomize() {
      const startTime = performance.now();
      let animationFrame;

      function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / cycleDuration, 1);
        const easedProgress = 1 - Math.pow(1 - progress, 2); // ease-out
        const value = Math.floor(Math.random() * finalValue * (1 - easedProgress)) + finalValue * easedProgress;

        el.textContent = Math.floor(value).toLocaleString();

        if (progress < 1) {
          animationFrame = requestAnimationFrame(update);
        } else {
          el.textContent = finalValue.toLocaleString();
          setTimeout(randomize, pauseAfterFinal); // tunggu sebelum ulang
        }
      }

      animationFrame = requestAnimationFrame(update);
    }

    randomize();
  }

  document.addEventListener("DOMContentLoaded", () => {
    animateCount("user-count", 3000, 2500, 5000); // 2.5s acak, 5s stabil
  });

  const phrases = [
  "Always With You",
  "Under The Stars",
  "Forever Feels Short",
  "Glowing Beside You",
  "Orbiting Your Light",
  "Starlit With You",
  "In Every Galaxy",
  "Warmed By Us"
];

  function cyclePhrases(elementId, phraseList, delay = 5000) {
  const el = document.getElementById(elementId);
  let index = 0;

  setInterval(() => {
    index = (index + 1) % phraseList.length;
    el.textContent = phraseList[index];
  }, delay);
}

document.addEventListener("DOMContentLoaded", () => {
  cyclePhrases("romantic-phrase", phrases, 5000);
});

/**
 * Music Player Logic
 */
const audio = new Audio("Hearts2Hearts.mp3"); // audio lokal
const playBtn = document.getElementById("play-pause-btn");
const playIcon = document.getElementById("play-icon");
const pauseIcon = document.getElementById("pause-icon");
const title = document.getElementById("song-title");
const artist = document.getElementById("artist-name");
const cover = document.getElementById("album-cover");
const progressBar = document.getElementById("progress-bar");
const progressPointer = document.getElementById("progress-pointer");
const progressContainer = document.getElementById("progress-container");
const currentTimeEl = document.getElementById("current-time");
const totalDurationEl = document.getElementById("total-duration");

let isPlaying = false;
let isDragging = false;

/**
 * Format durasi ke MM:SS
 */
function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
}

audio.addEventListener("loadedmetadata", () => {
  totalDurationEl.textContent = formatTime(audio.duration);
});

/**
 * Update progress bar & pointer
 */
function updateProgress() {
  if (!isNaN(audio.duration)) {
    const progressPercent = (audio.currentTime / audio.duration) * 100;
    progressBar.style.width = `${progressPercent}%`;
    progressPointer.style.left = `${progressPercent}%`;
    currentTimeEl.textContent = formatTime(audio.currentTime);
  }
}

/**
 * Toggle play/pause
 */
playBtn.addEventListener("click", () => {
  if (!isPlaying) {
    audio.play();
    playIcon.classList.add("hidden");
    pauseIcon.classList.remove("hidden");
    isPlaying = true;
  } else {
    audio.pause();
    pauseIcon.classList.add("hidden");
    playIcon.classList.remove("hidden");
    isPlaying = false;
  }
});

setInterval(updateProgress, 1000);

/**
 * Drag pointer untuk seek
 */
progressPointer.addEventListener("mousedown", (e) => {
  e.preventDefault(); // Hindari drag seleksi
  isDragging = true;
});

document.addEventListener("mousemove", (e) => {
  if (isDragging) seek(e);
});

document.addEventListener("mouseup", () => {
  if (isDragging) {
    isDragging = false;
    seek({
      clientX: progressPointer.getBoundingClientRect().left + 5
    }); // Update posisi akhir
  }
});

progressContainer.addEventListener("touchstart", (e) => {
  isDragging = true;
  seek(e.touches[0]);
});

progressContainer.addEventListener("touchmove", (e) => {
  if (isDragging) seek(e.touches[0]);
});

progressContainer.addEventListener("touchend", () => {
  if (isDragging) {
    isDragging = false;
    seek({
      clientX: progressPointer.getBoundingClientRect().left + 5
    });
  }
});

/**
 * Fungsi utama untuk mencari posisi lagu
 */
function seek(event) {
  const rect = progressContainer.getBoundingClientRect();
  let offsetX = event.clientX - rect.left;

  if (offsetX < 0) offsetX = 0;
  if (offsetX > rect.width) offsetX = rect.width;

  const percent = offsetX / rect.width;
  const newTime = percent * audio.duration;

  if (isDragging) {
    progressBar.style.width = `${percent * 100}%`;
    progressPointer.style.left = `${percent * 100}%`;
    currentTimeEl.textContent = formatTime(newTime);
  } else {
    audio.currentTime = newTime;
    updateProgress();
  }
}

progressContainer.addEventListener("click", (e) => {
  if (!isDragging) seek(e);
});

window.addEventListener("beforeunload", () => {
  audio.pause();
});


// Update tampilan lirik berdasarkan waktu audio
let lyrics = []

async function loadLyrics() {
  const res = await fetch('style.lrc') 
  const text = await res.text()

  lyrics = []
  const lines = text.split('\n')
  for (let line of lines) {
    const matches = [...line.matchAll(/\[(\d+):(\d+)(?:\.(\d+))?\](.*)/g)]
    for (let match of matches) {
      const min = parseInt(match[1])
      const sec = parseInt(match[2])
      const ms = parseInt(match[3] || '0')
      const time = min * 60 + sec + ms / 1000
      const text = match[4].trim()
      if (text) lyrics.push({ time, text })
    }
  }

  // Masukkan lirik ke HTML
  const lyricsList = document.getElementById("lyrics-list")
  lyricsList.innerHTML = ''
  for (let line of lyrics) {
    const li = document.createElement("li")
    li.textContent = line.text
    lyricsList.appendChild(li)
  }
}

// Update tampilan lirik berdasarkan waktu audio
let lastActiveIndex = -1;

function updateLyrics() {
  if (!lyrics.length) return;

  const time = audio.currentTime;
  let activeIndex = 0;

  for (let i = 0; i < lyrics.length; i++) {
    if (time >= lyrics[i].time) activeIndex = i;
    else break;
  }

  if (activeIndex !== lastActiveIndex) {
    const items = document.querySelectorAll("#lyrics-list li");
    const container = document.getElementById("lyrics-container");
    const activeItem = items[activeIndex];

    // Update highlighting
    items.forEach((item, i) => {
      item.classList.toggle("active-lyric", i === activeIndex);
    });

    // Scroll ke tengah container
    if (activeItem && container) {
      const itemOffset = activeItem.offsetTop;
      const itemHeight = activeItem.offsetHeight;
      const scrollPosition = itemOffset - container.clientHeight / 2 + itemHeight / 2;

      container.scrollTo({
        top: scrollPosition,
        behavior: "smooth"
      });
    }

    lastActiveIndex = activeIndex;
  }
}


setInterval(updateLyrics, 1);
loadLyrics()

/**
 * Inisialisasi dark mode
 */
const toggleBtn = document.getElementById("darkModeToggle");

if (toggleBtn) {
  const body = document.body;
  const toggleSpan = toggleBtn.querySelector("span");

  if (toggleSpan) {
    toggleSpan.classList.add("transition-all");

    const isDarkMode = localStorage.getItem("darkMode") === "true";

    if (isDarkMode) {
      body.classList.add("dark-mode");
      toggleSpan.style.transform = "translateX(22px)";
      const toggleIcon = toggleBtn.querySelector("i");
      if (toggleIcon) {
        toggleIcon.className = "fas fa-sun text-xs text-yellow-300";
      }
    }

    toggleBtn.addEventListener("click", () => {
      body.classList.toggle("dark-mode");
      const isActive = body.classList.contains("dark-mode");

      const sunIcon = "fas fa-sun text-xs text-yellow-300";
      const moonIcon = "fas fa-moon text-xs text-gray-700";
      const toggleIcon = toggleBtn.querySelector("i");

      if (toggleIcon) {
        toggleIcon.className = isActive ? sunIcon : moonIcon;
      }

      toggleSpan.style.transform = isActive
        ? "translateX(22px)"
        : "translateX(0.5px)";

      localStorage.setItem("darkMode", isActive);
      updateDarkTextElements(isActive);
    });
  }
}


/**
 * Update warna teks sesuai mode gelap/terang
 */
function updateDarkTextElements(isDark) {
  document.querySelectorAll("[data-dark-text]").forEach((el) => {
    const defaultClasses = Array.from(el.classList)
      .filter((c) => !c.startsWith("text-"))
      .join(" ");
    const darkClass = el.getAttribute("data-dark-text");
    el.className = isDark
      ? `${defaultClasses} ${darkClass}`
      : defaultClasses;
  });
}

document.addEventListener("DOMContentLoaded", () => {
  updateDarkTextElements(localStorage.getItem("darkMode") === "true");
  setTimeout(() => {
    initGroups();
  }, 100);
});

document.addEventListener("DOMContentLoaded", () => {
  const messages = [
    "Nomor bot utama kadang diblokir. Jangan ketinggalan info, yuk join grup resmi 💌",
    "Bot terkadang hanya aktif di grup. Untuk menghindari nomor terblokir ✨"
  ];

  let index = 0;
  const container = document.getElementById("info-container");
  const wrapperWidth = document.querySelector(".w-full").offsetWidth;

  function showMessage(text) {
    container.innerText = text;
    container.style.transition = "none";
    container.style.left = `${wrapperWidth}px`;
    container.style.opacity = 1;

    void container.offsetWidth;

    const textWidth = container.offsetWidth;
    const duration = (textWidth + wrapperWidth) / 90 * 1000;

    container.style.transition = `left ${duration}ms linear`;
    container.style.left = `-${textWidth}px`;

    setTimeout(() => {
      index = (index + 1) % messages.length;
      showMessage(messages[index]);
    }, duration);
  }

  showMessage(messages[index]);
});
/**
 * Inisialisasi plan selector
 */
function initPlans() {
  document.querySelectorAll(".select-plan").forEach((button) => {
    button.addEventListener("click", (event) => {
      const card = event.target.closest(".card-hover");
      const planName = card.querySelector("h3:nth-of-type(1)").innerText.trim();
      const priceDurationElement = card.querySelector("h3:nth-of-type(2)");
      const priceText = priceDurationElement
        .querySelector("span")
        .previousSibling.textContent.trim();
      const duration =
        priceDurationElement
          .querySelector("span")
          .innerText.trim()
          .replace(/\D+/g, "") + " days";
      let price = parseInt(priceText.replace("K", "000"));
      const priceFormatted = price.toLocaleString("id-ID");

      let message = `*Hi Admin! I'd like to place an order 🍀*
      
*📑 Plan:* ${planName}  
*💰 Price:* Rp${priceFormatted}  
*📆 Duration:* ${duration}  

*📃 Payment method:* Please choose one — Dana, Shopeepay, or QRIS`;

      if (planName === "Inviting bots to groups") {
        message += `\n*Link Group:* isi url group, pastikan tidak diprivat`;
      }

      const whatsappUrl = `https://wa.me/628979440862?text= ${encodeURIComponent(
        message
      )}`;
      window.open(whatsappUrl, "_blank");
    });
  });

  const cards = document.querySelectorAll(".card-hover");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      entry.target.classList.toggle("active", entry.isIntersecting);
    });
  }, { threshold: 0.5 });

  cards.forEach((card) => observer.observe(card));
}

document.addEventListener("DOMContentLoaded", function () {
  initPlans();
});
