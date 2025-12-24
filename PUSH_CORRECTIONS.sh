#!/bin/bash

echo "🔧 PUSH DES CORRECTIONS v2.2"
echo "============================"
echo ""
echo "✅ Corrections appliquées :"
echo "  - SELECT avec tranches de poids (au lieu d'input)"
echo "  - Chargement CSV corrigé pour Vercel"
echo "  - Config Vercel améliorée"
echo ""
echo "📤 Push vers GitHub..."
echo ""

git add .
git commit -m "v2.2 - Corrections: SELECT tranches + chargement CSV corrigé"
git push origin main

echo ""
echo "✅ PUSH TERMINÉ !"
echo ""
echo "🚀 MAINTENANT :"
echo "Va sur Vercel, le redéploiement va se lancer automatiquement."
echo "Attends 30 secondes et rafraîchis la page."
echo ""
echo "Les villes vont maintenant se charger ! 🎉"
