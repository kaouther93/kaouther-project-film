-- Insérer quelques données de démonstration pour ShopSmart

-- Ajouter des catégories
INSERT INTO categories (name, slug, description, image_url) VALUES
('Soins du visage', 'soins-visage', 'Produits pour le soin et la beauté du visage', 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400'),
('Soins du corps', 'soins-corps', 'Produits pour hydrater et prendre soin du corps', 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400'),
('Maquillage', 'maquillage', 'Produits de maquillage et cosmétiques', 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400'),
('Parfums', 'parfums', 'Fragrances et parfums pour homme et femme', 'https://images.unsplash.com/photo-1588405748880-12d1d2a59d32?w=400'),
('Cheveux', 'cheveux', 'Soins capillaires et produits pour cheveux', 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=400');

-- Ajouter des marques
INSERT INTO brands (name, description, logo_url) VALUES
('Clarins', 'Marque française de cosmétiques haut de gamme', 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=200'),
('L''Oréal', 'Leader mondial de la beauté', 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=200'),
('Estée Lauder', 'Marque de cosmétiques de luxe américaine', 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=200'),
('Nivea', 'Marque allemande de soins de la peau', 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=200'),
('Chanel', 'Maison de haute couture française', 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=200');

-- Ajouter des produits
INSERT INTO products (name, description, price, discount_price, category_id, brand_id, stock_quantity, image_url, images, ingredients, usage_instructions, skin_type) VALUES
(
  'Crème Hydratante Visage',
  'Crème hydratante quotidienne pour tous types de peau. Formule enrichie en acide hyaluronique.',
  29.90,
  24.90,
  (SELECT id FROM categories WHERE slug = 'soins-visage'),
  (SELECT id FROM brands WHERE name = 'Clarins'),
  50,
  'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=500',
  ARRAY['https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=500', 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500'],
  'Aqua, Glycerin, Hyaluronic Acid, Vitamin E',
  'Appliquer matin et soir sur une peau propre en massant délicatement.',
  ARRAY['normale', 'sèche', 'sensible']
),
(
  'Sérum Anti-Âge',
  'Sérum concentré en rétinol et vitamine C pour lutter contre les signes de l''âge.',
  79.90,
  69.90,
  (SELECT id FROM categories WHERE slug = 'soins-visage'),
  (SELECT id FROM brands WHERE name = 'Estée Lauder'),
  30,
  'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500',
  ARRAY['https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500'],
  'Rétinol, Vitamine C, Peptides, Acide Hyaluronique',
  'Utiliser le soir uniquement. Appliquer 2-3 gouttes sur le visage.',
  ARRAY['mature', 'normale']
),
(
  'Lait Corps Hydratant',
  'Lait corporel nourrissant aux huiles essentielles pour une peau douce et parfumée.',
  19.90,
  NULL,
  (SELECT id FROM categories WHERE slug = 'soins-corps'),
  (SELECT id FROM brands WHERE name = 'Nivea'),
  75,
  'https://images.unsplash.com/photo-1556228354-1ad1e17a8c5c?w=500',
  ARRAY['https://images.unsplash.com/photo-1556228354-1ad1e17a8c5c?w=500'],
  'Beurre de karité, Huile d''amande douce, Vitamine E',
  'Appliquer sur corps sec après la douche en massant.',
  ARRAY['normale', 'sèche']
),
(
  'Rouge à Lèvres Mat',
  'Rouge à lèvres longue tenue avec fini mat. Disponible en plusieurs teintes.',
  22.50,
  18.00,
  (SELECT id FROM categories WHERE slug = 'maquillage'),
  (SELECT id FROM brands WHERE name = 'L''Oréal'),
  100,
  'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=500',
  ARRAY['https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=500'],
  'Cires végétales, Pigments naturels, Vitamine E',
  'Appliquer directement sur les lèvres en partant du centre.',
  ARRAY['normale']
),
(
  'Parfum Femme Élégance',
  'Eau de parfum florale et sophistiquée. Notes de jasmin et de rose.',
  89.90,
  79.90,
  (SELECT id FROM categories WHERE slug = 'parfums'),
  (SELECT id FROM brands WHERE name = 'Chanel'),
  25,
  'https://images.unsplash.com/photo-1588405748880-12d1d2a59d32?w=500',
  ARRAY['https://images.unsplash.com/photo-1588405748880-12d1d2a59d32?w=500'],
  'Alcohol Denat, Jasmin, Rose, Musc',
  'Vaporiser sur les points de pulsation.',
  ARRAY['normale']
),
(
  'Shampoing Réparateur',
  'Shampoing pour cheveux abîmés et colorés. Formule sans sulfate.',
  16.90,
  NULL,
  (SELECT id FROM categories WHERE slug = 'cheveux'),
  (SELECT id FROM brands WHERE name = 'L''Oréal'),
  60,
  'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=500',
  ARRAY['https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=500'],
  'Kératine, Huile d''argan, Provitamine B5',
  'Appliquer sur cheveux mouillés, masser et rincer.',
  ARRAY['normale']
);