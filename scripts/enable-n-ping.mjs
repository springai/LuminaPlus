import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const assets = path.join(root, "dist", "assets");

function replaceOnce(file, from, to) {
  const filePath = path.join(assets, file);
  const source = fs.readFileSync(filePath, "utf8");
  if (source.includes(to)) return;
  const first = source.indexOf(from);
  if (first < 0) {
    throw new Error(`Missing patch anchor in ${file}: ${from.slice(0, 80)}`);
  }
  if (source.indexOf(from, first + from.length) >= 0) {
    throw new Error(`Patch anchor is not unique in ${file}: ${from.slice(0, 80)}`);
  }
  fs.writeFileSync(filePath, source.slice(0, first) + to + source.slice(first + from.length));
}

function replaceAll(file, from, to) {
  const filePath = path.join(assets, file);
  const source = fs.readFileSync(filePath, "utf8");
  if (!source.includes(from)) {
    if (source.includes(to)) return;
    throw new Error(`Missing patch anchor in ${file}: ${from.slice(0, 80)}`);
  }
  fs.writeFileSync(filePath, source.split(from).join(to));
}

function replaceAllOptional(file, from, to) {
  const filePath = path.join(assets, file);
  const source = fs.readFileSync(filePath, "utf8");
  if (source.includes(from)) fs.writeFileSync(filePath, source.split(from).join(to));
}

// Discover every configured/discovered task instead of keeping only the first eight.
replaceAllOptional("Spinner-b_CiRbgc.js", ".slice(0,8)", "");
replaceAll("Spinner-b_CiRbgc.js", "&&(t.push(e),t.length===8))break", "){t.push(e)}}");
replaceAll("Spinner-b_CiRbgc.js", "!ei.test(r)||Number(r)>=8||ti(i)", "!ei.test(r)||ti(i)");
replaceOnce("Spinner-b_CiRbgc.js", "var Gr=[1,2,3]", "var Gr=[]");

replaceOnce(
  "Spinner-b_CiRbgc.js",
  "Fe=new Map(N.map(e=>[e.id,e]));",
  `Fe=new Map(N.map(e=>[e.id,e]));function syncPingTasks(){let e=[...new Set([...O,...(Array.isArray(A?.themeOptions?.homepageMultiPingTaskIds)?A.themeOptions.homepageMultiPingTaskIds:[]),...Object.keys(k).map(Number).filter(e=>Number.isSafeInteger(e)&&e>0)])].filter(e=>Number.isSafeInteger(e)&&e>0);if(e.length>0&&e.join()!==O.join())O=e;for(let e of O){if(Fe.has(e))continue;let t=e<=8?[\`ct\`,\`cu\`,\`cm\`,\`bd\`,\`node_1\`,\`node_2\`,\`node_3\`,\`node_4\`][e-1]:\`task_\${e}\`,n={id:e,key:t,name:k[e]||M[t]||\`线路 #\${e}\`,field:\`ping_\${t}\`,lossField:\`loss_\${t}\`};N.push(n);Fe.set(e,n);S.includes(t)||S.push(t);C[t]=\`lossTask\${e}\`;nt?.add?.(n.field);nt?.add?.(n.lossField)}if(!Array.isArray(A?.themeOptions?.homepageMultiPingTaskIds)&&O.length>0&&(Gr.length!==O.length||Gr.some((e,t)=>e!==O[t]))){Gr.length=0;Gr.push(...O)}}`,
);

replaceOnce(
  "Spinner-b_CiRbgc.js",
  "O=e.filter(e=>Number.isInteger(e)&&e>0)),ue=!0",
  "O=e.filter(e=>Number.isInteger(e)&&e>0)),syncPingTasks(),ue=!0",
);
replaceOnce(
  "Spinner-b_CiRbgc.js",
  "Object.assign(k,e.probes||{}),t++",
  "Object.assign(k,e.probes||{}),syncPingTasks(),t++",
);
replaceOnce(
  "Spinner-b_CiRbgc.js",
  "O=[...O,...Object.keys(k).map(Number).sort((e,t)=>e-t).filter(e=>!O.includes(e))]",
  "O=[...O,...Object.keys(k).map(Number).sort((e,t)=>e-t).filter(e=>!O.includes(e))],syncPingTasks()",
);
replaceOnce(
  "Spinner-b_CiRbgc.js",
  "Object.assign(k,i.probes||{}),O.length||(O=Object.keys(k).map(Number).sort((e,t)=>e-t)),De(i,r)",
  "Object.assign(k,i.probes||{}),O.length||(O=Object.keys(k).map(Number).sort((e,t)=>e-t)),syncPingTasks(),De(i,r)",
);
replaceOnce(
  "Spinner-b_CiRbgc.js",
  "let e=O.indexOf(t.task_id);if(e<0)continue;let n=r.get(t.ts)||{timestamp:t.ts*1e3},i=S[e];",
  "let e=Fe.get(t.task_id);if(!e)continue;let n=r.get(t.ts)||{timestamp:t.ts*1e3},i=e.key;",
);
replaceOnce(
  "Spinner-b_CiRbgc.js",
  "homepageMultiPingTaskIds:[1,2,3]",
  "homepageMultiPingTaskIds:Gr.slice()",
);
replaceOnce(
  "Spinner-b_CiRbgc.js",
  "name:Te()[N[n.taskId-1].key]",
  "name:Te()[N.find(e=>e.id===n.taskId)?.key]||`线路 #${n.taskId}`",
);
replaceOnce(
  "index-B21hM2jl.js",
  "function ml(e){let{homepageMultiPingTaskIds:t,homepagePingLineOverrides:n}=F(),r=st(n,e),i=fl(e);return(0,I.useMemo)(()=>we(we(t,r),i),[t,i,r])}",
  "function ml(e){let{homepageMultiPingTaskIds:t,homepagePingLineOverrides:n}=F(),r=st(n,e),i=fl(e),a=sl(e),o=(0,I.useMemo)(()=>_l(a),[a]);return(0,I.useMemo)(()=>[...new Set([...we(we(t,r),i),...o])],[t,i,r,o])}",
);
replaceOnce(
  "index-B21hM2jl.js",
  "(0,L.jsx)(`span`,{children:`LuminaPlus`})",
  "(0,L.jsx)(`a`,{className:`site-footer-link`,href:`https://github.com/springai/LuminaPlus/`,target:`_blank`,rel:`noopener noreferrer`,children:`LuminaPlus`})",
);

replaceOnce(
  "ThemeManage-QSTUzB0r.js",
  "It=Math.min(8,Math.max(U.length,1))",
  "It=Math.max(U.length,1)",
);
replaceAll(
  "ThemeManage-QSTUzB0r.js",
  "从 Monitor 历史中发现的线路最多映射 8 条",
  "从 Monitor 历史中发现的线路将全部映射",
);

const readme = path.join(root, "README.md");
const readmeSource = fs.readFileSync(readme, "utf8");
fs.writeFileSync(
  readme,
  readmeSource.replace(
    "每张卡片可自定义线路：电信 / 联通 / 移动，最多能配 8 条线路",
    "每张卡片可自定义线路：电信 / 联通 / 移动，支持 N 条线路",
  ),
);

console.log("Enabled N latency monitor lines in the built theme.");
