// Timeline events data for the election process visualization
export const timelineEvents = [
  {
    id: 1,
    title: { en: "Election Announcement", hi: "चुनाव की घोषणा" },
    date: { en: "Day 0", hi: "दिन 0" },
    icon: "Megaphone",
    color: "#6366f1",
    description: {
      en: "The Election Commission announces the schedule, including nomination dates, polling date, and counting date. The Model Code of Conduct comes into effect immediately, restricting government from making policy decisions that could influence voters.",
      hi: "चुनाव आयोग कार्यक्रम की घोषणा करता है। आदर्श आचार संहिता तुरंत लागू हो जाती है।"
    },
    simple: {
      en: "The election team says 'Elections are coming!' and sets the dates. From this point, leaders must follow strict rules.",
      hi: "चुनाव टीम कहती है 'चुनाव आ रहे हैं!' और तारीखें तय करती है।"
    },
    details: [
      { en: "Model Code of Conduct activated", hi: "आदर्श आचार संहिता सक्रिय" },
      { en: "No new government schemes allowed", hi: "कोई नई सरकारी योजना की अनुमति नहीं" },
      { en: "Election observers deployed", hi: "चुनाव पर्यवेक्षक तैनात" }
    ]
  },
  {
    id: 2,
    title: { en: "Nomination Period", hi: "नामांकन अवधि" },
    date: { en: "Day 1-14", hi: "दिन 1-14" },
    icon: "FileText",
    color: "#8b5cf6",
    description: {
      en: "Candidates file their nomination papers with the Returning Officer. They must submit details about their criminal record, assets, and educational qualifications. Nominations are scrutinized and invalid ones are rejected.",
      hi: "उम्मीदवार रिटर्निंग ऑफिसर के पास अपना नामांकन पत्र दाखिल करते हैं।"
    },
    simple: {
      en: "People who want to become leaders sign up officially. They share info about themselves so voters can learn about them.",
      hi: "जो लोग नेता बनना चाहते हैं वे आधिकारिक तौर पर साइन अप करते हैं।"
    },
    details: [
      { en: "Candidates file Form 26", hi: "उम्मीदवार फॉर्म 26 दाखिल करते हैं" },
      { en: "Scrutiny of nominations", hi: "नामांकन की जांच" },
      { en: "Withdrawal deadline", hi: "वापसी की अंतिम तिथि" }
    ]
  },
  {
    id: 3,
    title: { en: "Campaign Period", hi: "प्रचार अवधि" },
    date: { en: "Day 14-30", hi: "दिन 14-30" },
    icon: "Radio",
    color: "#a78bfa",
    description: {
      en: "Candidates campaign to win votes through rallies, advertisements, door-to-door visits, and social media. There are strict spending limits. Campaigning must stop 48 hours before polling to allow voters a 'cooling off' period.",
      hi: "उम्मीदवार रैलियों, विज्ञापनों और सोशल मीडिया के माध्यम से वोट जीतने के लिए प्रचार करते हैं।"
    },
    simple: {
      en: "Candidates try to convince you to vote for them. They hold meetings, put up posters, and talk on TV. They must stop 2 days before voting day.",
      hi: "उम्मीदवार आपको उनके लिए वोट देने के लिए मनाने की कोशिश करते हैं।"
    },
    details: [
      { en: "Spending limits enforced", hi: "खर्च सीमा लागू" },
      { en: "Media monitoring", hi: "मीडिया निगरानी" },
      { en: "Campaign silence 48h before poll", hi: "मतदान से 48 घंटे पहले प्रचार बंद" }
    ]
  },
  {
    id: 4,
    title: { en: "Voting Day", hi: "मतदान दिवस" },
    date: { en: "Day 30", hi: "दिन 30" },
    icon: "Vote",
    color: "#6366f1",
    description: {
      en: "Citizens cast their votes at designated polling booths using EVMs. Polling typically happens from 7 AM to 6 PM. Security forces ensure peaceful voting. VVPAT machines provide paper verification of each vote cast.",
      hi: "नागरिक EVM का उपयोग करके निर्धारित मतदान केंद्रों पर अपना वोट डालते हैं।"
    },
    simple: {
      en: "Today's the big day! Go to your polling booth, show your ID, press a button to vote, and get your finger inked. It's quick and easy!",
      hi: "आज बड़ा दिन है! अपने मतदान केंद्र पर जाएं और वोट करें।"
    },
    details: [
      { en: "Polling: 7 AM – 6 PM typically", hi: "मतदान: आमतौर पर सुबह 7 बजे - शाम 6 बजे" },
      { en: "EVM + VVPAT verification", hi: "EVM + VVPAT सत्यापन" },
      { en: "Indelible ink marking", hi: "अमिट स्याही का निशान" }
    ]
  },
  {
    id: 5,
    title: { en: "Counting Day", hi: "मतगणना दिवस" },
    date: { en: "Day 33+", hi: "दिन 33+" },
    icon: "BarChart3",
    color: "#8b5cf6",
    description: {
      en: "EVMs are opened in counting centers under strict security. Votes are counted round by round in the presence of candidates' agents. Postal ballots are counted first. Results are updated in real-time on the Election Commission portal.",
      hi: "सख्त सुरक्षा के तहत गणना केंद्रों में EVM खोले जाते हैं।"
    },
    simple: {
      en: "Officials open the voting machines and count all the votes carefully. Everyone watches to make sure it's fair.",
      hi: "अधिकारी वोटिंग मशीनें खोलते हैं और सभी वोटों की सावधानीपूर्वक गणना करते हैं।"
    },
    details: [
      { en: "Postal ballots counted first", hi: "पहले डाक मतपत्रों की गणना" },
      { en: "Round-by-round counting", hi: "राउंड दर राउंड गणना" },
      { en: "VVPAT cross-verification", hi: "VVPAT क्रॉस-सत्यापन" }
    ]
  },
  {
    id: 6,
    title: { en: "Results Declaration", hi: "परिणाम घोषणा" },
    date: { en: "Day 33-34", hi: "दिन 33-34" },
    icon: "Trophy",
    color: "#a78bfa",
    description: {
      en: "The Returning Officer declares the winner for each constituency. The party or coalition with the most seats is invited to form the government. The entire process is supervised by the Election Commission to ensure fairness.",
      hi: "रिटर्निंग ऑफिसर प्रत्येक निर्वाचन क्षेत्र के विजेता की घोषणा करता है।"
    },
    simple: {
      en: "The winners are announced! The team with the most winners forms the new government.",
      hi: "विजेताओं की घोषणा की जाती है! सबसे ज्यादा विजेताओं वाली टीम नई सरकार बनाती है।"
    },
    details: [
      { en: "Winner declared per constituency", hi: "प्रत्येक निर्वाचन क्षेत्र में विजेता घोषित" },
      { en: "Government formation begins", hi: "सरकार गठन शुरू" },
      { en: "Results available on ECI website", hi: "परिणाम ECI वेबसाइट पर उपलब्ध" }
    ]
  }
];

// "What happens if..." scenarios
export const whatIfScenarios = [
  {
    id: 1,
    question: { en: "What if a candidate withdraws?", hi: "अगर कोई उम्मीदवार हट जाए?" },
    answer: {
      en: "If a candidate withdraws before the withdrawal deadline, their name is removed from the ballot. If they withdraw after, their name stays on the EVM but votes cast for them are wasted. If the winning candidate dies before results, a fresh election is held.",
      hi: "अगर कोई उम्मीदवार वापसी की अंतिम तिथि से पहले हट जाता है, तो उनका नाम मतपत्र से हटा दिया जाता है।"
    }
  },
  {
    id: 2,
    question: { en: "What if there's a tie?", hi: "अगर बराबरी हो जाए?" },
    answer: {
      en: "In the rare case of an exact tie, the Returning Officer draws lots to decide the winner. This is specified under the Representation of the People Act. It has happened a few times in Indian elections.",
      hi: "बराबरी की दुर्लभ स्थिति में, रिटर्निंग ऑफिसर विजेता तय करने के लिए लॉट निकालता है।"
    }
  },
  {
    id: 3,
    question: { en: "What if EVMs malfunction?", hi: "अगर EVM खराब हो जाए?" },
    answer: {
      en: "If an EVM malfunctions, polling is paused at that booth. A replacement EVM is brought in and polling resumes. If the malfunction affects a significant number of votes, the Election Commission may order re-polling at that booth.",
      hi: "अगर EVM खराब होती है, तो उस बूथ पर मतदान रोक दिया जाता है।"
    }
  },
  {
    id: 4,
    question: { en: "What if I miss voting day?", hi: "अगर मैं मतदान दिवस चूक जाऊं?" },
    answer: {
      en: "Unfortunately, there's no second chance — you cannot vote after polling closes. This is why it's important to plan ahead. However, some categories of voters (service voters, postal ballot holders) have alternative voting arrangements.",
      hi: "दुर्भाग्य से, कोई दूसरा मौका नहीं है — मतदान बंद होने के बाद आप वोट नहीं दे सकते।"
    }
  }
];
