import "server-only";
export function apiHeaders():Record<string,string>{
 const username=process.env.ADMIN_USERNAME;
 const password=process.env.ADMIN_PASSWORD;
 if(!username||!password)throw new Error("ADMIN_USERNAME/ADMIN_PASSWORD não configurados");
 return {Authorization:"Basic "+Buffer.from(username+":"+password).toString("base64")};
}
