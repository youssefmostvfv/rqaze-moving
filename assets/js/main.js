/**
 * ايرفو كول لخدمات التكييف - Premium Furniture Moving Services Website
 * ملف الجافاسكريبت الرئيسي (Main JavaScript File)
 * يحتوي هذا الملف على جميع الوظائف التفاعلية للموقع مثل قائمة التنقل، الأسئلة الشائعة، والحركات عند التمرير.
 */

// يتم تنفيذ هذا الكود بمجرد أن يتم تحميل الهيكل الأساسي لصفحة HTML بالكامل
document.addEventListener('DOMContentLoaded', function () {
  // استدعاء (تشغيل) جميع الوظائف والمكونات الأساسية في الموقع
  initNavbar();           // تشغيل قائمة التنقل الخاصة بالجوال
  initFAQ();              // تشغيل قسم الأسئلة الشائعة (فتح وإغلاق الإجابات)
  initScrollAnimations(); // تشغيل تأثيرات ظهور العناصر عند التمرير للأسفل
  initSmoothScroll();     // تشغيل التمرير الناعم عند الضغط على الروابط
  initNavbarScroll();     // تشغيل تأثير القائمة العلوية عند التمرير (إضافة خلفية)
  initCounters();         // تشغيل العدادات الرقمية المتحركة (مثل عدد العملاء)
});

/**
 * وظيفة قائمة التنقل للهواتف المحمولة (Navbar Mobile Toggle)
 * تقوم بفتح وإغلاق القائمة الجانبية عند الضغط على زر القائمة (أيقونة الهمبرجر) في الشاشات الصغيرة
 */
function initNavbar() {
  // البحث عن زر القائمة والقائمة نفسها في الصفحة
  const toggle = document.querySelector('.navbar__toggle');
  const menu = document.querySelector('.navbar__menu');

  // التأكد من وجود الزر والقائمة قبل إضافة الأحداث لتجنب الأخطاء
  if (toggle && menu) {
    // إضافة حدث عند النقر على زر القائمة
    toggle.addEventListener('click', function () {
      // إضافة أو إزالة كلاس الحيوية (active) لفتح وإغلاق القائمة والزر
      menu.classList.toggle('active');
      toggle.classList.toggle('active');
    });

    // إغلاق القائمة تلقائياً بمجرد النقر على أي رابط بداخلها
    const links = menu.querySelectorAll('.navbar__link');
    links.forEach(link => {
      link.addEventListener('click', function () {
        menu.classList.remove('active');
        toggle.classList.remove('active');
      });
    });
  }
}

/**
 * الأسئلة الشائعة (FAQ Accordion)
 * وظيفة تتحكم في إظهار وإخفاء إجابة السؤال عند النقر عليه (مثل الأكورديون)
 */
function initFAQ() {
  // تحديد جميع الأسئلة الموجودة في الصفحة
  const faqItems = document.querySelectorAll('.faq__item');

  // المرور على كل سؤال لإضافة حدث النقر
  faqItems.forEach(item => {
    const question = item.querySelector('.faq__question');

    // عند النقر على السؤال
    question.addEventListener('click', function () {
      // التحقق مما إذا كان السؤال المفتوح حالياً هو الذي تم النقر عليه
      const isActive = item.classList.contains('active');

      // إغلاق جميع الأسئلة الأخرى أولاً لإبقاء سؤال واحد فقط مفتوح
      faqItems.forEach(faqItem => {
        faqItem.classList.remove('active');
      });

      // إذا لم يكن السؤال نشطاً بالفعل، قم بفتحه
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });
}

/**
 * تأثيرات الظهور عند التمرير (Scroll Animations)
 * تستخدم واجهة الـ Intersection Observer الحديثة لمراقبة متى يظهر العنصر على الشاشة
 * لتطبيق حركة (أنيميشن) عليه بدلاً من إظهارها كلها مرة واحدة.
 */
function initScrollAnimations() {
  // جلب جميع العناصر التي تحتوي على كلاس الحركة 'animate-on-scroll'
  const animatedElements = document.querySelectorAll('.animate-on-scroll');

  // إذا لم يتم العثور على أي عنصر يخضع للتحريك، توقف عن تنفيذ الكود
  if (animatedElements.length === 0) return;

  // إعدادات المراقبة: 0.1 تعني متى ما ظهر 10% من العنصر في الشاشة، يتم تشغيل الحركة
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  // إنشاء مراقب لتتبع العناصر
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      // إذا كان العنصر ظاهراً على الشاشة (في نطاق رؤية المستخدم)
      if (entry.isIntersecting) {
        // يتم إضافة كلاس (animated) الذي يشغل الحركة في ملف CSS
        entry.target.classList.add('animated');
        // بعد تشغيل الحركة، يتم إيقاف المراقبة على هذا العنصر لتخفيف العبء على المتصفح
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // ربط جميع العناصر المختارة لتصبح تحت مراقبة هذه الوظيفة المؤتمتة
  animatedElements.forEach(element => {
    observer.observe(element);
  });
}

/**
 * التمرير السلس (Smooth Scroll)
 * وظيفة تجعل الصفحة تنتقل لأسفل أو لأعلى بنعومة عند النقر على روابط تشير إلى أجزاء في نفس الصفحة (بتبدأ بـ #)
 */
function initSmoothScroll() {
  // تحديد جميع الروابط التي تحتوي على علامة المربع (#)
  const anchorLinks = document.querySelectorAll('a[href^="#"]');

  anchorLinks.forEach(link => {
    link.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      // إذا كان الرابط فارغاً، فتوقف
      if (href === '#') return;

      // تحديد الجزء (Section) المستهدف بناءً على الـ id الخاص به
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault(); // منع السلوك الافتراضي للانتقال الفوري والمفاجئ
        // حساب ارتفاع شريط التنقل العلوي الثابت وطرحه حتى لا يُغطي على عنوان القسم عند الوصول إليه
        const navbarHeight = document.querySelector('.navbar').offsetHeight;
        const targetPosition = target.offsetTop - navbarHeight;

        // تنفيذ عملية التمرير الناعم إلى الموقع المستهدف المحدد
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

/**
 * تأثير التمرير على القائمة العلوية (Navbar scroll effect)
 * وظيفة تضيف تأثير بصري مثل تغيير الخلفية أو إضافة ظل لـ النافبار عند التنزيل في الصفحة.
 */
function initNavbarScroll() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;

  // مراقبة أحداث تمرير (سكْرول) المستخدم
  window.addEventListener('scroll', function () {
    // إذا نزل المستخدم للأسفل أكثر من 50 بكسل
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled'); // إضافة كلاس يطبق تأثير الـ CSS الداكن/المتغير
    } else {
      navbar.classList.remove('scrolled'); // إزالة التأثير عند العودة للأعلى
    }
  });
}

/**
 * تحريك العدادات الرقمية (Counter Animation)
 * وظيفة لتحريك أرقام الإحصائيات تصاعدياً من 0 إلى الرقم النهائي بطريقة سلسة.
 */
function initCounters() {
  // تحديد جميع العناصر التي تحتوي على الإحصائيات
  const counters = document.querySelectorAll('.stat-card__number');

  if (counters.length === 0) return;

  // إعدادات المراقبة لتشغيل العداد فقط عند وصول المستخدم لمكانه على الشاشة بنسبة 50%
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.5
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      // عند رؤية العداد في الشاشة
      if (entry.isIntersecting) {
        const counter = entry.target;
        const text = counter.textContent;

        // استخراج القيمة الرقمية من النص (على سبيل المثال: "+2000" تصبح 2000، و "98%" تصبح 98)
        // هذا باستخدام التعابير النمطية (Regex) لاستخراج الأرقام والنقاط العشرية فقط
        const match = text.match(/[\d.]+/);
        if (match) {
          const target = parseFloat(match[0]); // تحويلها لقيمة رقمية يمكن التعامل معها
          const suffix = text.replace(/[\d.]+/, ''); // استخراج العلامات المصاحبة (مثل % أو الزائد +) لوضعها بنهاية الرقم مجدداً

          // البدء بتشغيل دالة التحريك وتمرير القيم لها
          animateCounter(counter, target, suffix);
        }

        // إيقاف مراقبة هذا الرقم لعدم تشغيل الأنيميشن سوى مرة واحدة فقط
        observer.unobserve(counter);
      }
    });
  }, observerOptions);

  counters.forEach(counter => {
    observer.observe(counter);
  });
}

/**
 * دالة تفصيلية لتشغيل حركة العد (Animating the numbers values)
 * تقوم بحساب الخطوات والمدة لتصل للرقم النهائي بصرياً بسلاسة
 */
function animateCounter(element, target, suffix) {
  const duration = 2000; // مدة الحركة كاملة بالملي ثانية (2 ثانية)
  const start = 0; // الرقم المبدئي يبدأ من الصفر

  // حساب المتبقي لكل تحديث لإطار الشاشة للوصول للهدف في المدة المحددة (duration / 16 لضمان انسيابية تعادل 60 إطار في الثانية)
  const increment = target / (duration / 16);
  let current = start;

  // التحقق مما إذا كان الرقم المستهدف به كسر عشري (مثلاً 4.9 الخاصة بتقييم العملاء)
  const isDecimal = target % 1 !== 0;

  // دالة متكررة لتحديث الرقم المعروض
  function updateCounter() {
    current += increment; // إضافة جزء للرقم الحالي

    // طالما أن الرقم الحالي أصغر من هدفنا (الرقم النهائي)
    if (current < target) {
      // طباعة الرقم (مع مراعاة كسوره العشرية إن وجدت) وبجانبه السافكس
      element.textContent = (isDecimal ? current.toFixed(1) : Math.floor(current)) + suffix;
      requestAnimationFrame(updateCounter); // اطلب إطار حركي جديد للاستمرار بالعد
    } else {
      // عند الانتهاء، سيتم التتويج بوضع الرقم النهائي بشكل ضامن لعدم تجاوزه للهدف
      element.textContent = target + suffix;
    }
  }

  // بداية تشغيل التحديث
  updateCounter();
}

/**
 * مستكشف الأحياء (Neighborhood Explorer)
 * وظيفة للتحكم في التبويبات والبحث داخل أحياء الرياض
 */
function initNeighborhoodExplorer() {
  const tabs = document.querySelectorAll('.explorer-tab-btn');
  const panes = document.querySelectorAll('.explorer-pane');
  const searchInput = document.getElementById('nb-search');
  const chips = document.querySelectorAll('.neighborhood-chip');
  const emptyState = document.getElementById('search-not-found');

  if (!tabs.length || !searchInput) return;

  // 1. التحكم في التبويبات
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.getAttribute('data-pane');
      
      // إزالة الحالة النشطة من الجميع
      tabs.forEach(t => t.classList.remove('active'));
      panes.forEach(p => p.classList.remove('active'));
      
      // إضافة الحالة النشطة للتبويب والمحتوى المختار
      tab.classList.add('active');
      document.getElementById(target).classList.add('active');
      
      // مسح البحث عند تغيير التبويب (اختياري)
      // searchInput.value = '';
      // filterNeighborhoods('');
    });
  });

  // 2. محرك البحث الذكي
  searchInput.addEventListener('input', (e) => {
    const term = e.target.value.trim().toLowerCase();
    filterNeighborhoods(term);
  });

  function filterNeighborhoods(term) {
    let hasResults = false;

    if (term === '') {
      // إعادة الحالة العادية
      const activeTabPaneId = document.querySelector('.explorer-tab-btn.active').getAttribute('data-pane');
      panes.forEach(p => p.style.display = ''); 
      panes.forEach(p => p.classList.remove('active'));
      document.getElementById(activeTabPaneId).classList.add('active');
      chips.forEach(c => c.classList.remove('highlight'));
      emptyState.style.display = 'none';
      return;
    }

    // البحث في كل الأحياء
    panes.forEach(pane => {
      let paneHasMatch = false;
      const paneChips = pane.querySelectorAll('.neighborhood-chip');
      
      paneChips.forEach(chip => {
        if (chip.textContent.toLowerCase().includes(term)) {
          chip.classList.add('highlight');
          paneHasMatch = true;
          hasResults = true;
        } else {
          chip.classList.remove('highlight');
        }
      });

      // إظهار القسم الذي يحتوي على نتائج فقط أثناء البحث
      if (paneHasMatch) {
        pane.style.display = 'flex';
        pane.classList.add('active');
      } else {
        pane.style.display = 'none';
        pane.classList.remove('active');
      }
    });

    emptyState.style.display = hasResults ? 'none' : 'block';
  }
}

/**
 * منصة التشغيل التفاعلية (Operational Hub)
 */
function initOperationalHub() {
  const hubBtns = document.querySelectorAll('.hub-nav-btn');
  const hubPanes = document.querySelectorAll('.hub-pane');

  if (!hubBtns.length) return;

  hubBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.getAttribute('data-hub');

      // إزالة الحالة النشطة
      hubBtns.forEach(b => b.classList.remove('active'));
      hubPanes.forEach(p => p.classList.remove('active'));

      // تفعيل العنصر المختار
      btn.classList.add('active');
      const targetPane = document.getElementById(target);
      if (targetPane) {
        targetPane.classList.add('active');
      }
    });
  });
}

// تحديث الاستدعاء عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
  if (typeof initNeighborhoodExplorer === 'function') initNeighborhoodExplorer();
  if (typeof initOperationalHub === 'function') initOperationalHub();
});


