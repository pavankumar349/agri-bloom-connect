
import { useState } from "react";
import { PageHeader } from "@/components/ui/page-header";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface GuideCategory {
  title: string;
  value: string;
  icon: React.ReactNode;
  guides: Guide[];
}

interface Guide {
  id: string;
  title: string;
  category: string;
  description: string;
  content: {
    sections: {
      title: string;
      text: string;
    }[];
  };
}

// Sample guides data
const GUIDE_CATEGORIES: GuideCategory[] = [
  {
    title: "Crop Growing",
    value: "crops",
    icon: "🌱",
    guides: [
      {
        id: "tomatoes",
        title: "Growing Tomatoes",
        category: "crops",
        description: "A comprehensive guide to growing healthy tomatoes",
        content: {
          sections: [
            {
              title: "Soil Preparation",
              text: "Tomatoes thrive in well-draining soil with a pH between 6.0 and 6.8. Before planting, amend your soil with compost or well-rotted manure to a depth of 12 inches. This adds essential nutrients and improves soil structure. For container growing, use a high-quality potting mix specifically formulated for vegetables.",
            },
            {
              title: "Planting",
              text: "Plant tomato seedlings deep, burying two-thirds of the stem, which will develop additional roots. Space plants 24-36 inches apart in rows 4-5 feet apart. For indeterminate varieties, install stakes or cages at planting time to avoid root damage later.",
            },
            {
              title: "Watering",
              text: "Water deeply and consistently, providing 1-2 inches of water weekly. Avoid overhead watering, which can promote disease. Mulch around plants to maintain soil moisture and suppress weeds. During fruit development, consistent moisture is crucial to prevent blossom end rot and fruit cracking.",
            },
            {
              title: "Fertilizing",
              text: "Apply a balanced fertilizer (10-10-10) at planting time. Once fruits begin to set, switch to a fertilizer higher in phosphorus and potassium but lower in nitrogen (5-10-10) to encourage fruit production rather than excessive leaf growth. Side-dress plants every 4-6 weeks during the growing season.",
            },
            {
              title: "Pest and Disease Management",
              text: "Common tomato pests include hornworms, aphids, and whiteflies. Diseases include early blight, late blight, and septoria leaf spot. Maintain good air circulation by pruning lower branches and removing suckers. Practice crop rotation to reduce disease pressure. Consider resistant varieties for problematic diseases in your area.",
            },
            {
              title: "Harvesting",
              text: "Harvest tomatoes when they have developed full color but still feel firm when gently squeezed. For best flavor, pick tomatoes in the morning when temperatures are cooler. To harvest, cut fruit from the vine rather than pulling to avoid damaging the plant.",
            },
          ],
        },
      },
      {
        id: "potatoes",
        title: "Growing Potatoes",
        category: "crops",
        description: "Essential tips for growing potatoes successfully",
        content: {
          sections: [
            {
              title: "Seed Preparation",
              text: "Start with certified disease-free seed potatoes. Cut large seed potatoes into pieces with at least 2-3 eyes per piece. Allow cut pieces to cure for 1-2 days before planting to form a protective callus over the cut surface.",
            },
            {
              title: "Planting",
              text: "Plant potatoes when soil temperatures reach at least 45°F (7°C). Plant seed potatoes 4-6 inches deep, 12 inches apart, in rows 2-3 feet apart. For an early harvest, potatoes can be sprouted indoors (chitted) 2-4 weeks before planting.",
            },
            {
              title: "Hilling",
              text: "When plants reach about 8 inches tall, begin hilling by mounding soil around the base of the plants, leaving just the top few inches exposed. Continue hilling every few weeks as plants grow. This prevents tubers from being exposed to sunlight, which causes greening and solanine production.",
            },
            {
              title: "Watering and Fertilizing",
              text: "Potatoes need consistent moisture, especially during tuber formation. Apply 1-2 inches of water weekly. Use a balanced fertilizer at planting time, then switch to a fertilizer with higher phosphorus and potassium when plants begin flowering, which indicates tuber formation has begun.",
            },
            {
              title: "Pest and Disease Management",
              text: "Colorado potato beetles are a common pest; handpick or use organic insecticides. Late blight can be devastating; maintain good air circulation and avoid overhead watering. Practice crop rotation (3-4 years) to prevent buildup of soil-borne diseases and pests.",
            },
            {
              title: "Harvesting",
              text: "New potatoes can be harvested about 2-3 weeks after plants flower by carefully reaching into the soil without disturbing the plant. For mature potatoes, wait until vines die back naturally or cut them back 2-3 weeks before harvest to toughen skins. Cure freshly harvested mature potatoes in a cool, dark place for 1-2 weeks before storing.",
            },
          ],
        },
      },
      {
        id: "corn",
        title: "Growing Corn",
        category: "crops",
        description: "How to grow sweet corn in home gardens",
        content: {
          sections: [
            {
              title: "Soil Requirements",
              text: "Corn thrives in well-draining, fertile soil with a pH between 6.0 and 6.8. Incorporate compost or aged manure before planting to improve soil structure and fertility.",
            },
            {
              title: "Planting",
              text: "Plant corn when soil temperatures reach at least 60°F (16°C). Plant seeds 1-2 inches deep, 4-6 inches apart, in blocks of at least 4 rows rather than single rows to ensure proper pollination. Thin seedlings to 8-12 inches apart when they reach 4 inches tall.",
            },
            {
              title: "Watering and Fertilizing",
              text: "Corn requires consistent moisture, especially during tasseling, silking, and ear development. Apply 1-1.5 inches of water weekly. Corn is a heavy feeder; apply a high-nitrogen fertilizer when plants are 8 inches tall and again when they begin to produce tassels.",
            },
            {
              title: "Pollination",
              text: "Corn is wind-pollinated; planting in blocks rather than long rows improves pollination. Hand-pollinate by shaking stalks on calm days or by collecting pollen from tassels and dusting it onto silks.",
            },
            {
              title: "Pest Management",
              text: "Common pests include corn earworms, European corn borers, and raccoons. Apply several drops of mineral oil to silk channels after pollination to deter earworms. Use floating row covers until tasseling to protect from corn borers. Install fencing or other barriers to deter raccoons and other wildlife.",
            },
            {
              title: "Harvesting",
              text: "Harvest sweet corn when kernels are plump and milky when punctured, typically 18-24 days after silk appears. The silk should be dry and brown, but not the husk. To harvest, grasp the ear firmly and pull down with a twisting motion.",
            },
          ],
        },
      },
    ],
  },
  {
    title: "Soil Health",
    value: "soil",
    icon: "🌍",
    guides: [
      {
        id: "composting",
        title: "Composting Basics",
        category: "soil",
        description: "Learn how to create nutrient-rich compost for your garden",
        content: {
          sections: [
            {
              title: "What is Composting?",
              text: "Composting is the controlled decomposition of organic materials into a nutrient-rich soil amendment. It recycles kitchen and yard waste, reduces landfill contributions, and creates a valuable resource for improving soil structure, fertility, and microbial activity.",
            },
            {
              title: "Getting Started",
              text: "Choose a composting system: open pile, bin, tumbler, or vermicomposting (worm composting). Select a location with partial shade and good drainage. Start with a mix of 'brown' carbon-rich materials (dry leaves, straw, paper) and 'green' nitrogen-rich materials (kitchen scraps, fresh grass clippings, plant trimmings).",
            },
            {
              title: "The Right Balance",
              text: "Maintain a carbon-to-nitrogen ratio of approximately 30:1. In practical terms, aim for about 3 parts 'browns' to 1 part 'greens'. Chop or shred materials to speed decomposition. Keep the pile as moist as a wrung-out sponge—neither soggy nor dry.",
            },
            {
              title: "What to Compost",
              text: "DO compost: fruit and vegetable scraps, coffee grounds and filters, tea bags, eggshells, yard trimmings, grass clippings, dry leaves, newspaper, cardboard, and wood chips. DON'T compost: meat, fish, dairy, oils, pet waste, diseased plants, or pressure-treated wood.",
            },
            {
              title: "Maintaining Your Compost",
              text: "Turn or aerate your compost regularly (every 1-2 weeks) to provide oxygen for decomposers and distribute moisture. In cold climates, decomposition slows in winter but doesn't stop completely. Keep adding materials year-round.",
            },
            {
              title: "Troubleshooting",
              text: "Foul odor: Too much moisture or too many 'greens'—add 'browns' and turn the pile. Pile not heating up: Too dry, too small, or not enough nitrogen—add water, more materials, or 'greens'. Pests: Bury food scraps in the center of the pile and avoid composting meats, oils, and dairy.",
            },
            {
              title: "Harvesting Compost",
              text: "Compost is ready when it's dark brown, crumbly, and smells earthy (like forest soil). Depending on conditions and maintenance, this takes 2-12 months. Screen finished compost if desired to remove larger pieces, which can go back into a new pile.",
            },
            {
              title: "Using Compost",
              text: "Mix compost into garden soil before planting (2-4 inches worked into the top 6-8 inches of soil). Use as a top dressing around established plants (1-2 inches). Add to potting mixes (up to 25% by volume). Make compost tea by steeping compost in water for liquid fertilizer.",
            },
          ],
        },
      },
      {
        id: "soil-testing",
        title: "Soil Testing Guide",
        category: "soil",
        description: "How to test your soil and interpret results",
        content: {
          sections: [
            {
              title: "Why Test Your Soil?",
              text: "Soil testing provides crucial information about nutrient levels, pH, and composition, helping you make informed decisions about amendments and fertilizers. It prevents over-application of nutrients, which can waste money and harm the environment.",
            },
            {
              title: "Types of Soil Tests",
              text: "Home test kits: Provide basic information about pH and major nutrients (N-P-K). Laboratory tests: Offer comprehensive analysis including micronutrients, organic matter content, and specific recommendations. Extension service tests: Professional testing through local agricultural extension offices, often at reduced cost.",
            },
            {
              title: "When to Test",
              text: "Test soil at least 2-3 months before planting to allow time for amendments. Fall is ideal for most regions. Test established gardens every 2-3 years, or annually if intensive planting or specific crop requirements.",
            },
            {
              title: "Taking a Soil Sample",
              text: "Use clean tools to avoid contamination. Take samples from 6-8 inches deep for garden beds, 3-4 inches for lawns. Collect multiple samples (5-10) from the area and mix thoroughly. Remove stones, roots, and debris. Air-dry the sample if sending to a lab. Different areas (vegetable garden, lawn, flower beds) should be sampled separately.",
            },
            {
              title: "Understanding pH",
              text: "pH measures soil acidity/alkalinity on a scale of 0-14, with 7 being neutral. Most plants prefer pH 6.0-7.0. To raise pH (make less acidic), add limestone. To lower pH (make more acidic), add sulfur, aluminum sulfate, or organic materials like pine needles or peat moss. Most amendments take months to affect pH.",
            },
            {
              title: "Interpreting Nutrient Results",
              text: "Nitrogen (N): Promotes leafy growth. Phosphorus (P): Important for root development and flowering. Potassium (K): Enhances overall plant health and disease resistance. Secondary nutrients (Ca, Mg, S) and micronutrients (Fe, Zn, Mn, Cu, B, Mo) are needed in smaller amounts but are equally essential for plant health.",
            },
            {
              title: "Understanding Soil Texture",
              text: "Soil texture (proportion of sand, silt, and clay) affects drainage, nutrient retention, and workability. Testing can help identify your soil texture class. Clay soils: Add organic matter to improve drainage and workability. Sandy soils: Add organic matter to improve water and nutrient retention. Loam soils: Balanced mixture ideal for most plants; maintain with regular organic matter additions.",
            },
            {
              title: "Acting on Test Results",
              text: "Follow specific recommendations provided with your test results. Make amendments gradually over time rather than all at once. Document changes and results for future reference. Consider follow-up testing after major amendments to track improvements.",
            },
          ],
        },
      },
    ],
  },
  {
    title: "Pest Control",
    value: "pests",
    icon: "🐞",
    guides: [
      {
        id: "organic-pest-control",
        title: "Organic Pest Control Methods",
        category: "pests",
        description: "Natural approaches to managing garden pests",
        content: {
          sections: [
            {
              title: "Prevention",
              text: "Choose pest-resistant varieties. Maintain healthy soil with regular additions of compost. Practice crop rotation to disrupt pest cycles. Use floating row covers to protect susceptible crops. Time plantings to avoid peak pest seasons. Implement proper spacing for good air circulation.",
            },
            {
              title: "Beneficial Insects",
              text: "Ladybugs consume aphids, mealybugs, and scale insects. Lacewings prey on aphids, caterpillars, and whiteflies. Predatory mites control spider mites and thrips. Ground beetles eat slugs, snails, and soil-dwelling pests. Parasitic wasps lay eggs in caterpillars and other pests. Attract beneficials with diverse flowering plants, especially those with small blossoms (dill, fennel, yarrow, alyssum).",
            },
            {
              title: "Cultural Controls",
              text: "Hand-pick larger pests like caterpillars and beetles. Use strong water sprays to dislodge aphids and mites. Set up barriers (copper tape for slugs, row covers for flying insects). Install sticky traps to monitor and reduce flying pest populations. Use companion planting (marigolds repel nematodes, nasturtiums deter squash bugs).",
            },
            {
              title: "Botanical Insecticides",
              text: "Neem oil controls a wide range of pests including aphids, whiteflies, and mites. Pyrethrum (from chrysanthemums) offers broad-spectrum control but affects beneficials too. Insecticidal soaps disrupt pest cell membranes and work well on soft-bodied insects. Diatomaceous earth dehydrates insects with exoskeletons. Always follow label instructions, even with organic products.",
            },
            {
              title: "Homemade Solutions",
              text: "Garlic-pepper spray: Blend garlic and hot peppers, steep in water, strain, and spray on plants to repel many pests. Soap spray: 1-2 tablespoons of mild liquid soap in a quart of water controls aphids and other soft-bodied pests. Baking soda solution (1 tablespoon baking soda, 1 teaspoon mild soap, 1 gallon water) helps prevent fungal issues.",
            },
            {
              title: "Traps and Baits",
              text: "Beer traps for slugs and snails (shallow containers of beer sunk into the ground). Yellow sticky cards for whiteflies, aphids, and fungus gnats. Pheromone traps disrupt mating of specific insects. Diatomaceous earth barriers around plants or beds.",
            },
            {
              title: "Biological Controls",
              text: "Bacillus thuringiensis (Bt) targets caterpillars without harming other organisms. Beneficial nematodes control soil-dwelling pests including grubs and root weevils. Spinosad (derived from soil bacteria) controls caterpillars, leafminers, and thrips. Milky spore targets Japanese beetle grubs specifically.",
            },
            {
              title: "Integrated Pest Management (IPM)",
              text: "Monitor regularly to identify problems early. Establish acceptable damage thresholds. Use the least toxic methods first. Combine multiple strategies for better results. Keep detailed records of what works. Remember that some pest presence is normal and even necessary in a balanced garden ecosystem.",
            },
          ],
        },
      },
    ],
  },
  {
    title: "Irrigation",
    value: "irrigation",
    icon: "💧",
    guides: [
      {
        id: "drip-irrigation",
        title: "Setting Up Drip Irrigation",
        category: "irrigation",
        description: "How to install and maintain efficient drip irrigation systems",
        content: {
          sections: [
            {
              title: "Benefits of Drip Irrigation",
              text: "Water conservation (up to 60% less water usage compared to sprinklers). Reduced weed growth by targeting water at plant roots. Decreased disease pressure by keeping foliage dry. Lower water bills and labor savings with automation. Ability to deliver fertilizer directly to root zones through fertigation.",
            },
            {
              title: "Planning Your System",
              text: "Map your garden, noting plant locations and water needs. Group plants with similar water requirements in the same zones. Measure the area and calculate required components. Determine water source, pressure, and flow rate (GPH/GPM). Consider future expansion in your design.",
            },
            {
              title: "Basic Components",
              text: "Backflow preventer (required to prevent contamination of water supply). Timer/controller for automation. Pressure regulator (most drip systems require 25-30 PSI). Filter to prevent clogging. Main supply line (½ or ¾ inch polyethylene tubing). Distribution tubing (¼ inch). Emitters or drip line. End caps, connectors, and stakes.",
            },
            {
              title: "Installation Steps",
              text: "Connect the backflow preventer to your water source. Attach the timer, pressure regulator, and filter in sequence. Lay out the main supply line around your garden. Connect distribution tubing where needed. Install emitters near plant bases (1-2 GPH for most vegetables). Secure tubing with stakes or bury lightly under mulch. Flush the system before final assembly, then cap the ends.",
            },
            {
              title: "Emitter Options",
              text: "Point-source emitters deliver precise amounts to individual plants. Inline emitters are pre-installed in tubing at regular intervals. Microsprinklers cover larger areas for densely planted beds. Soaker hoses work well for row crops. Adjustable emitters allow customization of flow rates.",
            },
            {
              title: "Watering Schedules",
              text: "Water deeply but infrequently to encourage deep root growth. Morning is the best time to water (less evaporation, plants have water for the day). Adjust frequency based on soil type (sandy soils need more frequent, shorter watering; clay soils need less frequent, longer watering). Seasonal adjustments are necessary (more in summer, less in spring/fall).",
            },
            {
              title: "Maintenance",
              text: "Flush the system several times per year by removing end caps and running water through. Check and clean filters monthly during growing season. Inspect for leaks, clogs, or damaged components regularly. Winterize in cold climates by draining the system and storing temperature-sensitive components indoors. Replace emitters as needed (typically every 2-3 years).",
            },
            {
              title: "Troubleshooting",
              text: "Clogged emitters: Remove and soak in vinegar solution or replace. Uneven watering: Check for pressure issues or blocked tubing. Leaking connections: Ensure proper fits and replace damaged parts. System not running: Check timer, power source, and water supply valve. Animal damage: Bury lines or use protective tubing.",
            },
          ],
        },
      },
    ],
  },
];

export default function Guide() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("crops");
  const [expandedGuide, setExpandedGuide] = useState<string | null>(null);

  // Filter guides based on search query
  const filteredGuides = GUIDE_CATEGORIES.flatMap((category) =>
    category.guides.filter(
      (guide) =>
        guide.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        guide.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  // Get guides for the active category
  const activeGuides = activeCategory
    ? GUIDE_CATEGORIES.find((category) => category.value === activeCategory)?.guides || []
    : [];

  // Display specific guides based on search or category
  const guidesToDisplay = searchQuery ? filteredGuides : activeGuides;

  return (
    <div className="h-full leaf-background">
      <div className="container py-6">
        <PageHeader
          title="Growing Guides"
          description="Learn best practices for sustainable and successful farming"
        />

        {/* Search bar */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search guides..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {searchQuery ? (
          // Search results
          <div className="space-y-4">
            <h2 className="text-lg font-medium">
              Search Results ({filteredGuides.length})
            </h2>
            {filteredGuides.length > 0 ? (
              filteredGuides.map((guide) => (
                <Card key={guide.id} className="overflow-hidden">
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-2">
                      <div className="text-lg">
                        {
                          GUIDE_CATEGORIES.find(
                            (category) => category.value === guide.category
                          )?.icon
                        }
                      </div>
                      <CardTitle>{guide.title}</CardTitle>
                    </div>
                    <CardDescription>{guide.description}</CardDescription>
                  </CardHeader>
                  {expandedGuide === guide.id ? (
                    <CardContent>
                      <Accordion type="single" collapsible className="w-full">
                        {guide.content.sections.map((section, index) => (
                          <AccordionItem key={index} value={`section-${index}`}>
                            <AccordionTrigger>{section.title}</AccordionTrigger>
                            <AccordionContent>{section.text}</AccordionContent>
                          </AccordionItem>
                        ))}
                      </Accordion>
                    </CardContent>
                  ) : null}
                  <CardFooter>
                    {expandedGuide === guide.id ? (
                      <Button
                        variant="ghost"
                        onClick={() => setExpandedGuide(null)}
                      >
                        Collapse Guide
                      </Button>
                    ) : (
                      <Button
                        variant="outline"
                        onClick={() => setExpandedGuide(guide.id)}
                      >
                        Read Guide
                      </Button>
                    )}
                  </CardFooter>
                </Card>
              ))
            ) : (
              <div className="text-center py-8">
                <p className="text-muted-foreground">
                  No guides found matching your search. Try different keywords.
                </p>
              </div>
            )}
          </div>
        ) : (
          // Category tabs
          <Tabs defaultValue={activeCategory} onValueChange={setActiveCategory}>
            <TabsList className="w-full mb-6">
              {GUIDE_CATEGORIES.map((category) => (
                <TabsTrigger key={category.value} value={category.value}>
                  <span className="mr-2">{category.icon}</span>
                  {category.title}
                </TabsTrigger>
              ))}
            </TabsList>

            {GUIDE_CATEGORIES.map((category) => (
              <TabsContent key={category.value} value={category.value}>
                <div className="space-y-4">
                  {category.guides.map((guide) => (
                    <Card key={guide.id} className="overflow-hidden">
                      <CardHeader className="pb-3">
                        <CardTitle>{guide.title}</CardTitle>
                        <CardDescription>{guide.description}</CardDescription>
                      </CardHeader>
                      {expandedGuide === guide.id ? (
                        <CardContent>
                          <Accordion type="single" collapsible className="w-full">
                            {guide.content.sections.map((section, index) => (
                              <AccordionItem key={index} value={`section-${index}`}>
                                <AccordionTrigger>{section.title}</AccordionTrigger>
                                <AccordionContent>{section.text}</AccordionContent>
                              </AccordionItem>
                            ))}
                          </Accordion>
                        </CardContent>
                      ) : null}
                      <CardFooter>
                        {expandedGuide === guide.id ? (
                          <Button
                            variant="ghost"
                            onClick={() => setExpandedGuide(null)}
                          >
                            Collapse Guide
                          </Button>
                        ) : (
                          <Button
                            variant="outline"
                            onClick={() => setExpandedGuide(guide.id)}
                          >
                            Read Guide
                          </Button>
                        )}
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        )}
      </div>
    </div>
  );
}
