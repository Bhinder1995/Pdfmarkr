import { readFileSync, writeFileSync } from 'fs';

const lines = readFileSync('src/components/ToolWorkspace.tsx', 'utf8').split('\n');
const keep1 = lines.slice(0, 50); // lines 1-50 (imports + type + ToolRenderer + ToolSuspense)
const keep2 = lines.slice(209);   // from old line 210 onward (the return statement starts here)

const inject = [
  '',
  'export const ToolWorkspace: React.FC<{ type: ToolType }> = ({ type }) => {',
  '  const [sidebarOpen, setSidebar] = useState(false);',
  '  const navigate = useNavigate();',
  '',
  '  const seo  = SEO_CONTENT[type];',
  '  const tool = TOOLS.find(t => t.id === type)!;',
  '  const related = tool ? TOOLS.filter(t => t.id !== type).slice(0, 3) : [];',
  '',
  "  const faqSchema = seo?.faqs ? {",
  '    "@context":"https://schema.org","@type":"FAQPage",',
  '    "mainEntity": seo.faqs.map(f => ({ "@type":"Question", "name":f.question, "acceptedAnswer":{ "@type":"Answer","text":f.answer } }))',
  '  } : null;',
  '',
];

const result = [...keep1, ...inject, ...keep2].join('\n');
writeFileSync('src/components/ToolWorkspace.tsx', result, 'utf8');
console.log('Done. New line count:', result.split('\n').length);
