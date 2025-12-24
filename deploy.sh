#!/bin/bash

echo "🚀 Déploiement du Calculateur XPO Europe"
echo "=========================================="
echo ""

# Vérifier si git est initialisé
if [ ! -d .git ]; then
    echo "📦 Initialisation du repository Git..."
    git init
    git add .
    git commit -m "Initial commit - Calculator XPO Europe v2.0"
    echo "✅ Git initialisé"
else
    echo "✅ Git déjà initialisé"
fi

# Vérifier si le remote existe
if ! git remote | grep -q origin; then
    echo ""
    echo "📌 Configuration du remote GitHub..."
    echo "Entrez l'URL de votre repo GitHub (ex: https://github.com/yohand-byte/XPONEW.git):"
    read repo_url
    git remote add origin "$repo_url"
    echo "✅ Remote configuré"
fi

# Pousser vers GitHub
echo ""
echo "📤 Push vers GitHub..."
git branch -M main
git push -u origin main

echo ""
echo "✅ Déploiement terminé !"
echo ""
echo "📋 Prochaines étapes :"
echo "1. Allez sur https://vercel.com"
echo "2. Cliquez sur 'New Project'"
echo "3. Importez votre repo GitHub"
echo "4. Cliquez sur 'Deploy'"
echo ""
echo "🎉 Votre calculateur sera en ligne en quelques secondes !"
