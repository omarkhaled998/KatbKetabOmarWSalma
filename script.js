/* ==========================================================
   Katb Ketab Invitation — Omar & Salma
   script.js — Interactivity and language support
   ========================================================== */

'use strict';

const EVENT_DATE = new Date('2026-06-04T19:30:00+03:00');
const EVENT_TIMEZONE = 'Africa/Cairo';
const EVENT_LOCATION = 'Rooftop 2, inside Masjeed Al-Shortaa, New Cairo, Egypt';
const STORAGE_KEY = 'wedding_wishes_omar_salma_2026';
const REQUEST_TIMEOUT_MS = 8000;

// Set these in a small inline script in index.html when API is ready:
// window.WISHES_API_BASE_URL = 'https://<your-function-app>.azurewebsites.net';
// window.WISHES_API_GET_FUNCTION_CODE = '<get-wishes-function-key>';
// window.WISHES_API_SAVE_FUNCTION_CODE = '<save-wish-function-key>';
// Optional backward compatibility:
// window.WISHES_API_FUNCTION_CODE = '<single-shared-key>';
const API_BASE_URL = String(window.WISHES_API_BASE_URL || '').replace(/\/+$/, '');
const API_GET_FUNCTION_CODE = String(
  window.WISHES_API_GET_FUNCTION_CODE || window.WISHES_API_FUNCTION_CODE || ''
);
const API_SAVE_FUNCTION_CODE = String(
  window.WISHES_API_SAVE_FUNCTION_CODE || window.WISHES_API_FUNCTION_CODE || ''
);

function buildWishesApiUrl(functionCode) {
  if (!API_BASE_URL) return '';

  const url = new URL('/api/wishes', API_BASE_URL);
  if (functionCode) url.searchParams.set('code', functionCode);
  return url.toString();
}

const API_GET_WISHES_URL = buildWishesApiUrl(API_GET_FUNCTION_CODE);
const API_SAVE_WISH_URL = buildWishesApiUrl(API_SAVE_FUNCTION_CODE);

const I18N = {
  en: {
    page_title: 'Omar & Salma - Katb Ketab Invitation',
    lang_toggle: 'العربية',
    nav_countdown: 'Countdown',
    nav_details: 'Details',
    nav_location: 'Location',
    nav_photos: 'Photos',
    nav_wishes: 'Wishes',
    hero_pre: '♦ We Are Celebrating Our Katb Ketab ♦',
    hero_weekday: 'Thursday',
    hero_date: 'June 4, 2026',
    hero_time: 'at 7:30 in the Evening',
    hero_venue_rooftop: 'Rooftop 2',
    hero_venue: 'Masjeed Al-Shortaa · New Cairo, Egypt',
    highlight_time_label: 'Time',
    highlight_time_main: '7:30 PM',
    highlight_time_sub: 'Thursday, June 4, 2026',
    highlight_location_label: 'Location',
    highlight_rooftop: 'Rooftop 2',
    highlight_location_main: 'Masjeed Al-Shortaa',
    highlight_location_sub: 'New Cairo, Egypt',
    add_calendar: 'Add to Calendar',
    get_directions: 'Get Directions',
    countdown_label: 'June 4 · 7:30 PM Cairo Time',
    countdown_title: 'Counting Down',
    countdown_done: 'Today is the Katb Ketab day! Congratulations Omar & Salma!',
    days: 'Days',
    hours: 'Hours',
    minutes: 'Minutes',
    seconds: 'Seconds',
    details_label: 'You Are Cordially Invited',
    details_title: 'Katb Ketab Details',
    date: 'Date',
    time: 'Time',
    time_begins: 'Katb Ketab begins at',
    venue: 'Venue',
    find_us: 'Find Us Here',
    location: 'Location',
    reminder_label: 'Never Miss It',
    reminder_title: 'Set WhatsApp Reminder',
    reminder_subtitle: 'Tap a button and send the pre-filled message to yourself or loved ones.',
    reminder_week: 'Remind Me (1 Week Before)',
    reminder_day: 'Remind Me (1 Day Before)',
    reminder_now: 'Share Event Details',
    capture_moment: 'Capture the Moment',
    share_photos: 'Share Your Photos',
    photos_subtitle_1: 'Scan the QR code to upload your memories to our shared album.',
    photos_subtitle_2: 'We\'d love to see the day through your eyes!',
    scan_me: 'Scan Me',
    qr_step_1: 'Open your phone camera',
    qr_step_2: 'Point it at the QR code',
    qr_step_3: 'Upload your beautiful photos!',
    open_album: 'Open Shared Album',
    leave_message: 'Leave a Message',
    wishes_guestbook: 'Wishes & Guestbook',
    wishes_subtitle: 'Write us a heartfelt note - your words mean the world to us.',
    your_name: 'Your Name',
    your_wish: 'Your Wish',
    name_placeholder: 'e.g. Ahmed & Nour',
    wish_placeholder: 'Share your heartfelt message...',
    characters_remaining: 'characters remaining',
    send_wish: 'Send Wish',
    wishes_note: 'Wishes are shared with all guests once cloud API is connected; otherwise they are saved on this device.',
    export_wishes: 'Export Wishes (JSON)',
    wishes: 'Wishes',
    first_wish: 'Be the first to leave a wish! 💌',
    footer_date: 'Thursday · June 4, 2026 · Masjeed Al-Shortaa',
    footer_note: 'With all our love, we cannot wait to celebrate our Katb Ketab with you.',
    wish_from: 'Wish from',
    wishes_count: 'Wishes'
  },
  ar: {
    page_title: 'دعوة كتب كتاب عمر وسلمى',
    lang_toggle: 'English',
    nav_countdown: 'العد التنازلي',
    nav_details: 'التفاصيل',
    nav_location: 'الموقع',
    nav_photos: 'الصور',
    nav_wishes: 'التهاني',
    hero_pre: '♦ نحتفل بكتب كتابنا ♦',
    hero_weekday: 'الخميس',
    hero_date: '٤ يونيو ٢٠٢٦',
    hero_time: 'الساعة ٧:٣٠ مساء',
    hero_venue_rooftop: 'رووف توب ٢',
    hero_venue: 'مسجد الشرطة · القاهرة الجديدة، مصر',
    highlight_time_label: 'الوقت',
    highlight_time_main: '٧:٣٠ مساء',
    highlight_time_sub: 'الخميس، ٤ يونيو ٢٠٢٦',
    highlight_location_label: 'المكان',
    highlight_rooftop: 'رووف توب ٢',
    highlight_location_main: 'مسجد الشرطة',
    highlight_location_sub: 'القاهرة الجديدة، مصر',
    add_calendar: 'أضف إلى التقويم',
    get_directions: 'الاتجاهات',
    countdown_label: '٤ يونيو · ٧:٣٠ مساء بتوقيت القاهرة',
    countdown_title: 'العد التنازلي',
    countdown_done: 'اليوم هو يوم كتب الكتاب! مبروك عمر وسلمى!',
    days: 'أيام',
    hours: 'ساعات',
    minutes: 'دقائق',
    seconds: 'ثوان',
    details_label: 'نتشرف بدعوتكم',
    details_title: 'تفاصيل كتب الكتاب',
    date: 'التاريخ',
    time: 'الوقت',
    time_begins: 'يبدأ كتب الكتاب في',
    venue: 'المكان',
    find_us: 'موقعنا',
    location: 'الموقع',
    reminder_label: 'لا تفوتوا المناسبة',
    reminder_title: 'تذكير واتساب',
    reminder_subtitle: 'اضغط على الزر ثم أرسل الرسالة الجاهزة لنفسك أو لمن تحب.',
    reminder_week: 'ذكرني قبل أسبوع',
    reminder_day: 'ذكرني قبل يوم',
    reminder_now: 'شارك تفاصيل المناسبة',
    capture_moment: 'شاركونا اللحظات',
    share_photos: 'شاركوا صوركم',
    photos_subtitle_1: 'امسحوا رمز QR لرفع الصور في الألبوم المشترك.',
    photos_subtitle_2: 'يسعدنا أن نرى اليوم بعيونكم!',
    scan_me: 'امسح الرمز',
    qr_step_1: 'افتح كاميرا الهاتف',
    qr_step_2: 'وجّهها إلى رمز QR',
    qr_step_3: 'ارفع أجمل الصور!',
    open_album: 'فتح الألبوم المشترك',
    leave_message: 'اترك رسالة',
    wishes_guestbook: 'التهاني والرسائل',
    wishes_subtitle: 'اكتبوا لنا كلمة جميلة - كلماتكم تعني لنا الكثير.',
    your_name: 'الاسم',
    your_wish: 'تهنئتك',
    name_placeholder: 'مثال: أحمد ونور',
    wish_placeholder: 'اكتب تهنئتك من القلب...',
    characters_remaining: 'حرف متبقي',
    send_wish: 'إرسال التهنئة',
    wishes_note: 'تظهر التهاني لكل الضيوف عند ربط واجهة السحابة، وإلا تُحفظ على هذا الجهاز فقط.',
    export_wishes: 'تحميل التهاني (JSON)',
    wishes: 'التهاني',
    first_wish: 'كونوا أول من يترك تهنئة! 💌',
    footer_date: 'الخميس · ٤ يونيو ٢٠٢٦ · رووف توب ٢، مسجد الشرطة',
    footer_note: 'بكل الحب، نتشرف بوجودكم معنا في كتب كتابنا.',
    wish_from: 'تهنئة من',
    wishes_count: 'تهنئة'
  }
};

let currentLang = localStorage.getItem('invite_lang') || 'en';
let wishesCache = [];

function hasRemoteWishesApi() {
  return Boolean(API_GET_WISHES_URL && API_SAVE_WISH_URL);
}

function fetchWithTimeout(url, options = {}, timeoutMs = REQUEST_TIMEOUT_MS) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  return fetch(url, {
    ...options,
    signal: controller.signal
  }).finally(() => clearTimeout(timer));
}

function launchFireworks() {
  if (typeof confetti !== 'function') return;

  const colors = ['#c9a84c', '#e0c97f', '#ffffff', '#1a2744', '#253660', '#f8f2e0'];
  const endTime = Date.now() + 5500;

  (function frame() {
    if (Date.now() > endTime) return;

    confetti({
      particleCount: 7,
      angle: 60,
      spread: 58,
      origin: { x: 0.05, y: 0.75 },
      colors,
      startVelocity: 48,
      gravity: 0.8,
      scalar: 0.95,
      ticks: 90,
      zIndex: 9999
    });

    confetti({
      particleCount: 7,
      angle: 120,
      spread: 58,
      origin: { x: 0.95, y: 0.75 },
      colors,
      startVelocity: 48,
      gravity: 0.8,
      scalar: 0.95,
      ticks: 90,
      zIndex: 9999
    });

    if (Math.random() < 0.3) {
      confetti({
        particleCount: 12,
        angle: 90,
        spread: 120,
        origin: { x: 0.5, y: 0.6 },
        colors: ['#c9a84c', '#ffffff', '#e0c97f'],
        startVelocity: 30,
        gravity: 0.6,
        scalar: 0.8,
        ticks: 80,
        zIndex: 9999
      });
    }

    requestAnimationFrame(frame);
  })();
}

function initCountdown() {
  const target = EVENT_DATE.getTime();
  const elDays = document.getElementById('days');
  const elHours = document.getElementById('hours');
  const elMinutes = document.getElementById('minutes');
  const elSeconds = document.getElementById('seconds');
  const elGrid = document.getElementById('countdown-grid');
  const elDone = document.getElementById('countdown-done');

  if (!elDays || !elGrid || !elHours || !elMinutes || !elSeconds) return;

  const pad = n => String(Math.max(0, n)).padStart(2, '0');

  function tick() {
    const diff = target - Date.now();

    if (diff <= 0) {
      elGrid.classList.add('hidden');
      if (elDone) elDone.classList.remove('hidden');
      launchFireworks();
      return;
    }

    const totalSec = Math.floor(diff / 1000);
    elSeconds.textContent = pad(totalSec % 60);
    elMinutes.textContent = pad(Math.floor(totalSec / 60) % 60);
    elHours.textContent = pad(Math.floor(totalSec / 3600) % 24);
    elDays.textContent = pad(Math.floor(totalSec / 86400));
  }

  tick();
  setInterval(tick, 1000);
}

function initQRCode() {
  const container = document.getElementById('qr-code');
  if (!container || typeof QRCode === 'undefined') return;

  new QRCode(container, {
    text: 'https://drive.google.com/drive/folders/1ZJdbebkCx6kg0IoU63Y7XmD-nAe8Fqm_?usp=sharing',
    width: 180,
    height: 180,
    colorDark: '#1a2744',
    colorLight: '#ffffff',
    correctLevel: QRCode.CorrectLevel.H
  });
}

function loadWishesLocal() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveWishesLocal(wishes) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(wishes.slice(-50)));
  } catch {
    /* localStorage unavailable */
  }
}

function normalizeWish(wish) {
  const safeName = String(wish?.name || '').trim();
  const safeMessage = String(wish?.message || '').trim();
  const ts = wish?.timestamp || wish?.createdAt || Date.now();

  return {
    name: safeName,
    message: safeMessage,
    timestamp: new Date(ts).getTime() || Date.now()
  };
}

async function refreshWishes() {
  const localWishes = loadWishesLocal();

  if (!hasRemoteWishesApi()) {
    wishesCache = localWishes;
    renderWishes();
    return;
  }

  try {
    const response = await fetchWithTimeout(API_GET_WISHES_URL, {
      method: 'GET',
      headers: { Accept: 'application/json' }
    });

    if (!response.ok) throw new Error(`GetWishes failed with ${response.status}`);

    const payload = await response.json();
    const remote = Array.isArray(payload?.wishes) ? payload.wishes : [];
    wishesCache = remote.map(normalizeWish).slice(-50);
    saveWishesLocal(wishesCache);
  } catch {
    wishesCache = localWishes;
  }

  renderWishes();
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.appendChild(document.createTextNode(String(str)));
  return div.innerHTML;
}

function formatTimestamp(ts) {
  return new Date(ts).toLocaleDateString(currentLang === 'ar' ? 'ar-EG' : 'en-GB', {
    day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit'
  });
}

function renderWishes() {
  const list = document.getElementById('wishes-list');
  const emptyMsg = document.getElementById('wishes-empty');
  const label = document.getElementById('wishes-count-label');
  if (!list) return;

  const wishes = wishesCache;
  const dict = I18N[currentLang] || I18N.en;

  if (wishes.length === 0) {
    if (emptyMsg) emptyMsg.style.display = '';
    if (label) label.textContent = dict.wishes;
    list.querySelectorAll('.wish-card').forEach(el => el.remove());
    return;
  }

  if (emptyMsg) emptyMsg.style.display = 'none';
  if (label) {
    label.textContent = currentLang === 'ar'
      ? `${wishes.length} ${dict.wishes_count}`
      : `${wishes.length} Wish${wishes.length !== 1 ? 'es' : ''}`;
  }

  list.querySelectorAll('.wish-card').forEach(el => el.remove());

  [...wishes].reverse().forEach(w => {
    const card = document.createElement('article');
    card.className = 'wish-card';
    card.setAttribute('aria-label', `${dict.wish_from} ${escapeHtml(w.name)}`);
    card.innerHTML = `
      <p class="wish-card-name">${escapeHtml(w.name)}</p>
      <p class="wish-card-msg">&ldquo;${escapeHtml(w.message)}&rdquo;</p>
      <p class="wish-card-time">${formatTimestamp(w.timestamp)}</p>
    `;
    list.appendChild(card);
  });
}

function initGuestbook() {
  wishesCache = loadWishesLocal();
  renderWishes();
  refreshWishes();

  const form = document.getElementById('wish-form');
  const nameInput = document.getElementById('wish-name');
  const msgInput = document.getElementById('wish-message');
  const charLeft = document.getElementById('char-left');
  const exportBtn = document.getElementById('export-wishes');

  if (!form) return;

  if (msgInput && charLeft) {
    msgInput.addEventListener('input', () => {
      const remaining = 300 - msgInput.value.length;
      charLeft.textContent = String(remaining);
      if (charLeft.parentElement) charLeft.parentElement.style.color = remaining < 30 ? '#cc2244' : '';
    });
  }

  form.addEventListener('submit', async e => {
    e.preventDefault();

    const name = (nameInput?.value || '').trim();
    const message = (msgInput?.value || '').trim();

    if (!name) {
      nameInput?.focus();
      return;
    }

    if (!message) {
      msgInput?.focus();
      return;
    }

    const newWish = { name, message, timestamp: Date.now() };
    wishesCache.push(newWish);
    saveWishesLocal(wishesCache);
    renderWishes();

    if (hasRemoteWishesApi()) {
      try {
        const response = await fetchWithTimeout(API_SAVE_WISH_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
          },
          body: JSON.stringify({ name, message })
        });

        if (!response.ok) {
          throw new Error(`SaveWish failed with ${response.status}`);
        }
      } catch {
        // Keep local fallback behavior when API call fails.
      }
    }

    form.reset();
    if (charLeft) charLeft.textContent = '300';

    const panel = document.querySelector('.wishes-panel');
    if (panel) panel.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  if (exportBtn) {
    exportBtn.addEventListener('click', () => {
      const wishes = wishesCache;
      const payload = {
        exportedAt: new Date().toISOString(),
        count: wishes.length,
        wishes
      };

      const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'katb-ketab-wishes.json';
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    });
  }
}

function setupCalendarButton() {
  const btn = document.getElementById('add-calendar-btn');
  if (!btn) return;

  const toIcsLocalDateTime = (date, timeZone) => {
    const parts = new Intl.DateTimeFormat('en-GB', {
      timeZone,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    }).formatToParts(date);

    const valueByType = type => parts.find(part => part.type === type)?.value;
    const year = valueByType('year');
    const month = valueByType('month');
    const day = valueByType('day');
    const hour = valueByType('hour');
    const minute = valueByType('minute');
    const second = valueByType('second');

    return `${year}${month}${day}T${hour}${minute}${second}`;
  };

  const startLocal = toIcsLocalDateTime(EVENT_DATE, EVENT_TIMEZONE);
  const endDate = new Date(EVENT_DATE.getTime() + (2 * 60 * 60 * 1000));
  const endLocal = toIcsLocalDateTime(endDate, EVENT_TIMEZONE);
  const stamp = new Date().toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';

  const ics = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//OmarAndSalma//KatbKetab//EN',
    `X-WR-TIMEZONE:${EVENT_TIMEZONE}`,
    'BEGIN:VEVENT',
    'UID:katb-ketab-omar-salma-20260604@invitation',
    `DTSTAMP:${stamp}`,
    `DTSTART;TZID=${EVENT_TIMEZONE}:${startLocal}`,
    `DTEND;TZID=${EVENT_TIMEZONE}:${endLocal}`,
    'SUMMARY:Omar & Salma - Katb Ketab',
    `LOCATION:${EVENT_LOCATION}`,
    'DESCRIPTION:Join us for the Katb Ketab of Omar and Salma.',
    'END:VEVENT',
    'END:VCALENDAR'
  ].join('\r\n');

  btn.href = `data:text/calendar;charset=utf-8,${encodeURIComponent(ics)}`;
  btn.setAttribute('download', 'Omar-Salma-Katb-Ketab.ics');
}

function setupWhatsAppReminders() {
  const week = document.getElementById('wa-reminder-week');
  const day = document.getElementById('wa-reminder-day');
  const now = document.getElementById('wa-reminder-now');
  if (!week || !day || !now) return;

  const base = 'https://wa.me/?text=';
  const textEn = 'Reminder: Omar & Salma Katb Ketab on Thursday, June 4, 2026 at 7:30 PM, Rooftop 2 inside Masjeed Al-Shortaa, New Cairo. Map: https://maps.google.com/maps?q=Rooftop+2+Masjeed+Al+Shortaa+New+Cairo+Egypt';
  const textAr = 'تذكير: كتب كتاب عمر وسلمى يوم الخميس ٤ يونيو ٢٠٢٦ الساعة ٧:٣٠ مساء في رووف توب ٢ داخل مسجد الشرطة، القاهرة الجديدة. الموقع: https://maps.google.com/maps?q=Rooftop+2+Masjeed+Al+Shortaa+New+Cairo+Egypt';
  const textBase = currentLang === 'ar' ? textAr : textEn;

  week.href = base + encodeURIComponent(`${currentLang === 'ar' ? 'تذكير قبل أسبوع - ' : '1 week reminder - '}${textBase}`);
  day.href = base + encodeURIComponent(`${currentLang === 'ar' ? 'تذكير قبل يوم - ' : '1 day reminder - '}${textBase}`);
  now.href = base + encodeURIComponent(textBase);
}

function applyLanguage(lang) {
  const safeLang = lang === 'ar' ? 'ar' : 'en';
  currentLang = safeLang;
  localStorage.setItem('invite_lang', safeLang);

  const dict = I18N[safeLang];
  document.documentElement.lang = safeLang;
  document.documentElement.dir = safeLang === 'ar' ? 'rtl' : 'ltr';
  document.body.classList.toggle('rtl', safeLang === 'ar');
  document.title = dict.page_title;

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (key && dict[key]) el.textContent = dict[key];
  });

  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (key && dict[key]) el.setAttribute('placeholder', dict[key]);
  });

  renderWishes();
  setupWhatsAppReminders();
}

function initLanguageToggle() {
  const toggle = document.getElementById('lang-toggle');
  if (!toggle) return;

  toggle.addEventListener('click', () => {
    const next = currentLang === 'en' ? 'ar' : 'en';
    applyLanguage(next);
  });

  applyLanguage(currentLang);
}

function initNavbar() {
  const navbar = document.getElementById('navbar');
  const toggle = document.getElementById('nav-toggle');
  const menu = document.getElementById('nav-menu');
  if (!navbar) return;

  function onScroll() {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  if (toggle && menu) {
    toggle.addEventListener('click', () => {
      const isOpen = menu.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(isOpen));
    });

    menu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        menu.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });

    document.addEventListener('click', e => {
      const target = e.target;
      if (!(target instanceof Node)) return;
      if (!navbar.contains(target)) {
        menu.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }
}

function initScrollAnimations() {
  const targets = document.querySelectorAll('.fade-in');
  if (!targets.length || !('IntersectionObserver' in window)) {
    targets.forEach(el => el.classList.add('visible'));
    return;
  }

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  targets.forEach(el => observer.observe(el));
}

window.addEventListener('load', () => {
  launchFireworks();
  initCountdown();
  initQRCode();
  initGuestbook();
  setupCalendarButton();
  setupWhatsAppReminders();
  initLanguageToggle();
  initNavbar();
  initScrollAnimations();
});
