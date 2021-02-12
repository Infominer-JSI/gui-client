// import interfaces
import { IGraphSunburst } from "Interfaces";
// import modules
import React from "react";
import { Story } from "@storybook/react/types-6-0";
// import the component
import GraphSunburst from "./index";

// ==============================================
// Configure Story
// ==============================================

const storyComponent = {
  component: GraphSunburst,
  title: "Graph/Sunburst",
};

export default storyComponent;

// ==============================================
// Configure Story Versions
// ==============================================

const Template: Story<IGraphSunburst> = (args: IGraphSunburst) => (
  <div style={{ height: "700px" }}>
    <GraphSunburst {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  data: {
    name: "root",
    frequency: 19878,
    precent: 100,
    children: [
      {
        name: "business",
        frequency: 10567,
        precent: 0.5315927155649461,
        children: [
          {
            name: "news",
            frequency: 9467,
            precent: 0.4762551564543717,
            children: [
              {
                name: "culture-design",
                frequency: 12,
                precent: 0.0006036824630244491,
              },
              {
                name: "finance",
                frequency: 31,
                precent: 0.001559513029479827,
              },
              {
                name: "energy-science",
                frequency: 55,
                precent: 0.002766877955528725,
              },
              {
                name: "graphics",
                frequency: 73,
                precent: 0.003672401650065399,
                children: [
                  {
                    name: "billionaires",
                    frequency: 13,
                    precent: 0.0006539893349431532,
                  },
                  {
                    name: "index",
                    frequency: 2,
                    precent: 0.0001006137438374082,
                  },
                ],
              },
              {
                name: "green",
                frequency: 103,
                precent: 0.005181607807626522,
                children: [
                  {
                    name: "index",
                    frequency: 13,
                    precent: 0.0006539893349431532,
                  },
                ],
              },
              {
                name: "politics",
                frequency: 26,
                precent: 0.001307978669886306,
              },
              {
                name: "climate-adaptation",
                frequency: 58,
                precent: 0.002917798571284838,
              },
              {
                name: "living",
                frequency: 93,
                precent: 0.004678539088439481,
              },
              {
                name: "science-energy",
                frequency: 66,
                precent: 0.00332025354663447,
                children: [
                  {
                    name: "article",
                    frequency: 65,
                    precent: 0.003269946674715766,
                  },
                ],
              },
              {
                name: "new_economy_forum",
                frequency: 4,
                precent: 0.0002012274876748164,
                children: [
                  {
                    name: "index",
                    frequency: 4,
                    precent: 0.0002012274876748164,
                  },
                ],
              },
              {
                name: "reinvention",
                frequency: 6,
                precent: 0.0003018412315122246,
              },
              {
                name: "savings-retirement",
                frequency: 4,
                precent: 0.0002012274876748164,
              },
              {
                name: "investing",
                frequency: 6,
                precent: 0.0003018412315122246,
              },
              {
                name: "coronavirus",
                frequency: 1,
                precent: 0.0000503068719187041,
                children: [
                  {
                    name: "index",
                    frequency: 1,
                    precent: 0.0000503068719187041,
                  },
                ],
              },
              {
                name: "world",
                frequency: 4888,
                precent: 0.2458999899386256,
                children: [
                  {
                    name: "article",
                    frequency: 4879,
                    precent: 0.2454472280913573,
                  },
                ],
              },
              {
                name: "wealth",
                frequency: 6,
                precent: 0.0003018412315122246,
              },
              {
                name: "green_finance",
                frequency: 1,
                precent: 0.0000503068719187041,
                children: [
                  {
                    name: "index",
                    frequency: 1,
                    precent: 0.0000503068719187041,
                  },
                ],
              },
              {
                name: "deals",
                frequency: 3,
                precent: 0.0001509206157561123,
                children: [
                  {
                    name: "index",
                    frequency: 3,
                    precent: 0.0001509206157561123,
                  },
                ],
              },
              {
                name: "industries",
                frequency: 1,
                precent: 0.0000503068719187041,
                children: [
                  {
                    name: "article",
                    frequency: 1,
                    precent: 0.0000503068719187041,
                  },
                ],
              },
              {
                name: "focus_on_small_biz",
                frequency: 1,
                precent: 0.0000503068719187041,
              },
              {
                name: "new-economy-forum",
                frequency: 1,
                precent: 0.0000503068719187041,
              },
              {
                name: "general",
                frequency: 1189,
                precent: 0.05981487071133917,
              },
              {
                name: "pursuits",
                frequency: 899,
                precent: 0.04522587785491498,
              },
              {
                name: "technology",
                frequency: 1769,
                precent: 0.08899285642418754,
              },
            ],
          },
          {
            name: "insights",
            frequency: 719,
            precent: 0.03617064090954825,
            children: [
              {
                name: "small-business",
                frequency: 25,
                precent: 0.001257671797967602,
                children: [
                  {
                    name: "article",
                    frequency: 25,
                    precent: 0.001257671797967602,
                  },
                ],
              },
              {
                name: "game-plan",
                frequency: 1,
                precent: 0.0000503068719187041,
                children: [
                  {
                    name: "article",
                    frequency: 1,
                    precent: 0.0000503068719187041,
                  },
                ],
              },
              {
                name: "business-schools",
                frequency: 1,
                precent: 0.0000503068719187041,
                children: [
                  {
                    name: "b-school_rankings_global_2020",
                    frequency: 1,
                    precent: 0.0000503068719187041,
                  },
                ],
              },
              {
                name: "personal-finance",
                frequency: 692,
                precent: 0.03481235536774323,
                children: [
                  {
                    name: "article",
                    frequency: 692,
                    precent: 0.03481235536774323,
                  },
                ],
              },
            ],
          },
          {
            name: "live",
            frequency: 6,
            precent: 0.0003018412315122246,
            children: [
              {
                name: "index",
                frequency: 6,
                precent: 0.0003018412315122246,
              },
            ],
          },
          {
            name: "series",
            frequency: 4,
            precent: 0.0002012274876748164,
            children: [
              {
                name: "bloomberg-technology",
                frequency: 1,
                precent: 0.0000503068719187041,
              },
              {
                name: "game-changers",
                frequency: 1,
                precent: 0.0000503068719187041,
              },
              {
                name: "balance-of-power",
                frequency: 1,
                precent: 0.0000503068719187041,
              },
              {
                name: "bloomberg-commodities-edge",
                frequency: 1,
                precent: 0.0000503068719187041,
              },
            ],
          },
          {
            name: "topic",
            frequency: 3,
            precent: 0.0001509206157561123,
            children: [
              {
                name: "mobile-phones",
                frequency: 1,
                precent: 0.0000503068719187041,
              },
              {
                name: "Europe",
                frequency: 1,
                precent: 0.0000503068719187041,
              },
              {
                name: "silicon-valley",
                frequency: 1,
                precent: 0.0000503068719187041,
              },
            ],
          },
          {
            name: "home",
            frequency: 172,
            precent: 0.008652781970017105,
          },
          {
            name: "general",
            frequency: 196,
            precent: 0.009860146896066003,
          },
        ],
      },
      {
        name: "markets",
        frequency: 2583,
        precent: 0.1299426501660127,
        children: [
          {
            name: "home",
            frequency: 67,
            precent: 0.003370560418553174,
          },
          {
            name: "watchlist",
            frequency: 16,
            precent: 0.0008049099506992655,
          },
          {
            name: "stocks",
            frequency: 30,
            precent: 0.001509206157561123,
            children: [
              {
                name: "futures",
                frequency: 27,
                precent: 0.001358285541805011,
              },
              {
                name: "world-indexes",
                frequency: 3,
                precent: 0.0001509206157561123,
                children: [
                  {
                    name: "europe-africa-middle-east",
                    frequency: 3,
                    precent: 0.0001509206157561123,
                  },
                ],
              },
            ],
          },
          {
            name: "commodities",
            frequency: 46,
            precent: 0.002314116108260388,
            children: [
              {
                name: "futures",
                frequency: 11,
                precent: 0.000553375591105745,
                children: [
                  {
                    name: "metals",
                    frequency: 11,
                    precent: 0.000553375591105745,
                  },
                ],
              },
            ],
          },
          {
            name: "sector",
            frequency: 1,
            precent: 0.0000503068719187041,
            children: [
              {
                name: "utilities",
                frequency: 1,
                precent: 0.0000503068719187041,
              },
            ],
          },
          {
            name: "cic",
            frequency: 487,
            precent: 0.02449944662440889,
            children: [
              {
                name: "public",
                frequency: 56,
                precent: 0.00281718482744743,
              },
              {
                name: "private",
                frequency: 318,
                precent: 0.0159975852701479,
              },
              {
                name: "profile",
                frequency: 113,
                precent: 0.005684676526813563,
              },
            ],
          },
          {
            name: "economics",
            frequency: 3,
            precent: 0.0001509206157561123,
          },
          {
            name: "rates-bonds",
            frequency: 1,
            precent: 0.0000503068719187041,
            children: [
              {
                name: "bloomberg-barclays-indices",
                frequency: 1,
                precent: 0.0000503068719187041,
              },
            ],
          },
          {
            name: "focus_on_markets_personal_finance",
            frequency: 1,
            precent: 0.0000503068719187041,
          },
          {
            name: "quote",
            frequency: 231,
            precent: 0.01162088741322065,
          },
          {
            name: "article",
            frequency: 1700,
            precent: 0.08552168226179696,
          },
        ],
      },
      {
        name: "bloomberg",
        frequency: 3072,
        precent: 0.154542710534259,
        children: [
          {
            name: "pressrelease",
            frequency: 34,
            precent: 0.001710433645235939,
          },
          {
            name: "businessweek",
            frequency: 1508,
            precent: 0.07586276285340578,
          },
          {
            name: "live",
            frequency: 2,
            precent: 0.0001006137438374082,
            children: [
              {
                name: "schedule-shows",
                frequency: 2,
                precent: 0.0001006137438374082,
              },
            ],
          },
          {
            name: "author",
            frequency: 4,
            precent: 0.0002012274876748164,
          },
          {
            name: "audio",
            frequency: 3,
            precent: 0.0001509206157561123,
            children: [
              {
                name: "podcast",
                frequency: 3,
                precent: 0.0001509206157561123,
                children: [
                  {
                    name: "decrypted1",
                    frequency: 1,
                    precent: 0.0000503068719187041,
                  },
                  {
                    name: "out_of_office",
                    frequency: 1,
                    precent: 0.0000503068719187041,
                  },
                ],
              },
            ],
          },
          {
            name: "opinion",
            frequency: 1521,
            precent: 0.07651675218834893,
            children: [
              {
                name: "view",
                frequency: 151,
                precent: 0.007596337659724318,
                children: [
                  {
                    name: "quicktake",
                    frequency: 151,
                    precent: 0.007596337659724318,
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        name: "5262",
        frequency: 1,
        precent: 0.0000503068719187041,
        children: [
          {
            name: "business",
            frequency: 1,
            precent: 0.0000503068719187041,
            children: [
              {
                name: "news",
                frequency: 1,
                precent: 0.0000503068719187041,
                children: [
                  {
                    name: "pursuits",
                    frequency: 1,
                    precent: 0.0000503068719187041,
                    children: [
                      {
                        name: "how_did_i_get_here",
                        frequency: 1,
                        precent: 0.0000503068719187041,
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        name: "businessweek",
        frequency: 295,
        precent: 0.01484052721601771,
      },
      {
        name: "politics",
        frequency: 3179,
        precent: 0.1599255458295603,
        children: [
          {
            name: "story",
            frequency: 3179,
            precent: 0.1599255458295603,
          },
        ],
      },
    ],
  },
};
