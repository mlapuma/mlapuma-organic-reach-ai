import Link from "next/link";
import {generateDraft, type Topic} from "../../lib/editorial";
const topics:Topic[]=["clareamento","implantes","canal","limpeza"];
export default function EditorialPage({searchParams}:{searchParams:Promise<{topic?:string;channel?:string}>}){
 return searchParams.then(params=>{
  const topic=topics.includes(params.topic as Topic)?params.topic as Topic:"clareamento";
  const channel=params.channel==="FACEBOOK"?"FACEBOOK":"INSTAGRAM";
  const draft=generateDraft(topic,channel);
  return <main style={{maxWidth:850,margin:"40px auto",padding:24,color:"#f8fafc"}}>
   <Link href="/" style={{color:"#d4af37"}}>← Voltar ao painel</Link>
   <h1>Planejador editorial · LaCari</h1>
   <p>Rascunhos locais para revisão humana. Nada é publicado ou enviado automaticamente.</p>
   <form style={{display:"flex",gap:12,flexWrap:"wrap",marginBottom:24}}>
    <label>Tratamento <select name="topic" defaultValue={topic}>{topics.map(t=><option key={t} value={t}>{t}</option>)}</select></label>
    <label>Canal <select name="channel" defaultValue={channel}><option>INSTAGRAM</option><option>FACEBOOK</option></select></label>
    <button type="submit">Gerar sugestão</button>
   </form>
   <article style={{border:"1px solid #475569",padding:24,borderRadius:12,whiteSpace:"pre-wrap"}}>
    <small>Status: RASCUNHO · {draft.channel}</small>
    <h2>{draft.title}</h2>
    <p>{draft.caption}</p>
   </article>
   <p style={{fontSize:13,color:"#94a3b8"}}>Revise URLs, alegações clínicas, consentimento de imagens e regras profissionais antes de publicar. Este gerador usa modelos fixos, não IA externa.</p>
  </main>;
 });
}
