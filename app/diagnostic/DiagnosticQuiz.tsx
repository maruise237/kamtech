"use client"

import { useState, useEffect, useCallback } from "react"

const WHATSAPP_NUMBER = "237658992588"
const FORMSPREE_ENDPOINT = "https://formspree.io/f/xkopjrbj"

const QUESTIONS = [
  { id: "goal", opts: [
    { icon: "💬", txt: "Répondre plus vite à mes clients et qualifier mes prospects" },
    { icon: "💰", txt: "Attirer plus de clients et développer mes ventes" },
    { icon: "⚙️", txt: "Automatiser mes tâches répétitives et gagner du temps" },
    { icon: "🤖", txt: "Avoir un assistant IA qui travaille à ma place" },
    { icon: "🤔", txt: "Comprendre comment l'IA peut m'aider — je débute" },
  ]},
  { id: "sector", opts: [
    { icon: "🛒", txt: "Commerce & Boutique" }, { icon: "🍽️", txt: "Restaurant & Alimentation" },
    { icon: "💼", txt: "Services & Consulting" }, { icon: "📚", txt: "Formation & Coaching" },
    { icon: "🏗️", txt: "BTP & Artisanat" }, { icon: "✨", txt: "Autre secteur" },
  ]},
  { id: "blocker", opts: [
    { icon: "🤔", txt: "Je ne sais pas par où commencer" }, { icon: "💸", txt: "Je pensais que c'était trop cher" },
    { icon: "⏱️", txt: "Je n'avais pas le temps de m'en occuper" }, { icon: "❌", txt: "J'ai essayé des outils génériques — rien ne collait" },
    { icon: "🆕", txt: "Je découvre l'IA maintenant" },
  ]},
  { id: "volume", opts: [
    { icon: "🌱", txt: "Moins de 20 demandes par semaine" }, { icon: "📈", txt: "Entre 20 et 50 demandes" },
    { icon: "🔥", txt: "Entre 50 et 100 demandes" }, { icon: "🚀", txt: "Plus de 100 demandes" },
  ]},
  { id: "digital", opts: [
    { icon: "🚫", txt: "Aucun site web ni réseaux sociaux actifs" }, { icon: "📱", txt: "Réseaux sociaux uniquement" },
    { icon: "🌐", txt: "Un site web mais pas vraiment optimisé" }, { icon: "✅", txt: "Bonne présence en ligne, je veux aller plus loin" },
  ]},
  { id: "timing", opts: [
    { icon: "🔥", txt: "Maintenant — je suis prêt(e) à démarrer" }, { icon: "📅", txt: "Dans les 2 prochaines semaines" },
    { icon: "🔍", txt: "Je compare d'abord les options disponibles" }, { icon: "💬", txt: "Dès que j'ai un devis clair" },
  ]},
]

const INS1 = [
  { icon: "💡", stat: "C'est le blocage #1 — et le plus simple à lever", txt: "Ne pas savoir par où commencer est la raison la plus courante. C'est aussi le problème le plus simple à résoudre avec un bon diagnostic de 45 minutes." },
  { icon: "💸", stat: "ROI moyen d'un chatbot WhatsApp : 3-5x en 90 jours", txt: "La plupart des solutions IA coûtent moins cher qu'un demi-mois de temps perdu sur des tâches manuelles." },
  { icon: "⏱️", stat: "Si vous manquez de temps, c'est urgent", txt: "Le manque de temps est le signe le plus clair que l'automatisation est urgente, pas optionnelle." },
  { icon: "🎯", stat: "KAMTECH construit sur mesure", txt: "Les outils génériques ne sont pas conçus pour votre business spécifique. C'est pourquoi KAMTECH part de votre situation réelle." },
  { icon: "🚀", stat: "2025-2026 : la fenêtre d'avance pour les PME", txt: "Les PME qui adoptent l'IA maintenant prennent 2 à 3 ans d'avance sur leurs concurrents." },
]

const INS2 = [
  { icon: "🌱", stat: "Démarrer tôt = avantage concurrentiel", txt: "Même avec peu de demandes, chaque heure perdue sur des tâches répétitives est une heure de moins pour votre croissance." },
  { icon: "⏱️", stat: "8h/semaine récupérées en moyenne", txt: "Entre 20 et 50 demandes, vous commencez à toucher les limites du traitement manuel." },
  { icon: "🔥", stat: "70% des réponses automatisables", txt: "Plus de 50 demandes : chaque délai de réponse est une chance donnée à un concurrent." },
  { icon: "🚀", stat: "+15h/semaine récupérées", txt: "Plus de 100 demandes en traitement manuel, c'est 15 heures ou plus perdues chaque semaine." },
]

const SEG: Record<string, { emoji: string; tag: string; name: string; diag: string; phases: { when: string; txt: string }[]; benefits: string[]; loss: string; wa: string }> = {
  chatbot: { emoji: "💬", tag: "✦ Chatbot WhatsApp IA", name: "L'Entrepreneur Débordé", diag: "Vous répondez aux mêmes questions des dizaines de fois par semaine.", phases: [{ when: "J1-J3", txt: "Audit de vos flux WhatsApp" }, { when: "J4-J7", txt: "Configuration du chatbot IA sur vos cas réels" }, { when: "J8-J14", txt: "Déploiement live + formation + suivi 30 jours" }], benefits: ["Réponses automatiques instantanées", "Qualification des leads sans intervention", "Déployé sur votre WhatsApp existant"], loss: "Chaque minute de délai est une chance donnée à votre concurrent.", wa: "Bonjour KAMTECH IA 👋 Je suis intéressé(e) par le Chatbot WhatsApp IA. Secteur : [SECTOR]. Timing : [TIMING]." },
  website: { emoji: "🌐", tag: "✦ Site Web Professionnel IA", name: "Le Pro Invisible", diag: "Vous êtes bon dans votre métier — mais vos prospects ne vous trouvent pas en ligne.", phases: [{ when: "J1-J3", txt: "Brief + maquette adaptée à votre secteur" }, { when: "J4-J10", txt: "Développement + SEO + intégration chatbot IA" }, { when: "J11-J14", txt: "Mise en ligne + formation + bilan performance" }], benefits: ["Site pro optimisé SEO livré en -2 semaines", "Chatbot intégré dès le départ", "Conçu pour convertir, pas juste une vitrine"], loss: "Sans présence digitale, vos prospects choisissent le concurrent qu'ils trouvent sur Google.", wa: "Bonjour KAMTECH IA 👋 Je suis intéressé(e) par un Site Web IA. Secteur : [SECTOR]. Timing : [TIMING]." },
  automation: { emoji: "⚙️", tag: "✦ Automatisation & Flux n8n", name: "Le Patron Chronophage", diag: "Vous faites faire à la main ce que la machine devrait faire.", phases: [{ when: "J1-J3", txt: "Cartographie de vos flux métier" }, { when: "J4-J10", txt: "Construction des automatisations n8n" }, { when: "J11-J14", txt: "Déploiement + formation + heures récupérées" }], benefits: ["Automatisation sur mesure de vos flux", "Connexion de tous vos outils (CRM, WhatsApp, email)", "10 à 20h récupérées par semaine"], loss: "Les tâches répétitives s'accumulent jusqu'à bloquer la croissance.", wa: "Bonjour KAMTECH IA 👋 Je suis intéressé(e) par l'automatisation. Secteur : [SECTOR]. Timing : [TIMING]." },
  agent: { emoji: "🤖", tag: "✦ Agent IA Personnalisé", name: "Le Stratège Solo", diag: "Vous voulez déléguer à l'IA — mais les outils génériques ne correspondent pas à votre business.", phases: [{ when: "J1-J3", txt: "Mapping de vos tâches + cas d'usage" }, { when: "J4-J10", txt: "Construction + entraînement sur vos données" }, { when: "J11-J14", txt: "Déploiement + suivi autonomie" }], benefits: ["Agent 100% personnalisé sur votre business", "Gère emails, prospection, support client", "S'adapte à votre workflow"], loss: "Les outils génériques consomment du temps au lieu d'en économiser.", wa: "Bonjour KAMTECH IA 👋 Je suis intéressé(e) par un Agent IA. Secteur : [SECTOR]. Timing : [TIMING]." },
  audit: { emoji: "🔍", tag: "✦ Audit & Conseil IA", name: "L'Explorateur IA", diag: "Vous savez que l'IA peut vous aider — mais par où commencer ?", phases: [{ when: "J1", txt: "Diagnostic 45 min gratuit (appel ou WhatsApp)" }, { when: "J2-J5", txt: "Roadmap IA personnalisée + devis" }, { when: "J6+", txt: "Démarrage de la 1ère solution retenue" }], benefits: ["Diagnostic complet sans jargon technique", "Roadmap priorisée avec budget réaliste", "Plan d'action écrit, actionnable immédiatement"], loss: "Chaque mois sans décision est un mois de retard sur vos concurrents.", wa: "Bonjour KAMTECH IA 👋 Je souhaite un audit IA. Secteur : [SECTOR]. Timing : [TIMING]." },
}

const SECTOR_NAMES = ["commerce", "restaurant", "services", "formation", "BTP", "votre secteur"]
const TIMING_NAMES = ["maintenant", "dans 2 semaines", "après comparaison", "dès que j'ai un devis"]

type Screen = "intro" | "q0" | "q1" | "q2" | "ins1" | "q3" | "ins2" | "q4" | "q5" | "loading" | "result"

export default function DiagnosticQuiz() {
  const [screen, setScreen] = useState<Screen>("intro")
  const [answers, setAnswers] = useState<Record<string, number>>({})
  const [animDir, setAnimDir] = useState<"next" | "back">("next")
  const [loadingStep, setLoadingStep] = useState(0)
  const [showDots, setShowDots] = useState(false)

  const goTo = useCallback((s: Screen, dir: "next" | "back" = "next") => { setAnimDir(dir); setScreen(s); window.scrollTo({ top: 0, behavior: "smooth" }) }, [])

  const dotIndex = ({ q0: 0, q1: 1, q2: 2, ins1: 2, q3: 3, ins2: 3, q4: 4, q5: 5 } as Record<string, number>)[screen] ?? -1
  const canGoBack = !["intro", "loading", "result"].includes(screen)

  const goBack = useCallback(() => {
    const m: Record<string, Screen> = { q0: "intro", q1: "q0", q2: "q1", ins1: "q2", q3: "ins1", ins2: "q3", q4: "ins2", q5: "q4" }
    if (m[screen]) goTo(m[screen], "back")
  }, [screen, goTo])

  const sendToFormspree = (a: Record<string, number>) => {
    const g = a.goal; const d = a.digital
    const key = g === 0 ? "chatbot" : g === 1 ? (d !== undefined && d <= 1 ? "website" : "chatbot") : g === 2 ? "automation" : g === 3 ? "agent" : "audit"
    const s = SEG[key]
    if (!s) return

    const reponsesTexte = QUESTIONS.map((q, qi) => {
      const rep = a[q.id]
      return rep !== undefined ? `  • ${q.opts[rep]?.txt ?? rep}` : "  • (non répondu)"
    }).join("\n")

    fetch(FORMSPREE_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        _subject: `Diagnostic IA - ${s.name}`,
        name: s.name,
        email: "quiz@kamtech.online",
        message: `Segment : ${key}\nProfil : ${s.name}\n\nRéponses :\n${reponsesTexte}`,
        profile: key,
        offre: s.tag,
        reponses: reponsesTexte,
        timestamp: new Date().toISOString(),
        source: "diagnostic-v2",
      }),
    }).then(async (res) => {
      if (!res.ok) console.error("Formspree error:", res.status, await res.text().catch(() => ""))
      else console.log("Formspree success:", res.status)
    }).catch((err) => console.error("Formspree failed:", err))
  }

  const pick = useCallback((qi: number, oi: number) => {
    setAnswers(prev => ({ ...prev, [QUESTIONS[qi].id]: oi }))
    // Envoi Formspree quand la dernière question est répondue
    if (qi === 5) {
      const finalAnswers = { ...answers, [QUESTIONS[5].id]: oi }
      setTimeout(() => sendToFormspree(finalAnswers), 100)
    }
    const nextMap: Record<number, Screen> = { 0: "q1", 1: "q2", 2: "ins1", 3: "ins2", 4: "q5", 5: "loading" }
    setTimeout(() => { if (qi === 2) setShowDots(true); if (qi === 5) { setShowDots(false); setLoadingStep(0) }; goTo(nextMap[qi] || `q${qi + 1}`) }, 320)
  }, [goTo, answers])

	  useEffect(() => {
	    if (screen !== "loading") return
	    const steps = ["Analyse…", "Matching…", "Construction…", "Finalisation…"]
	    let i = 0; setLoadingStep(0)
	    const iv = setInterval(() => { i = (i + 1) % 4; setLoadingStep(i) }, 900)
	    setTimeout(() => { clearInterval(iv); goTo("result") }, 4000)
	    return () => clearInterval(iv)
	  }, [screen === "loading"]) // eslint-disable-line

  const getSegKey = (a: Record<string, number>) => { const g = a.goal; const d = a.digital; if (g === 0) return "chatbot"; if (g === 1) return (d !== undefined && d <= 1) ? "website" : "chatbot"; if (g === 2) return "automation"; if (g === 3) return "agent"; return "audit" }
  const segKey = screen === "result" ? getSegKey(answers) : ""
  const seg = segKey ? SEG[segKey] : null
  const waUrl = seg ? `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(seg.wa.replace("[SECTOR]", SECTOR_NAMES[answers.sector] ?? "votre secteur").replace("[TIMING]", TIMING_NAMES[answers.timing] ?? "bientôt"))}` : "#"
  const loadingSteps = ["Analyse en cours", "Matching profil", "Construction du plan", "Finalisation"]

  const renderQuestion = (qi: number) => {
    const q = QUESTIONS[qi]; const sel = answers[q.id]
    const titles = ["Quel résultat voulez-vous en priorité ?", "Dans quel secteur travaillez-vous ?", "Qu'est-ce qui vous a bloqué jusqu'ici ?", "Combien de demandes clients par semaine ?", "Où en est votre présence digitale ?", "Quand souhaitez-vous démarrer ?"]
    const subs = ["Votre réponse est le point de départ", "On adapte notre recommandation à votre domaine", "Soyez direct — ça permet d'adapter le plan", "Via WhatsApp, téléphone, email — tous canaux", "", "On adapte notre réponse à votre disponibilité"]
    return (
      <>
        <span className="text-[11px] font-semibold tracking-[0.1em] uppercase text-blue-400 mb-3 block">Question {qi + 1} / 6</span>
        <h2 className="font-display text-xl md:text-2xl font-bold leading-tight text-white mb-1.5">{titles[qi]}</h2>
        {subs[qi] && <p className="text-sm text-[#9BA1B5] mb-5 leading-relaxed">{subs[qi]}</p>}
        <div className="flex flex-col gap-2">
          {q.opts.map((o, oi) => (
            <button key={oi} onClick={() => pick(qi, oi)} className={`group text-left bg-[#111] border ${sel === oi ? "border-blue-500 bg-blue-500/10" : "border-[rgba(255,255,255,0.08)]"} rounded-[14px] px-4 py-3.5 cursor-pointer transition-all hover:border-blue-500/50 hover:bg-[#1a1a1a] flex items-center gap-3`}>
              <span className="text-xl shrink-0">{o.icon}</span>
              <span className={`text-sm leading-relaxed flex-1 ${sel === oi ? "text-white" : "text-[#d4d4d8]"}`}>{o.txt}</span>
              <div className={`w-[18px] h-[18px] rounded-full border-2 shrink-0 flex items-center justify-center transition-all ${sel === oi ? "border-blue-500 bg-blue-500" : "border-[#3f3f46]"}`}>
                {sel === oi && <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 5L4 7L8 3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>}
              </div>
            </button>
          ))}
        </div>
      </>
    )
  }

  const renderInsight = (t: "ins1" | "ins2") => {
    const data = t === "ins1" ? INS1[answers.blocker] ?? INS1[0] : INS2[answers.volume] ?? INS2[0]
    const next: Screen = t === "ins1" ? "q3" : "q4"
    return (
      <>
        <div className="bg-[#1a1a1a] border-l-[3px] border-blue-500 rounded-[14px] p-5 mb-5">
          <div className="text-[11px] font-semibold tracking-[0.09em] uppercase text-blue-400 mb-2.5">{t === "ins1" ? "Ce qu'on observe" : "Le coût caché"}</div>
          <div className="text-3xl mb-2.5">{data.icon}</div>
          <p className="text-sm text-[#d4d4d8] leading-relaxed mb-3">{data.txt}</p>
          <span className="inline-block bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-semibold px-3 py-1 rounded-full">{data.stat}</span>
        </div>
        <button onClick={() => goTo(next)} className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-[14px] px-6 py-3.5 font-bold text-sm cursor-pointer transition-all hover:-translate-y-0.5 active:translate-y-0">Continuer →</button>
      </>
    )
  }

  return (
    <div className="min-h-screen bg-black text-[#F6F2E9] font-sans flex flex-col items-center relative overflow-x-hidden">
      <div className="fixed left-1/2 bottom-0 w-[140vw] h-[70vh] pointer-events-none -z-10" style={{ background: "radial-gradient(closest-side, rgba(59,130,246,0.08), rgba(59,130,246,0.02) 45%, transparent 70%)", transform: "translateX(-50%)" }} />
      <div className="fixed inset-0 pointer-events-none -z-10" style={{ backgroundImage: "linear-gradient(to right, rgba(59,130,246,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(59,130,246,0.04) 1px, transparent 1px)", backgroundSize: "40px 40px", maskImage: "radial-gradient(ellipse at center, transparent 20%, black 70%)", WebkitMaskImage: "radial-gradient(ellipse at center, transparent 20%, black 70%)" }} />
      <div className="w-full max-w-[520px] min-h-screen flex flex-col px-5 py-6 pb-10 relative z-10">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            {canGoBack && <button onClick={goBack} className="flex items-center justify-center w-8 h-8 rounded-full bg-[#111] border border-[rgba(255,255,255,0.08)] text-[#9BA1B5] cursor-pointer transition-all hover:text-white hover:border-white/20" aria-label="Retour"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"/></svg></button>}
            <span className="font-bold text-sm tracking-widest text-[#9BA1B5] uppercase">KAMTECH <span className="text-blue-500">IA</span></span>
          </div>
          {screen !== "intro" && screen !== "loading" && screen !== "result" && <span className="text-xs font-semibold text-[#9BA1B5]">{dotIndex + 1}/6</span>}
        </div>
        {showDots && dotIndex >= 0 && (
          <div className="flex items-center justify-center gap-2 mb-6">
            {Array.from({ length: 6 }).map((_, i) => <div key={i} className={`w-2 h-2 rounded-full transition-all duration-300 ${i < dotIndex ? "bg-blue-500" : i === dotIndex ? "bg-blue-400 scale-125 shadow-[0_0_6px_rgba(96,165,250,0.6)]" : "bg-[#3f3f46]"}`} />)}
          </div>
        )}
        <div className="flex-1 flex flex-col justify-center" style={{ animation: `${animDir === "next" ? "slideIn" : "slideOut"} 0.26s ease forwards` }}>
          {screen === "intro" && (
            <>
              <div className="inline-flex items-center gap-1.5 bg-blue-500/10 border border-blue-500/30 text-blue-400 text-[11px] font-semibold tracking-[0.09em] uppercase px-3 py-1.5 rounded-full mb-4">🎯 Diagnostic IA Gratuit</div>
              <h1 className="font-display text-2xl md:text-3xl font-bold leading-tight text-white mb-3">Quelle solution IA correspond à <span className="text-blue-500">votre business</span> ?</h1>
              <p className="text-sm text-[#9BA1B5] leading-relaxed mb-6">6 questions — moins de 90 secondes — recommandation personnalisée.</p>
              <div className="flex flex-wrap gap-x-5 gap-y-2 mb-7">{[["100% gratuit","#22c55e"],["Sans engagement","#22c55e"],["Résultat immédiat","#22c55e"],["Sur mesure","#22c55e"]].map(([t,c]) => <div key={t} className="flex items-center gap-1.5 text-xs text-[#9BA1B5]"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>{t}</div>)}</div>
              <button onClick={() => { setShowDots(true); goTo("q0") }} className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-[14px] px-6 py-4 font-bold text-sm cursor-pointer transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_25px_rgba(59,130,246,0.3)] active:translate-y-0">Démarrer mon diagnostic →</button>
            </>
          )}
          {screen === "q0" && <div>{renderQuestion(0)}</div>}
          {screen === "q1" && <div>{renderQuestion(1)}</div>}
          {screen === "q2" && <div>{renderQuestion(2)}</div>}
          {screen === "ins1" && <div>{renderInsight("ins1")}</div>}
          {screen === "q3" && <div>{renderQuestion(3)}</div>}
          {screen === "ins2" && <div>{renderInsight("ins2")}</div>}
          {screen === "q4" && <div>{renderQuestion(4)}</div>}
          {screen === "q5" && <div>{renderQuestion(5)}</div>}
          {screen === "loading" && (
            <div className="text-center py-12">
              <div className="relative w-[70px] h-[70px] mx-auto mb-6"><div className="absolute inset-0 rounded-full border-2 border-transparent border-t-blue-500 animate-spin"/><div className="absolute inset-[10px] rounded-full border-2 border-transparent border-r-blue-400 animate-spin" style={{ animationDirection: "reverse", animationDuration: "0.85s" }}/><div className="absolute inset-[19px] rounded-full border-2 border-transparent border-b-blue-300 animate-spin" style={{ animationDuration: "0.6s" }}/></div>
              <div className="text-[11px] font-semibold tracking-[0.09em] uppercase text-blue-400 mb-2">{loadingSteps[loadingStep]}</div>
              <div className="font-display text-lg font-bold text-white mb-1">{["On lit vos réponses", "On compare avec des cas similaires", "On bâtit votre plan sur mesure", "Dernières vérifications"][loadingStep]}</div>
              <div className="text-sm text-[#9BA1B5] animate-pulse">{["Identification de votre profil…", "Sélection de la solution adaptée…", "Phases et timeline personnalisées…", "Presque prêt…"][loadingStep]}</div>
              <div className="inline-flex items-center gap-2 bg-[#1a1a1a] border border-[rgba(255,255,255,0.06)] rounded-full px-4 py-2 mt-5 text-xs text-[#9BA1B5]"><span>📊</span><span>247 diagnostics créés ce mois</span></div>
            </div>
          )}
          {screen === "result" && seg && (
            <div>
              <div className="bg-gradient-to-b from-blue-500/10 to-transparent border-b border-[rgba(255,255,255,0.06)] -mx-5 px-5 py-6 text-center relative overflow-hidden mb-5">
                <div className="absolute top-[-50px] left-1/2 -translate-x-1/2 w-[220px] h-[220px] bg-blue-500/10 rounded-full pointer-events-none blur-3xl" />
                <div className="text-4xl mb-2.5 relative">{seg.emoji}</div>
                <span className="inline-flex items-center gap-1 bg-blue-500/10 border border-blue-500/30 text-blue-400 text-[11px] font-semibold tracking-[0.09em] uppercase px-3 py-1 rounded-full mb-3 relative">{seg.tag}</span>
                <h2 className="font-display text-xl font-bold text-white mb-2 relative">{seg.name}</h2>
                <p className="text-sm text-[#9BA1B5] italic leading-relaxed relative">&ldquo;{seg.diag}&rdquo;</p>
              </div>
              <div className="mb-5"><div className="text-[11px] font-semibold tracking-[0.09em] uppercase text-[#9BA1B5] mb-3">Votre plan KAMTECH IA</div>{seg.phases.map((p, i) => <div key={i} className="flex gap-3 mb-2.5"><div className="flex flex-col items-center shrink-0 pt-0.5"><div className="w-2.5 h-2.5 rounded-full bg-blue-500"/>{i < seg.phases.length - 1 && <div className="w-[2px] flex-1 bg-[rgba(255,255,255,0.08)] mt-1"/>}</div><div className="pb-2.5"><div className="text-[11px] font-semibold tracking-[0.07em] text-blue-400 mb-0.5">{p.when}</div><div className="text-sm text-[#d4d4d8] leading-relaxed">{p.txt}</div></div></div>)}</div>
              <div className="mb-5"><div className="text-[11px] font-semibold tracking-[0.09em] uppercase text-[#9BA1B5] mb-3">Ce que ça change</div>{seg.benefits.map((b, i) => <div key={i} className="flex items-start gap-2 mb-2"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg><span className="text-sm text-[#d4d4d8] leading-relaxed">{b}</span></div>)}</div>
              <div className="bg-blue-500/5 border border-blue-500/20 rounded-[12px] p-3.5 mb-5 text-sm text-[#d4d4d8] leading-relaxed"><strong className="text-white">{seg.loss}</strong></div>
              <div className="mt-5">
                <a href={waUrl} target="_blank" rel="noopener noreferrer" className="w-full inline-flex items-center justify-center gap-2.5 bg-[#25D366] hover:bg-[#1da851] text-white rounded-[14px] px-6 py-4 font-bold text-sm cursor-pointer transition-all hover:-translate-y-0.5 active:translate-y-0 no-underline"><svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>Obtenir mon diagnostic gratuit</a>
                <a href="/" className="w-full inline-flex items-center justify-center gap-2 bg-transparent text-[#9BA1B5] border border-[rgba(255,255,255,0.1)] rounded-[14px] px-6 py-3 mt-2.5 text-sm font-medium cursor-pointer transition-all hover:text-white hover:border-white/30 no-underline">Voir toutes nos solutions →</a>
                <p className="text-center text-xs text-[#9BA1B5] mt-3">100% gratuit · Sans engagement · Réponse sous 24h</p>
              </div>
            </div>
          )}
        </div>
        {screen !== "result" && <p className="text-center text-[11px] text-[#71717a] mt-6 leading-relaxed">KAMTECH IA · Yaoundé &amp; Douala, Cameroun</p>}
      </div>
      <style>{`@keyframes slideIn{from{opacity:0;transform:translateX(16px)}to{opacity:1;transform:none}}@keyframes slideOut{from{opacity:0;transform:translateX(-16px)}to{opacity:1;transform:none}}@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  )
}
