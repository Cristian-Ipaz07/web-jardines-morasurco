import React, { useState, useMemo, useEffect } from 'react';
import { 
  Users, FileText, BarChart3, CheckSquare, MessageSquare, Home, 
  ShieldCheck, ExternalLink, Save, Clock, UserPlus, Download, 
  CheckCircle2, Printer, ChevronRight, Trash2, TrendingUp, Settings,
  ClipboardCheck, AlertTriangle, Info, Camera, Zap, Droplets, Shield,
  BookOpen, Scale, FolderOpen, AlertCircle, CheckCircle, Wallet, Gavel, Key, Eye,
  Activity, Wrench, Award, Calendar, Layout, ListChecks
} from 'lucide-react';

// --- COMPONENTES DE UI ---

const SectionHeader = ({ title, icon: Icon, agendaIndex, agendaStatus, toggleAgendaItem }) => (
  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 border-b pb-4 border-slate-200 print:hidden">
    <div className="flex items-center gap-3">
      <div className="p-3 bg-[#143d1f] rounded-xl text-white shadow-lg shadow-emerald-100">
        {Icon && <Icon size={24} />}
      </div>
      <div>
        <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight">{title}</h2>
        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">
          {`Punto ${agendaIndex + 1} del Orden del día`}
        </p>
      </div>
    </div>
    <button 
      onClick={() => toggleAgendaItem(agendaIndex)}
      className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-sm transition-all border-2 ${
        agendaStatus[agendaIndex] 
        ? 'bg-emerald-600 border-emerald-600 text-white shadow-lg shadow-emerald-100' 
        : 'bg-white border-slate-200 text-slate-400 hover:border-[#143d1f] hover:text-[#143d1f]'
      }`}
    >
      <CheckCircle2 size={18} />
      {agendaStatus[agendaIndex] ? 'PUNTO EVACUADO' : 'MARCAR COMO EVACUADO'}
    </button>
  </div>
);

const Card = ({ children, title, className = "", icon: Icon, badge }) => (
  <div className={`bg-white rounded-2xl shadow-sm border border-slate-200 p-6 ${className}`}>
    <div className="flex justify-between items-start mb-5">
      {title && <h3 className="text-lg font-bold text-slate-700 flex items-center gap-2 text-balance">
        <div className="w-1.5 h-6 bg-[#0ea5e9] rounded-full shrink-0"></div>
        {Icon && <Icon size={20} className="text-[#143d1f]" />}
        {title}
      </h3>}
      {badge && <span className="bg-emerald-50 text-emerald-700 text-[9px] font-black px-2 py-1 rounded-md uppercase tracking-widest border border-emerald-100">{badge}</span>}
    </div>
    {children}
  </div>
);

const InvestmentTable = ({ title, data, total, icon: Icon, photos = [] }) => {
  const [showPhotos, setShowPhotos] = React.useState(false);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm flex flex-col h-full">
      <div className="bg-slate-50 px-6 py-4 border-b flex justify-between items-center">
        <div className="flex items-center gap-3">
          {Icon && <Icon className="text-[#143d1f]" size={18} />}
          <h4 className="text-xs font-black text-slate-700 uppercase tracking-widest">{title}</h4>
        </div>
        <div className="text-right">
          <p className="text-[9px] font-bold text-slate-400 uppercase leading-none mb-1">Inversión Total</p>
          <p className="text-sm font-black text-[#143d1f]">{total}</p>
        </div>
      </div>

      <div className="overflow-x-auto flex-1">
        <table className="w-full text-left text-[11px]">
          <thead className="bg-slate-50/50 text-slate-400 font-black uppercase tracking-tighter border-b">
            <tr>
              <th className="px-6 py-3">Proveedor</th>
              <th className="px-6 py-3">Detalle</th>
              {/* Columna de Evidencia con ancho fijo para centrar mejor */}
              <th className="px-6 py-3 text-center w-32">Evidencia</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 uppercase font-bold text-slate-600">
            {data.map((row, idx) => (
              <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                <td className="px-6 py-3 text-slate-900">{row.proveedor}</td>
                <td className="px-6 py-3">{row.detalle}</td>
                
                {/* Lógica de celda única: Solo renderizamos el botón en la primera fila y lo centramos verticalmente si quieres, o simplemente lo dejamos en la columna */}
                <td className="px-6 py-3 text-center">
                  {idx === 0 && photos.length > 0 && (
                    <button 
                      onClick={() => setShowPhotos(true)}
                      className="group flex flex-col items-center gap-1 mx-auto transition-all"
                    >
                      <div className="p-2 bg-sky-50 text-[#0ea5e9] rounded-xl group-hover:bg-[#0ea5e9] group-hover:text-white shadow-sm transition-all">
                        <Camera size={20} />
                      </div>
                      <span className="text-[8px] font-black text-sky-600 group-hover:text-sky-800">VER GALERÍA</span>
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MODAL DE GALERÍA (Adaptable al tamaño de imagen) */}
      {showPhotos && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/95 backdrop-blur-md animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-5xl rounded-[40px] overflow-hidden shadow-2xl">
            <div className="p-8 border-b flex justify-between items-center bg-slate-50">
              <div>
                <h3 className="font-black text-xl text-slate-800 uppercase tracking-tight">Evidencias Fotográficas</h3>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{title}</p>
              </div>
              <button onClick={() => setShowPhotos(false)} className="p-3 bg-slate-200 hover:bg-red-100 hover:text-red-600 rounded-full transition-all">
                <Trash2 size={20} />
              </button>
            </div>
            
            <div className="p-10 grid grid-cols-1 md:grid-cols-2 gap-8 max-h-[65vh] overflow-y-auto justify-items-center">
              {photos.map((url, i) => (
                <div key={i} className="bg-slate-50 p-2 rounded-3xl border border-slate-200 shadow-inner">
                  <img 
                    src={url} 
                    alt={`Evidencia ${i}`} 
                    className="max-w-full h-auto max-h-[50vh] object-contain rounded-2xl shadow-md"
                  />
                </div>
              ))}
            </div>

            <div className="p-8 bg-slate-50 border-t flex justify-center">
              <button 
                onClick={() => setShowPhotos(false)} 
                className="px-12 py-4 bg-[#143d1f] text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl hover:scale-105 transition-all"
              >
                Cerrar Galería
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// --- BASE DE DATOS CAMPOS DE ARAGÓN (ACTUALIZADA 100%) ---
const INITIAL_DATA = [
  { id: 1, unidad: '301', propietario: 'PROYECTOS E INVERSIONES', coeficiente: 1.55540 },
  { id: 2, unidad: '302', propietario: 'JAIME BURBANO', coeficiente: 1.81804 },
  { id: 3, unidad: '303', propietario: 'ALFREDO ERAZO', coeficiente: 1.81956 },
  { id: 4, unidad: '304', propietario: 'CLAUDIA YANETH PEÑA', coeficiente: 1.45938 },
  { id: 5, unidad: '401', propietario: 'CAROLINA RODRIGUEZ PUERTAS', coeficiente: 1.51149 },
  { id: 6, unidad: '402', propietario: 'LUZ MARINA PUERTA VELEZ', coeficiente: 1.90105 },
  { id: 7, unidad: '403', propietario: 'MARIA LUCRECIA ORDOÑEZ', coeficiente: 1.86484 },
  { id: 8, unidad: '404', propietario: 'JOHANA CARDENAS', coeficiente: 1.45567 },
  { id: 9, unidad: '501', propietario: 'CARLOS ENRIQUEZ', coeficiente: 1.43467 },
  { id: 10, unidad: '502', propietario: 'JOSE IGNACIO CORAL', coeficiente: 1.89493 },
  { id: 11, unidad: '503', propietario: 'LUCÍA RIASCOS', coeficiente: 1.95358 },
  { id: 12, unidad: '504', propietario: 'YOLANDA VELEZ', coeficiente: 1.42934 },
  { id: 13, unidad: '601', propietario: 'LILIANA CORAL', coeficiente: 1.49991 },
  { id: 14, unidad: '602', propietario: 'MYRIAM PAREDES AGUIRRE', coeficiente: 1.86992 },
  { id: 15, unidad: '603', propietario: 'LUIS ZARAMA', coeficiente: 1.72319 },
  { id: 16, unidad: '604', propietario: 'GLORIA SANTANDER', coeficiente: 1.47325 },
  { id: 17, unidad: '701', propietario: 'DIANA MARIA RODRIGUEZ', coeficiente: 1.44501 },
  { id: 18, unidad: '702', propietario: 'ANA ISABEL CHAMORRO', coeficiente: 1.84490 },
  { id: 19, unidad: '703', propietario: 'HUMBERTO VIVEROS-SOFIA BENAVIDES', coeficiente: 1.89526 },
  { id: 20, unidad: '704', propietario: 'DIEGO PORTILLA', coeficiente: 1.43467 },
  { id: 21, unidad: '801', propietario: 'LUIS ALBERTO AZA', coeficiente: 1.52531 },
  { id: 22, unidad: '802', propietario: 'FABIO ARMANDO MARTINEZ', coeficiente: 1.82963 },
  { id: 23, unidad: '803', propietario: 'ORLANDO VILLOTA', coeficiente: 1.85346 },
  { id: 24, unidad: '804', propietario: 'ANDRES ORDOÑEZ', coeficiente: 1.52380 },
  { id: 25, unidad: '901', propietario: 'PATRICIA SILVA DE ACOSTA', coeficiente: 1.46890 },
  { id: 26, unidad: '902', propietario: 'ANTONIO CALDERON', coeficiente: 1.86149 },
  { id: 27, unidad: '903', propietario: 'NIDIA ARCOS-ARMANDO CHAMORRO', coeficiente: 1.83885 },
  { id: 28, unidad: '904', propietario: 'CARLOS SOLARTE', coeficiente: 1.45751 },
  { id: 29, unidad: '1001', propietario: 'CATALINA VILLOTA', coeficiente: 1.49991 },
  { id: 30, unidad: '1002', propietario: 'HENRY CABRERA-LIDIA ORTIZ', coeficiente: 1.81449 },
  { id: 31, unidad: '1003', propietario: 'EMMA RUANO PAZ', coeficiente: 1.86011 },
  { id: 32, unidad: '1004', propietario: 'FELIPE SOLARTE MAYA', coeficiente: 1.47562 },
  { id: 33, unidad: '1101', propietario: 'DOLY PANTOJA GUERRERO', coeficiente: 1.55540 },
  { id: 34, unidad: '1102', propietario: 'MARIA EUGENIA DE LA ROSA', coeficiente: 1.83358 },
  { id: 35, unidad: '1103', propietario: 'JUAN FELIPE SAA', coeficiente: 1.98063 },
  { id: 36, unidad: '1104', propietario: 'LUISA FERNANDA ENRIQUEZ ERASO', coeficiente: 1.54769 },
  { id: 37, unidad: '1201', propietario: 'EDUARDO VILLACIS', coeficiente: 1.51735 },
  { id: 38, unidad: '1202', propietario: 'ANDRES SANTACRUZ DE LA ROSA', coeficiente: 1.91303 },
  { id: 39, unidad: '1203', propietario: 'ALICIA DAVILA', coeficiente: 1.86031 },
  { id: 40, unidad: '1204', propietario: 'CELINA MARIA ZARAMA MEDINA', coeficiente: 1.45817 },
  { id: 41, unidad: '1301', propietario: 'JOSE ANDRES PAREDES OSEJO', coeficiente: 1.47061 },
  { id: 42, unidad: '1302', propietario: 'LIBARDO VALLEJO Y ALICIA CAIZA', coeficiente: 1.86807 },
  { id: 43, unidad: '1303', propietario: 'CONCEPCION VILLOTA LEON', coeficiente: 1.85755 },
  { id: 44, unidad: '1304', propietario: 'MARIA ISABEL SARRALDE', coeficiente: 1.45593 },
  { id: 45, unidad: '1401', propietario: 'MARIA EUGENIA SILVA', coeficiente: 1.44389 },
  { id: 46, unidad: '1402', propietario: 'TERESITA CHAMORRO DE LÓPEZ', coeficiente: 1.91303 },
  { id: 47, unidad: '1403', propietario: 'PEDRO GARCIA REALPE', coeficiente: 1.99933 },
  { id: 48, unidad: '1404', propietario: 'ANYELI GUERRERO', coeficiente: 1.47213 },
  { id: 49, unidad: '1501', propietario: 'JHON HENRY CABRERA', coeficiente: 1.44218 },
  { id: 50, unidad: '1502', propietario: 'ANDRES SANTANDER H.', coeficiente: 1.91502 },
  { id: 51, unidad: '1503', propietario: 'JESUS MARIA TORRONTEGUI', coeficiente: 1.89697 },
  { id: 52, unidad: '1504', propietario: 'JOSE ANTONIO MARTINEZ', coeficiente: 1.54835 },
  { id: 53, unidad: '1601', propietario: 'EUDORO VILLOTA', coeficiente: 2.45964 },
  { id: 54, unidad: '1602', propietario: 'ALVARO SANTANDER', coeficiente: 3.53129 },
  { id: 55, unidad: '1603', propietario: 'PABLO ANDRES GUERRERO', coeficiente: 3.49417 },
  { id: 56, unidad: '1604', propietario: 'MARIO IVAN CABRERA', coeficiente: 2.87046 },
];

const ORDEN_DIA_OFICIAL = [
  "Registro de firmas y verificación del quórum.",
  "Lectura y aprobación del orden del día.",
  "Elección de dignatarios de la Asamblea (presidente y secretario).",
  "Elección del comité de verificación de la presente acta.",
  "Validación de la comisión verificadora del Acta Anterior.",
  "Presentación y aprobación del informe de Administración.",
  "Presentación y aprobación de Estados Financieros a diciembre 31 de 2025.",
  "Presentación y aprobación del proyecto de presupuesto e ingresos 2026 - Cuotas.",
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
  const evacuarDignatarios = () => {
  // Usamos el setAgendaStatus directamente para asegurar que React repinte la interfaz
    setAgendaStatus(prev => {
      const nuevoEstado = [...prev];
      nuevoEstado[2] = true; // Marca Punto 3
      nuevoEstado[3] = true; // Marca Punto 4
      return nuevoEstado;
    });
  };
  const evacuarElecciones = () => {
    // Usamos setAgendaStatus directamente para asegurar que ambos puntos cambien
    setAgendaStatus(prev => {
      const nuevoEstado = [...prev];
      nuevoEstado[8] = true; // Marca Punto 9 (Consejo) en el Orden del Día
      nuevoEstado[9] = true; // Marca Punto 10 (Convivencia) en el Orden del Día
      return nuevoEstado;
    });
  };
  const totalQuorum = useMemo(() => {
    const total = asistencia.filter(a => a.presente).reduce((acc, curr) => acc + curr.coeficiente, 0);
    return parseFloat(total.toFixed(2));
  }, [asistencia]);

  const progress = useMemo(() => {
    return (agendaStatus.filter(i => i).length / ORDEN_DIA_OFICIAL.length) * 100;
  }, [agendaStatus]);

  const toggleAsistencia = (id) => {
    setAsistencia(prev => prev.map(a => a.id === id ? { ...a, presente: !a.presente } : a));
  };

  const toggleAgendaItem = (idx) => {
    const newStatus = [...agendaStatus];
    newStatus[idx] = !newStatus[idx];
    setAgendaStatus(newStatus);
  };

  const addProposicion = () => {
    if (tempProp.proponente && tempProp.texto) {
      setProposiciones([...proposiciones, { ...tempProp, id: Date.now() }]);
      setTempProp({ proponente: '', texto: '' });
    }
  };

  const togglePostulacion = (propietario, tipo) => {
    if (tipo === 'consejo') {
      setPostuladosConsejo(prev => prev.includes(propietario) ? prev.filter(p => p !== propietario) : [...prev, propietario]);
    } else {
      setPostuladosConvivencia(prev => prev.includes(propietario) ? prev.filter(p => p !== propietario) : [...prev, propietario]);
    }
  };

  const marcarTodosComoPresentes = () => {
  // Esta función recorre todo el INITIAL_DATA y activa el check de asistencia
  setAsistencia(prev => prev.map(unidad => ({ ...unidad, presente: true })));
  };

  const handlePrint = () => window.print();

  return (
    <div className="flex min-h-screen bg-[#f8fafc] font-sans text-slate-900 print:bg-white">
      
      {/* SIDEBAR */}
      <aside className="w-72 bg-[#143d1f] text-emerald-100 fixed h-full flex flex-col shadow-2xl z-20 print:hidden border-r border-[#0f2b16]">
        <div className="p-8 border-b border-emerald-800/30 text-center bg-[#0d2a15]">
          <h1 className="text-white font-black text-xl tracking-tighter flex flex-col items-center gap-1">
            <Shield className="text-[#d4af37] mb-2" size={32} />
            <span className="uppercase text-[10px] font-bold tracking-[0.3em] opacity-50">Condominio</span>
            <span className="text-white uppercase leading-none text-2xl tracking-tight">Campos de <br/> Aragón</span>
          </h1>
          <p className="text-[9px] font-black mt-4 text-[#d4af37] uppercase tracking-widest">Asamblea Ordinaria 2026</p>
        </div>
        
        <nav className="flex-1 overflow-y-auto p-4 space-y-1">
          {[
            { id: 'bienvenida', label: 'Inicio', icon: Home },
            { id: 'quorum', label: '1. Quórum', icon: Users },
            { id: 'orden', label: '2. Orden del Día', icon: CheckSquare },
            { id: 'dignatarios', label: '3-4. Dignatarios', icon: UserPlus },
            { id: 'actaAnterior', label: '5. Acta Anterior', icon: ShieldCheck },
            { id: 'gestion', label: '6. Informe Gestión', icon: TrendingUp },
            { id: 'financiero', label: '7. Financiero', icon: BarChart3 },
            { id: 'presupuesto', label: '8. Presupuesto', icon: Settings },
            { id: 'postulaciones', label: '9-10. Elecciones', icon: UserPlus },
            { id: 'proposiciones', label: '11. Proposiciones', icon: MessageSquare },
            { id: 'resumen', label: 'Generar Acta', icon: Printer },
          ].map(item => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-sm font-bold ${
                  activeSection === item.id 
                  ? 'bg-[#0ea5e9] text-white shadow-lg' 
                  : 'hover:bg-[#1a4a26] hover:text-white'
                }`}
              >
                <Icon size={18} />
                {item.label}
              </button>
            );
          })}
        </nav>
        <div className="p-6 border-t border-emerald-800/30 text-[9px] font-bold text-center opacity-40 uppercase tracking-widest text-emerald-200">
           Pasto, Colombia <br/> 2026
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="ml-72 flex-1 pb-20 print:ml-0">
        
        {/* HEADER */}
        <header className="sticky top-0 bg-white/95 backdrop-blur-md border-b border-slate-200 px-8 py-4 z-10 flex justify-between items-center print:hidden">
          <div className="flex gap-10">
            <div>
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Quórum Actual</span>
              <div className="flex items-center gap-3">
                <span className={`text-2xl font-black ${totalQuorum >= 50.1 ? 'text-emerald-600' : 'text-[#0ea5e9]'}`}>
                  {totalQuorum.toFixed(2)}%
                </span>
                <span className={`px-2 py-0.5 rounded text-[10px] font-black ${totalQuorum >= 50.1 ? 'bg-emerald-100 text-emerald-700' : 'bg-sky-50 text-sky-700'}`}>
                  {totalQuorum >= 50.1 ? 'VALIDEZ LEGAL' : 'PENDIENTE'}
                </span>
              </div>
            </div>
            
            <div className="border-l pl-8 border-slate-200">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Progreso de la sesión</span>
              <div className="flex items-center gap-3 mt-1">
                 <div className="h-2 w-32 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
                    <div className="h-full bg-[#0ea5e9] transition-all duration-700 shadow-[0_0_8px_rgba(14,165,233,0.3)]" style={{width: `${progress}%`}}></div>
                 </div>
                 <span className="text-xs font-black text-[#0ea5e9]">{Math.round(progress)}%</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 text-right">
            <div>
               <p className="text-sm font-black text-slate-800 uppercase tracking-tighter">Edificio Campos de Aragón</p>
               <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Ana Lucia Yepez C. | Administradora</p>
            </div>
            <div className="h-10 w-10 bg-sky-50 rounded-full flex items-center justify-center text-[#0ea5e9]">
               <Clock size={20} />
            </div>
          </div>
        </header>

        <div className="max-w-6xl mx-auto p-10 space-y-12 print:p-0">
          
          {activeSection === 'bienvenida' && (
            <div className="space-y-10 animate-in fade-in zoom-in-95 duration-500">
               <div className="bg-[#143d1f] rounded-[40px] p-16 text-white relative overflow-hidden shadow-2xl border-b-8 border-[#0ea5e9]">
                  <div className="relative z-10 text-center">
                     <span className="bg-[#0ea5e9] text-white text-[10px] font-black uppercase px-4 py-1.5 rounded-full mb-8 inline-block tracking-[0.2em]">Pasto, Nariño | Vigencia 2026</span>
                     <h1 className="text-7xl font-black mb-6 leading-none tracking-tighter uppercase">Campos de <br/><span className="text-[#d4af37] italic">Aragón</span></h1>
                     <p className="text-emerald-100/70 max-w-2xl text-lg font-medium leading-relaxed mx-auto italic">"Comprometidos con la valorización, seguridad y convivencia de nuestro patrimonio común."</p>
                  </div>
                  <div className="absolute -top-10 -right-10 w-64 h-64 bg-sky-400/5 rounded-full blur-3xl"></div>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                  <Card title="Identificación Legal" className="border-t-4 border-slate-300">
                     <div className="space-y-3">
                        <p className="text-sm font-bold text-slate-500">NIT: <span className="text-slate-950 font-black">901.058.271-8</span></p>
                        <p className="text-sm font-bold text-slate-500">Ubicación: <span className="text-slate-950 font-black uppercase">Carrera 40A No. 19-4-24</span></p>
                     </div>
                  </Card>
                  <Card title="Datos de Convocatoria" className="border-t-4 border-[#0ea5e9]">
                     <div className="space-y-3">
                        <p className="text-sm font-bold text-slate-500">Fecha: <span className="text-slate-950 font-black">17 de Febrero 2026</span></p>
                        <p className="text-sm font-bold text-slate-500">Hora: <span className="text-slate-950 font-black uppercase">7:00 PM</span></p>
                     </div>
                  </Card>
                  <Card className="bg-[#143d1f] text-white border-none shadow-xl flex flex-col justify-center items-center">
                     <p className="text-5xl font-black text-[#0ea5e9] mb-1 tracking-tighter">{asistencia.length}</p>
                     <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-80">Copropiedades Totales</p>
                  </Card>
               </div>
            </div>
          )}

          <div className={`${activeSection === 'quorum' ? 'block' : 'hidden'} print:block`}>
            <div className="space-y-8 animate-in slide-in-from-right-10">
              <SectionHeader title="Verificación del Quórum" icon={Users} agendaIndex={0} agendaStatus={agendaStatus} toggleAgendaItem={toggleAgendaItem} />
              {/* BOTÓN DE ASISTENCIA RÁPIDA */}
              <div className="flex justify-end mb-4 print:hidden">
                <button 
                  onClick={marcarTodosComoPresentes}
                  className="bg-[#143d1f] text-white px-6 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl hover:bg-[#0d2a15] transition-all flex items-center gap-3"
                >
                  <Users size={16} /> Marcar Asistencia Total
                </button>
              </div>
              <Card>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-slate-50 border-b text-slate-400 font-black uppercase tracking-widest text-[10px]">
                      <tr>
                        <th className="p-4">Apto</th>
                        <th className="p-4">Propietario / Representante</th>
                        <th className="p-4 text-center">Coeficiente (%)</th>
                        <th className="p-4 text-center">Asistencia</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 uppercase">
                      {asistencia.map((item) => (
                        <tr key={item.id} className={`${item.presente ? 'bg-sky-50/40' : ''} hover:bg-slate-50 transition-colors`}>
                          <td className="p-4 font-black text-slate-800">{item.unidad}</td>
                          <td className="p-4 font-bold text-slate-600">{item.propietario}</td>
                          <td className="p-4 font-black text-slate-400 text-center">{item.coeficiente.toFixed(5)}%</td>
                          <td className="p-4 text-center">
                            <button 
                              onClick={() => toggleAsistencia(item.id)} 
                              /* Agregamos la clase 'asistencia-btn' para identificarlo en el CSS de impresión */
                              className={`asistencia-btn px-4 py-1.5 rounded-lg text-[10px] font-black transition-all ${
                                item.presente 
                                  ? 'bg-[#0ea5e9] text-white shadow-md' 
                                  : 'bg-slate-100 text-slate-400'
                              }`}
                            >
                              {item.presente ? 'PRESENTE' : 'AUSENTE'}
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            </div>
          </div>

          <div className={`${activeSection === 'orden' ? 'block' : 'hidden'} print:block print:break-after-page uppercase`}>
            <div className="space-y-8 animate-in fade-in">
              <SectionHeader title="Aprobación Orden del Día" icon={CheckSquare} agendaIndex={1} agendaStatus={agendaStatus} toggleAgendaItem={toggleAgendaItem} />
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                 <div className="lg:col-span-2 space-y-3">
                   {ORDEN_DIA_OFICIAL.map((punto, idx) => (
                     <div key={idx} className={`p-4 rounded-xl border flex items-center gap-4 transition-all ${agendaStatus[idx] ? 'border-sky-200 bg-sky-50/50' : 'bg-white border-slate-100'}`}>
                        <div className={`h-8 w-8 rounded-lg flex items-center justify-center font-black text-xs ${agendaStatus[idx] ? 'bg-[#0ea5e9] text-white' : 'bg-slate-100 text-slate-400'}`}>
                           {idx + 1}
                        </div>
                        <span className={`font-bold text-sm uppercase tracking-tight ${agendaStatus[idx] ? 'text-sky-900' : 'text-slate-600'}`}>{punto}</span>
                     </div>
                   ))}
                 </div>
                 <Card title="Observaciones">
                    <textarea 
                      className="w-full p-4 bg-slate-50 border rounded-2xl text-xs h-64 outline-none focus:ring-2 focus:ring-sky-800/10 uppercase font-bold border-slate-200"
                      placeholder="Registre constancias de aprobación aquí..."
                      value={obsAgenda}
                      onChange={(e) => setObsAgenda(e.target.value)}
                    ></textarea>
                 </Card>
              </div>
            </div>
          </div>

          <div className={`${activeSection === 'gestion' ? 'block' : 'hidden'} print:block`}>
            <div className="space-y-12 animate-in slide-in-from-bottom-10 uppercase">
              <SectionHeader title="Informe Integral de Gestión 2025" icon={TrendingUp} agendaIndex={5} agendaStatus={agendaStatus} toggleAgendaItem={toggleAgendaItem} />
              
              {/* 1. PRESENTACIÓN EJECUTIVA */}
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                <div className="lg:col-span-3">
                  <Card title="1. Presentación Ejecutiva" icon={Activity}>
                    <p className="text-sm font-medium text-slate-600 leading-relaxed mb-6 uppercase tracking-tight">
                      En 2025, la administración y el Consejo de Administración enfocaron sus esfuerzos en el fortalecimiento de la <span className="text-[#143d1f] font-black underline decoration-sky-300">seguridad electrónica</span>, la actualización tecnológica de sistemas de acceso y el mantenimiento correctivo de <span className="text-[#143d1f] font-black underline decoration-sky-300">infraestructura crítica</span> (cubiertas y maquinaria).
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                        <ShieldCheck className="text-[#143d1f] mb-3" size={24} />
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Pilar 1</p>
                        <p className="text-xs font-black text-slate-800">Seguridad Electrónica</p>
                      </div>
                      <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                        <Zap className="text-[#0ea5e9] mb-3" size={24} />
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Pilar 2</p>
                        <p className="text-xs font-black text-slate-800">Actualización Tecnológica</p>
                      </div>
                      <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                        <Droplets className="text-[#143d1f] mb-3" size={24} />
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Pilar 3</p>
                        <p className="text-xs font-black text-slate-800">Infraestructura Crítica</p>
                      </div>
                    </div>
                  </Card>
                </div>
                <div className="bg-[#143d1f] rounded-3xl p-8 text-white flex flex-col justify-center shadow-xl border-r-8 border-[#0ea5e9]">
                  <Scale size={40} className="text-[#0ea5e9] mb-4" />
                  <h4 className="text-sm font-black uppercase mb-2 tracking-widest">Gobierno 2025</h4>
                  <div className="space-y-3">
                    <div>
                      <p className="text-[9px] font-black text-emerald-400 uppercase">Presidente Consejo</p>
                      <p className="text-xs font-black">Alejandro Henao</p>
                    </div>
                    <div>
                      <p className="text-[9px] font-black text-emerald-400 uppercase">Tesorero Consejo</p>
                      <p className="text-xs font-black">Oscar Iván Estrada</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* 2. GESTIÓN ADMINISTRATIVA Y OPERATIVA */}
              <div className="grid grid-cols-1 gap-8">
                <Card title="Seguridad y Control de Acceso" icon={ShieldCheck} badge="Modernización">
                  <ul className="space-y-4 text-xs font-bold text-slate-600">
                    <li className="flex gap-4 p-3 bg-slate-50 rounded-xl">
                      <ListChecks size={20} className="text-[#0ea5e9] shrink-0" />
                      <div>
                        <span className="text-slate-900 font-black block mb-1">Protocolos de Vigilancia</span>
                        Implementación y socialización de regulación de ingreso de domiciliarios y control estricto de visitantes.
                      </div>
                    </li>
                    <li className="flex gap-4 p-3 bg-slate-50 rounded-xl">
                      <Camera size={20} className="text-[#0ea5e9] shrink-0" />
                      <div>
                        <span className="text-slate-900 font-black block mb-1">Tecnología Biométrica & CCTV</span>
                        Sistema de reconocimiento facial peatonal y actualización CCTV con DVR 4K y monitores industriales.
                      </div>
                    </li>
                    <li className="flex gap-4 p-3 bg-slate-50 rounded-xl">
                      <Zap size={20} className="text-[#0ea5e9] shrink-0" />
                      <div>
                        <span className="text-slate-900 font-black block mb-1">Perímetro de Seguridad</span>
                        Instalación de cerca eléctrica cubriendo 180 metros lineales del edificio.
                      </div>
                    </li>
                    <li className="flex gap-4 p-3 bg-slate-50 rounded-xl">
                      <Eye size={20} className="text-[#0ea5e9] shrink-0" />
                      <div>
                        <span className="text-slate-900 font-black block mb-1">Refuerzo seguridad porteria</span>
                        Aplicación de polarizado en vidrios para protección del guarda y ventana tipo ventanilla bancaria.
                      </div>
                    </li>
                  </ul>
                </Card>
              </div>

              {/* 3. RELACIÓN DE GASTOS Y MANTENIMIENTOS */}
              <div className="space-y-8">
                <div className="bg-[#143d1f] p-8 rounded-[40px] text-white flex flex-col md:flex-row justify-between items-center gap-8 shadow-2xl relative overflow-hidden">
                   <div className="z-10 text-center md:text-left">
                      <h3 className="text-3xl font-black uppercase tracking-tighter mb-2">gestion administrativa</h3>
                      <p className="text-emerald-300 font-bold text-xs uppercase tracking-widest">Seguridad Electrónica, Actualización Tecnológica, Infraestructura Crítica.</p>
                   </div>
                   
                   <div className="absolute top-0 right-0 w-1/2 h-full bg-[#1a4a26] -skew-x-12 translate-x-32 z-0"></div>
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                  {/* Gastos Mensuales Fijos */}
                  <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm flex flex-col h-full">
                    <div className="bg-slate-900 px-6 py-4 flex items-center gap-3">
                      <BarChart3 className="text-[#0ea5e9]" size={20} />
                      <h4 className="text-xs font-black text-white uppercase tracking-widest">Gastos Mensuales Fijos (Operación)</h4>
                    </div>
                    <div className="flex-1 overflow-x-auto">
                      <table className="w-full text-left text-[11px]">
                        <thead className="bg-slate-50 text-slate-400 font-black uppercase tracking-tighter border-b">
                          <tr>
                            <th className="px-6 py-3">Concepto</th>
                            <th className="px-6 py-3">Proveedor</th>
                            <th className="px-6 py-3">Detalle</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 uppercase font-bold text-slate-600">
                          <tr><td className="px-6 py-3 text-slate-900">servicio de vigilancia</td><td className="px-6 py-3">seguridad del sur</td><td className="px-6 py-3 text-[9px]">servicio de vigilancia y porteria.</td></tr>
                          <tr><td className="px-6 py-3 text-slate-900">servicio de aseo</td><td className="px-6 py-3">impecol</td><td className="px-6 py-3 text-[9px]">servicio de aseo y mantenimiento en zonas comunes</td></tr>
                          <tr><td className="px-6 py-3 text-slate-900">Energía Eléctrica</td><td className="px-6 py-3">ENERTOTAL</td><td className="px-6 py-3 text-[9px]">Comunes, Ascensores, Bombas.</td></tr>
                          <tr><td className="px-6 py-3 text-slate-900">Acueducto</td><td className="px-6 py-3">EMPOPASTO</td><td className="px-6 py-3 text-[9px]">Agua potable zonas comunes.</td></tr>
                          <tr><td className="px-6 py-3 text-slate-900">Aseo & Residuos</td><td className="px-6 py-3">EMAS PASTO</td><td className="px-6 py-3 text-[9px]">Recolección certificada.</td></tr>
                          <tr><td className="px-6 py-3 text-slate-900">Ascensores</td><td className="px-6 py-3">MITSUBISHI</td><td className="px-6 py-3 text-[9px]">Preventivo mensual certificado.</td></tr>
                          <tr><td className="px-6 py-3 text-slate-900">Administración</td><td className="px-6 py-3">Ana Lucía Yepez</td><td className="px-6 py-3 text-[9px]">Gestión y Representación Legal.</td></tr>
                          <tr><td className="px-6 py-3 text-slate-900">Contabilidad</td><td className="px-6 py-3">Luz Yaneth Lopez Vela</td><td className="px-6 py-3 text-[9px]">Asesoría Jurídica y Contable.</td></tr>
                          <tr><td className="px-6 py-3 text-slate-900">Impuestos</td><td className="px-6 py-3">DIAN</td><td className="px-6 py-3 text-[9px]">Retenciones Mensuales.</td></tr>
                          <tr><td className="px-6 py-3 text-slate-900">Impuestos</td><td className="px-6 py-3">Municipio de Pasto</td><td className="px-6 py-3 text-[9px]">Retención Industria y Comercio.</td></tr></tbody>
                      </table>
                    </div>
                  </div>

                  <InvestmentTable 
                    title="A. Seguridad Electrónica & CCTV" 
                    total="$16.612.904"
                    icon={Camera}
                    photos={[
                      "/img/FACIAL.jpeg",
                      "/img/FACIAL2.jpeg"
                    ]}
                    data={[
                      { proveedor: "Juan Sebastián Cerón", detalle: "Suministro e instalación sistema facial", valor: "$5.363.300" },
                      { 
                        proveedor: "Juan Sebastián Cerón", 
                        detalle: "Disco duro 4TB y reprogramación", 
                        
                      },
                      { proveedor: "Juan Sebastián Cerón", detalle: "Disco duro 4TB y reprogramación", valor: "$495.000" },
                      { proveedor: "Fernando Rueda", detalle: "Materiales para cableado y CCTV", valor: "$3.551.507" },
                      { proveedor: "Fernando Rueda", detalle: "Mano de obra instalación cámaras", valor: "$2.281.130" },
                    ]}
                  />
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                  <InvestmentTable 
                    title="B. Seguridad Perimetral" 
                    total="$5.473.250"
                    icon={ShieldCheck}
                    photos={[
                      "/img/per1.jpeg",
                      "/img/per2.jpeg",
                      "/img/per3.jpeg",
                      "/img/per4.jpeg"
                    ]}
                    data={[
                      { proveedor: "Edgar Sarmiento", detalle: "Instalación cerca eléctrica", valor: "$5.473.250" }
                     
                    ]}
                  />
                  <InvestmentTable 
                    title="C. Adecuaciones Portería" 
                    total="$3.341.186"
                    icon={Layout}
                    photos={[
                      "/img/por1.jpeg",
                      "/img/por2.jpeg",
                      "/img/por3.jpeg",
                      "/img/por4.jpeg"
                    ]}
                    data={[
                      { proveedor: "Oscar Males", detalle: "Gato hidráulico y ventana aluminio", valor: "$2.071.186" },
                      { proveedor: "Camilo Botina", detalle: "Polarizado vidrios portería", valor: "$580.000" },
                      { proveedor: "Espejos Imperial", detalle: "Compra e instalación vidrio seguridad", valor: "$690.000" },
                    ]}
                  />
                   <InvestmentTable 
                    title="E. Dotación & Cumplimiento" 
                    total="$3.980.292"
                    icon={ClipboardCheck}
                    photos={[
                      "/img/dot1.jpeg",
                      "/img/dot2.jpeg",
                      "/img/dot3.jpeg",
                      "/img/dot4.jpeg",
                      "/img/dot5.jpeg",
                    ]}
                    data={[
                      { proveedor: "Vialambre SAS", detalle: "Compra 4 carros de mercado", valor: "$2.084.252" },
                      { proveedor: "Pedro Nel Salas", detalle: "Tapetes caucho tráfico pesado", valor: "$1.496.040" },
                      { proveedor: "Ricardo Fierro", detalle: "Actualización anual SGSST", valor: "$400.000" },
                      
                    ]}
                  />
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                   <InvestmentTable 
                    title="D. Infraestructura & Maquinaria" 
                    total="$71.156.838"
                    icon={Wrench}
                    photos={[
                      "/img/in1.jpeg",
                      "/img/in2.jpeg",
                      "/img/in3.jpeg",
                      "/img/in4.jpeg",
                      "/img/in5.jpeg",
                      "/img/in6.jpeg",
                      "/img/in7.jpeg",
                      "/img/in8.jpeg",
                      "/img/in9.jpeg",
                      "/img/in10.jpeg",
                      "/img/in11.jpeg",
                      "/img/in12.jpeg",

                    ]}
                    data={[
                      { proveedor: "Casa Andina", detalle: "Impermeabilización Cubierta Principal", valor: "$62.487.425" },
                      { proveedor: "Evolti", detalle: "Levantamiento de paneles solares", valor: "$4.483.000" },
                      { proveedor: "Ferretería Chaves", detalle: "Compra Hidrolavadora Stihl", valor: "$1.530.000" },
                      { proveedor: "Cummins de los Andes", detalle: "Batería Planta Eléctrica", valor: "$1.422.694" },
                      { proveedor: "Oscar Males", detalle: "Mantenimiento 23 puertas shut basuras", valor: "$633.719" },
                      { proveedor: "Agromaquinas del Cauca", detalle: "Cortasetos", valor: "$400.000" },
                      
                    ]}
                  />
                  <InvestmentTable 
                    title="F. Convivencia, Ornato y otros" 
                    total="$4.950.000"
                    icon={Calendar}
                    photos={[
                      "/img/or1.jpeg",
                      "/img/or2.jpeg",
                      "/img/or3.jpeg",
                      "/img/or4.jpeg",
                      "/img/or5.jpeg",
                      "/img/or6.jpeg",
                      "/img/or7.jpeg",
                      "/img/or8.jpeg",
                      "/img/or9.jpeg",
                      "/img/or10.jpeg",
                      "/img/or11.jpeg",
                      "/img/na1.jpeg",
                      "/img/na2.jpeg",
                      "/img/na3.jpeg",
                      "/img/na4.jpeg",

                    ]}
                    data={[
                      { proveedor: "Varios", detalle: "Decoración navideña y evento novena", valor: "$3.750.000" },
                      { proveedor: "Alex Maigual", detalle: "Siembra de pinos y jardinería", valor: "$1.200.000" },
                      { proveedor: "2kfit", detalle: "Mantenimiento de gimnasio", valor: "$1.200.000" },
                    ]}
                  />
                </div>
              </div>

              {/* 4. GESTIÓN DE RIESGOS (POLIZAS) */}
              <div className="space-y-8">
                <SectionHeader title="4. Gestión de Riesgos (Resumen Pólizas)" icon={Shield} agendaIndex={5} agendaStatus={agendaStatus} toggleAgendaItem={toggleAgendaItem} />
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2">
                    <Card title="Póliza de Bienes Comunes (Copropiedad)" icon={ShieldCheck} badge="Estado: Vigente">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100">
                          <p className="text-[10px] font-black text-emerald-800 uppercase mb-1">Vigencia Anual</p>
                          <p className="text-xs font-black text-emerald-950 uppercase">05/12/2025 al 05/12/2026</p>
                        </div>
                        <div className="p-4 bg-sky-50 rounded-2xl border border-sky-100">
                          <p className="text-[10px] font-black text-sky-800 uppercase mb-1">Prima Total Pagada</p>
                          <p className="text-xs font-black text-sky-950 uppercase">$45.326.725 (IVA Incl.)</p>
                        </div>
                      </div>
                      <div className="overflow-x-auto rounded-xl border border-slate-100">
                        <table className="w-full text-left text-[11px] uppercase">
                          <thead className="bg-slate-50 text-slate-400 font-black tracking-tight border-b">
                            <tr><th className="px-4 py-2">Concepto Asegurado</th><th className="px-4 py-2">Valor Asegurado</th><th className="px-4 py-2">Deducible</th></tr>
                          </thead>
                          <tbody className="divide-y divide-slate-50 font-bold text-slate-600">
                            <tr><td className="px-4 py-2 text-slate-950">Edificio (Áreas Comunes)</td><td className="px-4 py-2 font-black">$40.666.627.132</td><td className="px-4 py-2 text-[9px]">Incendio: 5%</td></tr>
                            <tr><td className="px-4 py-2 text-slate-950">Edificio (Bienes Privados)</td><td className="px-4 py-2 font-black">$13.642.437.246</td><td className="px-4 py-2 text-[9px]">Terremoto: 3%</td></tr>
                            <tr><td className="px-4 py-2 text-slate-950">Maquinaria y Equipo</td><td className="px-4 py-2 font-black">$860.000.000</td><td className="px-4 py-2 text-[9px]">Rotura: 10%</td></tr>
                            <tr><td className="px-4 py-2 text-slate-950">Resp. Civil Extracontractual</td><td className="px-4 py-2 font-black">$500.000.000</td><td className="px-4 py-2 text-[9px]">10% (Min 1 SMMLV)</td></tr>
                            <tr className="bg-emerald-50/50"><td className="px-4 py-2 font-black text-[#143d1f]">TOTAL PATRIMONIO PROTEGIDO</td><td className="px-4 py-2 font-black text-[#143d1f]">$57.937.395.734</td><td>-</td></tr>
                          </tbody>
                        </table>
                      </div>
                    </Card>
                  </div>
                  <div className="space-y-6">
                    <Card title="Póliza D&O (Directivos)" icon={Scale} className="bg-slate-900 text-white border-none">
                      <div className="space-y-4">
                        <p className="text-[10px] text-sky-400 font-black uppercase tracking-widest">Responsabilidad Civil</p>
                        <p className="text-3xl font-black text-white leading-none tracking-tighter">$300.000.000</p>
                        <p className="text-[11px] text-slate-400 leading-relaxed font-bold italic">
                          Protege el patrimonio de los miembros del Consejo y Administrador ante reclamaciones por errores u omisiones en su gestión profesional.
                        </p>
                        <div className="pt-4 border-t border-slate-800 flex justify-between">
                          <span className="text-[9px] font-black uppercase text-emerald-400 tracking-widest">Inversión anual:</span>
                          <span className="text-[11px] font-black">$499.800</span>
                        </div>
                      </div>
                    </Card>
                    <div className="p-6 bg-white border border-slate-200 rounded-3xl text-center">
                       <ShieldCheck className="text-emerald-600 mb-2 mx-auto" size={32} />
                       <h4 className="text-[10px] font-black uppercase text-slate-900 mb-1">Cia de Seguros</h4>
                       <p className="text-sm font-black text-[#143d1f] tracking-tight">SEGUROS DEL ESTADO</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* 5. OBRAS Y ACTIVIDADES PENDIENTES */}
              <div className="space-y-8">
                <SectionHeader title="5. Obras & Actividades Pendientes" icon={Settings} agendaIndex={5} agendaStatus={agendaStatus} toggleAgendaItem={toggleAgendaItem} />
                <Card>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs uppercase font-bold">
                      <thead className="bg-slate-50 text-slate-400 font-black border-b">
                        <tr><th className="px-6 py-4">Actividad / Obra</th><th className="px-6 py-4">Estado Actual</th><th className="px-6 py-4">Observación</th></tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 text-slate-700">
                   
                        <tr>
                          <td className="px-6 py-4 text-slate-950">Impermeabilización Fachada</td>
                          <td className="px-6 py-4"><span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-[9px] font-black">PENDIENTE</span></td>
                          <td className="px-6 py-4 text-[10px] font-bold">Requiere aprobación de cuota extraordinaria o financiación.</td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 text-slate-950">Pintura de Paredes en Pisos</td>
                          <td className="px-6 py-4"><span className="bg-sky-100 text-sky-700 px-3 py-1 rounded-full text-[9px] font-black">PROGRAMADO</span></td>
                          <td className="px-6 py-4 text-[10px] font-bold">Para iniciar en el mes de marzo 2026.</td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 text-slate-950">Avalúo Copropiedad</td>
                          <td className="px-6 py-4"><span className="bg-slate-100 text-slate-500 px-3 py-1 rounded-full text-[9px] font-black">PROYECTADO</span></td>
                          <td className="px-6 py-4 text-[10px] font-bold">Recomendación técnica para la proxima vigencia 2026.</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </Card>
              </div>
            </div>
          </div>

          <div className={`${activeSection === 'actaAnterior' ? 'block' : 'hidden'} print:block print:break-after-page uppercase`}>
            <div className="space-y-8 animate-in fade-in text-center">
              <SectionHeader title="Validación Acta Anterior" icon={ShieldCheck} agendaIndex={4} agendaStatus={agendaStatus} toggleAgendaItem={toggleAgendaItem} />
              
              <Card className="py-16 flex flex-col items-center">
                <div className="h-16 w-16 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-600 mb-6">
                  <ClipboardCheck size={32}/>
                </div>
                
                <h4 className="text-xl font-black text-slate-800 uppercase mb-2">Comisión Verificadora Vigencia 2025</h4>
                
                <p className="text-slate-500 font-bold max-w-sm uppercase text-[10px] mb-8 leading-relaxed">
                  Se confirma que el acta de la asamblea anterior fue revisada, validada y firmada por la comisión designada, cumpliendo con los términos legales.
                </p>

                {/* BOTÓN DE ACCESO AL DRIVE */}
                <a 
                  href="https://drive.google.com/file/d/1kwnBP1bVWx57HMMgHdinZf0Wi_5i_LYq/view?usp=sharing" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="mb-8 bg-sky-600 hover:bg-sky-700 text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl transition-all transform hover:scale-105 flex items-center gap-3 print:hidden"
                >
                  <FileText size={18} /> Ver Acta Firmada (Drive) <ExternalLink size={14} />
                </a>

                <div className="p-4 bg-slate-50 rounded-2xl border border-dashed border-slate-200 w-full max-w-xs">
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Estado de la Verificación</p>
                  <span className="text-emerald-600 font-black uppercase text-xs">ACTA 100% VERIFICADA</span>
                </div>
              </Card>
            </div>
          </div>


          <div className={`${activeSection === 'dignatarios' ? 'block' : 'hidden'} print:block`}>
            <div className="space-y-8 animate-in zoom-in-95">
               <SectionHeader 
                  title="Dignatarios y Comisión" 
                  icon={UserPlus} 
                  agendaIndex={2} 
                  // Forzamos al botón a que brille si el punto 2 (Dignatarios) está marcado
                  agendaStatus={agendaStatus} 
                  // Usamos la función que creamos arriba para que haga la doble acción
                  toggleAgendaItem={evacuarDignatarios} 
                />           
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="md:col-span-2 space-y-8 uppercase">
                    <Card title="Mesa Directiva de la Asamblea">
                       <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                          <div className="space-y-2">
                             <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Presidente Electo</label>
                             <input type="text" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl font-bold uppercase focus:border-sky-500" placeholder="Nombre completo..." value={dignatarios.presidente} onChange={(e) => setDignatarios({...dignatarios, presidente: e.target.value})} />
                          </div>
                          <div className="space-y-2">
                             <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Secretario de Asamblea</label>
                             <input type="text" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl font-bold uppercase focus:border-sky-500" placeholder="Nombre completo..." value={dignatarios.secretario} onChange={(e) => setDignatarios({...dignatarios, secretario: e.target.value})} />
                          </div>
                       </div>
                    </Card>
                    <Card title="Comisión Verificadora del Acta (Punto 4)">
                       <textarea className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl font-bold uppercase text-xs h-32 focus:border-sky-500" placeholder="Nombres de los copropietarios designados..." value={dignatarios.comision} onChange={(e) => setDignatarios({...dignatarios, comision: e.target.value})}></textarea>
                    </Card>
                  </div>
                  <div className="bg-sky-50 rounded-3xl p-8 border border-sky-100 flex flex-col justify-center text-center">
                     <BookOpen className="text-sky-700 mb-6 mx-auto" size={40} />
                     <h4 className="font-black text-sky-900 mb-4 uppercase">Marco Jurídico</h4>
                     <p className="text-xs font-bold text-sky-700 leading-relaxed uppercase">Según la Ley 675, los dignatarios dirigen la sesión y la comisión garantiza la veracidad de lo acordado en esta asamblea.</p>
                  </div>
               </div>
            </div>
          </div>

          {/* --- SECCIÓN 7-8: FINANCIERO --- */}
          <div className={`${activeSection === 'financiero' ? 'block' : 'hidden'} print:block print:break-after-page uppercase text-center`}>
            <div className="space-y-8 animate-in fade-in text-center">
              <SectionHeader title="Estados Financieros 2025" icon={BarChart3} agendaIndex={6} agendaStatus={agendaStatus} toggleAgendaItem={toggleAgendaItem} />
              <Card className="py-20 flex flex-col items-center">
                <div className="h-20 w-20 bg-sky-50 rounded-full flex items-center justify-center text-sky-600 mb-6"><FileText size={40}/></div>
                <h4 className="text-2xl font-black text-slate-800 uppercase mb-2 tracking-tighter">Balance General a Dic 31</h4>
                <p className="text-slate-500 font-bold mb-10 max-w-sm uppercase text-xs">Aprobación de la ejecución presupuestal y estados contables auditados.</p>
              </Card>
            </div>
          </div> 

          <div className={`${activeSection === 'presupuesto' ? 'block' : 'hidden'} print:block print:break-after-page uppercase text-center`}>
            <div className="space-y-8 animate-in fade-in text-center">
              {/* Encabezado de sección vinculado al punto 8 del orden del día */}
              <SectionHeader 
                title="Presupuesto 2026" 
                icon={Settings} 
                agendaIndex={7} 
                agendaStatus={agendaStatus} 
                toggleAgendaItem={toggleAgendaItem} 
              />
              
              <Card className="py-20 flex flex-col items-center">
                {/* Icono central descriptivo */}
                <div className="h-20 w-20 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-600 mb-6">
                  <BarChart3 size={40}/>
                </div>
                
                {/* Título y descripción solicitada */}
                <h4 className="text-2xl font-black text-slate-800 uppercase mb-2 tracking-tighter">
                  Proyecto de Presupuesto Año 2026
                </h4>
                
                <p className="text-slate-500 font-bold max-w-sm uppercase text-xs leading-relaxed">
                  Presentación detallada de ingresos, gastos proyectados y fijación de nuevas cuotas de administración para la vigencia 2026.
                </p>
              </Card>
            </div>
          </div>

          <div className={`${activeSection === 'postulaciones' ? 'block' : 'hidden'} print:block print:break-after-page uppercase text-center`}>
            <div className="space-y-8 animate-in slide-in-from-right-10 uppercase">
              <SectionHeader 
                title="Elección de Órganos 2026" 
                icon={UserPlus} 
                // Cambia esto de 9 a 8
                agendaIndex={8} 
                agendaStatus={agendaStatus} 
                // Asegúrate de que llame a la función de doble acción que ya creamos
                toggleAgendaItem={evacuarElecciones} 
              />
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <Card title="Consejo de Administración">
                     <div className="space-y-4">
                        <div className="flex flex-wrap gap-2 min-h-[40px] p-4 bg-sky-50 rounded-2xl border border-sky-100">
                           {postuladosConsejo.map(p => (
                              <span key={p} className="bg-[#0ea5e9] text-white px-3 py-1.5 rounded-full text-[10px] font-black flex items-center gap-2 uppercase tracking-widest">
                                 {p} <button onClick={() => togglePostulacion(p, 'consejo')}><Trash2 size={12}/></button>
                              </span>
                           ))}
                        </div>
                        <div className="max-h-60 overflow-y-auto border border-slate-200 rounded-2xl divide-y text-[10px] font-bold">
                           {asistencia.map(r => (
                              <div key={r.id} className="flex items-center justify-between p-3 hover:bg-slate-50">
                                 <span className="text-slate-700">{r.unidad} - {r.propietario}</span>
                                 <button onClick={() => togglePostulacion(r.propietario, 'consejo')} className={`text-[9px] font-black px-3 py-1.5 rounded-xl uppercase tracking-widest ${postuladosConsejo.includes(r.propietario) ? 'bg-[#143d1f] text-white' : 'bg-slate-100 text-slate-500'}`}>
                                    {postuladosConsejo.includes(r.propietario) ? 'QUITAR' : 'ELEGIR'}
                                 </button>
                              </div>
                           ))}
                        </div>
                     </div>
                  </Card>
                  <Card title="Comité de Convivencia">
                     <div className="space-y-4">
                        <div className="flex flex-wrap gap-2 min-h-[40px] p-4 bg-emerald-50 rounded-2xl border border-emerald-100">
                           {postuladosConvivencia.map(p => (
                              <span key={p} className="bg-emerald-700 text-white px-3 py-1.5 rounded-full text-[10px] font-black flex items-center gap-2 uppercase tracking-widest">
                                 {p} <button onClick={() => togglePostulacion(p, 'convivencia')}><Trash2 size={12}/></button>
                              </span>
                           ))}
                        </div>
                        <div className="max-h-60 overflow-y-auto border border-slate-200 rounded-2xl divide-y text-[10px] font-bold">
                           {asistencia.map(r => (
                              <div key={r.id} className="flex items-center justify-between p-3 hover:bg-slate-50">
                                 <span className="text-slate-700">{r.unidad} - {r.propietario}</span>
                                 <button onClick={() => togglePostulacion(r.propietario, 'convivencia')} className={`text-[9px] font-black px-3 py-1.5 rounded-xl uppercase tracking-widest ${postuladosConvivencia.includes(r.propietario) ? 'bg-[#143d1f] text-white' : 'bg-slate-100 text-slate-500'}`}>
                                    {postuladosConvivencia.includes(r.propietario) ? 'QUITAR' : 'ELEGIR'}
                                 </button>
                              </div>
                           ))}
                        </div>
                     </div>
                  </Card>
               </div>
            </div>
          </div>

          <div className={`${activeSection === 'proposiciones' ? 'block' : 'hidden'} print:block print:break-after-page uppercase text-center`}>
             <div className="space-y-8 animate-in slide-in-from-bottom-10 uppercase">
                <SectionHeader title="Proposiciones y Varios" icon={MessageSquare} agendaIndex={10} agendaStatus={agendaStatus} toggleAgendaItem={toggleAgendaItem} />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                   <Card title="Nuevo Registro" className="md:col-span-1">
                      <div className="space-y-4">
                         <input type="text" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl font-bold uppercase text-xs focus:border-sky-500 outline-none" placeholder="Unidad / Apto" value={tempProp.proponente} onChange={(e) => setTempProp({...tempProp, proponente: e.target.value})} />
                         <textarea className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl font-bold uppercase text-xs h-32 focus:border-sky-500 outline-none" placeholder="Detalle de la proposición..." value={tempProp.texto} onChange={(e) => setTempProp({...tempProp, texto: e.target.value})}></textarea>
                         <button onClick={addProposicion} className="w-full bg-[#0ea5e9] text-white py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest shadow-lg shadow-sky-200">Añadir a la lista</button>
                      </div>
                   </Card>
                   <Card title="Propuestas Registradas" className="md:col-span-2">
                      {proposiciones.length === 0 ? <p className="text-center text-slate-300 py-10 font-black italic opacity-30">No hay registros aún.</p> : 
                      <div className="space-y-3">
                         {proposiciones.map(p => (
                            <div key={p.id} className="p-5 bg-slate-50 border border-slate-200 rounded-2xl flex justify-between items-start group">
                               <div>
                                  <span className="text-[9px] font-black text-sky-800 bg-sky-100 px-2 py-0.5 rounded-md mb-2 inline-block tracking-widest uppercase">Propone: {p.proponente}</span>
                                  <p className="text-sm font-bold text-slate-700 tracking-tight leading-relaxed uppercase">{p.texto}</p>
                               </div>
                               <button onClick={() => setProposiciones(proposiciones.filter(x => x.id !== p.id))} className="text-slate-300 hover:text-red-600 transition-colors"><Trash2 size={16}/></button>
                            </div>
                         ))}
                      </div>}
                   </Card>
                </div>
             </div>
          </div>

          <div className={`${activeSection === 'resumen' ? 'block' : 'hidden'} print:block space-y-8 uppercase tracking-widest text-center`}>
            <div className="space-y-8 animate-in zoom-in-95 uppercase text-center">
              <div className="flex justify-between items-center print:hidden">
                <h2 className="text-3xl font-black text-slate-800 tracking-tighter uppercase">Cierre de Sesión</h2>
                <button onClick={handlePrint} className="bg-[#143d1f] text-white px-8 py-4 rounded-2xl font-black flex items-center gap-3 shadow-2xl hover:bg-[#0d2a15] transition-all text-xs tracking-widest">
                  <Printer size={20} /> Generar Acta Final PDF
                </button>
              </div>

              <Card className="p-12 border-t-8 border-[#0ea5e9] print:shadow-none print:border-none print:p-0">
                {/* CABECERA DE IMPRESIÓN */}
                <div className="hidden print:block text-center mb-10 border-b-2 border-slate-900 pb-8 uppercase">
                  <h1 className="text-3xl font-black mb-1">Acta Asamblea General Ordinaria 2026</h1>
                  <p className="text-xl font-bold text-slate-600 tracking-widest">Edificio Campos de Aragón</p>
                </div>

                {/* DATOS RESUMEN (MAGIA DE CONEXIÓN) */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center uppercase mb-16">
                  <div>
                    <p className="text-[10px] font-black text-slate-400 mb-6 tracking-widest">Resultado Quórum</p>
                    <p className="text-4xl font-black text-[#143d1f] tracking-tighter">{totalQuorum.toFixed(2)}%</p>
                    <p className="text-[10px] font-bold text-emerald-600 mt-2">Decisiones Válidas</p>
                  </div>
                  
                  <div>
                    <p className="text-[10px] font-black text-slate-400 mb-6 tracking-widest">Mesa Directiva</p>
                    <div className="space-y-4 font-black text-sm">
                      <div>
                        <p className="text-[9px] text-slate-400 mb-1">Presidente:</p>
                        <p>{dignatarios.presidente || '________________'}</p>
                      </div>
                      <div>
                        <p className="text-[9px] text-slate-400 mb-1">Secretario:</p>
                        <p>{dignatarios.secretario || '________________'}</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <p className="text-[10px] font-black text-slate-400 mb-6 tracking-widest">Órganos Elegidos</p>
                    <div className="space-y-4 text-[10px] font-black">
                      <p className="text-slate-400 leading-none">Consejo:</p>
                      <div className="flex flex-wrap gap-1 justify-center">
                        {postuladosConsejo.length > 0 ? postuladosConsejo.map(p => (
                          <span key={p} className="bg-sky-50 px-2 py-0.5 rounded border border-sky-100 text-sky-800 uppercase">{p}</span>
                        )) : 'PENDIENTE'}
                      </div>
                      <p className="text-slate-400 leading-none mt-2">Convivencia:</p>
                      <div className="flex flex-wrap gap-1 justify-center">
                        {postuladosConvivencia.length > 0 ? postuladosConvivencia.map(p => (
                          <span key={p} className="bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100 text-emerald-800 uppercase">{p}</span>
                        )) : 'PENDIENTE'}
                      </div>
                    </div>
                  </div>
                </div>

                {/* FIRMAS FINALES */}
                <div className="hidden print:grid grid-cols-2 gap-32 mt-32">
                  <div className="border-t-2 border-slate-900 pt-4 text-center">
                    <p className="text-xs font-black uppercase mb-1">{dignatarios.presidente || '_______________________'}</p>
                    <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Presidente de Asamblea</p>
                  </div>
                  <div className="border-t-2 border-slate-900 pt-4 text-center">
                    <p className="text-xs font-black uppercase mb-1">{dignatarios.secretario || '_______________________'}</p>
                    <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Secretario de Asamblea</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          {/* ESTILO DE IMPRESIÓN COMPILADO (CAMPOS DE ARAGÓN) */}
          <style dangerouslySetInnerHTML={{ __html: `
            @media print {
              /* 1. RESET RADICAL DE POSICIÓN */
              @page {
                margin: 0 !important; /* Eliminamos márgenes de página que empujan el contenido */
                size: auto;
              }

              html, body {
                height: auto !important;
                margin: 0 !important;
                padding: 0 !important;
                background: white !important;
                -webkit-print-color-adjust: exact !important;
                print-color-adjust: exact !important;
              }

              /* Evita que el contenedor flex empuje el contenido a la segunda página */
              .flex.min-h-screen {
                display: block !important;
              }

              main {
                margin-left: 0 !important;
                padding: 0 !important;
                width: 100% !important;
              }

              /* 2. VISIBILIDAD DE TÍTULOS Y SECCIONES */
              .SectionHeader, [class*="SectionHeader"], h2 {
                display: block !important;
                visibility: visible !important;
                background-color: #f1f5f9 !important; /* Gris suave de fondo */
                border-left: 12px solid #143d1f !important; /* Verde oficial del edificio */
                padding: 15px 20px !important;
                margin: 25px 0 15px 0 !important;
                page-break-after: avoid !important;
                break-after: avoid !important;
              }

              /* 3. ETIQUETAS DE ASISTENCIA (Sustituye a los botones) */
              /* Forzamos que el botón azul de PRESENTE se vea */
              .bg-\[\#0ea5e9\], [class*="bg-[#0ea5e9]"] {
                background-color: #0ea5e9 !important;
                color: white !important;
                border-radius: 6px !important;
                padding: 4px 12px !important;
                -webkit-print-color-adjust: exact !important;
                print-color-adjust: exact !important;
              }

              /* Forzamos que el estado AUSENTE se vea */
              .bg-slate-100 {
                background-color: #f1f5f9 !important;
                color: #94a3b8 !important;
                border: 1px solid #e2e8f0 !important;
                border-radius: 6px !important;
                padding: 4px 12px !important;
                -webkit-print-color-adjust: exact !important;
                print-color-adjust: exact !important;
              }

              /* 4. CONTROL DE CORTES DE PÁGINA */
              .Card, section, div, tr, li, table {
                page-break-inside: avoid !important;
                break-inside: avoid !important;
                margin-bottom: 15px !important;
              }

              .print\:break-after-page {
                page-break-before: always !important;
                break-before: always !important;
              }

              /* 5. LIMPIEZA DE INTERFAZ WEB */
              aside, .print\:hidden, nav, .bg-[#143d1f] { 
                /* Ocultamos sidebar y botones de acción web como "Marcar Todos" */
                display: none !important; 
              }

              /* Permitir que el botón de 'PRESENTE/AUSENTE' sea el único botón visible */
              td button {
                display: inline-block !important;
                border: none !important;
                box-shadow: none !important;
                text-transform: uppercase !important;
              }
            }
          `}} />

        </div> {/* CIERRA max-w-6xl */}
      </main> {/* CIERRA main */}
    </div> 
  );
}