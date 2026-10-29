type Campaign={id:string;title:string;description:string|null;status:string;landingUrl:string|null};
async function load():Promise<Campaign[]> {
 try {
  const response=await fetch((process.env.API_INTERNAL_URL||"http://localhost:8080")+"/api/campaigns",{cache:"no-store"});
  if(!response.ok) return [];
  return await response.json();
 } catch { return []; }
}
export default async function Home(){
 const campaigns=await load();
 return <main style={{maxWidth:960,margin:"auto",padding:40}}>
  <div style={{color:"#d4af37",fontSize:14}}>ORGANIC REACH AI · MVP</div>
  <h1 style={{fontSize:38}}>Crescimento orgânico com inteligência</h1>
  <p style={{color:"#94a3b8"}}>Piloto Clínica LaCari — campanhas em rascunho, sem divulgação automática.</p>
  <section style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))",gap:16}}>
   {[[ "Campanhas",campaigns.length ],["Publicações automáticas","Desativadas"],["Meta API","Não conectada"]].map(([name,value])=>
    <article key={name} style={{padding:24,border:"1px solid #334155",borderRadius:16,background:"#111c2d"}}>
     <div style={{color:"#94a3b8"}}>{name}</div><h2>{value}</h2>
    </article>)}
  </section>
  <h2 style={{marginTop:38}}>Campanhas cadastradas</h2>
  {campaigns.length===0?<p>Nenhuma campanha cadastrada. Use POST /api/campaigns para criar o primeiro rascunho.</p>:
   campaigns.map(c=><article key={c.id} style={{borderBottom:"1px solid #334155",padding:14}}>
    <strong>{c.title}</strong> · {c.status}<p>{c.description}</p>
   </article>)}
 </main>;
}
