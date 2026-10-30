import {createCampaign,createPartner} from "./actions";
import {apiHeaders} from "../lib/api";
type Campaign={id:string;title:string;description:string|null;status:string;landingUrl:string|null};
type Partner={id:string;name:string;handle:string|null;platform:string;status:string};
const api=process.env.API_INTERNAL_URL||"http://localhost:8080";
async function load<T>(path:string):Promise<T[]>{
 try{const response=await fetch(api+path,{cache:"no-store",headers:apiHeaders()});return response.ok?await response.json():[];}catch{return [];}
}
const card:React.CSSProperties={padding:22,border:"1px solid #334155",borderRadius:16,background:"#111c2d"};
const input:React.CSSProperties={padding:12,borderRadius:8,border:"1px solid #475569",background:"#0b1220",color:"#fff",width:"100%",boxSizing:"border-box"};
export default async function Home(){
 const [campaigns,partners]=await Promise.all([load<Campaign>("/api/campaigns"),load<Partner>("/api/partners")]);
 return <main style={{maxWidth:1100,margin:"auto",padding:"36px 20px"}}>
  <div style={{color:"#d4af37",fontWeight:700}}>ORGANIC REACH AI · CLÍNICA LACARI</div>
  <h1 style={{fontSize:38,marginBottom:8}}>Central de crescimento orgânico</h1>
  <a href="/editorial" style={{color:"#d4af37",fontWeight:700}}>Abrir planejador editorial →</a>
  <p style={{color:"#94a3b8"}}>Gerencie campanhas e parceiros voluntários. Publicações e integração Meta ainda não estão ativadas.</p>
  <section style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(210px,1fr))",gap:14,marginTop:26}}>
   {[[ "Campanhas",campaigns.length ],["Parceiros cadastrados",partners.length],["Meta API","Pendente"],["Publicação automática","Desativada"]].map(([name,value])=><article key={name} style={card}><div style={{color:"#94a3b8"}}>{name}</div><h2>{value}</h2></article>)}
  </section>
  <section style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(310px,1fr))",gap:18,marginTop:26}}>
   <div style={card}><h2>Nova campanha</h2><form action={createCampaign} style={{display:"grid",gap:12}}>
    <label>Título<input name="title" maxLength={160} required style={input} placeholder="Clareamento dental"/></label>
    <label>Descrição<textarea name="description" style={{...input,minHeight:90}} placeholder="Objetivo e mensagem"/></label>
    <label>Landing page<input name="landingUrl" type="url" style={input} placeholder="https://clinicalacari.com.br/clareamento/"/></label>
    <button style={{...input,background:"#d4af37",color:"#111",fontWeight:700,cursor:"pointer"}}>Salvar rascunho</button>
   </form></div>
   <div style={card}><h2>Novo parceiro</h2><form action={createPartner} style={{display:"grid",gap:12}}>
    <label>Nome<input name="name" required maxLength={160} style={input} placeholder="Perfil ou empresa local"/></label>
    <label>Perfil público<input name="handle" maxLength={120} style={input} placeholder="@perfil"/></label>
    <label>Rede<select name="platform" style={input}><option value="INSTAGRAM">Instagram</option><option value="FACEBOOK">Facebook</option></select></label>
    <button style={{...input,background:"#d4af37",color:"#111",fontWeight:700,cursor:"pointer"}}>Cadastrar convite pendente</button>
   </form><p style={{fontSize:12,color:"#94a3b8"}}>Cadastrar não envia mensagens nem solicita compartilhamentos automaticamente.</p></div>
  </section>
  <section style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(310px,1fr))",gap:18,marginTop:20}}>
   <div style={card}><h2>Campanhas</h2>{campaigns.length===0?<p>Nenhuma campanha cadastrada.</p>:campaigns.map(c=><div key={c.id} style={{padding:"12px 0",borderBottom:"1px solid #334155"}}><b>{c.title}</b> · {c.status}<p>{c.description}</p>{c.landingUrl&&<a style={{color:"#d4af37"}} href={c.landingUrl} target="_blank" rel="noopener noreferrer">Abrir landing page</a>}</div>)}</div>
   <div style={card}><h2>Rede colaborativa</h2>{partners.length===0?<p>Nenhum parceiro cadastrado.</p>:partners.map(p=><p key={p.id}><b>{p.name}</b> {p.handle} · {p.platform} · {p.status}</p>)}</div>
  </section>
 </main>;
}
