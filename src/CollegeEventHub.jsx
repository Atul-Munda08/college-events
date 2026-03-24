import { useState, useEffect } from "react";
import {
  Search, Calendar, MapPin, Users, Plus, X, Star, Clock, Tag,
  Menu, ArrowRight, BookOpen, Zap, Music, Trophy, Code, Palette,
  ChevronDown, Check, Bell, LogOut, LayoutDashboard, Eye, Edit,
  Trash2, ChevronLeft, Share2, Heart, Filter, ExternalLink, UserCircle
} from "lucide-react";

/* ─── Google Fonts ─────────────────────────────────────────────── */
const FontStyle = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Outfit:wght@300;400;500;600;700;800&display=swap');

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    body { font-family: 'Outfit', sans-serif; background: #FEFAF2; color: #0A1628; }

    :root {
      --cream:    #FEFAF2;
      --navy:     #0A1628;
      --saffron:  #FF6500;
      --emerald:  #00A878;
      --rose:     #FF3D6E;
      --violet:   #7C3AED;
      --amber:    #F59E0B;
      --card-bg:  #FFFFFF;
      --muted:    #64748B;
      --border:   #E8E0D0;
    }

    .bebas { font-family: 'Bebas Neue', sans-serif; letter-spacing: 0.04em; }

    /* scrollbar */
    ::-webkit-scrollbar { width: 6px; }
    ::-webkit-scrollbar-track { background: #F1EBE0; }
    ::-webkit-scrollbar-thumb { background: #FF6500; border-radius: 3px; }

    /* animations */
    @keyframes fadeUp {
      from { opacity:0; transform:translateY(24px); }
      to   { opacity:1; transform:translateY(0); }
    }
    @keyframes pulse-dot {
      0%,100% { transform:scale(1); opacity:1; }
      50%      { transform:scale(1.4); opacity:.6; }
    }
    @keyframes marquee {
      0%   { transform:translateX(0); }
      100% { transform:translateX(-50%); }
    }
    .fade-up    { animation: fadeUp .5s ease both; }
    .delay-1    { animation-delay:.08s; }
    .delay-2    { animation-delay:.16s; }
    .delay-3    { animation-delay:.24s; }
    .delay-4    { animation-delay:.32s; }

    /* ticker */
    .ticker-wrap { overflow:hidden; white-space:nowrap; }
    .ticker-inner { display:inline-block; animation:marquee 28s linear infinite; }

    /* card hover */
    .event-card {
      transition: transform .25s ease, box-shadow .25s ease;
      cursor: pointer;
    }
    .event-card:hover {
      transform: translateY(-6px);
      box-shadow: 0 20px 60px rgba(10,22,40,.14);
    }

    /* btn */
    .btn-primary {
      background: var(--saffron);
      color: #fff;
      border: none;
      border-radius: 8px;
      padding: 12px 24px;
      font-family: 'Outfit', sans-serif;
      font-weight: 700;
      font-size: 15px;
      cursor: pointer;
      transition: background .2s, transform .15s;
    }
    .btn-primary:hover { background:#e55a00; transform:scale(1.03); }

    .btn-outline {
      background: transparent;
      color: var(--navy);
      border: 2px solid var(--navy);
      border-radius: 8px;
      padding: 10px 22px;
      font-family: 'Outfit', sans-serif;
      font-weight: 600;
      font-size: 15px;
      cursor: pointer;
      transition: all .2s;
    }
    .btn-outline:hover { background:var(--navy); color:#fff; }

    /* input */
    .input-field {
      width:100%;
      padding:12px 16px;
      border:2px solid var(--border);
      border-radius:10px;
      font-family:'Outfit',sans-serif;
      font-size:15px;
      color:var(--navy);
      background:#fff;
      outline:none;
      transition:border-color .2s;
    }
    .input-field:focus { border-color:var(--saffron); }

    /* tag pill */
    .tag-pill {
      display:inline-flex; align-items:center; gap:4px;
      padding:4px 12px; border-radius:999px;
      font-size:12px; font-weight:600;
    }

    /* modal overlay */
    .modal-overlay {
      position:fixed; inset:0;
      background:rgba(10,22,40,.55);
      backdrop-filter:blur(4px);
      z-index:1000;
      display:flex; align-items:center; justify-content:center;
      padding:20px;
    }
    .modal-box {
      background:#fff;
      border-radius:20px;
      width:100%; max-width:700px;
      max-height:90vh; overflow-y:auto;
      animation:fadeUp .3s ease;
    }
    @media(max-width:640px){
      .modal-box { border-radius:16px 16px 0 0; max-height:95vh; }
      .modal-overlay { align-items:flex-end; }
    }

    /* responsive grid */
    .events-grid {
      display:grid;
      grid-template-columns:repeat(auto-fill,minmax(300px,1fr));
      gap:24px;
    }
    @media(max-width:640px){ .events-grid { grid-template-columns:1fr; } }

    .hero-grid {
      display:grid;
      grid-template-columns:1fr 1fr;
      gap:32px;
      align-items:center;
    }
    @media(max-width:768px){ .hero-grid { grid-template-columns:1fr; } }

    /* nav */
    .navbar {
      position:sticky; top:0; z-index:200;
      background:rgba(254,250,242,.9);
      backdrop-filter:blur(12px);
      border-bottom:1px solid var(--border);
    }

    /* sidebar */
    .sidebar-overlay {
      position:fixed; inset:0; z-index:300;
      background:rgba(10,22,40,.4);
      backdrop-filter:blur(2px);
    }
    .sidebar {
      position:fixed; top:0; right:0; bottom:0;
      width:300px; background:#fff;
      z-index:301; padding:32px 24px;
      box-shadow:-8px 0 40px rgba(0,0,0,.12);
      animation:fadeUp .3s ease;
    }

    /* progress bar */
    .progress-bar {
      height:6px; background:#E8E0D0; border-radius:3px; overflow:hidden;
    }
    .progress-fill {
      height:100%; background:var(--saffron);
      border-radius:3px; transition:width .4s;
    }
  `}</style>
);

/* ─── Data ──────────────────────────────────────────────────────── */
const COLLEGES = [
  "All Colleges","IIT Delhi","BITS Pilani","NIT Trichy","DTU",
  "VIT Vellore","Amity University","Manipal University","Christ University","Jadavpur University"
];

const CATS = [
  { name:"All",       icon:Star,     color:"#FF6500" },
  { name:"Tech",      icon:Code,     color:"#0EA5E9" },
  { name:"Cultural",  icon:Palette,  color:"#EC4899" },
  { name:"Sports",    icon:Trophy,   color:"#10B981" },
  { name:"Music",     icon:Music,    color:"#8B5CF6" },
  { name:"Workshop",  icon:BookOpen, color:"#F59E0B" },
  { name:"Hackathon", icon:Zap,      color:"#FF6500" },
];

const CAT_COLOR = Object.fromEntries(CATS.map(c=>[c.name,c.color]));

const EVENTS = [
  { id:1, title:"TechFest 2025 — Annual Tech Carnival", college:"IIT Delhi", category:"Hackathon", date:"2025-04-15", endDate:"2025-04-17", time:"9:00 AM", location:"Main Auditorium, IIT Delhi", description:"India's largest college tech festival featuring robotics, AI, coding competitions, and exclusive guest lectures from Google, Microsoft and OpenAI engineers. Over 1,200 participants from 50+ colleges compete for ₹10L prize pool.", organizer:"Tech Club, IIT Delhi", registrations:1240, capacity:2000, tags:["Robotics","AI","Coding","Innovation"], featured:true, price:"Free" },
  { id:2, title:"Mood Indigo — Cultural Extravaganza", college:"IIT Bombay", category:"Cultural", date:"2025-04-22", endDate:"2025-04-25", time:"10:00 AM", location:"IIT Bombay Campus", description:"Asia's largest cultural festival with 200+ events across dance, drama, fine arts, literary events, and pro-shows featuring top Bollywood artists and stand-up comedians.", organizer:"Students' Cultural Council, IITB", registrations:3200, capacity:5000, tags:["Dance","Drama","Art","Music"], featured:true, price:"₹299" },
  { id:3, title:"HackIndia 4.0 — 36-Hour Hackathon", college:"BITS Pilani", category:"Hackathon", date:"2025-05-03", endDate:"2025-05-04", time:"8:00 AM", location:"BITS Pilani, Rajasthan", description:"Build, break, and innovate over 36 sleepless hours. Tracks include HealthTech, FinTech, EdTech, and Sustainability. Cash prizes + internship offers from top startups.", organizer:"BITS Developer Circle", registrations:480, capacity:600, tags:["Web Dev","App Dev","AI/ML","Open Source"], featured:true, price:"₹150 per team" },
  { id:4, title:"SportsFiesta — Inter-College Championships", college:"VIT Vellore", category:"Sports", date:"2025-04-28", endDate:"2025-04-30", time:"7:00 AM", location:"VIT Sports Complex", description:"Multi-sport inter-college tournament featuring cricket, football, basketball, badminton, chess, and track events. Open to teams from all colleges across India.", organizer:"Sports Council, VIT", registrations:890, capacity:1500, tags:["Cricket","Football","Basketball","Athletics"], featured:false, price:"₹200 per team" },
  { id:5, title:"Electrosymphony — Music Night", college:"NIT Trichy", category:"Music", date:"2025-05-10", endDate:"2025-05-10", time:"6:00 PM", location:"Open Air Theatre, NIT Trichy", description:"A night of electric performances featuring EDM, rock, jazz and indie bands from across South India. Ends with a DJ night till midnight. Food stalls and merch available.", organizer:"Music Club, NIT Trichy", registrations:600, capacity:1000, tags:["EDM","Rock","Jazz","Live Bands"], featured:false, price:"₹99" },
  { id:6, title:"Design Thinking Bootcamp", college:"Amity University", category:"Workshop", date:"2025-05-15", endDate:"2025-05-16", time:"10:00 AM", location:"Innovation Hub, Amity Noida", description:"Hands-on 2-day bootcamp on Human-Centred Design with mentors from IDEO and Figma. Learn UX research, prototyping, and user testing. Certificate provided.", organizer:"Design Club, Amity", registrations:95, capacity:120, tags:["UI/UX","Prototyping","HCD","Figma"], featured:false, price:"₹499" },
  { id:7, title:"Robowars — Battle of the Bots", college:"DTU", category:"Tech", date:"2025-05-20", endDate:"2025-05-21", time:"9:00 AM", location:"DTU Arena", description:"Classic combat robotics championship where custom-built bots fight to survive. Weight categories: 15kg and 60kg. Teams of 4-6. Registration includes workshop access.", organizer:"Robotics Society, DTU", registrations:220, capacity:300, tags:["Robotics","Electronics","Mechanical","Combat"], featured:false, price:"₹500 per team" },
  { id:8, title:"Rangmanch — Annual Theatre Festival", college:"Jadavpur University", category:"Cultural", date:"2025-05-25", endDate:"2025-05-27", time:"5:00 PM", location:"Jadavpur University Auditorium", description:"Three-day theatre festival celebrating Bengali and national theatre traditions. Features street plays, experimental theatre, mime, and improv comedy. All in-person and live.", organizer:"Natya Samsad, JU", registrations:340, capacity:500, tags:["Theatre","Drama","Improv","Street Play"], featured:false, price:"Free" },
  { id:9, title:"E-Summit 2025 — Entrepreneurship Summit", college:"Christ University", category:"Workshop", date:"2025-06-05", endDate:"2025-06-07", time:"9:30 AM", location:"Christ University, Bangalore", description:"3-day entrepreneurship summit with keynotes from successful founders, investor panels, startup pitching competition, and networking dinners. Applications via Devfolio.", organizer:"E-Cell, Christ University", registrations:730, capacity:1000, tags:["Startup","Pitch","Networking","VC"], featured:true, price:"₹199" },
];

const formatDate = (d, e) => {
  const opts = { month:"short", day:"numeric" };
  const s = new Date(d).toLocaleDateString("en-IN", opts);
  if (e && e !== d) {
    const en = new Date(e).toLocaleDateString("en-IN", opts);
    return `${s} – ${en}`;
  }
  return s;
};

const daysLeft = (d) => {
  const diff = Math.ceil((new Date(d) - new Date()) / 864e5);
  if (diff < 0) return "Ended";
  if (diff === 0) return "Today!";
  return `${diff} days left`;
};

const pct = (r,c) => Math.round((r/c)*100);

/* ─── Subcomponents ─────────────────────────────────────────────── */
const CategoryBadge = ({ cat, small }) => {
  const color = CAT_COLOR[cat] || "#FF6500";
  return (
    <span className="tag-pill" style={{ background:`${color}18`, color }}>
      {cat}
    </span>
  );
};

const EventCard = ({ event, onClick, saved, onSave }) => {
  const fill = pct(event.registrations, event.capacity);
  const color = CAT_COLOR[event.category] || "#FF6500";
  return (
    <div className="event-card fade-up" style={{
      background:"#fff", borderRadius:16,
      border:"1px solid #E8E0D0", overflow:"hidden"
    }} onClick={onClick}>
      {/* color stripe */}
      <div style={{ height:6, background:color }} />
      <div style={{ padding:"20px 20px 8px" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:10 }}>
          <CategoryBadge cat={event.category} />
          <button onClick={e=>{e.stopPropagation();onSave(event.id);}} style={{
            background:"none", border:"none", cursor:"pointer", padding:4,
            color: saved ? "#FF3D6E" : "#CBD5E1"
          }}>
            <Heart size={18} fill={saved?"#FF3D6E":"none"} />
          </button>
        </div>
        <h3 className="bebas" style={{ fontSize:22, lineHeight:1.15, color:"#0A1628", marginBottom:8 }}>
          {event.title}
        </h3>
        <p style={{ fontSize:13, color:"#64748B", marginBottom:14 }}>
          {event.description.slice(0,90)}…
        </p>
        <div style={{ display:"flex", flexDirection:"column", gap:6, marginBottom:14 }}>
          <div style={{ display:"flex", alignItems:"center", gap:6, fontSize:13, color:"#64748B" }}>
            <Calendar size={14} color={color} />
            <span>{formatDate(event.date, event.endDate)}, {event.time}</span>
          </div>
          <div style={{ display:"flex", alignItems:"center", gap:6, fontSize:13, color:"#64748B" }}>
            <MapPin size={14} color={color} />
            <span style={{ overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{event.location}</span>
          </div>
          <div style={{ display:"flex", alignItems:"center", gap:6, fontSize:13, color:"#64748B" }}>
            <Users size={14} color={color} />
            <span>{event.registrations.toLocaleString()} registered</span>
          </div>
        </div>
        {/* progress */}
        <div style={{ marginBottom:14 }}>
          <div style={{ display:"flex", justifyContent:"space-between", fontSize:12, color:"#94A3B8", marginBottom:4 }}>
            <span>{fill}% filled</span>
            <span style={{ color: fill>80?"#EF4444":"#64748B" }}>{event.capacity - event.registrations} spots left</span>
          </div>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width:`${fill}%`, background:fill>80?"#EF4444":color }} />
          </div>
        </div>
      </div>
      <div style={{ padding:"12px 20px 18px", borderTop:"1px solid #F1EBE0", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
        <div style={{ display:"flex", flexDirection:"column" }}>
          <span style={{ fontSize:11, color:"#94A3B8", fontWeight:500 }}>HOST</span>
          <span style={{ fontSize:13, color:"#0A1628", fontWeight:600 }}>{event.college}</span>
        </div>
        <div style={{ display:"flex", alignItems:"center", gap:8 }}>
          <span style={{ fontSize:13, fontWeight:700, color:event.price==="Free"?"#10B981":"#0A1628" }}>{event.price}</span>
          <div style={{ background:"#0A1628", borderRadius:8, padding:"6px 14px", color:"#fff", fontSize:13, fontWeight:600 }}>
            View →
          </div>
        </div>
      </div>
    </div>
  );
};

/* ─── Event Detail Modal ────────────────────────────────────────── */
const EventModal = ({ event, onClose, registered, onRegister, saved, onSave }) => {
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name:"", email:"", college:"", phone:"" });
  const [done, setDone] = useState(false);
  const color = CAT_COLOR[event.category] || "#FF6500";
  const fill = pct(event.registrations, event.capacity);

  const handleSubmit = () => {
    if (!form.name || !form.email) return;
    onRegister(event.id);
    setDone(true);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={e=>e.stopPropagation()}>
        {/* top bar */}
        <div style={{ height:8, background:color, borderRadius:"20px 20px 0 0" }} />
        <div style={{ padding:"24px 28px" }}>
          {/* header */}
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:16 }}>
            <CategoryBadge cat={event.category} />
            <div style={{ display:"flex", gap:8 }}>
              <button onClick={()=>onSave(event.id)} style={{ background:"none", border:"none", cursor:"pointer", color:saved?"#FF3D6E":"#CBD5E1" }}>
                <Heart size={20} fill={saved?"#FF3D6E":"none"} />
              </button>
              <button onClick={onClose} style={{ background:"#F1F5F9", border:"none", borderRadius:8, padding:6, cursor:"pointer", color:"#64748B" }}>
                <X size={18} />
              </button>
            </div>
          </div>

          <h2 className="bebas" style={{ fontSize:34, lineHeight:1.1, color:"#0A1628", marginBottom:12 }}>{event.title}</h2>

          {/* meta row */}
          <div style={{ display:"flex", flexWrap:"wrap", gap:16, marginBottom:20 }}>
            {[
              { icon:Calendar, text:`${formatDate(event.date,event.endDate)}, ${event.time}` },
              { icon:MapPin,   text:event.location },
              { icon:Users,    text:`${event.registrations.toLocaleString()} / ${event.capacity.toLocaleString()} registered` },
              { icon:Tag,      text:event.price },
            ].map(({ icon:Icon, text }, i) => (
              <div key={i} style={{ display:"flex", alignItems:"center", gap:6, fontSize:14, color:"#475569" }}>
                <Icon size={15} color={color} />{text}
              </div>
            ))}
          </div>

          {/* deadline badge */}
          <div style={{ background:`${color}14`, borderRadius:10, padding:"10px 16px", marginBottom:20, display:"inline-flex", alignItems:"center", gap:8 }}>
            <Clock size={15} color={color} />
            <span style={{ fontSize:14, fontWeight:700, color }}>{daysLeft(event.date)}</span>
          </div>

          <p style={{ fontSize:15, color:"#475569", lineHeight:1.7, marginBottom:20 }}>{event.description}</p>

          {/* tags */}
          <div style={{ display:"flex", flexWrap:"wrap", gap:8, marginBottom:24 }}>
            {event.tags.map(t=>(
              <span key={t} style={{ padding:"4px 12px", background:"#F1F5F9", borderRadius:999, fontSize:13, color:"#475569", fontWeight:500 }}>{t}</span>
            ))}
          </div>

          {/* capacity */}
          <div style={{ marginBottom:24 }}>
            <div style={{ display:"flex", justifyContent:"space-between", fontSize:13, color:"#94A3B8", marginBottom:6 }}>
              <span>Capacity: {fill}% filled</span>
              <span style={{ color:fill>80?"#EF4444":"#64748B", fontWeight:600 }}>{event.capacity-event.registrations} spots remaining</span>
            </div>
            <div className="progress-bar" style={{ height:10 }}>
              <div className="progress-fill" style={{ width:`${fill}%`, background:fill>80?"#EF4444":color }} />
            </div>
          </div>

          <div style={{ background:"#F8FAFC", borderRadius:12, padding:"14px 18px", marginBottom:24, display:"flex", justifyContent:"space-between" }}>
            <div>
              <div style={{ fontSize:12, color:"#94A3B8", fontWeight:500 }}>ORGANIZED BY</div>
              <div style={{ fontSize:15, fontWeight:700, color:"#0A1628" }}>{event.organizer}</div>
            </div>
            <div>
              <div style={{ fontSize:12, color:"#94A3B8", fontWeight:500 }}>HOST COLLEGE</div>
              <div style={{ fontSize:15, fontWeight:700, color:"#0A1628" }}>{event.college}</div>
            </div>
          </div>

          {/* registration */}
          {done || registered ? (
            <div style={{ background:"#D1FAE5", borderRadius:12, padding:"18px", textAlign:"center" }}>
              <Check size={28} color="#059669" style={{ margin:"0 auto 8px" }} />
              <div style={{ fontSize:18, fontWeight:700, color:"#065F46" }}>You're registered!</div>
              <div style={{ fontSize:14, color:"#047857" }}>Check your email for confirmation details.</div>
            </div>
          ) : !showForm ? (
            <div style={{ display:"flex", gap:12 }}>
              <button className="btn-primary" style={{ flex:1 }} onClick={()=>setShowForm(true)}>
                Register Now — {event.price}
              </button>
              <button style={{ background:"#F1F5F9", border:"none", borderRadius:8, padding:"0 16px", cursor:"pointer", color:"#64748B" }}>
                <Share2 size={18} />
              </button>
            </div>
          ) : (
            <div style={{ animation:"fadeUp .3s ease" }}>
              <h4 style={{ fontWeight:700, marginBottom:16, color:"#0A1628" }}>Registration Details</h4>
              <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
                {[
                  { key:"name",    label:"Full Name *",     type:"text",  ph:"Your full name" },
                  { key:"email",   label:"Email *",         type:"email", ph:"your@email.com" },
                  { key:"college", label:"Your College",    type:"text",  ph:"College name" },
                  { key:"phone",   label:"Phone Number",    type:"tel",   ph:"+91 XXXXX XXXXX" },
                ].map(({ key, label, type, ph })=>(
                  <div key={key}>
                    <label style={{ fontSize:13, fontWeight:600, color:"#475569", display:"block", marginBottom:6 }}>{label}</label>
                    <input className="input-field" type={type} placeholder={ph}
                      value={form[key]} onChange={e=>setForm(p=>({...p,[key]:e.target.value}))} />
                  </div>
                ))}
                <div style={{ display:"flex", gap:12, marginTop:4 }}>
                  <button className="btn-outline" style={{ flex:1 }} onClick={()=>setShowForm(false)}>Back</button>
                  <button className="btn-primary" style={{ flex:2 }} onClick={handleSubmit}>Confirm Registration</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

/* ─── Post Event Form ───────────────────────────────────────────── */
const PostEventForm = ({ onClose, onSubmit }) => {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    title:"", college:"", category:"Tech", date:"", endDate:"", time:"",
    location:"", description:"", organizer:"", capacity:100, price:"Free",
    tags:"",
  });

  const set = (k,v) => setForm(p=>({...p,[k]:v}));
  const TOTAL = 3;

  const step1 = (
    <div style={{ display:"flex",flexDirection:"column",gap:16 }}>
      <div>
        <label style={{ fontSize:13,fontWeight:600,color:"#475569",display:"block",marginBottom:6 }}>Event Title *</label>
        <input className="input-field" placeholder="e.g. TechFest 2025" value={form.title} onChange={e=>set("title",e.target.value)} />
      </div>
      <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:16 }}>
        <div>
          <label style={{ fontSize:13,fontWeight:600,color:"#475569",display:"block",marginBottom:6 }}>Host College *</label>
          <select className="input-field" value={form.college} onChange={e=>set("college",e.target.value)}>
            <option value="">Select college</option>
            {COLLEGES.slice(1).map(c=><option key={c}>{c}</option>)}
          </select>
        </div>
        <div>
          <label style={{ fontSize:13,fontWeight:600,color:"#475569",display:"block",marginBottom:6 }}>Category *</label>
          <select className="input-field" value={form.category} onChange={e=>set("category",e.target.value)}>
            {CATS.slice(1).map(c=><option key={c.name}>{c.name}</option>)}
          </select>
        </div>
      </div>
      <div>
        <label style={{ fontSize:13,fontWeight:600,color:"#475569",display:"block",marginBottom:6 }}>Organizer / Club Name *</label>
        <input className="input-field" placeholder="e.g. Tech Club, IIT Delhi" value={form.organizer} onChange={e=>set("organizer",e.target.value)} />
      </div>
    </div>
  );

  const step2 = (
    <div style={{ display:"flex",flexDirection:"column",gap:16 }}>
      <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:16 }}>
        <div>
          <label style={{ fontSize:13,fontWeight:600,color:"#475569",display:"block",marginBottom:6 }}>Start Date *</label>
          <input className="input-field" type="date" value={form.date} onChange={e=>set("date",e.target.value)} />
        </div>
        <div>
          <label style={{ fontSize:13,fontWeight:600,color:"#475569",display:"block",marginBottom:6 }}>End Date</label>
          <input className="input-field" type="date" value={form.endDate} onChange={e=>set("endDate",e.target.value)} />
        </div>
      </div>
      <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:16 }}>
        <div>
          <label style={{ fontSize:13,fontWeight:600,color:"#475569",display:"block",marginBottom:6 }}>Start Time *</label>
          <input className="input-field" type="time" value={form.time} onChange={e=>set("time",e.target.value)} />
        </div>
        <div>
          <label style={{ fontSize:13,fontWeight:600,color:"#475569",display:"block",marginBottom:6 }}>Capacity *</label>
          <input className="input-field" type="number" placeholder="e.g. 500" value={form.capacity} onChange={e=>set("capacity",e.target.value)} />
        </div>
      </div>
      <div>
        <label style={{ fontSize:13,fontWeight:600,color:"#475569",display:"block",marginBottom:6 }}>Venue / Location *</label>
        <input className="input-field" placeholder="Building/Area, College Name, City" value={form.location} onChange={e=>set("location",e.target.value)} />
      </div>
      <div>
        <label style={{ fontSize:13,fontWeight:600,color:"#475569",display:"block",marginBottom:6 }}>Registration Fee</label>
        <input className="input-field" placeholder="e.g. Free / ₹299 / ₹150 per team" value={form.price} onChange={e=>set("price",e.target.value)} />
      </div>
    </div>
  );

  const step3 = (
    <div style={{ display:"flex",flexDirection:"column",gap:16 }}>
      <div>
        <label style={{ fontSize:13,fontWeight:600,color:"#475569",display:"block",marginBottom:6 }}>Event Description *</label>
        <textarea className="input-field" rows={5} placeholder="Describe your event — what to expect, competitions, prizes, guest speakers..." value={form.description} onChange={e=>set("description",e.target.value)} style={{ resize:"vertical" }} />
      </div>
      <div>
        <label style={{ fontSize:13,fontWeight:600,color:"#475569",display:"block",marginBottom:6 }}>Tags (comma-separated)</label>
        <input className="input-field" placeholder="e.g. Robotics, AI, Coding" value={form.tags} onChange={e=>set("tags",e.target.value)} />
      </div>
      <div style={{ background:"#F0FDF4",borderRadius:12,padding:"16px 18px" }}>
        <div style={{ fontWeight:700,color:"#065F46",marginBottom:8 }}>Preview</div>
        <div style={{ fontSize:14,color:"#047857",lineHeight:1.6 }}>
          <strong>{form.title || "Event Title"}</strong> by {form.organizer || "Organizer"}<br/>
          📅 {form.date ? formatDate(form.date, form.endDate) : "Date TBD"} • {form.category}<br/>
          📍 {form.location || "Location TBD"} • {form.price || "Free"}
        </div>
      </div>
    </div>
  );

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={e=>e.stopPropagation()} style={{ maxWidth:600 }}>
        <div style={{ padding:"28px 28px 24px" }}>
          <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8 }}>
            <h2 className="bebas" style={{ fontSize:30,color:"#0A1628" }}>Post an Event</h2>
            <button onClick={onClose} style={{ background:"#F1F5F9",border:"none",borderRadius:8,padding:6,cursor:"pointer",color:"#64748B" }}>
              <X size={18} />
            </button>
          </div>
          {/* stepper */}
          <div style={{ display:"flex",gap:8,marginBottom:28 }}>
            {["Basic Info","Date & Venue","Description"].map((s,i)=>(
              <div key={s} style={{ flex:1,textAlign:"center" }}>
                <div style={{ height:4,borderRadius:2,background:i<step?"#FF6500":"#E8E0D0",marginBottom:4,transition:"background .3s" }} />
                <span style={{ fontSize:11,fontWeight:600,color:i<step?"#FF6500":"#94A3B8" }}>Step {i+1}</span>
              </div>
            ))}
          </div>
          {step===1 && step1}
          {step===2 && step2}
          {step===3 && step3}
          <div style={{ display:"flex",gap:12,marginTop:24 }}>
            {step>1 && <button className="btn-outline" style={{ flex:1 }} onClick={()=>setStep(s=>s-1)}>← Back</button>}
            {step<TOTAL
              ? <button className="btn-primary" style={{ flex:2 }} onClick={()=>setStep(s=>s+1)}>Continue →</button>
              : <button className="btn-primary" style={{ flex:2 }} onClick={()=>{ onSubmit(form); onClose(); }}>🚀 Publish Event</button>
            }
          </div>
        </div>
      </div>
    </div>
  );
};

/* ─── Organizer Dashboard ───────────────────────────────────────── */
const Dashboard = ({ events, onBack, savedEvents }) => {
  const myEvents = events.slice(0,3);
  return (
    <div style={{ minHeight:"100vh",background:"#FEFAF2",padding:"32px 24px",maxWidth:900,margin:"0 auto" }}>
      <button onClick={onBack} style={{ background:"none",border:"none",cursor:"pointer",color:"#64748B",display:"flex",alignItems:"center",gap:6,marginBottom:24,fontFamily:"Outfit",fontSize:14 }}>
        <ChevronLeft size={16} /> Back to Events
      </button>
      <h1 className="bebas" style={{ fontSize:44,color:"#0A1628",marginBottom:4 }}>Organizer Dashboard</h1>
      <p style={{ color:"#64748B",marginBottom:32 }}>Manage your events and track registrations.</p>

      {/* stats row */}
      <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(180px,1fr))",gap:16,marginBottom:40 }}>
        {[
          { label:"Total Events",     value:"3",    color:"#FF6500", sub:"Posted by you" },
          { label:"Total Registered", value:"1,940",color:"#0EA5E9", sub:"Across all events" },
          { label:"Saved Events",     value:savedEvents.size, color:"#EC4899", sub:"In your wishlist" },
          { label:"Upcoming",         value:"3",    color:"#10B981", sub:"Events live" },
        ].map(({ label,value,color,sub })=>(
          <div key={label} style={{ background:"#fff",borderRadius:16,padding:"20px",border:"1px solid #E8E0D0" }}>
            <div style={{ fontSize:32,fontWeight:800,color,marginBottom:2 }}>{value}</div>
            <div style={{ fontSize:14,fontWeight:600,color:"#0A1628" }}>{label}</div>
            <div style={{ fontSize:12,color:"#94A3B8",marginTop:2 }}>{sub}</div>
          </div>
        ))}
      </div>

      <h2 style={{ fontSize:20,fontWeight:700,color:"#0A1628",marginBottom:16 }}>Your Events</h2>
      <div style={{ display:"flex",flexDirection:"column",gap:12 }}>
        {myEvents.map(ev=>{
          const fill = pct(ev.registrations,ev.capacity);
          const color = CAT_COLOR[ev.category]||"#FF6500";
          return (
            <div key={ev.id} style={{ background:"#fff",borderRadius:16,border:"1px solid #E8E0D0",padding:"20px 24px",display:"flex",flexWrap:"wrap",gap:16,alignItems:"center" }}>
              <div style={{ flex:1,minWidth:200 }}>
                <div style={{ display:"flex",gap:8,alignItems:"center",marginBottom:4 }}>
                  <CategoryBadge cat={ev.category} />
                  <span style={{ fontSize:12,color:daysLeft(ev.date)==="Ended"?"#EF4444":"#10B981",fontWeight:600 }}>{daysLeft(ev.date)}</span>
                </div>
                <div style={{ fontWeight:700,fontSize:16,color:"#0A1628" }}>{ev.title}</div>
                <div style={{ fontSize:13,color:"#64748B" }}>{formatDate(ev.date,ev.endDate)}</div>
              </div>
              <div style={{ display:"flex",flexDirection:"column",alignItems:"flex-end",gap:8,minWidth:180 }}>
                <div style={{ fontSize:13,color:"#475569" }}>{ev.registrations}/{ev.capacity} registered</div>
                <div className="progress-bar" style={{ width:180 }}>
                  <div className="progress-fill" style={{ width:`${fill}%`,background:fill>80?"#EF4444":color }} />
                </div>
              </div>
              <div style={{ display:"flex",gap:8 }}>
                <button style={{ background:"#F1F5F9",border:"none",borderRadius:8,padding:"8px 12px",cursor:"pointer",color:"#64748B",display:"flex",gap:6,alignItems:"center",fontSize:13 }}>
                  <Edit size={14} /> Edit
                </button>
                <button style={{ background:"#FEF2F2",border:"none",borderRadius:8,padding:"8px 12px",cursor:"pointer",color:"#EF4444",display:"flex",gap:6,alignItems:"center",fontSize:13 }}>
                  <Trash2 size={14} /> Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

/* ─── Main App ──────────────────────────────────────────────────── */
export default function App() {
  const [view, setView]               = useState("home");
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showPost, setShowPost]       = useState(false);
  const [search, setSearch]           = useState("");
  const [filterCat, setFilterCat]     = useState("All");
  const [filterCollege, setFilterCollege] = useState("All Colleges");
  const [events, setEvents]           = useState(EVENTS);
  const [registered, setRegistered]   = useState(new Set());
  const [saved, setSaved]             = useState(new Set());
  const [mobileMenu, setMobileMenu]   = useState(false);
  const [toast, setToast]             = useState(null);
  const [successBanner, setSuccessBanner] = useState(false);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(()=>setToast(null),3000);
  };

  const filtered = events.filter(ev => {
    const matchSearch = ev.title.toLowerCase().includes(search.toLowerCase())
      || ev.college.toLowerCase().includes(search.toLowerCase())
      || ev.description.toLowerCase().includes(search.toLowerCase());
    const matchCat = filterCat==="All" || ev.category===filterCat;
    const matchCollege = filterCollege==="All Colleges" || ev.college===filterCollege;
    return matchSearch && matchCat && matchCollege;
  });

  const featured = events.filter(e=>e.featured);

  const handleRegister = (id) => {
    setRegistered(p=>new Set([...p,id]));
    showToast("🎉 Registered successfully! Check your email.");
  };

  const handleSave = (id) => {
    setSaved(p=>{
      const n=new Set(p);
      if(n.has(id)){ n.delete(id); showToast("Removed from wishlist"); }
      else { n.add(id); showToast("💛 Added to wishlist"); }
      return n;
    });
  };

  const handlePostSubmit = (form) => {
    const newEvent = {
      id: Date.now(),
      title: form.title,
      college: form.college,
      category: form.category,
      date: form.date,
      endDate: form.endDate,
      time: form.time,
      location: form.location,
      description: form.description,
      organizer: form.organizer,
      registrations: 0,
      capacity: parseInt(form.capacity)||100,
      tags: form.tags.split(",").map(t=>t.trim()).filter(Boolean),
      featured: false,
      price: form.price||"Free",
    };
    setEvents(p=>[newEvent,...p]);
    setSuccessBanner(true);
    setTimeout(()=>setSuccessBanner(false),4000);
    showToast("🚀 Event published successfully!");
  };

  if(view==="dashboard") return (
    <>
      <FontStyle />
      <Dashboard events={events} onBack={()=>setView("home")} savedEvents={saved} />
    </>
  );

  return (
    <>
      <FontStyle />

      {/* Toast */}
      {toast && (
        <div style={{
          position:"fixed",bottom:32,left:"50%",transform:"translateX(-50%)",
          background:"#0A1628",color:"#fff",padding:"12px 24px",borderRadius:12,
          fontSize:15,fontWeight:600,zIndex:9999,whiteSpace:"nowrap",
          boxShadow:"0 8px 32px rgba(0,0,0,.25)",animation:"fadeUp .3s ease"
        }}>{toast}</div>
      )}

      {/* Success Banner */}
      {successBanner && (
        <div style={{ background:"#D1FAE5",borderBottom:"1px solid #A7F3D0",padding:"12px 24px",textAlign:"center",color:"#065F46",fontWeight:600,fontSize:15 }}>
          ✅ Your event has been published and is now live!
        </div>
      )}

      {/* Mobile menu */}
      {mobileMenu && (
        <>
          <div className="sidebar-overlay" onClick={()=>setMobileMenu(false)} />
          <div className="sidebar">
            <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:32 }}>
              <span className="bebas" style={{ fontSize:24,color:"#FF6500" }}>CollegeEvents</span>
              <button onClick={()=>setMobileMenu(false)} style={{ background:"none",border:"none",cursor:"pointer" }}><X size={20} /></button>
            </div>
            {["Discover","My Wishlist","Dashboard"].map(item=>(
              <button key={item} onClick={()=>{ setMobileMenu(false); if(item==="Dashboard") setView("dashboard"); }} style={{
                display:"block",width:"100%",textAlign:"left",padding:"14px 0",
                background:"none",border:"none",borderBottom:"1px solid #F1EBE0",
                fontFamily:"Outfit",fontSize:16,fontWeight:600,color:"#0A1628",cursor:"pointer"
              }}>{item}</button>
            ))}
            <button className="btn-primary" style={{ width:"100%",marginTop:24 }} onClick={()=>{ setMobileMenu(false); setShowPost(true); }}>
              + Post Event
            </button>
          </div>
        </>
      )}

      {/* Navbar */}
      <nav className="navbar">
        <div style={{ maxWidth:1200,margin:"0 auto",padding:"0 24px",height:64,display:"flex",alignItems:"center",justifyContent:"space-between" }}>
          <button onClick={()=>setView("home")} className="bebas" style={{ fontSize:26,color:"#FF6500",background:"none",border:"none",cursor:"pointer" }}>
            College<span style={{ color:"#0A1628" }}>Events</span>
          </button>
          {/* desktop nav */}
          <div style={{ display:"flex",gap:32,alignItems:"center" }}>
            <button onClick={()=>setView("events")} style={{ background:"none",border:"none",fontFamily:"Outfit",fontWeight:600,fontSize:15,cursor:"pointer",color:view==="events"?"#FF6500":"#64748B" }}>Discover</button>
            <button onClick={()=>setView("dashboard")} style={{ background:"none",border:"none",fontFamily:"Outfit",fontWeight:600,fontSize:15,cursor:"pointer",color:"#64748B",display:"flex",alignItems:"center",gap:6 }}>
              <LayoutDashboard size={16} /> Dashboard
            </button>
            <div style={{ position:"relative" }}>
              <button onClick={()=>setView("saved")} style={{ background:"none",border:"none",fontFamily:"Outfit",fontWeight:600,fontSize:15,cursor:"pointer",color:"#64748B",display:"flex",alignItems:"center",gap:6 }}>
                <Heart size={16} /> Saved {saved.size>0&&<span style={{ background:"#FF3D6E",color:"#fff",borderRadius:999,fontSize:11,fontWeight:700,padding:"1px 6px" }}>{saved.size}</span>}
              </button>
            </div>
            <button className="btn-primary" onClick={()=>setShowPost(true)} style={{ display:"flex",alignItems:"center",gap:6,padding:"9px 18px",fontSize:14 }}>
              <Plus size={16} /> Post Event
            </button>
          </div>
          <button onClick={()=>setMobileMenu(true)} style={{ display:"none",background:"none",border:"none",cursor:"pointer",color:"#0A1628" }} className="mobile-menu-btn">
            <Menu size={24} />
          </button>
        </div>
      </nav>

      {/* TICKER */}
      <div style={{ background:"#FF6500",color:"#fff",padding:"8px 0",overflow:"hidden" }}>
        <div className="ticker-wrap">
          <div className="ticker-inner">
            {[...events,...events].map((e,i)=>(
              <span key={i} style={{ marginRight:48,fontSize:13,fontWeight:600 }}>
                🎓 {e.title} — {e.college} &nbsp;•
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── HOME VIEW ── */}
      {(view==="home"||view==="saved") && (
        <div>
          {/* Hero */}
          {view==="home" && (
            <section style={{ background:"linear-gradient(135deg,#0A1628 0%,#1A2D50 100%)",color:"#fff",padding:"72px 24px 80px",position:"relative",overflow:"hidden" }}>
              {/* decorative circles */}
              <div style={{ position:"absolute",top:-80,right:-80,width:400,height:400,borderRadius:"50%",background:"rgba(255,101,0,.12)",pointerEvents:"none" }} />
              <div style={{ position:"absolute",bottom:-60,left:"30%",width:300,height:300,borderRadius:"50%",background:"rgba(0,168,120,.08)",pointerEvents:"none" }} />
              <div style={{ maxWidth:1200,margin:"0 auto" }}>
                <div className="hero-grid">
                  <div>
                    <div style={{ display:"inline-flex",alignItems:"center",gap:8,background:"rgba(255,101,0,.2)",borderRadius:999,padding:"6px 14px",marginBottom:24 }}>
                      <span style={{ width:8,height:8,borderRadius:"50%",background:"#FF6500",animation:"pulse-dot 1.5s infinite",display:"inline-block" }} />
                      <span style={{ fontSize:13,fontWeight:600,color:"#FF6500" }}>{events.length} Events Live Now</span>
                    </div>
                    <h1 className="bebas" style={{ fontSize:"clamp(48px,8vw,88px)",lineHeight:1,marginBottom:20 }}>
                      Discover<br/><span style={{ color:"#FF6500" }}>College</span><br/>Events
                    </h1>
                    <p style={{ fontSize:18,color:"#94A3B8",lineHeight:1.6,maxWidth:480,marginBottom:32 }}>
                      Find tech fests, hackathons, cultural events, sports tournaments and workshops across India's top colleges — all in one place.
                    </p>
                    <div style={{ display:"flex",gap:12,flexWrap:"wrap" }}>
                      <button className="btn-primary" style={{ fontSize:16,padding:"14px 28px" }} onClick={()=>setView("events")}>
                        Explore Events →
                      </button>
                      <button onClick={()=>setShowPost(true)} style={{ background:"rgba(255,255,255,.1)",border:"1px solid rgba(255,255,255,.2)",color:"#fff",borderRadius:8,padding:"14px 28px",fontFamily:"Outfit",fontWeight:600,fontSize:16,cursor:"pointer",transition:"background .2s" }}>
                        + Post Your Event
                      </button>
                    </div>
                    {/* quick stats */}
                    <div style={{ display:"flex",gap:32,marginTop:44,flexWrap:"wrap" }}>
                      {[["50+","Colleges"],["200+","Events/Year"],["10K+","Registrations"]].map(([n,l])=>(
                        <div key={l}>
                          <div className="bebas" style={{ fontSize:36,color:"#FF6500" }}>{n}</div>
                          <div style={{ fontSize:14,color:"#64748B" }}>{l}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                  {/* featured card preview */}
                  <div style={{ display:"flex",flexDirection:"column",gap:16 }}>
                    {featured.slice(0,2).map((ev,i)=>{
                      const color=CAT_COLOR[ev.category]||"#FF6500";
                      return (
                        <div key={ev.id} className={`fade-up delay-${i+2}`} onClick={()=>setSelectedEvent(ev)} style={{
                          background:"rgba(255,255,255,.07)",backdropFilter:"blur(12px)",
                          border:"1px solid rgba(255,255,255,.1)",borderRadius:16,padding:"18px 20px",cursor:"pointer",
                          transition:"background .2s"
                        }}>
                          <div style={{ display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:8 }}>
                            <CategoryBadge cat={ev.category} />
                            <span style={{ fontSize:12,fontWeight:600,color:"#FF6500" }}>{daysLeft(ev.date)}</span>
                          </div>
                          <div style={{ fontWeight:700,fontSize:17,marginBottom:4 }}>{ev.title}</div>
                          <div style={{ fontSize:13,color:"#94A3B8" }}>{ev.college} • {formatDate(ev.date,ev.endDate)}</div>
                          <div style={{ marginTop:12,height:4,background:"rgba(255,255,255,.1)",borderRadius:2 }}>
                            <div style={{ height:"100%",width:`${pct(ev.registrations,ev.capacity)}%`,background:color,borderRadius:2 }} />
                          </div>
                          <div style={{ fontSize:12,color:"#64748B",marginTop:4 }}>{ev.registrations.toLocaleString()} registered</div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Saved events view */}
          {view==="saved" && (
            <div style={{ maxWidth:1200,margin:"40px auto",padding:"0 24px" }}>
              <h2 className="bebas" style={{ fontSize:40,color:"#0A1628",marginBottom:4 }}>My Wishlist</h2>
              <p style={{ color:"#64748B",marginBottom:28 }}>Events you've saved to attend later.</p>
              {saved.size===0 ? (
                <div style={{ textAlign:"center",padding:"80px 0",color:"#94A3B8" }}>
                  <Heart size={48} style={{ margin:"0 auto 16px",opacity:.3 }} />
                  <div style={{ fontSize:20,fontWeight:600 }}>No saved events yet</div>
                  <div style={{ fontSize:15,marginBottom:24 }}>Browse events and tap the heart icon to save them.</div>
                  <button className="btn-primary" onClick={()=>setView("events")}>Browse Events →</button>
                </div>
              ) : (
                <div className="events-grid">
                  {events.filter(e=>saved.has(e.id)).map((ev,i)=>(
                    <div key={ev.id} className={`delay-${i%4+1}`}>
                      <EventCard event={ev} onClick={()=>setSelectedEvent(ev)} saved={saved.has(ev.id)} onSave={handleSave} />
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Categories section */}
          {view==="home" && (
            <section style={{ maxWidth:1200,margin:"0 auto",padding:"60px 24px 0" }}>
              <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:28 }}>
                <h2 className="bebas" style={{ fontSize:40,color:"#0A1628" }}>Browse by Category</h2>
                <button onClick={()=>setView("events")} style={{ background:"none",border:"none",cursor:"pointer",color:"#FF6500",fontFamily:"Outfit",fontWeight:700,fontSize:15,display:"flex",alignItems:"center",gap:4 }}>
                  View all <ArrowRight size={16} />
                </button>
              </div>
              <div style={{ display:"flex",gap:12,flexWrap:"wrap" }}>
                {CATS.slice(1).map(({ name,icon:Icon,color })=>(
                  <button key={name} onClick={()=>{ setFilterCat(name); setView("events"); }} style={{
                    display:"flex",alignItems:"center",gap:10,padding:"14px 22px",
                    background:"#fff",borderRadius:14,border:`1px solid #E8E0D0`,cursor:"pointer",
                    transition:"all .2s",fontFamily:"Outfit",fontWeight:700,fontSize:15,color:"#0A1628",
                  }}
                  onMouseEnter={e=>{ e.currentTarget.style.background=color+"18"; e.currentTarget.style.borderColor=color; }}
                  onMouseLeave={e=>{ e.currentTarget.style.background="#fff"; e.currentTarget.style.borderColor="#E8E0D0"; }}>
                    <Icon size={18} color={color} />{name}
                  </button>
                ))}
              </div>
            </section>
          )}

          {/* Featured events */}
          {view==="home" && (
            <section style={{ maxWidth:1200,margin:"0 auto",padding:"56px 24px" }}>
              <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:28 }}>
                <div>
                  <h2 className="bebas" style={{ fontSize:40,color:"#0A1628",marginBottom:4 }}>Featured Events</h2>
                  <p style={{ color:"#64748B",fontSize:15 }}>Hand-picked events happening soon</p>
                </div>
                <button onClick={()=>setView("events")} style={{ background:"none",border:"none",cursor:"pointer",color:"#FF6500",fontFamily:"Outfit",fontWeight:700,fontSize:15,display:"flex",alignItems:"center",gap:4 }}>
                  See all <ArrowRight size={16} />
                </button>
              </div>
              <div className="events-grid">
                {featured.map((ev,i)=>(
                  <div key={ev.id} className={`delay-${i%4+1}`}>
                    <EventCard event={ev} onClick={()=>setSelectedEvent(ev)} saved={saved.has(ev.id)} onSave={handleSave} />
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* CTA banner */}
          {view==="home" && (
            <section style={{ background:"#0A1628",padding:"60px 24px",textAlign:"center",margin:"0 0 0" }}>
              <h2 className="bebas" style={{ fontSize:"clamp(36px,6vw,64px)",color:"#fff",marginBottom:12 }}>
                Hosting an Event?
              </h2>
              <p style={{ color:"#64748B",fontSize:18,maxWidth:500,margin:"0 auto 28px" }}>
                Post your college event and reach thousands of students across India in minutes.
              </p>
              <button className="btn-primary" style={{ fontSize:17,padding:"16px 36px" }} onClick={()=>setShowPost(true)}>
                + Post Event for Free
              </button>
            </section>
          )}
        </div>
      )}

      {/* ── EVENTS LIST VIEW ── */}
      {view==="events" && (
        <div style={{ maxWidth:1200,margin:"0 auto",padding:"40px 24px" }}>
          <h1 className="bebas" style={{ fontSize:52,color:"#0A1628",marginBottom:4 }}>All Events</h1>
          <p style={{ color:"#64748B",marginBottom:32,fontSize:16 }}>{filtered.length} events found</p>

          {/* Search + filters */}
          <div style={{ display:"flex",flexWrap:"wrap",gap:12,marginBottom:32 }}>
            <div style={{ flex:1,minWidth:220,position:"relative" }}>
              <Search size={17} style={{ position:"absolute",left:14,top:"50%",transform:"translateY(-50%)",color:"#94A3B8" }} />
              <input className="input-field" placeholder="Search events, colleges..." value={search}
                onChange={e=>setSearch(e.target.value)} style={{ paddingLeft:44 }} />
            </div>
            <select className="input-field" style={{ width:"auto",minWidth:180 }} value={filterCollege} onChange={e=>setFilterCollege(e.target.value)}>
              {COLLEGES.map(c=><option key={c}>{c}</option>)}
            </select>
            {filtered.length!==events.length && (
              <button onClick={()=>{ setSearch(""); setFilterCat("All"); setFilterCollege("All Colleges"); }} style={{
                background:"#FEF2F2",border:"1px solid #FECACA",color:"#EF4444",borderRadius:10,padding:"0 16px",cursor:"pointer",fontFamily:"Outfit",fontWeight:600,fontSize:14
              }}>Clear Filters ✕</button>
            )}
          </div>

          {/* Category chips */}
          <div style={{ display:"flex",gap:8,flexWrap:"wrap",marginBottom:32 }}>
            {CATS.map(({ name,icon:Icon,color })=>{
              const active = filterCat===name;
              return (
                <button key={name} onClick={()=>setFilterCat(name)} style={{
                  display:"flex",alignItems:"center",gap:6,padding:"8px 16px",borderRadius:999,
                  background:active?color:"#fff",color:active?"#fff":"#64748B",
                  border:`1.5px solid ${active?color:"#E8E0D0"}`,
                  fontFamily:"Outfit",fontWeight:600,fontSize:14,cursor:"pointer",transition:"all .2s"
                }}>
                  <Icon size={14} />{name}
                </button>
              );
            })}
          </div>

          {filtered.length===0 ? (
            <div style={{ textAlign:"center",padding:"80px 0",color:"#94A3B8" }}>
              <Search size={48} style={{ margin:"0 auto 16px",opacity:.3 }} />
              <div style={{ fontSize:20,fontWeight:600,marginBottom:8 }}>No events found</div>
              <div style={{ fontSize:15 }}>Try a different search or clear your filters.</div>
            </div>
          ) : (
            <div className="events-grid">
              {filtered.map((ev,i)=>(
                <div key={ev.id} className={`fade-up delay-${i%4+1}`}>
                  <EventCard event={ev} onClick={()=>setSelectedEvent(ev)} saved={saved.has(ev.id)} onSave={handleSave} />
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Event Detail Modal */}
      {selectedEvent && (
        <EventModal
          event={selectedEvent}
          onClose={()=>setSelectedEvent(null)}
          registered={registered.has(selectedEvent.id)}
          onRegister={handleRegister}
          saved={saved.has(selectedEvent.id)}
          onSave={handleSave}
        />
      )}

      {/* Post Event Modal */}
      {showPost && <PostEventForm onClose={()=>setShowPost(false)} onSubmit={handlePostSubmit} />}

      {/* Footer */}
      <footer style={{ background:"#0A1628",color:"#64748B",padding:"40px 24px",textAlign:"center",fontSize:14 }}>
        <div className="bebas" style={{ fontSize:28,color:"#FF6500",marginBottom:8 }}>CollegeEvents</div>
        <p>Connecting students with the best college events across India.</p>
        <p style={{ marginTop:8,fontSize:12 }}>© 2025 CollegeEvents. Built for students, by students.</p>
      </footer>
    </>
  );
}
