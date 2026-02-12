import React, { useState, useMemo } from 'react';

import { 

  Users, FileText, BarChart3, CheckSquare, MessageSquare, Home, 

  ShieldCheck, ExternalLink, Save, Clock, UserPlus, Download, 

  CheckCircle2, Printer, ChevronRight, Trash2, TrendingUp, Settings,

  ClipboardCheck, AlertTriangle, Info, Camera, Zap, Droplets, Shield,

  BookOpen, Scale, FolderOpen, AlertCircle, CheckCircle, Wallet, Gavel,

  Construction, Activity, HeartPulse, HardHat, Landmark, ListChecks,

  Hammer, Paintbrush, ShieldAlert, BadgeDollarSign, Receipt

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

           agendaIndex === 5 ? 'Puntos 5 y 6 del Orden del día' : 

           agendaIndex === 6 ? 'Puntos 7 y 8 del Orden del día' : 

           agendaIndex === 9 ? 'Puntos 10 y 11 del Orden del día' : 

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



const Card = ({ children, title, className = "", icon: Icon }) => (

  <div className={`bg-white rounded-2xl shadow-sm border border-slate-100 p-6 ${className}`}>

    {title && <h3 className="text-lg font-bold text-slate-700 mb-5 flex items-center gap-2 text-balance uppercase tracking-tight">

      <div className="w-1.5 h-6 bg-blue-600 rounded-full shrink-0"></div>

      {Icon && <Icon size={20} className="text-blue-600" />}

      {title}

    </h3>}

    {children}

  </div>

);



// === BASE DE DATOS COPROPIEDAD ===

const INITIAL_DATA = [

  { id: 1, unidad: '101', propietario: 'ROSA M GONZALES', coeficiente: 2.55 },

  { id: 2, unidad: '102', propietario: 'ZOILA MARIA GARZON', coeficiente: 2.09 },

  { id: 3, unidad: '103', propietario: 'MERCEDES JURADO', coeficiente: 2.84 },

  { id: 4, unidad: '201', propietario: 'OSCAR DELGADO', coeficiente: 4.14 },

  { id: 5, unidad: '202', propietario: 'DORIS OBANDO', coeficiente: 4.47 },

  { id: 6, unidad: '203', propietario: 'MARGOTH DE GUERRERO', coeficiente: 1.92 },

  { id: 7, unidad: '204', propietario: 'MARINO DELGADO', coeficiente: 3.76 },

  { id: 8, unidad: '205', propietario: 'GUIDO FERNANDO PALOMINO', coeficiente: 2.78 },

  { id: 9, unidad: '206', propietario: 'CESAR DUQUE', coeficiente: 4.87 },

  { id: 10, unidad: '301', propietario: 'CLAUDIA SOLARTE', coeficiente: 4.12 },

  { id: 11, unidad: '302', propietario: 'EDGAR DELGADO', coeficiente: 4.47 },

  { id: 12, unidad: '303', propietario: 'LEONOR SARASTY', coeficiente: 1.92 },

  { id: 13, unidad: '304', propietario: 'FERNANDO LOZANO', coeficiente: 3.78 },

  { id: 14, unidad: '305', propietario: 'MIRIAM ACOSTA', coeficiente: 2.78 },

  { id: 15, unidad: '306', propietario: 'LILIANA ESCOBAR', coeficiente: 4.47 },

  { id: 16, unidad: '401', propietario: 'JORGE WHITE', coeficiente: 4.14 },

  { id: 17, unidad: '402', propietario: 'ARMANDO MUÑOZ', coeficiente: 4.85 },

  { id: 18, unidad: '403', propietario: 'CARMENZA RIVAS', coeficiente: 1.92 },

  { id: 19, unidad: '404', propietario: 'RAUL VILLOTA', coeficiente: 3.78 },

  { id: 20, unidad: '405', propietario: 'ALVARO ALBORNOZ', coeficiente: 2.72 },

  { id: 21, unidad: '406', propietario: 'LUIS NARVAEZ', coeficiente: 2.85 },

  { id: 22, unidad: '407', propietario: 'ALEXANDRA RUIZ', coeficiente: 2.04 },

  { id: 23, unidad: '501', propietario: 'MARGOTH PAZ', coeficiente: 4.14 },

  { id: 24, unidad: '502', propietario: 'CARLOS MUÑOZ', coeficiente: 4.47 },

  { id: 25, unidad: '503', propietario: 'YOLANDA BASTIDAS', coeficiente: 1.90 },

  { id: 26, unidad: '504', propietario: 'VIVIANA INSUASTY', coeficiente: 3.78 },

  { id: 27, unidad: '505', propietario: 'JIMENA SANTACRUZ', coeficiente: 2.72 },

  { id: 28, unidad: '506', propietario: 'SANDRA CHAVEZ', coeficiente: 2.85 },

  { id: 29, unidad: '507', propietario: 'JOSE OBANDO', coeficiente: 2.43 },

  { id: 30, unidad: '601', propietario: 'MIRIAM CHAVEZ', coeficiente: 1.63 },

  { id: 31, unidad: 'L1', propietario: 'MIRIAM DEL C. GARCIA', coeficiente: 0.97 },

  { id: 32, unidad: 'L2', propietario: 'MARTHA ACOSTA', coeficiente: 0.94 },

  { id: 33, unidad: 'L3', propietario: 'FABIAN ERAZO ACOSTA', coeficiente: 0.90 }

];



const ORDEN_DIA_OFICIAL = [

  "Registro y verificación del quórum.",

  "Lectura y aprobación del orden del día.",

  "Elección de dignatarios de la Asamblea (presidente, secretario, comisión verificadora del texto del acta).",

  "Lectura del concepto de la comisión verificadora del acta de la asamblea.",

  "Informe Consejo de administración.",

  "Presentación y aprobación informe de administración.",

  "Estados financieros a diciembre 31 de 2025 y ejecución presupuestal año 2025.",

  "Dictamen e informe de Revisoría Fiscal.",

  "Presupuesto 2026 y cuotas de administración.",

  "Nombramiento del consejo de administración período 2026 - 2027.",

  "Elección Revisor Fiscal período 2026-2027.",

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

    if (idx === 5) newStatus[4] = isNewStateCompleted;

    if (idx === 6) newStatus[7] = isNewStateCompleted;

    if (idx === 9) newStatus[10] = isNewStateCompleted;

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

            <span className="uppercase text-xs font-bold tracking-widest opacity-60">Condominio</span>

            <span className="text-blue-500 uppercase leading-none text-center">Esquina Real <br/> 2026</span>

          </h1>

          <p className="text-[10px] font-bold mt-4 text-slate-500 uppercase tracking-widest">Gestión Profesional PH</p>

        </div>



        <nav className="flex-1 overflow-y-auto p-4 space-y-1">

          {[

            { id: 'bienvenida', label: 'Inicio', icon: Home },

            { id: 'quorum', label: '1. Quórum', icon: Users },

            { id: 'orden', label: '2. Orden del Día', icon: CheckSquare },

            { id: 'dignatarios', label: '3-4. Dignatarios', icon: UserPlus },

            { id: 'gestion', label: '5-6. Gestión 2025', icon: TrendingUp },

            { id: 'financiero', label: '7-8. Financiero', icon: BarChart3 },

            { id: 'presupuesto', label: '9. Presupuesto', icon: Settings },

            { id: 'postulaciones', label: '10-11. Elecciones', icon: UserPlus },

            { id: 'proposiciones', label: '12. Proposiciones', icon: MessageSquare },

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

                  <div className="h-full bg-blue-600 transition-all duration-1000 ease-out" style={{width: `${progress}%`}}></div>

                </div>

                <span className="text-sm font-black text-blue-600">{Math.round(progress)}%</span>

              </div>

            </div>

          </div>



          <div className="flex items-center gap-4 text-right">

            <div>

              <p className="text-sm font-black text-slate-800 uppercase leading-none tracking-tight">Condominio Esquina Real</p>

              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">San Juan de Pasto | 12 Feb 2026</p>

            </div>

            <div className="h-10 w-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-400 print:hidden">

              <Clock size={20} />

            </div>

          </div>

        </header>



        <div className="max-w-6xl mx-auto p-10 space-y-12 print:p-0">

          

          {/* SECCIÓN INICIO */}

          <div className={`${activeSection === 'bienvenida' ? 'block' : 'hidden'} print:hidden`}>

            <div className="space-y-10 animate-in fade-in slide-in-from-bottom-6 text-center">

              <div className="bg-slate-900 rounded-[40px] p-16 text-white relative overflow-hidden shadow-2xl">

                <div className="relative z-10">

                  <span className="bg-blue-600 text-[10px] font-black uppercase px-3 py-1.5 rounded-full mb-6 inline-block tracking-widest">Vigencia 2026</span>

                  <h1 className="text-6xl font-black mb-6 leading-none tracking-tighter uppercase tracking-widest text-center">Condominio <br/><span className="text-blue-500 italic">Esquina Real</span></h1>

                  <p className="text-slate-400 max-w-xl text-lg font-medium leading-relaxed mx-auto">Asamblea General Ordinaria de Copropietarios. Jueves 12 de febrero de 2026 - 7:00 p.m.</p>

                </div>

                <div className="absolute top-0 right-0 w-1/3 h-full bg-blue-600/10 skew-x-12 translate-x-20"></div>

              </div>



              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center uppercase">

                <Card title="Identificación" className="border-l-4 border-blue-600">

                  <div className="space-y-2 text-left">

                    <p className="text-sm font-bold text-slate-500">NIT: <span className="text-slate-800 font-black">900.367.280-6</span></p>

                    <p className="text-sm font-bold text-slate-500">Lugar: <span className="text-slate-800 font-black tracking-tight text-xs uppercase">Condominio Esquina Real</span></p>

                  </div>

                </Card>



                <Card title="Citación Oficial" className="border-l-4 border-amber-600">

                  <p className="text-[10px] text-slate-600 mb-4 font-medium italic text-left">"Sesiona y decide si está representado el 50,1% de los coeficientes de participación."</p>

                  <button onClick={() => setActiveSection('quorum')} className="text-xs font-black text-amber-700 uppercase flex items-center gap-2 hover:underline mx-auto">Ir a Registro <ChevronRight size={14}/></button>

                </Card>



                <Card title="Unidades Totales" className="border-l-4 border-blue-600">
                  <div className="flex flex-col items-center justify-center py-2">
                    <p className="text-5xl font-black text-slate-800 tracking-tighter">
                      {asistencia.length}
                    </p>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">
                      Copropietarios Registrados
                    </p>
                  </div>
                </Card>

              </div>

            </div>

          </div>



          {/* 1. QUÓRUM */}

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



          {/* 2. ORDEN DEL DÍA */}

          <div className={`${activeSection === 'orden' ? 'block' : 'hidden'} print:block print:break-after-page uppercase`}>

            <SectionHeader title="Aprobación del Orden del Día" icon={CheckSquare} agendaIndex={1} agendaStatus={agendaStatus} toggleAgendaItem={toggleAgendaItem} />

            <Card>

              <div className="grid gap-3 mb-8">

                {ORDEN_DIA_OFICIAL.map((punto, idx) => (

                  <div key={idx} className={`p-5 rounded-2xl border-2 flex items-center gap-4 transition-all ${agendaStatus[idx] ? 'border-emerald-500 bg-emerald-50 shadow-sm' : 'border-slate-100 bg-slate-50 opacity-70'}`}>

                    <div className={`h-10 w-10 rounded-full flex items-center justify-center font-black text-sm ${agendaStatus[idx] ? 'bg-emerald-500 text-white' : 'bg-slate-200 text-slate-500'}`}>

                      {idx + 1}

                    </div>

                    <span className={`font-bold text-sm text-left ${agendaStatus[idx] ? 'text-emerald-900' : 'text-slate-600'}`}>{punto}</span>

                  </div>

                ))}

              </div>

              <div className="pt-6 border-t border-slate-100">

                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 block text-left">Observaciones de Aprobación</label>

                <textarea 

                  className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl font-bold text-sm h-32 outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all uppercase"

                  placeholder="Registre modificaciones si las hay..."

                  value={obsAgenda}

                  onChange={(e) => setObsAgenda(e.target.value)}

                ></textarea>

              </div>

            </Card>

          </div>



          {/* 3-4. DIGNATARIOS */}

          <div className={`${activeSection === 'dignatarios' ? 'block' : 'hidden'} print:block print:break-after-page uppercase`}>

            <SectionHeader title="Dignatarios y Comisión" icon={UserPlus} agendaIndex={2} agendaStatus={agendaStatus} toggleAgendaItem={toggleAgendaItem} />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">

              <Card title="Elección Punto 3 y 4" className="md:col-span-2">

                <div className="space-y-6">

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

                    <div>

                      <label className="text-[10px] font-black text-slate-400 uppercase mb-2 block tracking-widest">Presidente de Asamblea</label>

                      <input type="text" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl font-bold text-sm focus:border-blue-500 outline-none uppercase" placeholder="Nombre..." value={dignatarios.presidente} onChange={(e) => setDignatarios({...dignatarios, presidente: e.target.value})} />

                    </div>

                    <div>

                      <label className="text-[10px] font-black text-slate-400 uppercase mb-2 block tracking-widest">Secretario de Asamblea</label>

                      <input type="text" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl font-bold text-sm focus:border-blue-500 outline-none uppercase" placeholder="Nombre..." value={dignatarios.secretario} onChange={(e) => setDignatarios({...dignatarios, secretario: e.target.value})} />

                    </div>

                  </div>

                  <div>

                    <label className="text-[10px] font-black text-slate-400 uppercase mb-2 block tracking-widest">Comisión Verificadora del Acta</label>

                    <textarea className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl font-bold text-sm h-24 focus:border-blue-500 outline-none uppercase" placeholder="Designados..." value={dignatarios.comision} onChange={(e) => setDignatarios({...dignatarios, comision: e.target.value})}></textarea>

                  </div>

                </div>

              </Card>

              <div className="bg-slate-900 rounded-3xl p-8 text-white shadow-xl flex flex-col justify-center text-center print:hidden">

                <Scale className="text-blue-400 mb-4 mx-auto" size={32} />

                <h4 className="font-bold mb-2 uppercase">Protocolo</h4>

                <p className="text-[11px] leading-relaxed text-slate-400 uppercase">Se designan responsables de dirigir la sesión y validar el texto final del acta según Ley 675.</p>

              </div>

            </div>

          </div>



          {/* 5-6. INFORME DE GESTIÓN (MODIFICADO) */}

          
            <div className={`${activeSection === 'gestion' ? 'block' : 'hidden'} print:block space-y-12 animate-in fade-in uppercase tracking-tight text-left`}>

            
              <SectionHeader title="Informe Integral de Gestión 2025" icon={TrendingUp} agendaIndex={5} agendaStatus={agendaStatus} toggleAgendaItem={toggleAgendaItem} />

              

              <div className="space-y-16 text-slate-900 font-black">

                

                {/* 1. GOBIERNO CORPORATIVO Y ADMINISTRACIÓN */}

                <div className="space-y-8">

                  <h3 className="text-xl font-black text-slate-900 border-l-4 border-blue-600 pl-4 uppercase">1. GOBIERNO CORPORATIVO Y ADMINISTRACIÓN</h3>

                  

                  <Card title="1.1. Instalación y Empalme" icon={ShieldCheck}>

                    <ul className="space-y-4 text-xs font-black text-slate-800 list-disc pl-5 leading-relaxed uppercase">

                      <li><span className="font-bold">CONSEJO DE ADMINISTRACIÓN (2025-2026):</span> EL CONSEJO, CONFORMADO POR CARLOS OBANDO (PRESIDENTE), VIVIANA INSUASTY Y XIMENA SANTACRUZ, TOMÓ POSESIÓN EL 25 DE MARZO DE 2025.</li>

                      <li><span className="font-bold">RATIFICACIÓN DE ADMINISTRACIÓN:</span> SE RATIFICÓ A LA SEÑORA ANA LUCÍA YEPEZ C. COMO ADMINISTRADORA, ESTABLECIENDO COMPROMISOS DE MEJORA EN LA GESTIÓN Y COMUNICACIÓN.</li>

                      <li><span className="font-bold">RECEPCIÓN DE DOCUMENTOS:</span> SE REALIZÓ LA ENTREGA FORMAL AL CONSEJO DEL REGLAMENTO DE PROPIEDAD HORIZONTAL, MANUAL DE CONVIVENCIA, LIBROS DE CONTABILIDAD Y CONTRATOS VIGENTES.</li>

                    </ul>

                  </Card>



                  <Card title="1.2. Seguimiento a Tareas Encomendadas (Matriz de Cumplimiento)">

                    <div className="overflow-x-auto rounded-xl border border-slate-200">

                      <table className="w-full text-[10px] font-bold uppercase text-left">

                        <thead className="bg-slate-900 text-white font-black tracking-widest">

                          <tr><th className="p-3">Tarea / Solicitud del Consejo</th><th className="p-3">Estado / Gestión Realizada</th></tr>

                        </thead>

                        <tbody className="divide-y divide-slate-100 text-slate-900 font-black">

                          <tr><td className="p-3">Recuperación de Parqueaderos Comunes</td><td className="p-3 text-emerald-600 font-black">EJECUTADO. EL SR. ÁLVARO URBANO PAGÓ LA DEUDA Y DESOCUPÓ LOS ESPACIOS.</td></tr>

                          <tr><td className="p-3">Cambio de Intermediario de Seguros</td><td className="p-3 text-emerald-600 font-black">EJECUTADO. SE CAMBIÓ A V&J ASESORES (DRA. XIMENA OSPINA).</td></tr>

                          <tr><td className="p-3">Constitución CDT Fondo Imprevistos</td><td className="p-3 text-emerald-600 font-black">EJECUTADO. APERTURA INICIAL POR $600.000 Y RENOVACIÓN POR $800.000.</td></tr>

                          <tr><td className="p-3">Concepto Técnico Puerta Vehicular</td><td className="p-3 text-emerald-600 font-black">EJECUTADO. SE CONFIRMÓ QUE NO HAY DAÑO ESTRUCTURAL AL APTO 204. NO SE REQUIERE ASAMBLEA EXTRAORDINARIA.</td></tr>

                          <tr><td className="p-3">Arreglo Puertas de Ingreso (Ruido)</td><td className="p-3 text-amber-600">EN PROCESO. SE ENVIARON COMUNICADOS, PERO EL PROBLEMA PERSISTE. SE INSISTIRÁ EN EL MANTENIMIENTO.</td></tr>

                          <tr><td className="p-3">Cotización Bandas Ascensor</td><td className="p-3 text-amber-600">EN PROCESO. SE CONSIDERA PRIORITARIO POR SEGURIDAD. SE BUSCA FINANCIACIÓN CON PROVEEDOR.</td></tr>

                          <tr><td className="p-3">Pintura Fachada y Anti-grafitis</td><td className="p-3 text-emerald-600">EJECUTADO/GESTIONADO. SE SOLICITÓ ADELANTAR LA PINTURA CON MATERIAL ESPECIAL.</td></tr>

                          <tr><td className="p-3">Señalización de Reciclaje</td><td className="p-3 text-red-600">PENDIENTE. SE PROPUSO INSTALAR LETREROS CLAROS EN LOS PUNTOS DE ACOPIO.</td></tr>

                          <tr><td className="p-3">Implementación SG-SST</td><td className="p-3 text-amber-600">PARCIAL. SE COMPRARON BATERÍAS, RECARGARON EXTINTORES Y UBICÓ CAMILLA, PERO FALTA RED CONTRA INCENDIOS COMPLETA.</td></tr>

                          <tr><td className="p-3">Bono Navideño Operaria Aseo</td><td className="p-3 text-emerald-600">APROBADO. SE APROBÓ BONO DE $150.000 PARA FIN DE AÑO.</td></tr>

                        </tbody>

                      </table>

                    </div>

                  </Card>



                  {/* TARJETA 1.3 CORREGIDA E INTEGRADA */}
                  <Card title="1.3. Gestión de Seguros (Póliza Multirriesgo)" icon={Shield}>
                    <div className="space-y-6 text-[11px] font-black text-slate-900">
                      
                      {/* 1. DATOS DE IDENTIFICACIÓN DE PÓLIZA */}
                      <div className="bg-blue-50 p-4 rounded-2xl border border-blue-100 shadow-sm">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <p className="text-blue-600 font-black uppercase tracking-tighter">SEGUROS LA PREVISORA S.A.</p>
                            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-tight">1. PÓLIZA TODO RIESGO</p>
                          </div>
                          <div className="text-right">
                            <span className="text-[9px] text-slate-400 uppercase font-black">No. de Póliza</span>
                            <p className="text-slate-900 font-black tracking-tight">1000428</p>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-blue-200/50 pt-3">
                          <div>
                            <span className="text-[9px] text-slate-400 uppercase font-black">Vigencia Actual</span>
                            <p className="text-slate-800 leading-tight uppercase font-black">
                              Desde el 21 de abril de 2025 al 21 de abril de 2026
                            </p>
                          </div>
                          <div className="text-right sm:text-left">
                            <span className="text-[9px] text-slate-400 uppercase font-black">Prima Total (IVA Incluido)</span>
                            <p className="text-xl text-emerald-600 font-black tracking-tighter">
                              $5.517.759
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* 2. ACUERDO DE PAGO Y 3. AMPAROS / CAPITALES */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        
                        {/* SECCIÓN ACUERDO DE PAGO */}
                        <div className="space-y-3">
                          <p className="text-[10px] text-slate-400 uppercase tracking-widest border-l-2 border-amber-500 pl-2 font-black">
                            2. Acuerdo de Pago (Sin Intereses)
                          </p>
                          <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-3">
                            <ul className="space-y-2 uppercase text-[10px] font-black">
                              <li className="flex justify-between items-center border-b border-white pb-1">
                                <span className="text-slate-500">1ra Cuota (26 Mayo 2025):</span>
                                <span className="font-bold text-slate-800 tracking-tighter">$1.839.253</span>
                              </li>
                              <li className="flex justify-between items-center border-b border-white pb-1">
                                <span className="text-slate-500">2da Cuota (23 Junio 2025):</span>
                                <span className="font-bold text-slate-800 tracking-tighter">$1.839.253</span>
                              </li>
                              <li className="flex justify-between items-center">
                                <span className="text-slate-500">3ra Cuota (23 Julio 2025):</span>
                                <span className="font-bold text-slate-800 tracking-tighter">$1.839.253</span>
                              </li>
                            </ul>
                          </div>
                        </div>

                        {/* SECCIÓN AMPAROS Y CAPITALES ASEGURADOS */}
                        <div className="space-y-3">
                          <p className="text-[10px] text-slate-400 uppercase tracking-widest border-l-2 border-blue-600 pl-2 font-black">
                            3. Coberturas y Capitales Asegurados
                          </p>
                          <div className="space-y-2">
                            {/* Amparos */}
                            <div className="flex flex-col gap-1.5 mb-4">
                              <div className="flex items-center gap-2 text-[9px] font-bold text-slate-700 bg-white p-2 rounded border border-slate-100 shadow-sm uppercase">
                                <ShieldCheck className="text-emerald-500" size={14} /> Todo Riesgo Daños Materiales
                              </div>
                              <div className="flex items-center gap-2 text-[9px] font-bold text-slate-700 bg-white p-2 rounded border border-slate-100 shadow-sm uppercase">
                                <Scale className="text-emerald-500" size={14} /> Responsabilidad Civil Extracontractual
                              </div>
                            </div>

                            {/* Capitales Asegurados */}
                            <div className="bg-blue-600 text-white p-4 rounded-xl shadow-lg shadow-blue-100">
                              <div className="flex justify-between items-center border-b border-blue-400 pb-2 mb-2">
                                <span className="text-[9px] font-bold uppercase opacity-80 tracking-widest">Valor Asegurado Edificio</span>
                                <span className="text-sm font-black">$4.500.000.000</span>
                              </div>
                              <div className="flex justify-between items-center border-b border-blue-400 pb-2 mb-2">
                                <span className="text-[9px] font-bold uppercase opacity-80 tracking-widest">Maquinaria y Equipo</span>
                                <span className="text-sm font-black">$171.031.488</span>
                              </div>
                              <div className="flex justify-between items-center">
                                <span className="text-[9px] font-bold uppercase opacity-80 tracking-widest text-balance">Equipos Eléctricos (Contenidos)</span>
                                <span className="text-sm font-black">$8.000.000</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* RESUMEN FINAL DE RIESGOS */}
                      <div className="p-3 bg-slate-100 rounded-xl text-[9px] uppercase font-bold text-slate-500 flex items-center gap-3">
                        <Info size={14} className="text-blue-500 shrink-0" />
                        <span>Cobertura integral que incluye: Incendio, Rayo, Explosión, Daños por Agua, Hurto y Daños Eléctricos.</span>
                      </div>
                    </div>
                  </Card>
                </div>



                {/* 2. GESTIÓN FINANCIERA Y CONTABLE */}

                <div className="space-y-8">

                  <h3 className="text-xl font-black text-slate-900 border-l-4 border-indigo-600 pl-4 uppercase">2. GESTIÓN FINANCIERA Y CONTABLE</h3>

                  

                  <Card title="2.1. Estado de Resultados y Ejecución Presupuestal" icon={BarChart3}>

                    <div className="space-y-4 text-xs font-black leading-relaxed">

                      <p>EL COMPORTAMIENTO FINANCIERO HA FLUCTUADO DEBIDO A MANTENIMIENTOS CORRECTIVOS NECESARIOS.</p>

                      <p><span className="text-blue-600 font-black uppercase">EVOLUCIÓN:</span> SE PASÓ DE UNA PÉRDIDA ACUMULADA A INICIOS DE AÑO, A PRESENTAR EXCEDENTES EN JULIO ($139.434) Y AGOSTO ($744.000) GRACIAS AL CONTROL DE GASTOS. SIN EMBARGO, EN SEPTIEMBRE SE REGISTRÓ UNA PÉRDIDA NETA DE $2.235.921 DEBIDO A UNA SOBRE EJECUCIÓN EN MANTENIMIENTO DE ZONAS COMUNES Y ASCENSORES.</p>

                      <ul className="space-y-2 list-disc pl-5">

                        <li><span className="font-bold">INGRESOS:</span> A CORTE DE SEPTIEMBRE, LA EJECUCIÓN DE INGRESOS FUE DEL 113%.</li>

                        <li><span className="font-bold">GASTOS:</span> LA MAYORÍA DE RUBROS (HONORARIOS, SERVICIOS, ASEO) SE MANTIENEN DENTRO DEL TOPE (98% DE EJECUCIÓN), CON EXCEPCIÓN DEL RUBRO DE MANTENIMIENTOS POR OBRAS EN CUBIERTAS.</li>

                      </ul>

                    </div>

                  </Card>



                  <Card title="2.2. Recuperación de Cartera" icon={Wallet}>
                    <div className="space-y-4 text-xs font-black">
                      <p className="uppercase tracking-tight">SE HA REALIZADO UNA GESTIÓN DE COBRO EFECTIVA, LOGRANDO UNA REDUCCIÓN DRÁSTICA EN LAS CUENTAS POR COBRAR.</p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        {/* Visualización de Reducción */}
                        <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-100">
                          <p className="text-[10px] text-emerald-600 uppercase mb-2 tracking-widest">Estado de Reducción</p>
                          <div className="flex items-center justify-between">
                            <div className="text-center">
                              <span className="text-[9px] text-slate-400 block uppercase">Julio</span>
                              <span className="text-slate-700 font-black">$2.960.000</span>
                            </div>
                            <ChevronRight className="text-emerald-300" size={20} />
                            <div className="text-center">
                              <span className="text-[9px] text-slate-400 block uppercase">Diciembre</span>
                              <span className="text-emerald-600 text-xl font-black">$1.650.000</span>
                            </div>
                          </div>
                          <div className="mt-3 pt-3 border-t border-emerald-200">
                            <p className="text-[10px] text-emerald-700 uppercase">
                              Reducción total: <span className="font-black">$1.310.000 (44%)</span>
                            </p>
                          </div>
                        </div>

                        {/* Detalle de Gestión */}
                        <div className="space-y-2 py-2">
                          <ul className="space-y-3 list-disc pl-5">
                            <li>
                              <span className="font-bold">GESTIÓN DE COBRO:</span> SE REALIZARON COBROS PRE-JURÍDICOS EFECTIVOS.
                            </li>
                            <li>
                              <span className="font-bold">RECUPERACIÓN:</span> SE RECUPERARON DINEROS ADEUDADOS POR CONCEPTO DE SERVICIO DE TELEVISIÓN Y PARQUEADEROS.
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </Card>



                  <Card title="2.3. Reservas y Fondos" icon={Landmark}>

                    <div className="p-4 bg-emerald-50 rounded-2xl border-2 border-emerald-100 font-black">

                      <p className="text-[11px] leading-relaxed uppercase">FONDO DE IMPREVISTOS: SE CONSTITUYÓ Y FORTALECIÓ EL FONDO MEDIANTE LA APERTURA Y POSTERIOR RENOVACIÓN DE UN CDT. INICIÓ CON $600.000 Y SE INCREMENTÓ A <span className="font-black text-emerald-600 uppercase">$800.000</span> EN OCTUBRE, GENERANDO RENDIMIENTOS.</p>

                    </div>

                  </Card>



                  <Card title="2.4. Gastos Mensuales Fijos y Recurrentes (Operación Obligatoria)">

                    <div className="overflow-x-auto rounded-xl border border-slate-200">

                      <table className="w-full text-[10px] font-bold uppercase text-left">

                        <thead className="bg-slate-100 text-slate-600 font-black uppercase">

                          <tr><th className="p-3">Categoría</th><th className="p-3">Tercero / Proveedor</th><th className="p-3">Concepto / Detalle</th><th className="p-3 text-right">Mensual Prom.</th><th className="p-3 text-right">Total Anual</th></tr>

                        </thead>

                        <tbody className="divide-y text-slate-900 font-black">

                          <tr><td className="p-3">HONORARIOS</td><td className="p-3 uppercase font-bold">ANA LUCÍA YÉPEZ CÓRDOBA</td><td className="p-3 uppercase">ADMINISTRACIÓN</td><td className="p-3 text-right">~$858.300</td><td className="p-3 text-right font-black">$10.299.600</td></tr>

                          <tr><td className="p-3">HONORARIOS</td><td className="p-3 uppercase font-bold">ANDREA ELIZABETH DELGADO</td><td className="p-3 uppercase">CONTADURÍA</td><td className="p-3 text-right">~$390.100</td><td className="p-3 text-right font-black">$4.681.400</td></tr>

                          <tr><td className="p-3">HONORARIOS</td><td className="p-3 uppercase font-bold">ERNESTO GABRIEL MELO</td><td className="p-3 uppercase">REVISORÍA FISCAL</td><td className="p-3 text-right">~$135.400</td><td className="p-3 text-right font-black">$1.624.800</td></tr>

                          <tr><td className="p-3 text-blue-600">MANTENIMIENTO</td><td className="p-3 uppercase font-bold text-blue-600">MITSUBISHI ELECTRIC</td><td className="p-3 uppercase text-blue-600">ASCENSORES (PREV. MENSUAL)</td><td className="p-3 text-right font-black text-blue-600">$847.147</td><td className="p-3 text-right font-black text-blue-600">$10.165.764</td></tr>

                          <tr><td className="p-3 text-blue-600">MANTENIMIENTO</td><td className="p-3 uppercase font-bold text-blue-600">TALAMO LTDA</td><td className="p-3 uppercase text-blue-600">MONITOREO Y SEGURIDAD</td><td className="p-3 text-right font-black text-blue-600">$765.933</td><td className="p-3 text-right font-black text-blue-600">$9.191.200</td></tr>

                          <tr><td className="p-3 text-blue-600">MANTENIMIENTO</td><td className="p-3 uppercase font-bold text-blue-600">CLARITA SOLUCIONES</td><td className="p-3 uppercase text-blue-600">ASEO Y LIMPIEZA</td><td className="p-3 text-right font-black text-blue-600">$1.485.558</td><td className="p-3 text-right font-black text-blue-600">$17.826.697</td></tr>

                          <tr><td className="p-3">SERVICIOS</td><td className="p-3 font-bold uppercase">CEDENAR SA ESP</td><td className="p-3 uppercase">ENERGÍA</td><td className="p-3 text-right font-black">~$427.000</td><td className="p-3 text-right font-black">$5.129.900</td></tr>

                          <tr><td className="p-3">SERVICIOS</td><td className="p-3 font-bold uppercase">COMCEL SA (CLARO)</td><td className="p-3 uppercase">INTERNET / TEL</td><td className="p-3 text-right font-black">~$115.000</td><td className="p-3 text-right font-black">$1.381.888</td></tr>

                          <tr><td className="p-3">SERVICIOS</td><td className="p-3 font-bold uppercase">EMPOPASTO SA ESP</td><td className="p-3 uppercase">ACUEDUCTO</td><td className="p-3 text-right font-black">~$78.000</td><td className="p-3 text-right font-black">$935.550</td></tr>

                          <tr className="bg-slate-900 text-white"><td colSpan="4" className="p-3 text-right font-black uppercase">TOTAL GASTOS OPERATIVOS 2025</td><td className="p-3 text-right font-black">$61.236.899</td></tr>

                        </tbody>

                      </table>

                    </div>

                  </Card>

                </div>



                {/* 3. GESTIÓN DE OBRAS, MANTENIMIENTO Y SEGURIDAD */}

                <div className="space-y-8">

                  <h3 className="text-xl font-black text-slate-900 border-l-4 border-amber-600 pl-4 uppercase tracking-tighter text-left">3. GESTIÓN DE OBRAS, MANTENIMIENTO Y SEGURIDAD</h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left text-slate-900 font-black uppercase">

                    <Card title="3.1. Ascensores y Maquinaria" icon={Zap}>

                      <ul className="space-y-4 text-[11px] font-black list-disc pl-5 leading-relaxed uppercase text-slate-800">

                        <li><span className="font-bold">INSPECCIÓN TÉCNICA (MITSUBISHI):</span> SE DETECTARON RIESGOS IMPORTANTES EN LA SALA DE MÁQUINAS (ESCALERA INESTABLE, ESCOTILLA PELIGROSA, FALTA DE BARANDAS). EL CONSEJO ACORDÓ INCLUIR ESTAS ADECUACIONES PRIORITARIAS EN EL PRESUPUESTO DEL PRÓXIMO AÑO.</li>

                        <li><span className="font-bold">BANDAS DE SEGURIDAD:</span> SE IDENTIFICÓ LA NECESIDAD URGENTE DE REEMPLAZAR LAS BANDAS DE SEGURIDAD DE LAS PUERTAS DEL ASCENSOR TRAS INCIDENTES CON RESIDENTES. SE ESTÁ GESTIONANDO LA COTIZACIÓN Y FINANCIACIÓN PARA REALIZARLO.</li>

                        <li><span className="font-bold">PUERTA VEHICULAR:</span> ANTE LA QUEJA DEL PROPIETARIO DEL APTO 204 SOBRE VIBRACIONES, SE OBTUVO UN CONCEPTO TÉCNICO QUE CONFIRMÓ QUE LOS MOTORES OPERAN NORMAL Y NO GENERAN DAÑO ESTRUCTURAL, DESCARTANDO LA NECESIDAD DE CAMBIAR EL SENTIDO DE LA PUERTA.</li>

                      </ul>

                    </Card>



                    <Card title="3.2. Mantenimiento Locativo y Seguridad" icon={Construction}>

                      <ul className="space-y-4 text-[11px] font-black list-disc pl-5 leading-relaxed uppercase text-slate-800">

                        <li><span className="font-bold">CUBIERTAS Y MARQUESINAS:</span> EN SEPTIEMBRE SE EJECUTARON OBRAS POR $4.510.000 PARA INSTALACIÓN DE POLICARBONATO, DESMONTAJE DE VIDRIOS PELIGROSOS Y LIMPIEZA DE CANALES.</li>

                        <li><span className="font-bold">FACHADA:</span> SE SOLICITÓ Y GESTIONÓ EL CONTROL DE GRAFITIS EN LA FACHADA DEL PRIMER PISO.</li>

                        <li><span className="font-bold">CONTROL DE PLAGAS Y SALUBRIDAD:</span> SE INSTALARON TRAMPAS PARA ROEDORES EN TERRAZAS Y PARQUEADEROS. SE SELLARON LOS SHUTS DE BASURA DEFINITIVAMENTE POR NORMATIVA DE SALUBRIDAD.</li>

                        <li><span className="font-bold">RED CONTRA INCENDIOS:</span> SE DIAGNOSTICÓ QUE LA RED ACTUAL NO ESTÁ HABILITADA Y REQUIERE UNA INVERSIÓN ALTA. SE PROCEDIÓ A RECARGAR EXTINTORES Y SE UBICÓ UNA CAMILLA EN EL INGRESO.</li>

                        <li><span className="font-bold">MONITOREO:</span> SE REVISÓ EL CONTRATO CON LA EMPRESA TÁLAMO (VIGENTE DESDE 2021).</li>

                      </ul>

                    </Card>

                  </div>



                  <Card title="3.3. Detalle de Obras por Proveedor (Desglose Literal)">

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-slate-900 font-black">

                      <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl text-left uppercase">

                        <p className="text-[10px] font-black text-amber-600 mb-2 tracking-widest flex items-center gap-1 uppercase"><Hammer size={14}/> JAIME HERNANDO GUZMÁN</p>

                        <p className="text-[9px] uppercase font-black text-slate-500 mb-2">MANTENIMIENTO GENERAL Y CERRAJERÍA</p>

                        <ul className="text-[8px] space-y-1 text-slate-700">

                          <li>FEBRERO: MANTENIMIENTO ($200K+$120K+$270K)</li>

                          <li>MAYO: PUERTA VEHICULAR ($90K+$420K+$250K)</li>

                          <li>JUNIO: MANTENIMIENTO GENERAL ($118.451+$100K)</li>

                          <li>SEPTIEMBRE: CERRAJERÍA ($80K+$70K+$60K+$90K)</li>

                          <li>OCTUBRE: REPARACIÓN MENOR ($30.000)</li>

                        </ul>

                        <p className="text-slate-900 font-black pt-2 border-t mt-2 tracking-tighter uppercase font-black">TOTAL: $1.898.451</p>

                      </div>



                      <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl text-left uppercase font-black">

                        <p className="text-[10px] font-black text-blue-600 mb-2 tracking-widest flex items-center gap-1 uppercase"><Construction size={14}/> OSCAR MALES</p>

                        <p className="text-[9px] uppercase font-black text-slate-500 mb-2 uppercase">OBRAS CIVILES MAYORES</p>

                        <ul className="text-[8px] space-y-1 text-slate-700 uppercase">

                          <li>ENERO: REPARACIÓN INICIAL ($140.000)</li>

                          <li>JULIO: OBRA CIVIL ($168.120)</li>

                          <li>SEPTIEMBRE (OBRA PRINCIPAL): $2.000.000 + $1.205.170 + $767.200</li>

                        </ul>

                        <p className="text-slate-900 font-black pt-2 border-t mt-2 tracking-tighter uppercase font-black">TOTAL: $4.280.490</p>

                      </div>



                      <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl text-left uppercase font-black">

                        <p className="text-[10px] font-black text-emerald-600 mb-2 tracking-widest flex items-center gap-1 uppercase"><Droplets size={14}/> MANUEL GUSTAVO QUELAL</p>

                        <p className="text-[9px] uppercase font-black text-slate-500 mb-2 uppercase">IMPERMEABILIZACIÓN Y LAVADO</p>

                        <ul className="text-[8px] space-y-1 text-slate-700 uppercase">

                          <li>MARZO: PINTURA ZONAS ($808.880)</li>

                          <li>ABRIL: MANO OBRA IMPERM. ($280.200)</li>

                          <li>AGOSTO: PUERTAS Y TÉCNICOS ($300K+$650K)</li>

                          <li>NOVIEMBRE: TANQUES ($298.880)</li>

                        </ul>

                        <p className="text-slate-900 font-black pt-2 border-t mt-2 tracking-tighter uppercase font-black">TOTAL: $2.337.960</p>

                      </div>

                    </div>

                    

                    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6 text-slate-900 font-black uppercase">

                      <Card className="bg-slate-50 border-slate-200 text-left uppercase font-black" title="3.3.1. Suministros (Acabados del Sur)">

                        <p className="text-[10px] font-black uppercase leading-relaxed text-slate-900 font-black">COMPRA GRANDE DE MATERIALES: ABRIL ($1.278.170: INSUMOS IMPERMEABILIZACIÓN Y PINTURA) + MAYO ($207.900) + JUNIO ($527.800). <br/>

                        <span className="text-blue-600 font-black mt-2 block tracking-widest uppercase">TOTAL: $2.013.870</span></p>

                      </Card>



                      <Card className="bg-slate-50 border-blue-100 text-left uppercase font-black" title="3.3.2. Otros Proveedores Puntuales">

                        <ul className="text-[10px] font-black space-y-2 uppercase leading-snug text-slate-900 font-black">

                          <li className="flex justify-between border-b border-slate-200 pb-1 text-slate-900 font-black uppercase"><span>CHANEL PLUS SAS (TV ADICIONAL):</span> <span className="text-blue-600 font-black uppercase">$728.000</span></li>

                          <li className="flex justify-between border-b border-slate-200 pb-1 text-slate-900 font-black uppercase"><span>SEBASTIAN A. BURBANO (PINTURA):</span> <span className="text-blue-600 font-black uppercase">$580.000</span></li>

                          <li className="flex justify-between border-b border-slate-200 pb-1 text-slate-900 font-black uppercase"><span>LA PREVISORA SA (PÓLIZAS):</span> <span className="text-blue-600 font-black uppercase">$5.865.830</span></li>

                          <li className="flex justify-between text-slate-900 font-black uppercase"><span>INV. ELECTRÓNICAS / NAVIDAD:</span> <span className="text-blue-600 font-black uppercase">$735.800</span></li>

                        </ul>

                      </Card>

                    </div>

                  </Card>

                </div>



                {/* 4. CONVIVENCIA Y ZONAS COMUNES */}

                <div className="space-y-6 text-left">

                  <h3 className="text-xl font-black text-slate-900 border-l-4 border-emerald-600 pl-4 uppercase tracking-tighter uppercase font-black">4. CONVIVENCIA Y ZONAS COMUNES</h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left text-slate-900 font-black uppercase">

                    <Card title="Situación de Convivencia" icon={Activity}>

                      <ul className="text-[11px] font-black text-slate-800 space-y-4 list-disc pl-5 leading-relaxed uppercase font-black">

                        <li><span className="text-blue-600 font-black uppercase">RUIDO Y COMPORTAMIENTO:</span> SE HAN PRESENTADO QUEJAS REITERADAS POR RUIDO Y FIESTAS EN EL APARTAMENTO 507 Y GOLPES FUERTES EN LAS PUERTAS DE ACCESO. SE ENVIARÁN OFICIOS RECORDATORIOS Y SE SUGIERE REACTIVAR EL COMITÉ DE CONVIVENCIA.</li>

                        <li><span className="text-blue-600 font-black uppercase">RECUPERACIÓN DE BIENES:</span> POR GESTIÓN DEL CONSEJO, SE RECUPERARON LOS PARQUEADEROS DE ZONAS COMUNES QUE ESTABAN SIENDO USUFRUCTUADOS POR EL SR. ÁLVARO URBANO, LOGRANDO SU DESALOJO Y EL PAGO DE LA DEUDA.</li>

                        <li><span className="text-blue-600 font-black uppercase">MANEJO DE BASURAS:</span> SE IDENTIFICÓ MALA DISPOSICIÓN DE RESIDUOS. SE PROPUSO INSTALAR LETREROS INFORMATIVOS PARA CLASIFICACIÓN (ORGÁNICOS, RECICLABLES, NO APROVECHABLES).</li>

                      </ul>

                    </Card>

                    <div className="bg-slate-900 rounded-3xl p-8 text-white shadow-xl flex flex-col justify-center text-center uppercase font-black">

                      <Landmark className="text-blue-400 mb-4 mx-auto" size={32} />

                      <h4 className="font-bold mb-2 uppercase">Gestión Legal</h4>

                      <p className="text-[11px] leading-relaxed text-slate-400 uppercase font-black">Seguimiento normativo conforme a la Ley 675 de 2001 y el Reglamento Interno.</p>

                    </div>

                  </div>

                </div>



                {/* 5. CAJA MENOR - DETALLE POR MESES */}

                <div className="space-y-6 text-left">

                  <h3 className="text-xl font-black text-slate-900 border-l-4 border-slate-400 pl-4 uppercase tracking-tighter font-black">5. DESGLOSE DE GASTOS MENORES (CAJA MENOR)</h3>

                  <Card>

                    <div className="overflow-x-auto rounded-xl border border-slate-200 shadow-sm uppercase font-black">

                      <table className="w-full text-[10px] font-bold uppercase text-left">

                        <thead className="bg-slate-50 text-slate-900 font-black border-b tracking-widest uppercase">

                          <tr><th className="p-3">FECHA</th><th className="p-3 text-left uppercase">PROVEEDOR / BENEFICIARIO</th><th className="p-3 text-left uppercase">DESCRIPCIÓN</th><th className="p-3 text-right uppercase">VALOR</th></tr>

                        </thead>

                        <tbody className="divide-y divide-slate-100 text-slate-900 font-black uppercase">

                          <tr className="bg-slate-50 font-black uppercase"><td colSpan="3" className="p-3 uppercase">ENERO (SALDO INICIAL: $291.200)</td><td className="p-3 text-right text-blue-600 uppercase font-black">ENE: $222.300</td></tr>

                          <tr><td className="p-3">17/01</td><td>CARMEN PATRICIA HERRERA</td><td>GUANTE TASK</td><td className="p-3 text-right">$6.800</td></tr>

                          <tr><td className="p-3">09/01</td><td>AGRO PLÁSTICOS DEL SUR</td><td>50 BOLSAS INDUSTRIALES</td><td className="p-3 text-right">$39.500</td></tr>

                          <tr><td className="p-3">31/01</td><td>CHANEL PLUS SAS</td><td>TV ANALÓGICA ENERO 2025</td><td className="p-3 text-right">$176.000</td></tr>

                          

                          <tr className="bg-slate-50 font-black uppercase"><td colSpan="3" className="p-3 uppercase">MARZO (TOTAL: $8.501)</td><td className="p-3 text-right text-blue-600 uppercase font-black">MARZO</td></tr>

                          <tr><td className="p-3">19/03</td><td>SU FERRETERÍA PANDIACO</td><td>THINNER CORRIENTE</td><td className="p-3 text-right">$6.501</td></tr>

                          <tr><td className="p-3">31/03</td><td>ALCALDÍA DE PASTO</td><td>RETE ICA BIMESTRE 1</td><td className="p-3 text-right">$2.000</td></tr>



                          <tr className="bg-slate-50 font-black uppercase"><td colSpan="3" className="p-3 uppercase uppercase">ABRIL (TOTAL: $37.500)</td><td className="p-3 text-right text-blue-600 uppercase font-black uppercase">ABRIL</td></tr>

                          <tr><td className="p-3">19/04</td><td>DORIS OMAIRA TORO</td><td>COMPRA DE BOLSAS DE BASURA</td><td className="p-3 text-right">$37.500</td></tr>



                          <tr className="bg-slate-50 font-black uppercase"><td colSpan="3" className="p-3 uppercase uppercase">MAYO (TOTAL: $9.000)</td><td className="p-3 text-right text-blue-600 uppercase font-black uppercase">MAYO</td></tr>

                          <tr><td className="p-3">30/05</td><td>ALCALDÍA DE PASTO</td><td>RETE ICA BIMESTRE 2</td><td className="p-3 text-right">$9.000</td></tr>



                          <tr className="bg-slate-50 font-black uppercase"><td colSpan="3" className="p-3 uppercase uppercase">JUN/JUL (TOTAL: $51.550)</td><td className="p-3 text-right text-blue-600 uppercase font-black uppercase">JUN/JUL</td></tr>

                          <tr><td className="p-3">26/07</td><td>AGRO PLÁSTICOS DEL SUR</td><td>KILO DE BOLSA INDUSTRIAL NEGRA</td><td className="p-3 text-right">$40.000</td></tr>

                          <tr><td className="p-3">10/08</td><td>D1 SAS</td><td>COMPRA DE 4 BLANQUEADORES DE PISOS</td><td className="p-3 text-right">$11.550</td></tr>



                          <tr className="bg-slate-50 font-black uppercase"><td colSpan="3" className="p-3 uppercase uppercase">OCTUBRE (TOTAL: $45.000)</td><td className="p-3 text-right text-blue-600 uppercase font-black uppercase">OCT</td></tr>

                          <tr><td className="p-3">18/09</td><td>AGRO PLÁSTICOS DEL SUR</td><td>KILO BOLSAS 90X110 NEGRA</td><td className="p-3 text-right">$45.000</td></tr>



                          <tr className="bg-slate-50 font-black uppercase"><td colSpan="3" className="p-3 uppercase uppercase uppercase">NOVIEMBRE (TOTAL: $78.400)</td><td className="p-3 text-right text-blue-600 uppercase font-black uppercase uppercase">NOV</td></tr>

                          <tr><td className="p-3">09/11</td><td>OMAR ALEXIS QUINTERO</td><td>MALLA Y FLORES PARA NAVIDAD</td><td className="p-3 text-right">$78.400</td></tr>



                          <tr className="bg-slate-50 font-black uppercase"><td colSpan="3" className="p-3 uppercase uppercase uppercase">DICIEMBRE</td><td className="p-3 text-right text-blue-600 uppercase font-black uppercase uppercase">DIC: $2.000</td></tr>

                          <tr><td className="p-3">23/12</td><td>ANA LUCIA YEPEZ</td><td>COMPRA SOBRE BONO DE NAVIDAD</td><td className="p-3 text-right">$2.000</td></tr>

                        </tbody>

                      </table>

                    </div>

                  </Card>

                </div>



                {/* 6. SITUACIÓN FINANCIERA AL CIERRE */}

                <div className="space-y-6 text-left">

                  <h3 className="text-xl font-black text-slate-900 border-l-4 border-blue-900 pl-4 uppercase tracking-tighter text-left uppercase font-black">6. SITUACIÓN FINANCIERA AL CIERRE (A 31 DIC 2025)</h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-center text-slate-900 font-black uppercase">

                    <Card className="bg-slate-50 border-slate-200 shadow-xl flex flex-col justify-center min-h-[160px] text-slate-900 font-black uppercase">

                      <p className="text-[10px] text-slate-400 mb-2 tracking-[0.2em] uppercase font-black">PATRIMONIO NETO</p>

                      <p className="text-3xl tracking-tighter font-black uppercase">$1.107.084</p>

                    </Card>



                    <Card className="bg-slate-50 border-slate-200 shadow-xl flex flex-col justify-center min-h-[160px] text-slate-900 font-black uppercase">

                      <p className="text-[10px] text-slate-400 mb-2 tracking-[0.2em] uppercase font-black">EFECTIVO BANCOS</p>

                      <p className="text-3xl tracking-tighter text-blue-600 font-black uppercase">$3.702.951</p>

                    </Card>



                    <Card className="bg-slate-50 border-slate-200 shadow-xl flex flex-col justify-center min-h-[160px] text-slate-900 font-black uppercase">

                      <p className="text-[10px] text-slate-400 mb-2 tracking-[0.2em] uppercase font-black">FONDO IMPREVISTOS</p>

                      <p className="text-3xl tracking-tighter text-emerald-600 font-black uppercase">$816.452</p>

                      <p className="text-[8px] opacity-70 mt-2 font-bold tracking-widest uppercase font-black">META LEGAL: $3.171.927</p>

                    </Card>



                    <Card className="bg-slate-50 border-slate-200 shadow-xl flex flex-col justify-center min-h-[160px] text-slate-900 font-black uppercase">

                      <p className="text-[10px] text-slate-400 mb-2 tracking-[0.2em] uppercase font-black">RESULTADO FINAL</p>

                      <p className="text-2xl text-emerald-600 font-black uppercase">+$45.122 (OP.)</p>

                      <p className="text-[8px] text-red-500 mt-2 font-black uppercase">DÉFICIT NETO: ($788.878)*</p>

                    </Card>

                  </div>

                </div>



              </div>

            </div>

          



          {/* 7-8. FINANCIERO */}

          <div className={`${activeSection === 'financiero' ? 'block' : 'hidden'} print:block print:break-after-page uppercase text-center`}>
            <SectionHeader title="Estados Financieros y Revisoría" icon={BarChart3} agendaIndex={6} agendaStatus={agendaStatus} toggleAgendaItem={toggleAgendaItem} />
            <Card>
              <BarChart3 size={48} className="text-blue-600 mb-6 mx-auto" />
              <h4 className="text-xl font-black text-slate-800 mb-6 uppercase tracking-widest">Balance y Ejecución Presupuestal 2025</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-lg mx-auto">
                
                {/* AJUSTE AQUÍ: Cambiamos button por etiqueta 'a' con el link de Drive */}
                <a 
                  href="https://drive.google.com/file/d/1avX-044Y4FD_6rHMQqTPWi4cA_JBUrF1/view?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-slate-900 text-white px-6 py-4 rounded-2xl font-black text-xs flex items-center justify-center gap-2 tracking-widest shadow-xl hover:bg-black transition-all"
                >
                  <FileText size={18}/> Estados Financieros
                </a>

                <button className="bg-blue-600 text-white px-6 py-4 rounded-2xl font-black text-xs flex items-center justify-center gap-2 tracking-widest shadow-xl">
                  <ShieldCheck size={18}/> Dictamen Fiscal
                </button>
                
              </div>
            </Card>
          </div>



          {/* 9. PRESUPUESTO */}

          <div className={`${activeSection === 'presupuesto' ? 'block' : 'hidden'} print:block print:break-after-page uppercase text-center`}>

            <SectionHeader title="Presupuesto y Cuotas 2026" icon={Settings} agendaIndex={8} agendaStatus={agendaStatus} toggleAgendaItem={toggleAgendaItem} />

            <Card title="Proyecto de Gastos 2026">

              <div className="p-10 border-4 border-dashed border-slate-100 rounded-[40px] text-center bg-slate-50/50">

                <Settings size={64} className="text-blue-600 mb-6 mx-auto animate-spin-slow" />

                <h4 className="text-2xl font-black text-slate-800 mb-4 uppercase tracking-tighter">Propuesta Económica 2026</h4>

                <p className="text-xs text-slate-500 font-bold mb-8 max-w-md mx-auto">DEFINICIÓN DE CUOTAS DE ADMINISTRACIÓN SEGÚN COEFICIENTES DE COPROPIEDAD.</p>

                <button className="bg-blue-600 text-white px-10 py-5 rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl shadow-blue-200">Ver Comparativo</button>

              </div>

            </Card>

          </div>



          {/* 10-11. ELECCIONES */}

          <div className={`${activeSection === 'postulaciones' ? 'block' : 'hidden'} print:block print:break-after-page uppercase text-center`}>

            <SectionHeader title="Elecciones 2026-2027" icon={UserPlus} agendaIndex={9} agendaStatus={agendaStatus} toggleAgendaItem={toggleAgendaItem} />

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

              <Card title="Elección Revisor Fiscal">

                <div className="p-8 bg-slate-50 rounded-2xl border-2 border-slate-100 text-center flex flex-col items-center justify-center min-h-[300px]">

                  <Gavel size={48} className="text-slate-300 mb-4" />

                  <p className="text-[10px] font-black text-slate-400 uppercase mb-4 tracking-widest">Elección del Punto 11</p>

                  <input type="text" className="w-full p-4 bg-white border border-slate-200 rounded-xl text-center font-black uppercase text-sm tracking-widest" placeholder="Nombre Revisor Electo" />

                </div>

              </Card>

            </div>

          </div>



          {/* 12. PROPOSICIONES */}

          <div className={`${activeSection === 'proposiciones' ? 'block' : 'hidden'} print:block print:break-after-page uppercase text-center`}>

            <SectionHeader title="Proposiciones y Varios" icon={MessageSquare} agendaIndex={11} agendaStatus={agendaStatus} toggleAgendaItem={toggleAgendaItem} />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left uppercase">

              <div className="md:col-span-1 print:hidden">

                <Card title="Nuevo Registro">

                  <div className="space-y-4 font-black">

                    <input type="text" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm outline-none focus:border-blue-500 uppercase tracking-widest" placeholder="Unidad" value={tempProp.proponente} onChange={(e) => setTempProp({...tempProp, proponente: e.target.value})} />

                    <textarea className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm h-32 outline-none focus:border-blue-500 uppercase tracking-widest leading-relaxed" placeholder="Detalle..." value={tempProp.texto} onChange={(e) => setTempProp({...tempProp, texto: e.target.value})}></textarea>

                    <button onClick={addProposicion} className="w-full bg-blue-600 text-white py-4 rounded-2xl uppercase tracking-widest text-[10px] font-black shadow-lg">Añadir Proposición</button>

                  </div>

                </Card>

              </div>

              <div className="md:col-span-2 print:col-span-3">

                <Card title="Propuestas Registradas">

                  <div className="space-y-4">

                    {proposiciones.length === 0 ? <p className="text-slate-400 text-center py-10 opacity-40 uppercase font-black">Sin registros en el acta actual</p> : 

                    proposiciones.map(p => (

                      <div key={p.id} className="p-4 bg-slate-50 border border-slate-100 rounded-2xl flex justify-between items-start gap-4 print:bg-white shadow-sm">

                        <div><span className="text-[10px] font-black text-blue-600 uppercase tracking-widest">Unidad: {p.proponente}</span><p className="text-sm font-bold text-slate-700 leading-relaxed uppercase">{p.texto}</p></div>

                        <button onClick={() => removeProposicion(p.id)} className="text-red-300 hover:text-red-600 print:hidden"><Trash2 size={18}/></button>

                      </div>

                    ))}

                  </div>

                </Card>

              </div>

            </div>

          </div>



          {/* RESUMEN FINAL */}

          <div className={`${activeSection === 'resumen' ? 'block' : 'hidden print:block'} space-y-8 uppercase tracking-widest text-center`}>

            <div className="flex justify-between items-center print:hidden">

              <h2 className="text-3xl font-black text-slate-800 uppercase tracking-tighter">Cierre de Asamblea</h2>

              <button onClick={handlePrint} className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-black flex items-center gap-3 shadow-2xl hover:bg-black transition-all text-xs tracking-widest">

                <Printer size={20} /> Generar Acta Final

              </button>

            </div>

            <Card className="p-10 border-t-8 border-t-blue-600 print:border-none print:shadow-none print:p-0">

              <div className="hidden print:block text-center border-b-2 border-slate-900 pb-8 mb-10">

                <h1 className="text-3xl font-black uppercase mb-1 tracking-tighter">Resumen Asamblea Ordinaria 2026</h1>

                <p className="text-lg font-bold text-slate-600 uppercase leading-none">Condominio Esquina Real - NIT 900.367.280-6</p>

              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-12 print:grid-cols-3 print:gap-8 text-center uppercase">

                <div className="space-y-6">

                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Quórum Legal</p>

                  <div className="p-6 bg-slate-50 rounded-[32px] border border-slate-100 print:bg-white print:border-slate-200">

                    <div className="flex justify-between mb-4"><span className="text-xs font-bold text-slate-500 uppercase">Total:</span><span className="text-lg font-black text-emerald-600">{totalQuorum.toFixed(2)}%</span></div>

                    <div className="flex justify-between"><span className="text-xs font-bold text-slate-500 uppercase">Estado:</span><span className="text-lg font-black text-blue-600">{totalQuorum >= 50.1 ? 'VÁLIDO' : 'INSUF.'}</span></div>

                  </div>

                </div>

                <div className="space-y-6">

                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Directivos</p>

                  <div className="space-y-4 font-black text-sm">

                    <div><p className="text-[9px] text-slate-400 mb-1 uppercase tracking-widest">Presidente</p><p className="truncate">{dignatarios.presidente || '________________'}</p></div>

                    <div><p className="text-[9px] text-slate-400 mb-1 uppercase tracking-widest">Secretario</p><p className="truncate">{dignatarios.secretario || '________________'}</p></div>

                  </div>

                </div>

                <div className="space-y-6">

                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Electos 2026</p>

                  <div className="space-y-6">

                    <div>

                      <p className="text-[9px] font-black text-slate-500 uppercase mb-2 tracking-widest">Consejo</p>

                      <div className="flex flex-wrap gap-1 justify-center">

                        {postuladosConsejo.length > 0 ?

                        postuladosConsejo.map(p => <span key={p} className="bg-slate-100 px-2 py-0.5 rounded text-[9px] font-black text-slate-600 print:border uppercase">{p}</span>) : 

                        <span className="text-[9px] italic text-slate-300 font-bold uppercase">Sin registro</span>}

                      </div>

                    </div>

                  </div>

                </div>

              </div>

              <div className="hidden print:grid grid-cols-2 gap-20 mt-32 text-center">

                <div className="text-center border-t-2 border-slate-900 pt-4 font-black">

                  <p className="text-xs font-black uppercase mb-1 tracking-widest">{dignatarios.presidente || '_________________________'}</p>

                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Presidente de Asamblea</p>

                </div>

                <div className="text-center border-t-2 border-slate-900 pt-4 font-black">

                  <p className="text-xs font-black uppercase mb-1 tracking-widest">{dignatarios.secretario || '_________________________'}</p>

                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Secretario de Asamblea</p>

                </div>

              </div>

            </Card>

          </div>
          
          <style dangerouslySetInnerHTML={{ __html: `
            @media print {
              /* 1. Fuerza la visibilidad de la gestión en el PDF */
              .print-visible-section {
                display: block !important;
                opacity: 1 !important;
                visibility: visible !important;
              }

              /* 2. Evita que las tarjetas se corten entre páginas */
              .card, section, div {
                page-break-inside: avoid !important;
              }

              /* 3. Asegura que los colores azul y verde se impriman */
              * {
                -webkit-print-color-adjust: exact !important;
                print-color-adjust: exact !important;
              }
            }
          `}} />

        </div>

      </main>
      

    </div>

  );

}