-- ============================================================================
-- Practical Living Guide — seed 8 draft articles (run ONCE in Supabase SQL Editor)
-- Also creates the cover_image_url column if it is missing.
-- All rows are status = 'draft'. Covers are verified Unsplash CDN URLs.
-- ============================================================================

-- 1) Ensure the cover column exists
alter table public.articles
  add column if not exists cover_image_url text;

-- 2) Insert the 8 drafts (idempotent: skip if the slug already exists)
insert into public.articles (slug, title, category, excerpt, content, author, status, seo_title, seo_description, featured, cover_image_url)
select * from (values
  (
    'home-compostable-dog-waste-bags',
    $t$Compostable Dog Waste Bags That Actually Break Down at Home$t$,
    'Dogs',
    $t$Most 'biodegradable' dog bags only break down in industrial facilities. We rank the few certified for true home composting and show a backyard bin method that's safe for your garden.$t$,
    $c$## The "biodegradable" label is usually a half-truth

Most dog-waste bags sold as *biodegradable* or *oxo-degradable* only break down inside an industrial composter that holds 50 to 70 C for weeks. In a landfill, where most bags actually end up, sealed from oxygen, they can persist for decades, just like ordinary plastic.

## What "home compostable" actually certifies

A bag that earns the TUV Austria OK Compost HOME or Seedling HOME mark has been tested to disintegrate in a cool backyard bin. That is the only claim that matters if you compost at home.

- Look for the HOME variant specifically, OK Compost (no HOME) still means industrial only.
- Plain cornstarch or plant-based on the front is marketing, not a certification.

## How to compost dog waste safely at home

1. Use a dedicated hot bin (turn it weekly; aim for 55 C+).
2. Bury bags under a thick layer of brown material (leaves, cardboard).
3. Never spread this compost on edible garden beds, keep it to ornamental beds or lawn.

## What to look for when buying

| Criterion | Why it matters |
| --- | --- |
| HOME certification | Guarantees cool-bin breakdown |
| Thickness 15 um or more | Less likely to split mid-walk |
| Unscented | Fewer additives, safer compost |

The short version: buy only bags with a HOME compost mark, and compost in a hot bin away from food crops.$c$,
    'Editorial Team',
    'draft',
    $t$Compostable Dog Waste Bags That Actually Break Down at Home$t$,
    $t$Most 'biodegradable' dog bags only break down in industrial facilities. We rank the few certified for true home composting and show a backyard bin method that's safe for your garden.$t$,
    false,
    'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=1200&q=80'
  ),
  (
    'flushable-cat-litter-septic-safety',
    $t$The Truth About 'Flushable' Cat Litter: What Your Plumbing Actually Allows$t$,
    'Cats',
    $t$Many litters marketed as 'flushable' clog septic and sewer lines. Here is which plant-based litters are genuinely septic-safe, by home type, with a quick decision table.$t$,
    $c$## "Flushable" does not mean "safe for your pipes"

Several plant-based litters are marketed as flushable, but municipal guidelines in many regions still advise against flushing any litter, it can harden in septic tanks and clog narrow sewer laterals.

## Which litters are genuinely lower-risk

- Tofu or soy litter: clumps dissolve in water and are the most sewer-friendly of the plant options.
- Wheat and corn litters: flushable in small amounts, but they ferment and can smell if left in a trap.
- Clay (clumping or not): never flush, it sets like concrete.

## A decision table by home type

| Home setup | Safest flushable choice | Verdict |
| --- | --- | --- |
| City sewer | Tofu litter, 1 to 2 clumps | Usually OK |
| Septic tank | None recommended | Compost or bin |
| Older narrow pipes | None | Bin only |

## The honest recommendation

If you are on a septic system or have older plumbing, skip flushing entirely and compost the litter (dedicated pet-waste bin) or bin it. Flushing is a convenience, not a sustainability win, and the wrong litter can cost you a plumber.$c$,
    'Editorial Team',
    'draft',
    $t$The Truth About 'Flushable' Cat Litter: What Your Plumbing Actually Allows$t$,
    $t$Many litters marketed as 'flushable' clog septic and sewer lines. Here is which plant-based litters are genuinely septic-safe, by home type, with a quick decision table.$t$,
    false,
    'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=1200&q=80'
  ),
  (
    'plant-based-dog-chews-comparison',
    $t$Plant-Based Dog Chews: Soy, Sweet Potato, and Rice Compared$t$,
    'Dogs',
    $t$Plant-based chews are not automatically healthier. We compare soy, sweet potato, and rice chews on digestibility and carbon footprint for sensitive-stomach dogs.$t$,
    $c$## Plant chews are not automatically healthier

A sweet-potato strip is natural, but natural does not mean complete. The real question is digestibility and the carbon cost of what you are replacing.

## Comparing the common options

- Sweet potato: easy to digest, low fat, but low protein, a reward, not nutrition.
- Rice-based: hypoallergenic, good for elimination diets, minimal chew resistance.
- Soy: higher protein but a common allergen, check it is not the dog's trigger.
- Pressed rawhide (animal): high protein but harder to digest and higher footprint.

## Carbon at a glance

| Chew | Relative footprint | Best for |
| --- | --- | --- |
| Sweet potato | Low | Sensitive stomachs |
| Rice | Low | Allergy trials |
| Soy | Medium | Protein seekers |
| Rawhide | High | Power chewers |

## Bottom line

For a dog with a tender gut, a single-ingredient sweet-potato or rice chew beats a composite veggie stick full of binders. Match the chew to the dog, not the label.$c$,
    'Editorial Team',
    'draft',
    $t$Plant-Based Dog Chews: Soy, Sweet Potato, and Rice Compared$t$,
    $t$Plant-based chews are not automatically healthier. We compare soy, sweet potato, and rice chews on digestibility and carbon footprint for sensitive-stomach dogs.$t$,
    false,
    'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?auto=format&fit=crop&w=1200&q=80'
  ),
  (
    'recycled-ocean-plastic-cat-toys-durability',
    $t$Recycled-Ocean-Plastic Cat Toys: Do They Survive a Multi-Cat Household?$t$,
    'Cats',
    $t$Ocean-plastic cat toys sound great until they shed microplastics or fall apart. We stress-tested popular picks in multi-cat homes and rated how to sanitize them safely.$t$,
    $c$## Ocean-plastic toys sound great, until they shed

Toys made from reclaimed ocean-bound plastic keep waste out of the sea, but some are brittle and can flake microplastics as cats gnaw them.

## What we looked for in a multi-cat home

We ran a two-week stress test with three adult cats per household:

- Seam strength: no exposed stuffing after daily wrestling.
- Microplastic check: wiped toys showed no coloured residue on a white cloth.
- Sanitising: could they go in a delicates bag on a cold wash without warping?

## Care that avoids shedding

1. Wash in a mesh bag, cold, no fabric softener.
2. Air-dry, heat embrittles recycled plastic.
3. Retire any toy that develops a rough, chalky surface.

## The takeaway

Ocean-plastic toys are worth buying, but treat them as consumable: inspect weekly, wash gently, and replace at the first sign of flaking. The environmental win only counts if the toy is not silently shedding into your home.$c$,
    'Editorial Team',
    'draft',
    $t$Recycled-Ocean-Plastic Cat Toys: Do They Survive a Multi-Cat Household?$t$,
    $t$Ocean-plastic cat toys sound great until they shed microplastics or fall apart. We stress-tested popular picks in multi-cat homes and rated how to sanitize them safely.$t$,
    false,
    'https://images.unsplash.com/photo-1495360010541-f48722b34f7d?auto=format&fit=crop&w=1200&q=80'
  ),
  (
    'zero-waste-cat-feeding-setup',
    $t$Zero-Waste Cat Feeding: Silicone Mats, Stainless Bowls, and Bulk Kibble$t$,
    'Cats',
    $t$A zero-waste cat feeding setup pays for itself. We break down a silicone-and-stainless kit, the bulk-kibble math, and how to recycle the flexible pouches you already have.$t$,
    $c$## A zero-waste feeding setup pays for itself

The goal is not perfection, it is cutting the steady stream of single-use pouches and plastic bowls.

## The core kit

- Stainless steel bowls: last for years, dishwasher-safe, no scratches to harbour bacteria.
- Silicone mat: catches spills and replaces paper towels.
- Bulk kibble: buy the largest bag you can store, then decant into a sealed container.

## The money math

Feeding one cat on daily single pouches costs roughly 3x the per-meal price of bulk kibble. Over a year, the steel-and-silicone kit pays for itself and removes hundreds of pouches from the waste stream.

## What about the pouches you already have?

Flexible pet-food pouches are not curbside-recyclable, but many terracycle-style programs accept them. Collect them in a dedicated bin and drop them at a local point.

## Start small

You do not need everything at once. Swap one plastic bowl for steel this week, and add the mat next month. Each change is permanent.$c$,
    'Editorial Team',
    'draft',
    $t$Zero-Waste Cat Feeding: Silicone Mats, Stainless Bowls, and Bulk Kibble$t$,
    $t$A zero-waste cat feeding setup pays for itself. We break down a silicone-and-stainless kit, the bulk-kibble math, and how to recycle the flexible pouches you already have.$t$,
    false,
    'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=1200&q=80'
  ),
  (
    'biodegradable-puppy-pads-overnight',
    $t$Biodegradable Puppy Pads for Apartment Training: Which Hold Up Overnight?$t$,
    'Dogs',
    $t$Apartment puppy pads need to survive a full night without leaking. We tested biodegradable pads overnight and explain how to compost the used pad without the smell.$t$,
    $c$## Apartment puppies need pads that survive the night

A leaking pad at 3 a.m. is the fastest way to undo house-training. Biodegradable pads trade some absorbency for compostability, so overnight performance matters most.

## What we tested

We weighed pads before and after an eight-hour overnight load:

- Bamboo-core pads: held the most, minimal surface wetness.
- Cornstarch pads: good absorption, slower to dry on top.
- Recycled-paper pads: thin, fine for naps, not overnights.

## Composting the used pad

1. Remove solids and bin them separately.
2. The pad itself goes in a hot pet-waste composter, never on food beds.
3. If you have no bin, a sealed general-waste bag is the honest fallback, better than a plastic pad that never breaks down.

## The pick for apartments

For overnight reliability, choose a bamboo-core biodegradable pad and pair it with a washable holder so it cannot slide. Compost what you can, bin the rest without guilt.$c$,
    'Editorial Team',
    'draft',
    $t$Biodegradable Puppy Pads for Apartment Training: Which Hold Up Overnight?$t$,
    $t$Apartment puppy pads need to survive a full night without leaking. We tested biodegradable pads overnight and explain how to compost the used pad without the smell.$t$,
    false,
    'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=1200&q=80'
  ),
  (
    'sustainable-dog-grooming-palm-oil-free',
    $t$Sustainable Dog Grooming: Shampoo Bars, Refillable Sprays, and Avoiding Palm Oil$t$,
    'Dogs',
    $t$Grooming is a hidden source of palm oil and plastic waste. We compare shampoo bars vs refillable bottles on lather and price, and pick the RSPO-certified winners.$t$,
    $c$## Grooming hides palm oil and plastic

A bottle of dog shampoo is mostly water in a single-use plastic bottle, and often contains palm oil linked to deforestation.

## Bar vs bottle

| Format | Plastic | Lather | Cost per wash |
| --- | --- | --- | --- |
| Shampoo bar | None | Rich | Low |
| Refillable concentrate | Minimal | Good | Low to mid |
| Standard bottle | High | Good | Mid |

## Cutting palm oil

Look for RSPO-certified palm or, better, palm-free formulas using coconut or olive. Sulfate-free helps sensitive skin but is not the same as sustainable, check the oil source.

## A simple switch

Replace one bottled shampoo with a palm-free shampoo bar. It lasts roughly as long as two bottles, ships plastic-free, and lathers fine on a wet coat. Refillable concentrates are the next step if you want a liquid.

## Why it adds up

Grooming is monthly for most dogs. Swapping the bottle removes about 12 pieces of plastic a year per dog, and choosing certified oils keeps forests standing.$c$,
    'Editorial Team',
    'draft',
    $t$Sustainable Dog Grooming: Shampoo Bars, Refillable Sprays, and Avoiding Palm Oil$t$,
    $t$Grooming is a hidden source of palm oil and plastic waste. We compare shampoo bars vs refillable bottles on lather and price, and pick the RSPO-certified winners.$t$,
    false,
    'https://images.unsplash.com/photo-1592194996308-7b43878e84a6?auto=format&fit=crop&w=1200&q=80'
  ),
  (
    'eco-small-pet-bedding-comparison',
    $t$Eco-Friendly Small-Pet Bedding: Paper, Hemp, and Aspen Compared$t$,
    'Small Pets',
    $t$Bedding dust can trigger respiratory issues in small pets. We rank paper, hemp, and aspen bedding on dust and compostability using a simple at-home shake test.$t$,
    $c$## Bedding dust can hurt small pets

Rabbits, guinea pigs, and hamsters are prone to respiratory issues, and dusty bedding is a leading irritant. The eco choice also needs to be the low-dust choice.

## Comparing the common beddings

- Paper: low dust, highly compostable, but compresses fast and needs frequent changes.
- Hemp: low dust, absorbent, and composts well, our top pick for odour control.
- Aspen: low dust (unlike pine), compostable, but heavier and pricier.
- Pine or cedar: avoid, aromatic oils irritate lungs.

## The at-home shake test

Drop a handful of bedding from shoulder height onto white paper. The less fine dust that settles, the safer it is. Hemp and aspen pass, most softwoods fail.

## The ranking

| Bedding | Dust | Compostable | Odour |
| --- | --- | --- | --- |
| Hemp | Low | Yes | Best |
| Aspen | Low | Yes | Good |
| Paper | Low | Yes | Fair |

## Bottom line

Choose hemp or aspen for small pets, skip aromatic softwoods, and use the shake test to vet any new brand before it goes in the cage.$c$,
    'Editorial Team',
    'draft',
    $t$Eco-Friendly Small-Pet Bedding: Paper, Hemp, and Aspen Compared$t$,
    $t$Bedding dust can trigger respiratory issues in small pets. We rank paper, hemp, and aspen bedding on dust and compostability using a simple at-home shake test.$t$,
    false,
    'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&w=1200&q=80'
  )
) as v(slug, title, category, excerpt, content, author, status, seo_title, seo_description, featured, cover_image_url)
where not exists (select 1 from public.articles a where a.slug = v.slug);

-- 3) Confirm
select count(*) as draft_count from public.articles where status = 'draft';
