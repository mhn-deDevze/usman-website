/**
 * مؤسسة بوابة غرناطة للسباكة والكهرباء والدهانات بالرياض - Bawabat Garnada Est.
 * شارع خالد بن الوليد، الرياض 13241 | هاتف: 054 660 1168 | واتساب: 966546601168
 * Interactive Cost Estimator & Instant WhatsApp Booking Engine
 */

document.addEventListener('DOMContentLoaded', () => {
  const serviceCategorySelect = document.getElementById('calc-category') || document.getElementById('calc-appliance');
  const issueSelect = document.getElementById('calc-issue');
  const districtSelect = document.getElementById('calc-district');
  const priceDisplay = document.getElementById('calc-price');
  const bookBtn = document.getElementById('calc-book-btn');

  if (!serviceCategorySelect || !issueSelect || !priceDisplay || !bookBtn) {
    return;
  }

  // Comprehensive services & issue pricing catalog for Riyadh
  const issuesByCategory = {
    plumbing: [
      { id: 'leak_detection', text: 'كشف تسربات المياه إلكترونياً بدون تكسير مع تقرير معتمد', textEn: 'Digital acoustic/thermal water leak detection without breaking tiles', min: 150, max: 280 },
      { id: 'drain_unclog', text: 'تسليك مجاري وشبكات الصرف الصحي بأحدث أجهزة الضغط والنيتروجين', textEn: 'Drain & sewage pipe unblocking with high-pressure jetting', min: 120, max: 220 },
      { id: 'sanitary_install', text: 'تركيب وصيانة الأدوات الصحية، الكراسي المعلقة والخلاطات والمغاسل', textEn: 'Sanitary fixtures, wall-hung toilets, faucets & sinks installation', min: 100, max: 190 },
      { id: 'heater_pump', text: 'تركيب وتصليح السخانات المركزية والعادية ومضخات ضغط المياه (الدينمو)', textEn: 'Water heater (central/regular) & pressure booster pump repair', min: 130, max: 250 },
      { id: 'pipe_renovation', text: 'تمديد وتجديد شبكات تغذية المياه والصرف للحمامات والمطابخ', textEn: 'Water supply & drainage pipe network installation/renovation', min: 250, max: 650 },
      { id: 'general_plumbing', text: 'كشف فني فوري وشامل لأعمال السباكة المنزلية بالرياض', textEn: 'Comprehensive on-site plumbing inspection & diagnostics in Riyadh', min: 50, max: 80 }
    ],
    electrical: [
      { id: 'short_circuit', text: 'كشف وإصلاح أعطال التماس الكهربائي ونزول القواطع المفاجئ', textEn: 'Short circuit troubleshooting & breaker tripping repair', min: 130, max: 240 },
      { id: 'panel_breaker', text: 'تأسيس وصيانة لوحات التوزيع الكهربائية والقواطع الذكية (DB Panel)', textEn: 'Distribution board (DB) panel upgrade & breaker installation', min: 180, max: 350 },
      { id: 'lighting_led', text: 'تركيب وتوزيع إضاءات الليد، السبوت لايت، النجف والإنارة المخفية', textEn: 'LED strip, spotlights, chandeliers & decorative lighting setup', min: 100, max: 200 },
      { id: 'switches_sockets', text: 'تركيب وتغيير المفاتيح والأفياش وتمديد خطوط كهرباء جديدة', textEn: 'Switches, power outlets & new electrical wiring extension', min: 90, max: 160 },
      { id: 'general_electrical', text: 'فحص فني كهربائي شامل للمنازل والفلل بالرياض', textEn: 'Full residential & commercial electrical safety inspection in Riyadh', min: 50, max: 80 }
    ],
    painting: [
      { id: 'interior_paint', text: 'دهان جدران داخلية بأرقى دهانات جوتن والجزيرة (وجهين + معجون)', textEn: 'Premium interior wall painting (Jotun/Jazeera) with putty prep', min: 300, max: 800 },
      { id: 'crack_damp', text: 'معالجة الرطوبة والتشققات والتقشير وعزل الجدران قبل الدهان', textEn: 'Dampness, crack repair & wall moisture proofing treatment', min: 150, max: 320 },
      { id: 'wood_marble_panels', text: 'تركيب بديل الخشب وبديل الرخام وبانوهات الفوم الجدارية العصرية', textEn: 'Wood slats, marble PVC sheets & decorative wall moldings setup', min: 220, max: 550 },
      { id: 'exterior_paint', text: 'دهانات بروفايل وواجهات خارجية مقاومة للعوامل الجوية وحرارة الرياض', textEn: 'Exterior profile painting & weather-resistant villa facades', min: 500, max: 1500 },
      { id: 'general_paint', text: 'معاينة الموقع ورفع المقاسات وتقديم كتالوج الألوان مجاناً بالرياض', textEn: 'On-site color consultation, measurement & color catalog preview', min: 50, max: 80 }
    ],
    renovation: [
      { id: 'bathroom_reno', text: 'ترميم وتجديد دورات المياه والمطابخ بالكامل (سباكة + عزل + بلاط)', textEn: 'Complete bathroom & kitchen renovation (plumbing, waterproofing, tiles)', min: 800, max: 2500 },
      { id: 'roof_tank_insulation', text: 'عزل مائي وحراري للأسطح وخزانات المياه بمواد معتمدة وضمان 10 سنوات', textEn: 'Waterproofing & thermal insulation for roofs & water tanks (10-yr warranty)', min: 600, max: 1800 },
      { id: 'home_maintenance', text: 'صيانة دورية متكاملة للمنازل، الفلل والشركات بالرياض', textEn: 'Comprehensive periodic facility & residential maintenance in Riyadh', min: 200, max: 500 }
    ]
  };

  const updateIssuesList = () => {
    const selectedCat = serviceCategorySelect.value;
    const issues = issuesByCategory[selectedCat] || issuesByCategory.plumbing;
    const isEnglish = document.documentElement.getAttribute('lang') === 'en' || window.location.pathname.includes('/en/');

    issueSelect.innerHTML = '';
    issues.forEach(issue => {
      const opt = document.createElement('option');
      opt.value = issue.id;
      opt.textContent = isEnglish ? issue.textEn : issue.text;
      opt.dataset.min = issue.min;
      opt.dataset.max = issue.max;
      issueSelect.appendChild(opt);
    });

    calculatePrice();
  };

  const calculatePrice = () => {
    const selectedOpt = issueSelect.selectedOptions[0];
    if (!selectedOpt) return;

    const min = selectedOpt.dataset.min || 100;
    const max = selectedOpt.dataset.max || 200;
    const isEnglish = document.documentElement.getAttribute('lang') === 'en' || window.location.pathname.includes('/en/');

    priceDisplay.textContent = isEnglish ? `${min} - ${max} SAR approx` : `${min} - ${max} ريال تقريباً`;
    updateWhatsAppLink(min, max);
  };

  const updateWhatsAppLink = (min, max) => {
    const catName = serviceCategorySelect.selectedOptions[0]?.textContent.trim() || 'السباكة والكهرباء';
    const issueName = issueSelect.selectedOptions[0]?.textContent.trim() || 'صيانة عامة';
    const districtName = districtSelect ? districtSelect.value : 'الرياض';

    const isEnglish = document.documentElement.getAttribute('lang') === 'en' || window.location.pathname.includes('/en/');
    
    let message = '';
    if (isEnglish) {
      message = `Hello Bawabat Garnada Plumbing & Electrical Riyadh,\nI would like to book a certified technician in Riyadh:\n- Service: ${catName}\n- Task / Issue: ${issueName}\n- District in Riyadh: (${districtName})\n- Estimated Cost: ${min} - ${max} SAR approx\n\nPlease confirm availability and dispatch time.`;
    } else {
      message = `مرحباً مؤسسة بوابة غرناطة للسباكة والكهرباء بالرياض،\nأرغب في حجز فني متخصص فوري بالرياض:\n- الخدمة المطلوبة: ${catName}\n- نوع العمل / العطل: ${issueName}\n- الحي بالرياض: (${districtName})\n- التكلفة التقديرية: ${min} - ${max} ريال تقريباً\n\nأرجو تأكيد موعد وصول الفني بالضمان المعتمد.`;
    }

    const encodedMsg = encodeURIComponent(message);
    const waUrl = `https://wa.me/966546601168?text=${encodedMsg}`;
    
    bookBtn.setAttribute('href', waUrl);
  };

  serviceCategorySelect.addEventListener('change', updateIssuesList);
  issueSelect.addEventListener('change', calculatePrice);
  if (districtSelect) {
    districtSelect.addEventListener('change', calculatePrice);
  }

  // Initialize
  updateIssuesList();
});
