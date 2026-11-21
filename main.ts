import*as f from"node:fs";
const I=process.env.MAKEFUN_INPUT_DIR||"/input",O=process.env.MAKEFUN_OUTPUT_DIR||"/output",U=Uint8Array;
let w,E,C;
const P=t=>{let r=t.split("\n"),h=r.length;w=r[0].length;E=[-w,w,-1,1];
let a=new U(w*h).fill(1),g=[],b=[],p=0;
for(let y=0;y<h;y++){let s=r[y];for(let x=0;x<s.length;x++){let i=y*w+x,c=s[x];if(c!="#"){if(x&&y&&x<w-1&&y<h-1)a[i]=0;if(".*+".includes(c))g.push(i);if("$*".includes(c))b.push(i);if("@+".includes(c))p=i}}}
return[a,g,b.sort((x,y)=>x-y),p]};
const V=(a,g)=>{let v=new U(a.length),q=g.map(x=>(v[x]=1,x));for(let i=0;i<q.length;i++)for(let k=0;k<4;k++){let y=q[i]-E[k];if(!a[y]&&!a[y-E[k]]&&!v[y]){v[y]=1;q.push(y)}}return v};
const Q=(a,o,s)=>{let v=Array(a.length).fill(-1),q=[s];v[s]=s*4;for(let i=0;i<q.length;i++)for(let k=0;k<4;k++){let n=q[i]+E[k];if(a[n]||o[n]||v[n]>=0)continue;v[n]=q[i]*4+k;q.push(n)}C=q;return v};
const S=(a,X,G,P)=>{
let n=a.length;
let v=V(a,G);if(X.some(x=>!v[x]))return null;
let o=new U(n);
let K=(b,p)=>{let z=new U(n);for(let x of b)z[x]=1;Q(a,z,p);return b+","+Math.min(...C)};
let st=[[X.sort((x,y)=>x-y),P,""]],sn={[K(st[0][0],P)]:1},h=0;
while(h<st.length){
let[b,p,mv]=st[h];
for(let x of b)o[x]=1;
let r=Q(a,o,p);
for(let i=0;i<b.length;i++)for(let k=0;k<4;k++){
let x=b[i],e=E[k],s=x-e,t=x+e;
if(r[s]<0||a[t]||o[t]||!v[t])continue;
let nb=b.slice();nb[i]=t;nb.sort((x,y)=>x-y);
let kk=K(nb,x);if(sn[kk])continue;sn[kk]=1;
let nm="udlr"[k];for(let y=s;y!=p;)nm="udlr"[r[y]%4]+nm,y=(r[y]/4)|0;nm=mv+nm;
if(nb+""==G+"")return nm;
st.push([nb,x,nm]);
if(st.length>3e5)return null;
}
for(let x of b)o[x]=0;
h++;
}
return null};
const R=L=>{
let row=(L[3]/w)|0,cut=new U(L[0].length);
for(let i=row*w;i<(row+1)*w;i++)cut[i]=1;
if(L[2].some(x=>cut[x]))return null;
let pa=Array(L[0].length).fill(-1),rs=[];
for(let s=0;s<L[0].length;s++){if(L[0][s]||cut[s]||pa[s]>=0)continue;
Q(L[0],cut,s);
for(let i of C)pa[i]=rs.length;
rs.push([[],[]])}
for(let x of L[2])rs[pa[x]][0].push(x);
for(let x of L[1]){if(pa[x]<0)return null;rs[pa[x]][1].push(x)}
if(rs.some(r=>r[0].length!=r[1].length))return null;
return rs.filter(r=>r[0].length)};
const G=t=>{
let L=P(t),rs=R(L);
if(!rs)return"";
let mv="",pl=L[3];
for(let r of rs){let a=L[0].slice();
for(let o of rs)if(o!==r)for(let x of o[0])a[x]=1;
let s=S(a,r[0],r[1],pl);
if(s===null)return"";
mv+=s;for(let c of s)pl+=E["udlr".indexOf(c)];r[0]=r[1]}
return mv};
for(let d of f.readdirSync(I).sort()){let m="";try{m=G(f.readFileSync(I+"/"+d+"/level.txt","utf8"))}catch(e){}f.mkdirSync(O+"/"+d,{recursive:true});f.writeFileSync(O+"/"+d+"/solution.txt",m+"\n")};
