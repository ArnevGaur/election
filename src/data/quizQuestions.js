// Quiz questions bank for standalone quiz page
export const quizQuestions = [
  {
    id: 1, category: "registration",
    question: { en: "What is the minimum voting age in India?", hi: "भारत में न्यूनतम मतदान आयु क्या है?" },
    options: [{ en: "16", hi: "16" }, { en: "18", hi: "18" }, { en: "21", hi: "21" }, { en: "25", hi: "25" }],
    correct: 1,
    explanation: { en: "The Constitution of India grants voting rights to all citizens aged 18 and above through the 61st Amendment Act, 1988.", hi: "भारत के संविधान ने 61वें संशोधन अधिनियम, 1988 के माध्यम से 18 वर्ष और उससे अधिक आयु के सभी नागरिकों को मतदान का अधिकार दिया।" }
  },
  {
    id: 2, category: "registration",
    question: { en: "Which portal is used for online voter registration?", hi: "ऑनलाइन मतदाता पंजीकरण के लिए कौन सा पोर्टल उपयोग किया जाता है?" },
    options: [{ en: "DigiLocker", hi: "डिजीलॉकर" }, { en: "NVSP", hi: "NVSP" }, { en: "UMANG", hi: "उमंग" }, { en: "mParivahan", hi: "mParivahan" }],
    correct: 1,
    explanation: { en: "The National Voters' Service Portal (NVSP) at nvsp.in is the official portal for voter registration.", hi: "राष्ट्रीय मतदाता सेवा पोर्टल (NVSP) nvsp.in पर मतदाता पंजीकरण के लिए आधिकारिक पोर्टल है।" }
  },
  {
    id: 3, category: "voter-id",
    question: { en: "Who issues the Voter ID card in India?", hi: "भारत में वोटर आईडी कार्ड कौन जारी करता है?" },
    options: [{ en: "State Government", hi: "राज्य सरकार" }, { en: "Election Commission", hi: "चुनाव आयोग" }, { en: "District Collector", hi: "जिला कलेक्टर" }, { en: "Parliament", hi: "संसद" }],
    correct: 1,
    explanation: { en: "The Election Commission of India (ECI) is responsible for issuing EPIC (Voter ID) cards.", hi: "भारत का चुनाव आयोग (ECI) EPIC (वोटर आईडी) कार्ड जारी करने के लिए जिम्मेदार है।" }
  },
  {
    id: 4, category: "candidates",
    question: { en: "What is a party manifesto?", hi: "पार्टी घोषणापत्र क्या है?" },
    options: [
      { en: "List of party members", hi: "पार्टी सदस्यों की सूची" },
      { en: "Document of promises and plans", hi: "वादों और योजनाओं का दस्तावेज" },
      { en: "Party's financial report", hi: "पार्टी की वित्तीय रिपोर्ट" },
      { en: "Election results summary", hi: "चुनाव परिणाम सारांश" }
    ],
    correct: 1,
    explanation: { en: "A manifesto outlines a party's vision, promises, and action plan if elected to power.", hi: "एक घोषणापत्र सत्ता में चुने जाने पर पार्टी की दृष्टि, वादे और कार्य योजना की रूपरेखा बताता है।" }
  },
  {
    id: 5, category: "voting-day",
    question: { en: "What is the 'NOTA' option on EVMs?", hi: "EVM पर 'NOTA' विकल्प क्या है?" },
    options: [
      { en: "No Opinion To Announce", hi: "नो ओपिनियन टू अनाउंस" },
      { en: "None Of The Above", hi: "इनमें से कोई नहीं" },
      { en: "Not On Time Arrival", hi: "नॉट ऑन टाइम अराइवल" },
      { en: "National Option To Abstain", hi: "नेशनल ऑप्शन टू एब्सटेन" }
    ],
    correct: 1,
    explanation: { en: "NOTA (None Of The Above) allows voters to reject all candidates. It was introduced by the Supreme Court in 2013.", hi: "NOTA (इनमें से कोई नहीं) मतदाताओं को सभी उम्मीदवारों को अस्वीकार करने की अनुमति देता है।" }
  },
  {
    id: 6, category: "voting-day",
    question: { en: "How long is the 'silence period' before voting?", hi: "मतदान से पहले 'मौन अवधि' कितनी होती है?" },
    options: [{ en: "12 hours", hi: "12 घंटे" }, { en: "24 hours", hi: "24 घंटे" }, { en: "48 hours", hi: "48 घंटे" }, { en: "72 hours", hi: "72 घंटे" }],
    correct: 2,
    explanation: { en: "Campaigning must stop 48 hours before polling begins. This 'cooling off' period lets voters decide without pressure.", hi: "मतदान शुरू होने से 48 घंटे पहले प्रचार बंद होना चाहिए।" }
  },
  {
    id: 7, category: "counting",
    question: { en: "Which votes are counted first?", hi: "पहले किन वोटों की गणना होती है?" },
    options: [
      { en: "EVM votes", hi: "EVM वोट" },
      { en: "Postal ballots", hi: "डाक मतपत्र" },
      { en: "NOTA votes", hi: "NOTA वोट" },
      { en: "All at once", hi: "सभी एक साथ" }
    ],
    correct: 1,
    explanation: { en: "Postal ballots from service voters, senior citizens, and others are counted before EVM votes.", hi: "सेवा मतदाताओं, वरिष्ठ नागरिकों के डाक मतपत्रों की गणना EVM वोटों से पहले होती है।" }
  },
  {
    id: 8, category: "results",
    question: { en: "What electoral system does India use for Lok Sabha?", hi: "भारत लोक सभा के लिए कौन सी चुनावी प्रणाली उपयोग करता है?" },
    options: [
      { en: "Proportional Representation", hi: "आनुपातिक प्रतिनिधित्व" },
      { en: "First Past The Post", hi: "फर्स्ट पास्ट द पोस्ट" },
      { en: "Ranked Choice", hi: "रैंक्ड चॉइस" },
      { en: "Mixed System", hi: "मिश्रित प्रणाली" }
    ],
    correct: 1,
    explanation: { en: "India uses FPTP (First Past The Post) — the candidate with the most votes in a constituency wins, even without a majority.", hi: "भारत FPTP (फर्स्ट पास्ट द पोस्ट) का उपयोग करता है।" }
  },
  {
    id: 9, category: "results",
    question: { en: "How many seats are in the Lok Sabha?", hi: "लोक सभा में कितनी सीटें हैं?" },
    options: [{ en: "245", hi: "245" }, { en: "543", hi: "543" }, { en: "552", hi: "552" }, { en: "600", hi: "600" }],
    correct: 1,
    explanation: { en: "The Lok Sabha has 543 elected seats. A party needs 272 seats for a simple majority.", hi: "लोक सभा में 543 निर्वाचित सीटें हैं। साधारण बहुमत के लिए पार्टी को 272 सीटों की जरूरत है।" }
  },
  {
    id: 10, category: "general",
    question: { en: "Who is the head of the Election Commission?", hi: "चुनाव आयोग का प्रमुख कौन होता है?" },
    options: [
      { en: "Prime Minister", hi: "प्रधान मंत्री" },
      { en: "President", hi: "राष्ट्रपति" },
      { en: "Chief Election Commissioner", hi: "मुख्य चुनाव आयुक्त" },
      { en: "Chief Justice", hi: "मुख्य न्यायाधीश" }
    ],
    correct: 2,
    explanation: { en: "The Chief Election Commissioner (CEC) heads the Election Commission. The CEC is appointed by the President.", hi: "मुख्य चुनाव आयुक्त (CEC) चुनाव आयोग का नेतृत्व करता है।" }
  }
];
