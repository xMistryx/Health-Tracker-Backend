INSERT INTO recipes (title, image_url, description, ingredients, instructions, created_by, creator_id)
VALUES
-- Recipe 1
('LIGHT MANGO CHEESECAKE',
 'https://saschafitness.com/cdn/shop/articles/Cheescake_de_mango.png?v=1648072209&width=550',
 'A light and fruity cheesecake made with Greek yogurt and mango. FROM SASCHA FITNESS',
 '[
   "1 package of Maria cookies (can be sugar-free)",
   "4 tablespoons ghee or clarified butter",
   "½ tsp cinnamon",
   "½ light cream cheese bar",
   "¾ cup unsweetened Greek yogurt",
   "¼ cup almond milk (if necessary)",
   "¼ cup water",
   "15 g unflavored gelatin",
   "½ cup chopped mango",
   "Sweetener to taste"
 ]',
 '1. Crush the Maria cookies and mix with cinnamon and ghee or butter. Press into mold as base.\n
 2. Prepare the gelatin with hot water.\n
 3. Blend cream cheese, Greek yogurt, sweetener, and gelatin until smooth. Add almond milk if too thick.\n
 4. Pour mixture into mold and refrigerate at least 3 hours.\n
 5. Decorate with cookie crumbs and mango pieces before serving.',
 'TendApp', NULL),

-- Recipe 2
('CHOCOLATE BROWNIE WITH COCONUT',
'https://saschafitness.com/cdn/shop/articles/top-view-delicious-brownies-arrangement.png?v=1648661757&width=550',
 'A healthy chocolate and coconut brownie, perfect for sharing with family. FROM SASCHA FITNESS',
 '[
   "2 eggs",
   "Grated coconut",
   "Sugar-free chocolate chips",
   "¼ cup peanut butter",
   "1 tbsp coconut oil",
   "1 tsp vanilla",
   "½ cup coconut flour",
   "½ cup oat or almond flour",
   "¼ cup cocoa powder",
   "⅓ cup sweetener",
   "1 tsp baking powder",
   "1 tsp cinnamon",
   "1 pinch salt",
   "1 cup almond milk"
 ]',
 '1. Preheat oven to 375ºF.\n
 2. Mix eggs, peanut butter, coconut oil, and vanilla in a bowl.\n
 3. Add coconut flour, oat/almond flour, cocoa, sweetener, baking powder, salt, almond milk, and cinnamon. Mix until smooth.\n
 4. Grease a brownie pan with nonstick spray and pour mixture.\n
 5. Top with chocolate chips and grated coconut.\n
 6. Bake 30–35 minutes, let cool, then cut and serve.',
 'TendApp', NULL),

 -- Recipe 3
('UNCOOKED WHEY PROTEIN BARS',
'https://saschafitness.com/cdn/shop/articles/SASCHA_BARRAS.png?v=1655317133&width=550',
 'Healthy no-bake protein bars with chocolate and almonds. FROM SASCHA FITNESS',
 '[
   "2 scoops peanut butter protein powder",
   "2 cups raw almonds",
   "¾ cup date syrup OR 1 cup seedless dates",
   "½ cup cocoa powder",
   "½ cup peanut butter",
   "1 bar unsweetened dark chocolate",
   "2 tbsp coconut oil"
 ]',
 '1. Prepare a silicone mold or line a pan with baking paper.\n
 2. In a food processor, blend almonds, date syrup (or dates), cocoa powder, peanut butter, and protein powder until smooth.\n
 3. Press mixture into mold and refrigerate while preparing topping.\n
 4. Melt chocolate with coconut oil (microwave or bain-marie), add 1 tbsp peanut butter, mix well.\n
 5. Spread chocolate mixture on top, sprinkle with chopped almonds and sea salt (optional).\n
 6. Refrigerate until firm, cut into bars, and store in the fridge.',
 'TendApp', NULL), 

-- Recipe 4
('OATMEAL TORTILLAS WITH ONLY 2 INGREDIENTS',
'https://imgs.search.brave.com/x9NVZ0YEgQvd6gZSDHPoTeVcg9k-YiFfLN_BJKAc5vI/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/Z29lYXRncmVlbi5j/b20vd3AtY29udGVu/dC91cGxvYWRzLzIw/MjQvMDkvMi1pbmdy/ZWRpZW50LW9hdC10/b3J0aWxsYXMtb2F0/bWVhbC13cmFwcy1o/b21lbWFkZS11bmxl/YXZlbmVkLXJlY2lw/ZS1nbHV0ZW4tZnJl/ZS5qcGc',
 'Simple and healthy oat tortillas made with just oats and water. FROM SASCHA FITNESS',
 '[
   "1 cup rolled oats",
   "⅔ cup water",
   "1 tbsp chia, salt, or spices (optional)"
 ]',
 '1. Mix oats and water in a bowl, let rest for 5 minutes.\n
 2. Heat a pan over medium-high, spray with nonstick spray.\n
 3. Spread mixture into a tortilla shape, cook until golden on both sides.\n
 4. Alternatively, cook in a sandwich maker or air fryer for extra crispiness.\n
 5. Serve with avocado, egg, cheese, or any topping you like.',
 'TendApp', NULL),

-- Recipe 5
('FLAXSEED BREAD',
'https://saschafitness.com/cdn/shop/articles/Sascha_Fitness_Pan_de_Linaza.png?v=1644607505&width=550',
 'A high-fiber, low-carb bread made with flaxseed flour. FROM SASCHA FITNESS',
 '[
   "3 eggs",
   "1 cup water",
   "⅓ cup avocado oil or melted butter",
   "1 tbsp sugar-free pancake syrup or honey",
   "2 cups ground flaxseed",
   "2 tsp baking powder",
   "1 tbsp apple cider vinegar",
   "½ tsp pink salt"
 ]',
 '1. Preheat oven to 350°F.\n
 2. Grease or line a bread loaf pan.\n
 3. Blend all ingredients in a blender/processor for about 1 minute.\n
 4. Pour mixture into the pan, sprinkle sesame seeds on top if desired.\n
 5. Bake for ~50 minutes, let cool completely before slicing.',
 'TendApp', NULL),

-- Recipe 6
('WHEY PROTEIN FLAN',
'https://saschafitness.com/cdn/shop/articles/QuesilloSaschaFitness.png?v=1640377292&width=550',
 'A creamy caramel protein flan baked in a bain-marie. FROM SASCHA FITNESS',
 '[
   "⅓ cup pancake syrup or maple",
   "¼ cup granulated sweetener",
   "2 cups almond milk",
   "2 scoops caramel protein powder",
   "1 tsp vanilla",
   "5 eggs"
 ]',
 '1. Preheat oven to 350°F.\n
 2. Make caramel: boil pancake syrup and sweetener until thick, pour into mold.\n
 3. Blend almond milk, protein powder, vanilla, eggs, and extra sweetener until smooth.\n
 4. Pour mixture into mold, cover, and bake in a bain-marie for ~1.5 hours.\n
 5. Test with knife: if it comes out clean, flan is ready. Cool before serving.',
 'TendApp', NULL),

 -- Recipe 7
('PROTEIN TRUFFLES',
'https://saschafitness.com/cdn/shop/articles/SaschaFitnessTrufas-copy.png?v=1637253735&width=550',
 'A delicious, quick and guilt-free snack. FROM SASCHA FITNESS',
 '[
   "2 scoops protein powder (any flavor)",
   "⅓ cup peanut or almond butter",
   "2 tbsp cocoa powder",
   "2 sachets sweetener",
   "¼ cup almond milk",
   "¼ cup chopped walnuts",
   "¼ cup sugar-free chocolate chips"
 ]',
 '1. Mix all ingredients in a bowl until compact and smooth.\n
 2. Add more milk if needed.\n
 3. Shape mixture into small balls and roll in cocoa powder.\n
 4. Refrigerate until firm. Makes ~12 truffles.',
 'TendApp', NULL),

-- Recipe 8
('EXPRESS ICE CREAM WITH ONLY 2 INGREDIENTS',
'https://saschafitness.com/cdn/shop/articles/HeladoProteicoSascha.png?v=1637784742&width=550',
 'Refreshing, creamy ice cream made in minutes with just yogurt and protein powder. FROM SASCHA FITNESS',
 '[
   "1 scoop whey protein isolate (any flavor)",
   "½ cup Greek yogurt"
 ]',
 '1. Mix whey protein and Greek yogurt until smooth.\n
 2. Refrigerate 30–35 minutes until cold and ice-cream-like.\n
 3. Serve with toppings like granola, peanut butter, or almonds.',
 'TendApp', NULL),

-- Recipe 9
('HEALTHY BLUEBERRY DESSERT',
'https://saschafitness.com/cdn/shop/articles/SaschaArandonos.jpg?v=1638986506&width=550',
 'A warm and fruity baked blueberry dessert with a fluffy dough topping. FROM SASCHA FITNESS',
 '[
   "4 cups blueberries",
   "¾ cup sweetener",
   "1 tsp lemon zest",
   "1 cup flour (lupine, oats, coconut, or mix)",
   "½ cup sweetener",
   "¼ tsp salt",
   "1 tsp cinnamon",
   "2 tsp baking powder",
   "¾ cup vegetable milk",
   "3 tbsp butter"
 ]',
 '1. Preheat oven to 375°F. Melt butter in a glass baking dish.\n
 2. Mix blueberries with sweetener and lemon zest.\n
 3. In a bowl, combine flour, sweetener, salt, cinnamon, and baking powder. Add milk, mix until smooth.\n
 4. Pour blueberry mixture into baking dish, spread dough on top.\n
 5. Bake 40 minutes until golden. Serve warm.',
 'TendApp', NULL),

-- Recipe 10
('COLD CUCUMBER AND AVOCADO SOUP',
'https://saschafitness.com/cdn/shop/articles/saschafitness-sopa-fria-pepino-aguacate-receta-alimentacion-saludable.jpg?v=1623389898&width=3000',
 'A refreshing and low-carb soup made with cucumber, avocado, and herbs. FROM SASCHA FITNESS',
 '[
   "2 cups water",
   "1 kilo cucumbers (peeled, seeded, chopped)",
   "2 ripe avocados",
   "3 tbsp lemon juice",
   "¼ tsp agave honey",
   "1 tsp sea salt",
   "Pinch of cayenne pepper",
   "1 tbsp chopped fresh mint",
   "1 tbsp chopped fresh cilantro"
 ]',
 '1. Blend 1 cup water with cucumbers, avocado, lemon juice, honey, salt, and cayenne until smooth.\n
 2. Add more water if needed.\n
 3. Chill for 2 hours before serving.\n
 4. Garnish with mint and cilantro.',
 'TendApp', NULL),

-- Recipe 11
('CHICKPEA PASTA WITH VEGETABLES AND CHICKEN',
'https://saschafitness.com/cdn/shop/articles/mgg-vitchakorn-98Xi5vMGKck-unsplash-1-scaled.jpg?v=1610394448&width=2000',
 'A high-protein, fiber-rich pasta dish with chicken and vegetables. FROM SASCHA FITNESS',
 '[
   "2 cups cooked chickpea pasta",
   "1½ chicken breasts (cooked)",
   "Spinach",
   "Vegetables of choice",
   "Garlic",
   "Olive oil",
   "Pink salt"
 ]',
 '1. Heat garlic and olive oil in a pan.\n
 2. Add spinach and sauté until wilted.\n
 3. Add vegetables and cooked chicken.\n
 4. Stir in chickpea pasta and a little more olive oil spray.\n
 5. Season with salt and serve warm.',
 'TendApp', NULL),

-- Recipe 12
('DALGONA COFFEE (FIT VERSION)',
'https://saschafitness.com/cdn/shop/articles/dalgona-coffee-5489306_1920.png?v=1627306130&width=320',
 'A fluffy whipped coffee served over almond milk, sweetened with Monkfruit. FROM SASCHA FITNESS',
 '[
   "2 tbsp instant coffee",
   "2 tbsp Monkfruit sweetener",
   "1 tbsp hot water",
   "1 glass ice",
   "¾ glass almond milk"
 ]',
 '1. In a bowl, whisk coffee, sweetener, and hot water until fluffy and light.\n
 2. Fill a glass with ice and almond milk.\n
 3. Spoon whipped coffee on top and enjoy.',
 'TendApp', NULL);
