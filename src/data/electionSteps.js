// Election journey steps data — bilingual (EN/HI) with simple mode variants
export const electionSteps = [
  {
    id: 1,
    slug: "registration",
    icon: "ClipboardCheck",
    title: { en: "Voter Registration", hi: "मतदाता पंजीकरण" },
    subtitle: { en: "Your first step to democracy", hi: "लोकतंत्र की ओर पहला कदम" },
    description: {
      en: "Voter registration is the process of enrolling yourself in the electoral roll. In India, any citizen aged 18 or above can register. You can register online through the National Voters' Service Portal (NVSP) or by submitting Form 6 at your local Electoral Registration Officer's office.",
      hi: "मतदाता पंजीकरण मतदाता सूची में अपना नाम दर्ज कराने की प्रक्रिया है। भारत में, 18 वर्ष या उससे अधिक आयु का कोई भी नागरिक पंजीकरण करा सकता है।"
    },
    simple: {
      en: "Sign up so you can vote! If you're 18 or older, fill out a form online or at a local office. It's free and easy.",
      hi: "वोट देने के लिए साइन अप करें! अगर आप 18 साल या उससे बड़े हैं, तो ऑनलाइन या स्थानीय कार्यालय में फॉर्म भरें।"
    },
    whyItMatters: {
      en: "Without registration, you cannot vote. Your vote is your voice — it decides who represents you and makes laws for your community.",
      hi: "बिना पंजीकरण के आप वोट नहीं दे सकते। आपका वोट आपकी आवाज है।"
    },
    documents: {
      en: ["Aadhaar Card", "Passport-size photo", "Proof of address", "Age proof (for first-time voters)"],
      hi: ["आधार कार्ड", "पासपोर्ट साइज फोटो", "पते का प्रमाण", "आयु प्रमाण"]
    },
    quiz: [
      {
        question: { en: "What is the minimum age to register as a voter in India?", hi: "भारत में मतदाता के रूप में पंजीकरण के लिए न्यूनतम आयु क्या है?" },
        options: [{ en: "16", hi: "16" }, { en: "18", hi: "18" }, { en: "21", hi: "21" }, { en: "25", hi: "25" }],
        correct: 1
      },
      {
        question: { en: "Which form is used for new voter registration?", hi: "नए मतदाता पंजीकरण के लिए कौन सा फॉर्म उपयोग किया जाता है?" },
        options: [{ en: "Form 2", hi: "फॉर्म 2" }, { en: "Form 6", hi: "फॉर्म 6" }, { en: "Form 8", hi: "फॉर्म 8" }, { en: "Form 10", hi: "फॉर्म 10" }],
        correct: 1
      }
    ]
  },
  {
    id: 2,
    slug: "voter-id",
    icon: "IdCard",
    title: { en: "Voter ID (EPIC)", hi: "मतदाता पहचान पत्र (EPIC)" },
    subtitle: { en: "Your identity as a voter", hi: "मतदाता के रूप में आपकी पहचान" },
    description: {
      en: "The Electors Photo Identity Card (EPIC), commonly known as Voter ID, is an identity document issued by the Election Commission of India. It serves as proof of identity at polling stations and contains your photo, name, and constituency details.",
      hi: "EPIC, जिसे आमतौर पर वोटर आईडी के रूप में जाना जाता है, भारत के चुनाव आयोग द्वारा जारी एक पहचान दस्तावेज है।"
    },
    simple: {
      en: "After registering, you get a special card with your photo. Show this card when you go to vote. It proves who you are.",
      hi: "पंजीकरण के बाद, आपको अपनी फोटो वाला एक विशेष कार्ड मिलता है। वोट देने जाते समय यह कार्ड दिखाएं।"
    },
    whyItMatters: {
      en: "Your Voter ID is your passport to participate in democracy. It prevents fraud and ensures only eligible voters cast ballots.",
      hi: "आपका वोटर आईडी लोकतंत्र में भाग लेने का आपका पासपोर्ट है।"
    },
    documents: {
      en: ["Registration acknowledgment", "Address proof", "Photo ID"],
      hi: ["पंजीकरण की पावती", "पते का प्रमाण", "फोटो पहचान पत्र"]
    },
    quiz: [
      {
        question: { en: "What does EPIC stand for?", hi: "EPIC का क्या मतलब है?" },
        options: [
          { en: "Electors Photo Identity Card", hi: "इलेक्टर्स फोटो आइडेंटिटी कार्ड" },
          { en: "Election Process ID Card", hi: "इलेक्शन प्रोसेस आईडी कार्ड" },
          { en: "Electoral Public Info Card", hi: "इलेक्टोरल पब्लिक इन्फो कार्ड" },
          { en: "Electronic Polling ID Card", hi: "इलेक्ट्रॉनिक पोलिंग आईडी कार्ड" }
        ],
        correct: 0
      }
    ]
  },
  {
    id: 3,
    slug: "candidates",
    icon: "Users",
    title: { en: "Know Your Candidates", hi: "अपने उम्मीदवारों को जानें" },
    subtitle: { en: "Make an informed choice", hi: "एक सूचित विकल्प बनाएं" },
    description: {
      en: "Before voting, research candidates in your constituency. Check their background, party manifesto, past performance, and promises. The Election Commission publishes affidavits with criminal records, assets, and educational qualifications of all candidates.",
      hi: "वोट देने से पहले अपने निर्वाचन क्षेत्र के उम्मीदवारों के बारे में जानकारी लें।"
    },
    simple: {
      en: "Learn about the people who want to lead your area. Read about what they promise to do. Compare them and pick the best one for you.",
      hi: "जानें कि कौन लोग आपके क्षेत्र का नेतृत्व करना चाहते हैं।"
    },
    whyItMatters: {
      en: "An informed voter is a powerful voter. Understanding candidates helps you choose representatives who truly align with your values and needs.",
      hi: "एक जागरूक मतदाता एक शक्तिशाली मतदाता होता है।"
    },
    documents: { en: [], hi: [] },
    quiz: [
      {
        question: { en: "Where can you find criminal records of candidates?", hi: "उम्मीदवारों का आपराधिक रिकॉर्ड कहां मिल सकता है?" },
        options: [
          { en: "Social media", hi: "सोशल मीडिया" },
          { en: "Election Commission affidavits", hi: "चुनाव आयोग के शपथ पत्र" },
          { en: "Newspapers only", hi: "केवल समाचार पत्र" },
          { en: "Party websites", hi: "पार्टी वेबसाइट" }
        ],
        correct: 1
      }
    ]
  },
  {
    id: 4,
    slug: "voting-day",
    icon: "Vote",
    title: { en: "Voting Day", hi: "मतदान दिवस" },
    subtitle: { en: "Cast your vote!", hi: "अपना वोट डालें!" },
    description: {
      en: "On voting day, visit your assigned polling booth. Carry your Voter ID or any approved photo ID. After verification, you'll use an Electronic Voting Machine (EVM) to cast your vote. The process is secret — no one can see who you voted for. After voting, your finger is marked with indelible ink.",
      hi: "मतदान के दिन अपने निर्धारित मतदान केंद्र पर जाएं। अपना वोटर आईडी या कोई स्वीकृत फोटो आईडी साथ ले जाएं।"
    },
    simple: {
      en: "Go to your voting place with your ID card. Press a button on a machine to choose your candidate. Nobody can see your choice. You get ink on your finger to show you voted!",
      hi: "अपने आईडी कार्ड के साथ अपने मतदान स्थल पर जाएं।"
    },
    whyItMatters: {
      en: "Voting day is when your voice matters most. Every single vote counts and can change the outcome of an election.",
      hi: "मतदान दिवस वह दिन है जब आपकी आवाज सबसे ज्यादा मायने रखती है।"
    },
    documents: {
      en: ["Voter ID (EPIC)", "Or any approved photo ID: Aadhaar, Passport, Driving License, PAN Card"],
      hi: ["वोटर आईडी (EPIC)", "या कोई स्वीकृत फोटो आईडी"]
    },
    quiz: [
      {
        question: { en: "What machine is used for voting in India?", hi: "भारत में मतदान के लिए किस मशीन का उपयोग किया जाता है?" },
        options: [
          { en: "Ballot Box", hi: "बैलट बॉक्स" },
          { en: "Electronic Voting Machine (EVM)", hi: "इलेक्ट्रॉनिक वोटिंग मशीन (EVM)" },
          { en: "Computer", hi: "कंप्यूटर" },
          { en: "Mobile App", hi: "मोबाइल ऐप" }
        ],
        correct: 1
      },
      {
        question: { en: "Why is indelible ink applied after voting?", hi: "मतदान के बाद अमिट स्याही क्यों लगाई जाती है?" },
        options: [
          { en: "For decoration", hi: "सजावट के लिए" },
          { en: "To prevent double voting", hi: "दोबारा मतदान रोकने के लिए" },
          { en: "For counting", hi: "गिनती के लिए" },
          { en: "No reason", hi: "कोई कारण नहीं" }
        ],
        correct: 1
      }
    ]
  },
  {
    id: 5,
    slug: "counting",
    icon: "Calculator",
    title: { en: "Vote Counting", hi: "मतगणना" },
    subtitle: { en: "Every vote is carefully counted", hi: "हर वोट की सावधानीपूर्वक गिनती होती है" },
    description: {
      en: "After voting ends, EVMs are sealed and stored securely. On counting day, EVMs are opened in the presence of candidates' agents and Election Commission officials. Votes are tallied round by round. VVPAT slips may be cross-verified for accuracy. Results are announced constituency by constituency.",
      hi: "मतदान समाप्त होने के बाद, EVM को सील कर सुरक्षित रूप से रखा जाता है।"
    },
    simple: {
      en: "After everyone votes, the machines are opened and votes are counted one by one. People watch to make sure it's fair. Then we know who won!",
      hi: "सबके वोट देने के बाद, मशीनें खोली जाती हैं और वोट एक-एक करके गिने जाते हैं।"
    },
    whyItMatters: {
      en: "Transparent counting ensures the election is fair. Multiple layers of verification protect the integrity of your vote.",
      hi: "पारदर्शी गणना सुनिश्चित करती है कि चुनाव निष्पक्ष हो।"
    },
    documents: { en: [], hi: [] },
    quiz: [
      {
        question: { en: "What is VVPAT?", hi: "VVPAT क्या है?" },
        options: [
          { en: "Voter Verified Paper Audit Trail", hi: "वोटर वेरिफाइड पेपर ऑडिट ट्रेल" },
          { en: "Virtual Voting Paper Trail", hi: "वर्चुअल वोटिंग पेपर ट्रेल" },
          { en: "Vote Validation Process", hi: "वोट वैलिडेशन प्रोसेस" },
          { en: "Verified Voting App Technology", hi: "वेरिफाइड वोटिंग ऐप टेक्नोलॉजी" }
        ],
        correct: 0
      }
    ]
  },
  {
    id: 6,
    slug: "results",
    icon: "Trophy",
    title: { en: "Election Results", hi: "चुनाव परिणाम" },
    subtitle: { en: "Democracy delivers its verdict", hi: "लोकतंत्र अपना फैसला सुनाता है" },
    description: {
      en: "Results are declared by the Returning Officer of each constituency. The candidate with the most votes wins (First Past The Post system). In a general election, the party or coalition with majority seats (272+ out of 543 in Lok Sabha) forms the government. Results are available in real-time on the Election Commission website.",
      hi: "प्रत्येक निर्वाचन क्षेत्र के रिटर्निंग ऑफिसर द्वारा परिणाम घोषित किए जाते हैं।"
    },
    simple: {
      en: "The person with the most votes wins! If one team wins the most seats across the country, they form the government. You can watch results live on TV or online.",
      hi: "सबसे ज्यादा वोट पाने वाला व्यक्ति जीतता है!"
    },
    whyItMatters: {
      en: "Results reflect the people's will. Understanding how results work helps you appreciate how democracy translates individual votes into governance.",
      hi: "परिणाम जनता की इच्छा को दर्शाते हैं।"
    },
    documents: { en: [], hi: [] },
    quiz: [
      {
        question: { en: "How many seats are needed for a majority in Lok Sabha?", hi: "लोक सभा में बहुमत के लिए कितनी सीटें चाहिए?" },
        options: [{ en: "200", hi: "200" }, { en: "272", hi: "272" }, { en: "300", hi: "300" }, { en: "543", hi: "543" }],
        correct: 1
      }
    ]
  }
];
