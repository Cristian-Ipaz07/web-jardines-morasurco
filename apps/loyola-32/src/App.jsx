import React, { useState, useMemo, useEffect } from 'react';
import { 
  Users, FileText, BarChart3, CheckSquare, MessageSquare, Home, 
  ShieldCheck, ExternalLink, Clock, UserPlus, 
  CheckCircle2, Printer, Trash2, TrendingUp, Settings,
  ClipboardCheck, Camera, Zap, Droplets, Shield,
  BookOpen, Scale, Eye, Activity, Wrench, Calendar, Layout, ListChecks,
  AlertCircle, ChevronRight, Info, ShieldAlert, HeartPulse, Building2,
  Search, DollarSign, PieChart, Landmark, Gavel, 
  ArrowUpRight, Percent, Wallet, HardHat, Cog, Plus, UserCheck
} from 'lucide-react';

// --- CONFIGURACIÓN DE IDENTIDAD VISUAL (COLORES MÁS FUERTES) ---
const COLORS = {
  azulInstitucional: '#1A4B84', // Azul más profundo y saturado
  azulGrisaceo: '#4B6A88',      // Menos pálido
  naranjaTerracota: '#E65100',  // Naranja más vibrante y fuerte
  blancoHueso: '#F8FAFC',       // Fondo más limpio y profesional
  grisOscuro: '#1E293B'         // Gris pizarra más oscuro
};

// --- COMPONENTES DE UI ---

const SectionHeader = ({ title, icon: Icon, agendaIndices = [], agendaStatus, toggleAgendaItem }) => (
  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 border-b-4 pb-6 border-[#1A4B84]/10 print:hidden">
    <div className="flex items-center gap-4">
      <div className="p-4 bg-[#1A4B84] rounded-2xl text-white shadow-xl">
        {Icon && <Icon size={32} />}
      </div>
      <div>
        <h2 className="text-4xl font-black text-[#1A4B84] uppercase tracking-tighter leading-none mb-1">{title}</h2>
        <p className="text-[11px] text-[#4B6A88] font-black uppercase tracking-[0.2em]">
          {agendaIndices.length > 1 
            ? `Puntos ${agendaIndices.map(i => i + 1).join(' y ')} del Orden del día`
            : `Punto ${agendaIndices[0] + 1} del Orden del día`}
        </p>
      </div>
    </div>
    <button 
      onClick={() => toggleAgendaItem(agendaIndices)}
      className={`flex items-center gap-3 px-8 py-4 rounded-2xl font-black text-[12px] uppercase tracking-widest transition-all border-2 shadow-md ${
        agendaIndices.every(idx => agendaStatus[idx])
        ? 'bg-[#E65100] border-[#E65100] text-white' 
        : 'bg-white border-[#1A4B84]/20 text-[#1A4B84] hover:bg-[#1A4B84] hover:text-white'
      }`}
    >
      <CheckCircle2 size={20} />
      {agendaIndices.every(idx => agendaStatus[idx]) ? 'PUNTO EVACUADO' : 'MARCAR COMO EVACUADO'}
    </button>
  </div>
);

const Card = ({ children, title, className = "", icon: Icon, badge, highlight = false }) => (
  <div className={`bg-white rounded-[24px] shadow-lg border-2 ${highlight ? 'border-[#E65100] ring-4 ring-[#E65100]/10' : 'border-[#1A4B84]/5'} p-8 ${className}`}>
    <div className="flex justify-between items-start mb-6">
      {title && <h3 className="text-[13px] font-black text-[#1E293B] flex items-center gap-3 uppercase tracking-[0.15em]">
        <div className={`w-2 h-7 ${highlight ? 'bg-[#E65100]' : 'bg-[#1A4B84]'} rounded-full shrink-0`}></div>
        {Icon && <Icon size={22} className="text-[#1A4B84]" />}
        {title}
      </h3>}
      {badge && <span className="bg-[#1A4B84] text-white text-[10px] font-black px-4 py-2 rounded-xl uppercase tracking-widest shadow-sm">{badge}</span>}
    </div>
    {children}
  </div>
);

const ManagementTable = ({ title, headers, data, icon: Icon, total }) => (
  <div className="bg-white rounded-[24px] border-2 border-[#1A4B84]/10 overflow-hidden shadow-md flex flex-col h-full mb-8">
    <div className="bg-[#1A4B84] px-8 py-5 flex justify-between items-center">
      <div className="flex items-center gap-4">
        {Icon && <Icon className="text-white" size={22} />}
        <h4 className="text-[12px] font-black text-white uppercase tracking-[0.2em]">{title}</h4>
      </div>
      {total && <div className="bg-white text-[#1A4B84] px-4 py-1.5 rounded-full text-[11px] font-black">{total}</div>}
    </div>
    <div className="overflow-x-auto">
      <table className="w-full text-left text-[11px]">
        <thead className="bg-[#F8FAFC] text-[#4B6A88] font-black uppercase tracking-widest border-b-2">
          <tr>
            {headers.map((h, i) => <th key={i} className="px-8 py-4">{h}</th>)}
          </tr>
        </thead>
        <tbody className="divide-y divide-[#1A4B84]/5 uppercase font-bold text-[#1E293B]">
          {data.map((row, idx) => (
            <tr key={idx} className="hover:bg-[#1A4B84]/5 transition-colors">
              {Object.values(row).map((val, i) => (
                <td key={i} className="px-8 py-4">{val}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

// --- DATA ---

const ORDEN_DIA = [
  "Registro de firmas y verificación del quórum.",
  "Lectura y aprobación del orden del día.",
  "Elección de dignatarios de la Asamblea (Presidente y Secretario).",
  "Elección del comité de verificación de la presente acta.",
  "Validación de la comisión verificadora del Acta Anterior.",
  "Presentación de informes Consejo y Administración.",
  "Presentación y aprobación de Estados Financieros a diciembre 31 de 2025.",
  "Presentación y aprobación del proyecto de presupuesto de ingresos y gastos para el año 2026 - Definición de cuotas de sostenimiento.",
  "Elección del consejo de administración",
  "Elección Comité de convivencia.",
  "Proposiciones y varios"
];

const COEFICIENTES_DATA = [
  { id: 1, unidad: '201', propietario: 'HECTOR FERNANDO LASSO', coeficiente: 2.58 },
  { id: 2, unidad: '202', propietario: 'DIANA NARVAEZ', coeficiente: 2.61 },
  { id: 3, unidad: '203', propietario: 'ALCIRA ENRIQUEZ', coeficiente: 2.81 },
  { id: 4, unidad: '301', propietario: 'JAIME JAIRO YELA CORDOBA', coeficiente: 2.54 },
  { id: 5, unidad: '302', propietario: 'CARLOTA GALVEZ DE MOSQUERA', coeficiente: 2.42 },
  { id: 6, unidad: '303', propietario: 'ALVARO IVAN MUÑOZ', coeficiente: 1.56 },
  { id: 7, unidad: '304', propietario: 'MATILDE RIASCOS MELO', coeficiente: 2.35 },
  { id: 8, unidad: '305', propietario: 'ANUAR ASSAD', coeficiente: 2.75 },
  { id: 9, unidad: '401', propietario: 'LEONEL SANCHEZ ZAMBRANO', coeficiente: 2.60 },
  { id: 10, unidad: '402', propietario: 'ADRIANA SANCHEZ HERRRERA', coeficiente: 2.37 },
  { id: 11, unidad: '403', propietario: 'AURA MARIA SANCHEZ', coeficiente: 1.51 },
  { id: 12, unidad: '404', propietario: 'HELEN JOHANA MARTINEZ', coeficiente: 2.37 },
  { id: 13, unidad: '405', propietario: 'MARIA CHECA PORTILLA', coeficiente: 2.71 },
  { id: 14, unidad: '501', propietario: 'FANNY ROBBY', coeficiente: 2.57 },
  { id: 15, unidad: '502', propietario: 'DIEGOS BASTIDAS', coeficiente: 2.39 },
  { id: 16, unidad: '503', propietario: 'KARINA RODRIGUEZ ESPINOSA', coeficiente: 1.55 },
  { id: 17, unidad: '504', propietario: 'MERCEDES ROSERO', coeficiente: 2.37 },
  { id: 18, unidad: '505', propietario: 'JAIME MORENO', coeficiente: 2.70 },
  { id: 19, unidad: '601', propietario: 'LUIS CHAMORRO', coeficiente: 4.13 },
  { id: 20, unidad: '603', propietario: 'NANCY ARGOTE', coeficiente: 1.57 },
  { id: 21, unidad: '604', propietario: 'VICTOR PATIÑO', coeficiente: 2.20 },
  { id: 22, unidad: '605', propietario: 'DIEGO BEDOYA - LORENA GUZMAN', coeficiente: 2.22 },
  { id: 23, unidad: '701', propietario: 'MONICA ORTIZ TIMARAN', coeficiente: 1.70 },
  { id: 24, unidad: '702', propietario: 'ROSA ESCOBAR MORA', coeficiente: 2.39 },
  { id: 25, unidad: '703', propietario: 'MIGUEL ANGEL ACOSTA', coeficiente: 1.50 },
  { id: 26, unidad: '704', propietario: 'MARIA CHECA PORTILLA', coeficiente: 2.15 },
  { id: 27, unidad: '705', propietario: 'MARCO ALAVA- MARY ORDOÑEZ', coeficiente: 2.22 },
  { id: 28, unidad: '801', propietario: 'PAOLA ARTURO RODRIGUEZ', coeficiente: 1.71 },
  { id: 29, unidad: '802', propietario: 'CARLOS RODRIGUEZ-SANDRA CORAL', coeficiente: 2.44 },
  { id: 30, unidad: '803', propietario: 'ELIZABETH PANTOJA', coeficiente: 1.52 },
  { id: 31, unidad: '804', propietario: 'RUBEN DARIO SUAREZ', coeficiente: 2.18 },
  { id: 32, unidad: '805', propietario: 'MARIA HELENA ERASO', coeficiente: 2.22 },
  { id: 33, unidad: '901', propietario: 'ROSA MARIA BAQUERO', coeficiente: 1.75 },
  { id: 34, unidad: '902', propietario: 'AIDA ARCINIEGAS FAINI', coeficiente: 2.38 },
  { id: 35, unidad: '903', propietario: 'IVON CADENA', coeficiente: 1.59 },
  { id: 36, unidad: '904', propietario: 'JHORLAN VALLEJO', coeficiente: 2.17 },
  { id: 37, unidad: '905', propietario: 'CAROLINA MUÑOZ CEBALLOS', coeficiente: 2.22 },
  { id: 38, unidad: '1001', propietario: 'MELVIN LEE ORTIZ GUERRERO', coeficiente: 1.74 },
  { id: 39, unidad: '1002', propietario: 'ALEX ROSERO', coeficiente: 2.40 },
  { id: 40, unidad: '1003', propietario: 'OSCAR GUERRERO MEDINA', coeficiente: 1.54 },
  { id: 41, unidad: '1004', propietario: 'FANNY ARCINIEGAS FAINI', coeficiente: 2.20 },
  { id: 42, unidad: '1005', propietario: 'MARIA ELENA DELGADO', coeficiente: 2.21 },
  { id: 43, unidad: '1101', propietario: 'GERMAN CAICEDO GARCIA', coeficiente: 3.43 },
  { id: 44, unidad: '1102', propietario: 'NICOLAS ARTEAGA', coeficiente: 3.46 },
];

export default function App() {
  const [activeSection, setActiveSection] = useState('inicio');
  const [searchTerm, setSearchTerm] = useState('');

  const InvestmentTable = ({ title, total, icon: Icon, photos = [], data = [] }) => {
      const [showGallery, setShowGallery] = React.useState(false);

      return (
        <div className="bg-white rounded-[40px] border-2 border-[#1A4B84]/10 overflow-hidden shadow-xl flex flex-col uppercase font-sans mb-10">
          {/* CABECERA PREMIUM LOYOLA */}
          <div className="bg-[#1A4B84] px-10 py-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b-4 border-[#E65100]">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white/10 rounded-2xl shadow-inner">
                {Icon && <Icon className="text-[#E65100]" size={28} />}
              </div>
              <h4 className="text-sm font-black text-white uppercase tracking-[0.2em]">{title}</h4>
            </div>
            <div className="flex items-center gap-6">
              <div className="bg-[#E65100] px-8 py-2 rounded-full shadow-lg border-2 border-white/20">
                <p className="text-white font-black text-xs uppercase tracking-widest">{total}</p>
              </div>
              
              {/* BOTÓN DE GALERÍA ESTILO LOYOLA */}
              {photos.length > 0 && (
                <button 
                  onClick={() => setShowGallery(true)}
                  className="group flex flex-col items-center gap-1 transition-transform hover:scale-110 active:scale-95"
                >
                  <div className="p-3 bg-white/10 rounded-2xl border border-white/20 group-hover:bg-[#E65100] group-hover:text-white text-[#E65100] transition-all shadow-xl">
                    <Camera size={22} />
                  </div>
                  <span className="text-[8px] font-black text-white/60 group-hover:text-[#E65100] uppercase tracking-tighter">Evidencias</span>
                </button>
              )}
            </div>
          </div>

          {/* TABLA DE DATOS */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-[11px]">
              <thead className="bg-[#F8FAFC] text-[#4B6A88] font-black uppercase tracking-tighter border-b-2">
                <tr>
                  <th className="px-10 py-5">PROVEEDOR</th>
                  <th className="px-10 py-5">DETALLE DEL TRABAJO</th>
                  <th className="px-10 py-5 text-center">ESTADO</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1A4B84]/5 font-bold text-slate-600">
                {data.map((row, i) => (
                  <tr key={i} className="hover:bg-[#1A4B84]/5 transition-colors uppercase">
                    <td className="px-10 py-5 text-[#1A4B84] font-black">{row.proveedor}</td>
                    <td className="px-10 py-5 italic text-slate-500 lowercase first-letter:uppercase">{row.detalle}</td>
                    <td className="px-10 py-5 text-center">
                      <span className="bg-[#E65100]/10 text-[#E65100] px-4 py-1.5 rounded-lg border border-[#E65100]/20 font-black">
                          {row.valor}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* MODAL DE GALERÍA (OVERLAY) */}
          {showGallery && (
            <div className="fixed inset-0 z-[100] bg-[#1A4B84]/95 backdrop-blur-xl flex flex-col items-center justify-center p-10 animate-in fade-in duration-300">
              <button 
                onClick={() => setShowGallery(false)} 
                className="absolute top-10 right-10 text-white bg-[#E65100] px-8 py-4 rounded-full font-black text-xs shadow-2xl hover:bg-[#c44500] transition-all flex items-center gap-3 border-2 border-white/20"
              >
                CERRAR EVIDENCIAS <Trash2 size={18} />
              </button>
              
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-7xl">
                {photos.map((ph, i) => (
                  <div key={i} className="aspect-video rounded-[32px] overflow-hidden border-4 border-white/10 shadow-2xl group relative bg-white/5">
                    <img 
                      src={ph} 
                      alt={`Evidencia ${i + 1}`} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                      onError={(e) => { e.target.src = "https://via.placeholder.com/400x225?text=Imagen+No+Encontrada"; }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1A4B84]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                      <p className="text-white font-black text-[10px] uppercase tracking-widest">LOYOLA 32 - GESTIÓN 2025</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      );
  };

  const marcarAsistenciaTotal = () => {
    setAsistencia(prev => prev.map(a => ({ ...a, presente: true })));
  };
  
  // Persistencia segura de estados
  const [asistencia, setAsistencia] = useState(() => {
    try {
      const saved = localStorage.getItem('asistencia_loyola_v2');
      return saved ? JSON.parse(saved) : COEFICIENTES_DATA.map(c => ({ ...c, presente: false }));
    } catch (e) {
      return COEFICIENTES_DATA.map(c => ({ ...c, presente: false }));
    }
  });
  
  const [agendaStatus, setAgendaStatus] = useState(() => {
    try {
      const saved = localStorage.getItem('agenda_loyola_v2');
      return saved ? JSON.parse(saved) : new Array(ORDEN_DIA.length).fill(false);
    } catch (e) {
      return new Array(ORDEN_DIA.length).fill(false);
    }
  });

  const [dignatarios, setDignatarios] = useState(() => {
    try {
      const saved = localStorage.getItem('dignatarios_loyola_v2');
      return saved ? JSON.parse(saved) : { presidente: '', secretario: '', comision: '' };
    } catch (e) {
      return { presidente: '', secretario: '', comision: '' };
    }
  });

  const [proposiciones, setProposiciones] = useState(() => {
    try {
      const saved = localStorage.getItem('proposiciones_loyola_v2');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  const [actaAnterior, setActaAnterior] = useState({ aprobada: false, observaciones: '' });

  const [tempProp, setTempProp] = useState({ proponente: '', texto: '' });
  const [postuladosConsejo, setPostuladosConsejo] = useState([]);
  const [postuladosConvivencia, setPostuladosConvivencia] = useState([]);

  useEffect(() => {
    try {
      localStorage.setItem('asistencia_loyola_v2', JSON.stringify(asistencia));
      localStorage.setItem('agenda_loyola_v2', JSON.stringify(agendaStatus));
      localStorage.setItem('dignatarios_loyola_v2', JSON.stringify(dignatarios));
      localStorage.setItem('proposiciones_loyola_v2', JSON.stringify(proposiciones));
    } catch (e) {}
  }, [asistencia, agendaStatus, dignatarios, proposiciones]);

  const totalQuorum = useMemo(() => {
    const total = asistencia.filter(a => a.presente).reduce((acc, curr) => acc + curr.coeficiente, 0);
    return parseFloat(total.toFixed(2));
  }, [asistencia]);

  const progress = useMemo(() => (agendaStatus.filter(i => i).length / ORDEN_DIA.length) * 100, [agendaStatus]);

  const filteredAsistencia = useMemo(() => {
    return asistencia.filter(a => 
      a.unidad.toLowerCase().includes(searchTerm.toLowerCase()) || 
      a.propietario.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [asistencia, searchTerm]);

  const toggleAsistencia = (id) => {
    setAsistencia(prev => prev.map(a => a.id === id ? { ...a, presente: !a.presente } : a));
  };

  const toggleAgendaItem = (indices) => {
    setAgendaStatus(prev => {
      const nuevo = [...prev];
      const anyUnfinished = indices.some(idx => !nuevo[idx]);
      indices.forEach(idx => { nuevo[idx] = anyUnfinished; });
      return nuevo;
    });
  };

  const addProposicion = () => {
    if (tempProp.proponente && tempProp.texto) {
      setProposiciones([...proposiciones, { ...tempProp, id: Date.now() }]);
      setTempProp({ proponente: '', texto: '' });
    }
  };

  const deleteProposicion = (id) => {
    setProposiciones(proposiciones.filter(p => p.id !== id));
  };

  const togglePostulacion = (nombre, tipo) => {
    if (tipo === 'consejo') {
      setPostuladosConsejo(prev => prev.includes(nombre) ? prev.filter(p => p !== nombre) : [...prev, nombre]);
    } else {
      setPostuladosConvivencia(prev => prev.includes(nombre) ? prev.filter(p => p !== nombre) : [...prev, nombre]);
    }
  };

  const handlePrint = () => window.print();

  return (
    <div className="flex min-h-screen bg-[#F8FAFC] font-sans text-[#1E293B] print:bg-white overflow-x-hidden">
      
      {/* SIDEBAR */}
      <aside className="w-80 bg-[#1A4B84] text-white fixed h-full flex flex-col shadow-2xl z-20 print:hidden">
        <div className="p-10 text-center bg-[#1A4B84] border-b-2 border-white/5">
          <div className="flex justify-center mb-6">
             <div className="w-20 h-20 bg-white/10 border-4 border-[#E65100] flex items-center justify-center rounded-[28px] shadow-lg">
                <Building2 className="text-[#E65100]" size={40} />
             </div>
          </div>
          <h1 className="text-white font-black text-3xl tracking-tighter leading-none uppercase mb-2">
            LOYOLA <span className="text-[#E65100]">32</span>
          </h1>
          <p className="text-[10px] font-black text-white/50 uppercase tracking-[0.4em]">Propiedad Horizontal</p>
        </div>
        
        <nav className="flex-1 overflow-y-auto p-6 space-y-2">
          {[
            { id: 'inicio', label: 'Inicio', icon: Home },
            { id: 'quorum', label: '1. Quórum', icon: Users },
            { id: 'orden', label: '2. Orden del Día', icon: ListChecks },
            { id: 'dignatarios', label: '3-4. Dignatarios', icon: UserPlus },
            { id: 'acta2025', label: '5. Acta Anterior', icon: FileText },
            { id: 'gestion', label: '6. Informe Gestión', icon: TrendingUp },
            { id: 'financiero', label: '7. Financiero', icon: BarChart3 },
            { id: 'presupuesto', label: '8. Presupuesto', icon: PieChart },
            { id: 'elecciones', label: '9-10. Elecciones', icon: Gavel },
            { id: 'proposiciones', label: '11. Proposiciones', icon: MessageSquare },
            { id: 'final', label: 'Finalizar Acta', icon: Printer },
          ].map(item => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl transition-all text-[11px] font-black uppercase tracking-widest ${
                activeSection === item.id 
                ? 'bg-[#E65100] text-white shadow-xl translate-x-2' 
                : 'text-white/60 hover:bg-white/5 hover:text-white'
              }`}
            >
              <item.icon size={18} />
              {item.label}
            </button>
          ))}
        </nav>
        <div className="p-8 border-t border-white/5 text-[10px] font-black text-center opacity-40 uppercase tracking-[0.3em]">
            Pasto, Nariño <br/> Vigencia 2026
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="ml-80 flex-1 h-screen overflow-y-auto pb-20 print:ml-0 bg-[#F8FAFC]">
        
        {/* HEADER */}
        <header className="sticky top-0 z-[100] w-full bg-white/95 backdrop-blur-md border-b-2 border-[#1A4B84]/10 px-12 py-6 flex justify-between items-center shadow-md print:hidden">
          <div className="flex gap-16">
            <div>
              <span className="text-[11px] font-black text-[#4B6A88] uppercase tracking-widest">Quórum Actual</span>
              <div className="flex items-center gap-4 mt-1">
                <span className={`text-4xl font-black tracking-tighter ${totalQuorum >= 50.1 ? 'text-[#1A4B84]' : 'text-[#1E293B]'}`}>
                  {totalQuorum.toFixed(2)}%
                </span>
                <div className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm ${totalQuorum >= 50.1 ? 'bg-[#1A4B84] text-white' : 'bg-slate-100 text-slate-400'}`}>
                  {totalQuorum >= 50.1 ? 'VALIDADO' : 'PENDIENTE'}
                </div>
              </div>
            </div>
            
            <div className="border-l-2 pl-12 border-[#1A4B84]/10">
              <span className="text-[11px] font-black text-[#4B6A88] uppercase tracking-widest">Progreso de Agenda</span>
              <div className="flex items-center gap-4 mt-2">
                 <div className="h-3 w-48 bg-slate-100 rounded-full overflow-hidden border border-[#1A4B84]/5 shadow-inner">
                    <div className="h-full bg-[#E65100] transition-all duration-1000 ease-out" style={{width: `${progress}%`}}></div>
                 </div>
                 <span className="text-sm font-black text-[#E65100]">{Math.round(progress)}%</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-5 text-right">
            <div>
               <p className="text-[14px] font-black text-[#1E293B] uppercase tracking-tight">E.M. LOYOLA 32</p>
               <p className="text-[11px] text-[#1A4B84] font-black uppercase tracking-widest">Ana Lucia Yepez | Admin.</p>
            </div>
            <div className="h-14 w-14 bg-[#1A4B84] rounded-2xl flex items-center justify-center text-white shadow-xl">
               <ShieldCheck size={28} />
            </div>
          </div>
        </header>

        <div className="max-w-6xl mx-auto p-12 space-y-16 print:p-0">
          
          {/* SECCIÓN INICIO */}
          {activeSection === 'inicio' && (
            <div className="space-y-12 animate-in fade-in duration-700">
               <div className="bg-[#1A4B84] rounded-[56px] p-24 text-white relative overflow-hidden shadow-2xl border-b-[16px] border-[#E65100]">
                  <div className="relative z-10 text-center">
                     <span className="bg-[#E65100] text-white text-[11px] font-black uppercase px-10 py-4 rounded-full mb-12 inline-block tracking-[0.5em] shadow-xl">Sesión Ordinaria</span>
                     <h1 className="text-8xl font-black mb-6 leading-none tracking-tighter uppercase">LOYOLA <span className="text-[#E65100] italic">32</span></h1>
                     <div className="w-32 h-2 bg-[#E65100] mx-auto mb-10 rounded-full"></div>
                     <p className="text-white/80 max-w-2xl text-2xl font-bold leading-relaxed mx-auto italic uppercase tracking-[0.1em]">Asamblea General de Copropietarios<br/>Año de Gestión 2026</p>
                  </div>
                  <div className="absolute top-0 right-0 w-1/2 h-full bg-white/5 -skew-x-12 translate-x-32"></div>
                  <div className="absolute bottom-0 left-0 w-1/4 h-1/2 bg-[#E65100]/10 blur-[120px] rounded-full"></div>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center uppercase">
                  <Card title="Copropiedad" highlight>
                    <div className="space-y-4 pt-2">
                       <p className="text-[11px] font-black text-[#4B6A88] uppercase tracking-widest leading-none">UBICACIÓN PRINCIPAL:</p>
                       <p className="text-lg font-black text-[#1E293B]">San Juan de Pasto, Nariño</p>
                    </div>
                  </Card>
                  <Card title="Convocatoria">
                    <div className="space-y-3 pt-2 text-[#1E293B]">
                       <p className="text-lg font-black">19 de Febrero 2026</p>
                       <p className="text-[11px] font-black text-[#4B6A88] opacity-80">INSTALACIÓN: 7:00 PM</p>
                    </div>
                  </Card>
                  <Card className="bg-[#1A4B84] text-white border-none flex flex-col items-center justify-center shadow-2xl">
                    <p className="text-6xl font-black text-[#E65100] mb-2 leading-none tracking-tighter">{asistencia.length}</p>
                    <p className="text-[11px] font-black uppercase tracking-[0.3em] text-white/60 leading-none">Unidades Privadas</p>
                  </Card>
               </div>
            </div>
          )}

          {/* SECCIÓN 1: QUORUM */}
          {activeSection === 'quorum' && (
            <div className="space-y-10 animate-in slide-in-from-right-10">
              <SectionHeader title="1. Registro y Quórum" icon={Users} agendaIndices={[0]} agendaStatus={agendaStatus} toggleAgendaItem={toggleAgendaItem} />
              <div className="flex justify-between items-end mb-4 print:hidden">
                <div className="text-left">
                  <h3 className="text-[#1A4B84] font-black text-lg uppercase tracking-tighter">Listado de Unidades</h3>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Haga clic en el switch para registrar ingreso</p>
                </div>

                <button 
                  onClick={() => {
                    const todosPresentes = asistencia.every(a => a.presente);
                    setAsistencia(prev => prev.map(a => ({ ...a, presente: !todosPresentes })));
                  }}
                  className={`flex items-center gap-3 px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all shadow-md hover:scale-105 active:scale-95 border-b-4 ${
                    asistencia.every(a => a.presente)
                    ? 'bg-slate-100 text-[#E65100] border-slate-200' 
                    : 'bg-[#1A4B84] text-white border-black/20'
                  }`}
                >
                  {asistencia.every(a => a.presente) ? (
                    <> <Trash2 size={16} /> Quitar Todo </>
                  ) : (
                    <> <UserCheck size={16} /> Marcar Total </>
                  )}
                </button>
              </div>

              <div className="space-y-8 print:hidden">
                {/* FILA DE BÚSQUEDA Y ESTADÍSTICAS - Diseño más abierto */}
                <div className="flex flex-col md:flex-row gap-8 items-center justify-between">
                  <div className="relative group w-full max-w-2xl">
                    <Search className="absolute left-8 top-1/2 -translate-y-1/2 text-[#4B6A88] group-focus-within:text-[#1A4B84] transition-colors" size={24} />
                    <input 
                      type="text" 
                      placeholder="BUSCAR POR UNIDAD O NOMBRE DE PROPIETARIO..." 
                      className="w-full pl-20 pr-10 py-7 bg-white border-b-4 border-slate-200 focus:border-[#1A4B84] font-black text-[14px] uppercase tracking-widest outline-none transition-all"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <div className="flex items-center gap-6 bg-white px-10 py-6 rounded-[32px] shadow-sm border border-slate-100">
                    <div className="text-right">
                        <p className="text-[10px] font-black text-[#4B6A88] uppercase tracking-widest">PRESENTES EN SALA</p>
                        <p className="text-3xl font-black text-[#1A4B84]">{asistencia.filter(a => a.presente).length} / {asistencia.length}</p>
                    </div>
                    <Users className="text-[#1A4B84]" size={40} />
                  </div>
                </div>

                {/* TABLA ESTILO ABIERTO (Sin el cuadrado encerrado) */}
                <div className="w-full bg-white rounded-[40px] shadow-sm border border-slate-100 overflow-hidden">
                  <table className="w-full text-left border-collapse">
                    <thead className="bg-[#F8FAFC] text-[#4B6A88] font-black uppercase tracking-widest text-[11px] border-b-2 border-slate-100">
                      <tr>
                        <th className="px-12 py-8">UNIDAD</th>
                        <th className="px-12 py-8">PROPIETARIO (EDITABLE)</th>
                        <th className="px-12 py-8 text-center">COEF (%)</th>
                        <th className="px-12 py-8 text-center">ASISTENCIA</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50 uppercase">
                      {filteredAsistencia.map((item) => (
                        <tr key={item.id} className={`${item.presente ? 'bg-[#1A4B84]/5' : ''} hover:bg-slate-50 transition-colors`}>
                          <td className="px-12 py-8 font-black text-[#1A4B84] text-xl">{item.unidad}</td>
                          <td className="px-12 py-8 font-black text-[#1E293B] text-sm tracking-tight">{item.propietario}</td>
                          <td className="px-12 py-8 font-black text-[#4B6A88] text-center text-xl">{item.coeficiente.toFixed(2)}%</td>
                          <td className="px-12 py-8 text-center">
                            {/* Switch de asistencia similar al ejemplo profesional */}
                            <button 
                              onClick={() => toggleAsistencia(item.id)} 
                              className={`relative inline-flex h-8 w-16 items-center rounded-full transition-colors focus:outline-none ${
                                item.presente ? 'bg-[#E65100]' : 'bg-slate-200'
                              }`}
                            >
                              <span className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                                item.presente ? 'translate-x-9' : 'translate-x-1'
                              }`} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* SECCIÓN 2: ORDEN DEL DÍA */}
          {activeSection === 'orden' && (
            <div className="space-y-10 animate-in fade-in">
              <SectionHeader title="2. Orden del Día" icon={ListChecks} agendaIndices={[1]} agendaStatus={agendaStatus} toggleAgendaItem={toggleAgendaItem} />
              <Card highlight title="Puntos del Orden del Día">
                <div className="space-y-4 pt-6">
                  {ORDEN_DIA.map((punto, idx) => (
                    <div key={idx} className={`p-6 rounded-[28px] border-2 flex items-center gap-6 transition-all ${agendaStatus[idx] ? 'border-[#E65100] bg-[#E65100]/5' : 'border-[#1A4B84]/10 bg-white shadow-sm'}`}>
                      <div className={`h-10 w-10 rounded-xl flex items-center justify-center font-black text-sm shrink-0 shadow-lg ${agendaStatus[idx] ? 'bg-[#E65100] text-white' : 'bg-[#1A4B84] text-white'}`}>
                        {idx + 1}
                      </div>
                      <p className={`text-[12px] font-black uppercase tracking-tight leading-relaxed ${agendaStatus[idx] ? 'text-[#E65100]' : 'text-[#1E293B]'}`}>
                        {punto}
                      </p>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          )}

          {/* SECCIÓN 3-4: DIGNATARIOS */}
          {activeSection === 'dignatarios' && (
            <div className="space-y-10 animate-in zoom-in-95">
               <SectionHeader title="3-4. Dignatarios" icon={UserPlus} agendaIndices={[2, 3]} agendaStatus={agendaStatus} toggleAgendaItem={toggleAgendaItem} />
               <div className="grid grid-cols-1 md:grid-cols-3 gap-10 uppercase">
                  <div className="md:col-span-2 space-y-10">
                    <Card title="Elección de Mesa Directiva" icon={ShieldCheck} highlight>
                       <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 pt-4">
                          <div className="space-y-4">
                             <label className="text-[11px] font-black text-[#4B6A88] uppercase tracking-widest block">Presidente de Asamblea</label>
                             <input type="text" className="w-full p-6 bg-slate-50 border-2 border-[#1A4B84]/10 rounded-2xl font-black uppercase text-xs focus:border-[#1A4B84] outline-none shadow-inner" placeholder="NOMBRE COMPLETO..." value={dignatarios.presidente} onChange={(e) => setDignatarios({...dignatarios, presidente: e.target.value})} />
                          </div>
                          <div className="space-y-4">
                             <label className="text-[11px] font-black text-[#4B6A88] uppercase tracking-widest block">Secretario(a)</label>
                             <input type="text" className="w-full p-6 bg-slate-50 border-2 border-[#1A4B84]/10 rounded-2xl font-black uppercase text-xs focus:border-[#1A4B84] outline-none shadow-inner" placeholder="NOMBRE COMPLETO..." value={dignatarios.secretario} onChange={(e) => setDignatarios({...dignatarios, secretario: e.target.value})} />
                          </div>
                       </div>
                    </Card>
                    <Card title="Comisión Verificadora del Acta" icon={ClipboardCheck}>
                       <div className="space-y-4 pt-4">
                          <label className="text-[11px] font-black text-[#4B6A88] uppercase tracking-widest block">Miembros Designados para Firma</label>
                          <textarea className="w-full p-6 bg-slate-50 border-2 border-[#1A4B84]/10 rounded-2xl font-black uppercase text-[11px] h-40 focus:border-[#1A4B84] outline-none leading-loose shadow-inner" placeholder="INGRESE NOMBRES Y UNIDADES DE LOS 2 O 3 MIEMBROS ELECTOS..." value={dignatarios.comision} onChange={(e) => setDignatarios({...dignatarios, comision: e.target.value})}></textarea>
                       </div>
                    </Card>
                  </div>
                  <div className="bg-[#1A4B84] rounded-[48px] p-12 text-white flex flex-col justify-center text-center shadow-2xl border-b-[12px] border-[#E65100]">
                     <Gavel className="text-[#E65100] mb-10 mx-auto" size={56} />
                     <h4 className="font-black text-2xl mb-6 uppercase tracking-tighter">Autoridad</h4>
                     <p className="text-[11px] font-black text-white/60 leading-loose uppercase tracking-[0.2em]">
                        La asamblea es soberana en sus decisiones bajo el marco de la Ley 675. Los dignatarios aseguran el orden y transparencia del proceso.
                     </p>
                  </div>
               </div>
            </div>
          )}

          {/* SECCIÓN 5: ACTA ANTERIOR (NUEVO CONTENIDO) */}
          {activeSection === 'acta2025' && (
            <div className="space-y-10 animate-in fade-in">
              <SectionHeader title="5. Validación Acta Anterior" icon={FileText} agendaIndices={[4]} agendaStatus={agendaStatus} toggleAgendaItem={toggleAgendaItem} />
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 uppercase">
                <div className="lg:col-span-2 space-y-10">
                  <Card title="Comisión Verificadora 2025" icon={UserCheck} highlight>
                    <div className="p-6 bg-slate-50 rounded-[28px] border-2 border-[#1A4B84]/10 mb-8">
                      <p className="text-[11px] font-black text-[#4B6A88] mb-4">MIEMBROS QUE VERIFICARON EL ACTA:</p>
                      <ul className="space-y-3 font-black text-sm text-[#1A4B84] mb-6">
                          <li className="flex items-center gap-3">
                            <CheckCircle2 size={16}/> Mary Ordoñez (Unidad 705)
                          </li>
                          <li className="flex items-center gap-3">
                            <CheckCircle2 size={16}/> Aida Arciniegas (Unidad 902)
                          </li>
                          <li className="flex items-center gap-3">
                            <CheckCircle2 size={16}/> Mónica Agreda (Unidad 701)
                          </li>   
                      </ul>

                      {/* BOTÓN DRIVE - ESTILO LOYOLA */}
                      <a 
                        href="https://drive.google.com/file/d/1160wQhWKkAnhkuXLXXXK8ANPvKwtsgwr/view?usp=sharing" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-3 px-6 py-4 bg-[#1A4B84] hover:bg-[#E65100] text-white rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all shadow-lg hover:scale-105 active:scale-95"
                      >
                        <ExternalLink size={18} />
                        Ver Documento Acta 2025 (PDF)
                      </a>
                    </div>

                    <div className="space-y-4">
                      <label className="text-[11px] font-black text-[#4B6A88] uppercase tracking-widest">Observaciones de la Asamblea sobre el Acta</label>
                      <textarea 
                          className="w-full p-6 bg-white border-2 border-[#1A4B84]/10 rounded-2xl font-black uppercase text-[11px] h-32 focus:border-[#1A4B84] outline-none"
                          placeholder="INGRESAR OBSERVACIONES O AJUSTES SOLICITADOS..."
                          value={actaAnterior.observaciones}
                          onChange={(e) => setActaAnterior({...actaAnterior, observaciones: e.target.value})}
                      />
                    </div>
                  </Card>
                </div>
                
                <div className="space-y-10">
                  <div className={`p-12 rounded-[48px] border-b-[12px] flex flex-col items-center justify-center text-center shadow-2xl transition-all ${actaAnterior.aprobada ? 'bg-[#1A4B84] border-[#E65100] text-white' : 'bg-white border-[#1A4B84]/10 text-[#1A4B84]'}`}>
                    <CheckSquare size={56} className={`${actaAnterior.aprobada ? 'text-[#E65100]' : 'text-[#4B6A88]'} mb-8`} />
                    <h4 className="font-black text-xl mb-6 uppercase">Estado de Acta</h4>
                    <button 
                      onClick={() => setActaAnterior({...actaAnterior, aprobada: !actaAnterior.aprobada})}
                      className={`px-8 py-4 rounded-2xl font-black text-[11px] tracking-widest uppercase transition-all shadow-xl ${actaAnterior.aprobada ? 'bg-[#E65100] text-white' : 'bg-[#1A4B84] text-white'}`}
                    >
                      {actaAnterior.aprobada ? 'ACTA APROBADA' : 'APROBAR ACTA'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'gestion' && (
            <div className="space-y-16 animate-in slide-in-from-bottom-10 uppercase">
              <SectionHeader title="6. Informe Integral de Gestión 2025" icon={TrendingUp} agendaIndices={[5]} agendaStatus={agendaStatus} toggleAgendaItem={toggleAgendaItem} />

              {/* 1. PRESENTACIÓN EJECUTIVA (LOS 3 PILARES) */}
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                <div className="lg:col-span-3">
                  <Card title="1. Resumen de Ejecución Administrativa" icon={Activity} highlight>
                    {/* Aumento a text-lg para lectura clara */}
                    <p className="text-lg font-bold text-slate-700 leading-relaxed mb-8 uppercase tracking-tight">
                      Durante el periodo 2025, la administración ejecutó acciones clave enfocadas en la <span className="text-[#1A4B84] font-black underline decoration-[#E65100] decoration-4">optimización de servicios verticales</span>, la recuperación de la <span className="text-[#1A4B84] font-black underline decoration-[#E65100] decoration-4">infraestructura hidráulica</span> y el fortalecimiento de la seguridad perimetral y vehicular.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="p-6 bg-slate-50 rounded-3xl border-2 border-[#1A4B84]/20 shadow-sm">
                        <Wrench className="text-[#E65100] mb-4" size={32} />
                        <p className="text-[12px] font-black text-[#1A4B84] uppercase tracking-[0.2em] mb-2">Pilar A</p>
                        <p className="text-sm font-black text-slate-900">Mantenimiento Locativo</p>
                      </div>
                      <div className="p-6 bg-slate-50 rounded-3xl border-2 border-[#1A4B84]/20 shadow-sm">
                        <ShieldCheck className="text-[#E65100] mb-4" size={32} />
                        <p className="text-[12px] font-black text-[#1A4B84] uppercase tracking-[0.2em] mb-2">Pilar B</p>
                        <p className="text-sm font-black text-slate-900">Seguridad y Convivencia</p>
                      </div>
                      <div className="p-6 bg-slate-50 rounded-3xl border-2 border-[#1A4B84]/20 shadow-sm">
                        <Scale className="text-[#E65100] mb-4" size={32} />
                        <p className="text-[12px] font-black text-[#1A4B84] uppercase tracking-[0.2em] mb-2">Pilar C</p>
                        <p className="text-sm font-black text-slate-900">Gestión Legal y Cartera</p>
                      </div>
                    </div>
                  </Card>
                </div>
                
                {/* Cuadro lateral de Administración */}
                <div className="bg-[#1A4B84] rounded-[40px] p-10 text-white flex flex-col justify-center shadow-2xl border-r-[12px] border-[#E65100]">
                  <Building2 size={48} className="text-[#E65100] mb-6" />
                  <h4 className="text-xs font-black uppercase mb-4 tracking-[0.3em] text-white/70">Administración</h4>
                  <div className="space-y-6">
                    <div>
                      <p className="text-[10px] font-black text-[#E65100] uppercase mb-1">Representante Legal</p>
                      <p className="text-xl font-black tracking-tight leading-tight">Ana Lucía Yépez</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-[#E65100] uppercase mb-1">Contabilidad</p>
                      <p className="text-xl font-black tracking-tight leading-tight">Andrea E. Delgado</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* 2. GASTOS MENSUALES FIJOS (TABLA) */}
              <div className="bg-white rounded-[40px] border-4 border-[#1A4B84]/10 overflow-hidden shadow-2xl flex flex-col">
                <div className="bg-[#1A4B84] px-10 py-7 flex items-center gap-6">
                  <BarChart3 className="text-[#E65100]" size={28} />
                  <h4 className="text-lg font-black text-white uppercase tracking-[0.2em]">Operación Mensual Recurrente 2025</h4>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead className="bg-[#F8FAFC] text-[#4B6A88] font-black uppercase tracking-widest border-b-4 border-slate-100">
                      <tr>
                        <th className="px-10 py-6 text-sm">Entidad / Proveedor</th>
                        <th className="px-10 py-6 text-sm">Concepto del Servicio</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y-2 divide-slate-100 uppercase font-bold text-slate-700">
                      {[
                        { p: "Seguridad del Sur Ltda", c: "Vigilancia 24/7 y Monitoreo" },
                        { p: "Escoba Mágica SAS", c: "Personal de Aseo y Zonas Comunes" },
                        { p: "Ana Lucía Yépez", c: "Honorarios Administración" },
                        { p: "Andrea Elizabeth Delgado", c: "Contabilidad" },
                        { p: "Ascensur Elevadores", c: "Mantenimiento Técnico Vertical" },
                        { p: "Cedenar / Empopasto / Emas", c: "Servicios Públicos (Promedios)" }
                      ].map((row, i) => (
                        <tr key={i} className="hover:bg-[#1A4B84]/5 transition-colors">
                          <td className="px-10 py-6 text-[#1A4B84] font-black text-[14px]">{row.p}</td>
                          <td className="px-10 py-6 text-[14px]">{row.c}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* 3. DETALLE DE INVERSIONES POR SISTEMA */}
              <div className="grid grid-cols-1 gap-12">
                <InvestmentTable title="1. Sistema de Accesos Vehiculares" total="Operativo" icon={Zap} photos={["/img/VE.jpeg"]}
                  data={[
                    { proveedor: "Manuel Quelal", detalle: "Suministro e instalación Brazo Accessmatic (Sustitución maquinaria)", valor: "EJECUTADO" },
                    { proveedor: "Manuel Quelal", detalle: "Programación control de acceso y sensores parqueadero inferior", valor: "EJECUTADO" },
                    { proveedor: "Manuel Quelal", detalle: "Mantenimiento puerta vehicular y fotoceldas", valor: "AL DÍA" }
                  ]} />

                <InvestmentTable title="2. Sistema Hidráulico y Redes" total="Reparado" icon={Droplets} photos={["/img/HI1.jpeg", "/img/HI2.jpeg", "/img/HI3.jpeg"]}
                  data={[
                    { proveedor: "Jhon Franco Cuatin", detalle: "Reparación equipos presión constante y bombas", valor: "EJECUTADO" },
                    { proveedor: "Hydroflow", detalle: "Suministro e instalación equipo Hydroflow", valor: "EJECUTADO" },
                    { proveedor: "Jhon Franco Cuatin", detalle: "Búsqueda y reparación de fuga de malos olores (Apto 1003)", valor: "SOLUCIONADO" }
                  ]} />

                <InvestmentTable title="3. Reparaciones Locativas y Estructurales" total="Mejorado" icon={Wrench} photos={["/img/rep1.jpeg", "/img/rep2.jpeg", "/img/rep3.jpeg", "/img/rep4.jpeg"]}
                  data={[
                    { proveedor: "Andina de Materiales", detalle: "Compra de impermeabilizante para terraza y cubiertas", valor: "EJECUTADO" },
                    { proveedor: "Ariel Iván Pinto", detalle: "Reparación cielo raso salón comunal y pintura Apto 1102", valor: "EJECUTADO" },
                    { proveedor: "Jose Jojoa", detalle: "Compra de manila para mantenimiento general", valor: "SUMINISTRADO" }
                  ]} />

                <InvestmentTable title="4. Planta Eléctrica y Energía" total="Vigente" icon={Zap} photos={["/img/PE1.jpeg", "/img/PE2.jpeg", "/img/PE3.jpeg"]}
                  data={[
                    { proveedor: "Cummins de los Andes", detalle: "Mantenimiento preventivo Planta Eléctrica (Anual)", valor: "3 SESIONES" },
                    { proveedor: "Albeiro Bastidas", detalle: "Suministro e instalación batería Varta Black 4D", valor: "NUEVO" },
                    { proveedor: "Luis Libardo Yanguatin", detalle: "Configuración y revisión de transferencia de emergencia", valor: "AL DÍA" }
                  ]} />

                <InvestmentTable title="5. Ascensores (Reparaciones Adicionales)" total="En Ajuste" icon={ArrowUpRight} photos={["/img/AS.jpeg"]}
                  data={[
                    { proveedor: "Ascensur Elevadores", detalle: "Cambio de proveedor tras inconformidad con Greenergy", valor: "NUEVO CONTRATO" },
                    { proveedor: "Ascensur SAS", detalle: "Ajuste excéntricas, tensión de guayas y renivelación", valor: "50% AVANCE" },
                    { proveedor: "Greenergy", detalle: "Compra de zapatas de cabina e inductor tipo tabaco", valor: "INSTALADO" }
                  ]} />

                <InvestmentTable title="6. Seguridad Electrónica y Operativos" total="Monitoreado" icon={Camera} photos={[]}    
                  data={[
                    { proveedor: "Hernando Tarapuez", detalle: "Revisión de cámaras CCTV, adaptadores y video balum", valor: "EJECUTADO" },
                    { proveedor: "Paola Alejandra Coral", detalle: "Servicio de desratización y control de roedores", valor: "CERTIFICADO" },
                    { proveedor: "Jose Francisco Jojoa", detalle: "Instalación y revisión de series navideñas", valor: "TEMPORADA" }
                  ]} />
              </div>

              {/* 4. GESTIÓN DE RIESGOS (PÓLIZAS) */}
              <div className="space-y-12">
                <div className="bg-[#E65100] p-12 rounded-[50px] text-white flex flex-col md:flex-row justify-between items-center gap-8 shadow-2xl relative overflow-hidden">
                  <div className="z-10 text-center md:text-left">
                    <h3 className="text-4xl font-black uppercase tracking-tighter mb-2">Protección Patrimonial</h3>
                    <p className="text-white/80 font-bold text-sm uppercase tracking-[0.2em]">Relación de Pólizas Vigentes - Seguros del Estado.</p>
                  </div>
                  <ShieldCheck size={80} className="text-white opacity-20 absolute right-12" />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                  <div className="lg:col-span-2">
                    <Card title="Póliza Todo Riesgo Daños Materiales" icon={ShieldCheck} badge="Vigente 2026">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                        <div className="p-6 bg-slate-50 rounded-3xl border-2 border-[#1A4B84]/10 shadow-inner">
                          <p className="text-[11px] font-black text-[#4B6A88] uppercase mb-1 tracking-widest">Fin Vigencia</p>
                          <p className="text-sm font-black text-[#1A4B84]">24 DE AGOSTO DE 2026</p>
                        </div>
                        <div className="p-6 bg-slate-50 rounded-3xl border-2 border-[#1A4B84]/10 shadow-inner">
                          <p className="text-[11px] font-black text-[#4B6A88] uppercase mb-1 tracking-widest">Prima Total</p>
                          <p className="text-sm font-black text-[#E65100]">$6.663.423 (IVA INCL.)</p>
                        </div>
                      </div>
                      <div className="overflow-x-auto rounded-[32px] border-4 border-slate-50">
                        <table className="w-full text-left uppercase">
                          <thead className="bg-slate-50 text-[#4B6A88] font-black tracking-widest border-b">
                            <tr><th className="px-6 py-4 text-[12px]">Amparo</th><th className="px-6 py-4 text-[12px]">Valor Asegurado</th></tr>
                          </thead>
                          <tbody className="divide-y divide-slate-50 font-bold text-slate-700">
                            <tr><td className="px-6 py-4 text-[13px]">Bienes Comunes</td><td className="px-6 py-4 font-black text-[13px] text-[#1A4B84]">$5.000.000.000</td></tr>
                            <tr><td className="px-6 py-4 text-[13px]">Bienes Privados</td><td className="px-6 py-4 font-black text-[13px] text-[#1A4B84]">$1.300.000.000</td></tr>
                            <tr><td className="px-6 py-4 text-[13px]">Maquinaria y Equipo</td><td className="px-6 py-4 font-black text-[13px] text-[#1A4B84]">$620.000.000</td></tr>
                            <tr><td className="px-6 py-4 text-[13px]">Resp. Civil Extracontractual</td><td className="px-6 py-4 font-black text-[13px] text-[#1A4B84]">$300.000.000</td></tr>
                          </tbody>
                        </table>
                      </div>
                    </Card>
                  </div>

                  <div className="space-y-8">
                    <Card title="Póliza D&O (Directivos)" icon={Scale} highlight>
                      <div className="space-y-8 relative z-10">
                        <div>
                          <p className="text-[11px] text-[#E65100] font-black uppercase tracking-[0.3em] mb-2">Errores y Omisiones</p>
                          <p className="text-6xl font-black text-[#1A4B84] leading-none tracking-tighter">$100.000.000</p>
                        </div>
                        <p className="text-sm text-slate-600 leading-relaxed font-bold italic border-l-4 border-[#E65100] pl-6">
                          Protección patrimonial para directores y administrador ante reclamaciones por errores u omisiones en su gestión.
                        </p>
                        <div className="pt-8 border-t-2 border-slate-100 flex justify-between items-end">
                          <div>
                            <span className="text-[10px] font-black uppercase text-[#E65100] block mb-1 tracking-widest">Inversión Anual:</span>
                            <span className="text-2xl font-black text-[#1A4B84] tracking-tight">$166.600</span>
                          </div>
                          <div className="text-right">
                            <span className="bg-emerald-600 text-white px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg">ACTIVA</span>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </div>
                </div>
              </div>
            </div>
          )}
          {/* SECCIÓN 7: FINANCIERO */}
          {activeSection === 'financiero' && (
            <div className="space-y-10 animate-in fade-in">
              <SectionHeader title="7. Estados Financieros" icon={BarChart3} agendaIndices={[6]} agendaStatus={agendaStatus} toggleAgendaItem={toggleAgendaItem} />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 uppercase">
                 <Card title="Estado de Resultados 2025" icon={Activity} highlight>
                    <div className="flex flex-col items-center justify-center py-16 text-center">
                       <BarChart3 size={64} className="text-[#1A4B84] mb-8" />
                       <p className="text-lg font-black text-[#1E293B] mb-4 tracking-tighter">Dictamen Contable Sin Salvedades</p>
                       <p className="text-[11px] font-black text-[#4B6A88] tracking-[0.2em]">Exposición detallada de ingresos vs egresos ejecutados.</p>
                    </div>
                 </Card>
                 <Card title="Análisis de Cartera" icon={DollarSign}>
                    <div className="p-10 bg-[#1A4B84]/5 rounded-[40px] border-2 border-[#1A4B84]/10 text-center flex flex-col items-center justify-center h-full">
                       <p className="text-4xl font-black text-[#1A4B84] mb-4 leading-none">RECAUDO EFECTIVO</p>
                       <p className="text-[10px] font-black text-[#4B6A88] uppercase tracking-[0.3em] leading-loose">Optimización de cartera morosa mediante acuerdos de pago y gestión persuasiva.</p>
                       <div className="mt-8 bg-[#1A4B84] text-white px-8 py-3 rounded-full font-black text-xs shadow-lg">CARTERA SANA</div>
                    </div>
                 </Card>
              </div>
            </div>
          )}

          {/* SECCIÓN 8: PRESUPUESTO */}
          {activeSection === 'presupuesto' && (
            <div className="space-y-10 animate-in slide-in-from-bottom-10">
              <SectionHeader title="8. Proyecto Presupuesto 2026" icon={PieChart} agendaIndices={[7]} agendaStatus={agendaStatus} toggleAgendaItem={toggleAgendaItem} />
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 uppercase">
                 <div className="lg:col-span-2">
                    <Card title="Propuesta Incremento 2026" icon={Landmark} highlight>
                       <p className="text-[12px] font-black text-[#4B6A88] leading-loose uppercase mb-10">
                          Ajuste necesario para cubrir el incremento del SMMLV en servicios de vigilancia y aseo, garantizando el fondo de imprevistos y mantenimiento de ascensores.
                       </p>
                       <div className="grid grid-cols-2 gap-8">
                          <div className="p-8 bg-slate-50 rounded-[32px] border-2 border-[#1A4B84]/10 text-center shadow-inner">
                             <p className="text-[10px] font-black text-[#4B6A88] mb-2 uppercase tracking-widest">PROYECCIÓN IPC</p>
                             <p className="text-2xl font-black text-[#1A4B84]">+ IPC 2025</p>
                          </div>
                          <div className="p-8 bg-slate-50 rounded-[32px] border-2 border-[#1A4B84]/10 text-center shadow-inner">
                             <p className="text-[10px] font-black text-[#4B6A88] mb-2 uppercase tracking-widest">CUOTA ESTIMADA</p>
                             <p className="text-2xl font-black text-[#E65100]">A DEBATE</p>
                          </div>
                       </div>
                    </Card>
                 </div>
                 <div className="bg-[#E65100] rounded-[56px] p-12 text-white flex flex-col justify-center items-center text-center shadow-2xl border-b-[16px] border-black/10">
                    <Wallet size={64} className="mb-10 shadow-lg" />
                    <h4 className="font-black text-2xl mb-6 uppercase tracking-tighter">Sostenibilidad</h4>
                    <p className="text-[11px] font-black opacity-70 uppercase tracking-[0.2em] leading-loose">
                       Un edificio bien presupuestado es un edificio valorizado y seguro para sus residentes.
                    </p>
                 </div>
              </div>
            </div>
          )}

          {/* SECCIÓN 9-10: ELECCIONES 2026 */}
          {activeSection === 'elecciones' && (
            <div className="space-y-12 animate-in zoom-in-95 uppercase">
              <SectionHeader 
                title="9-10. Elecciones de Órganos de Administración" 
                icon={Gavel} 
                agendaIndices={[8, 9]} 
                agendaStatus={agendaStatus} 
                toggleAgendaItem={toggleAgendaItem} 
              />
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                
                {/* PUNTO 9: CONSEJO DE ADMINISTRACIÓN */}
                <Card title="9. Elección Consejo de Administración" icon={Users} highlight>
                  <div className="space-y-8 pt-2">
                    {/* Visualización de Postulados */}
                    <div className="flex flex-wrap gap-3 min-h-[60px] p-6 bg-slate-50 rounded-[32px] border-2 border-[#1A4B84]/10 shadow-inner">
                      {postuladosConsejo.length === 0 && (
                        <p className="text-[9px] text-slate-400 font-black uppercase tracking-widest">No hay candidatos seleccionados para el Consejo</p>
                      )}
                      {postuladosConsejo.map(p => (
                        <span key={p} className="bg-[#1A4B84] text-white px-5 py-2.5 rounded-2xl text-[10px] font-black flex items-center gap-3 uppercase tracking-widest shadow-xl border-b-4 border-black/20">
                          {p} 
                          <button onClick={() => togglePostulacion(p, 'consejo')}>
                            <Trash2 size={14} className="hover:text-[#E65100] transition-colors"/>
                          </button>
                        </span>
                      ))}
                    </div>
                    
                    {/* Listado para Selección */}
                    <div className="max-h-80 overflow-y-auto border-2 border-[#1A4B84]/10 rounded-[32px] divide-y divide-slate-100 text-[10px] font-bold bg-white">
                      {asistencia.map(r => (
                        <div key={r.id} className="flex items-center justify-between p-5 hover:bg-slate-50 transition-colors">
                          <span className="text-[#1E293B] font-black">{r.unidad} - {r.propietario}</span>
                          <button 
                            onClick={() => togglePostulacion(r.propietario, 'consejo')} 
                            className={`px-5 py-2.5 rounded-xl uppercase tracking-widest text-[9px] font-black transition-all ${
                              postuladosConsejo.includes(r.propietario) 
                              ? 'bg-[#E65100] text-white shadow-md' 
                              : 'bg-slate-100 text-slate-400'
                            }`}
                          >
                            {postuladosConsejo.includes(r.propietario) ? 'QUITAR' : 'POSTULAR'}
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>

                {/* PUNTO 10: COMITÉ DE CONVIVENCIA */}
                <Card title="10. Elección Comité de Convivencia" icon={HeartPulse}>
                  <div className="space-y-8 pt-2">
                    {/* Visualización de Postulados */}
                    <div className="flex flex-wrap gap-3 min-h-[60px] p-6 bg-slate-50 rounded-[32px] border-2 border-[#1A4B84]/10 shadow-inner">
                      {postuladosConvivencia.length === 0 && (
                        <p className="text-[9px] text-slate-400 font-black uppercase tracking-widest">No hay candidatos seleccionados para el Comité</p>
                      )}
                      {postuladosConvivencia.map(p => (
                        <span key={p} className="bg-[#E65100] text-white px-5 py-2.5 rounded-2xl text-[10px] font-black flex items-center gap-3 uppercase tracking-widest shadow-lg border-b-4 border-black/20">
                          {p} 
                          <button onClick={() => togglePostulacion(p, 'convivencia')}>
                            <Trash2 size={14} className="hover:text-red-200"/>
                          </button>
                        </span>
                      ))}
                    </div>

                    {/* Listado para Selección */}
                    <div className="max-h-80 overflow-y-auto border-2 border-[#1A4B84]/10 rounded-[32px] divide-y divide-slate-100 text-[10px] font-bold bg-white">
                      {asistencia.map(r => (
                        <div key={r.id} className="flex items-center justify-between p-5 hover:bg-slate-50 transition-colors">
                          <span className="text-slate-700 font-black">{r.unidad} - {r.propietario}</span>
                          <button 
                            onClick={() => togglePostulacion(r.propietario, 'convivencia')} 
                            className={`px-5 py-2.5 rounded-xl uppercase font-black text-[9px] transition-all ${
                              postuladosConvivencia.includes(r.propietario) 
                              ? 'bg-[#1A4B84] text-white' 
                              : 'bg-slate-100 text-slate-400'
                            }`}
                          >
                            {postuladosConvivencia.includes(r.propietario) ? 'QUITAR' : 'POSTULAR'}
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>

              </div>
            </div>
          )}
          {/* SECCIÓN 11: PROPOSICIONES (NUEVO CONTENIDO) */}
          {activeSection === 'proposiciones' && (
            <div className="space-y-10 animate-in slide-in-from-right-10 uppercase">
              <SectionHeader title="11. Proposiciones y Varios" icon={MessageSquare} agendaIndices={[10]} agendaStatus={agendaStatus} toggleAgendaItem={toggleAgendaItem} />
              
              <Card title="Nueva Proposición" highlight>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pt-4">
                  <div className="md:col-span-1 space-y-3">
                    <label className="text-[11px] font-black text-[#4B6A88] tracking-widest">UNIDAD / PROPIETARIO</label>
                    <input 
                      type="text" 
                      className="w-full p-4 bg-slate-50 border-2 border-[#1A4B84]/10 rounded-2xl font-black uppercase text-xs outline-none focus:border-[#1A4B84]"
                      value={tempProp.proponente}
                      onChange={(e) => setTempProp({...tempProp, proponente: e.target.value})}
                      placeholder="EJ: 201"
                    />
                  </div>
                  <div className="md:col-span-2 space-y-3">
                    <label className="text-[11px] font-black text-[#4B6A88] tracking-widest">DESCRIPCIÓN DE LA PROPOSICIÓN</label>
                    <input 
                      type="text" 
                      className="w-full p-4 bg-slate-50 border-2 border-[#1A4B84]/10 rounded-2xl font-black uppercase text-xs outline-none focus:border-[#1A4B84]"
                      value={tempProp.texto}
                      onChange={(e) => setTempProp({...tempProp, texto: e.target.value})}
                      placeholder="EJ: MEJORAR LA ILUMINACIÓN EXTERNA..."
                    />
                  </div>
                  <div className="flex items-end">
                    <button 
                      onClick={addProposicion}
                      className="w-full bg-[#E65100] text-white py-4 rounded-2xl font-black text-xs shadow-lg hover:scale-105 transition-all flex items-center justify-center gap-3"
                    >
                      <Plus size={18} /> AGREGAR AL ACTA
                    </button>
                  </div>
                </div>
              </Card>

              <div className="space-y-6">
                <h4 className="text-[12px] font-black text-[#1A4B84] tracking-[0.3em] px-4 border-l-8 border-[#E65100]">REGISTRO DE PROPOSICIONES</h4>
                <div className="grid grid-cols-1 gap-6">
                  {proposiciones.map((prop) => (
                    <div key={prop.id} className="bg-white p-8 rounded-[32px] border-2 border-[#1A4B84]/5 shadow-lg flex flex-col md:flex-row justify-between items-start md:items-center gap-6 group hover:border-[#E65100]/20 transition-all">
                       <div className="flex items-start gap-6">
                          <div className="h-14 w-14 bg-[#1A4B84] text-white rounded-2xl flex items-center justify-center font-black text-lg shadow-xl shrink-0 group-hover:bg-[#E65100] transition-colors">
                             {prop.proponente.substring(0,3)}
                          </div>
                          <div>
                             <p className="text-[10px] font-black text-[#E65100] mb-1 tracking-widest">PROPONENTE: {prop.proponente}</p>
                             <p className="text-sm font-black text-[#1E293B] leading-relaxed uppercase">{prop.texto}</p>
                          </div>
                       </div>
                       <button onClick={() => deleteProposicion(prop.id)} className="bg-red-50 text-red-500 p-4 rounded-xl hover:bg-red-500 hover:text-white transition-all shadow-sm">
                          <Trash2 size={20} />
                       </button>
                    </div>
                  ))}
                  {proposiciones.length === 0 && (
                    <div className="py-24 bg-white rounded-[40px] border-4 border-dashed border-[#1A4B84]/10 text-center flex flex-col items-center justify-center">
                       <MessageSquare size={48} className="text-[#1A4B84]/20 mb-6" />
                       <p className="text-[11px] font-black text-[#4B6A88] uppercase tracking-widest">No se han registrado proposiciones aún en esta sesión.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* SECCIÓN FINAL */}
          {activeSection === 'final' && (
            <div className="space-y-16 animate-in zoom-in-95 text-center uppercase">
              <div className="flex justify-between items-center print:hidden bg-[#1A4B84] p-10 rounded-[40px] shadow-2xl">
                <div className="text-left text-white">
                  <h2 className="text-3xl font-black tracking-tighter mb-2">CIERRE DE ASAMBLEA 2026</h2>
                  <p className="text-white/60 font-black text-[10px] tracking-[0.3em]">GENERE EL ACTA OFICIAL PARA IMPRESIÓN Y FIRMA</p>
                </div>
                <button onClick={handlePrint} className="bg-[#E65100] text-white px-12 py-6 rounded-[24px] font-black flex items-center gap-5 shadow-2xl hover:scale-110 transition-all text-xs tracking-[0.2em] border-4 border-white/10">
                  <Printer size={24} /> IMPRIMIR ACTA FINAL
                </button>
              </div>

              <Card className="p-24 border-t-[24px] border-[#1A4B84] print:shadow-none print:border-none print:p-0 bg-white shadow-2xl">
                <div className="hidden print:block text-center mb-20 border-b-8 border-[#1A4B84] pb-10">
                  <h1 className="text-5xl font-black mb-4 uppercase tracking-tighter">ACTA ASAMBLEA ORDINARIA 2026</h1>
                  <p className="text-2xl font-black text-[#E65100] tracking-[0.4em] uppercase">LOYOLA 32 PROPIEDAD HORIZONTAL</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-20 mb-32">
                  <div className="p-12 bg-slate-50 rounded-[56px] border-2 border-[#1A4B84]/10 shadow-inner flex flex-col items-center justify-center">
                    <p className="text-[11px] font-black text-[#4B6A88] mb-10 tracking-[0.3em] uppercase leading-none">Quórum de Cierre</p>
                    <p className="text-7xl font-black text-[#1A4B84] tracking-tighter leading-none">{totalQuorum.toFixed(2)}%</p>
                    <div className="mt-8 bg-[#1A4B84] text-white px-8 py-2 rounded-full text-[10px] font-black tracking-widest">VERIFICADO</div>
                  </div>
                  
                  <div className="space-y-10 py-6 text-left">
                    <p className="text-[11px] font-black text-[#4B6A88] tracking-[0.3em] uppercase leading-none mb-12">Mesa Directiva Electa</p>
                    <div className="text-[12px] font-black space-y-10">
                       <div className="border-b-4 border-[#1A4B84]/10 pb-4">
                          <p className="text-[9px] text-[#E65100] mb-2 font-black tracking-widest">PRESIDENTE DE ASAMBLEA:</p>
                          <p className="text-lg text-[#1E293B]">{dignatarios.presidente || '___________________________'}</p>
                       </div>
                       <div className="border-b-4 border-[#1A4B84]/10 pb-4">
                          <p className="text-[9px] text-[#E65100] mb-2 font-black tracking-widest">SECRETARIO(A) DE ASAMBLEA:</p>
                          <p className="text-lg text-[#1E293B]">{dignatarios.secretario || '___________________________'}</p>
                       </div>
                    </div>
                  </div>

                  <div className="p-12 bg-[#1A4B84] rounded-[56px] text-white flex flex-col items-center justify-center shadow-2xl border-b-[16px] border-[#E65100]">
                    <ShieldCheck size={72} className="text-[#E65100] mb-10" />
                    <p className="text-[12px] font-black uppercase tracking-[0.4em] leading-none opacity-60">Sesión Finalizada</p>
                    <p className="text-xl font-black mt-4">PASTO, 2026</p>
                  </div>
                </div>

                <div className="hidden print:grid grid-cols-2 gap-64 mt-64 mb-32">
                  <div className="border-t-4 border-[#1E293B] pt-8 text-center">
                    <p className="text-[11px] font-black text-[#1E293B] uppercase tracking-[0.3em] leading-loose">PRESIDENTE<br/>DIGNATARIO ELECTO</p>
                  </div>
                  <div className="border-t-4 border-[#1E293B] pt-8 text-center">
                    <p className="text-[11px] font-black text-[#1E293B] uppercase tracking-[0.3em] leading-loose">SECRETARIO(A)<br/>DIGNATARIO ELECTO</p>
                  </div>
                </div>

                <div className="hidden print:block mt-20 text-left opacity-30 text-[9px] font-black border-t pt-4">
                   SISTEMA DE GESTIÓN ASAMBLEARIA LOYOLA 32 - FIRMA DIGITAL V1.0
                </div>
              </Card>
            </div>
          )}

        </div>
      </main>

      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&display=swap');
        
        body { font-family: 'Inter', sans-serif; }

        @media print {
          @page { margin: 1cm; size: auto; }
          html, body { background: white !important; font-size: 10pt !important; color: black !important; }
          aside, header, .print\\:hidden, button, input, textarea { display: none !important; }
          main { margin-left: 0 !important; width: 100% !important; padding: 0 !important; }
          .max-w-6xl { max-width: 100% !important; width: 100% !important; margin: 0 !important; }
          .Card { break-inside: avoid !important; border: 2px solid #000 !important; border-radius: 20px !important; box-shadow: none !important; }
          table { border-collapse: collapse !important; width: 100% !important; border: 2px solid #000 !important; }
          th { background: #1A4B84 !important; color: white !important; -webkit-print-color-adjust: exact; padding: 12px !important; border: 1px solid #000 !important; }
          td { border: 1px solid #000 !important; padding: 10px !important; }
          .bg-\\[\\#1A4B84\\] { background-color: #1A4B84 !important; color: white !important; -webkit-print-color-adjust: exact; }
          .bg-\\[\\#E65100\\] { background-color: #E65100 !important; color: white !important; -webkit-print-color-adjust: exact; }
          .text-\\[\\#1A4B84\\] { color: #1A4B84 !important; }
          .text-\\[\\#E65100\\] { color: #E65100 !important; }
        }
      `}} />
    </div> 
  );
}