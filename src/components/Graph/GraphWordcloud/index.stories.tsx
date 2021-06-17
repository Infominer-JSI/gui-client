// import modules
import React from "react";
import { Story } from "@storybook/react/types-6-0";

// import the component
import GraphWordcloud from "./index";

// ==============================================
// Configure Story
// ==============================================

const storyComponent = {
  component: GraphWordcloud,
  title: "Graph/Wordcloud",
};

export default storyComponent;

// ==============================================
// Configure Story Versions
// ==============================================

type GraphWordcloudProps = React.ComponentProps<typeof GraphWordcloud>;
const Template: Story<GraphWordcloudProps> = (args: GraphWordcloudProps) => (
  <div style={{ height: "700px" }}>
    <GraphWordcloud {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  data: [
    {
      keyword: "articles",
      weight: 0.2700762450695038,
    },
    {
      keyword: "features",
      weight: 0.2370576411485672,
    },
    {
      keyword: "trump",
      weight: 0.2300245314836502,
    },
    {
      keyword: "news",
      weight: 0.2249869704246521,
    },
    {
      keyword: "covid",
      weight: 0.2097411602735519,
    },
    {
      keyword: "opinion",
      weight: 0.1959525793790817,
    },
    {
      keyword: "china",
      weight: 0.195591002702713,
    },
    {
      keyword: "deal",
      weight: 0.1606287062168121,
    },
    {
      keyword: "virus",
      weight: 0.1410224139690399,
    },
    {
      keyword: "profile",
      weight: 0.1389515995979309,
    },
    {
      keyword: "markets",
      weight: 0.127381294965744,
    },
    {
      keyword: "coronavirus",
      weight: 0.1243579611182213,
    },
    {
      keyword: "newsletters",
      weight: 0.1240735054016113,
    },
    {
      keyword: "company",
      weight: 0.1142751723527908,
    },
    {
      keyword: "vaccine",
      weight: 0.1142329201102257,
    },
    {
      keyword: "billion",
      weight: 0.1128941401839256,
    },
    {
      keyword: "day",
      weight: 0.110551580786705,
    },
    {
      keyword: "stimulus",
      weight: 0.1093331053853035,
    },
    {
      keyword: "tiktok",
      weight: 0.1018145605921745,
    },
    {
      keyword: "asia",
      weight: 0.1013789400458336,
    },
    {
      keyword: "start",
      weight: 0.09186863154172897,
    },
    {
      keyword: "pandemic",
      weight: 0.09082997590303421,
    },
    {
      keyword: "economy",
      weight: 0.09016024321317673,
    },
    {
      keyword: "jobs",
      weight: 0.08845290541648865,
    },
    {
      keyword: "election",
      weight: 0.08731955289840698,
    },
    {
      keyword: "cases",
      weight: 0.08610209822654724,
    },
    {
      keyword: "quote",
      weight: 0.08364854753017426,
    },
    {
      keyword: "time",
      weight: 0.07934350520372391,
    },
    {
      keyword: "update",
      weight: 0.07592540979385376,
    },
    {
      keyword: "things",
      weight: 0.07419174164533615,
    },
    {
      keyword: "plan",
      weight: 0.07365632057189941,
    },
    {
      keyword: "brexit",
      weight: 0.07206861674785614,
    },
    {
      keyword: "talks",
      weight: 0.0713968276977539,
    },
    {
      keyword: "tesla",
      weight: 0.0685885101556778,
    },
    {
      keyword: "world",
      weight: 0.06691376864910126,
    },
    {
      keyword: "race",
      weight: 0.06508402526378632,
    },
    {
      keyword: "singapore",
      weight: 0.06453084200620651,
    },
    {
      keyword: "mnuchin",
      weight: 0.06311238557100296,
    },
    {
      keyword: "million",
      weight: 0.06212568655610085,
    },
    {
      keyword: "heat",
      weight: 0.06186150014400482,
    },
    {
      keyword: "trial",
      weight: 0.05935190618038177,
    },
    {
      keyword: "stock",
      weight: 0.05866929143667221,
    },
    {
      keyword: "tax",
      weight: 0.05733150616288185,
    },
    {
      keyword: "biden",
      weight: 0.05619853734970093,
    },
    {
      keyword: "stocks",
      weight: 0.05605025961995125,
    },
    {
      keyword: "cars",
      weight: 0.05602158978581429,
    },
    {
      keyword: "tells",
      weight: 0.05476211383938789,
    },
    {
      keyword: "top",
      weight: 0.05466984584927559,
    },
    {
      keyword: "fed",
      weight: 0.05454292520880699,
    },
    {
      keyword: "deadly",
      weight: 0.05393382906913757,
    },
    {
      keyword: "california",
      weight: 0.05321225896477699,
    },
    {
      keyword: "shows",
      weight: 0.05282808840274811,
    },
    {
      keyword: "fly",
      weight: 0.05020501092076302,
    },
    {
      keyword: "musk",
      weight: 0.05010402947664261,
    },
    {
      keyword: "face",
      weight: 0.05008388310670853,
    },
    {
      keyword: "hong",
      weight: 0.04966840893030167,
    },
    {
      keyword: "makes",
      weight: 0.04935090988874435,
    },
    {
      keyword: "returns",
      weight: 0.04909082129597664,
    },
    {
      keyword: "court",
      weight: 0.04892925918102264,
    },
    {
      keyword: "kong",
      weight: 0.04848667234182358,
    },
    {
      keyword: "show",
      weight: 0.04829126223921776,
    },
    {
      keyword: "apple",
      weight: 0.04782180860638618,
    },
    {
      keyword: "oil",
      weight: 0.04627840593457222,
    },
    {
      keyword: "cabins",
      weight: 0.04594341665506363,
    },
    {
      keyword: "airplane",
      weight: 0.04594341665506363,
    },
    {
      keyword: "pelosi",
      weight: 0.04576689004898071,
    },
    {
      keyword: "oracle",
      weight: 0.04478435590863228,
    },
    {
      keyword: "congress",
      weight: 0.04434312880039215,
    },
    {
      keyword: "short",
      weight: 0.04417481273412704,
    },
    {
      keyword: "set",
      weight: 0.04340017959475517,
    },
    {
      keyword: "astrazeneca",
      weight: 0.04337764903903008,
    },
    {
      keyword: "money",
      weight: 0.04330096021294594,
    },
    {
      keyword: "crisis",
      weight: 0.04324758425354958,
    },
    {
      keyword: "voter",
      weight: 0.04324355348944664,
    },
    {
      keyword: "profiles",
      weight: 0.04316442832350731,
    },
    {
      keyword: "europe",
      weight: 0.04265489429235458,
    },
    {
      keyword: "trillion",
      weight: 0.04257500544190407,
    },
    {
      keyword: "graphics",
      weight: 0.04255379736423492,
    },
    {
      keyword: "home",
      weight: 0.04253391921520233,
    },
    {
      keyword: "funding",
      weight: 0.04125819727778435,
    },
    {
      keyword: "holds",
      weight: 0.04115912690758705,
    },
    {
      keyword: "banking",
      weight: 0.04100563004612923,
    },
    {
      keyword: "states",
      weight: 0.04020087793469429,
    },
    {
      keyword: "exports",
      weight: 0.03963172808289528,
    },
    {
      keyword: "nikola",
      weight: 0.03927840292453766,
    },
    {
      keyword: "store",
      weight: 0.03835306316614151,
    },
    {
      keyword: "private",
      weight: 0.03832004964351654,
    },
    {
      keyword: "fall",
      weight: 0.03827294334769249,
    },
    {
      keyword: "avert",
      weight: 0.03815998136997223,
    },
    {
      keyword: "save",
      weight: 0.03811866044998169,
    },
    {
      keyword: "person",
      weight: 0.03770710900425911,
    },
    {
      keyword: "fresh",
      weight: 0.03762176260352135,
    },
    {
      keyword: "gasoline",
      weight: 0.03758753836154938,
    },
    {
      keyword: "house",
      weight: 0.03731668367981911,
    },
    {
      keyword: "shutdown",
      weight: 0.03727921470999718,
    },
    {
      keyword: "recovery",
      weight: 0.03724266961216927,
    },
    {
      keyword: "climate",
      weight: 0.03710058331489563,
    },
    {
      keyword: "stopgap",
      weight: 0.03705212101340294,
    },
    {
      keyword: "rise",
      weight: 0.03680744767189026,
    },
    {
      keyword: "india",
      weight: 0.03669954091310501,
    },
  ],
};

export const Single = Template.bind({});
Single.args = {
  data: [
    {
      keyword: "articles",
      weight: 0.2700762450695038,
    },
  ],
};
