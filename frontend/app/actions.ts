"use server";
import {revalidatePath} from "next/cache";
import {redirect} from "next/navigation";
const api=process.env.API_INTERNAL_URL||"http://localhost:8080";
export async function createCampaign(form:FormData){
 const title=String(form.get("title")||"").trim();
 const description=String(form.get("description")||"").trim();
 const landingUrl=String(form.get("landingUrl")||"").trim();
 if(!title||title.length>160) throw new Error("Título inválido");
 const res=await fetch(api+"/api/campaigns",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({title,description,landingUrl})});
 if(!res.ok)throw new Error("Não foi possível criar a campanha");
 revalidatePath("/");redirect("/");
}
export async function createPartner(form:FormData){
 const name=String(form.get("name")||"").trim();
 const handle=String(form.get("handle")||"").trim();
 const platform=String(form.get("platform")||"INSTAGRAM");
 if(!name||name.length>160||!["INSTAGRAM","FACEBOOK"].includes(platform))throw new Error("Dados inválidos");
 const res=await fetch(api+"/api/partners",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name,handle,platform})});
 if(!res.ok)throw new Error("Não foi possível cadastrar parceiro");
 revalidatePath("/");redirect("/");
}
