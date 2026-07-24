// Données des tableaux comparatifs injectés dynamiquement selon l'article

export const comparisonTables: Record<string, {
  headers: string[];
  rows: { name: string; brand: string; price: string; feature: string; downside?: string; productKey: string }[];
  footer: string;
}> = {
  'flushable-cat-litter-septic-safety': {
    headers: ['Produit', 'Marque', 'Prix', 'Avantage clé', 'Inconvénient', 'Lien Amazon', 'Lien Awin'],
    rows: [
      {
        name: 'FUKUMARU Tofu Cat Litter',
        brand: 'FUKUMARU',
        price: '~22,99 $ / 15 lb',
        feature: 'Se disperse sans résidus',
        downside: 'Moins absorbant',
        productKey: 'fukumaru-tofu-cat-litter',
      },
      {
        name: 'Tranquille Tofu Cat Litter',
        brand: 'Tranquille',
        price: '~24,99 $ / 12 lb',
        feature: 'Forme up moulée, moisissures contrôlées',
        downside: 'Coût élevé par lb',
        productKey: 'tranquille-tofu-cat-litter',
      },
      {
        name: 'World\'s Best Cat Litter',
        brand: 'World\'s Best',
        price: '~35,99 $ / 20 lb',
        feature: 'Testé pour le flush, haute absorption',
        downside: 'Prix le plus élevé',
        productKey: 'worlds-best-cat-litter',
      },
    ],
    footer: 'Pour système septic : World\'s Best (flush). Pour budget restreint : FUKUMARU ou Tranquille.',
  },
  'recycled-ocean-plastic-cat-toys-durability': {
    headers: ['Produit', 'Marque', 'Prix', 'Durabilité', 'Micaillures', 'Lien Amazon', 'Lien Awin'],
    rows: [
      {
        name: 'Catnip Scratch Ball (EcoCradle)',
        brand: 'EcoCradle',
        price: '~19,99 €',
        feature: 'Fabriqué en plastique océanique 100%',
        downside: 'Puissance magnétique médiocre',
        productKey: 'ecocradle-catnip-scratch-ball',
      },
      {
        name: 'Ocean Plastic Worm (PlaySure)',
        brand: 'PlaySure',
        price: '~24,99 €',
        feature: 'Résistant aux morsures fortes',
        downside: 'Toux dans l’eau',
        productKey: 'playsure-ocean-plastic-worm',
      },
    ],
    footer: 'Pour budget limité : Catnip Scratch Ball. Pour chats déchaînés : Ocean Plastic Worm.',
  },
  'plant-based-dog-chews-comparison': {
    headers: ['Chew', 'Marque', 'Prix', 'Protéine', 'Avantage principal', 'Lien Amazon', 'Lien Awin'],
    rows: [
      {
        name: 'Sweet Potato Chew Co.',
        brand: 'Sweet Potato Chew Co.',
        price: '~8,99 $',
        feature: 'Très digestible, faible en carbone',
        downside: 'Faible en protéine',
        productKey: 'sweet-potato-chew-co',
      },
      {
        name: 'Soy Chews Premium (Monks)',
        brand: 'Monks',
        price: '~11,99 $',
        feature: 'Bonne source de protéine végétale',
        downside: 'Allergène courant',
        productKey: 'monks-soy-chews',
      },
    ],
    footer: 'Pour chiens sensibles : patate douce. Pour apport protéique : soja (vérifier allergie).',
  },
  'zero-waste-cat-feeding-setup': {
    headers: ['Conteneur', 'Marque', 'Prix', 'Capacité', 'Lien Amazon', 'Lien Awin'],
    rows: [
      {
        name: 'Bol en inox Inoxmart',
        brand: 'Inoxmart',
        price: '~12,99 $',
        feature: 'Durable et facile à nettoyer',
        productKey: 'inoxmart-stainless-steel-bowl',
      },
      {
        name: 'Matelas en Silicone Ecoflex',
        brand: 'Ecoflex',
        price: '~9,99 $',
        feature: 'Capture des miettes et anti-éclaboussures',
        productKey: 'ecoflex-silicone-feeding-mat',
      },
    ],
    footer: 'Bol inox pour hygiène quotidienne. Matelas silicone pour repas en extérieur.',
  },
  'eco-small-pet-bedding-comparison': {
    headers: ['Litière', 'Marque', 'Prix', 'Poussière', 'Compostable', 'Lien Amazon', 'Lien Awin'],
    rows: [
      {
        name: 'Hemp Bedding',
        brand: 'Small Pet Select',
        price: '~15,99 $',
        feature: 'Faible poussière, excellent contrôle des odeurs',
        downside: 'Plus cher que le papier',
        productKey: 'small-pet-select-hemp-bedding',
      },
      {
        name: 'Aspen Bedding',
        brand: 'Kaytee',
        price: '~12,99 $',
        feature: 'Faible poussière, bon pour les voies respiratoires',
        downside: 'Moins absorbant que le chanvre',
        productKey: 'kaytee-aspen-bedding',
      },
      {
        name: 'Paper Bedding',
        brand: 'Carefresh',
        price: '~10,99 $',
        feature: 'Très faible poussière, très compostable',
        downside: 'Se comprime rapidement',
        productKey: 'carefresh-paper-bedding',
      },
    ],
    footer: 'Choisissez le chanvre ou l\'aspens. Évitez le pin/cedre (irritant pulmonaire).',
  },
};