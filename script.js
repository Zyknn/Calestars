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
      "The easiest way to reach your favorite bot! Start chatting and let the magic begin, explore more, and enjoy every moment!",
    image: "https://raw.githubusercontent.com/Zyknn/CloudImage/refs/heads/main/calestars/pink.png",
    url: "https://wa.me/6283188240805",
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
    image: "https://raw.githubusercontent.com/Zyknn/CloudImage/refs/heads/main/calestars/purple.png",
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
    image: "https://raw.githubusercontent.com/Zyknn/CloudImage/refs/heads/main/calestars/blue.png",
    url: "https://whatsapp.com/channel/0029VbAZ5eJBadmUA9fTe63I",
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
            <img src="${group.image}" alt="${group.title}" class="w-14 h-14 rounded-xl object-cover border ${group.color.replace('bg-', 'border-')} shadow-sm">
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

  const isDesktop = window.innerWidth >= 768; // Desktop breakpoint
  const detail = document.getElementById(`detail-${index}`);
  const allCards = document.querySelectorAll(".group-card");
  const allArrows = document.querySelectorAll(".fa-chevron-down");
  const allDetails = document.querySelectorAll('[id^="detail-"]');

  if (isDesktop) {
    // Desktop: Toggle all cards
    if (detail.classList.contains("max-h-[300px]")) {
      // Close all cards
      allDetails.forEach((el, i) => {
        el.classList.remove("max-h-[300px]");
        el.classList.add("max-h-0");
        allCards[i].classList.remove("ring-2", "ring-blue-500");
        allArrows[i].classList.remove("rotate-180");
      });
      activeIndex = null;
    } else {
      // Open all cards
      allDetails.forEach((el, i) => {
        el.classList.remove("max-h-0");
        el.classList.add("max-h-[300px]");
        allCards[i].classList.add("ring-2", "ring-blue-500");
        allArrows[i].classList.add("rotate-180");
      });
      activeIndex = index;

      // Smooth scroll to the clicked card
      setTimeout(() => {
        detail.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }, 100);
    }
  } else {
    // Mobile: Toggle single card (original behavior)
    // Close all other details first
    document.querySelectorAll('[id^="detail-"]').forEach((el, i) => {
      if (i !== index) {
        el.classList.remove("max-h-[300px]");
        el.classList.add("max-h-0");
        allCards[i].classList.remove("ring-2", "ring-blue-500");
        allArrows[i].classList.remove("rotate-180");
      }
    });

    // Reset activeIndex for other cards
    if (activeIndex !== null && activeIndex !== index) {
      activeIndex = null;
    }

    // Toggle current card
    if (detail.classList.contains("max-h-[300px]")) {
      // Close current card
      detail.classList.remove("max-h-[300px]");
      detail.classList.add("max-h-0");
      allCards[index].classList.remove("ring-2", "ring-blue-500");
      allArrows[index].classList.remove("rotate-180");
      activeIndex = null;
    } else {
      // Open current card
      detail.classList.remove("max-h-0");
      detail.classList.add("max-h-[300px]");
      allCards[index].classList.add("ring-2", "ring-blue-500");
      allArrows[index].classList.add("rotate-180");
      activeIndex = index;

      // Smooth scroll to card
      setTimeout(() => {
        detail.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }, 100);
    }
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

document.addEventListener("DOMContentLoaded", () => {
  const messages = [
    "Bot Active 💫",
    "Let's Join Community ♡"
  ];

   const container = document.getElementById("info-container");
  container.style.textAlign = "center";
  container.style.display = "block";
  container.style.transition = "opacity 0.6s ease";
  container.style.opacity = 1;

  let messageIndex = 0;

  function showMessage() {
    container.style.opacity = 0;
    setTimeout(() => {
      container.innerText = messages[messageIndex];
      container.style.opacity = 1;
      messageIndex = (messageIndex + 1) % messages.length;
    }, 600); // waktu fade out sebelum ganti teks
  }

  container.innerText = messages[messageIndex];
  messageIndex++;

  setInterval(showMessage, 3000); // ganti tiap 3 detik
});

// Music Player
const songs = [
   {
    title: "하츠투하츠 - RUDE!",
    artist: "Hearts2Hearts",
    file: "Hearts2Hearts 하츠투하츠 - RUDE! [BASS BOOSTED].mp3",
    cover: "https://raw.githubusercontent.com/Zyknn/CloudImage/refs/heads/main/calestars/rude.png"
  },
   {
    title: "하츠투하츠 - The Chase",
    artist: "Hearts2Hearts",
    file: "Hearts2Hearts 하츠투하츠 - The Chase [BASS BOOSTED].mp3",
    cover: "https://raw.githubusercontent.com/Zyknn/CloudImage/refs/heads/main/calestars/thechase.png"
  },
  {
    title: "하츠투하츠 - FOCUS",
    artist: "Hearts2Hearts",
    file: "Hearts2Hearts (하츠투하츠) - FOCUS [BASS BOOSTED].mp3",
    cover: "https://raw.githubusercontent.com/Zyknn/CloudImage/refs/heads/main/calestars/focus.jpg"
  },
  {
    title: "하츠투하츠 - STYLE",
    artist: "Hearts2Hearts",
    file: "Hearts2Hearts.mp3",
    cover: "https://raw.githubusercontent.com/Zyknn/CloudImage/refs/heads/main/calestars/style.png"
  }
];

let currentSongIndex = 0;
const audio = new Audio(songs[currentSongIndex].file);
const playBtn = document.getElementById("play-pause-btn");
const playIcon = document.getElementById("play-icon");
const pauseIcon = document.getElementById("pause-icon");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const playlistToggleBtn = document.getElementById("playlist-toggle");
const playlistContainer = document.getElementById("playlist-container");
const progressBar = document.getElementById("progress-bar");
const progressPointer = document.getElementById("progress-pointer");
const progressContainer = document.getElementById("progress-container");
const currentTimeEl = document.getElementById("current-time");
const totalDurationEl = document.getElementById("total-duration");
const songTitleEl = document.getElementById("song-title");
const artistNameEl = document.getElementById("artist-name");
const albumCoverEl = document.getElementById("album-cover");
let isPlaying = false;
let isDragging = false;

function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
}

function loadSong(index) {
  currentSongIndex = index;
  const song = songs[currentSongIndex];
  audio.src = song.file;
  songTitleEl.textContent = song.title;
  artistNameEl.textContent = song.artist;
  albumCoverEl.src = song.cover;
  audio.load();
  renderPlaylist();
}

function nextSong() {
  currentSongIndex = (currentSongIndex + 1) % songs.length;
  loadSong(currentSongIndex);
  if (isPlaying) {
    audio.play();
  }
}

function prevSong() {
  currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
  loadSong(currentSongIndex);
  if (isPlaying) {
    audio.play();
  }
}

audio.addEventListener("loadedmetadata", () => {
  totalDurationEl.textContent = formatTime(audio.duration);
});

audio.addEventListener("ended", nextSong);

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

prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);

playlistToggleBtn.addEventListener("click", () => {
  playlistContainer.classList.toggle("hidden");
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

function renderPlaylist() {
  const playlistEl = document.getElementById("playlist");
  playlistEl.innerHTML = "";
  
  songs.forEach((song, index) => {
    const item = document.createElement("div");
    item.className = `flex items-center space-x-3 p-2 rounded-lg cursor-pointer transition-colors ${
      index === currentSongIndex ? "bg-purple-100 dark:bg-purple-900" : "hover:bg-gray-100 dark:hover:bg-gray-700"
    }`;
    item.onclick = () => {
      loadSong(index);
      if (isPlaying) {
        audio.play();
      }
    };
    
    item.innerHTML = `
      <img src="${song.cover}" alt="${song.title}" class="w-8 h-8 rounded object-cover flex-shrink-0">
      <div class="flex-1 min-w-0">
        <p class="font-medium text-sm truncate ${index === currentSongIndex ? "text-purple-600 dark:text-purple-400" : "text-gray-900 dark:text-white"}">${song.title}</p>
        <p class="text-xs text-gray-500 dark:text-gray-400 truncate">${song.artist}</p>
      </div>
      ${index === currentSongIndex ? '<i class="fas fa-volume-up text-purple-500 text-sm"></i>' : ''}
    `;
    
    playlistEl.appendChild(item);
  });
}

// Initialize
loadSong(currentSongIndex);
renderPlaylist();

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

// Welcome Modal Functionality
const welcomeModal = document.getElementById("welcome-modal");
const closeModalBtn = document.getElementById("close-modal");
const showWelcomeBtn = document.getElementById("show-welcome-btn");

function showWelcomeModal() {
  // Show modal with a slight delay for better UX
  setTimeout(() => {
    welcomeModal.classList.remove("hidden");
  }, 1000);
}

function closeWelcomeModal() {
  welcomeModal.classList.add("hidden");
  
  // Auto play music with fade in volume
  fadeInAudio();
}

function fadeInAudio() {
  if (!isPlaying) {
    audio.volume = 0.1; // Start with low volume
    audio.play();
    playIcon.classList.add("hidden");
    pauseIcon.classList.remove("hidden");
    isPlaying = true;
    
    // Fade in volume gradually
    let volume = 0.1;
    const fadeInterval = setInterval(() => {
      volume += 0.05;
      if (volume >= 0.8) { // Max volume 0.8
        volume = 0.8;
        clearInterval(fadeInterval);
      }
      audio.volume = volume;
    }, 100);
  }
}

// Event listeners
closeModalBtn.addEventListener("click", closeWelcomeModal);
showWelcomeBtn.addEventListener("click", () => {
  welcomeModal.classList.remove("hidden");
});

// Show modal when page loads
document.addEventListener("DOMContentLoaded", showWelcomeModal);
