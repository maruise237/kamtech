export type SEOPageData = {
  slug: string;
  title: string;
  titleEn?: string;
  description: string;
  descriptionEn?: string;
  h1: string;
  h1En?: string;
  problem: {
    title: string;
    titleEn?: string;
    description: string;
    descriptionEn?: string;
    metric: string;
    metricEn?: string;
  }[];
  solution: {
    title: string;
    titleEn?: string;
    description: string;
    descriptionEn?: string;
  };
  benefits: {
    title: string;
    titleEn?: string;
    description: string;
    descriptionEn?: string;
  }[];
};

export const seoPagesData: SEOPageData[] = [
  {
    slug: "restaurants",
    title: "Chatbot WhatsApp pour Restaurants | KAMTECH",
    titleEn: "WhatsApp Chatbot for Restaurants | KAMTECH",
    description: "Automatisez vos réservations et commandes avec un chatbot WhatsApp pour votre restaurant. Gagnez du temps et augmentez votre chiffre d'affaires.",
    descriptionEn: "Automate your reservations and orders with a WhatsApp chatbot for your restaurant. Save time and increase your revenue.",
    h1: "Le Chatbot WhatsApp Parfait pour les Restaurants",
    h1En: "The Perfect WhatsApp Chatbot for Restaurants",
    problem: [
      {
        title: "Appels manqués en plein service",
        titleEn: "Missed calls during service",
        description: "Vous êtes débordé pendant le service et vous manquez des appels pour des réservations ou des commandes à emporter.",
        descriptionEn: "You are overwhelmed during service and miss calls for reservations or takeaway orders.",
        metric: "Réservations perdues",
        metricEn: "Lost reservations",
      },
      {
        title: "Gestion manuelle des commandes",
        titleEn: "Manual order management",
        description: "Prendre les commandes par téléphone prend du temps et augmente le risque d'erreurs de saisie.",
        descriptionEn: "Taking orders by phone takes time and increases the risk of input errors.",
        metric: "Temps gaspillé",
        metricEn: "Wasted time",
      }
    ],
    solution: {
      title: "Un Assistant Virtuel 24/7 pour votre Restaurant",
      titleEn: "A 24/7 Virtual Assistant for your Restaurant",
      description: "Notre chatbot WhatsApp prend vos réservations, répond aux questions sur le menu et gère les commandes automatiquement, directement depuis WhatsApp.",
      descriptionEn: "Our WhatsApp chatbot takes your reservations, answers menu questions, and handles orders automatically, directly from WhatsApp.",
    },
    benefits: [
      {
        title: "Plus de réservations",
        titleEn: "More reservations",
        description: "Ne manquez plus aucun client, même en plein coup de feu.",
        descriptionEn: "Never miss a customer again, even during peak hours.",
      },
      {
        title: "Réduction des erreurs",
        titleEn: "Reduced errors",
        description: "Les commandes sont écrites par le client, finies les erreurs de compréhension au téléphone.",
        descriptionEn: "Orders are written by the customer, no more phone misunderstandings.",
      },
      {
        title: "Fidélisation",
        titleEn: "Loyalty",
        description: "Envoyez des offres personnalisées à vos clients via WhatsApp.",
        descriptionEn: "Send personalized offers to your customers via WhatsApp.",
      }
    ]
  },
  {
    slug: "e-commerce",
    title: "Chatbot WhatsApp pour E-commerce | KAMTECH",
    titleEn: "WhatsApp Chatbot for E-commerce | KAMTECH",
    description: "Améliorez le support client et boostez vos ventes e-commerce avec notre chatbot WhatsApp intelligent.",
    descriptionEn: "Improve customer support and boost your e-commerce sales with our intelligent WhatsApp chatbot.",
    h1: "Boostez vos Ventes E-commerce avec un Chatbot WhatsApp",
    h1En: "Boost your E-commerce Sales with a WhatsApp Chatbot",
    problem: [
      {
        title: "Support client surchargé",
        titleEn: "Overloaded customer support",
        description: "Votre équipe passe ses journées à répondre à 'Où est ma commande ?' ou 'Quels sont les délais de livraison ?'.",
        descriptionEn: "Your team spends its days answering 'Where is my order?' or 'What are the delivery times?'.",
        metric: "Heures perdues",
        metricEn: "Lost hours",
      },
      {
        title: "Abandon de panier élevé",
        titleEn: "High cart abandonment",
        description: "Vos clients ont des doutes au moment de payer et quittent le site sans finaliser leur achat.",
        descriptionEn: "Your customers have doubts at the time of payment and leave the site without finalizing their purchase.",
        metric: "Ventes perdues",
        metricEn: "Lost sales",
      }
    ],
    solution: {
      title: "Automatisation du Support et Relances Panier",
      titleEn: "Support Automation and Cart Recovery",
      description: "Le chatbot répond instantanément aux questions fréquentes, suit les colis et relance les paniers abandonnés directement sur WhatsApp avec un taux d'ouverture de 98%.",
      descriptionEn: "The chatbot answers FAQs instantly, tracks packages, and recovers abandoned carts directly on WhatsApp with a 98% open rate.",
    },
    benefits: [
      {
        title: "Support 24/7",
        titleEn: "24/7 Support",
        description: "Des réponses immédiates, même la nuit et les week-ends.",
        descriptionEn: "Immediate responses, even at night and on weekends.",
      },
      {
        title: "Augmentation des conversions",
        titleEn: "Increased conversions",
        description: "Rattrapez jusqu'à 20% de vos paniers abandonnés grâce à des relances personnalisées.",
        descriptionEn: "Catch up to 20% of your abandoned carts thanks to personalized follow-ups.",
      },
      {
        title: "Clientèle rassurée",
        titleEn: "Reassured customers",
        description: "Un canal direct et intime qui augmente la confiance en votre marque.",
        descriptionEn: "A direct and intimate channel that increases trust in your brand.",
      }
    ]
  },
  {
    slug: "sante",
    title: "Chatbot WhatsApp pour la Santé et les Cliniques | KAMTECH",
    titleEn: "WhatsApp Chatbot for Health and Clinics | KAMTECH",
    description: "Simplifiez la prise de rendez-vous médicaux et rassurez vos patients avec un chatbot WhatsApp dédié aux professionnels de santé.",
    descriptionEn: "Simplify medical appointment booking and reassure your patients with a dedicated WhatsApp chatbot for health professionals.",
    h1: "Le Chatbot WhatsApp pour les Professionnels de Santé",
    h1En: "The WhatsApp Chatbot for Health Professionals",
    problem: [
      {
        title: "Secrétariat débordé",
        titleEn: "Overwhelmed secretariat",
        description: "Le standard téléphonique est saturé d'appels pour des prises de rendez-vous ou des questions simple.",
        descriptionEn: "The switchboard is saturated with calls for appointments or simple questions.",
        metric: "Saturation téléphonique",
        metricEn: "Phone saturation",
      },
      {
        title: "Rendez-vous oubliés",
        titleEn: "Forgotten appointments",
        description: "Les patients oublient leurs rendez-vous, ce qui crée des trous dans votre planning.",
        descriptionEn: "Patients forget their appointments, creating gaps in your schedule.",
        metric: "Perte de revenus",
        metricEn: "Lost revenue",
      }
    ],
    solution: {
      title: "Prise de RDV et Rappels Automatiques",
      titleEn: "Appointment Booking and Automatic Reminders",
      description: "Un assistant qui gère l'agenda, prend les rendez-vous, répond aux questions courantes et envoie des rappels automatiques via WhatsApp.",
      descriptionEn: "An assistant that manages the schedule, takes appointments, answers common questions, and sends automatic reminders via WhatsApp.",
    },
    benefits: [
      {
        title: "Agenda optimisé",
        titleEn: "Optimized schedule",
        description: "Réduisez drastiquement les rendez-vous non honorés (no-shows).",
        descriptionEn: "Drastically reduce non-honored appointments (no-shows).",
      },
      {
        title: "Gain de temps",
        titleEn: "Time saved",
        description: "Libérez votre secrétariat des tâches répétitives pour des missions à plus forte valeur ajoutée.",
        descriptionEn: "Free your secretariat from repetitive tasks for higher value missions.",
      },
      {
        title: "Accessibilité",
        titleEn: "Accessibility",
        description: "Les patients peuvent prendre rendez-vous facilement 24h/24.",
        descriptionEn: "Patients can book appointments easily 24/7.",
      }
    ]
  },
  {
    slug: "paris",
    title: "Agence Chatbot WhatsApp à Paris | KAMTECH",
    titleEn: "WhatsApp Chatbot Agency in Paris | KAMTECH",
    description: "Déployez un chatbot WhatsApp sur mesure pour votre entreprise à Paris. Expertise locale et accompagnement personnalisé.",
    descriptionEn: "Deploy a custom WhatsApp chatbot for your business in Paris. Local expertise and personalized accompaniment.",
    h1: "Votre Agence Experte en Chatbot WhatsApp à Paris",
    h1En: "Your Expert WhatsApp Chatbot Agency in Paris",
    problem: [
      {
        title: "Concurrence féroce",
        titleEn: "Fierce competition",
        description: "À Paris, les clients sont exigeants et impatients. Si vous ne répondez pas vite, ils vont chez le concurrent.",
        descriptionEn: "In Paris, customers are demanding and impatient. If you don't answer quickly, they go to the competitor.",
        metric: "Opportunités perdues",
        metricEn: "Lost opportunities",
      },
      {
        title: "Coûts de personnel élevés",
        titleEn: "High personnel costs",
        description: "Recruter une équipe de support disponible en permanence coûte extrêmement cher dans la capitale.",
        descriptionEn: "Hiring a support team available permanently costs extremely much in the capital.",
        metric: "Dépenses excessives",
        metricEn: "Excessive spending",
      }
    ],
    solution: {
      title: "Un Assistant Virtuel Parisien 24/7",
      titleEn: "A 24/7 Parisian Virtual Assistant",
      description: "Démarquez-vous avec un service client ultra-réactif et moderne. Notre équipe vous accompagne à Paris pour créer le chatbot idéal.",
      descriptionEn: "Stand out with an ultra-responsive and modern customer service. Our team accompanies you in Paris to create the ideal chatbot.",
    },
    benefits: [
      {
        title: "Service Premium",
        titleEn: "Premium Service",
        description: "Offrez à vos clients parisiens une expérience immédiate et sans friction.",
        descriptionEn: "Offer your Parisian customers an immediate and friction-free experience.",
      },
      {
        title: "Économies",
        titleEn: "Savings",
        description: "Un coût de revient bien inférieur à celui d'un employé dédié au support.",
        descriptionEn: "A cost much lower than that of a dedicated support employee.",
      },
      {
        title: "Accompagnement Local",
        titleEn: "Local Accompaniment",
        description: "Une équipe d'experts basée en France pour vous guider pas à pas.",
        descriptionEn: "An expert team based in France to guide you step by step.",
      }
    ]
  },
  {
    slug: "rdv",
    title: "Chatbot WhatsApp pour Prise de Rendez-vous | KAMTECH",
    titleEn: "WhatsApp Chatbot for Appointment Booking | KAMTECH",
    description: "Automatisez votre prise de rendez-vous grâce à l'IA sur WhatsApp. Synchronisé avec votre agenda.",
    descriptionEn: "Automate your appointment booking thanks to AI on WhatsApp. Synchronized with your schedule.",
    h1: "Automatisez votre Prise de Rendez-vous via WhatsApp",
    h1En: "Automate your Appointment Booking via WhatsApp",
    problem: [
      {
        title: "Friction pour le client",
        titleEn: "Client friction",
        description: "Les formulaires complexes ou les appels téléphoniques dissuadent les clients de prendre rendez-vous.",
        descriptionEn: "Complex forms or phone calls dissuade clients from booking appointments.",
        metric: "Taux de conversion faible",
        metricEn: "Low conversion rate",
      },
      {
        title: "Gestion manuelle de l'agenda",
        titleEn: "Manual schedule management",
        description: "Vous passez trop de temps à proposer des créneaux, modifier ou annuler des rendez-vous.",
        descriptionEn: "You spend too much time proposing slots, modifying or canceling appointments.",
        metric: "Perte de temps",
        metricEn: "Time loss",
      }
    ],
    solution: {
      title: "Prise de RDV Conversationnelle et Intelligente",
      titleEn: "Conversational and Intelligent Appointment Booking",
      description: "Le chatbot propose vos disponibilités, prend le rendez-vous et le synchronise avec votre calendrier, tout cela en discutant naturellement sur WhatsApp.",
      descriptionEn: "The chatbot proposes your availability, takes the appointment and synchronizes it with your calendar, all while chatting naturally on WhatsApp.",
    },
    benefits: [
      {
        title: "Plus de rendez-vous",
        titleEn: "More appointments",
        description: "Une méthode fluide et rapide qui encourage la prise de rendez-vous.",
        descriptionEn: "A fluid and fast method that encourages appointment booking.",
      },
      {
        title: "Synchronisation parfaite",
        titleEn: "Perfect synchronization",
        description: "Connecté à vos outils (Google Calendar, Calendly, etc.) pour éviter les doubles réservations.",
        descriptionEn: "Connected to your tools (Google Calendar, Calendly, etc.) to avoid double bookings.",
      },
      {
        title: "Rappels automatiques",
        titleEn: "Automatic reminders",
        description: "Diminuez les absences en rappelant le rendez-vous directement sur l'application la plus consultée.",
        descriptionEn: "Decrease absences by reminding the appointment directly on the most consulted application.",
      }
    ]
  }
];
