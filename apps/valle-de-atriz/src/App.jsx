import React, { useState, useMemo } from 'react';
import { 
  Users, FileText, BarChart3, CheckSquare, MessageSquare, Home, 
  ShieldCheck, ExternalLink, Clock, UserPlus, 
  CheckCircle2, Printer, Trash2, TrendingUp, Settings,
  ClipboardCheck, Camera, Zap, Droplets, Shield,
  BookOpen, Scale, Eye, Activity, Wrench, Calendar, Layout, ListChecks,
  AlertCircle, ChevronRight, Info, ShieldAlert, HeartPulse, Building2,
  Lock, MapPin, Search, CreditCard, DollarSign, PieChart, Landmark, Gavel, 
  ArrowUpRight, Percent, Wallet, AlertTriangle, ArrowRight, HardHat
} from 'lucide-react';
// --- COMPONENTES DE UI ---

const SectionHeader = ({ title, icon: Icon, agendaIndices = [], agendaStatus, toggleAgendaItem }) => (
  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 border-b-2 pb-6 border-gray-200 print:hidden">
    <div className="flex items-center gap-4">
      <div className="p-4 bg-[#1A1A1A] rounded-2xl text-[#D4AF37] shadow-xl shadow-gray-300">
        {Icon && <Icon size={28} />}
      </div>
      <div>
        <h2 className="text-3xl font-black text-[#2B2B2B] uppercase tracking-tighter leading-none mb-1">{title}</h2>
        <p className="text-[10px] text-gray-500 font-black uppercase tracking-[0.2em]">
          {agendaIndices.length > 1 
            ? `Puntos ${agendaIndices.map(i => i + 1).join(' y ')} del Orden del día`
            : `Punto ${agendaIndices[0] + 1} del Orden del día`}
        </p>
      </div>
    </div>
    <button 
      onClick={() => toggleAgendaItem(agendaIndices)}
      className={`flex items-center gap-3 px-8 py-4 rounded-2xl font-black text-[11px] uppercase tracking-widest transition-all border-2 shadow-lg ${
        agendaIndices.every(idx => agendaStatus[idx])
        ? 'bg-[#D4AF37] border-[#D4AF37] text-[#1A1A1A] shadow-[#D4AF37]/20' 
        : 'bg-white border-gray-200 text-gray-400 hover:border-[#D4AF37] hover:text-[#D4AF37]'
      }`}
    >
      <CheckCircle2 size={18} />
      {agendaIndices.every(idx => agendaStatus[idx]) ? 'PUNTO(S) EVACUADO(S)' : 'MARCAR COMO EVACUADO'}
    </button>
  </div>
);

const Card = ({ children, title, className = "", icon: Icon, badge, highlight = false }) => (
  <div className={`bg-white rounded-[32px] shadow-sm border-2 ${highlight ? 'border-[#D4AF37]' : 'border-gray-100'} p-8 ${className}`}>
    <div className="flex justify-between items-start mb-6">
      {title && <h3 className="text-[12px] font-black text-[#2B2B2B] flex items-center gap-3 uppercase tracking-[0.15em]">
        <div className={`w-2 h-7 ${highlight ? 'bg-[#D4AF37]' : 'bg-[#1A1A1A]'} rounded-full shrink-0`}></div>
        {Icon && <Icon size={20} className="text-[#1A1A1A]" />}
        {title}
      </h3>}
      {badge && <span className="bg-[#1A1A1A] text-[#D4AF37] text-[9px] font-black px-3 py-1.5 rounded-lg uppercase tracking-widest">{badge}</span>}
    </div>
    {children}
  </div>
);

const ManagementTable = ({ title, headers, data, icon: Icon, color = "#2B2B2B" }) => (
  <div className="bg-white rounded-[32px] border-2 border-gray-100 overflow-hidden shadow-sm flex flex-col h-full">
    <div className="bg-gray-50 px-8 py-5 border-b flex items-center gap-4">
      {Icon && <Icon style={{ color }} size={20} />}
      <h4 className="text-[11px] font-black text-gray-800 uppercase tracking-[0.2em]">{title}</h4>
    </div>
    <div className="overflow-x-auto">
      <table className="w-full text-left text-[11px]">
        <thead className="bg-gray-50/50 text-gray-400 font-black uppercase tracking-widest border-b">
          <tr>
            {headers.map((h, i) => <th key={i} className="px-8 py-5">{h}</th>)}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 uppercase font-bold text-[#2B2B2B]">
          {data.map((row, idx) => (
            <tr key={idx} className="hover:bg-gray-50 transition-colors">
              {Object.values(row).map((val, i) => (
                <td key={i} className="px-8 py-5">{val}</td>
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
  "Llamado a lista y verificación de Quorum.",
  "Elección de dignatarios de la asamblea.",
  "Lectura y aprobación del orden del día.",
  "Lectura Concepto Comisión Verificadora Acta 2025.",
  "Presentación Informe de Consejo de Administración.",
  "Presentación Informe de Administración.",
  "Dictamen e informe de Revisoría Fiscal.",
  "Presentación y aprobación Estados Financieros 2025.",
  "Presupuesto vigencia 2026 y Cuota de administración.",
  "Nombramiento Consejo de administración 2026-2027.",
  "Nombramiento Comité de Convivencia 2026-2027.",
  "Elección Revisor Fiscal.",
  "Solicitud autorización unión de dos apartamentos.",
  "Proposiciones y Varios."
];

const COEFICIENTES_DATA = [
  { id: 1, unidad: '201', propietario: 'EDGAR RODRIGO YEPES PONCE- MERCEDES SEVILLA - JULIANA YEPEZ', coeficiente: 1.30859 },
  { id: 2, unidad: '202', propietario: 'PROYECTOS BYV SA', coeficiente: 1.34192 },
  { id: 3, unidad: '203', propietario: 'INVERSIONES ANDINA DEL SUR', coeficiente: 1.20207 },
  { id: 4, unidad: '204', propietario: 'PROYECTOS BYV SA', coeficiente: 1.23912 },
  { id: 5, unidad: '205', propietario: 'RODRIGO DE LOS RIOS RODRIGUEZ - CILENE CERON CERON', coeficiente: 0.89858 },
  { id: 6, unidad: '206', propietario: 'PROYECTOS BYV SA', coeficiente: 0.92952 },
  { id: 7, unidad: '207', propietario: 'PROYECTOS BYV SA', coeficiente: 0.91439 },
  { id: 8, unidad: '301', propietario: 'MARIA HELENA PANTOJA VASQUEZ', coeficiente: 1.30645 },
  { id: 9, unidad: '302', propietario: 'GILBERTO BETANCOURTH - INGRIT PABON - SOFIA BETANCOURT', coeficiente: 1.34192 },
  { id: 10, unidad: '303', propietario: 'JUAN SEBASTIAN MORENO DELGADO', coeficiente: 1.12766 },
  { id: 11, unidad: '304', propietario: 'PROYECTOS BYV SA', coeficiente: 1.22051 },
  { id: 12, unidad: '305', propietario: 'MARGARITA ROSA WOODCOCK DELGADO', coeficiente: 0.87465 },
  { id: 13, unidad: '306', propietario: 'LUIS ERNESTO PORTILLA FAJARDO', coeficiente: 1.00137 },
  { id: 14, unidad: '307', propietario: 'PROYECTOS BYV SA', coeficiente: 0.92916 },
  { id: 15, unidad: '401', propietario: 'MARIA INES CITELIY', coeficiente: 1.31439 },
  { id: 16, unidad: '402', propietario: 'NELCY CONCEPCION CARDENAS ESTRADA', coeficiente: 1.33838 },
  { id: 17, unidad: '403', propietario: 'SEGUNDO ADALBERTO CHURTA GOMEZ', coeficiente: 1.12797 },
  { id: 18, unidad: '404', propietario: 'PROYECTOS BYV SA', coeficiente: 1.23235 },
  { id: 19, unidad: '405', propietario: 'JESUS ALBERTO HIDALGO OBANDO - JULIA ROSERO', coeficiente: 0.88686 },
  { id: 20, unidad: '406', propietario: 'HECTOR RAMIREZ', coeficiente: 0.93569 },
  { id: 21, unidad: '407', propietario: 'JESUS ANTONIO PASTAS PERUGACHE', coeficiente: 0.92330 },
  { id: 22, unidad: '501', propietario: 'OLGA OCHOA', coeficiente: 1.40686 },
  { id: 23, unidad: '502', propietario: 'HENRY ROSAS', coeficiente: 1.33416 },
  { id: 24, unidad: '503', propietario: 'ANA MARIA REBOLLEDO', coeficiente: 1.14634 },
  { id: 25, unidad: '504', propietario: 'PROYECTOS BYV SA', coeficiente: 1.23973 },
  { id: 26, unidad: '505', propietario: 'MIRIAM YOLANDA INSUASTY DE BEDOYA', coeficiente: 0.86281 },
  { id: 27, unidad: '506', propietario: 'MARIA CAMILA ERASO', coeficiente: 0.98214 },
  { id: 28, unidad: '507', propietario: 'CARLOS ARTURO PAREDES AGUIRRE', coeficiente: 0.94936 },
  { id: 29, unidad: '601', propietario: 'VICTORIA ROSAS', coeficiente: 1.30694 },
  { id: 30, unidad: '602', propietario: 'MARIA TERESA MERA', coeficiente: 1.34613 },
  { id: 31, unidad: '603', propietario: 'ANDRES ARTEAGA GALVIS', coeficiente: 1.13401 },
  { id: 32, unidad: '604', propietario: 'PROYECTOS BYV SA', coeficiente: 1.23717 },
  { id: 33, unidad: '605', propietario: 'CARLOS DANIEL VILLOTA BENAVIDES', coeficiente: 0.95980 },
  { id: 34, unidad: '606', propietario: 'BG LEGAL SAS', coeficiente: 1.01303 },
  { id: 35, unidad: '607', propietario: 'ANDRES BETANCOURTH', coeficiente: 0.97750 },
  { id: 36, unidad: '701', propietario: 'ALICIA MARIA CHAMORRO PEREZ', coeficiente: 1.30456 },
  { id: 37, unidad: '702', propietario: 'FELIPE WOODCOOK - JILMA GONZALEZ', coeficiente: 1.34674 },
  { id: 38, unidad: '703', propietario: 'ELIZABETH DEL SOCORRO TAPIA CALPA', coeficiente: 1.12620 },
  { id: 39, unidad: '704', propietario: 'GERARDO MARTINEZ BUENO', coeficiente: 1.24626 },
  { id: 40, unidad: '705', propietario: 'JOHANA TORO', coeficiente: 0.88405 },
  { id: 41, unidad: '706', propietario: 'NIDIA DEL SOCORRO ARCOS NARVAEZ', coeficiente: 1.00235 },
  { id: 42, unidad: '707', propietario: 'ELISA CHAVES MARTINEZ', coeficiente: 0.92305 },
  { id: 43, unidad: '801', propietario: 'ALEJANDRO RUIZ', coeficiente: 1.31182 },
  { id: 44, unidad: '802', propietario: 'JUAN CARLOS CABRERA CORDOBA', coeficiente: 1.31933 },
  { id: 45, unidad: '803', propietario: 'DARIO FERNANDO VALENCIA MORA', coeficiente: 1.13761 },
  { id: 46, unidad: '804', propietario: 'MARIA DEL CARMEN CARDENAS', coeficiente: 1.23613 },
  { id: 47, unidad: '805', propietario: 'MARTHA LEONOR LOZANO DIAZ', coeficiente: 0.88448 },
  { id: 48, unidad: '806', propietario: 'MARIA FERNANDA CAICEDO PEREZ', coeficiente: 1.00076 },
  { id: 49, unidad: '807', propietario: 'VICTORIA EUGENIA SAA', coeficiente: 0.92171 },
  { id: 50, unidad: '901', propietario: 'ALEXANDER GUTIERREZ', coeficiente: 1.29937 },
  { id: 51, unidad: '902', propietario: 'MARIA JOSE HUERTAS', coeficiente: 1.34601 },
  { id: 52, unidad: '903', propietario: 'PATRICIA ACOSTA', coeficiente: 1.12601 },
  { id: 53, unidad: '904', propietario: 'LUIS EDUARDO CADENA - IVONE GRANADOS', coeficiente: 1.22978 },
  { id: 54, unidad: '905', propietario: 'CARMEN ELENA ARAUJO JATIVA', coeficiente: 0.83924 },
  { id: 55, unidad: '906', propietario: 'ANGELA MARIA CAVIEDES DE LOS RIOS', coeficiente: 0.97445 },
  { id: 56, unidad: '907', propietario: 'CLARA INES BRAVO VILLARREAL', coeficiente: 0.75739 },
  { id: 57, unidad: '1001', propietario: 'DORIS GRACIELA ROMO ROMERO', coeficiente: 1.31732 },
  { id: 58, unidad: '1002', propietario: 'JANETH ARAUJO', coeficiente: 1.50325 },
  { id: 59, unidad: '1003', propietario: 'XIMENA TENGANA DELGADO', coeficiente: 1.12601 },
  { id: 60, unidad: '1004', propietario: 'LILIANA VILLOTA', coeficiente: 1.25023 },
  { id: 61, unidad: '1005', propietario: 'MARIO ENRIQUEZ ERASO', coeficiente: 0.85890 },
  { id: 62, unidad: '1006', propietario: 'ALEJANDRO NARVAEZ', coeficiente: 0.97073 },
  { id: 63, unidad: '1007', propietario: 'ALEJANDRO ORDOÑEZ', coeficiente: 0.77631 },
  { id: 64, unidad: '1101', propietario: 'ZIPCO SAS', coeficiente: 1.31115 },
  { id: 65, unidad: '1102', propietario: 'XIMENA BEDOYA', coeficiente: 1.34601 },
  { id: 66, unidad: '1103', propietario: 'LUIS ALVARO TORO VILLOTA', coeficiente: 1.99243 },
  { id: 67, unidad: '1104', propietario: 'JUAN FELIPE SAA LORA', coeficiente: 1.28789 },
  { id: 68, unidad: '1105', propietario: 'DIANA WOODCOOK', coeficiente: 0.75452 },
  { id: 69, unidad: '1106', propietario: 'WILLIAN VARGAS OSORIO - PAULA CHAVES', coeficiente: 1.09000 },
  { id: 70, unidad: '1201', propietario: 'JAIME ALBERTO SUAREZ LOPEZ - ADRIANA BRAVO', coeficiente: 2.41141 },
  { id: 71, unidad: '1202', propietario: 'GUILLERMO TRUJILLO ERAZO', coeficiente: 2.68872 },
  { id: 72, unidad: '1203', propietario: 'DORA AMANDA DIAZ DE ALBARRACIN', coeficiente: 2.63372 },
  { id: 73, unidad: '1204', propietario: 'ANTONIO CALDERON MONCAYO', coeficiente: 2.28384 },
  { id: 74, unidad: '1205', propietario: 'ERNESTO IVAN CORDOBA CHAMORRO-PATRICIA FUERTES', coeficiente: 2.71832 },
  { id: 75, unidad: '1206', propietario: 'PROYECTOS BYV SA', coeficiente: 2.16694 },
  { id: 76, unidad: 'Local 1', propietario: 'PROYECTOS BYV SA', coeficiente: 1.10966 },
  { id: 77, unidad: 'Local 2', propietario: 'PROYECTOS BYV SA', coeficiente: 1.21129 },
  { id: 78, unidad: 'Local 3', propietario: 'PROYECTOS BYV SA', coeficiente: 0.98568 },
  { id: 79, unidad: 'Local 4', propietario: 'PROYECTOS BYV SA', coeficiente: 1.13419 },
  { id: 80, unidad: 'Local 5', propietario: 'PROYECTOS BYV SA', coeficiente: 0.88454 },
  { id: 81, unidad: 'Local 6', propietario: 'PROYECTOS BYV SA', coeficiente: 0.55376 },
  { id: 82, unidad: '1500', propietario: 'UNIDAD ADMINISTRATIVA 1500', coeficiente: 1.12467 }
];

export default function App() {
  // --- FUNCIÓN AUXILIAR PARA RECUPERAR DATOS ---
  const getInitialState = (key, defaultValue) => {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : defaultValue;
  };

  const [activeSection, setActiveSection] = useState('inicio');

  // --- ESTADOS CON PERSISTENCIA ---
  const [asistencia, setAsistencia] = useState(() => 
    getInitialState('asistencia_valle', COEFICIENTES_DATA.map(c => ({ ...c, presente: false })))
  );
  
  const [agendaStatus, setAgendaStatus] = useState(() => 
    getInitialState('agenda_status_valle', new Array(ORDEN_DIA.length).fill(false))
  );

  const [dignatarios, setDignatarios] = useState(() => 
    getInitialState('dignatarios_valle', { presidente: '', secretario: '', comision: '', revisor: '' })
  );

  const [proposiciones, setProposiciones] = useState(() => 
    getInitialState('proposiciones_valle', [])
  );

  const [postuladosConsejo, setPostuladosConsejo] = useState(() => 
    getInitialState('postulados_consejo_valle', [])
  );

  const [postuladosConvivencia, setPostuladosConvivencia] = useState(() => 
    getInitialState('postulados_convivencia_valle', [])
  );

  const [decisionUnion, setDecisionUnion] = useState(() => 
    getInitialState('decision_union_valle', null)
  );

  // --- ESTADOS VOLÁTILES (No necesitan persistencia) ---
  const [tempProp, setTempProp] = useState({ proponente: '', texto: '' });
  const [searchTerm, setSearchTerm] = useState('');

  // --- EFECTO DE GUARDADO AUTOMÁTICO ---
  // Se ejecuta cada vez que uno de estos estados cambia
  React.useEffect(() => {
    localStorage.setItem('asistencia_valle', JSON.stringify(asistencia));
    localStorage.setItem('agenda_status_valle', JSON.stringify(agendaStatus));
    localStorage.setItem('dignatarios_valle', JSON.stringify(dignatarios));
    localStorage.setItem('proposiciones_valle', JSON.stringify(proposiciones));
    localStorage.setItem('postulados_consejo_valle', JSON.stringify(postuladosConsejo));
    localStorage.setItem('postulados_convivencia_valle', JSON.stringify(postuladosConvivencia));
    localStorage.setItem('decision_union_valle', JSON.stringify(decisionUnion));
  }, [asistencia, agendaStatus, dignatarios, proposiciones, postuladosConsejo, postuladosConvivencia, decisionUnion]);

  // --- TUS FUNCIONES ORIGINALES (Sin cambios) ---
  const togglePostulacion = (nombre, tipo) => {
    if (tipo === 'consejo') {
      setPostuladosConsejo(prev => 
        prev.includes(nombre) ? prev.filter(p => p !== nombre) : [...prev, nombre]
      );
    } else {
      setPostuladosConvivencia(prev => 
        prev.includes(nombre) ? prev.filter(p => p !== nombre) : [...prev, nombre]
      );
    }
  };

  const marcarTodosPresentes = () => {
    setAsistencia(prev => prev.map(a => ({ ...a, presente: true })));
  };

  const filteredAsistencia = useMemo(() => {
    return asistencia.filter(a => 
      a.unidad.toLowerCase().includes(searchTerm.toLowerCase()) || 
      a.propietario.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [asistencia, searchTerm]);

  const totalQuorum = useMemo(() => {
    const total = asistencia.filter(a => a.presente).reduce((acc, curr) => acc + curr.coeficiente, 0);
    return parseFloat(total.toFixed(5));
  }, [asistencia]);

  const progress = useMemo(() => (agendaStatus.filter(i => i).length / ORDEN_DIA.length) * 100, [agendaStatus]);

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
    setProposiciones(prev => prev.filter(p => p.id !== id));
  };

  const handlePrint = () => window.print();

  // --- BOTÓN PARA REINICIAR (Añádelo donde quieras en el JSX) ---
  const reiniciarAsamblea = () => {
    if(window.confirm("¿Deseas borrar todos los datos de la asamblea?")) {
      localStorage.clear();
      window.location.reload();
    }
  };

  return (
    <div className="flex min-h-screen bg-[#F5F5F5] font-sans text-[#2B2B2B] print:bg-white selection:bg-[#D4AF37] selection:text-[#1A1A1A]">
      
      {/* SIDEBAR */}
      <aside className="w-80 bg-[#1A1A1A] text-white fixed h-full flex flex-col shadow-2xl z-20 print:hidden border-r-4 border-[#D4AF37]/40">
        <div className="p-10 border-b border-white/5 text-center bg-black/30">
          <div className="flex justify-center mb-6">
             <div className="w-24 h-24 border-2 border-[#D4AF37] flex items-center justify-center p-4 rounded-[32px] bg-[#2B2B2B] shadow-2xl shadow-black">
                <Building2 className="text-[#D4AF37]" size={48} />
             </div>
          </div>
          <h1 className="text-white font-black text-2xl tracking-tighter leading-none uppercase mb-2">
            Reserva <br/> <span className="text-[#D4AF37]">Valle de Atriz</span>
          </h1>
          <p className="text-[10px] font-black text-[#D4AF37] uppercase tracking-[0.4em] opacity-90">Asamblea Ordinaria 2026</p>
        </div>
        
        <nav className="flex-1 overflow-y-auto p-6 space-y-2">
          {[
            { id: 'inicio', label: 'Inicio', icon: Home },
            { id: 'quorum', label: '1. Quórum', icon: Users },
            { id: 'dignatarios', label: '2. Dignatarios', icon: UserPlus },
            { id: 'orden', label: '3. Orden del Día', icon: ListChecks },
            { id: 'acta2025', label: '4. Acta Anterior', icon: FileText },
            { id: 'gestion', label: '5-6. Informes Gestión', icon: TrendingUp },
            { id: 'financiero', label: '7-8. Financiero', icon: BarChart3 },
            { id: 'presupuesto', label: '9. Presupuesto', icon: PieChart },
            { id: 'elecciones', label: '10-12. Elecciones', icon: Gavel },
            { id: 'union', label: '13. Unión Unidades', icon: Home },
            { id: 'proposiciones', label: '14. Proposiciones', icon: MessageSquare },
            { id: 'final', label: 'Generar Acta Final', icon: Printer },
          ].map(item => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`w-full flex items-center gap-4 px-6 py-5 rounded-3xl transition-all text-[11px] font-black uppercase tracking-widest ${
                activeSection === item.id 
                ? 'bg-[#D4AF37] text-[#1A1A1A] shadow-2xl shadow-black/40 scale-[1.02]' 
                : 'text-gray-500 hover:bg-white/5 hover:text-[#D4AF37]'
              }`}
            >
              <item.icon size={22} className={activeSection === item.id ? 'text-[#1A1A1A]' : 'text-[#D4AF37]'} />
              {item.label}
            </button>
          ))}
        </nav>
        <div className="p-10 border-t border-white/5 text-[10px] font-black text-center opacity-50 uppercase tracking-[0.3em] text-[#D4AF37]">
           Pasto, Nariño <br/> 2026
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="ml-80 flex-1 pb-20 print:ml-0">
        
        {/* HEADER */}
        <header className="sticky top-0 bg-white/95 backdrop-blur-md border-b-2 border-gray-100 px-12 py-6 z-10 flex justify-between items-center print:hidden shadow-md">
          <div className="flex gap-16">
            <div>
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.25em]">Quórum de la Sesión</span>
              <div className="flex items-center gap-4">
                <span className={`text-4xl font-black tracking-tighter ${totalQuorum >= 50.1 ? 'text-[#D4AF37]' : 'text-[#2B2B2B]'}`}>
                  {totalQuorum.toFixed(3)}%
                </span>
                <div className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-sm ${totalQuorum >= 50.1 ? 'bg-[#D4AF37] text-[#1A1A1A]' : 'bg-gray-100 text-gray-400'}`}>
                  {totalQuorum >= 50.1 ? 'VALIDEZ LEGAL' : 'PENDIENTE'}
                </div>
              </div>
            </div>
            
            <div className="border-l-2 pl-16 border-gray-100">
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.25em]">Progreso General</span>
              <div className="flex items-center gap-5 mt-1">
                 <div className="h-4 w-48 bg-gray-100 rounded-full overflow-hidden border border-gray-200 shadow-inner">
                    <div className="h-full bg-[#D4AF37] transition-all duration-1000 shadow-lg" style={{width: `${progress}%`}}></div>
                 </div>
                 <span className="text-sm font-black text-[#D4AF37]">{Math.round(progress)}%</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="text-right">
               <p className="text-[13px] font-black text-[#2B2B2B] uppercase tracking-tighter">Edificio Reserva Valle de Atriz</p>
               <p className="text-[10px] text-[#D4AF37] font-black uppercase tracking-[0.2em]">Administración de Copropiedad</p>
            </div>
            <div className="h-14 w-14 bg-[#1A1A1A] rounded-2xl flex items-center justify-center text-[#D4AF37] shadow-2xl border-2 border-[#D4AF37]/20">
               <ShieldCheck size={28} />
            </div>
          </div>
        </header>

        <div className="max-w-6xl mx-auto p-12 space-y-20 print:p-0">
          
          {/* SECCIÓN INICIO */}
          {activeSection === 'inicio' && (
            <div className="space-y-12 animate-in fade-in duration-700">
               <div className="bg-[#1A1A1A] rounded-[64px] p-24 text-white relative overflow-hidden shadow-[0_25px_60px_-15px_rgba(0,0,0,0.5)] border-b-[16px] border-[#D4AF37]">
                  <div className="relative z-10 text-center">
                     <span className="bg-[#D4AF37] text-[#1A1A1A] text-[11px] font-black uppercase px-10 py-4 rounded-full mb-14 inline-block tracking-[0.4em] shadow-2xl">Asamblea General Ordinaria</span>
                     <h1 className="text-8xl font-black mb-8 leading-[0.85] tracking-tighter uppercase">Reserva <br/><span className="text-[#D4AF37] italic">Valle de Atriz</span></h1>
                     <div className="w-40 h-2 bg-[#D4AF37] mx-auto mb-10 rounded-full"></div>
                     <p className="text-gray-400 max-w-3xl text-xl font-medium leading-relaxed mx-auto italic uppercase tracking-[0.25em]">"Excelencia, Seguridad y Valorización en el corazón de Pasto"</p>
                  </div>
                  <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-[#D4AF37]/10 rounded-full blur-[150px]"></div>
                  <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-white/5 rounded-full blur-[120px]"></div>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                  <Card title="Copropiedad" highlight badge="901.595.974-1">
                    <div className="space-y-4 pt-2">
                       <p className="text-[11px] font-black text-gray-500 uppercase tracking-widest">DIRECCIÓN:</p>
                       <p className="text-sm font-black text-[#2B2B2B] leading-tight">CALLE 20 NO. 42-105<br/> AVENIDA LOS ESTUDIANTES</p>
                    </div>
                  </Card>
                  <Card title="Agenda Oficial">
                    <div className="space-y-4 pt-2">
                       <p className="text-[11px] font-black text-gray-500 uppercase tracking-widest">CITACIÓN:</p>
                       <p className="text-sm font-black text-[#2B2B2B]">MIÉRCOLES 18 FEBRERO 2026<br/> HORA: 7:00 PM</p>
                    </div>
                  </Card>
                  <Card title="Representación">
                    <div className="flex items-end justify-between pt-4">
                       <div>
                          <p className="text-5xl font-black text-[#D4AF37] leading-none mb-1">50.1%</p>
                          <p className="text-[10px] font-black text-[#2B2B2B] uppercase tracking-widest">Quórum Decisorio</p>
                       </div>
                       <Landmark className="text-gray-100" size={56} />
                    </div>
                  </Card>
               </div>
            </div>
          )}

          {/* SECCIÓN 1: QUORUM */}
          <div className={`${activeSection === 'quorum' ? 'block' : 'hidden'} print:block`}>
            <div className="space-y-10 animate-in slide-in-from-right-10">
              <SectionHeader title="1. Registro y Quórum" icon={Users} agendaIndices={[0]} agendaStatus={agendaStatus} toggleAgendaItem={toggleAgendaItem} />
              
              {/* BARRA DE HERRAMIENTAS: BUSCADOR Y BOTÓN */}
              <div className="flex flex-col md:flex-row gap-6 items-center justify-between print:hidden">
                <div className="relative group w-full max-w-md">
                  <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#D4AF37] transition-colors" size={20} />
                  <input 
                    type="text" 
                    placeholder="BUSCAR UNIDAD O PROPIETARIO..." 
                    className="w-full pl-14 pr-8 py-5 bg-white border-2 border-gray-100 rounded-[24px] font-black text-[10px] uppercase tracking-widest focus:border-[#D4AF37] outline-none transition-all shadow-sm"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                <button 
                  onClick={marcarTodosPresentes}
                  className="flex items-center gap-3 px-8 py-5 bg-[#1A1A1A] text-[#D4AF37] rounded-[24px] font-black text-[10px] uppercase tracking-[0.2em] hover:bg-black transition-all shadow-lg border-2 border-[#D4AF37]/20 whitespace-nowrap"
                >
                  <CheckCircle2 size={18} />
                  Marcar Todos como Presentes
                </button>
              </div>

              <Card className="overflow-hidden p-0 border-none shadow-2xl">
                <div className="overflow-x-auto max-h-[600px]">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-[#1A1A1A] text-[#D4AF37] font-black uppercase tracking-[0.25em] text-[10px] sticky top-0 z-10">
                      <tr>
                        <th className="p-8">Unidad / Inmueble</th>
                        <th className="p-8">Nombre del Copropietario</th>
                        <th className="p-8 text-center">Coeficiente (%)</th>
                        <th className="p-8 text-center">Acción</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 uppercase">
                      {filteredAsistencia.map((item) => (
                        <tr key={item.id} className={`${item.presente ? 'bg-[#D4AF37]/5' : ''} hover:bg-gray-50/50 transition-colors`}>
                          <td className="p-8 font-black text-[#1A1A1A]">{item.unidad}</td>
                          <td className="p-8 font-bold text-gray-600 text-[11px] leading-tight">{item.propietario}</td>
                          <td className="p-8 font-black text-[#2B2B2B] text-center tracking-tighter text-lg">{item.coeficiente.toFixed(5)}%</td>
                          <td className="p-8 text-center">
                            <button 
                              onClick={() => toggleAsistencia(item.id)} 
                              className={`px-8 py-3 rounded-2xl text-[10px] font-black tracking-[0.2em] transition-all shadow-md ${
                                item.presente 
                                  ? 'bg-[#D4AF37] text-[#1A1A1A] border-2 border-[#D4AF37]' 
                                  : 'bg-gray-50 text-gray-400 border-2 border-gray-100'
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

          {/* SECCIÓN 3: ORDEN DEL DÍA */}
          <div className={`${activeSection === 'orden' ? 'block' : 'hidden'} print:block`}>
            <div className="space-y-10 animate-in fade-in">
              <SectionHeader title="Orden del Día Propuesto" icon={ListChecks} agendaIndices={[2]} agendaStatus={agendaStatus} toggleAgendaItem={toggleAgendaItem} />
              <Card highlight title="Puntos de la Sesión">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                  {ORDEN_DIA.map((punto, idx) => (
                    <div key={idx} className={`p-6 rounded-3xl border-2 flex items-start gap-5 transition-all ${agendaStatus[idx] ? 'border-[#D4AF37] bg-[#D4AF37]/5' : 'border-gray-100 bg-gray-50/30'}`}>
                      <div className={`h-10 w-10 rounded-xl flex items-center justify-center font-black text-sm shrink-0 ${agendaStatus[idx] ? 'bg-[#D4AF37] text-[#111111]' : 'bg-[#111111] text-[#D4AF37]'}`}>
                        {idx + 1}
                      </div>
                      <p className={`text-xs font-black uppercase tracking-tight leading-relaxed ${agendaStatus[idx] ? 'text-[#111111]' : 'text-gray-500'}`}>
                        {punto}
                      </p>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>

          {/* SECCIÓN 2: DIGNATARIOS */}
          <div className={`${activeSection === 'dignatarios' ? 'block' : 'hidden'} print:block`}>
            <div className="space-y-12 animate-in zoom-in-95">
               <SectionHeader title="3. Dignatarios de la Asamblea" icon={UserPlus} agendaIndices={[1]} agendaStatus={agendaStatus} toggleAgendaItem={toggleAgendaItem} />
               <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                  <div className="md:col-span-2 space-y-12">
                    <Card title="Elección de Mesa Directiva" icon={ShieldCheck} highlight>
                       <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 pt-2">
                          <div className="space-y-4">
                             <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest">Presidente de la Sesión</label>
                             <input type="text" className="w-full p-6 bg-gray-50 border-2 border-gray-100 rounded-[24px] font-black uppercase text-xs focus:border-[#D4AF37] outline-none transition-all shadow-inner" placeholder="Escriba el nombre..." value={dignatarios.presidente} onChange={(e) => setDignatarios({...dignatarios, presidente: e.target.value})} />
                          </div>
                          <div className="space-y-4">
                             <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest">Secretario(a) Ad-Hoc</label>
                             <input type="text" className="w-full p-6 bg-gray-50 border-2 border-gray-100 rounded-[24px] font-black uppercase text-xs focus:border-[#D4AF37] outline-none transition-all shadow-inner" placeholder="Escriba el nombre..." value={dignatarios.secretario} onChange={(e) => setDignatarios({...dignatarios, secretario: e.target.value})} />
                          </div>
                       </div>
                    </Card>
                    <Card title="Comisión Verificadora del Acta" icon={ClipboardCheck}>
                       <div className="space-y-4 pt-2">
                          <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest text-center block">Copropietarios designados para validar el acta actual</label>
                          <textarea className="w-full p-6 bg-gray-50 border-2 border-gray-100 rounded-[24px] font-black uppercase text-[11px] h-40 focus:border-[#D4AF37] outline-none transition-all shadow-inner leading-relaxed" placeholder="Ingrese los nombres y unidades de los comisionados..." value={dignatarios.comision} onChange={(e) => setDignatarios({...dignatarios, comision: e.target.value})}></textarea>
                       </div>
                    </Card>
                  </div>
                  <div className="bg-[#1A1A1A] rounded-[48px] p-12 text-white flex flex-col justify-center text-center shadow-2xl border-b-[12px] border-[#D4AF37]">
                     <BookOpen className="text-[#D4AF37] mb-10 mx-auto" size={56} />
                     <h4 className="font-black text-2xl mb-8 uppercase tracking-tighter">Protocolo Legal</h4>
                     <p className="text-[11px] font-bold text-gray-400 leading-loose uppercase tracking-widest opacity-80">
                        Según el reglamento de copropiedad Art. 68 y Ley 675, los dignatarios tienen la responsabilidad de conducir la asamblea bajo los principios de imparcialidad y transparencia.
                     </p>
                     <div className="mt-12 p-6 bg-white/5 rounded-3xl border border-white/10">
                        <p className="text-[#D4AF37] font-black text-[10px] tracking-widest uppercase">Punto 4 del Orden:</p>
                        <p className="text-[10px] font-bold mt-2 opacity-60">Lectura concepto Comisión 2025</p>
                     </div>
                  </div>
               </div>
            </div>
          </div>

          {/* SECCIÓN 4: COMISIÓN VERIFICADORA ACTA ANTERIOR */}
          {activeSection === 'acta2025' && (
            <div className="space-y-12 animate-in fade-in duration-700 uppercase">
              <SectionHeader 
                title="4. Concepto Comisión Verificadora" 
                icon={FileText} 
                agendaIndices={[3]} 
                agendaStatus={agendaStatus} 
                toggleAgendaItem={toggleAgendaItem} 
              />

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                <div className="lg:col-span-2 space-y-8">
                  <Card title="Estado del Acta 2025" icon={ShieldCheck} highlight>
                    <div className="space-y-6">
                      <div className="flex items-center gap-6 p-6 bg-green-50 border-2 border-green-100 rounded-[32px]">
                        <div className="h-16 w-16 bg-green-500 rounded-2xl flex items-center justify-center text-white shadow-lg">
                          <CheckCircle2 size={32} />
                        </div>
                        <div>
                          <p className="text-[10px] font-black text-green-600 tracking-[0.2em]">ESTADO ACTUAL</p>
                          <p className="text-xl font-black text-gray-800">ACTA APROBADA Y FIRMADA</p>
                        </div>
                      </div>

                      <div className="p-8 bg-gray-50 rounded-[40px] border-2 border-gray-100 italic text-[11px] font-bold leading-loose text-gray-600">
                        "La Comisión Verificadora designada en la Asamblea de 2025 ha revisado el documento, encontrándolo acorde a lo sucedido en la sesión y recomendando su aprobación definitiva sin observaciones."
                      </div>
                    </div>
                  </Card>

                  {/* BOTÓN DEL LINK AL PDF */}
                  <div className="p-10 bg-[#1A1A1A] rounded-[48px] shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8 border-b-[12px] border-[#D4AF37]">
                    <div className="flex items-center gap-6">
                      <div className="p-5 bg-[#D4AF37] rounded-3xl text-[#1A1A1A]">
                        <ExternalLink size={32} />
                      </div>
                      <div>
                        <h4 className="text-white font-black text-lg tracking-tighter">EXPEDIENTE DIGITAL 2025</h4>
                        <p className="text-[#D4AF37] text-[10px] font-black tracking-widest uppercase">Consulta el acta completa en PDF</p>
                      </div>
                    </div>
                    <a 
                      href="TU_LINK_AQUI" // <--- AQUÍ PEGAS EL LINK DE TU ARCHIVO
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="px-10 py-5 bg-[#D4AF37] text-[#1A1A1A] rounded-2xl font-black text-xs uppercase tracking-widest hover:scale-105 transition-all shadow-xl flex items-center gap-3"
                    >
                      Abrir Documento <ArrowUpRight size={18} />
                    </a>
                  </div>
                </div>

                <div className="space-y-8">
                  <Card title="Firmas Responsables" icon={UserPlus}>
                    <div className="space-y-6 pt-2">
                      <div className="border-l-4 border-[#D4AF37] pl-4">
                        <p className="text-[9px] text-gray-400 font-black uppercase">Administradora:</p>
                        <p className="text-xs font-black text-[#1A1A1A]">ANA LUCÍA YEPEZ C. </p>
                      </div>
                      <div className="border-l-4 border-[#D4AF37] pl-4">
                        <p className="text-[9px] text-gray-400 font-black uppercase">Revisor Fiscal:</p>
                        <p className="text-xs font-black text-[#1A1A1A]">ALFONSO BENNETH M. </p>
                      </div>
                      <div className="mt-8 p-6 bg-gray-50 rounded-3xl text-center">
                        <p className="text-[10px] font-black text-gray-400 uppercase mb-2">Comisión 2025:</p>
                        <p className="text-[10px] font-bold italic text-gray-500 leading-relaxed">
                          Designados por la asamblea ordinaria del periodo anterior.
                        </p>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
            </div>
          )}

                  
          {/* SECCIÓN 5-6: INFORME DE GESTIÓN COMPLETO */}
          {activeSection === 'gestion' && (
            <div className="space-y-16 animate-in slide-in-from-bottom-10 uppercase">
              <SectionHeader 
                title="5-6. Informes de Gestión 2025" 
                icon={TrendingUp} 
                agendaIndices={[4, 5]} 
                agendaStatus={agendaStatus} 
                toggleAgendaItem={toggleAgendaItem} 
              />

              {/* BLOQUE 1: GESTIÓN ADMINISTRATIVA Y OPERATIVA */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                  <Card title="1. Estructura Corporativa y Decisiones" icon={Layout} highlight>
                    <div className="space-y-6 text-[11px] font-bold text-gray-600 leading-relaxed">
                      <div className="p-6 bg-gray-50 rounded-3xl border-l-8 border-[#D4AF37]">
                        <p className="text-[#111111] font-black mb-3 text-sm">CONSEJO DE ADMINISTRACIÓN 2025:</p>
                        <div className="grid grid-cols-2 gap-4 mb-4">
                          <div>
                            <p className="text-[#D4AF37] text-[9px] mb-1">PRESIDENTA:</p>
                            <p className="text-[#1A1A1A]">DRA. PATRICIA FUERTES</p>
                          </div>
                          <div>
                            <p className="text-[#D4AF37] text-[9px] mb-1">VICEPRESIDENTA (REVISIÓN PAGOS):</p>
                            <p className="text-[#1A1A1A]">DRA. MARÍA ELENA PANTOJA</p>
                          </div>
                        </div>
                        <p className="italic">Gestión documentada en Actas 12 a 17 y Asamblea Extraordinaria.</p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="p-6 bg-white border-2 border-gray-50 rounded-2xl shadow-sm">
                          <p className="text-[#D4AF37] font-black text-[10px] mb-3 uppercase tracking-widest flex items-center gap-2">
                            <Activity size={14}/> Talento Humano
                          </p>
                          <ul className="space-y-3">
                            <li className="flex justify-between border-b pb-1"><span>ADMINISTRADORA:</span> <span className="text-[#1A1A1A]">ANA LUCÍA YEPEZ</span></li>
                            <li className="flex justify-between border-b pb-1"><span>REVISOR FISCAL:</span> <span className="text-[#1A1A1A]">ALFONSO BENNETH</span></li>
                            <li className="flex justify-between border-b pb-1"><span>NUEVA CONTADORA:</span> <span className="text-[#1A1A1A]">ANDREA DELGADO</span></li>
                          </ul>
                        </div>
                        <div className="p-6 bg-white border-2 border-gray-50 rounded-2xl shadow-sm">
                          <p className="text-red-600 font-black text-[10px] mb-3 uppercase tracking-widest flex items-center gap-2">
                            <ShieldAlert size={14}/> Seguridad SGSST
                          </p>
                          <p className="mb-2">PROVEEDOR: KUMARA / RICARDO FIERRO</p>
                          <p className="text-[9px] opacity-70">Implementación de Plan de Emergencias, capacitación en hábitos saludables y auditoría de seguridad social a contratistas.</p>
                        </div>
                      </div>
                    </div>
                  </Card>

                  {/* MODERNIZACIÓN TECNOLÓGICA CCTV */}
                  <Card title="3. Seguridad Electrónica y CCTV" icon={Camera}>
                    <div className="p-6 bg-[#1A1A1A] text-white rounded-[32px] mb-6">
                      <div className="flex items-center gap-6">
                        <Zap className="text-[#D4AF37]" size={40} />
                        <div>
                          <p className="text-[#D4AF37] text-[10px] font-black tracking-widest">MODERNIZACIÓN RADICAL</p>
                          <p className="text-xs font-bold leading-relaxed">CAMBIO DE CÁMARAS PERIMETRALES POR TECNOLOGÍA PTZ DE ALTA RESOLUCIÓN PARA RECONOCIMIENTO FACIAL Y DE PLACAS.</p>
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      <div className="p-4 border-2 border-gray-100 rounded-2xl text-center">
                        <p className="text-[9px] font-black text-gray-400 mb-1">COMISIÓN TÉCNICA</p>
                        <p className="text-[10px] font-black">RICARDO PAZ / SEDEC</p>
                      </div>
                      <div className="p-4 border-2 border-gray-100 rounded-2xl text-center">
                        <p className="text-[9px] font-black text-gray-400 mb-1">MANTENIMIENTO</p>
                        <p className="text-[10px] font-black">IMAP INGENIERÍA</p>
                      </div>
                      <div className="p-4 border-2 border-gray-100 rounded-2xl text-center">
                        <p className="text-[9px] font-black text-gray-400 mb-1">REFUERZO FISICO</p>
                        <p className="text-[10px] font-black">SEGURIDAD DEL SUR</p>
                      </div>
                    </div>
                  </Card>
                </div>

                {/* LATERAL: SEGUROS Y FINANZAS RÁPIDAS */}
                <div className="space-y-8">
                  <div className="bg-[#D4AF37] rounded-[48px] p-10 text-[#1A1A1A] shadow-2xl relative overflow-hidden">
                    <ShieldCheck className="mb-6 opacity-20 absolute -right-4 -top-4" size={120} />
                    <h4 className="text-sm font-black uppercase mb-6 tracking-tighter">Póliza Áreas Comunes</h4>
                    <p className="text-[10px] font-black uppercase opacity-70 mb-1">INTERMEDIARIO:</p>
                    <p className="font-black text-sm mb-4">HUERTAS GUERRERO</p>
                    <p className="text-[10px] font-black uppercase opacity-70 mb-1">COMPAÑÍA:</p>
                    <p className="font-black text-sm mb-8">SEGUROS DEL ESTADO S.A.</p>
                    <div className="bg-[#1A1A1A] text-[#D4AF37] p-6 rounded-3xl">
                      <p className="text-[9px] font-black mb-1">VALOR ANUAL:</p>
                      <p className="text-3xl font-black tracking-tighter">$36.245.385</p>
                    </div>
                  </div>

                  <Card title="Cartera y Finanzas" icon={TrendingUp}>
                    <div className="space-y-6">
                      <div className="text-center">
                        <p className="text-[10px] font-black text-gray-400 mb-1">RECUPERACIÓN EXITOSA</p>
                        <div className="flex items-center justify-center gap-3">
                          <p className="text-xl font-black line-through text-red-400">$22M</p>
                          <ArrowUpRight className="text-green-500" />
                          <p className="text-3xl font-black text-green-600">$4M</p>
                        </div>
                        <p className="text-[9px] font-bold text-gray-400 mt-2">REDUCCIÓN DEL 80% DE MOROSIDAD</p>
                      </div>
                      <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                        <p className="text-[9px] font-black text-[#D4AF37] mb-2 uppercase">RECOMENDACIÓN REVISORÍA:</p>
                        <p className="text-[10px] font-black">INVERTIR EXCEDENTES EN CDT PARA FONDO DE IMPREVISTOS.</p>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>

              {/* SECCIÓN 4: OBRAS Y MANTENIMIENTO */}
              <div className="space-y-10">
                <div className="bg-[#1A1A1A] p-12 rounded-[56px] text-white border-b-8 border-[#D4AF37] shadow-2xl relative overflow-hidden">
                  <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div>
                      <h3 className="text-4xl font-black uppercase tracking-tighter mb-4">Inversión en Infraestructura</h3>
                      <p className="text-[#D4AF37] font-black text-sm uppercase tracking-[0.3em] mb-8">Mantenimiento Correctivo y Preventivo 2025</p>
                      <div className="flex gap-6">
                        <div className="p-6 bg-white/5 rounded-3xl border border-white/10">
                          <p className="text-[#D4AF37] text-[10px] font-black mb-2">LIMPIEZA FACHADA (4 CARAS)</p>
                          <p className="text-3xl font-black">$12.191.505</p>
                          <p className="text-[9px] opacity-50 mt-2">BELLAVISTA / PROYECTOS B&V</p>
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      {[
                        {t: "MANT. GIMNASIO", v: "$2.616.167", p: "2KFIT CORP"},
                        {t: "SEÑALIZACIÓN TOTAL", v: "EJECUTADO", p: "A. GUERRERO / C. BOTINA"},
                        {t: "PULIDO PISOS/GRADAS", v: "EJECUTADO", p: "CARLOS EFRAÍN CALPA"},
                        {t: "ASCENSORES", v: "MENSUAL", p: "MITSUBISHI ELECTRIC"}
                      ].map((item, i) => (
                        <div key={i} className="p-4 bg-white/5 rounded-2xl border border-white/5">
                          <p className="text-[#D4AF37] text-[8px] font-black">{item.t}</p>
                          <p className="text-xs font-black">{item.v}</p>
                          <p className="text-[8px] opacity-40">{item.p}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="absolute top-0 right-0 w-1/3 h-full bg-[#D4AF37]/5 -skew-x-12"></div>
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                  <ManagementTable 
                    title="A. Proveedores de Operación Fija"
                    headers={["Servicio / Concepto", "Proveedor Responsable"]}
                    data={[
                      { c: "Vigilancia 24/7", p: "SEGURIDAD DEL SUR LTDA." },
                      { c: "Aseo Zonas Comunes", p: "CLARITA SOLUCIONES INTEGRALES" },
                      { c: "Mantenimiento Ascensores", p: "MITSUBISHI ELECTRIC" },
                      { c: "Administración", p: "ANA LUCÍA YEPEZ CÓRDOBA" },
                      { c: "Revisoría Fiscal", p: "ALFONSO BENNETH MUÑOZ" },
                      { c: "Contabilidad", p: "ANDREA DELGADO (ANTERIOR DAYRA GÓMEZ)" },
                      { c: "Jardines", p: "MAGDALY MERCEDES MAYORGA" },
                      { c: "Energía Zonas Comunes", p: "ENERTOTAL S.A. ESP" },
                      { c: "Planta Eléctrica", p: "TECNODIESEL SAS" }
                    ]}
                  />
                  <div className="space-y-8">
                    <Card title="Mantenimientos Eléctricos y Automatización" icon={Zap}>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-[10px] font-bold">
                          <div className="p-4 bg-gray-50 rounded-2xl">
                            <p className="text-[#D4AF37] font-black mb-1">ILUMINACIÓN LED:</p>
                            <p>Cambio de luminarias y reflectores (Luis H. Barrera / José F. Jojoa).</p>
                          </div>
                          <div className="p-4 bg-gray-50 rounded-2xl">
                            <p className="text-[#D4AF37] font-black mb-1">AHORRO ENERGÍA:</p>
                            <p>Instalación de sensores de movimiento en shuts, tránsito y pisos.</p>
                          </div>
                          <div className="p-4 bg-gray-50 rounded-2xl">
                            <p className="text-[#D4AF37] font-black mb-1">PUERTA VEHICULAR:</p>
                            <p>Limpieza profunda de rieles y reparación de fallas recurrentes.</p>
                          </div>
                          <div className="p-4 bg-gray-50 rounded-2xl">
                            <p className="text-[#D4AF37] font-black mb-1">CARPINTERÍA:</p>
                            <p>Mantenimiento de pasamanos y bolardos (ICOTALLA).</p>
                          </div>
                        </div>
                    </Card>
                  </div>
                </div>
              </div>

              {/* CONVIVENCIA Y GESTIÓN EXTERNA */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                <Card title="5. Convivencia y Medio Ambiente" icon={ShieldAlert}>
                  <div className="space-y-4">
                    <div className="flex gap-4 p-4 bg-red-50 rounded-2xl border border-red-100">
                      <AlertCircle className="text-red-600 shrink-0" size={20} />
                      <div>
                        <p className="text-red-600 font-black text-[11px] uppercase">Régimen Sancionatorio:</p>
                        <p className="text-[10px] font-bold text-gray-600">MULTA DE $150.000 POR PEATONES INGRESANDO POR PUERTA VEHICULAR O MAL USO DE ESPACIOS.</p>
                      </div>
                    </div>
                    <ul className="grid grid-cols-1 gap-3">
                      {[
                        "CIERRE DE SHUTS DE BASURA (DESDE 1 MAYO 2025) PARA FOMENTAR RECICLAJE.",
                        "PROHIBICIÓN DE MOTOS, BICICLETAS O MATERIALES EN PARQUEADEROS.",
                        "RETIRO DE FORROS DE ASCENSORES COMO MEDIDA DE PRESIÓN A OBRAS.",
                        "EXIGENCIA DE IDENTIFICACIÓN PARA VISITANTES Y AGENTES INMOBILIARIOS."
                      ].map((text, i) => (
                        <li key={i} className="flex gap-3 items-start text-[10px] font-black text-gray-500 uppercase">
                          <CheckCircle2 className="text-[#D4AF37] shrink-0" size={14} /> {text}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Card>

                <Card title="6. Gestión Externa y Legal" icon={Gavel}>
                  <div className="space-y-4">
                    <div className="p-5 bg-gray-900 rounded-3xl text-white">
                      <p className="text-[#D4AF37] text-[9px] font-black mb-2 tracking-widest">ACCIONES JUDICIALES:</p>
                      <p className="text-[11px] font-black leading-relaxed">ACCIÓN DE TUTELA INTERPUESTA CONTRA EL LOTE ANEXO POR PROBLEMAS DE SALUBRIDAD Y FALTA DE RESPUESTA.</p>
                    </div>
                    <div className="space-y-3">
                      {[
                        {e: "ALCALDÍA / TRÁNSITO", d: "DERECHOS DE PETICIÓN POR 'TERMINAL ILEGAL' DE TAXIS FRENTE AL EDIFICIO."},
                        {e: "EMPOPASTO / SEPAL", d: "MANTENIMIENTO DE FUENTE DE LA TRANSPARENCIA Y ARREGLO DE REJILLA EXTERNA."},
                        {e: "GESTIÓN NAVIDAD", d: "SOLICITUD DE PROHIBICIÓN DE VENTAS EN FUENTE PARA EVITAR INSEGURIDAD."}
                      ].map((item, i) => (
                        <div key={i} className="border-b border-gray-100 pb-2">
                          <p className="text-[#D4AF37] text-[9px] font-black">{item.e}:</p>
                          <p className="text-[10px] font-bold text-gray-500 uppercase">{item.d}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>
              </div>

              {/* PÓLIZA D&O DETALLADA */}
              <Card title="Póliza de Responsabilidad Civil Directivos y Administradores (D&O)" className="bg-[#1A1A1A] text-white border-none shadow-2xl overflow-hidden">
                <div className="relative z-10">
                  <div className="flex flex-col md:flex-row justify-between items-center gap-10 mb-10">
                    <div>
                        <p className="text-[#D4AF37] text-[10px] font-black tracking-[0.4em] mb-2 uppercase">Límite Agregado Anual</p>
                        <p className="text-7xl font-black tracking-tighter leading-none">$500.000.000</p>
                        <p className="text-xs font-bold text-gray-400 mt-4">PÓLIZA No. 41-01-101000229 | VIGENCIA HASTA MAYO 2026</p>
                    </div>
                    <div className="bg-white/5 p-8 rounded-[40px] border border-white/10 text-center w-full md:w-80">
                        <ShieldCheck size={48} className="text-[#D4AF37] mx-auto mb-4" />
                        <p className="text-[9px] font-black opacity-60 uppercase mb-2">Deducible Copropiedad:</p>
                        <p className="text-2xl font-black">$25.000.000</p>
                        <p className="text-[9px] font-black text-green-400 mt-2 uppercase">DEMÁS AMPAROS: SIN DEDUCIBLE</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                      {l: "DEFENSA LEGAL", v: "$50M"},
                      {l: "PRÁCTICAS LABORALES", v: "$70M"},
                      {l: "GASTOS PUBLICIDAD", v: "$50M"},
                      {l: "DEFENSA CONTAMINACIÓN", v: "$140M"}
                    ].map((item, i) => (
                      <div key={i} className="p-4 bg-white/5 rounded-2xl border border-white/5 text-center">
                        <p className="text-[#D4AF37] text-[8px] font-black mb-1 uppercase tracking-widest">{item.l}</p>
                        <p className="text-sm font-black">{item.v}</p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 p-6 bg-red-900/20 border border-red-900/30 rounded-2xl">
                    <p className="text-red-400 text-[9px] font-black mb-1 uppercase tracking-widest">Exclusiones Importantes:</p>
                    <p className="text-[10px] font-bold text-gray-400">NO CUBRE RECLAMACIONES POR CARTERA MOROSA, INCUMPLIMIENTO DE PRESUPUESTO O MULTAS GUBERNAMENTALES.</p>
                  </div>
                </div>
                <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-[#D4AF37]/10 rounded-full blur-3xl"></div>
              </Card>
            </div>
          )}        
          

          {/* SECCIÓN 7-8: FINANCIERO */}
          <div className={`${activeSection === 'financiero' ? 'block' : 'hidden'} print:block`}>
            <div className="space-y-12 animate-in fade-in">
              <SectionHeader title="7-8. Gestión Financiera 2025" icon={BarChart3} agendaIndices={[6, 7]} agendaStatus={agendaStatus} toggleAgendaItem={toggleAgendaItem} />
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 uppercase">
                <Card title="Punto 7: Revisoría Fiscal" icon={Scale} highlight className="lg:col-span-1">
                   <div className="space-y-8 pt-4">
                      <div className="flex flex-col items-center text-center gap-4 p-8 bg-gray-50 rounded-[32px] border-2 border-gray-100">
                         <ShieldCheck size={48} className="text-[#D4AF37]" />
                         <div>
                            <p className="text-[10px] font-black text-gray-400 mb-1 tracking-widest">DICTAMEN 2025</p>
                            <p className="text-sm font-black text-[#2B2B2B]">OPINIÓN LIMPIA</p>
                         </div>
                      </div>
                      <div className="p-6 border-l-4 border-[#D4AF37] bg-white text-[10px] font-bold text-gray-500 leading-relaxed italic">
                        "Los estados financieros presentan razonablemente la situación financiera del edificio Reserva Valle de Atriz a dic 31..."
                      </div>
                      <p className="text-[9px] font-black text-gray-400 text-center">ALFONSO BENNETH MUÑOZ <br/> Revisor Fiscal</p>
                   </div>
                </Card>

                <div className="lg:col-span-2 space-y-12">
                   <Card title="Punto 8: Estados Financieros" icon={Activity}>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-4">
                         <div className="p-8 bg-gray-50 rounded-[32px] border-2 border-gray-100">
                            <p className="text-[10px] font-black text-gray-400 mb-2 uppercase tracking-widest">Activos Totales</p>
                            <p className="text-2xl font-black text-[#1A1A1A]">CONSOLIDADOS</p>
                            <div className="h-1.5 w-12 bg-[#D4AF37] mt-3 rounded-full"></div>
                         </div>
                         <div className="p-8 bg-gray-50 rounded-[32px] border-2 border-gray-100">
                            <p className="text-[10px] font-black text-gray-400 mb-2 uppercase tracking-widest">Ejecución Gasto</p>
                            <p className="text-2xl font-black text-[#1A1A1A]">100.0%</p>
                            <div className="h-1.5 w-12 bg-[#D4AF37] mt-3 rounded-full"></div>
                         </div>
                         <div className="col-span-1 sm:col-span-2 p-10 bg-[#1A1A1A] rounded-[32px] text-center shadow-xl">
                            <Percent className="mx-auto text-[#D4AF37] mb-4" size={32} />
                            <p className="text-[10px] font-black text-[#D4AF37] mb-2 uppercase tracking-[0.3em]">Excedente Neto</p>
                            <p className="text-3xl font-black text-white leading-none">PARA FONDO IMPREVISTOS</p>
                            <p className="text-[9px] font-bold text-gray-500 mt-4 uppercase">Recomendado por Revisoría: Inversión en CDT</p>
                         </div>
                      </div>
                   </Card>
                </div>
              </div>
            </div>
          </div>

          {/* SECCIÓN 9: PRESUPUESTO */}
          <div className={`${activeSection === 'presupuesto' ? 'block' : 'hidden'} print:block`}>
            <div className="space-y-12 animate-in slide-in-from-bottom-10 uppercase">
              <SectionHeader title="9. Proyecto Presupuesto 2026" icon={PieChart} agendaIndices={[8]} agendaStatus={agendaStatus} toggleAgendaItem={toggleAgendaItem} />
              
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
                 <div className="lg:col-span-3 space-y-12">
                    <Card title="Propuesta Presupuestal Ejecutiva" icon={Landmark} highlight>
                       <div className="space-y-8">
                          <p className="text-sm font-bold text-gray-500 leading-relaxed uppercase tracking-tight italic">
                             Presentación del presupuesto de ingresos y gastos proyectado para la vigencia del año 2026, enfocado en el mantenimiento correctivo y la sostenibilidad del edificio.
                          </p>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                             <div className="p-8 bg-gray-50 rounded-[32px] border-2 border-gray-100 group hover:border-[#D4AF37] transition-all">
                                <DollarSign className="text-[#D4AF37] mb-4" size={28} />
                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Ingresos</p>
                                <p className="text-lg font-black text-[#1A1A1A]">COUTAS ORDINARIAS</p>
                             </div>
                             <div className="p-8 bg-gray-50 rounded-[32px] border-2 border-gray-100 group hover:border-[#D4AF37] transition-all">
                                <TrendingUp className="text-[#D4AF37] mb-4" size={28} />
                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Ajuste IPC</p>
                                <p className="text-lg font-black text-[#1A1A1A]">INCREMENTO 2026</p>
                             </div>
                             <div className="p-8 bg-gray-50 rounded-[32px] border-2 border-gray-100 group hover:border-[#D4AF37] transition-all">
                                <Settings className="text-[#D4AF37] mb-4" size={28} />
                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Gasto Op.</p>
                                <p className="text-lg font-black text-[#1A1A1A]">MITSUBISHI/SUR</p>
                             </div>
                          </div>
                       </div>
                    </Card>

                    <ManagementTable 
                      title="Estructura de Gastos Proyectados"
                      headers={["Rubro Principal", "Prioridad", "Incremento Estimado"]}
                      data={[
                        { r: "Servicio Vigilancia (24/7)", p: "ALTA", i: "SEGÚN SALARIO MÍNIMO" },
                        { r: "Servicios Públicos (Zonas Comunes)", p: "CRÍTICA", i: "AJUSTE TARIFARIO" },
                        { r: "Mantenimiento Ascensores (Full)", p: "TÉCNICA", i: "CONTRACTUAL" },
                        { r: "Fondo de Imprevistos (Legales)", p: "MANDATORIA", i: "FIJO 1%" },
                        { r: "Personal Aseo y Jardinería", p: "OPERATIVA", i: "SMMLV" },
                      ]}
                    />
                 </div>
                 
                 <div className="space-y-10">
                    <Card title="Fijación Cuota" className="bg-[#D4AF37] text-[#1A1A1A] border-none shadow-2xl scale-[1.05]">
                       <div className="text-center py-8">
                          <Wallet className="mx-auto mb-4" size={40} />
                          <p className="text-[11px] font-black uppercase mb-6 opacity-70 tracking-widest">Vigencia 2026</p>
                          <p className="text-4xl font-black mb-4 tracking-tighter">AJUSTE CUOTAS</p>
                          <div className="w-16 h-1 bg-[#1A1A1A]/30 mx-auto mb-6"></div>
                          <p className="text-[10px] font-black uppercase tracking-widest leading-relaxed">
                             Se somete a aprobación el porcentaje de incremento.
                          </p>
                       </div>
                    </Card>
                    <div className="p-12 bg-white border-2 border-gray-100 rounded-[48px] text-center shadow-lg">
                       <PieChart className="text-[#D4AF37] mb-6 mx-auto" size={48} />
                       <h4 className="text-[11px] font-black uppercase mb-4 tracking-widest">Distribución</h4>
                       <p className="text-[11px] font-bold text-gray-400 leading-loose italic uppercase">
                          "La priorización del mantenimiento preventivo asegura la valorización de su inmueble."
                       </p>
                    </div>
                 </div>
              </div>
            </div>
          </div>

          {/* SECCIÓN 10-12: ELECCIONES */}
          <div className={`${activeSection === 'elecciones' ? 'block' : 'hidden'} print:block`}>
            <div className="space-y-12 animate-in slide-in-from-right-10 uppercase">
              <SectionHeader 
                title="10-12. Elecciones 2026-2027" 
                icon={Gavel} 
                agendaIndices={[9, 10, 11]} 
                agendaStatus={agendaStatus} 
                toggleAgendaItem={toggleAgendaItem} 
              />
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* CONSEJO DE ADMINISTRACIÓN */}
                <Card title="Candidatos Consejo Administración" icon={ShieldCheck} highlight>
                  <div className="space-y-8 pt-2">
                    <div className="flex flex-wrap gap-3 min-h-[50px] p-6 bg-gray-50 rounded-[32px] border-2 border-gray-100 shadow-inner">
                      {postuladosConsejo.length === 0 && <p className="text-[9px] text-gray-400 font-black uppercase tracking-widest">No hay candidatos seleccionados</p>}
                      {postuladosConsejo.map(p => (
                        <span key={p} className="bg-[#111111] text-[#D4AF37] px-5 py-2.5 rounded-2xl text-[10px] font-black flex items-center gap-3 uppercase tracking-widest shadow-xl">
                          {p} <button onClick={() => togglePostulacion(p, 'consejo')}><Trash2 size={14} className="hover:text-red-500 transition-colors"/></button>
                        </span>
                      ))}
                    </div>
                    <div className="max-h-80 overflow-y-auto border-2 border-gray-100 rounded-[32px] divide-y text-[10px] font-bold shadow-sm">
                      {asistencia.map(r => (
                        <div key={r.id} className="flex items-center justify-between p-5 hover:bg-gray-50 transition-colors">
                          <span className="text-[#111111] font-black">{r.unidad} - {r.propietario}</span>
                          <button 
                            onClick={() => togglePostulacion(r.propietario, 'consejo')} 
                            className={`px-5 py-2.5 rounded-xl uppercase tracking-widest text-[9px] font-black transition-all ${postuladosConsejo.includes(r.propietario) ? 'bg-[#D4AF37] text-[#111111] shadow-md' : 'bg-gray-100 text-gray-400'}`}
                          >
                            {postuladosConsejo.includes(r.propietario) ? 'QUITAR' : 'POSTULAR'}
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>

                <div className="space-y-12">
                  {/* COMITÉ DE CONVIVENCIA */}
                  <Card title="Comité de Convivencia" icon={HeartPulse}>
                    <div className="space-y-8 pt-2">
                      <div className="flex flex-wrap gap-3 min-h-[50px] p-6 bg-gray-50 rounded-[32px] border-2 border-gray-100">
                        {postuladosConvivencia.length === 0 && <p className="text-[9px] text-gray-400 font-black uppercase tracking-widest">No hay candidatos seleccionados</p>}
                        {postuladosConvivencia.map(p => (
                          <span key={p} className="bg-[#D4AF37] text-[#111111] px-5 py-2.5 rounded-2xl text-[10px] font-black flex items-center gap-3 uppercase tracking-widest">
                            {p} <button onClick={() => togglePostulacion(p, 'convivencia')}><Trash2 size={14}/></button>
                          </span>
                        ))}
                      </div>
                      <div className="max-h-52 overflow-y-auto border-2 border-gray-100 rounded-[32px] divide-y text-[10px] font-bold">
                        {asistencia.map(r => (
                          <div key={r.id} className="flex items-center justify-between p-5 hover:bg-gray-50 transition-colors">
                            <span className="text-gray-700 font-black">{r.propietario}</span>
                            <button 
                              onClick={() => togglePostulacion(r.propietario, 'convivencia')} 
                              className={`px-5 py-2.5 rounded-xl uppercase font-black text-[9px] transition-all ${postuladosConvivencia.includes(r.propietario) ? 'bg-[#111111] text-[#D4AF37]' : 'bg-gray-100 text-gray-400'}`}
                            >
                              {postuladosConvivencia.includes(r.propietario) ? 'QUITAR' : 'POSTULAR'}
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </Card>

                  {/* REVISOR FISCAL - Basado en Word: Alfonso Benneth Muñoz */}
                  <Card title="Punto 12: Elección Revisor Fiscal" icon={Gavel}>
                    <div className="space-y-6 pt-4">
                      <div className="p-6 bg-gray-50 rounded-2xl border-l-4 border-[#D4AF37] mb-4">
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Actual (Informe 2025):</p>
                        [cite_start]<p className="text-xs font-black text-[#1A1A1A]">ALFONSO BENNETH MUÑOZ [cite: 15, 79]</p>
                      </div>
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block text-center">Nombre del Revisor Fiscal Seleccionado</label>
                      <input 
                        type="text" 
                        className="w-full p-8 bg-gray-50 border-2 border-gray-100 rounded-[28px] font-black uppercase text-sm focus:border-[#D4AF37] outline-none transition-all shadow-inner text-center" 
                        placeholder="Ingrese el nombre completo..." 
                        value={dignatarios.revisor} 
                        onChange={(e) => setDignatarios({...dignatarios, revisor: e.target.value})} 
                      />
                    </div>
                  </Card>
                </div>
              </div>
            </div>
          </div>

          {/* SECCIÓN 13: SOLICITUD UNIÓN DE APARTAMENTOS */}
          {activeSection === 'union' && (
            <div className="space-y-12 animate-in fade-in duration-700 uppercase">
              <SectionHeader 
                title="13. Autorización Unión de Unidades" 
                icon={Home} 
                agendaIndices={[12]} 
                agendaStatus={agendaStatus} 
                toggleAgendaItem={toggleAgendaItem} 
              />

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                <div className="lg:col-span-2 space-y-8">
                  <Card title="Detalles de la Solicitud" icon={Info} highlight>
                    <div className="space-y-6">
                      <div className="p-8 bg-gray-50 rounded-[40px] border-2 border-gray-100">
                        <p className="text-[#1A1A1A] font-black text-sm mb-4">OBJETO DEL ESTUDIO:</p>
                        <p className="text-[11px] font-bold leading-loose text-gray-500">
                          ESTUDIO Y DECISIÓN SOBRE LA SOLICITUD DE AUTORIZACIÓN PARA LA UNIÓN FÍSICA Y JURÍDICA DE DOS UNIDADES PRIVADAS DEL EDIFICIO RESERVA VALLE DE ATRIZ[cite: 105].
                        </p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="p-6 bg-white border-2 border-gray-100 rounded-3xl">
                          <p className="text-[#D4AF37] text-[9px] font-black mb-2 uppercase">REQUISITO TÉCNICO:</p>
                          <p className="text-[10px] font-bold text-gray-600 italic">PRESENTACIÓN DE PLANOS Y CONCEPTO ESTRUCTURAL QUE GARANTICE LA INTEGRIDAD DEL EDIFICIO.</p>
                        </div>
                        <div className="p-6 bg-white border-2 border-gray-100 rounded-3xl">
                          <p className="text-[#D4AF37] text-[9px] font-black mb-2 uppercase">REQUISITO LEGAL:</p>
                          <p className="text-[10px] font-bold text-gray-600 italic">MODIFICACIÓN DE ESCRITURA PÚBLICA Y AJUSTE DE COEFICIENTES EN EL REGLAMENTO.</p>
                        </div>
                      </div>
                    </div>
                  </Card>

                  {/* REGISTRO DE VOTACIÓN CON COLORES PERSISTENTES */}
                  <Card title="Registro de Decisión (Asamblea)" icon={Gavel}>
                    <div className="space-y-8">
                      <p className="text-[10px] font-black text-gray-400 text-center uppercase tracking-widest">Se requiere mayoría calificada según reglamento de copropiedad</p>
                      <div className="grid grid-cols-3 gap-6">
                        {/* BOTÓN APROBADO */}
                        <button 
                          onClick={() => setDecisionUnion('aprobado')}
                          className={`p-8 border-2 rounded-[32px] text-center transition-all duration-300 font-black text-xs ${
                            decisionUnion === 'aprobado' 
                            ? 'bg-green-500 border-green-600 text-white shadow-lg shadow-green-200 scale-105' 
                            : 'bg-green-50 border-green-100 text-green-600 hover:bg-green-100'
                          }`}
                        >
                          APROBADO
                        </button>

                        {/* BOTÓN NEGADO */}
                        <button 
                          onClick={() => setDecisionUnion('negado')}
                          className={`p-8 border-2 rounded-[32px] text-center transition-all duration-300 font-black text-xs ${
                            decisionUnion === 'negado' 
                            ? 'bg-red-500 border-red-600 text-white shadow-lg shadow-red-200 scale-105' 
                            : 'bg-red-50 border-red-100 text-red-600 hover:bg-red-100'
                          }`}
                        >
                          NEGADO
                        </button>

                        {/* BOTÓN APLAZADO */}
                        <button 
                          onClick={() => setDecisionUnion('aplazado')}
                          className={`p-8 border-2 rounded-[32px] text-center transition-all duration-300 font-black text-xs ${
                            decisionUnion === 'aplazado' 
                            ? 'bg-gray-600 border-gray-700 text-white shadow-lg shadow-gray-200 scale-105' 
                            : 'bg-gray-50 border-gray-100 text-gray-400 hover:bg-gray-200'
                          }`}
                        >
                          APLAZADO
                        </button>
                      </div>
                      
                      {decisionUnion && (
                        <p className="text-center text-[9px] font-black text-[#D4AF37] animate-pulse">
                          DECISIÓN REGISTRADA: {decisionUnion.toUpperCase()}
                        </p>
                      )}
                    </div>
                  </Card>
                </div>

                <div className="space-y-8">
                  <div className="p-10 bg-[#1A1A1A] rounded-[48px] text-white shadow-2xl border-b-8 border-[#D4AF37]">
                    <ShieldAlert className="text-[#D4AF37] mb-6" size={48} />
                    <h4 className="font-black text-lg mb-4 tracking-tighter uppercase">Marco Legal Ley 675</h4>
                    <p className="text-[10px] font-bold text-gray-400 leading-relaxed uppercase">
                      Toda reforma que afecte la estructura o los coeficientes de copropiedad debe ser aprobada por la asamblea general y elevada a escritura pública.
                    </p>
                  </div>

                  <Card title="Observaciones" icon={FileText}>
                    <textarea 
                      className="w-full p-6 bg-gray-50 border-2 border-gray-100 rounded-[24px] font-black uppercase text-[10px] h-48 focus:border-[#D4AF37] outline-none transition-all shadow-inner leading-relaxed" 
                      placeholder="REGISTRE AQUÍ LAS CONDICIONES O SALVEDADES DE LA ASAMBLEA..."
                    ></textarea>
                  </Card>
                </div>
              </div>
            </div>
          )}

          {/* SECCIÓN 14: PROPOSICIONES */}
          <div className={`${activeSection === 'proposiciones' ? 'block' : 'hidden'} print:block`}>
             <div className="space-y-12 animate-in slide-in-from-bottom-10 uppercase">
                <SectionHeader title="14. Proposiciones y Varios" icon={MessageSquare} agendaIndices={[13]} agendaStatus={agendaStatus} toggleAgendaItem={toggleAgendaItem} />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                   <Card title="Registrar Propuesta" className="md:col-span-1" highlight>
                      <div className="space-y-8 pt-4">
                         <div className="space-y-3">
                            <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest">Unidad / Inmueble</label>
                            <input type="text" className="w-full p-6 bg-gray-50 border-2 border-gray-100 rounded-[24px] font-black uppercase text-xs focus:border-[#D4AF37] outline-none transition-all shadow-inner" placeholder="Ej: Apto 205" value={tempProp.proponente} onChange={(e) => setTempProp({...tempProp, proponente: e.target.value})} />
                         </div>
                         <div className="space-y-3">
                            <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest">Descripción del Tema</label>
                            <textarea className="w-full p-6 bg-gray-50 border-2 border-gray-100 rounded-[24px] font-black uppercase text-[11px] h-48 focus:border-[#D4AF37] outline-none transition-all shadow-inner leading-relaxed" placeholder="Detalle la proposición o inquietud..." value={tempProp.texto} onChange={(e) => setTempProp({...tempProp, texto: e.target.value})}></textarea>
                         </div>
                         <button onClick={addProposicion} className="w-full bg-[#1A1A1A] text-[#D4AF37] py-6 rounded-[24px] font-black uppercase text-[11px] tracking-[0.2em] shadow-2xl hover:bg-black transition-all">Confirmar Registro</button>
                      </div>
                   </Card>
                   <Card title="Propuestas Registradas" className="md:col-span-2">
                      {proposiciones.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-32 opacity-10">
                           <MessageSquare size={80} className="mb-6" />
                           <p className="font-black text-2xl uppercase tracking-tighter">Sin registros actuales</p>
                        </div>
                      ) : (
                        <div className="space-y-6">
                           {proposiciones.map(p => (
                              <div key={p.id} className="p-8 bg-gray-50 border-2 border-gray-100 rounded-[40px] flex justify-between items-start group hover:border-[#D4AF37] hover:bg-white transition-all shadow-sm">
                                 <div>
                                    <div className="flex items-center gap-3 mb-4">
                                       <div className="h-3 w-3 rounded-full bg-[#D4AF37]"></div>
                                       <span className="text-[11px] font-black text-[#D4AF37] tracking-[0.2em] uppercase">PROPIETARIO: {p.proponente}</span>
                                    </div>
                                    <p className="text-sm font-black text-[#1A1A1A] tracking-tighter leading-relaxed uppercase">{p.texto}</p>
                                 </div>
                                 <button onClick={() => deleteProposicion(p.id)} className="text-gray-200 hover:text-red-600 transition-colors p-3 bg-white rounded-full shadow-sm hover:shadow-md"><Trash2 size={20}/></button>
                              </div>
                           ))}
                        </div>
                      )}
                   </Card>
                </div>
             </div>
          </div>

          {/* SECCIÓN FINAL */}
          <div className={`${activeSection === 'final' ? 'block' : 'hidden'} print:block`}>
            <div className="space-y-16 animate-in zoom-in-95 text-center uppercase">
              <div className="flex justify-between items-center print:hidden">
                <h2 className="text-5xl font-black text-[#2B2B2B] tracking-tighter">Finalización Sesión</h2>
                <button onClick={handlePrint} className="bg-[#1A1A1A] text-[#D4AF37] px-12 py-6 rounded-[32px] font-black flex items-center gap-5 shadow-[0_20px_50px_rgba(0,0,0,0.3)] hover:scale-105 transition-all text-xs tracking-widest">
                  <Printer size={24} /> Generar Acta Final PDF
                </button>
              </div>

              <Card className="p-24 border-t-[24px] border-[#D4AF37] print:shadow-none print:border-none print:p-0">
                <div className="hidden print:block text-center mb-24 border-b-8 border-[#1A1A1A] pb-12">
                  <h1 className="text-5xl font-black mb-4 uppercase tracking-tighter">Acta Asamblea General Ordinaria 2026</h1>
                  <p className="text-3xl font-black text-[#D4AF37] tracking-[0.6em] uppercase">Edificio Reserva Valle de Atriz</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-20 mb-32">
                  <div className="p-14 bg-gray-50 rounded-[64px] border-2 border-gray-100 shadow-inner">
                    <p className="text-[11px] font-black text-gray-400 mb-10 tracking-[0.4em] uppercase">Cierre Quórum</p>
                    <p className="text-7xl font-black text-[#1A1A1A] tracking-tighter leading-none">{totalQuorum.toFixed(3)}%</p>
                    <div className="h-2 w-16 bg-[#D4AF37] mx-auto mt-6 rounded-full"></div>
                  </div>
                  
                  <div className="space-y-12 py-8">
                    <p className="text-[11px] font-black text-gray-400 tracking-[0.4em] uppercase">Dignatarios Electos</p>
                    <div className="text-[12px] font-black space-y-10">
                       <div className="border-b-2 border-gray-100 pb-4">
                          <p className="text-[9px] text-[#D4AF37] mb-2 tracking-widest">PRESIDENTE DE ASAMBLEA:</p>
                          <p className="text-lg">{dignatarios.presidente || '___________________________'}</p>
                       </div>
                       <div className="border-b-2 border-gray-100 pb-4">
                          <p className="text-[9px] text-[#D4AF37] mb-2 tracking-widest">SECRETARIO(A) DE ASAMBLEA:</p>
                          <p className="text-lg">{dignatarios.secretario || '___________________________'}</p>
                       </div>
                    </div>
                  </div>

                  <div className="p-14 bg-[#1A1A1A] rounded-[64px] text-white shadow-2xl">
                    <p className="text-[11px] font-black text-[#D4AF37] mb-10 tracking-[0.4em] uppercase">Estado Legal</p>
                    <div className="flex flex-col items-center gap-6">
                       <ShieldCheck size={64} className="text-[#D4AF37]" />
                       <p className="text-sm font-black uppercase tracking-[0.2em]">ACTA EN TRÁMITE</p>
                       <p className="text-[10px] font-bold text-gray-500 italic uppercase">Firmas pendientes comisión</p>
                    </div>
                  </div>
                </div>

                <div className="hidden print:grid grid-cols-2 gap-60 mt-64">
                  <div className="border-t-[6px] border-[#1A1A1A] pt-10 text-center">
                    <p className="text-[11px] font-black text-gray-400 uppercase tracking-widest leading-loose">Nombre y Firma<br/> Presidente de Asamblea</p>
                  </div>
                  <div className="border-t-[6px] border-[#1A1A1A] pt-10 text-center">
                    <p className="text-[11px] font-black text-gray-400 uppercase tracking-widest leading-loose">Nombre y Firma<br/> Secretario de Asamblea</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>

        </div> {/* CIERRA max-w-6xl */}
      </main>

      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          @page { margin: 1cm; size: auto; }
          html, body { background: white !important; font-size: 11pt !important; }
          aside, header, .print\\:hidden { display: none !important; }
          main { margin-left: 0 !important; width: 100% !important; padding: 0 !important; }
          .max-w-6xl { max-width: 100% !important; width: 100% !important; }
          .Card { break-inside: avoid !important; border: 1px solid #ddd !important; border-radius: 30px !important; }
          .SectionHeader { display: block !important; border-left: 15px solid #D4AF37 !important; padding: 30px !important; background: #fafafa !important; }
          table { border-collapse: collapse !important; border: 2px solid #000 !important; }
          th { background: #1A1A1A !important; color: #D4AF37 !important; border: 1px solid #000 !important; }
          td { border: 1px solid #eee !important; padding: 15px !important; }
        }
      `}} />
    </div> 
  );
}