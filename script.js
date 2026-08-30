/* ==========================================================
  Wedding Ceremony Invitation — Omar & Salma
   script.js — Interactivity and language support
   ========================================================== */

'use strict';

const EVENT_DATE = new Date('2026-09-27T18:30:00+03:00');
const EVENT_TIMEZONE = 'Africa/Cairo';
const EVENT_LOCATION = 'Lebanese Terrace, Sky Resort, beside PetroSport Club, New Cairo, Egypt';
const STORAGE_KEY = 'wedding_ceremony_wishes_omar_salma_2026';
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
const EXPORT_PASSWORD = String(window.WISHES_EXPORT_PASSWORD || '');
const EXPORT_AUTH_SESSION_KEY = 'wishes_export_unlocked';

function requestExportAccess() {
  if (!EXPORT_PASSWORD) return true;

  try {
    if (sessionStorage.getItem(EXPORT_AUTH_SESSION_KEY) === '1') return true;
  } catch {
    // Ignore sessionStorage access issues and fall back to prompt.
  }

  const promptText = currentLang === 'ar'
    ? 'أدخل كلمة مرور التصدير'
    : 'Enter export password';
  const wrongText = currentLang === 'ar'
    ? 'كلمة المرور غير صحيحة'
    : 'Incorrect password';

  const entered = window.prompt(promptText, '');
  if (entered === null) return false;

  if (entered !== EXPORT_PASSWORD) {
    window.alert(wrongText);
    return false;
  }

  try {
    sessionStorage.setItem(EXPORT_AUTH_SESSION_KEY, '1');
  } catch {
    // Ignore sessionStorage write issues.
  }

  return true;
}

const I18N = {
  en: {
    page_title: 'Omar & Salma - Wedding Ceremony Invitation',
    lang_toggle: 'العربية',
    nav_countdown: 'Countdown',
    nav_details: 'Details',
    nav_location: 'Location',
    nav_photos: 'Photos',
    nav_wishes: 'Wishes',
    hero_pre: '♦ We Are Celebrating Our Wedding ♦',
    hero_weekday: 'Sunday',
    hero_date: '27th of September 2026',
    hero_time: 'at 6:30 in the Evening',
    hero_venue_rooftop: 'Sky Resort',
    hero_venue: 'Lebanese Terrace · Sky Resort · New Cairo, Egypt',
    highlight_time_label: 'Time',
    highlight_time_main: '6:30 PM',
    highlight_time_sub: 'Sunday, 27th of September 2026',
    highlight_location_label: 'Location',
    highlight_rooftop: 'Sky Resort',
    highlight_location_main: 'Sky Resort',
    highlight_location_venue: 'Lebanese Terrace',
    highlight_location_sub: 'Beside PetroSport Club · New Cairo',
    add_calendar: 'Add to Calendar',
    get_directions: 'Get Directions',
    countdown_label: 'September 27 · 6:30 PM Cairo Time',
    countdown_title: 'Counting Down',
    countdown_done: 'Today is the wedding day! Congratulations Omar & Salma!',
    days: 'Days',
    hours: 'Hours',
    minutes: 'Minutes',
    seconds: 'Seconds',
    details_label: 'You Are Cordially Invited',
    details_title: 'Wedding Ceremony Details',
    date: 'Date',
    detail_date: '27th of September, 2026',
    time: 'Time',
    time_begins: 'Wedding ceremony begins at',
    venue: 'Venue',
    venue_name: 'Sky Resort',
    venue_terrace: 'Lebanese Terrace',
    venue_address: 'Beside PetroSport Club · New Cairo',
    find_us: 'Find Us Here',
    location: 'Location',
    location_address: 'Lebanese Terrace · Sky Resort · New Cairo, Egypt',
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
    post_publicly: 'Post publicly',
    send_wish: 'Send Wish',
    wish_submitted_public: 'Thanks! Your wish was submitted and is visible to guests.',
    wish_submitted_private: 'Thanks! Your wish was submitted privately.',
    wishes_note: 'Wishes are shared with all guests once cloud API is connected; otherwise they are saved on this device.',
    export_wishes: 'Export Wishes',
    wishes: 'Wishes',
    first_wish: 'Be the first to leave a wish! 💌',
    footer_date: 'Sunday · 27th of September 2026 · Sky Resort',
    footer_note: 'With all our love, we cannot wait to celebrate our wedding with you.',
    wish_from: 'Wish from',
    wishes_count: 'Wishes'
  },
  ar: {
    page_title: 'دعوة زفاف عمر وسلمى',
    lang_toggle: 'English',
    nav_countdown: 'العد التنازلي',
    nav_details: 'التفاصيل',
    nav_location: 'الموقع',
    nav_photos: 'الصور',
    nav_wishes: 'التهاني',
    hero_pre: '♦ نحتفل بزفافنا ♦',
    hero_weekday: 'الأحد',
    hero_date: '٢٧ سبتمبر ٢٠٢٦',
    hero_time: 'الساعة ٦:٣٠ مساء',
    hero_venue_rooftop: 'سكاي ريزورت',
    hero_venue: 'التراس اللبناني · سكاي ريزورت · القاهرة الجديدة، مصر',
    highlight_time_label: 'الوقت',
    highlight_time_main: '٦:٣٠ مساء',
    highlight_time_sub: 'الأحد، ٢٧ سبتمبر ٢٠٢٦',
    highlight_location_label: 'المكان',
    highlight_rooftop: 'سكاي ريزورت',
    highlight_location_main: 'سكاي ريزورت',
    highlight_location_venue: 'التراس اللبناني',
    highlight_location_sub: 'بجوار نادي بتروسبورت · القاهرة الجديدة',
    add_calendar: 'أضف إلى التقويم',
    get_directions: 'الاتجاهات',
    countdown_label: '٢٧ سبتمبر · ٦:٣٠ مساء بتوقيت القاهرة',
    countdown_title: 'العد التنازلي',
    countdown_done: 'اليوم هو يوم الزفاف! مبروك عمر وسلمى!',
    days: 'أيام',
    hours: 'ساعات',
    minutes: 'دقائق',
    seconds: 'ثوان',
    details_label: 'نتشرف بدعوتكم',
    details_title: 'تفاصيل حفل الزفاف',
    date: 'التاريخ',
    detail_date: '٢٧ سبتمبر ٢٠٢٦',
    time: 'الوقت',
    time_begins: 'يبدأ حفل الزفاف في',
    venue: 'المكان',
    venue_name: 'سكاي ريزورت',
    venue_terrace: 'التراس اللبناني',
    venue_address: 'بجوار نادي بتروسبورت · القاهرة الجديدة',
    find_us: 'موقعنا',
    location: 'الموقع',
    location_address: 'التراس اللبناني · سكاي ريزورت · القاهرة الجديدة، مصر',
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
    post_publicly: 'انشر الرسالة للجميع',
    send_wish: 'إرسال التهنئة',
    wish_submitted_public: 'شكرا لك! تم إرسال تهنئتك وهي ظاهرة للضيوف.',
    wish_submitted_private: 'شكرا لك! تم إرسال تهنئتك بشكل خاص.',
    wishes_note: 'تظهر التهاني لكل الضيوف عند ربط واجهة السحابة، وإلا تُحفظ على هذا الجهاز فقط.',
    export_wishes: 'تحميل التهاني',
    wishes: 'التهاني',
    first_wish: 'كونوا أول من يترك تهنئة! 💌',
    footer_date: 'الأحد · ٢٧ سبتمبر ٢٠٢٦ · سكاي ريزورت',
    footer_note: 'بكل الحب، نتشرف بوجودكم معنا في حفل زفافنا.',
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
    timestamp: new Date(ts).getTime() || Date.now(),
    approved: wish?.approved !== false
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

function formatEgyptExportTimestamp(date = new Date()) {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Africa/Cairo',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  }).formatToParts(date);

  const pick = type => parts.find(part => part.type === type)?.value || '';
  const day = pick('day');
  const month = pick('month');
  const year = pick('year');
  const hour = pick('hour');
  const minute = pick('minute');

  return `${day}-${month}-${year} ${hour}:${minute} EGY Time`;
}

function toCsvValue(value) {
  const str = String(value ?? '');
  return `"${str.replace(/"/g, '""')}"`;
}

function renderWishes() {
  const list = document.getElementById('wishes-list');
  const emptyMsg = document.getElementById('wishes-empty');
  const label = document.getElementById('wishes-count-label');
  if (!list) return;

  const wishes = wishesCache.filter(w => w.approved !== false);
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
  const publicInput = document.getElementById('wish-public');
  const charLeft = document.getElementById('char-left');
  const exportBtn = document.getElementById('export-wishes');
  const feedbackEl = document.getElementById('wish-feedback');
  let feedbackTimer = null;

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

    const postPublicly = publicInput ? publicInput.checked : true;
    const newWish = { name, message, timestamp: Date.now(), approved: postPublicly };
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
          body: JSON.stringify({ name, message, postPublicly })
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`SaveWish failed with ${response.status}: ${errorText}`);
        }
      } catch (error) {
        console.warn('SaveWish API call failed; keeping local fallback.', error);
        // Keep local fallback behavior when API call fails.
      }
    }

    form.reset();
    if (charLeft) charLeft.textContent = '300';

    if (feedbackEl) {
      const dict = I18N[currentLang] || I18N.en;
      feedbackEl.textContent = postPublicly ? dict.wish_submitted_public : dict.wish_submitted_private;
      feedbackEl.classList.add('show');

      if (feedbackTimer) clearTimeout(feedbackTimer);
      feedbackTimer = setTimeout(() => {
        feedbackEl.classList.remove('show');
      }, 4500);
    }

    const panel = document.querySelector('.wishes-panel');
    if (panel) panel.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  if (exportBtn) {
    exportBtn.addEventListener('click', () => {
      if (!requestExportAccess()) return;

      const wishes = wishesCache;
      const rows = [
        ['Exported At', formatEgyptExportTimestamp()],
        ['Count', String(wishes.length)],
        [],
        ['Name', 'Message', 'Timestamp']
      ];

      wishes.forEach(wish => {
        rows.push([
          wish.name || '',
          wish.message || '',
          formatTimestamp(wish.timestamp)
        ]);
      });

      const csv = rows
        .map(row => row.map(toCsvValue).join(','))
        .join('\r\n');

      const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'wedding-ceremony-wishes.csv';
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
    'PRODID:-//OmarAndSalma//WeddingCeremony//EN',
    `X-WR-TIMEZONE:${EVENT_TIMEZONE}`,
    'BEGIN:VEVENT',
    'UID:wedding-ceremony-omar-salma-20260927@invitation',
    `DTSTAMP:${stamp}`,
    `DTSTART;TZID=${EVENT_TIMEZONE}:${startLocal}`,
    `DTEND;TZID=${EVENT_TIMEZONE}:${endLocal}`,
    'SUMMARY:Omar & Salma - Wedding Ceremony',
    `LOCATION:${EVENT_LOCATION}`,
    'DESCRIPTION:Join us for the wedding ceremony of Omar and Salma.',
    'END:VEVENT',
    'END:VCALENDAR'
  ].join('\r\n');

  btn.href = `data:text/calendar;charset=utf-8,${encodeURIComponent(ics)}`;
  btn.setAttribute('download', 'Omar-Salma-Wedding-Ceremony.ics');
}

function setupWhatsAppReminders() {
  const week = document.getElementById('wa-reminder-week');
  const day = document.getElementById('wa-reminder-day');
  const now = document.getElementById('wa-reminder-now');
  if (!week || !day || !now) return;

  const base = 'https://wa.me/?text=';
  const textEn = 'Reminder: Omar & Salma wedding ceremony on Sunday, September 27, 2026 at 6:30 PM, Lebanese Terrace at Sky Resort, beside PetroSport Club, New Cairo. Map: https://maps.google.com/maps?q=Sky+Resort+New+Cairo+Beside+PetroSport+Club';
  const textAr = 'تذكير: حفل زفاف عمر وسلمى يوم الأحد ٢٧ سبتمبر ٢٠٢٦ الساعة ٦:٣٠ مساء في التراس اللبناني داخل سكاي ريزورت، بجوار نادي بتروسبورت، القاهرة الجديدة. الموقع: https://maps.google.com/maps?q=Sky+Resort+New+Cairo+Beside+PetroSport+Club';
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
