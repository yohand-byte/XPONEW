#!/bin/bash

echo "🚀 DÉPLOIEMENT AUTOMATIQUE - CALCULATEUR XPO EUROPE"
echo "=================================================="
echo ""

# Aller dans le bon dossier
cd "$(dirname "$0")"

echo "📦 Étape 1/3 : Configuration du remote GitHub..."
git remote remove origin 2>/dev/null  # Enlever l'ancien remote s'il existe
git remote add origin https://github.com/yohand-byte/XPONEW.git
git branch -M main
echo "✅ Remote configuré"

echo ""
echo "📤 Étape 2/3 : Push vers GitHub..."
echo "⚠️  Tu vas devoir entrer tes credentials GitHub..."
echo ""

# Pousser vers GitHub
if git push -u origin main --force; then
    echo ""
    echo "✅ Code poussé sur GitHub avec succès !"
    echo ""
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo "🎯 Étape 3/3 : DÉPLOIEMENT VERCEL"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo ""
    echo "Maintenant, va sur : https://vercel.com"
    echo ""
    echo "OPTION A - Si tu as déjà un projet XPONEW sur Vercel :"
    echo "  1. Va dans ton projet XPONEW"
    echo "  2. Clique sur 'Deployments'"
    echo "  3. Le nouveau déploiement va se lancer automatiquement"
    echo "  4. Attends 30 secondes"
    echo "  5. ✅ C'EST EN LIGNE !"
    echo ""
    echo "OPTION B - Si c'est un nouveau projet :"
    echo "  1. Clique sur 'Add New...' → 'Project'"
    echo "  2. Sélectionne ton repo 'XPONEW'"
    echo "  3. Dans 'Root Directory', choisis 'calculator-xpo-europe'"
    echo "  4. Clique sur 'Deploy'"
    echo "  5. Attends 30 secondes"
    echo "  6. ✅ C'EST EN LIGNE !"
    echo ""
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo ""
    echo "🎉 TON CALCULATEUR SERA EN LIGNE DANS 1 MINUTE !"
    echo ""
else
    echo ""
    echo "❌ Erreur lors du push vers GitHub"
    echo ""
    echo "SOLUTIONS POSSIBLES :"
    echo ""
    echo "1. Si tu as l'authentification à 2 facteurs :"
    echo "   → Tu dois créer un Personal Access Token sur GitHub"
    echo "   → Va sur : https://github.com/settings/tokens"
    echo "   → Génère un token avec les droits 'repo'"
    echo "   → Utilise le token comme mot de passe"
    echo ""
    echo "2. Ou fais-le manuellement (super rapide) :"
    echo ""
    echo "   git push -u origin main --force"
    echo ""
    exit 1
fi
