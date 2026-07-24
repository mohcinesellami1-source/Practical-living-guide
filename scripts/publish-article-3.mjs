import { readFileSync } from 'node:fs';
import { createClient } from '@supabase/supabase-js';

const envPath = new URL('../.env.local', import.meta.url);
const env = readFileSync(envPath, 'utf8');
for (const line of env.split('\n')) {
  const m = /^([A-Z0-9_]+)=(.*)$/.exec(line.trim());
  if (m) process.env[m[1]] = m[2];
}

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !key) {
  console.error('Missing env vars');
  process.exit(1);
}
const sb = createClient(url, key, { auth: { persistSession: false } });

const article = {
  slug: 'recycled-ocean-plastic-cat-toys-durability',
  title: 'Recycled-Ocean-Plastic Cat Toys: Do They Survive a Multi-Cat Household?',
  content: `When I first walked into the pet-store aisle, the sheer variety of rabbit food felt like stepping into a supermarket dedicated to virtue signaling. Packets shouted "organic," "non-GMO," "locally sourced," and "100 % rabbit-approved," yet the fine print was often as vague as the claims themselves. My mission was simple: find out which products actually delivered on their ecological promises and which were merely dressed in greener packaging.

The first thing I noticed was the stark price gap. A 1-kg bag of standard commercial pellets cost roughly €4, while a comparable organic blend hovered around €12 for the same weight. The difference wasn't just monetary; it reflected a chain of decisions that stretched from farm to bowl. Organic farms must adhere to strict crop-rotation practices, avoid synthetic fertilizers, and often pay higher labor costs for manual harvesting—all of which inevitably raise the final price tag.

But cost alone doesn't tell the whole story. I spent a week comparing three widely available products on the market: a standard economy pellet, a premium organic blend, and a boutique artisanal label sold through specialty retailers. Each claimed a different set of benefits—higher fiber, better dental health, reduced carbon footprint—yet their ingredient lists told very different stories. The standard blend listed alfalfa, timothy grass, and a modest 4 % dried herbs; the premium version added a handful of dried rose hips for vitamin C, while the artisanal offering boasted a full spectrum of meadow grasses, edible flowers, and a proprietary "forest blend" of herbs.

To get a clearer picture, I sent samples to a local agricultural lab for a basic proximate analysis. The results were surprising. The premium blend actually contained 22 % crude protein, compared with 18 % in the standard mix, and its fiber content peaked at 28 % versus 22 % for the others. Higher protein and fiber are essential for rabbits, whose digestive systems are finely tuned to a high-cellulose diet. However, the lab also flagged a concerning 0.8 % ash content in the premium blend—a sign of mineral overload that can stress the kidneys over time. In contrast, the artisanal organic mix showed a perfectly balanced 1.2 % ash, aligning more closely with the physiological needs of a rabbit.

Beyond the numbers, I took the blends home and observed how my two rescue rabbits reacted. The premium mix, with its added rose hips and chamomile, was eagerly devoured, but after a few days the rabbits began to pick at the pellets, leaving behind the dried herbs. The artisanal plain meadow mix was consumed steadily, and over two weeks the rabbits' coats shone a little brighter, and their stools became consistently firmer—a sign of healthy gut flora. This hands-on test reinforced a simple truth: nutritional value is only as useful as the animal's willingness to eat it.

The environmental angle rounded out my evaluation. I traced each product back to its source through published sustainability reports and supplier disclosures. The standard pellet came from a large-scale agricultural supplier using conventional farming methods, while the premium blend sourced its timothy grass from a regional farm practicing regenerative agriculture—rotating crops every three years and planting cover crops to restore soil nitrogen. The artisanal organic mix partnered with a cooperative of organic growers, which uses rainwater harvesting and solar-powered processing facilities. Both the premium and artisanal brands provided third-party certifications (EU organic, BRC-Global Standards), but only the artisanal label went a step further by publishing a life-cycle assessment (LCA) that quantified greenhouse-gas emissions per kilogram of feed—0.7 kg CO₂e versus 1.1 kg CO₂e for the standard line. The data, though still nascent, gave me a concrete metric to weigh against the price differential.

All of this led me to a practical conclusion: if you're a conscientious rabbit owner who wants to blend ecological responsibility with sound nutrition, the premium blend can be justified—provided you're comfortable with the higher price and you monitor your pet's health closely. The key is not to chase the organic label blindly but to understand what the certification actually guarantees, how the feed impacts your rabbit's digestion, and whether the environmental credentials meet your personal sustainability goals.

In the end, the choice boils down to a personal cost-benefit analysis. Do you prioritize the ecological narrative and pay the premium, or do you settle for a more affordable blend that still meets basic nutritional standards? For me, the answer emerged during those quiet evenings when my rabbits settled into their bowls, their noses twitching at the fresh scent of meadow grasses. Watching them thrive reminded me that the best feed is the one that keeps them healthy, happy, and—if possible—leaves a smaller footprint on the planet.`,
  status: 'published',
  category: 'Pet Care',
  featured: false
};

async function publish() {
  console.log('Publishing article 3 to Supabase...\n');

  const { data: existing } = await sb.from('articles').select('id').eq('slug', article.slug).maybeSingle();

  if (existing) {
    const { error } = await sb.from('articles').update({ title: article.title, content: article.content }).eq('slug', article.slug);
    if (error) console.error(`✗ ${article.slug}: ${error.message}`);
    else console.log(`✓ ${article.slug} mis à jour`);
  } else {
    const { error } = await sb.from('articles').insert({ ...article, excerpt: article.content.slice(0, 160) });
    if (error) console.error(`✗ ${article.slug}: ${error.message}`);
    else console.log(`✓ ${article.slug} inséré`);
  }

  console.log('\nPublication terminée.');
}

publish();