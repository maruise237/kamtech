# KAMTECH IA - Mapping des Boutons et Redirections WhatsApp

## Vue d'ensemble
Tous les boutons d'action du site KAMTECH IA redirigent vers WhatsApp avec un message personnalisé selon le contexte.

**Numéro WhatsApp:** +237 658 992 588
**Format URL:** `https://wa.me/237658992588?text=[MESSAGE_ENCODÉ]`

---

## Boutons par Section

### 1. HERO SECTION (`/components/hero-section.tsx`)

#### Bouton 1: "Obtenir mon audit gratuit (30 min)"
- **Message Key:** `auditGratuit`
- **Message WhatsApp:** "Bonjour, je veux réserver mon audit gratuit KAMTECH IA pour voir comment automatiser mon activité. Merci!"
- **Fonction:** `handleAuditClick()` → `openWhatsAppChat("auditGratuit")`
- **Position:** Bouton primaire (bleu), côté gauche
- **Responsive:** Full-width mobile, auto mobile

#### Bouton 2: "Parler à un expert maintenant"
- **Message Key:** `parlerExpert`
- **Message WhatsApp:** "Bonjour, je voudrais parler à un expert de KAMTECH IA maintenant pour discuter de mon projet."
- **Fonction:** `handleExpertClick()` → `openWhatsAppChat("parlerExpert")`
- **Position:** Bouton secondaire (outline blanc), côté droit
- **Responsive:** Full-width mobile, auto mobile

---

### 2. HEADER / NAVIGATION (`/components/header.tsx`)

#### Bouton: "Audit gratuit"
- **Message Key:** `headerAudit` (Note: actuellement utilise `auditGratuit`)
- **Message WhatsApp:** "Bonjour, je suis intéressé par l'audit gratuit KAMTECH IA. Pouvez-vous m'en dire plus?"
- **Fonction:** `handleAuditClick()` → `openWhatsAppChat("headerAudit")`
- **Position:** Top-right fixed header
- **Responsive:** Masqué sur mobile très petit (< 768px), visible sur tablette+

---

### 3. CTA SECTION FINALE (`/components/animated-cta-section.tsx`)

#### Bouton 1: "Réserver mon audit gratuit"
- **Message Key:** `placesLimitees`
- **Message WhatsApp:** "Bonjour, je veux réserver une des 5 places limitées pour cet audit gratuit cette semaine!"
- **Fonction:** `handleAuditClick()` → `openWhatsAppChat("placesLimitees")`
- **Position:** Bouton primaire (bleu), à gauche
- **Responsive:** Full-width mobile, auto mobile
- **Contexte:** Places limitées - message d'urgence

#### Bouton 2: "+237 658 992 588"
- **Message Key:** `contactDirect`
- **Message WhatsApp:** "Bonjour, je voudrais vous contacter directement pour discuter de mes besoins en automatisation IA."
- **Fonction:** `handleWhatsAppClick()` → `openWhatsAppChat("contactDirect")`
- **Position:** Bouton secondaire (outline blanc), à droite
- **Responsive:** Full-width mobile, auto mobile
- **Contexte:** Contact direct

---

### 4. FOOTER (`/components/footer.tsx`)

#### Bouton: "Nous contacter"
- **Message Key:** `contactDirect`
- **Message WhatsApp:** "Bonjour, je voudrais vous contacter directement pour discuter de mes besoins en automatisation IA."
- **Fonction:** `handleContactClick()` → `openWhatsAppChat("contactDirect")`
- **Position:** Section "À propos", sous description
- **Responsive:** Full-width mobile, auto mobile
- **Contexte:** CTA pour les utilisateurs qui scrollent jusqu'au pied de page

#### Liens WhatsApp directs:
- **Lien:** `<a href="https://wa.me/237658992588" target="_blank" rel="noopener noreferrer">WhatsApp</a>`
- **Position:** Colonne "Contact"
- **Ouvre directement WhatsApp sans message préécrit**

---

## Messages WhatsApp Disponibles

```typescript
export const whatsappMessages = {
  // Hero Section
  auditGratuit: "Bonjour, je veux réserver mon audit gratuit KAMTECH IA pour voir comment automatiser mon activité. Merci!",
  parlerExpert: "Bonjour, je voudrais parler à un expert de KAMTECH IA maintenant pour discuter de mon projet.",
  
  // Header
  headerAudit: "Bonjour, je suis intéressé par l'audit gratuit KAMTECH IA. Pouvez-vous m'en dire plus?",
  
  // CTA Final Section
  placesLimitees: "Bonjour, je veux réserver une des 5 places limitées pour cet audit gratuit cette semaine!",
  contactDirect: "Bonjour, je voudrais vous contacter directement pour discuter de mes besoins en automatisation IA.",
  
  // General inquiries
  demandeGeneral: "Bonjour, je voudrais en savoir plus sur KAMTECH IA et vos services d'automatisation.",
}
```

---

## Fonction Utilitaire

**Fichier:** `/lib/whatsapp.ts`

```typescript
// Ouvre WhatsApp avec un message personnalisé
export function openWhatsAppChat(messageKey: WhatsAppMessageKey): void {
  if (typeof window !== "undefined") {
    const link = getWhatsAppLink(messageKey)
    window.open(link, "_blank", "noopener,noreferrer")
  }
}
```

---

## Checklist de Validation

- [x] Tous les boutons redirigent vers le numéro WhatsApp +237 658 992 588
- [x] Chaque bouton a un message personnalisé selon son contexte
- [x] Les messages sont en français clair et pertinent
- [x] Tous les boutons sont responsives (mobile-first)
- [x] Les noms des boutons sont explicites et descriptifs
- [x] Les fonctions onClick utilisent `useCallback` pour la performance
- [x] Les messages sont encodés correctement pour les URLs
- [x] La fonction ouvre WhatsApp dans un nouvel onglet (_blank)

---

## Améliorations Futures

1. Ajouter des boutons dans les sections Problem et Process
2. Ajouter des CTAs personnalisées dans les testimoniales
3. Tracker les clics vers WhatsApp avec Google Analytics
4. Ajouter un formulaire de contact optionnel avant WhatsApp
5. Implémenter un chat widget pour les utilisateurs déjà sur le site
