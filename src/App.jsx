import React, { useState, useMemo } from 'react';
import { 
  Users, FileText, BarChart3, CheckSquare, MessageSquare, Home, 
  ShieldCheck, ExternalLink, Save, Clock, UserPlus, Download, 
  CheckCircle2, Printer, ChevronRight, Trash2, TrendingUp, Settings,
  ClipboardCheck, AlertTriangle, Info, Camera, Zap, Droplets, Shield,
  BookOpen, Scale, FolderOpen, AlertCircle, CheckCircle, Wallet, Gavel
} from 'lucide-react';

// --- COMPONENTES DE UI EXTERNOS ---
const SectionHeader = ({ title, icon: Icon, agendaIndex, agendaStatus, toggleAgendaItem }) => (
  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 border-b pb-4 border-slate-200 print:hidden">
    <div className="flex items-center gap-3">
      <div className="p-3 bg-blue-600 rounded-xl text-white shadow-lg shadow-blue-200">
        {Icon && <Icon size={24} />}
      </div>
      <div>
        <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight">{title}</h2>
        <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">
          {agendaIndex === 2 ? 'Puntos 3 y 4 del Orden del día' : 
           agendaIndex === 8 ? 'Puntos 9 y 10 del Orden del día' : 
           `Punto ${agendaIndex + 1} del Orden del día`}
        </p>
      </div>
    </div>
    <button 
      onClick={() => toggleAgendaItem(agendaIndex)}
      className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-sm transition-all border-2 ${
        agendaStatus[agendaIndex] 
        ? 'bg-emerald-500 border-emerald-500 text-white shadow-lg shadow-emerald-100' 
        : 'bg-white border-slate-200 text-slate-400 hover:border-emerald-500 hover:text-emerald-500'
      }`}
    >
      <CheckCircle2 size={18} />
      {agendaStatus[agendaIndex] ? 'PUNTO EVACUADO' : 'MARCAR COMO EVACUADO'}
    </button>
  </div>
);

const Card = ({ children, title, className = "" }) => (
  <div className={`bg-white rounded-2xl shadow-sm border border-slate-100 p-6 ${className}`}>
    {title && <h3 className="text-lg font-bold text-slate-700 mb-5 flex items-center gap-2 text-balance">
      <div className="w-1.5 h-6 bg-blue-600 rounded-full shrink-0"></div>
      {title}
    </h3>}
    {children}
  </div>
);

// --- BASE DE DATOS COPROPIEDAD ---
const INITIAL_DATA = [
  { id: 1, unidad: '201', propietario: 'ANDRES LOPEZ ERAZO', coeficiente: 1.68 },
  { id: 2, unidad: '202', propietario: 'JORGE GOMEZ', coeficiente: 2.39 },
  { id: 3, unidad: '203', propietario: 'AMELIA ENRIQUEZ', coeficiente: 2.04 },
  { id: 4, unidad: '204', propietario: 'JOSE ANTONIO ALAVA VITERI', coeficiente: 2.09 },
  { id: 5, unidad: '205', propietario: 'ANDREA MARTINEZ', coeficiente: 2.41 },
  { id: 6, unidad: '206', propietario: 'ALFREDO ROJAS', coeficiente: 1.80 },
  { id: 7, unidad: '301', propietario: 'GUILLERMO ANGEL ROSERO', coeficiente: 2.04 },
  { id: 8, unidad: '302', propietario: 'ANTONIO ANGEL BARBATO', coeficiente: 2.55 },
  { id: 9, unidad: '303', propietario: 'RICARDO MORA', coeficiente: 1.65 },
  { id: 10, unidad: '304', propietario: 'ALBA LUCIA ENRIQUEZ', coeficiente: 3.11 },
  { id: 11, unidad: '305', propietario: 'VICENTA NARCISA LUNA', coeficiente: 3.19 },
  { id: 12, unidad: '401', propietario: 'BETTY DE PADILLA MONTENEGRO', coeficiente: 3.08 },
  { id: 13, unidad: '402', propietario: 'JAIRO CASTILLO', coeficiente: 1.33 },
  { id: 14, unidad: '403', propietario: 'GRACIELA BARBATO STORNAIUOLO', coeficiente: 1.94 },
  { id: 15, unidad: '404', propietario: 'ANDREAS QUAST HAEBERLIN', coeficiente: 3.08 },
  { id: 16, unidad: '405', propietario: 'ENRIQUE IGNACIO PAZ MESIAS', coeficiente: 3.28 },
  { id: 17, unidad: '501', propietario: 'HUGO RUIZ ERAZO', coeficiente: 1.66 },
  { id: 18, unidad: '502', propietario: 'NIVIA PEREZ CORAL', coeficiente: 2.40 },
  { id: 19, unidad: '503', propietario: 'MIRYAM FABIOLA SARASTY', coeficiente: 1.75 },
  { id: 20, unidad: '504', propietario: 'CLARA INES SILVA', coeficiente: 3.22 },
  { id: 21, unidad: '505', propietario: 'LUZ ANGELICA FAJARDO - JAIME CASTRO', coeficiente: 1.35 },
  { id: 22, unidad: '506', propietario: 'OMAR CALVACHE LOPEZ', coeficiente: 1.75 },
  { id: 23, unidad: '601', propietario: 'CARLOS BENAVIDES', coeficiente: 6.18 },
  { id: 24, unidad: '602', propietario: 'JAIRO CASTILLO', coeficiente: 1.68 },
  { id: 25, unidad: '603', propietario: 'ISABEL CRISTINA MUÑOZ', coeficiente: 1.33 },
  { id: 26, unidad: '604', propietario: 'SUSAN ALICIA KOCH SANTACRUZ', coeficiente: 3.09 },
  { id: 27, unidad: '701', propietario: 'MARGARITA INSUASY', coeficiente: 3.18 },
  { id: 28, unidad: '702', propietario: 'LIBARDO HUMBERTO CABRERA', coeficiente: 3.78 },
  { id: 29, unidad: '703', propietario: 'ALVARO ANDRES GOMEZ', coeficiente: 3.23 },
  { id: 30, unidad: '801', propietario: 'MANUEL GUERRERO MORA - GERTRUDIS QUIJANO', coeficiente: 5.97 },
  { id: 31, unidad: '802', propietario: 'DORIS ANGELICA BASANTE', coeficiente: 4.02 },
  { id: 32, unidad: '803', propietario: 'LILIANA SANTACRUZ - GERARDO ENRIQUEZ', coeficiente: 4.86 },
  { id: 33, unidad: '804', propietario: 'VICTOR IBARRA - ANDREA RIASCOS', coeficiente: 6.01 },
  { id: 34, unidad: '805', propietario: 'ANDREAS QUAST HAEBERLIN', coeficiente: 6.55 },
  { id: 35, unidad: 'pq 45 dep 90', propietario: 'DOMENICO BARBATO', coeficiente: 0.33 }
];

const ORDEN_DIA_OFICIAL = [
  "Registro de firmas y verificación del quórum.",
  "Lectura y aprobación del orden del día.",
  "Elección de dignatarios de la Asamblea (Presidente y Secretario).",
  "Elección del comité de verificación de la presente acta.",
  "Validación de la Acta Anterior.",
  "Presentación informe de Administración.",
  "Presentación y aprobación de Estados Financieros a diciembre 31 de 2025.",
  "Presentación y aprobación del proyecto de presupuesto de ingresos y gastos 2026.",
  "Elección del consejo de administración.",
  "Elección Comité de convivencia.",
  "Proposiciones y varios."
];

export default function App() {
  const [activeSection, setActiveSection] = useState('bienvenida');
  const [asistencia, setAsistencia] = useState(INITIAL_DATA.map(c => ({ ...c, presente: false })));
  const [agendaStatus, setAgendaStatus] = useState(new Array(ORDEN_DIA_OFICIAL.length).fill(false));
  const [dignatarios, setDignatarios] = useState({ presidente: '', secretario: '', comision: '' });
  const [obsAgenda, setObsAgenda] = useState("");
  const [proposiciones, setProposiciones] = useState([]);
  const [tempProp, setTempProp] = useState({ proponente: '', texto: '' });
  const [postuladosConsejo, setPostuladosConsejo] = useState([]);
  const [postuladosConvivencia, setPostuladosConvivencia] = useState([]);

  const totalQuorum = useMemo(() => {
    const total = asistencia.filter(a => a.presente).reduce((acc, curr) => acc + curr.coeficiente, 0);
    return parseFloat(total.toFixed(2));
  }, [asistencia]);

  const progress = useMemo(() => {
    return (agendaStatus.filter(i => i).length / ORDEN_DIA_OFICIAL.length) * 100;
  }, [agendaStatus]);

  const handleNombreChange = (id, nuevoNombre) => {
    setAsistencia(prev => prev.map(a => a.id === id ? { ...a, propietario: nuevoNombre.toUpperCase() } : a));
  };

  const toggleAsistencia = (id) => {
    setAsistencia(prev => prev.map(a => a.id === id ? { ...a, presente: !a.presente } : a));
  };

  const toggleAgendaItem = (idx) => {
    const newStatus = [...agendaStatus];
    const isNewStateCompleted = !newStatus[idx];
    newStatus[idx] = isNewStateCompleted;
    if (idx === 2) newStatus[3] = isNewStateCompleted;
    if (idx === 8) newStatus[9] = isNewStateCompleted;
    setAgendaStatus(newStatus);
  };

  const addProposicion = () => {
    if (tempProp.proponente && tempProp.texto) {
      setProposiciones([...proposiciones, { ...tempProp, id: Date.now() }]);
      setTempProp({ proponente: '', texto: '' });
    }
  };

  const removeProposicion = (id) => setProposiciones(proposiciones.filter(p => p.id !== id));

  const togglePostulacion = (propietario, tipo) => {
    if (tipo === 'consejo') {
      setPostuladosConsejo(prev => prev.includes(propietario) ? prev.filter(p => p !== propietario) : [...prev, propietario]);
    } else {
      setPostuladosConvivencia(prev => prev.includes(propietario) ? prev.filter(p => p !== propietario) : [...prev, propietario]);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans text-slate-900 print:bg-white">
      
      {/* SIDEBAR */}
      <aside className="w-72 bg-slate-900 text-slate-400 fixed h-full flex flex-col shadow-2xl z-20 print:hidden">
        <div className="p-8 border-b border-slate-800 text-center">
          <h1 className="text-white font-black text-xl tracking-tighter flex flex-col items-center gap-1">
            <ShieldCheck className="text-blue-500" size={28} />
            <span className="uppercase text-xs font-bold tracking-widest opacity-60">Edificio</span>
            <span className="text-blue-500 uppercase leading-none">Jardín del <br/> Morasurco 2026</span>
          </h1>
          <p className="text-[10px] font-bold mt-4 text-slate-500 uppercase tracking-widest">Gestión Profesional PH</p>
        </div>
        
        <nav className="flex-1 overflow-y-auto p-4 space-y-1">
          {[
            { id: 'bienvenida', label: 'Inicio', icon: Home },
            { id: 'quorum', label: '1. Quórum', icon: Users },
            { id: 'orden', label: '2. Orden del Día', icon: CheckSquare },
            { id: 'dignatarios', label: '3-4. Dignatarios', icon: UserPlus },
            { id: 'acta', label: '5. Acta Anterior', icon: FileText },
            { id: 'gestion', label: '6. Gestión 2025', icon: TrendingUp },
            { id: 'financiero', label: '7. Financiero', icon: BarChart3 },
            { id: 'presupuesto', label: '8. Presupuesto', icon: Settings },
            { id: 'postulaciones', label: '9-10. Elecciones', icon: UserPlus },
            { id: 'proposiciones', label: '11. Proposiciones', icon: MessageSquare },
            { id: 'resumen', label: 'Resumen Final', icon: Printer },
          ].map(item => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all text-sm font-bold ${
                  activeSection === item.id 
                  ? 'bg-blue-600 text-white shadow-xl shadow-blue-900/20' 
                  : 'hover:bg-slate-800 hover:text-white'
                }`}
              >
                <Icon size={18} />
                {item.label}
              </button>
            );
          })}
        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <main className="ml-72 flex-1 pb-20 print:ml-0">
        
        {/* HEADER */}
        <header className="sticky top-0 bg-white/90 backdrop-blur-md border-b border-slate-200 px-8 py-4 z-10 flex justify-between items-center print:bg-white print:border-none print:shadow-none">
          <div className="flex gap-10">
            <div>
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Quórum en Vivo</span>
              <div className="flex items-center gap-3">
                <span className={`text-2xl font-black ${totalQuorum >= 50.1 ? 'text-emerald-600' : 'text-amber-600'}`}>
                  {totalQuorum.toFixed(2)}%
                </span>
                <span className={`px-2 py-0.5 rounded text-[10px] font-black print:hidden ${totalQuorum >= 50.1 ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                  {totalQuorum >= 50.1 ? 'DELIBERATORIO' : 'PENDIENTE'}
                </span>
              </div>
            </div>
            
            <div className="border-l pl-8 border-slate-200">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Presidente Electo</span>
              <div className="flex items-center gap-3 mt-1">
                <span className="text-sm font-black text-slate-800 uppercase truncate max-w-[150px]">
                  {dignatarios.presidente || 'PENDIENTE'}
                </span>
              </div>
            </div>

            <div className="border-l pl-8 border-slate-200 print:hidden">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Avance Asamblea</span>
              <div className="flex items-center gap-3 mt-1">
                  <div className="h-2.5 w-24 bg-slate-100 rounded-full overflow-hidden border border-slate-200 shadow-inner">
                    <div className="h-full bg-blue-600 transition-all duration-1000 ease-out shadow-[0_0_8px_rgba(37,99,235,0.4)]" style={{width: `${progress}%`}}></div>
                 </div>
                 <span className="text-sm font-black text-blue-600">{Math.round(progress)}%</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 text-right">
            <div>
               <p className="text-sm font-black text-slate-800 uppercase leading-none tracking-tight">Edificio Jardín del Morasurco</p>
               <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">San Juan de Pasto | 29 Ene 2026</p>
            </div>
            <div className="h-10 w-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-400 print:hidden">
               <Clock size={20} />
            </div>
          </div>
        </header>

        <div className="max-w-6xl mx-auto p-10 space-y-12 print:p-0">
          
          {/* SECCIÓN INICIO - Ocultar en impresión */}
          <div className={`${activeSection === 'bienvenida' ? 'block' : 'hidden'} print:hidden`}>
            <div className="space-y-10 animate-in fade-in slide-in-from-bottom-6 text-center">
              <div className="bg-slate-900 rounded-[40px] p-16 text-white relative overflow-hidden shadow-2xl">
                 <div className="relative z-10">
                    <span className="bg-blue-600 text-[10px] font-black uppercase px-3 py-1.5 rounded-full mb-6 inline-block tracking-widest">Vigencia 2026</span>
                    <h1 className="text-6xl font-black mb-6 leading-none tracking-tighter uppercase tracking-widest">Edificio Jardín <br/><span className="text-blue-500 italic">del Morasurco</span></h1>
                    <p className="text-slate-400 max-w-xl text-lg font-medium leading-relaxed mx-auto">Asamblea General Ordinaria. Decisiones estratégicas para la valorización del patrimonio común.</p>
                 </div>
                 <div className="absolute top-0 right-0 w-1/3 h-full bg-blue-600/10 skew-x-12 translate-x-20"></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center uppercase">
                 <Card title="Identificación" className="border-l-4 border-blue-600">
                     <div className="space-y-2 text-left">
                       <p className="text-sm font-bold text-slate-500">NIT: <span className="text-slate-800 font-black">900.530.304-2</span></p>
                       <p className="text-sm font-bold text-slate-500">Dirección: <span className="text-slate-800 font-black tracking-tight text-xs uppercase">Carrera 42 No. 20-A 20</span></p>
                     </div>
                 </Card>
                 <Card title="Asamblea Anterior" className="border-l-4 border-amber-600">
                    <p className="text-sm text-slate-600 mb-4 font-medium italic">"Validación de compromisos y acuerdos del periodo 2025."</p>
                    <button onClick={() => setActiveSection('acta')} className="text-xs font-black text-amber-700 uppercase flex items-center gap-2 hover:underline mx-auto">Ir a Validación de Acta <ChevronRight size={14}/></button>
                 </Card>
                 <Card title="Unidades Totales" className="bg-blue-600 text-white border-none shadow-blue-200 shadow-xl flex flex-col justify-center items-center text-center">
                    <p className="text-4xl font-black mb-1">{asistencia.length}</p>
                    <p className="text-[10px] font-black uppercase tracking-widest opacity-80">Patrimonio Común</p>
                 </Card>
              </div>
            </div>
          </div>

          {/* 1. QUÓRUM - Siempre en PDF */}
          <div className={`${activeSection === 'quorum' ? 'block' : 'hidden'} print:block print:break-after-page`}>
            <SectionHeader title="Verificación del Quórum" icon={Users} agendaIndex={0} agendaStatus={agendaStatus} toggleAgendaItem={toggleAgendaItem} />
            <Card>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm uppercase">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-400 font-black uppercase tracking-widest">
                    <tr>
                      <th className="p-4">Unidad</th>
                      <th className="p-4">Propietario (Editable)</th>
                      <th className="p-4 text-center">Coef (%)</th>
                      <th className="p-4 text-center print:hidden">Asistencia</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {asistencia.map((item) => (
                      <tr key={item.id} className={`${item.presente ? 'bg-blue-50/40' : ''} hover:bg-slate-50 transition-colors`}>
                        <td className="p-4 font-black text-slate-800">{item.unidad}</td>
                        <td className="p-4 font-bold text-slate-600">
                          <input type="text" value={item.propietario} onChange={(e) => handleNombreChange(item.id, e.target.value)} className="bg-transparent border-none w-full focus:ring-1 focus:ring-blue-400 rounded px-1 outline-none transition-all uppercase" />
                        </td>
                        <td className="p-4 font-black text-slate-400 text-center">{item.coeficiente.toFixed(2)}%</td>
                        <td className="p-4 text-center print:hidden">
                          <button onClick={() => toggleAsistencia(item.id)} className={`w-14 h-7 rounded-full relative transition-all ${item.presente ? 'bg-emerald-500' : 'bg-slate-200'}`}>
                            <div className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-all ${item.presente ? 'left-8' : 'left-1'}`}></div>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>

          {/* 2. ORDEN DEL DÍA - Siempre en PDF */}
          <div className={`${activeSection === 'orden' ? 'block' : 'hidden'} print:block print:break-after-page uppercase`}>
            <SectionHeader title="Lectura y Aprobación del Orden del Día" icon={CheckSquare} agendaIndex={1} agendaStatus={agendaStatus} toggleAgendaItem={toggleAgendaItem} />
            <Card>
              <div className="grid gap-3 mb-8">
                 {ORDEN_DIA_OFICIAL.map((punto, idx) => (
                   <div key={idx} className={`p-5 rounded-2xl border-2 flex items-center gap-4 transition-all ${agendaStatus[idx] ? 'border-emerald-500 bg-emerald-50 shadow-sm' : 'border-slate-100 bg-slate-50 opacity-70'}`}>
                      <div className={`h-10 w-10 rounded-full flex items-center justify-center font-black text-sm ${agendaStatus[idx] ? 'bg-emerald-500 text-white' : 'bg-slate-200 text-slate-500'}`}>
                         {idx + 1}
                      </div>
                      <span className={`font-bold text-sm ${agendaStatus[idx] ? 'text-emerald-900' : 'text-slate-600'}`}>{punto}</span>
                   </div>
                 ))}
              </div>
              <div className="pt-6 border-t border-slate-100">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 block text-left">Observaciones o Constancias de Aprobación</label>
                <textarea 
                  className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl font-bold text-sm h-32 outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all uppercase"
                  placeholder="Registre modificaciones o constancias..."
                  value={obsAgenda}
                  onChange={(e) => setObsAgenda(e.target.value)}
                ></textarea>
              </div>
            </Card>
          </div>

          {/* 3-4. DIGNATARIOS - Siempre en PDF */}
          <div className={`${activeSection === 'dignatarios' ? 'block' : 'hidden'} print:block print:break-after-page uppercase`}>
            <SectionHeader title="Elección de Dignatarios" icon={UserPlus} agendaIndex={2} agendaStatus={agendaStatus} toggleAgendaItem={toggleAgendaItem} />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
               <Card title="Presidente y Secretario" className="md:col-span-2">
                  <div className="space-y-6">
                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                       <div>
                          <label className="text-[10px] font-black text-slate-400 uppercase mb-2 block tracking-widest">Presidente de Asamblea</label>
                          <input type="text" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl font-bold text-sm focus:border-blue-500 outline-none uppercase" placeholder="Nombre completo..." value={dignatarios.presidente} onChange={(e) => setDignatarios({...dignatarios, presidente: e.target.value})} />
                       </div>
                       <div>
                          <label className="text-[10px] font-black text-slate-400 uppercase mb-2 block tracking-widest">Secretario de Asamblea</label>
                          <input type="text" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl font-bold text-sm focus:border-blue-500 outline-none uppercase" placeholder="Nombre completo..." value={dignatarios.secretario} onChange={(e) => setDignatarios({...dignatarios, secretario: e.target.value})} />
                       </div>
                     </div>
                     <div>
                        <label className="text-[10px] font-black text-slate-400 uppercase mb-2 block tracking-widest">Comisión Verificadora del Acta (Punto 4)</label>
                        <textarea className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl font-bold text-sm h-24 focus:border-blue-500 outline-none uppercase" placeholder="Designados..." value={dignatarios.comision} onChange={(e) => setDignatarios({...dignatarios, comision: e.target.value})}></textarea>
                     </div>
                  </div>
               </Card>
               <div className="bg-slate-900 rounded-3xl p-8 text-white shadow-xl flex flex-col justify-center text-center print:hidden">
                  <Scale className="text-blue-400 mb-4 mx-auto" size={32} />
                  <h4 className="font-bold mb-2 uppercase">Base Legal</h4>
                  <p className="text-[11px] leading-relaxed text-slate-400 uppercase">Se nombran a quienes dirigirán la sesión y a la comisión que validará el acta final.</p>
               </div>
            </div>
          </div>

          {/* 5. ACTA ANTERIOR */}
          <div className={`${activeSection === 'acta' ? 'block' : 'hidden'} print:block print:break-after-page uppercase`}>
            <SectionHeader title="Validación Acta Anterior (2025)" icon={FileText} agendaIndex={4} agendaStatus={agendaStatus} toggleAgendaItem={toggleAgendaItem} />
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <Card className="md:col-span-3">
                <div className="flex flex-col items-center py-16 px-10 border-4 border-dashed border-slate-100 rounded-[40px] text-center bg-slate-50/50 text-center">
                   <FileText size={64} className="text-blue-600 mb-6" />
                   <h4 className="text-2xl font-black text-slate-800 mb-2 uppercase tracking-tighter">Acta Ordinaria 2025</h4>
                   <a href="https://drive.google.com/file/d/1LGi2vIQTRBIqn-aAkH9gRBN2Z2tUIEPx/view?usp=sharing" target="_blank" rel="noreferrer" className="flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-2xl font-black text-sm hover:bg-blue-700 transition-all shadow-xl shadow-blue-200 uppercase tracking-widest"><ExternalLink size={20} /> Abrir Drive</a>
                </div>
              </Card>
              <Card title="Validación">
                <div className="space-y-6">
                  <div className="p-4 bg-emerald-50 rounded-2xl border-2 border-emerald-100 text-center">
                    <label className="flex items-center gap-3 cursor-pointer group justify-center">
                      <input type="checkbox" className="w-6 h-6 accent-emerald-500" />
                      <span className="text-[10px] font-black text-emerald-800 uppercase leading-none">Aprobada sin cambios</span>
                    </label>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          {/* 6. GESTIÓN 2025 - RESTAURADO COMPLETO */}
          <div className={`${activeSection === 'gestion' ? 'block' : 'hidden'} print:block print:break-after-page uppercase`}>
            <SectionHeader title="Informe Integral de Gestión 2025" icon={TrendingUp} agendaIndex={5} agendaStatus={agendaStatus} toggleAgendaItem={toggleAgendaItem} />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 text-left">
              <Card title="📑 Reporte de Seguros" className="border-l-4 border-l-blue-600">
                <div className="space-y-4">
                  <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
                    <table className="w-full text-left text-[10px] font-bold uppercase">
                      <thead className="bg-slate-50 text-slate-400 font-black">
                        <tr><th className="p-2.5">Item</th><th className="p-2.5 text-right">Valor COP</th></tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        <tr><td className="p-2.5">Bienes Comunes</td><td className="p-2.5 text-right font-black text-blue-600">$12.500.000.000</td></tr>
                        <tr><td className="p-2.5">Bienes Privados</td><td className="p-2.5 text-right font-black">$3.600.000.000</td></tr>
                        <tr><td className="p-2.5">Maquinaria y Equipos</td><td className="p-2.5 text-right font-black">$450.000.000</td></tr>
                        <tr className="bg-blue-50/50"><td className="p-2.5 uppercase">Resp. Civil Extracontractual</td><td className="p-2.5 text-right font-black">$500.000.000</td></tr>
                        <tr><td className="p-2.5 uppercase">D&O (Blindaje Administrativo)</td><td className="p-2.5 text-right font-black">$100.000.000</td></tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-xl text-[10px] font-black">
                    <p>Vigencia: 02 Ago 2025 al 02 Ago 2026</p>
                    <p className="text-blue-600">Inversión Anual: $13.294.479</p>
                  </div>
                </div>
              </Card>

              <Card title="📑 Matriz de Contratos" className="border-l-4 border-l-emerald-600">
                <div className="overflow-x-auto text-left">
                  <table className="w-full text-left text-[10px] font-bold uppercase">
                    <thead className="bg-slate-50 text-slate-400 font-black">
                      <tr><th className="p-2.5">Servicio</th><th className="p-2.5">Estatus</th><th className="p-2.5">Observación</th></tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      <tr><td className="p-2.5">Vigilancia (PROLISEG)</td><td className="p-2.5 text-emerald-600">Vigente</td><td className="p-2.5 text-[9px]">Hasta Mayo 2026.</td></tr>
                      <tr><td className="p-2.5">Aseo (Escoba Mágica)</td><td className="p-2.5 text-emerald-600">Renovación</td><td className="p-2.5 text-[9px]">Anual Dic 2025.</td></tr>
                      <tr><td className="p-2.5 text-red-600 font-black">Ascensores (Eurolift)</td><td className="p-2.5 text-red-600">Vencido</td><td className="p-2.5 text-[9px] font-black">Pago por visita.</td></tr>
                      <tr><td className="p-2.5">Planta (Cummins)</td><td className="p-2.5 text-emerald-600">Vigente</td><td className="p-2.5 text-[9px]">Mantenimiento programado.</td></tr>
                      <tr><td className="p-2.5">Contabilidad</td><td className="p-2.5 text-emerald-600">Cierre</td><td className="p-2.5 text-[9px]">Luz Janeth Lopez.</td></tr>
                    </tbody>
                  </table>
                </div>
              </Card>
            </div>

            <Card title="C. Desglose de Mantenimientos e Inversiones" className="mt-8">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 text-left">
                <div className="lg:col-span-2 p-6 bg-slate-50 rounded-3xl border-2 border-slate-100">
                   <div className="flex items-center gap-3 mb-6 text-blue-600"><Droplets size={24}/><h4 className="font-black uppercase tracking-tighter">1. Obras de Impermeabilización y Recuperación</h4></div>
                   <p className="text-[11px] text-slate-500 mb-6 italic uppercase">Intervención crítica en cúpulas y terrazas para solucionar filtraciones históricas.</p>
                   <div className="grid grid-cols-2 gap-4 text-[10px] font-black uppercase text-left">
                      <div className="space-y-2">
                         <p className="text-slate-400 tracking-widest">Proveedor:</p>
                         <p>Casteir Moreno Mosquera</p>
                      </div>
                      <div className="space-y-2">
                         <p className="text-slate-400 tracking-widest">Inversión:</p>
                         <p className="text-blue-600 text-lg">$24.038.000</p>
                      </div>
                   </div>
                   <ul className="mt-6 space-y-2 text-[9px] font-bold text-slate-500 grid grid-cols-1 sm:grid-cols-2 gap-2 border-t pt-4 uppercase">
                      <li>• Levantamiento y reinstalación de tabletas.</li>
                      <li>• Sistema Multicapa con tela poliéster.</li>
                      <li>• Acabado Sika Transparente estético.</li>
                      <li>• Juntas selladas con Sika Flex Gris.</li>
                      <li>• Fabricación de gradas de seguridad.</li>
                   </ul>
                </div>
                <div className="p-6 border-2 border-slate-100 rounded-3xl space-y-6 text-left">
                   <div>
                      <p className="text-[10px] font-black text-amber-500 uppercase mb-2 flex items-center gap-2 tracking-widest">< Zap size={16}/> 2. Ascensores (Eurolift)</p>
                      <p className="text-2xl font-black text-slate-800 tracking-tighter">$12.358.476</p>
                   </div>
                   <div className="border-t pt-4">
                      <p className="text-[9px] font-black text-slate-400 mb-4 tracking-widest uppercase">3. Otros Mantenimientos</p>
                      <div className="space-y-2 text-[10px] font-black uppercase">
                         <p className="flex justify-between"><span>Planta Eléctrica:</span> <span className="text-blue-600">$3.978.890</span></p>
                         <p className="flex justify-between"><span>Puerta Vehicular:</span> <span className="text-blue-600">$2.620.000</span></p>
                         <p className="flex justify-between"><span>Iluminación LED:</span> <span className="text-blue-600">$968.890</span></p>
                      </div>
                   </div>
                </div>
              </div>
            </Card>
          </div>

          {/* 7. FINANCIERO */}
          <div className={`${activeSection === 'financiero' ? 'block' : 'hidden'} print:block print:break-after-page uppercase text-center`}>
            <SectionHeader title="Estados Financieros 2025" icon={BarChart3} agendaIndex={6} agendaStatus={agendaStatus} toggleAgendaItem={toggleAgendaItem} />
            <Card>
                 <BarChart3 size={48} className="text-blue-600 mb-6 mx-auto" />
                 <h4 className="text-xl font-black text-slate-800 mb-6 uppercase tracking-widest">Detalle Contable en Tiempo Real</h4>
                 <a href="https://docs.google.com/spreadsheets/d/17nzHlHU7L40trWkI5HT9DOPKx120weQq/edit" target="_blank" rel="noreferrer" className="bg-emerald-600 text-white px-8 py-4 rounded-2xl font-black text-xs inline-flex items-center gap-2 uppercase tracking-widest"><ExternalLink size={18} /> Editar Drive</a>
            </Card>
          </div>

          {/* 8. PRESUPUESTO */}
          <div className={`${activeSection === 'presupuesto' ? 'block' : 'hidden'} print:block print:break-after-page uppercase text-center`}>
             <SectionHeader title="Presupuesto Vigencia 2026" icon={Settings} agendaIndex={7} agendaStatus={agendaStatus} toggleAgendaItem={toggleAgendaItem} />
             <Card title="Proyecto de Gastos e Ingresos">
                <a href="https://docs.google.com/spreadsheets/d/1Iv5-aObZDZU70S5nHUImsOmyFn-CJauv/edit" target="_blank" rel="noreferrer" className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black text-sm uppercase flex items-center justify-center gap-3 shadow-xl uppercase tracking-widest"><FileText size={20} /> Ver Documento Excel</a>
             </Card>
          </div>

          {/* 9-10. ELECCIONES - RESTAURADO LISTA DE POSTULANTES */}
          <div className={`${activeSection === 'postulaciones' ? 'block' : 'hidden'} print:block print:break-after-page uppercase text-center`}>
             <SectionHeader title="Elección de Órganos de Administración" icon={UserPlus} agendaIndex={8} agendaStatus={agendaStatus} toggleAgendaItem={toggleAgendaItem} />
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 text-left uppercase">
                <Card title="Consejo de Administración">
                   <div className="space-y-6">
                      <div className="flex flex-wrap gap-2 min-h-[40px] p-4 bg-blue-50 rounded-2xl border-2 border-blue-100 justify-center">
                         {postuladosConsejo.map(p => (
                            <span key={p} className="bg-blue-600 text-white px-3 py-1 rounded-full text-[10px] font-black flex items-center gap-2 uppercase tracking-widest">{p} <button onClick={() => togglePostulacion(p, 'consejo')} className="print:hidden"><Trash2 size={12}/></button></span>
                         ))}
                      </div>
                      <div className="max-h-60 overflow-y-auto rounded-2xl border border-slate-100 print:hidden">
                         {asistencia.map(r => (
                            <div key={r.id} className="flex items-center justify-between p-3 border-b border-slate-50 hover:bg-slate-50">
                               <span className="text-xs font-bold text-slate-700 uppercase tracking-widest">{r.unidad} - {r.propietario}</span>
                               <button onClick={() => togglePostulacion(r.propietario, 'consejo')} className={`text-[10px] font-black px-3 py-1.5 rounded-xl ${postuladosConsejo.includes(r.propietario) ? 'bg-red-500 text-white' : 'bg-blue-100 text-blue-600'} uppercase tracking-widest`}>{postuladosConsejo.includes(r.propietario) ? 'Remover' : 'Elegir'}</button>
                            </div>
                         ))}
                      </div>
                   </div>
                </Card>
                <Card title="Comité de Convivencia">
                   <div className="space-y-6">
                      <div className="flex flex-wrap gap-2 min-h-[40px] p-4 bg-emerald-50 rounded-2xl border-2 border-emerald-100 justify-center">
                         {postuladosConvivencia.map(p => (
                            <span key={p} className="bg-emerald-600 text-white px-3 py-1 rounded-full text-[10px] font-black flex items-center gap-2 uppercase tracking-widest">{p} <button onClick={() => togglePostulacion(p, 'convivencia')} className="print:hidden"><Trash2 size={12}/></button></span>
                         ))}
                      </div>
                      <div className="max-h-60 overflow-y-auto rounded-2xl border border-slate-100 print:hidden">
                         {asistencia.map(r => (
                            <div key={r.id} className="flex items-center justify-between p-3 border-b border-slate-50 hover:bg-slate-50">
                               <span className="text-xs font-bold text-slate-700 uppercase tracking-widest">{r.unidad} - {r.propietario}</span>
                               <button onClick={() => togglePostulacion(r.propietario, 'convivencia')} className={`text-[10px] font-black px-3 py-1.5 rounded-xl ${postuladosConvivencia.includes(r.propietario) ? 'bg-red-500 text-white' : 'bg-emerald-100 text-emerald-600'} uppercase tracking-widest`}>{postuladosConvivencia.includes(r.propietario) ? 'Remover' : 'Elegir'}</button>
                            </div>
                         ))}
                      </div>
                   </div>
                </Card>
             </div>
          </div>

          {/* 11. PROPOSICIONES - Siempre en PDF */}
          <div className={`${activeSection === 'proposiciones' ? 'block' : 'hidden'} print:block print:break-after-page uppercase text-center`}>
             <SectionHeader title="Proposiciones y Varios" icon={MessageSquare} agendaIndex={10} agendaStatus={agendaStatus} toggleAgendaItem={toggleAgendaItem} />
             <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left uppercase">
                <div className="md:col-span-1 print:hidden">
                  <Card title="Nuevo Registro">
                      <div className="space-y-4 font-black">
                         <input type="text" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm outline-none focus:border-blue-500 uppercase tracking-widest" placeholder="Unidad" value={tempProp.proponente} onChange={(e) => setTempProp({...tempProp, proponente: e.target.value})} />
                         <textarea className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm h-32 outline-none focus:border-blue-500 uppercase tracking-widest" placeholder="Detalle..." value={tempProp.texto} onChange={(e) => setTempProp({...tempProp, texto: e.target.value})}></textarea>
                         <button onClick={addProposicion} className="w-full bg-blue-600 text-white py-4 rounded-2xl uppercase tracking-widest text-[10px] font-black">Añadir Registro</button>
                      </div>
                   </Card>
                </div>
                <div className="md:col-span-2 print:col-span-3">
                   <Card title="Propuestas Registradas">
                      <div className="space-y-4">
                         {proposiciones.length === 0 ? <p className="text-slate-400 text-center py-10 opacity-40 uppercase font-black">Sin registros</p> : 
                         proposiciones.map(p => (
                            <div key={p.id} className="p-4 bg-slate-50 border border-slate-100 rounded-2xl flex justify-between items-start gap-4 print:bg-white">
                               <div><span className="text-[10px] font-black text-blue-600 uppercase">De: {p.proponente}</span><p className="text-sm font-bold text-slate-700 leading-relaxed uppercase">{p.texto}</p></div>
                               <button onClick={() => removeProposicion(p.id)} className="text-red-300 hover:text-red-600 print:hidden"><Trash2 size={18}/></button>
                            </div>
                         ))}
                      </div>
                   </Card>
                </div>
             </div>
          </div>

          {/* RESUMEN FINAL Y FIRMAS - El disparador del PDF */}
          <div className={`${activeSection === 'resumen' ? 'block' : 'hidden print:block'} space-y-8 animate-in slide-in-from-bottom-10 uppercase tracking-widest text-center`}>
             <div className="flex justify-between items-center print:hidden uppercase">
                <h2 className="text-3xl font-black text-slate-800 uppercase tracking-tighter">Cierre y Acta Resumen</h2>
                <button onClick={handlePrint} className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-black flex items-center gap-3 shadow-2xl hover:bg-black active:scale-95 transition-all text-xs tracking-widest">
                  <Printer size={20} /> Generar PDF Final
                </button>
             </div>
             
             <Card className="p-10 border-t-8 border-t-blue-600 print:border-none print:shadow-none print:p-0">
                <div className="hidden print:block text-center border-b-2 border-slate-900 pb-8 mb-10 text-center uppercase tracking-widest">
                   <h1 className="text-3xl font-black uppercase mb-1 tracking-tighter">Resumen Asamblea General 2026</h1>
                   <p className="text-lg font-bold text-slate-600 uppercase leading-none">Edificio Jardín del Morasurco</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 print:grid-cols-3 print:gap-8 text-center uppercase">
                   <div className="space-y-6">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Estado Legal</p>
                      <div className="p-6 bg-slate-50 rounded-[32px] border border-slate-100 print:bg-white print:border-slate-200">
                         <div className="flex justify-between mb-4"><span className="text-xs font-bold text-slate-500 uppercase">Quórum:</span><span className="text-lg font-black text-emerald-600">{totalQuorum.toFixed(2)}%</span></div>
                         <div className="flex justify-between"><span className="text-xs font-bold text-slate-500 uppercase">Avance:</span><span className="text-lg font-black text-blue-600">{agendaStatus.filter(i => i).length} / 11</span></div>
                      </div>
                   </div>
                   <div className="space-y-6">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Directivos</p>
                      <div className="space-y-4 font-black text-sm">
                         <div><p className="text-[9px] text-slate-400 mb-1 tracking-widest uppercase">Presidente</p><p>{dignatarios.presidente || 'PENDIENTE'}</p></div>
                         <div><p className="text-[9px] text-slate-400 mb-1 tracking-widest uppercase">Secretario</p><p>{dignatarios.secretario || 'PENDIENTE'}</p></div>
                      </div>
                   </div>
                   <div className="space-y-6">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 uppercase">Elegidos 2026</p>
                      <div className="space-y-6">
                         <div>
                            <p className="text-[9px] font-black text-slate-500 uppercase mb-2 leading-none tracking-widest">Consejo</p>
                            <div className="flex flex-wrap gap-1 justify-center">
                              {postuladosConsejo.length > 0 ?
                               postuladosConsejo.map(p => <span key={p} className="bg-slate-100 px-2 py-0.5 rounded text-[9px] font-black text-slate-600 print:border tracking-widest uppercase">{p}</span>) : 
                               <span className="text-[9px] italic text-slate-300 font-bold uppercase">Sin registro</span>}
                            </div>
                         </div>
                         <div>
                            <p className="text-[9px] font-black text-slate-500 uppercase mb-2 leading-none tracking-widest">Convivencia</p>
                            <div className="flex flex-wrap gap-1 justify-center">
                              {postuladosConvivencia.length > 0 ?
                               postuladosConvivencia.map(p => <span key={p} className="bg-emerald-50 px-2 py-0.5 rounded text-[9px] font-black text-emerald-700 print:border tracking-widest uppercase">{p}</span>) : 
                               <span className="text-[9px] italic text-slate-300 font-bold uppercase">Sin registro</span>}
                            </div>
                         </div>
                      </div>
                   </div>
                </div>

                <div className="hidden print:grid grid-cols-2 gap-20 mt-32 text-center uppercase tracking-widest">
                   <div className="text-center border-t-2 border-slate-900 pt-4 font-black">
                      <p className="text-xs font-black uppercase mb-1 tracking-widest uppercase">{dignatarios.presidente || '_________________________'}</p>
                      <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Presidente de la Asamblea</p>
                   </div>
                   <div className="text-center border-t-2 border-slate-900 pt-4 font-black">
                      <p className="text-xs font-black uppercase mb-1 tracking-widest uppercase">{dignatarios.secretario || '_________________________'}</p>
                      <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Secretario de la Asamblea</p>
                   </div>
                </div>
             </Card>
          </div>

        </div>
      </main>
    </div>
  );
}