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
    image: "https://nauval.cloud/download/soo.jpg",
    url: "https://wa.me/6282133532380",
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
    image: "https://nauval.cloud/download/cales.jpg",
    url: "https://chat.whatsapp.com/HDockZJ48S82HUhsxu85kH",
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
    image: "https://nauval.cloud/download/wa.jpg",
    url: "https://whatsapp.com/channel/0029VapSsRCGJP8CHvDLT11f",
    icon: "fa-bullhorn",
    color: "bg-blue-500",
    buttonText: "Follow to Channel",
    buttonIcon: "fa-bullhorn"
  }
];

let activeIndex = null;

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
               group.color
             } text-white py-2 px-4 rounded-lg shadow-sm transition-all">
            <i class="fas ${group.buttonIcon} mr-2"></i>
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

function toggleGroupDetail(index, event) {
  if (event.target.tagName === "A" || event.target.parentElement.tagName === "A")
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

// Animasi teks
document.addEventListener("DOMContentLoaded", () => {
  const text = "Hey, Calestars!";
  const element = document.getElementById("typing-text");
  let index = 0;
  let isDeleting = false;

  function typeEffect() {
    if (!isDeleting) {
      element.textContent = text.slice(0, index++);
      if (index > text.length) {
        isDeleting = true;
        setTimeout(typeEffect, 1500);
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

  typeEffect();
});

// Hitung user & frase romantis
function animateCount(elementId, finalValue = 3000) {
  const el = document.getElementById(elementId);
  let current = 0;
  const interval = setInterval(() => {
    current += 30;
    el.textContent = current.toLocaleString();
    if (current >= finalValue) clearInterval(interval);
  }, 30);
}

document.addEventListener("DOMContentLoaded", () => {
  animateCount("user-count", 3000);
  initGroups();
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

// Music Player
const audio = new Audio("Hearts2Hearts.mp3");
const playBtn = document.getElementById("play-pause-btn");
const playIcon = document.getElementById("play-icon");
const pauseIcon = document.getElementById("pause-icon");
const progressBar = document.getElementById("progress-bar");
const progressPointer = document.getElementById("progress-pointer");
const progressContainer = document.getElementById("progress-container");
const currentTimeEl = document.getElementById("current-time");
const totalDurationEl = document.getElementById("total-duration");
let isPlaying = false;
let isDragging = false;

function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
}

audio.addEventListener("loadedmetadata", () => {
  totalDurationEl.textContent = formatTime(audio.duration);
});

function updateProgress() {
  if (!isNaN(audio.duration)) {
    const progressPercent = (audio.currentTime / audio.duration) * 100;
    progressBar.style.width = `${progressPercent}%`;
    progressPointer.style.left = `${progressPercent}%`;
    currentTimeEl.textContent = formatTime(audio.currentTime);
  }
}

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

function seek(event) {
  const rect = progressContainer.getBoundingClientRect();
  let offsetX = event.clientX - rect.left;
  offsetX = Math.max(0, Math.min(offsetX, rect.width));
  const percent = offsetX / rect.width;
  audio.currentTime = percent * audio.duration;
  updateProgress();
}

progressContainer.addEventListener("click", seek);

// Dark mode
const toggleBtn = document.getElementById("darkModeToggle");
if (toggleBtn) {
  const body = document.body;
  const toggleSpan = toggleBtn.querySelector("span");
  const isDarkMode = localStorage.getItem("darkMode") === "true";

  if (isDarkMode) body.classList.add("dark-mode");

  toggleBtn.addEventListener("click", () => {
    body.classList.toggle("dark-mode");
    localStorage.setItem("darkMode", body.classList.contains("dark-mode"));
  });
}

window.toggleGroupDetail = toggleGroupDetail;
