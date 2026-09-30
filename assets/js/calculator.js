/**
 * مؤسسة بوابة غرناطة للسباكة والكهرباء والدهانات بالرياض - Bawabat Garnada Est.
 * شارع خالد بن الوليد، الرياض 13241 | هاتف: 054 660 1168 | واتساب: 966546601168
 * Instant On-Site Technician Booking & WhatsApp Dispatch Engine
 */

document.addEventListener('DOMContentLoaded', () => {
  const serviceCategorySelect = document.getElementById('calc-category') || document.getElementById('calc-appliance');
  const issueSelect = document.getElementById('calc-issue');
  const districtSelect = document.getElementById('calc-district');
  const statusDisplay = document.getElementById('calc-price');
  const bookBtn = document.getElementById('calc-book-btn');

  if (!serviceCategorySelect || !issueSelect || !bookBtn) {
    return;
  }

  // Comprehensive services & tasks catalog for Riyadh
  const issuesByCategory = {
    plumbing: [
      { id: 'leak_detection', text: 'كشف تسربات المياه إلكترونياً بدون تكسير مع تقرير معتمد', textEn: 'Digital acoustic/thermal water leak detection without breaking tiles' },
      { id: 'drain_unclog', text: 'تسليك مجاري وشبكات الصرف الصحي بأحدث أجهزة الضغط والنيتروجين', textEn: 'Drain & sewage pipe unblocking with high-pressure jetting' },
      { id: 'sanitary_install', text: 'تركيب وصيانة الأدوات الصحية، الكراسي المعلقة والخلاطات والمغاسل', textEn: 'Sanitary fixtures, wall-hung toilets, faucets & sinks installation' },
      { id: 'heater_pump', text: 'تركيب وتصليح السخانات المركزية والعادية ومضخات ضغط المياه (الدينمو)', textEn: 'Water heater (central/regular) & pressure booster pump repair' },
      { id: 'pipe_renovation', text: 'تمديد وتجديد شبكات تغذية المياه والصرف للحمامات والمطابخ', textEn: 'Water supply & drainage pipe network installation/renovation' },
      { id: 'general_plumbing', text: 'معاينة وفحص شامل لأعمال السباكة المنزلية بالرياض', textEn: 'Comprehensive on-site plumbing inspection & diagnostics in Riyadh' }
    ],
    electrical: [
      { id: 'short_circuit', text: 'كشف وإصلاح أعطال التماس الكهربائي ونزول القواطع المفاجئ', textEn: 'Short circuit troubleshooting & breaker tripping repair' },
      { id: 'panel_breaker', text: 'تأسيس وصيانة لوحات التوزيع الكهربائية والقواطع الذكية (DB Panel)', textEn: 'Distribution board (DB) panel upgrade & breaker installation' },
      { id: 'lighting_led', text: 'تركيب وتوزيع إضاءات الليد، السبوت لايت، النجف والإنارة المخفية', textEn: 'LED strip, spotlights, chandeliers & decorative lighting setup' },
      { id: 'switches_sockets', text: 'تركيب وتغيير المفاتيح والأفياش وتمديد خطوط كهرباء جديدة', textEn: 'Switches, power outlets & new electrical wiring extension' },
      { id: 'general_electrical', text: 'فحص فني كهربائي شامل للمنازل والفلل بالرياض', textEn: 'Full residential & commercial electrical safety inspection in Riyadh' }
    ],
    painting: [
      { id: 'interior_paint', text: 'دهان جدران داخلية بأرقى دهانات جوتن والجزيرة (وجهين + معجون)', textEn: 'Premium interior wall painting (Jotun/Jazeera) with putty prep' },
      { id: 'crack_damp', text: 'معالجة الرطوبة والتشققات والتقشير وعزل الجدران قبل الدهان', textEn: 'Dampness, crack repair & wall moisture proofing treatment' },
      { id: 'wood_marble_panels', text: 'تركيب بديل الخشب وبديل الرخام وبانوهات الفوم الجدارية العصرية', textEn: 'Wood slats, marble PVC sheets & decorative wall moldings setup' },
      { id: 'exterior_paint', text: 'دهانات بروفايل وواجهات خارجية مقاومة للعوامل الجوية وحرارة الرياض', textEn: 'Exterior profile painting & weather-resistant villa facades' },
      { id: 'general_paint', text: 'معاينة الموقع ورفع المقاسات وتقديم كتالوج الألوان مجاناً بالرياض', textEn: 'On-site color consultation, measurement & color catalog preview' }
    ],
    renovation: [
      { id: 'bathroom_reno', text: 'ترميم وتجديد دورات المياه والمطابخ بالكامل (سباكة + عزل + بلاط)', textEn: 'Complete bathroom & kitchen renovation (plumbing, waterproofing, tiles)' },
      { id: 'roof_tank_insulation', text: 'عزل مائي وحراري للأسطح وخزانات المياه بمواد معتمدة وضمان رسمي', textEn: 'Waterproofing & thermal insulation for roofs & water tanks with official warranty' },
      { id: 'home_maintenance', text: 'صيانة دورية متكاملة للمنازل، الفلل والشركات بالرياض', textEn: 'Comprehensive periodic facility & residential maintenance in Riyadh' }
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
      issueSelect.appendChild(opt);
    });

    updateDispatchStatus();
  };

  const updateDispatchStatus = () => {
    const isEnglish = document.documentElement.getAttribute('lang') === 'en' || window.location.pathname.includes('/en/');
    if (statusDisplay) {
      statusDisplay.textContent = isEnglish ? '⚡ Technician Ready for Immediate Dispatch' : '⚡ الفني جاهز ومتاح للتحرك الفوري';
    }
    updateWhatsAppLink();
  };

  const updateWhatsAppLink = () => {
    const catName = serviceCategorySelect.selectedOptions[0]?.textContent.trim() || 'السباكة والكهرباء';
    const issueName = issueSelect.selectedOptions[0]?.textContent.trim() || 'طلب فني متخصص';
    const districtName = districtSelect ? districtSelect.value : 'الرياض';

    const isEnglish = document.documentElement.getAttribute('lang') === 'en' || window.location.pathname.includes('/en/');
    
    let message = '';
    if (isEnglish) {
      message = `Hello Bawabat Garnada Est. Riyadh,\nI would like to request an on-site technician in Riyadh:\n- Service: ${catName}\n- Specific Task: ${issueName}\n- District: (${districtName})\n\nPlease confirm availability and dispatch time with official warranty.`;
    } else {
      message = `مرحباً مؤسسة بوابة غرناطة للسباكة والكهرباء بالرياض،\nأرغب في حجز فني متخصص فوري لمنزلي بالرياض:\n- الخدمة المطلوبة: ${catName}\n- نوع العمل / المشكلة: ${issueName}\n- الحي بالرياض: (${districtName})\n\nأرجو تأكيد موعد وصول الفني بالضمان المعتمد.`;
    }

    const encodedMsg = encodeURIComponent(message);
    const waUrl = `https://wa.me/966546601168?text=${encodedMsg}`;
    
    bookBtn.setAttribute('href', waUrl);
  };

  serviceCategorySelect.addEventListener('change', updateIssuesList);
  issueSelect.addEventListener('change', updateDispatchStatus);
  if (districtSelect) {
    districtSelect.addEventListener('change', updateDispatchStatus);
  }

  // Initialize
  updateIssuesList();
});
