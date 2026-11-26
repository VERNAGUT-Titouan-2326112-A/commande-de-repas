-- Schéma de la base du service métier, exécuté à la création du conteneur PostgreSQL.
-- Après modification : docker compose down -v && docker compose up -d
BEGIN;

-- 1. Utilisateurs
CREATE TABLE utilisateurs (
                              id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                              prenom      VARCHAR(100) NOT NULL,
                              nom         VARCHAR(100) NOT NULL,
                              email       VARCHAR(255) NOT NULL UNIQUE
                            CONSTRAINT chk_utilisateurs_prenom_non_vide CHECK (BTRIM(prenom) <> ''),
                            CONSTRAINT chk_utilisateurs_nom_non_vide CHECK (BTRIM(nom) <> ''),
                            CONSTRAINT chk_utilisateurs_email_format CHECK (
                                  email ~* '^[^[:space:]@]+@[^[:space:]@]+\.[^[:space:]@]+$'
);

-- 2. Produits
CREATE TABLE produits (
                            id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                            nom           VARCHAR(150) NOT NULL,
                            prix INTEGER NOT NULL;

-- 3. Creneaux de retrait
CREATE TABLE creneaux_retrait (
                            id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                            debut_at         TIMESTAMPTZ NOT NULL,
                            fin_at           TIMESTAMPTZ NOT NULL;

-- 4. Commandes
CREATE TABLE commandes (
                            id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                            utilisateur_id   UUID NOT NULL REFERENCES utilisateurs(id) ON DELETE CASCADE,
                            produit_id       UUID NOT NULL REFERENCES produits(id) ON DELETE CASCADE,
                            statut          statut_commande NOT NULL DEFAULT 'en attente');