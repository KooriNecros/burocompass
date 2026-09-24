export type LangCode =
  | "it" | "en" | "ar" | "zh" | "fr" | "es"
  | "uk" | "ro" | "ru" | "bn" | "tl" | "pl"
  | "fa" | "hi" | "sq" | "de" | "pt" | "tr";

export interface OnboardingTranslations {
  langName: string;
  step2Title: string;
  reasons: Record<"work" | "study" | "family" | "other", string>;
  step3Title: string;
  times: Record<"just_arrived" | "less_1_year" | "more_1_year", string>;
  step4Title: string;
  step4Subtitle: string;
  docs: Record<
    "codice_fiscale" | "permesso_soggiorno" | "residenza" | "spid" | "tessera_sanitaria",
    string
  >;
  step5Title: string;
  hasFamily: string;
  dependents: string;
  nonDependents: string;
  back: string;
  next: string;
  start: string;
  unknownNationality: string;
}

export const TRANSLATIONS: Record<LangCode, OnboardingTranslations> = {
  it: {
    langName: "Italiano",
    step2Title: "Perché sei in Italia?",
    reasons: { work: "Lavoro", study: "Studio", family: "Ricongiungimento familiare", other: "Altro" },
    step3Title: "Da quanto sei in Italia?",
    times: { just_arrived: "Appena arrivato/a", less_1_year: "Meno di 1 anno", more_1_year: "Più di 1 anno" },
    step4Title: "Hai già questi documenti?",
    step4Subtitle: "Seleziona tutti quelli che hai già",
    docs: {
      codice_fiscale: "Codice fiscale",
      permesso_soggiorno: "Permesso di soggiorno",
      residenza: "Residenza anagrafica",
      spid: "SPID",
      tessera_sanitaria: "Tessera sanitaria",
    },
    step5Title: "Hai familiari in Italia?",
    hasFamily: "Ho familiari in Italia",
    dependents: "Familiari a carico (figli, coniuge non lavorante...)",
    nonDependents: "Familiari non a carico (genitori, fratelli lavoranti...)",
    back: "← Indietro", next: "Avanti →", start: "Inizia ✓",
    unknownNationality: "Nazionalità non riconosciuta — si procederà in inglese",
  },
  en: {
    langName: "English",
    step2Title: "Why are you in Italy?",
    reasons: { work: "Work", study: "Study", family: "Family reunification", other: "Other" },
    step3Title: "How long have you been in Italy?",
    times: { just_arrived: "Just arrived", less_1_year: "Less than 1 year", more_1_year: "More than 1 year" },
    step4Title: "Do you already have these documents?",
    step4Subtitle: "Select all that you already have",
    docs: {
      codice_fiscale: "Tax code (Codice fiscale)",
      permesso_soggiorno: "Residence permit (Permesso di soggiorno)",
      residenza: "Registered residence (Residenza anagrafica)",
      spid: "Digital identity (SPID)",
      tessera_sanitaria: "Health card (Tessera sanitaria)",
    },
    step5Title: "Do you have family in Italy?",
    hasFamily: "I have family in Italy",
    dependents: "Dependent family members (children, non-working spouse...)",
    nonDependents: "Non-dependent family members (parents, working siblings...)",
    back: "← Back", next: "Next →", start: "Start ✓",
    unknownNationality: "Nationality not recognised — proceeding in English",
  },
  ar: {
    langName: "العربية",
    step2Title: "لماذا أنت في إيطاليا؟",
    reasons: { work: "عمل", study: "دراسة", family: "لمّ شمل الأسرة", other: "أخرى" },
    step3Title: "كم من الوقت أنت في إيطاليا؟",
    times: { just_arrived: "وصلت للتو", less_1_year: "أقل من سنة", more_1_year: "أكثر من سنة" },
    step4Title: "هل لديك هذه الوثائق بالفعل؟",
    step4Subtitle: "اختر كل ما لديك بالفعل",
    docs: {
      codice_fiscale: "الرقم الضريبي (Codice fiscale)",
      permesso_soggiorno: "تصريح الإقامة (Permesso di soggiorno)",
      residenza: "تسجيل الإقامة (Residenza anagrafica)",
      spid: "الهوية الرقمية (SPID)",
      tessera_sanitaria: "البطاقة الصحية (Tessera sanitaria)",
    },
    step5Title: "هل لديك أسرة في إيطاليا؟",
    hasFamily: "لدي أفراد أسرة في إيطاليا",
    dependents: "أفراد الأسرة المعالون (أطفال، زوج/زوجة غير عامل...)",
    nonDependents: "أفراد الأسرة غير المعالين (والدان، إخوة عاملون...)",
    back: "رجوع →", next: "← التالي", start: "ابدأ ✓",
    unknownNationality: "الجنسية غير معروفة — سيُستخدم الإنجليزية",
  },
  zh: {
    langName: "中文",
    step2Title: "您为什么在意大利？",
    reasons: { work: "工作", study: "学习", family: "家庭团聚", other: "其他" },
    step3Title: "您在意大利多久了？",
    times: { just_arrived: "刚刚到达", less_1_year: "不到1年", more_1_year: "超过1年" },
    step4Title: "您已经有这些证件了吗？",
    step4Subtitle: "选择您已经拥有的所有证件",
    docs: {
      codice_fiscale: "税务号码 (Codice fiscale)",
      permesso_soggiorno: "居留许可证 (Permesso di soggiorno)",
      residenza: "户籍登记 (Residenza anagrafica)",
      spid: "数字身份 (SPID)",
      tessera_sanitaria: "医疗卡 (Tessera sanitaria)",
    },
    step5Title: "您在意大利有家人吗？",
    hasFamily: "我在意大利有家人",
    dependents: "受抚养家庭成员（子女、未就业配偶…）",
    nonDependents: "非受抚养家庭成员（父母、就业兄弟姐妹…）",
    back: "← 返回", next: "下一步 →", start: "开始 ✓",
    unknownNationality: "国籍未识别 — 将以英语继续",
  },
  fr: {
    langName: "Français",
    step2Title: "Pourquoi êtes-vous en Italie ?",
    reasons: { work: "Travail", study: "Études", family: "Regroupement familial", other: "Autre" },
    step3Title: "Depuis combien de temps êtes-vous en Italie ?",
    times: { just_arrived: "Vient d'arriver", less_1_year: "Moins d'1 an", more_1_year: "Plus d'1 an" },
    step4Title: "Avez-vous déjà ces documents ?",
    step4Subtitle: "Sélectionnez tous ceux que vous avez déjà",
    docs: {
      codice_fiscale: "Numéro fiscal (Codice fiscale)",
      permesso_soggiorno: "Permis de séjour (Permesso di soggiorno)",
      residenza: "Résidence enregistrée (Residenza anagrafica)",
      spid: "Identité numérique (SPID)",
      tessera_sanitaria: "Carte de santé (Tessera sanitaria)",
    },
    step5Title: "Avez-vous de la famille en Italie ?",
    hasFamily: "J'ai de la famille en Italie",
    dependents: "Membres de famille à charge (enfants, conjoint sans emploi...)",
    nonDependents: "Membres de famille non à charge (parents, frères/sœurs actifs...)",
    back: "← Retour", next: "Suivant →", start: "Commencer ✓",
    unknownNationality: "Nationalité non reconnue — poursuite en anglais",
  },
  es: {
    langName: "Español",
    step2Title: "¿Por qué estás en Italia?",
    reasons: { work: "Trabajo", study: "Estudios", family: "Reagrupación familiar", other: "Otro" },
    step3Title: "¿Cuánto tiempo llevas en Italia?",
    times: { just_arrived: "Recién llegado/a", less_1_year: "Menos de 1 año", more_1_year: "Más de 1 año" },
    step4Title: "¿Ya tienes estos documentos?",
    step4Subtitle: "Selecciona todos los que ya tienes",
    docs: {
      codice_fiscale: "Número fiscal (Codice fiscale)",
      permesso_soggiorno: "Permiso de residencia (Permesso di soggiorno)",
      residenza: "Empadronamiento (Residenza anagrafica)",
      spid: "Identidad digital (SPID)",
      tessera_sanitaria: "Tarjeta sanitaria (Tessera sanitaria)",
    },
    step5Title: "¿Tienes familia en Italia?",
    hasFamily: "Tengo familia en Italia",
    dependents: "Familiares a cargo (hijos, cónyuge no trabajador...)",
    nonDependents: "Familiares no a cargo (padres, hermanos trabajadores...)",
    back: "← Atrás", next: "Siguiente →", start: "Empezar ✓",
    unknownNationality: "Nacionalidad no reconocida — se continuará en inglés",
  },
  uk: {
    langName: "Українська",
    step2Title: "Чому ви в Італії?",
    reasons: { work: "Робота", study: "Навчання", family: "Возз'єднання сім'ї", other: "Інше" },
    step3Title: "Скільки часу ви в Італії?",
    times: { just_arrived: "Щойно приїхав/ла", less_1_year: "Менше 1 року", more_1_year: "Більше 1 року" },
    step4Title: "Чи є у вас вже ці документи?",
    step4Subtitle: "Виберіть усі, які у вас вже є",
    docs: {
      codice_fiscale: "Податковий код (Codice fiscale)",
      permesso_soggiorno: "Посвідка на проживання (Permesso di soggiorno)",
      residenza: "Реєстрація місця проживання (Residenza anagrafica)",
      spid: "Цифрова ідентичність (SPID)",
      tessera_sanitaria: "Медична картка (Tessera sanitaria)",
    },
    step5Title: "Чи є у вас родина в Італії?",
    hasFamily: "У мене є родина в Італії",
    dependents: "Залежні члени сім'ї (діти, непрацюючий чоловік/дружина...)",
    nonDependents: "Незалежні члени сім'ї (батьки, працюючі брати/сестри...)",
    back: "← Назад", next: "Далі →", start: "Почати ✓",
    unknownNationality: "Національність не розпізнана — продовжимо англійською",
  },
  ro: {
    langName: "Română",
    step2Title: "De ce ești în Italia?",
    reasons: { work: "Muncă", study: "Studii", family: "Reîntregirea familiei", other: "Altceva" },
    step3Title: "De cât timp ești în Italia?",
    times: { just_arrived: "Tocmai am sosit", less_1_year: "Mai puțin de 1 an", more_1_year: "Mai mult de 1 an" },
    step4Title: "Ai deja aceste documente?",
    step4Subtitle: "Selectează toate pe care le ai deja",
    docs: {
      codice_fiscale: "Cod fiscal (Codice fiscale)",
      permesso_soggiorno: "Permis de ședere (Permesso di soggiorno)",
      residenza: "Reședință înregistrată (Residenza anagrafica)",
      spid: "Identitate digitală (SPID)",
      tessera_sanitaria: "Card de sănătate (Tessera sanitaria)",
    },
    step5Title: "Ai familie în Italia?",
    hasFamily: "Am familie în Italia",
    dependents: "Membri de familie în întreținere (copii, soț/soție fără loc de muncă...)",
    nonDependents: "Membri de familie independenți (părinți, frați cu loc de muncă...)",
    back: "← Înapoi", next: "Înainte →", start: "Începe ✓",
    unknownNationality: "Naționalitate nerecunoscută — se va continua în engleză",
  },
  ru: {
    langName: "Русский",
    step2Title: "Почему вы в Италии?",
    reasons: { work: "Работа", study: "Учёба", family: "Воссоединение семьи", other: "Другое" },
    step3Title: "Как долго вы в Италии?",
    times: { just_arrived: "Только приехал/а", less_1_year: "Менее 1 года", more_1_year: "Более 1 года" },
    step4Title: "Есть ли у вас уже эти документы?",
    step4Subtitle: "Выберите все, которые у вас уже есть",
    docs: {
      codice_fiscale: "Налоговый код (Codice fiscale)",
      permesso_soggiorno: "Вид на жительство (Permesso di soggiorno)",
      residenza: "Регистрация по месту жительства (Residenza anagrafica)",
      spid: "Цифровая идентичность (SPID)",
      tessera_sanitaria: "Медицинская карточка (Tessera sanitaria)",
    },
    step5Title: "Есть ли у вас семья в Италии?",
    hasFamily: "У меня есть семья в Италии",
    dependents: "Зависимые члены семьи (дети, неработающий супруг/а...)",
    nonDependents: "Независимые члены семьи (родители, работающие братья/сёстры...)",
    back: "← Назад", next: "Далее →", start: "Начать ✓",
    unknownNationality: "Национальность не распознана — будет использован английский",
  },
  bn: {
    langName: "বাংলা",
    step2Title: "আপনি ইতালিতে কেন আছেন?",
    reasons: { work: "কাজ", study: "পড়াশোনা", family: "পারিবারিক পুনর্মিলন", other: "অন্যান্য" },
    step3Title: "আপনি কতদিন ধরে ইতালিতে আছেন?",
    times: { just_arrived: "এইমাত্র এসেছি", less_1_year: "১ বছরের কম", more_1_year: "১ বছরের বেশি" },
    step4Title: "আপনার কি ইতিমধ্যে এই নথিগুলি আছে?",
    step4Subtitle: "আপনার কাছে যা আছে সব নির্বাচন করুন",
    docs: {
      codice_fiscale: "কর কোড (Codice fiscale)",
      permesso_soggiorno: "বাসস্থান অনুমতি (Permesso di soggiorno)",
      residenza: "নিবন্ধিত বাসস্থান (Residenza anagrafica)",
      spid: "ডিজিটাল পরিচয় (SPID)",
      tessera_sanitaria: "স্বাস্থ্য কার্ড (Tessera sanitaria)",
    },
    step5Title: "আপনার কি ইতালিতে পরিবার আছে?",
    hasFamily: "আমার ইতালিতে পরিবার আছে",
    dependents: "নির্ভরশীল পরিবারের সদস্য (শিশু, কর্মহীন স্বামী/স্ত্রী...)",
    nonDependents: "স্বনির্ভর পরিবারের সদস্য (বাবা-মা, কর্মরত ভাই-বোন...)",
    back: "← পিছনে", next: "পরবর্তী →", start: "শুরু করুন ✓",
    unknownNationality: "জাতীয়তা চেনা যায়নি — ইংরেজিতে চলবে",
  },
  tl: {
    langName: "Filipino",
    step2Title: "Bakit ka nasa Italy?",
    reasons: { work: "Trabaho", study: "Pag-aaral", family: "Pagsasama ng pamilya", other: "Iba pa" },
    step3Title: "Gaano katagal ka na sa Italy?",
    times: { just_arrived: "Bagong dating", less_1_year: "Wala pang 1 taon", more_1_year: "Mahigit 1 taon" },
    step4Title: "Mayroon ka na bang mga dokumentong ito?",
    step4Subtitle: "Piliin lahat ng mayroon ka na",
    docs: {
      codice_fiscale: "Tax code (Codice fiscale)",
      permesso_soggiorno: "Permit sa paninirahan (Permesso di soggiorno)",
      residenza: "Rehistradong tirahan (Residenza anagrafica)",
      spid: "Digital identity (SPID)",
      tessera_sanitaria: "Health card (Tessera sanitaria)",
    },
    step5Title: "Mayroon ka bang pamilya sa Italy?",
    hasFamily: "Mayroon akong pamilya sa Italy",
    dependents: "Mga miyembro ng pamilyang umaasa (mga bata, asawang walang trabaho...)",
    nonDependents: "Mga miyembro ng pamilyang nagsasarili (mga magulang, nagtatrabahong kapatid...)",
    back: "← Bumalik", next: "Susunod →", start: "Magsimula ✓",
    unknownNationality: "Hindi nakilala ang nasyonalidad — magpapatuloy sa Ingles",
  },
  pl: {
    langName: "Polski",
    step2Title: "Dlaczego jesteś we Włoszech?",
    reasons: { work: "Praca", study: "Nauka", family: "Łączenie rodzin", other: "Inne" },
    step3Title: "Jak długo jesteś we Włoszech?",
    times: { just_arrived: "Właśnie przyjechałem/am", less_1_year: "Mniej niż 1 rok", more_1_year: "Ponad 1 rok" },
    step4Title: "Czy masz już te dokumenty?",
    step4Subtitle: "Zaznacz wszystkie, które już masz",
    docs: {
      codice_fiscale: "Numer podatkowy (Codice fiscale)",
      permesso_soggiorno: "Zezwolenie na pobyt (Permesso di soggiorno)",
      residenza: "Zameldowanie (Residenza anagrafica)",
      spid: "Tożsamość cyfrowa (SPID)",
      tessera_sanitaria: "Karta zdrowia (Tessera sanitaria)",
    },
    step5Title: "Czy masz rodzinę we Włoszech?",
    hasFamily: "Mam rodzinę we Włoszech",
    dependents: "Zależni członkowie rodziny (dzieci, niepracujący małżonek...)",
    nonDependents: "Niezależni członkowie rodziny (rodzice, pracujące rodzeństwo...)",
    back: "← Wstecz", next: "Dalej →", start: "Zacznij ✓",
    unknownNationality: "Narodowość nierozpoznana — zostanie użyty angielski",
  },
  fa: {
    langName: "فارسی",
    step2Title: "چرا در ایتالیا هستید؟",
    reasons: { work: "کار", study: "تحصیل", family: "اتحاد خانوادگی", other: "سایر" },
    step3Title: "چه مدت در ایتالیا هستید؟",
    times: { just_arrived: "تازه رسیده‌ام", less_1_year: "کمتر از ۱ سال", more_1_year: "بیشتر از ۱ سال" },
    step4Title: "آیا این مدارک را دارید؟",
    step4Subtitle: "همه مواردی که دارید را انتخاب کنید",
    docs: {
      codice_fiscale: "کد مالیاتی (Codice fiscale)",
      permesso_soggiorno: "اجازه اقامت (Permesso di soggiorno)",
      residenza: "ثبت آدرس (Residenza anagrafica)",
      spid: "هویت دیجیتال (SPID)",
      tessera_sanitaria: "کارت بهداشتی (Tessera sanitaria)",
    },
    step5Title: "آیا خانواده‌ای در ایتالیا دارید؟",
    hasFamily: "خانواده‌ای در ایتالیا دارم",
    dependents: "اعضای خانواده تحت تکفل (فرزندان، همسر بدون شغل...)",
    nonDependents: "اعضای خانواده مستقل (والدین، خواهر/برادر شاغل...)",
    back: "رجوع →", next: "← بعدی", start: "شروع ✓",
    unknownNationality: "ملیت شناخته نشد — به انگلیسی ادامه می‌یابد",
  },
  hi: {
    langName: "हिन्दी",
    step2Title: "आप इटली में क्यों हैं?",
    reasons: { work: "काम", study: "पढ़ाई", family: "पारिवारिक पुनर्मिलन", other: "अन्य" },
    step3Title: "आप इटली में कितने समय से हैं?",
    times: { just_arrived: "अभी पहुंचे हैं", less_1_year: "1 साल से कम", more_1_year: "1 साल से अधिक" },
    step4Title: "क्या आपके पास पहले से ये दस्तावेज़ हैं?",
    step4Subtitle: "वो सब चुनें जो आपके पास पहले से हैं",
    docs: {
      codice_fiscale: "टैक्स कोड (Codice fiscale)",
      permesso_soggiorno: "निवास परमिट (Permesso di soggiorno)",
      residenza: "पंजीकृत निवास (Residenza anagrafica)",
      spid: "डिजिटल पहचान (SPID)",
      tessera_sanitaria: "स्वास्थ्य कार्ड (Tessera sanitaria)",
    },
    step5Title: "क्या आपके इटली में परिवार है?",
    hasFamily: "मेरे इटली में परिवार है",
    dependents: "आश्रित परिवार के सदस्य (बच्चे, बेरोज़गार पति/पत्नी...)",
    nonDependents: "स्वतंत्र परिवार के सदस्य (माता-पिता, कार्यरत भाई-बहन...)",
    back: "← वापस", next: "आगे →", start: "शुरू करें ✓",
    unknownNationality: "राष्ट्रीयता पहचानी नहीं गई — अंग्रेजी में जारी रहेगा",
  },
  sq: {
    langName: "Shqip",
    step2Title: "Pse jeni në Itali?",
    reasons: { work: "Punë", study: "Studime", family: "Bashkim familjar", other: "Tjetër" },
    step3Title: "Sa kohë jeni në Itali?",
    times: { just_arrived: "Sapo mbërrita", less_1_year: "Më pak se 1 vit", more_1_year: "Më shumë se 1 vit" },
    step4Title: "I keni tashmë këto dokumente?",
    step4Subtitle: "Zgjidhni të gjitha ato që keni tashmë",
    docs: {
      codice_fiscale: "Kodi tatimor (Codice fiscale)",
      permesso_soggiorno: "Leja e qëndrimit (Permesso di soggiorno)",
      residenza: "Rezidenca e regjistruar (Residenza anagrafica)",
      spid: "Identiteti dixhital (SPID)",
      tessera_sanitaria: "Karta shëndetësore (Tessera sanitaria)",
    },
    step5Title: "Keni familje në Itali?",
    hasFamily: "Kam familje në Itali",
    dependents: "Anëtarë të familjes në ngarkim (fëmijë, bashkëshort/e pa punë...)",
    nonDependents: "Anëtarë të pavarur të familjes (prindër, vëllezër/motra me punë...)",
    back: "← Kthehu", next: "Vazhdo →", start: "Fillo ✓",
    unknownNationality: "Kombësia nuk u njoh — do të vazhdohet në anglisht",
  },
  de: {
    langName: "Deutsch",
    step2Title: "Warum sind Sie in Italien?",
    reasons: { work: "Arbeit", study: "Studium", family: "Familienzusammenführung", other: "Anderes" },
    step3Title: "Wie lange sind Sie schon in Italien?",
    times: { just_arrived: "Gerade angekommen", less_1_year: "Weniger als 1 Jahr", more_1_year: "Mehr als 1 Jahr" },
    step4Title: "Haben Sie diese Dokumente bereits?",
    step4Subtitle: "Wählen Sie alle aus, die Sie bereits haben",
    docs: {
      codice_fiscale: "Steuernummer (Codice fiscale)",
      permesso_soggiorno: "Aufenthaltserlaubnis (Permesso di soggiorno)",
      residenza: "Gemeldeter Wohnsitz (Residenza anagrafica)",
      spid: "Digitale Identität (SPID)",
      tessera_sanitaria: "Gesundheitskarte (Tessera sanitaria)",
    },
    step5Title: "Haben Sie Familie in Italien?",
    hasFamily: "Ich habe Familie in Italien",
    dependents: "Abhängige Familienmitglieder (Kinder, nicht arbeitender Ehepartner...)",
    nonDependents: "Unabhängige Familienmitglieder (Eltern, arbeitende Geschwister...)",
    back: "← Zurück", next: "Weiter →", start: "Starten ✓",
    unknownNationality: "Nationalität nicht erkannt — es wird Englisch verwendet",
  },
  pt: {
    langName: "Português",
    step2Title: "Por que você está na Itália?",
    reasons: { work: "Trabalho", study: "Estudos", family: "Reunificação familiar", other: "Outro" },
    step3Title: "Há quanto tempo você está na Itália?",
    times: { just_arrived: "Recém chegado/a", less_1_year: "Menos de 1 ano", more_1_year: "Mais de 1 ano" },
    step4Title: "Você já tem esses documentos?",
    step4Subtitle: "Selecione todos os que você já tem",
    docs: {
      codice_fiscale: "Código fiscal (Codice fiscale)",
      permesso_soggiorno: "Visto de residência (Permesso di soggiorno)",
      residenza: "Residência registrada (Residenza anagrafica)",
      spid: "Identidade digital (SPID)",
      tessera_sanitaria: "Cartão de saúde (Tessera sanitaria)",
    },
    step5Title: "Você tem família na Itália?",
    hasFamily: "Tenho família na Itália",
    dependents: "Membros da família dependentes (filhos, cônjuge sem trabalho...)",
    nonDependents: "Membros da família independentes (pais, irmãos trabalhadores...)",
    back: "← Voltar", next: "Próximo →", start: "Começar ✓",
    unknownNationality: "Nacionalidade não reconhecida — continuará em inglês",
  },
  tr: {
    langName: "Türkçe",
    step2Title: "İtalya'da neden bulunuyorsunuz?",
    reasons: { work: "İş", study: "Eğitim", family: "Aile birleşimi", other: "Diğer" },
    step3Title: "İtalya'da ne kadar süredir bulunuyorsunuz?",
    times: { just_arrived: "Yeni geldim", less_1_year: "1 yıldan az", more_1_year: "1 yıldan fazla" },
    step4Title: "Bu belgelere zaten sahip misiniz?",
    step4Subtitle: "Sahip olduklarınızın tümünü seçin",
    docs: {
      codice_fiscale: "Vergi kodu (Codice fiscale)",
      permesso_soggiorno: "İkamet izni (Permesso di soggiorno)",
      residenza: "Kayıtlı ikamet (Residenza anagrafica)",
      spid: "Dijital kimlik (SPID)",
      tessera_sanitaria: "Sağlık kartı (Tessera sanitaria)",
    },
    step5Title: "İtalya'da aileniz var mı?",
    hasFamily: "İtalya'da ailem var",
    dependents: "Bağımlı aile üyeleri (çocuklar, çalışmayan eş...)",
    nonDependents: "Bağımsız aile üyeleri (ebeveynler, çalışan kardeşler...)",
    back: "← Geri", next: "İleri →", start: "Başla ✓",
    unknownNationality: "Uyruk tanınmadı — İngilizce ile devam edilecek",
  },
};

// ── Nationality → language mapping ───────────────────────────────────────────
// Keys are lowercase; covers Italian names, English names, and common native names.
const NATIONALITY_TO_LANG: Record<string, LangCode> = {
  // Italian
  "italiano": "it", "italiana": "it", "italian": "it",

  // English-speaking countries
  "americano": "en", "americano/a": "en",
  "inglese": "en", "britannico": "en", "britannica": "en", "british": "en",
  "australiano": "en", "australiana": "en", "australian": "en",
  "canadese": "en", "canadian": "en",
  "neozelandese": "en", "new zealander": "en",
  "irlandese": "en", "irish": "en",
  "sudafricano": "en", "sudafricana": "en", "south african": "en",
  "nigeriano": "en", "nigeriana": "en", "nigerian": "en",
  "ghanese": "en", "ghanaian": "en",
  "kenyano": "en", "kenyano/a": "en", "kenyan": "en",
  "ugandese": "en", "ugandan": "en",
  "zimbabwese": "en", "zimbabwean": "en",
  "zambiese": "en", "zambian": "en",
  "giamaicano": "en", "jamaican": "en",

  // Arabic-speaking countries
  "marocchino": "ar", "marocchina": "ar", "moroccan": "ar", "مغربي": "ar",
  "egiziano": "ar", "egiziana": "ar", "egyptian": "ar", "مصري": "ar",
  "tunisino": "ar", "tunisina": "ar", "tunisian": "ar", "تونسي": "ar",
  "algerino": "ar", "algerina": "ar", "algerian": "ar", "جزائري": "ar",
  "libico": "ar", "libica": "ar", "libyan": "ar", "ليبي": "ar",
  "siriano": "ar", "siriana": "ar", "syrian": "ar", "سوري": "ar",
  "iracheno": "ar", "irachena": "ar", "iraqi": "ar", "عراقي": "ar",
  "yemenita": "ar", "yemeni": "ar", "يمني": "ar",
  "giordano": "ar", "giordana": "ar", "jordanian": "ar", "أردني": "ar",
  "sudanese": "ar", "سوداني": "ar",
  "libanese": "ar", "lebanese": "ar", "لبناني": "ar",
  "palestinese": "ar", "palestinian": "ar", "فلسطيني": "ar",
  "saudita": "ar", "saudi": "ar", "سعودي": "ar",
  "emiratino": "ar", "emirati": "ar", "إماراتي": "ar",
  "kuwaitiano": "ar", "kuwaiti": "ar", "كويتي": "ar",
  "mauritano": "ar", "mauritana": "ar", "mauritanian": "ar", "موريتاني": "ar",
  "qatariota": "ar", "qatari": "ar", "قطري": "ar",

  // Chinese
  "cinese": "zh", "chinese": "zh", "中国人": "zh",
  "taiwanese": "zh", "台湾人": "zh",

  // French-speaking countries (Africa mainly)
  "francese": "fr", "french": "fr",
  "senegalese": "fr", "sénégalais": "fr", "senegalais": "fr",
  "ivoriano": "fr", "ivoriana": "fr", "ivorian": "fr",
  "camerunense": "fr", "cameroonian": "fr",
  "congolese": "fr", "congolais": "fr",
  "malgascio": "fr", "malgascia": "fr", "malagasy": "fr",
  "maliano": "fr", "maliana": "fr", "malian": "fr",
  "guineano": "fr", "guineana": "fr", "guinean": "fr",
  "togolese": "fr", "togolais": "fr",
  "beninese": "fr", "béninois": "fr",
  "ruandese": "fr", "rwandan": "fr",
  "burundese": "fr", "burundian": "fr",
  "comoriano": "fr", "comoran": "fr",
  "ciadiano": "fr", "chadian": "fr",
  "centrafricano": "fr", "central african": "fr",
  "gabonese": "fr", "gabonais": "fr",
  "congolese (brazzaville)": "fr",
  "burkinabè": "fr", "burkinabe": "fr",
  "nigerino": "fr", "nigerien": "fr",
  "belga": "fr",

  // Spanish-speaking countries
  "spagnolo": "es", "spagnola": "es", "spanish": "es",
  "colombiano": "es", "colombiana": "es", "colombian": "es",
  "argentino": "es", "argentina": "es", "argentinian": "es", "argentino/a": "es",
  "messicano": "es", "messicana": "es", "mexican": "es",
  "peruviano": "es", "peruviana": "es", "peruvian": "es",
  "ecuadoriano": "es", "ecuadoriana": "es", "ecuadorian": "es",
  "boliviano": "es", "boliviana": "es", "bolivian": "es",
  "venezuelano": "es", "venezuelana": "es", "venezuelan": "es",
  "cubano": "es", "cubana": "es", "cuban": "es",
  "dominicano": "es", "dominicana": "es", "dominican": "es",
  "guatemalteco": "es", "guatemalteca": "es", "guatemalan": "es",
  "honduregno": "es", "honduregna": "es", "honduran": "es",
  "salvadoregno": "es", "salvadoregna": "es", "salvadoran": "es",
  "paraguaiano": "es", "paraguaiana": "es", "paraguayan": "es",
  "uruguaiano": "es", "uruguaiana": "es", "uruguayan": "es",
  "cileno": "es", "cilena": "es", "chilean": "es",
  "nicaraguense": "es", "nicaraguan": "es",
  "costaricano": "es", "costa rican": "es",
  "panamense": "es", "panamanian": "es",

  // Ukrainian
  "ucraino": "uk", "ucraina": "uk", "ukrainian": "uk",
  "українець": "uk", "українка": "uk",

  // Romanian / Moldovan
  "rumeno": "ro", "rumena": "ro", "romanian": "ro", "român": "ro",
  "moldavo": "ro", "moldava": "ro", "moldovan": "ro",

  // Russian-speaking (former USSR, approximation)
  "russo": "ru", "russa": "ru", "russian": "ru",
  "bielorusso": "ru", "bielorussa": "ru", "belarusian": "ru",
  "kazako": "ru", "kazaka": "ru", "kazakh": "ru",
  "uzbeko": "ru", "uzbeka": "ru", "uzbek": "ru",
  "kirghizo": "ru", "kyrgyz": "ru",
  "tagico": "ru", "tajik": "ru",
  "turkmeno": "ru", "turkmen": "ru",
  "armeno": "ru", "armena": "ru", "armenian": "ru",
  "georgiano": "ru", "georgiana": "ru", "georgian": "ru",
  "azero": "ru", "azera": "ru", "azerbaijani": "ru",

  // Bengali
  "bengalese": "bn", "bangladeshiano": "bn", "bangladeshiana": "bn", "bangladeshi": "bn",
  "বাংলাদেশি": "bn",

  // Filipino
  "filippino": "tl", "filippina": "tl", "filipino": "tl", "pilipino": "tl", "filipina": "tl",

  // Polish
  "polacco": "pl", "polacca": "pl", "polish": "pl", "polak": "pl",

  // Persian / Farsi
  "iraniano": "fa", "iraniana": "fa", "iranian": "fa", "ایرانی": "fa",
  "afghano": "fa", "afghana": "fa", "afghan": "fa", "افغان": "fa",

  // Hindi / South Asian
  "indiano": "hi", "indiana": "hi", "indian": "hi",
  "nepalese": "hi", "nepali": "hi",
  "pakistano": "hi", "pakistana": "hi", "pakistani": "hi",
  "srilankese": "hi", "sri lankan": "hi",

  // Albanian
  "albanese": "sq", "albanian": "sq", "shqiptar": "sq", "shqiptare": "sq",

  // German-speaking
  "tedesco": "de", "tedesca": "de", "german": "de",
  "austriaco": "de", "austriaca": "de", "austrian": "de",
  "svizzero": "de", "svizzera": "de", "swiss": "de",

  // Portuguese-speaking
  "brasiliano": "pt", "brasiliana": "pt", "brazilian": "pt",
  "portoghese": "pt", "portuguese": "pt",
  "angolano": "pt", "angolana": "pt", "angolan": "pt",
  "mozambicano": "pt", "mozambican": "pt",
  "capoverdiano": "pt", "cape verdean": "pt",

  // Turkish
  "turco": "tr", "turca": "tr", "turkish": "tr",
};

export function detectLang(nationality: string): LangCode {
  const key = nationality.toLowerCase().trim();
  return NATIONALITY_TO_LANG[key] ?? "en";
}

export function isKnownNationality(nationality: string): boolean {
  return nationality.toLowerCase().trim() in NATIONALITY_TO_LANG;
}

export function isValidInput(nationality: string): boolean {
  const s = nationality.trim();
  return s.length >= 3 && /[a-zA-ZÀ-ÿА-яЁёء-يا-ی؀-ۿЀ-ӿ一-鿿ঀ-৿]/.test(s);
}
