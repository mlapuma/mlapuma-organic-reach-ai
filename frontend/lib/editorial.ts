export type Topic = "clareamento" | "implantes" | "canal" | "limpeza";
export type EditorialDraft = { title: string; caption: string; hashtags: string[]; channel: "INSTAGRAM" | "FACEBOOK"; status: "DRAFT" };
const templates: Record<Topic,{title:string;body:string;url:string;tags:string[]}> = {
 clareamento:{title:"Clareamento dental: conheça suas opções",body:"Quer entender quais opções de clareamento podem ser indicadas para seu sorriso? Uma avaliação odontológica ajuda a definir o cuidado adequado para você.",url:"https://clinicalacari.com.br/clareamento/",tags:["ClareamentoDental","Odontologia","SorrisoSaudavel"]},
 implantes:{title:"Implantes dentários: tire suas dúvidas",body:"A indicação de implantes depende de uma avaliação individual. Converse com nossa equipe para conhecer as possibilidades de tratamento.",url:"https://clinicalacari.com.br/implante/",tags:["ImplanteDentario","SaudeBucal","Odontologia"]},
 canal:{title:"Tratamento de canal: informação e cuidado",body:"Dor de dente merece avaliação profissional. O tratamento de canal pode ser indicado em determinadas situações, com técnicas de anestesia e controle do desconforto.",url:"https://clinicalacari.com.br/tratamento-de-canal/",tags:["TratamentoDeCanal","Endodontia","SaudeBucal"]},
 limpeza:{title:"Limpeza dental e prevenção",body:"A frequência ideal de limpeza profissional varia conforme cada pessoa. Agende uma avaliação e cuide da saúde da sua boca.",url:"https://clinicalacari.com.br/limpeza-dental/",tags:["LimpezaDental","Prevencao","SaudeBucal"]}
};
export function generateDraft(topic:Topic,channel:"INSTAGRAM"|"FACEBOOK"):EditorialDraft {
 const t=templates[topic];
 const hashtags=[...t.tags,"Itaquera","ZonaLesteSP","ClinicaLaCari"];
 return {title:t.title,caption:`${t.body}\n\nSaiba mais: ${t.url}\n\n${hashtags.map(tag=>"#"+tag).join(" ")}`,hashtags,channel,status:"DRAFT"};
}
