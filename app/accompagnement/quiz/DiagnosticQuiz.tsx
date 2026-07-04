"use client"

import { useState, useEffect, useRef, useCallback } from "react"

const WHATSAPP_NUMBER = "237658992588"
const FORMSPREE_ENDPOINT = "https://formspree.io/f/xkopjrbj"

/* =========================================================
   DATA
========================================================= */
const SEGMENT_Q = {
  options: [
    { label: "J'ai une activité qui tourne déjà — je veux l'IA pour la faire grandir", branch: "B" },
    { label: "J'ai une idée, mais rien de lancé", branch: "A" },
    { label: "Je pars de zéro, je veux juste comprendre l'IA", branch: "A" },
  ],
}

const INSIGHTS: Record<string, { eyebrow: string; title: string; sub: string }> = {
  A: {
    eyebrow: "Bien noté",
    title: "OK. Tu n'as pas besoin d'une carte de plus.",
    sub: "T'as déjà vu 10 tutos différents — ça, c'est la carte. Ce qui te manque, c'est un GPS : quelqu'un qui regarde où t'en es et te dit où tourner, maintenant. C'est le Syndrome du Tuto Infini — trop de contenu, zéro feedback réel sur ton cas. On va casser ça.",
  },
  B: {
    eyebrow: "Bien noté",
    title: "Une activité qui stagne, c'est rarement un problème de produit.",
    sub: "C'est presque toujours un problème de système : pas de process clair, trop de tâches manuelles, ou une visibilité mal exploitée. On regarde ça de près.",
  },
}

interface BranchQ {
  key: string
  title: string
  sub: string
  options?: string[]
  isTierChoice?: boolean
  tiers?: {
    id: string
    name: string
    price: string
    tag: string | null
    bullets: string[]
    result: string
  }[]
}

const BRANCH_QUESTIONS: Record<string, BranchQ[]> = {
  A: [
    {
      key: "ai_usage",
      title: "T'as déjà utilisé un outil IA (ChatGPT, Claude, Canva IA…) ?",
      sub: "",
      options: ["Jamais, ça me fait un peu peur", "J'ai testé une ou deux fois, sans méthode", "Je m'en sers de temps en temps, mais mal"],
    },
    {
      key: "blocker",
      title: "C'est quoi ton plus gros blocage avec l'IA aujourd'hui ?",
      sub: "",
      options: [
        "Je sais pas quel outil choisir",
        "Je sais pas quoi lui demander (les prompts)",
        "J'ai peur que ce soit trop technique pour moi",
        "J'ai pas de méthode, je bricole",
      ],
    },
    {
      key: "time",
      title: "Combien de temps tu peux vraiment y consacrer par semaine ?",
      sub: "Sois honnête, ça détermine le rythme qu'on te propose.",
      options: ["Moins de 2h", "Entre 2h et 5h", "Plus de 5h"],
    },
    {
      key: "tier",
      title: "Tu veux aller jusqu'où ?",
      sub: "Mêmes lives en groupe pour les deux formats. La différence : le niveau de suivi et ce que tu repars avec.",
      isTierChoice: true,
      tiers: [
        {
          id: "25",
          name: "IA Starter",
          price: "25 000 FCFA",
          tag: null,
          bullets: [
            "4 lives en groupe, 1 par semaine",
            "Exercices guidés chaque semaine",
            "Bibliothèque de prompts prêts à copier-coller",
            "Groupe WhatsApp de la cohorte",
          ],
          result: "Repars avec 1 mois de contenu produit toi-même avec l'IA",
        },
        {
          id: "45",
          name: "IA Business Complet",
          price: "45 000 FCFA",
          tag: "Le plus complet",
          bullets: [
            "Tout Starter, en plus complet",
            "Diagnostic individuel 15 min en semaine 1",
            "Modules automatisation + vidéo IA en plus",
            "1 session bonus 1-to-1 (30 min) en fin de programme",
            "Pack de prompts avancés",
          ],
          result: "Repars avec un vrai système IA opérationnel pour ton activité",
        },
      ],
    },
  ],
  B: [
    {
      key: "activity",
      title: "C'est quoi ton activité aujourd'hui ?",
      sub: "",
      options: ["Produits physiques (boutique, e-commerce…)", "Services (conseil, prestations, artisanat…)", "Digital / formation / contenu", "Autre"],
    },
    {
      key: "frein",
      title: "Ton plus gros frein pour grandir en ce moment ?",
      sub: "",
      options: [
        "Manque de visibilité en ligne",
        "Trop de tâches manuelles / pas de temps",
        "Pas de système clair pour vendre",
        "Je sais pas exactement — tout est un peu flou",
      ],
    },
    {
      key: "objectif",
      title: "Tu veux qu'on t'aide en priorité à…",
      sub: "",
      options: ["Vendre plus", "Automatiser des tâches répétitives", "Structurer mon offre et mes process", "Un peu de tout ça à la fois"],
    },
  ],
}

const FAQS: Record<string, [string, string][]> = {
  A: [
    [
      "C'est trop cher pour moi en ce moment",
      "C'est justement pour ça qu'il y a deux formats. Starter (25 000 FCFA) est pensé pour tester sans se ruiner. Compare ça au temps déjà perdu sur des tutos gratuits jamais terminés.",
    ],
    [
      "Je vais pas avoir le temps de suivre",
      "Les exercices se font à ton rythme, hors live. Le seul rendez-vous fixe, c'est 1h par semaine. On a d'ailleurs ajusté le programme selon le temps que tu as indiqué.",
    ],
    [
      "Ça va être trop technique pour moi",
      "Zéro code, zéro jargon. Si tu sais utiliser WhatsApp, tu peux suivre. Le format live existe justement pour débloquer ce qui coince, en direct.",
    ],
    [
      "Pourquoi payer alors qu'il y a des tutos gratuits sur YouTube ?",
      "Les tutos gratuits t'expliquent un outil. Ici, quelqu'un regarde CE QUE TU PRODUIS et corrige en direct. C'est la différence entre lire une carte et avoir un GPS.",
    ],
  ],
  B: [
    [
      "C'est un budget conséquent, pourquoi ce prix ?",
      "C'est un accompagnement 1-to-1 sur 6 semaines, pas un cours. Le prix reflète le temps dédié uniquement à ton activité, pas un programme partagé entre 15 personnes.",
    ],
    [
      "Comment je sais que ça va marcher pour MON activité précise ?",
      "Le diagnostic de la semaine 1 sert exactement à ça : on identifie le frein réel avant de commencer à construire quoi que ce soit.",
    ],
    [
      "Et si mon besoin change en cours de route ?",
      "C'est fréquent — le programme s'ajuste semaine après semaine parce que c'est du 1-to-1, pas un plan figé à l'avance.",
    ],
  ],
}

const RESULTS = {
  A: {
    "25": {
      badge: "Ton profil — IA Starter",
      title: (name: string) => `${name}, voici ton plan : IA Starter`,
      sub: "La méthode Diagnostic → Application → Correction en Live : chaque semaine tu appliques un exercice concret, puis un humain corrige en direct sur TON cas — pas un cours pré-enregistré générique. 4 semaines, zéro tuto de plus.",
      price: "25 000 FCFA",
      priceSub: "cohorte limitée à 15 personnes",
      plan: [
        ["S1", "Prise en main de ChatGPT/Claude + Canva IA, appliqué à TA situation"],
        ["S2", "Créer une semaine de contenu (textes + visuels) avec l'IA"],
        ["S3", "Mise en application + retours en live sur ce que t'as produit"],
        ["S4", "Ton système de prompts personnel + plan pour continuer seul"],
      ],
      note: "Inclus : bibliothèque de prompts + groupe WhatsApp de la cohorte.",
    },
    "45": {
      badge: "Ton profil — IA Business Complet",
      title: (name: string) => `${name}, voici ton plan : IA Business Complet`,
      sub: "Le même GPS que Starter, avec un point de plus : un diagnostic individuel dès la semaine 1, l'automatisation et la vidéo IA en plus, et une session bonus 1-to-1 pour finaliser TON système avec toi.",
      price: "45 000 FCFA",
      priceSub: "cohorte limitée à 15 personnes",
      plan: [
        ["S1", "Diagnostic individuel (15 min) + prise en main ChatGPT/Claude + Canva IA"],
        ["S2", "Contenu avec l'IA + intro automatisation simple (WhatsApp Business, vidéo IA)"],
        ["S3", "Mise en application + retours en live"],
        ["S4", "Système IA complet + session bonus 1-to-1 (30 min) pour finaliser avec toi"],
      ],
      note: "Inclus : diagnostic individuel, session bonus 1-to-1, pack de prompts avancés.",
    },
  },
  B: {
    badge: "Ton profil — Activité à structurer",
    title: (name: string) => `${name}, voici ton plan : Accompagnement Business IA`,
    sub: "Un accompagnement 1-to-1 sur 6 semaines. On part de ton activité réelle, on identifie ce qui bloque, et on structure + implémente ensemble en live. Si le besoin s'y prête, on peut aller jusqu'à mettre en place un outil concret (chatbot, automatisation) avec toi.",
    price: "200 000 — 300 000 FCFA",
    priceSub: "package complet 6 semaines",
    plan: [
      ["S1", "Diagnostic complet de ton activité + priorisation du frein réel à traiter"],
      ["S2-3", "Structuration : process, offre, ou système de vente selon ton besoin"],
      ["S4-5", "Implémentation concrète en live avec toi"],
      ["S6", "Finalisation + plan de suite (et automatisation si pertinent)"],
    ],
    note: "1-to-1 exclusivement — nombre de places très limité par mois pour garder la qualité du suivi.",
  },
}

/* =========================================================
   TYPES
========================================================= */
type Screen = "intro" | "q_segment" | "insight" | "q_branch" | "q_name" | "loading" | "result"
type Branch = "A" | "B"

/* =========================================================
   COMPONENT
========================================================= */
export default function DiagnosticQuiz() {
  const [screen, setScreen] = useState<Screen>("intro")
  const [branch, setBranch] = useState<Branch | null>(null)
  const [branchIndex, setBranchIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [name, setName] = useState("")
  const [nameInput, setNameInput] = useState("")
  const [stepCount, setStepCount] = useState(0)
  const [totalSteps, setTotalSteps] = useState(6)
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null)
  const [isSending, setIsSending] = useState(false)
  const [sendError, setSendError] = useState<string | null>(null)
  const nameRef = useRef<HTMLInputElement>(null)

  const progressPct = Math.min(100, Math.round((stepCount / totalSteps) * 100))
  const showProgress = screen !== "intro" && screen !== "result" && screen !== "loading"

  const goTo = useCallback((s: Screen) => {
    setScreen(s)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [])

  const selectSegment = useCallback(
    (b: Branch) => {
      setBranch(b)
      const steps = 2 + BRANCH_QUESTIONS[b].length + 1
      setTotalSteps(steps)
      setStepCount(1)
      goTo("insight")
    },
    [goTo]
  )

  const nextBranchQuestion = useCallback(() => {
    setStepCount(2)
    setBranchIndex(0)
    goTo("q_branch")
  }, [goTo])

  const goBack = useCallback(() => {
    if (screen === "q_segment") {
      goTo("intro")
    } else if (screen === "insight") {
      goTo("q_segment")
    } else if (screen === "q_branch") {
      if (branchIndex === 0) {
        goTo("insight")
      } else {
        setBranchIndex((prev) => prev - 1)
        setStepCount((prev) => prev - 1)
      }
    } else if (screen === "q_name") {
      const lastIdx = branch ? BRANCH_QUESTIONS[branch].length - 1 : 0
      setBranchIndex(lastIdx)
      setStepCount(2 + lastIdx)
      goTo("q_branch")
    }
  }, [screen, branchIndex, branch, goTo])

  const answerBranch = useCallback(
    (key: string, value: string, tierId?: string) => {
      setAnswers((prev) => {
        const next = { ...prev, [key]: value }
        if (tierId) next.tier = tierId
        return next
      })
      const nextIdx = branchIndex + 1
      if (branch && nextIdx < BRANCH_QUESTIONS[branch].length) {
        setBranchIndex(nextIdx)
        setStepCount(2 + nextIdx)
      } else {
        setStepCount(totalSteps - 1)
        goTo("q_name")
      }
    },
    [branch, branchIndex, totalSteps, goTo]
  )

  const submitName = useCallback(async () => {
    const val = nameInput.trim()
    const userName = val || "Toi"
    setName(userName)
    setIsSending(true)
    setSendError(null)

    // Send quiz data to Formspree before anything else
    try {
      const offerLabel =
        branch === "A"
          ? answers.tier === "45"
            ? "IA Business Complet (45 000 FCFA)"
            : "IA Starter (25 000 FCFA)"
          : "Accompagnement Business IA"

      const answersLines = Object.entries(answers)
        .filter(([k]) => k !== "tier")
        .map(([k, v]) => `- ${k}: ${v}`)
        .join("\n")

      await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          _subject: `Nouveau diagnostic IA - ${userName}`,
          name: userName,
          profile: branch === "A" ? "Apprendre l'IA" : "Activité à structurer",
          offre: offerLabel,
          reponses: answersLines,
          timestamp: new Date().toISOString(),
          source: "quiz-diagnostic-kamtech",
        }),
      })
    } catch (err) {
      console.error("Erreur envoi diagnostic:", err)
      // On continue même si l'envoi échoue — le WhatsApp reste disponible
    }

    setIsSending(false)
    setStepCount(totalSteps)
    goTo("loading")
    setTimeout(() => {
      goTo("result")
    }, 2400)
  }, [nameInput, branch, answers, totalSteps, goTo])

  useEffect(() => {
    if (screen === "q_name" && nameRef.current) {
      setTimeout(() => nameRef.current?.focus(), 400)
    }
  }, [screen])

  useEffect(() => {
    if (screen === "result") {
      setOpenFaqIndex(null)
    }
  }, [screen])

  /* =========================================================
     RENDER HELPERS
  ========================================================= */
  const currentQ = branch ? BRANCH_QUESTIONS[branch][branchIndex] : null

  const resultData = (() => {
    if (!branch) return null
    if (branch === "A") {
      const tier = answers.tier || "25"
      return RESULTS.A[tier as "25" | "45"]
    }
    return RESULTS.B
  })()

  const whatsappUrl = (() => {
    if (!branch || !resultData) return "#"
    const offerLabel =
      branch === "A"
        ? answers.tier === "45"
          ? "IA Business Complet (45 000 FCFA)"
          : "IA Starter (25 000 FCFA)"
        : "Accompagnement Business IA"
    const answersLines = Object.entries(answers)
      .filter(([k]) => k !== "tier")
      .map(([, v]) => `- ${v}`)
      .join("\n")
    const msg = `Bonjour KAMTECH IA 👋\nJe m'appelle ${name}, je viens de faire le diagnostic.\n\nProfil : ${branch === "A" ? "Apprendre l'IA" : "Activité à structurer"}\nRéponses clés :\n${answersLines}\n\nJe veux réserver ma place sur l'offre "${offerLabel}".`
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`
  })()

  const faqList = branch ? FAQS[branch] || [] : []

  /* =========================================================
     STYLES
  ========================================================= */
  const s = {
    void: "#0a0a0a",
    surface: "#111111",
    surface2: "#1a1a1a",
    line: "rgba(255,255,255,0.08)",
    accent: "#3b82f6",
    accentSoft: "rgba(59,130,246,0.14)",
    ink: "#F6F2E9",
    inkMuted: "#9BA1B5",
    green: "#3FA796",
    radius: "18px",
  }

  return (
    <div className="min-h-screen bg-black text-[#F6F2E9] font-sans overflow-x-hidden relative flex flex-col items-center">
      {/* ambient glow */}
      <div
        className="fixed left-1/2 bottom-0 w-[140vw] h-[70vh] pointer-events-none -z-10"
        style={{
          background:
            "radial-gradient(closest-side, rgba(59,130,246,0.12), rgba(59,130,246,0.04) 45%, transparent 70%)",
          transform: "translateX(-50%)",
        }}
      />

      <div className="w-full max-w-[560px] min-h-screen flex flex-col px-[22px] py-6 pb-10 relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-7">
          <div className="flex items-center gap-3">
            {screen !== "intro" && screen !== "result" && screen !== "loading" && (
              <button
                onClick={goBack}
                className="flex items-center justify-center w-8 h-8 rounded-full bg-[#111111] border border-[rgba(255,255,255,0.08)] text-[#9BA1B5] cursor-pointer transition-all duration-200 hover:text-white hover:border-white/20 hover:bg-[#1a1a1a]"
                aria-label="Retour"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>
            )}
            <div className="font-bold text-sm tracking-widest text-[#9BA1B5] uppercase">
              KAMTECH <span className="text-blue-500">IA</span>
            </div>
          </div>
          {showProgress && (
            <div className="font-bold text-sm tracking-widest text-[#9BA1B5] uppercase">
              {stepCount}/{totalSteps}
            </div>
          )}
        </div>

        {/* Progress bar */}
        {showProgress && (
          <div className="mb-7" style={{ display: showProgress ? "block" : "none" }}>
            <div className="relative h-[2px] bg-[rgba(255,255,255,0.08)] rounded mb-2.5">
              <div
                className="absolute left-0 top-0 h-full bg-gradient-to-r from-[#3FA796] to-blue-500 rounded transition-all duration-500 ease-out"
                style={{ width: `${progressPct}%` }}
              />
              <div
                className="absolute top-1/2 w-2.5 h-2.5 bg-blue-500 rounded-full shadow-[0_0_0_4px_rgba(59,130,246,0.14)] transition-all duration-500 ease-out"
                style={{ left: `${progressPct}%`, transform: "translate(-50%, -50%)" }}
              />
            </div>
          </div>
        )}

        {/* ========== SCREENS ========== */}
        <div className="flex-1 flex flex-col justify-center">
          {/* INTRO */}
          {screen === "intro" && (
            <div style={{ animation: "enter 0.5s ease-out" }}>
              <p className="font-bold text-xs tracking-[0.1em] uppercase text-[#3FA796] mb-3.5">
                Diagnostic gratuit — 2 minutes
              </p>
              <h1 className="font-display font-bold text-[clamp(26px,6vw,34px)] leading-tight tracking-tight mb-3.5">
                Arrête de <span className="text-blue-500">collectionner</span> les tutos IA.{" "}
                <br />
                Commence à produire.
              </h1>
              <p className="text-base leading-relaxed text-[#9BA1B5] mb-7 max-w-[48ch]">
                Le problème, c&apos;est jamais le manque de contenu — internet en est saturé. Le
                problème, c&apos;est que personne ne corrige ce que TU fais, sur TA situation
                précise. C&apos;est exactement ce qu&apos;on va changer, en 2 minutes.
              </p>
              <button
                onClick={() => goTo("q_segment")}
                className="w-full inline-flex items-center justify-center gap-2.5 bg-blue-600 text-white border-none rounded-[18px] px-6 py-4 font-bold text-base cursor-pointer transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(59,130,246,0.35)] active:translate-y-0"
              >
                Commencer le diagnostic →
              </button>
            </div>
          )}

          {/* Q_SEGMENT */}
          {screen === "q_segment" && (
            <div style={{ animation: "enter 0.5s ease-out" }}>
              <p className="font-bold text-xs tracking-[0.1em] uppercase text-[#3FA796] mb-3.5">
                Question 1
              </p>
              <h1 className="font-display font-bold text-[clamp(26px,6vw,34px)] leading-tight tracking-tight mb-3.5">
                Où t&apos;en es aujourd&apos;hui ?
              </h1>
              <p className="text-base leading-relaxed text-[#9BA1B5] mb-7 max-w-[48ch]">
                Réponds pour ta situation réelle, pas celle que t&apos;aimerais avoir.
              </p>
              <div className="flex flex-col gap-2.5 mb-6">
                {SEGMENT_Q.options.map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => selectSegment(opt.branch as Branch)}
                    className="group text-left bg-[#111111] border border-[rgba(255,255,255,0.08)] text-[#F6F2E9] rounded-[18px] px-4 py-4 font-medium text-base leading-relaxed cursor-pointer transition-all duration-200 hover:border-blue-500 hover:bg-[#1a1a1a] hover:translate-x-0.5 active:scale-[0.99] flex items-center justify-between gap-3"
                  >
                    <span>{opt.label}</span>
                    <span className="text-blue-500 opacity-0 transition-all duration-200 group-hover:opacity-100 shrink-0">
                      →
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* INSIGHT */}
          {screen === "insight" && branch && (
            <div style={{ animation: "enter 0.5s ease-out" }}>
              <p className="font-bold text-xs tracking-[0.1em] uppercase text-[#3FA796] mb-3.5">
                {INSIGHTS[branch].eyebrow}
              </p>
              <h1 className="font-display font-bold text-[clamp(26px,6vw,34px)] leading-tight tracking-tight mb-3.5">
                {INSIGHTS[branch].title}
              </h1>
              <p className="text-base leading-relaxed text-[#9BA1B5] mb-7 max-w-[48ch]">
                {INSIGHTS[branch].sub}
              </p>
              <button
                onClick={nextBranchQuestion}
                className="w-full inline-flex items-center justify-center gap-2.5 bg-blue-600 text-white border-none rounded-[18px] px-6 py-4 font-bold text-base cursor-pointer transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(59,130,246,0.35)] active:translate-y-0"
              >
                Continuer →
              </button>
            </div>
          )}

          {/* Q_BRANCH */}
          {screen === "q_branch" && currentQ && (
            <div style={{ animation: "enter 0.5s ease-out" }}>
              <p className="font-bold text-xs tracking-[0.1em] uppercase text-[#3FA796] mb-3.5">
                Question {branchIndex + 2}
              </p>
              <h1 className="font-display font-bold text-[clamp(26px,6vw,34px)] leading-tight tracking-tight mb-3.5">
                {currentQ.title}
              </h1>
              {currentQ.sub && (
                <p className="text-base leading-relaxed text-[#9BA1B5] mb-7 max-w-[48ch]">
                  {currentQ.sub}
                </p>
              )}

              {/* Options (standard) */}
              {!currentQ.isTierChoice && currentQ.options && (
                <div className="flex flex-col gap-2.5 mb-6">
                  {currentQ.options.map((opt, i) => (
                    <button
                      key={i}
                      onClick={() => answerBranch(currentQ.key, opt)}
                      className="group text-left bg-[#111111] border border-[rgba(255,255,255,0.08)] text-[#F6F2E9] rounded-[18px] px-4 py-4 font-medium text-base leading-relaxed cursor-pointer transition-all duration-200 hover:border-blue-500 hover:bg-[#1a1a1a] hover:translate-x-0.5 active:scale-[0.99] flex items-center justify-between gap-3"
                    >
                      <span>{opt}</span>
                      <span className="text-blue-500 opacity-0 transition-all duration-200 group-hover:opacity-100 shrink-0">→</span>
                    </button>
                  ))}
                </div>
              )}

              {/* Tier choice */}
              {currentQ.isTierChoice && currentQ.tiers && (
                <div className="flex flex-col gap-3.5 mb-6">
                  {currentQ.tiers.map((tier) => (
                    <button
                      key={tier.id}
                      onClick={() => answerBranch(currentQ.key, tier.name, tier.id)}
                      className="text-left bg-[#111111] border border-[rgba(255,255,255,0.08)] rounded-[18px] p-5 cursor-pointer transition-all duration-200 hover:border-blue-500 hover:bg-[#1a1a1a] hover:-translate-y-0.5 relative"
                    >
                      {tier.tag && (
                        <span className="absolute -top-2.5 right-4 bg-blue-500 text-[#14110A] font-bold text-[11px] tracking-wider uppercase px-2.5 py-1 rounded-full">
                          {tier.tag}
                        </span>
                      )}
                      <div className="font-display font-bold text-[17px] mb-1">{tier.name}</div>
                      <div className="font-display font-bold text-[22px] text-blue-500 mb-3">
                        {tier.price}
                      </div>
                      <ul className="flex flex-col gap-[7px] mb-3">
                        {tier.bullets.map((b, j) => (
                          <li key={j} className="text-sm leading-relaxed flex gap-2">
                            <span className="text-[#3FA796] font-bold shrink-0">✓</span>
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                      <p className="text-[13px] text-[#9BA1B5] italic border-t border-[rgba(255,255,255,0.08)] pt-2.5">
                        {tier.result}
                      </p>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Q_NAME */}
          {screen === "q_name" && (
            <div style={{ animation: "enter 0.5s ease-out" }}>
              <p className="font-bold text-xs tracking-[0.1em] uppercase text-[#3FA796] mb-3.5">
                Dernière étape
              </p>
              <h1 className="font-display font-bold text-[clamp(26px,6vw,34px)] leading-tight tracking-tight mb-3.5">
                C&apos;est quoi ton prénom ?
              </h1>
              <p className="text-base leading-relaxed text-[#9BA1B5] mb-7 max-w-[48ch]">
                Pour qu&apos;on personnalise ton plan.
              </p>
              <input
                ref={nameRef}
                type="text"
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && submitName()}
                placeholder="Ton prénom"
                maxLength={30}
                className="w-full bg-[#111111] border border-[rgba(255,255,255,0.08)] text-[#F6F2E9] rounded-[18px] px-4 py-4 font-sans text-[17px] mb-4 outline-none transition-colors focus:border-blue-500 placeholder:text-[#9BA1B5]"
              />
              <button
                onClick={submitName}
                disabled={isSending}
                className="w-full inline-flex items-center justify-center gap-2.5 bg-blue-600 text-white border-none rounded-[18px] px-6 py-4 font-bold text-base cursor-pointer transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(59,130,246,0.35)] active:translate-y-0 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
              >
                {isSending ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Envoi de ton diagnostic…
                  </>
                ) : (
                  "Voir mon plan →"
                )}
              </button>
            </div>
          )}

          {/* LOADING */}
          {screen === "loading" && (
            <div className="text-center py-10">
              <div className="w-14 h-14 mx-auto mb-6 rounded-full border-[3px] border-[rgba(255,255,255,0.08)] border-t-blue-500 animate-spin" />
              <div className="flex flex-col gap-2 items-center">
                <p className="text-sm text-[#9BA1B5]" style={{ animation: "fadeStep 0.6s forwards" }}>
                  Analyse de ta situation…
                </p>
                <p
                  className="text-sm text-[#9BA1B5] opacity-0"
                  style={{ animation: "fadeStep 0.6s 0.9s forwards" }}
                >
                  Sélection de l&apos;accompagnement adapté…
                </p>
                <p
                  className="text-sm text-[#9BA1B5] opacity-0"
                  style={{ animation: "fadeStep 0.6s 1.7s forwards" }}
                >
                  Construction de ton plan…
                </p>
              </div>
            </div>
          )}

          {/* RESULT */}
          {screen === "result" && branch && resultData && (
            <div style={{ animation: "enter 0.5s ease-out" }}>
              <span className="inline-block bg-[rgba(59,130,246,0.14)] text-blue-500 font-bold text-xs tracking-wider uppercase px-3 py-1.5 rounded-full mb-4">
                {resultData.badge}
              </span>
              <h1
                className="font-display font-bold text-[clamp(26px,6vw,34px)] leading-tight tracking-tight mb-3.5"
                dangerouslySetInnerHTML={{
                  __html: resultData.title(name).replace(
                    /((?:IA|Starter|Business|Complet)\s*(?:Business|Complet|Starter)?)/,
                    '<span class="text-blue-500">$1</span>'
                  ),
                }}
              />
              <p className="text-base leading-relaxed text-[#9BA1B5] mb-7 max-w-[48ch]">
                {resultData.sub}
              </p>

              {/* Plan card */}
              <div className="bg-[#111111] border border-[rgba(255,255,255,0.08)] rounded-[18px] p-5 my-5">
                <div className="font-display text-[28px] font-bold text-blue-500 mb-1">
                  {resultData.price}{" "}
                  <small className="text-sm text-[#9BA1B5] font-medium">{resultData.priceSub}</small>
                </div>
                <ul className="flex flex-col gap-3 mt-4">
                  {(resultData.plan as [string, string][]).map(([wk, desc], i) => (
                    <li key={i} className="flex gap-3 text-sm sm:text-[15px] leading-relaxed">
                      <span className="font-bold text-[#3FA796] shrink-0 w-7">{wk}</span>
                      <span>{desc}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* FAQ */}
              {faqList.length > 0 && (
                <div className="flex flex-col gap-2 my-2 mb-5">
                  {faqList.map(([q, a], i) => (
                    <div
                      key={i}
                      className="border border-[rgba(255,255,255,0.08)] rounded-[14px] overflow-hidden bg-[#111111]"
                    >
                      <button
                        onClick={() => setOpenFaqIndex(openFaqIndex === i ? null : i)}
                        className="w-full text-left bg-none border-none text-[#F6F2E9] font-semibold text-sm px-4 py-3.5 cursor-pointer flex justify-between items-center gap-2.5"
                      >
                        <span>{q}</span>
                        <span
                          className="text-blue-500 text-lg shrink-0 transition-transform duration-200"
                          style={{ transform: openFaqIndex === i ? "rotate(45deg)" : "rotate(0)" }}
                        >
                          +
                        </span>
                      </button>
                      <div
                        className="overflow-hidden transition-all duration-200 ease-out"
                        style={{
                          maxHeight: openFaqIndex === i ? "220px" : "0",
                          padding: openFaqIndex === i ? "0 16px 14px" : "0 16px",
                        }}
                      >
                        <p className="text-[13px] text-[#9BA1B5] leading-relaxed">{a}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2.5 bg-blue-600 text-white border-none rounded-[18px] px-6 py-4 font-bold text-base cursor-pointer transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(59,130,246,0.35)] active:translate-y-0 no-underline"
              >
                Réserver ma place sur WhatsApp →
              </a>

              <p className="text-[12px] text-[#9BA1B5] text-center mt-3.5 leading-relaxed">
                KAMTECH IA — accompagnement conçu et animé par un spécialiste IA & automatisation
                pour entrepreneurs.
              </p>

              <p className="text-[13px] text-[#9BA1B5] mt-4 leading-relaxed">{resultData.note}</p>
            </div>
          )}
        </div>

        {/* Footer note */}
        {screen !== "result" && (
          <p className="text-center text-[12px] text-[#9BA1B5] mt-6 opacity-70">
            KAMTECH IA — Accompagnement en live, adapté à ta situation. Aucun enregistrement, aucun
            contenu générique.
          </p>
        )}
      </div>

      {/* Animations keyframes */}
      <style>{`
        @keyframes enter {
          from { opacity: 0; transform: translateY(14px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeStep {
          to { opacity: 1; }
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}
