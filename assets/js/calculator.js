/**
 * مؤسسة سوسن أحمد صالح العسلي للتكييف والتبريد - Susan Ahmed Saleh Al-Asali Establishment
 * Makkah 24351, Saudi Arabia • Tel: 059 837 9204 • WhatsApp: 966598379204
 * Interactive Cost Estimator & Instant Booking
 */

document.addEventListener('DOMContentLoaded', () => {
  const applianceSelect = document.getElementById('calc-appliance');
  const issueSelect = document.getElementById('calc-issue');
  const districtSelect = document.getElementById('calc-district');
  const priceDisplay = document.getElementById('calc-price');
  const bookBtn = document.getElementById('calc-book-btn');

  if (!applianceSelect || !issueSelect || !priceDisplay || !bookBtn) {
    return;
  }

  // Comprehensive Issue options mapping based on appliance (AC, Refrigerators, Washers, Dryers, Dishwashers, Microwaves, Vacuums)
  const issuesByAppliance = {
    split_ac: [
      { id: 'freon_split', text: 'شحن فريون أصلي أمريكي (R410A / R22) وفحص التسريب', textEn: 'Original American Freon recharge (R410A/R22) & leak check', min: 140, max: 220 },
      { id: 'water_leak', text: 'معالجة تسريب المياه وتراكم الثلج وتنظيف حوض التصريف', textEn: 'Water leak, coil freeze fix & drain pipe clearing', min: 100, max: 180 },
      { id: 'cooling_loss', text: 'إصلاح ضعف التبريد وخروج هواء دافئ من المكيف السبليت', textEn: 'Cooling loss repair / warm air blowing fix', min: 120, max: 200 },
      { id: 'deep_cleaning', text: 'غسيل وتنظيف مكيف سبليت كامل بالمضخة والمواد المعقمة', textEn: 'Full indoor/outdoor pressure pump cleaning & sanitization', min: 90, max: 150 },
      { id: 'capacitor_fan', text: 'استبدال كاباستور المكثف، حساس الحرارة، أو مروحة التبريد', textEn: 'Capacitor, sensor, or outdoor fan motor replacement', min: 130, max: 230 },
      { id: 'compressor_split', text: 'فحص أو استبدال كمبروسر مكيف سبليت أصلي مع الضمان', textEn: 'Split AC original compressor check & replacement', min: 450, max: 850 },
      { id: 'general_ac', text: 'كشف فني شامل وفحص ضغط الغاز والكهرباء بمكة', textEn: 'Comprehensive on-site AC technical check & diagnostics in Makkah', min: 50, max: 80 }
    ],
    window_ac: [
      { id: 'window_cooling', text: 'صيانة ضعف التبريد وتعبئة فريون مكيف شباك أصلي', textEn: 'Window AC cooling repair & original Freon top-up', min: 120, max: 180 },
      { id: 'window_noise', text: 'معالجة الصوت المرتفع والاهتزاز وتنظيف دورة التبريد', textEn: 'Loud noise & vibration fix with full deep cleaning', min: 90, max: 150 },
      { id: 'window_parts', text: 'استبدال الثرموستات، مفتاح التشغيل، أو محرك المروحة', textEn: 'Thermostat, selector switch, or dual-shaft fan motor fix', min: 110, max: 190 },
      { id: 'window_general', text: 'فحص فني شامل لمكيف الشباك بمكة المكرمة', textEn: 'Comprehensive window AC on-site inspection in Makkah', min: 50, max: 70 }
    ],
    refrigerator: [
      { id: 'ref_cooling', text: 'معالجة انقطاع التبريد في الكابينة السفلية أو عدم التجميد بالفريزر', textEn: 'Cooling failure in fridge / no-freeze freezer repair', min: 120, max: 200 },
      { id: 'ref_freon', text: 'كشف تسريب غاز التبريد وشحن فريون أصلي (R134a / R600a)', textEn: 'Freon gas leak detection & original recharge (R134a/R600a)', min: 150, max: 240 },
      { id: 'ref_defrost', text: 'تغيير الثرموستات، التايمر، وسخانات إذابة الثلج (نظام No-Frost)', textEn: 'Defrost timer, bimetal thermostat & heating element fix', min: 130, max: 220 },
      { id: 'ref_compressor', text: 'استبدال كمبروسر الثلاجة الأصلي (انفرتر/عادي) مع الضمان', textEn: 'Original inverter / reciprocating compressor replacement', min: 380, max: 750 },
      { id: 'ref_general', text: 'كشف إلكتروني شامل وفحص دورة التبريد بالمنزل بمكة', textEn: 'Full in-home digital diagnostic & cooling system check in Makkah', min: 50, max: 80 }
    ],
    washing_machine: [
      { id: 'wash_drain', text: 'صيانة طلمبة الصرف أو معالجة عدم تصريف المياه والعصر', textEn: 'Drain pump repair / Water draining & spin failure', min: 120, max: 190 },
      { id: 'wash_bearing', text: 'تغيير رولمان بلي ومساعدين الحلة (إلغاء الصوت العالي والاهتزاز)', textEn: 'Drum bearings & shock absorbers replacement (Noise fix)', min: 180, max: 320 },
      { id: 'wash_board', text: 'فحص وإصلاح كارتة الغسالة الإلكترونية وبرمجة أكواد الأعطال', textEn: 'PCB electronic board repair & error code diagnostic', min: 150, max: 280 },
      { id: 'wash_lock', text: 'تغيير قفل الباب الإلكتروني وحساس الأمان وصمام المياه', textEn: 'Electronic door lock latch & water inlet valve replacement', min: 90, max: 160 },
      { id: 'wash_general', text: 'فحص فني شامل بالمنزل لجميع الماركات العالمية بمكة', textEn: 'Comprehensive in-home digital diagnostic checkup in Makkah', min: 50, max: 80 }
    ],
    dryer: [
      { id: 'dryer_heat', text: 'إصلاح هيتر التسخين وحساس الحرارة (النشافة لا تسخن)', textEn: 'Heating element & thermostat temperature sensor repair', min: 140, max: 240 },
      { id: 'dryer_belt', text: 'تغيير سير الحلة وبكرات الشد ومحرك الدوران للنشافة', textEn: 'Drive belt, idler pulley & drive motor replacement', min: 120, max: 200 },
      { id: 'dryer_general', text: 'فحص فني شامل وصيانة النشافات ومجففات الملابس بمكة', textEn: 'Comprehensive in-home clothes dryer diagnostics in Makkah', min: 50, max: 80 }
    ],
    dishwasher: [
      { id: 'dish_wash', text: 'صيانة عدم تنظيف الصحون جيداً أو مشاكل مضخة الرش', textEn: 'Sprayer arm & circulation wash pump repair', min: 130, max: 210 },
      { id: 'dish_drain', text: 'إصلاح تسريب المياه وانسداد الصرف في غسالة الصحون', textEn: 'Water leak & drain blockage fix for dishwasher', min: 120, max: 190 },
      { id: 'dish_general', text: 'فحص وصيانة غسالات الصحون بمختلف الماركات بمكة', textEn: 'Comprehensive dishwasher inspection & diagnostic in Makkah', min: 60, max: 90 }
    ],
    microwave: [
      { id: 'micro_heat', text: 'إصلاح الماجنترون وعدم التسخين أو الشرر داخل الميكروويف', textEn: 'Magnetron & high voltage diode / heating repair', min: 90, max: 160 },
      { id: 'micro_tray', text: 'تصليح محرك دوران الطبق، لوحة اللمس وباب الميكروويف', textEn: 'Turntable motor, membrane touch panel & door switch repair', min: 80, max: 140 }
    ],
    vacuum: [
      { id: 'vac_motor', text: 'صيانة محرك المكنسة الكهربائية وضعف قوة الشفط والاهتزاز', textEn: 'Vacuum cleaner motor repair & suction power restoration', min: 70, max: 130 },
      { id: 'vac_switch', text: 'إصلاح سلك الكهرباء والفيوز ومفتاح التشغيل', textEn: 'Power cord recoil, fuse & power switch fix', min: 50, max: 90 }
    ]
  };

  const updateIssuesList = () => {
    const selectedAppliance = applianceSelect.value;
    const issues = issuesByAppliance[selectedAppliance] || issuesByAppliance.split_ac;
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
    const applianceName = applianceSelect.selectedOptions[0]?.textContent.trim() || 'الأجهزة والتكييف';
    const issueName = issueSelect.selectedOptions[0]?.textContent.trim() || 'صيانة عامة';
    const districtName = districtSelect ? districtSelect.value : 'مكة المكرمة';

    const isEnglish = document.documentElement.getAttribute('lang') === 'en' || window.location.pathname.includes('/en/');
    
    let message = '';
    if (isEnglish) {
      message = `Hello Susan Al-Asali AC & Appliance Repair,\nI would like to request an immediate home repair in Makkah:\n- Appliance / Service: ${applianceName}\n- Issue: ${issueName}\n- District in Makkah: (${districtName})\n- Estimated Cost: ${min} - ${max} SAR approx\n\nPlease confirm technician arrival time.`;
    } else {
      message = `مرحباً مؤسسة سوسن أحمد صالح العسلي للتكييف والتبريد،\nأرغب في حجز فني صيانة منزلي فوري بمكة المكرمة:\n- الجهاز / الخدمة: ${applianceName}\n- العطل المطلوب: ${issueName}\n- الحي بمكة المكرمة: (${districtName})\n- التكلفة التقديرية: ${min} - ${max} ريال\n\nأرجو تأكيد موعد وصول الفني بالضمان المعتمد.`;
    }

    const encodedMsg = encodeURIComponent(message);
    const waUrl = `https://wa.me/966598379204?text=${encodedMsg}`;
    
    bookBtn.setAttribute('href', waUrl);
  };

  applianceSelect.addEventListener('change', updateIssuesList);
  issueSelect.addEventListener('change', calculatePrice);
  if (districtSelect) {
    districtSelect.addEventListener('change', calculatePrice);
  }

  // Initialize
  updateIssuesList();
});
