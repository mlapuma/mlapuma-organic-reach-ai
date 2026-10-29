import {NextRequest,NextResponse} from "next/server";
export async function middleware(request:NextRequest){
 const username=process.env.ADMIN_USERNAME;
 const password=process.env.ADMIN_PASSWORD;
 if(!username||!password||password.length<16)return new NextResponse("Configuração de autenticação ausente",{status:503});
 const auth=request.headers.get("authorization")||"";
 const expected="Basic "+btoa(username+":"+password);
 const encoder=new TextEncoder();
 const [a,b]=await Promise.all([crypto.subtle.digest("SHA-256",encoder.encode(auth)),crypto.subtle.digest("SHA-256",encoder.encode(expected))]);
 const aa=new Uint8Array(a),bb=new Uint8Array(b);
 let diff=0;for(let i=0;i<aa.length;i++)diff|=aa[i]^bb[i];
 if(diff===0)return NextResponse.next();
 return new NextResponse("Autenticação necessária",{status:401,headers:{"WWW-Authenticate":'Basic realm="Organic Reach AI"',"Cache-Control":"no-store"}});
}
export const config={matcher:["/((?!_next/static|_next/image|favicon.ico).*)"]};
