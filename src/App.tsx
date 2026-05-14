import React, { useState, useEffect, useMemo } from 'react';
import { 
  Users, 
  Briefcase, 
  Target, 
  Award, 
  ChevronRight, 
  ChevronLeft,
  Mail,
  Linkedin,
  Twitter,
  BookOpen,
  ArrowRight,
  Menu,
  X,
  Search,
  Bell,
  Facebook,
  MessageCircle,
  Plus,
  Sparkles,
  Zap,
  Filter,
  CheckCircle2,
  Camera,
  LayoutDashboard,
  LogOut,
  BarChart,
  Settings,
  Edit,
  Trash2,
  Globe
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { GoogleGenAI } from "@google/genai";

// --- Types ---
interface Comment {
  id: string;
  author: string;
  text: string;
  date: string;
}

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content?: string;
  author: string;
  date: string;
  category: string;
  readTime: string;
  image: string;
}

// --- Sample Data ---
const ABOUT_ME = {
  name: 'حسام الورداني',
  avatar: 'https://cdn.discordapp.com/attachments/1371510486377758784/1373324675660554270/IMG_20250514_174549.jpg?ex=68363765&is=6834e5e5&hm=f2e96d8e202685934149021e102606861d86d5257321e06e866632168698651c&', // Image provided by user
  role: 'مستشار موارد بشرية وتقني',
  bio: 'مهتم بمجال الموارد البشرية والتكنولوجيا الحديثة، وأسعى لتطوير المحتوى العربي في مجال HR من خلال تقديم معلومات عملية وحديثة تساعد الشركات وأخصائيي الموارد البشرية على تحسين بيئة العمل وإدارة الموظفين باحترافية.',
  detailedBio: 'أعمل على تطوير أنظمة HR عربية متكاملة تهدف إلى تسهيل عمليات إدارة الموظفين، الحضور والانصراف، والتحول الرقمي الشامل داخل الشركات والمؤسسات المصرية.',
  goals: [
    'إدارة الموظفين والحضور والانصراف',
    'الرواتب والإجازات والتحول الرقمي',
    'التوظيف وإدارة المتقدمين ATS',
    'تقييم الأداء ودمج الذكاء الاصطناعي'
  ],
  phone1: '01200716861',
  phone2: '01094536046',
  email: 'hossamelwardany132@gmail.com',
  social: {
    whatsapp: 'https://whatsapp.com/channel/0029Vb7smGNJpe8Y2oDhPC3r',
    linkedin: 'https://www.linkedin.com/in/counselor-hossam-el-wardany-60a946224',
    facebook: 'https://www.facebook.com/share/18iasqqNDX/'
  }
};

const BLOG_POSTS: BlogPost[] = [
  {
    id: '1',
    title: 'مستقبل الموارد البشرية في عصر الذكاء الاصطناعي',
    excerpt: 'كيف ستغير التقنيات الحديثة طريقة اختيارنا للمواهب وإدارة الفرق في العقد القادم؟ استكشف التحديات والفرص.',
    content: 'في السنوات الأخيرة، بدأ الذكاء الاصطناعي في إعادة تشكيل كل جانب من جوانب حياتنا المهنية، والموارد البشرية ليست استثناءً. من أتمتة عمليات الفرز الأولية للسير الذاتية إلى استخدام خوارزميات التنبؤ بمعدلات الدوران الوظيفي، أصبحت التقنية شريكاً استراتيجياً لا غنى عنه.\n\nالتحدي الحقيقي لا يكمن في استبدال البشر، بل في كيف يمكن للبشر والآلات العمل معاً لتعزيز تجربة الموظف. في هذه المقالة، نتناول أربع استراتيجيات رئيسية لتبني الذكاء الاصطناعي بمسؤولية وفعالية.',
    author: 'حسام الورداني',
    date: '١٤ مايو ٢٠٢٤',
    category: 'تكنولوجيا الموارد البشرية',
    readTime: '٥ دقائق',
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '2',
    title: 'بناء ثقافة مؤسسية مرنة: الطريق للنجاح المستدام',
    excerpt: 'لماذا تفشل بعض الشركات في الاحتفاظ بالمواهب؟ السر يكمن في الثقافة الداخلية وتجربة الموظف اليومية.',
    content: 'الثقافة المؤسسية ليست مجرد كلمات معلقة على جدران المكاتب؛ إنها مجموع السلوكيات والقرارات اليومية التي يتخذها الجميع. الثقافة المرنة هي التي تسمح للموظفين بالخطأ والتعلم والنمو.\n\nالشركات التي تضع "الإنسان أولاً" هي الشركات التي تنجو في الأزمات. سنستعرض في هذا المقال خطوات عملية لتحويل بيئة العمل من "بيئة تنفيذية" إلى "بيئة ابتكارية" من خلال تعزيز الأمان النفسي والشفافية.',
    author: 'حسام الورداني',
    date: '١٠ مايو ٢٠٢٤',
    category: 'ثقافة العمل',
    readTime: '٧ دقائق',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '3',
    title: 'استراتيجيات التفاوض الفعال في بيئة العمل',
    excerpt: 'دليل عملي لمحترفي الموارد البشرية والمديرين للوصول لنتائج مربحة للجميع في المفاوضات الإدارية.',
    content: 'التفاوض مهارة حياتية بقدر ما هي مهارة مهنية. في سياق الموارد البشرية، نمارس التفاوض يومياً: مع المتقدمين للوظائف حول الرواتب، مع الموظفين حول المسارات المهنية، ومع الإدارة العليا حول الميزانيات.\n\nمفتاح التفاوض الناجح هو التحضير العميق وفهم احتياجات الطرف الآخر (وليس مجرد مطالبهم). سنتعلم معاً كيفية بناء تحالفات استراتيجية بدلاً من خوض معارك صفرية.',
    author: 'حسام الورداني',
    date: '٥ مايو ٢٠٢٤',
    category: 'القيادة',
    readTime: '٦ دقائق',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800'
  }
];

// --- Components ---

const AIRobotTip = () => {
  const [tip, setTip] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const generateTip = async () => {
    setLoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: "أعطني نصيحة قصيرة وذكية باللغة العربية لمديري الموارد البشرية حول كيفية تحسين بيئة العمل. اجعلها جملة واحدة فقط وملهمة.",
      });
      setTip(response.text?.trim() || null);
    } catch (error) {
      console.error("Gemini Error:", error);
      setTip("العلاقة الجيدة مع الموظفين هي أساس الإنتاجية المستدامة.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    generateTip();
  }, []);

  return (
    <div className="bg-slate-900 rounded-[2rem] p-8 text-white relative overflow-hidden group">
      <div className="absolute top-0 right-0 w-32 h-32 bg-brand-primary/20 blur-[50px] rounded-full" />
      <div className="relative z-10 flex flex-col h-full justify-between">
        <div className="flex items-center justify-between mb-4">
          <div className="w-10 h-10 bg-brand-primary/20 rounded-xl flex items-center justify-center text-brand-primary">
            <Sparkles size={20} />
          </div>
          <button 
            onClick={generateTip} 
            disabled={loading}
            className="text-[10px] font-bold text-slate-500 uppercase tracking-widest hover:text-white transition-colors flex items-center gap-2"
          >
            {loading ? 'جاري التوليد...' : 'تحديث النصيحة'}
            <Zap size={10} className={loading ? 'animate-pulse' : ''} />
          </button>
        </div>
        <div>
          <div className="text-brand-primary font-bold text-[10px] uppercase tracking-widest mb-2">نصيحة اليوم الذكية</div>
          <p className="text-lg font-bold leading-relaxed">
            {loading ? 'جاري استحضار الحكمة من الذكاء الاصطناعي...' : tip || 'كن ملهماً لفريقك دائماً.'}
          </p>
        </div>
      </div>
    </div>
  );
};

const AdminPanel = ({ 
  onAddPost, 
  onUpdateProfile, 
  currentProfileImage 
}: { 
  onAddPost: (post: BlogPost) => void;
  onUpdateProfile: (newImage: string) => void;
  currentProfileImage: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [category, setCategory] = useState('تكنولوجيا الموارد البشرية');
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [profileUrl, setProfileUrl] = useState(currentProfileImage);

  const generateAIImage = async () => {
    if (!title) return;
    setIsGenerating(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
          parts: [
            {
              text: `Generate a professional, high-quality, minimalist and modern blog header image for an article titled "${title}" in the field of ${category}. Style: digital art, clean, professional.`,
            },
          ],
        },
        config: {
          imageConfig: {
            aspectRatio: "16:9"
          }
        }
      });

      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
          setGeneratedImage(`data:image/png;base64,${part.inlineData.data}`);
          break;
        }
      }
    } catch (error) {
      console.error("Image Generation Error:", error);
      setGeneratedImage(`https://images.unsplash.com/photo-${1557000000000 + Math.floor(Math.random() * 1000000)}?auto=format&fit=crop&q=80&w=800`);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !excerpt) return;

    const newPost: BlogPost = {
      id: Date.now().toString(),
      title,
      excerpt,
      content: excerpt + "\n\nتمت إضافة هذا المقال عبر لوحة الإدارة الذكية.",
      author: ABOUT_ME.name,
      date: new Date().toLocaleDateString('ar-EG', { day: 'numeric', month: 'long', year: 'numeric' }),
      category,
      readTime: '٥ دقائق',
      image: generatedImage || `https://images.unsplash.com/photo-${1557000000000 + Math.floor(Math.random() * 1000000)}?auto=format&fit=crop&q=80&w=800`
    };

    onAddPost(newPost);
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      setIsOpen(false);
      setTitle('');
      setExcerpt('');
      setGeneratedImage(null);
    }, 2000);
  };

  return (
    <div className="fixed bottom-10 left-10 z-[110]">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-slate-900 text-white rounded-2xl flex items-center justify-center shadow-2xl hover:scale-110 transition-all border border-white/10 group overflow-hidden"
      >
        {isOpen ? <X size={24} /> : (
          <>
            <div className="absolute inset-0 bg-brand-primary/20 scale-0 group-hover:scale-100 transition-transform duration-500 rounded-full" />
            <Plus size={24} className="relative z-10" />
          </>
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.9, x: -20 }}
            animate={{ opacity: 1, y: 0, scale: 1, x: 0 }}
            exit={{ opacity: 0, y: 20, scale: 0.9, x: -20 }}
            className="absolute bottom-20 left-0 w-[22rem] bg-white rounded-[2rem] p-8 shadow-[0_32px_64px_-12px_rgba(0,0,0,0.2)] border border-black/5 rtl overflow-hidden"
          >
            {showSuccess ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-12 text-center"
              >
                <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4 text-green-500">
                  <CheckCircle2 size={40} />
                </div>
                <h3 className="text-xl font-black text-slate-900 mb-2">تم النشر بنجاح!</h3>
                <p className="text-sm text-slate-500">سوف يظهر مقالك في المكتبة الآن.</p>
              </motion.div>
            ) : (
              <>
                <div className="flex items-center justify-between mb-8">
                  <h4 className="font-black text-slate-800 flex items-center gap-2 text-lg">
                    <Plus size={20} className="text-brand-primary" />
                    مقال جديد
                  </h4>
                  <div className="px-3 py-1 bg-slate-100 rounded-lg text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    لوحة التحكم
                  </div>
                </div>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mr-2">العنوان</label>
                    <input 
                      type="text" 
                      placeholder="كيفية إدارة التغيير..." 
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="w-full bg-slate-50 border border-black/5 rounded-2xl px-5 py-4 text-sm outline-none focus:ring-2 focus:ring-brand-primary/20 font-bold transition-all"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mr-2">التصنيف</label>
                    <select 
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full bg-slate-50 border border-black/5 rounded-2xl px-5 py-4 text-sm outline-none focus:ring-2 focus:ring-brand-primary/20 font-bold transition-all appearance-none cursor-pointer"
                    >
                      <option value="تكنولوجيا الموارد البشرية">تكنولوجيا</option>
                      <option value="القيادة">قيادة</option>
                      <option value="ثقافة العمل">ثقافة</option>
                      <option value="توظيف">توظيف</option>
                    </select>
                  </div>

                  <div className="relative group">
                    {generatedImage ? (
                      <div className="relative h-32 rounded-2xl overflow-hidden mb-2 group shadow-lg">
                        <img src={generatedImage} alt="Preview" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
                        <button 
                          type="button"
                          onClick={() => setGeneratedImage(null)}
                          className="absolute top-2 left-2 p-2 bg-white/20 hover:bg-white/40 backdrop-blur-md text-white rounded-xl transition-all"
                        >
                          <X size={16} />
                        </button>
                        <div className="absolute bottom-2 right-2 text-[8px] font-black text-white/80 uppercase tracking-widest">
                          AI Generated
                        </div>
                      </div>
                    ) : (
                      <button 
                        type="button"
                        onClick={generateAIImage}
                        disabled={!title || isGenerating}
                        className="w-full border-2 border-dashed border-slate-100 rounded-2xl py-6 mb-2 flex flex-col items-center justify-center gap-3 hover:bg-slate-50 hover:border-brand-primary/30 transition-all group disabled:opacity-50"
                      >
                        <div className={`p-3 rounded-2xl bg-slate-50 group-hover:bg-brand-primary/5 transition-colors ${isGenerating ? 'animate-pulse' : ''}`}>
                          <Sparkles size={24} className={isGenerating ? "animate-spin text-brand-primary" : "text-slate-300 group-hover:text-brand-primary"} />
                        </div>
                        <div className="text-center">
                          <span className="block text-xs font-black text-slate-500 mb-0.5">{isGenerating ? 'جاري رسم المقال...' : 'توليد صورة ذكية'}</span>
                          <span className="block text-[10px] text-slate-300 font-bold uppercase tracking-widest">Midjourney Style</span>
                        </div>
                      </button>
                    )}
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mr-2">وصف قصير</label>
                    <textarea 
                      placeholder="اكتب نبذة مختصرة تجذب القراء..." 
                      value={excerpt}
                      onChange={(e) => setExcerpt(e.target.value)}
                      className="w-full bg-slate-50 border border-black/5 rounded-2xl px-5 py-4 text-sm min-h-[100px] outline-none focus:ring-2 focus:ring-brand-primary/20 font-bold transition-all"
                    />
                  </div>

                  <button className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black text-sm hover:bg-brand-primary hover:shadow-2xl hover:shadow-brand-primary/30 transition-all flex items-center justify-center gap-3">
                    <span>نشر المقال</span>
                    <Zap size={18} />
                  </button>

                  <div className="pt-6 border-t border-black/5">
                    <button 
                      type="button"
                      onClick={() => setIsAdminOpen(!isAdminOpen)}
                      className="w-full py-3 text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-brand-primary transition-colors flex items-center justify-center gap-2"
                    >
                      {isAdminOpen ? 'إغلاق إعدادات الحساب' : 'تحديث ملفي الشخصي'}
                      <ChevronLeft size={12} className={isAdminOpen ? '-rotate-90 transition-transform' : ''} />
                    </button>
                    
                    {isAdminOpen && (
                      <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        className="mt-4 space-y-4"
                      >
                        <div className="space-y-1">
                          <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest mr-2">رابط الصورة الشخصية</label>
                          <div className="flex gap-2">
                            <input 
                              type="text" 
                              placeholder="أدخل رابط صورتك هنا..." 
                              value={profileUrl}
                              onChange={(e) => setProfileUrl(e.target.value)}
                              className="flex-1 bg-slate-50 border border-black/5 rounded-xl px-4 py-3 text-xs outline-none focus:ring-1 focus:ring-brand-primary font-bold"
                            />
                            <button 
                              type="button"
                              onClick={() => onUpdateProfile(profileUrl)}
                              className="bg-brand-primary text-white px-4 rounded-xl font-bold text-xs"
                            >
                              حفظ
                            </button>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-xl border border-blue-100">
                          <div className="w-10 h-10 rounded-lg overflow-hidden bg-white shadow-sm flex-shrink-0">
                            <img src={profileUrl} alt="Preview" className="w-full h-full object-cover" />
                          </div>
                          <p className="text-[10px] text-blue-600 font-bold leading-tight">معاينة صورتك الجديدة التي ستظهر لجميع القراء.</p>
                        </div>
                      </motion.div>
                    )}
                  </div>
                </form>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Dashboard = ({ 
  posts, 
  onDeletePost, 
  onAddPost, 
  profileImage, 
  onUpdateProfile,
  onExit 
}: { 
  posts: BlogPost[]; 
  onDeletePost: (id: string) => void; 
  onAddPost: (post: BlogPost) => void;
  profileImage: string;
  onUpdateProfile: (img: string) => void;
  onExit: () => void;
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'posts' | 'users' | 'settings'>('overview');
  
  // Mock data for users
  const [users] = useState([
    { id: '1', name: 'حسام الورداني', role: 'أدمن', email: 'hossam@hrinsight.com', avatar: profileImage },
    { id: '2', name: 'أحمد محمود', role: 'محرر', email: 'ahmed@blog.com', avatar: 'https://i.pravatar.cc/100?u=1' },
    { id: '3', name: 'سارة خالد', role: 'محرر', email: 'sara@blog.com', avatar: 'https://i.pravatar.cc/100?u=2' },
  ]);

  const stats = [
    { title: 'إجمالي المقالات', value: posts.length, icon: <BookOpen size={20} />, color: 'bg-blue-50 text-blue-600' },
    { title: 'عدد المستخدمين', value: users.length, icon: <Users size={20} />, color: 'bg-purple-50 text-purple-600' },
    { title: 'إجمالي التعليقات', value: '٢٤', icon: <MessageCircle size={20} />, color: 'bg-orange-50 text-orange-600' },
    { title: 'مشاهدات الشهر', value: '١.٢ ألف', icon: <BarChart size={20} />, color: 'bg-emerald-50 text-emerald-600' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex rtl">
      {/* Sidebar */}
      <aside className="w-72 bg-white border-l border-black/5 flex flex-col fixed h-full">
        <div className="p-8 border-b border-black/5 flex items-center gap-3">
          <div className="w-10 h-10 bg-brand-primary rounded-xl flex items-center justify-center text-white shadow-lg shadow-brand-primary/20">
            <LayoutDashboard size={22} />
          </div>
          <h1 className="text-xl font-bold text-slate-800">الأدمن</h1>
        </div>

        <nav className="flex-1 p-4 space-y-2 mt-4">
          <button 
            onClick={() => setActiveTab('overview')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all ${activeTab === 'overview' ? 'bg-slate-900 text-white shadow-xl shadow-slate-900/20' : 'text-slate-500 hover:bg-slate-50'}`}
          >
            <BarChart size={18} />
            <span>نظرة عامة</span>
          </button>
          <button 
            onClick={() => setActiveTab('posts')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all ${activeTab === 'posts' ? 'bg-slate-900 text-white shadow-xl shadow-slate-900/20' : 'text-slate-500 hover:bg-slate-50'}`}
          >
            <BookOpen size={18} />
            <span>المقالات</span>
          </button>
          <button 
            onClick={() => setActiveTab('users')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all ${activeTab === 'users' ? 'bg-slate-900 text-white shadow-xl shadow-slate-900/20' : 'text-slate-500 hover:bg-slate-50'}`}
          >
            <Users size={18} />
            <span>المستخدمين</span>
          </button>
          <button 
            onClick={() => setActiveTab('settings')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all ${activeTab === 'settings' ? 'bg-slate-900 text-white shadow-xl shadow-slate-900/20' : 'text-slate-500 hover:bg-slate-50'}`}
          >
            <Settings size={18} />
            <span>الإعدادات</span>
          </button>
        </nav>

        <div className="p-4 border-t border-black/5">
          <button 
            onClick={onExit}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-black text-xs text-red-500 hover:bg-red-50 transition-all uppercase tracking-widest mt-auto mb-4"
          >
            <Globe size={18} />
            <span>العودة للموقع</span>
          </button>
          <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-2xl">
            <img src={profileImage} className="w-10 h-10 rounded-xl bg-slate-200 object-cover" />
            <div>
              <div className="text-[10px] font-black text-slate-800">{ABOUT_ME.name}</div>
              <div className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">Counselor</div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 mr-72 p-10 overflow-y-auto">
        <header className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl font-black text-slate-900 mb-2">
              {activeTab === 'overview' && 'لوحة المعلومات الحية'}
              {activeTab === 'posts' && 'إدارة المقالات'}
              {activeTab === 'users' && 'فريق العمل والمحررين'}
              {activeTab === 'settings' && 'إعدادات النظام'}
            </h2>
            <p className="text-sm text-slate-500 font-bold">مرحباً بك في لوحة تحكم HR Insight 🚀</p>
          </div>
          
          <div className="flex items-center gap-4">
             <div className="relative">
                <Bell size={20} className="text-slate-400" />
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[8px] font-black flex items-center justify-center rounded-full border-2 border-slate-50">٢</div>
             </div>
             <AdminPanel onAddPost={onAddPost} onUpdateProfile={onUpdateProfile} currentProfileImage={profileImage} />
          </div>
        </header>

        {activeTab === 'overview' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((s, i) => (
                <div key={i} className="bg-white p-6 rounded-[2rem] border border-black/5 shadow-sm">
                   <div className="flex items-center justify-between mb-4">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${s.color}`}>
                        {s.icon}
                      </div>
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">نشط</span>
                   </div>
                   <div className="text-3xl font-black text-slate-900 mb-1">{s.value}</div>
                   <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{s.title}</div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
               <div className="lg:col-span-2 bg-white rounded-[2.5rem] border border-black/5 p-8">
                  <div className="flex items-center justify-between mb-8">
                    <h3 className="font-black text-slate-900">آخر المقالات المضافة</h3>
                    <button onClick={() => setActiveTab('posts')} className="text-[10px] font-black text-brand-primary uppercase tracking-widest underline underline-offset-4">عرض الكل</button>
                  </div>
                  <div className="space-y-6">
                    {posts.slice(0, 3).map((post) => (
                      <div key={post.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-black/5 group hover:bg-slate-100 transition-all">
                        <div className="flex items-center gap-4">
                           <div className="w-12 h-12 rounded-xl overflow-hidden bg-slate-200">
                             <img src={post.image} className="w-full h-full object-cover" />
                           </div>
                           <div>
                              <h4 className="font-bold text-slate-800 text-sm mb-1">{post.title}</h4>
                              <p className="text-[10px] text-slate-400 font-bold uppercase">{post.category} • {post.date}</p>
                           </div>
                        </div>
                        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                           <button className="p-2 text-slate-400 hover:text-brand-primary transition-colors"><Edit size={16} /></button>
                           <button onClick={() => onDeletePost(post.id)} className="p-2 text-slate-400 hover:text-red-500 transition-colors"><Trash2 size={16} /></button>
                        </div>
                      </div>
                    ))}
                  </div>
               </div>

               <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden">
                  <div className="absolute bottom-0 left-0 w-32 h-32 bg-brand-primary/20 blur-[60px] rounded-full" />
                  <div className="relative z-10 flex flex-col h-full justify-between">
                     <div className="w-12 h-12 bg-brand-primary/20 rounded-2xl flex items-center justify-center text-brand-primary mb-6">
                       <Zap size={24} />
                     </div>
                     <h3 className="text-2xl font-black mb-4 leading-tight">تطوير مستمر <br/> للأداء والأنظمة</h3>
                     <p className="text-slate-400 text-sm leading-relaxed mb-8">نعمل باستمرار على تحديث لوحة التحكم لتوفر لك أدق الإحصائيات وأسهل الوسائل لإدارة المحتوى.</p>
                     <div className="mt-auto">
                        <div className="text-[10px] font-black text-brand-primary uppercase tracking-widest mb-2">إصدار النظام</div>
                        <div className="text-lg font-black">v2.4.0 <span className="text-xs font-medium text-slate-500 italic">(AI Integrated)</span></div>
                     </div>
                  </div>
               </div>
            </div>
          </div>
        )}

        {activeTab === 'posts' && (
          <div className="bg-white rounded-[2.5rem] border border-black/5 overflow-hidden shadow-sm">
            <div className="p-8 border-b border-black/5 flex items-center justify-between bg-slate-50/50">
              <h3 className="font-black text-slate-900">قائمة المقالات</h3>
              <div className="flex gap-3">
                 <div className="relative">
                    <Search size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input type="text" placeholder="ابحث في المقالات..." className="bg-white border border-black/5 rounded-xl pr-10 pl-4 py-2 text-xs outline-none focus:ring-1 focus:ring-brand-primary font-bold" />
                 </div>
              </div>
            </div>
            <table className="w-full text-right border-collapse">
              <thead>
                <tr className="bg-slate-50/50">
                  <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">المقال</th>
                  <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">التصنيف</th>
                  <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">التاريخ</th>
                  <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-left">إجراءات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/5">
                {posts.map((post) => (
                  <tr key={post.id} className="hover:bg-slate-50 transition-colors group">
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-lg overflow-hidden bg-slate-100 flex-shrink-0">
                          <img src={post.image} className="w-full h-full object-cover" />
                        </div>
                        <span className="font-bold text-slate-800 text-sm group-hover:text-brand-primary transition-colors">{post.title}</span>
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-lg text-[10px] font-black uppercase">{post.category}</span>
                    </td>
                    <td className="px-8 py-5 text-sm text-slate-500 font-bold">{post.date}</td>
                    <td className="px-8 py-5 text-left">
                      <div className="flex items-center justify-end gap-2">
                        <button className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:bg-slate-200 transition-all"><Edit size={14} /></button>
                        <button onClick={() => onDeletePost(post.id)} className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:bg-red-50 hover:text-red-500 transition-all"><Trash2 size={14} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'users' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {users.map((user) => (
              <div key={user.id} className="bg-white p-8 rounded-[2.5rem] border border-black/5 shadow-sm text-center relative overflow-hidden group">
                <div className="absolute top-0 left-0 right-0 h-2 bg-brand-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="w-20 h-20 rounded-[2rem] bg-slate-50 overflow-hidden mx-auto mb-6 shadow-xl border-4 border-white">
                  <img src={user.avatar} className="w-full h-full object-cover" />
                </div>
                <h4 className="text-lg font-black text-slate-900 mb-1">{user.name}</h4>
                <div className="text-brand-primary font-bold text-[10px] uppercase tracking-widest mb-4">{user.role}</div>
                <div className="text-xs text-slate-500 font-medium mb-6">{user.email}</div>
                <div className="flex gap-2 justify-center pt-6 border-t border-black/5">
                  <button className="px-4 py-2 bg-slate-100 rounded-xl text-[10px] font-black text-slate-500 hover:bg-slate-200 transition-all">تعديل الصلاحيات</button>
                  <button className="w-10 h-10 bg-red-50 text-red-500 rounded-xl flex items-center justify-center hover:bg-red-500 hover:text-white transition-all"><Trash2 size={16} /></button>
                </div>
              </div>
            ))}
            <button className="border-2 border-dashed border-slate-200 rounded-[2.5rem] flex flex-col items-center justify-center gap-3 p-8 text-slate-400 hover:border-brand-primary/40 hover:bg-slate-50 transition-all group">
               <div className="p-4 bg-slate-50 rounded-2xl group-hover:bg-brand-primary/5 group-hover:text-brand-primary transition-colors">
                 <Plus size={32} />
               </div>
               <span className="font-black text-sm uppercase tracking-widest">إضافة عضو جديد</span>
            </button>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="bg-white rounded-[2.5rem] border border-black/5 p-10 max-w-2xl">
             <div className="space-y-10">
                <div>
                   <h3 className="font-black text-slate-900 mb-2">إعدادات الموقع المتقدمة</h3>
                   <p className="text-xs text-slate-500 font-bold mb-8">خصائص الموقع والتحكم التقني</p>
                   
                   <div className="space-y-6">
                      <div className="flex items-center justify-between p-6 bg-slate-50 rounded-2xl">
                         <div>
                            <div className="font-black text-sm text-slate-800 mb-1">وضع الصيانة</div>
                            <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">إغلاق الموقع للزوار مؤقتاً</div>
                         </div>
                         <div className="w-12 h-6 bg-slate-200 rounded-full relative cursor-pointer">
                            <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm" />
                         </div>
                      </div>
                      
                      <div className="flex items-center justify-between p-6 bg-slate-50 rounded-2xl">
                         <div>
                            <div className="font-black text-sm text-slate-800 mb-1">توليد الصور بالذكاء الاصطناعي</div>
                            <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">تفعيل خدمة Gemini لرسوم المقالات</div>
                         </div>
                         <div className="w-12 h-6 bg-brand-primary rounded-full relative cursor-pointer">
                            <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm" />
                         </div>
                      </div>

                      <div className="p-6 bg-blue-50 border border-blue-100 rounded-2xl">
                         <div className="flex items-center gap-3 mb-4">
                            <Sparkles size={18} className="text-blue-600" />
                            <span className="font-black text-sm text-blue-900 uppercase tracking-widest">تحديثات الأمان</span>
                         </div>
                         <p className="text-xs text-blue-700 leading-relaxed font-bold">يتم فحص الموقع وتأمينه تلقائياً كل ٢٤ ساعة باستخدام خوارزميات الذكاء الاصطناعي لضمان حماية بياناتك.</p>
                      </div>
                   </div>
                </div>
             </div>
          </div>
        )}
      </main>
    </div>
  );
};

const SERVICES = [
  {
    title: 'إدارة الموظفين',
    description: 'أنظمة متكاملة لإدارة ملفات الموظفين والبيانات الأساسية باحترافية.',
    icon: <Users size={24} />
  },
  {
    title: 'الحضور والانصراف',
    description: 'حلول رقمية دقيقة لتتبع الوقت وضمان كفاءة العمل.',
    icon: <CheckCircle2 size={24} />
  },
  {
    title: 'الرواتب والإجازات',
    description: 'أتمتة كاملة لعمليات كشوف المرتبات وإدارة رصيد الإجازات.',
    icon: <Zap size={24} />
  },
  {
    title: 'نظام التوظيف ATS',
    description: 'إدارة المتقدمين للوظائف بذكاء اصطناعي لتسريع عملية الاختيار.',
    icon: <Briefcase size={24} />
  },
  {
    title: 'تقييم الأداء',
    description: 'أنظمة متطورة لقياس أداء الموظفين وتقديم تقارير دورية.',
    icon: <Target size={24} />
  },
  {
    title: 'التحول الرقمي',
    description: 'نقل عمليات شركتك من الورقية إلى عالم الرقمية الذكي.',
    icon: <Sparkles size={24} />
  }
];

const TESTIMONIALS = [
  {
    company: 'شركة النيل للخدمات',
    text: 'بفضل أنظمة HR التي طورها حسام، تحولت بيئة العمل لدينا إلى منظومة رقمية فعالة بنسبة 100%.',
    role: 'المدير التنفيذي'
  },
  {
    company: 'مجموعة الأهرام للتقنية',
    text: 'الاحترافية في التعامل وفهم احتياجات السوق المصري هما أكثر ما يميز خدمات المستشار حسام.',
    role: 'مدير العمليات'
  }
];

const ServicesSection = () => (
  <section id="services" className="section-padding rtl">
    <div className="text-center mb-16">
      <div className="text-brand-primary font-bold text-[10px] uppercase tracking-widest mb-2">ماذا نقدم؟</div>
      <h2 className="text-4xl font-black text-slate-900 mb-4">خدمات وحلول ذكية للشركات</h2>
      <p className="text-slate-500 max-w-2xl mx-auto font-medium">نساعدك على تحويل قسم الموارد البشرية إلى شريك استراتيجي في نجاح مؤسستك.</p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {SERVICES.map((service, i) => (
        <motion.div 
          key={i}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          whileHover={{ y: -5 }}
          transition={{ delay: i * 0.1 }}
          className="bento-card p-8 bg-white border border-black/5 hover:border-brand-primary/20 transition-all flex flex-col gap-6"
        >
          <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center text-brand-primary shadow-sm">
            {service.icon}
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">{service.title}</h3>
            <p className="text-sm text-slate-500 leading-relaxed">{service.description}</p>
          </div>
        </motion.div>
      ))}
    </div>
  </section>
);

const TestimonialsSection = () => (
  <section className="section-padding rtl bg-slate-900 text-white rounded-[4rem] mx-6 mb-20 overflow-hidden relative">
    <div className="absolute top-0 left-0 w-full h-full bg-brand-primary/5 opacity-50" />
    <div className="max-w-4xl mx-auto relative z-10">
      <div className="text-center mb-16">
        <div className="text-brand-primary font-bold text-[10px] uppercase tracking-widest mb-2">ثقة العملاء</div>
        <h2 className="text-3xl font-black mb-4">قالوا عن حلولنا</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {TESTIMONIALS.map((t, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="bg-white/5 border border-white/10 p-8 rounded-[2rem] backdrop-blur-sm"
          >
            <div className="text-brand-primary mb-4 flex gap-1">
              {[1, 2, 3, 4, 5].map(s => <Sparkles size={14} key={s} />)}
            </div>
            <p className="text-lg font-medium leading-relaxed mb-6 italic">"{t.text}"</p>
            <div>
              <div className="font-bold text-white">{t.company}</div>
              <div className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">{t.role}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const CommentSection = ({ postId }: { postId: string }) => {
  const [comments, setComments] = useState<Comment[]>(() => {
    const saved = localStorage.getItem(`comments_${postId}`);
    return saved ? JSON.parse(saved) : [
      { id: 'c1', author: 'أحمد علي', text: 'مقال رائع جداً، شكراً لك على هذه المعلومات القيمة.', date: '١٥ مايو ٢٠٢٤' },
      { id: 'c2', author: 'سارة محمود', text: 'أتفق تماماً مع فكرة أن الذكاء الاصطناعي مكمل وليس بديلاً.', date: '١٥ مايو ٢٠٢٤' }
    ];
  });
  const [newComment, setNewComment] = useState('');
  const [authorName, setAuthorName] = useState('');

  useEffect(() => {
    localStorage.setItem(`comments_${postId}`, JSON.stringify(comments));
  }, [comments, postId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || !authorName.trim()) return;

    const comment: Comment = {
      id: Date.now().toString(),
      author: authorName,
      text: newComment,
      date: new Date().toLocaleDateString('ar-EG', { day: 'numeric', month: 'long', year: 'numeric' })
    };

    setComments([comment, ...comments]);
    setNewComment('');
  };

  return (
    <div className="mt-12 pt-8 border-t border-black/5">
      <h4 className="text-xl font-bold text-slate-800 mb-8">التعليقات ({comments.length})</h4>
      
      <form onSubmit={handleSubmit} className="mb-10 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input 
            type="text" 
            placeholder="الاسم" 
            value={authorName}
            onChange={(e) => setAuthorName(e.target.value)}
            className="w-full bg-slate-50 border border-black/5 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-brand-primary/20 transition-all font-bold"
          />
        </div>
        <textarea 
          placeholder="اترك تعليقك هنا..." 
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="w-full bg-slate-50 border border-black/5 rounded-xl px-4 py-3 text-sm min-h-[120px] outline-none focus:ring-2 focus:ring-brand-primary/20 transition-all font-bold"
        />
        <button className="bg-slate-800 text-white px-8 py-3 rounded-xl font-bold text-sm hover:bg-slate-700 transition-all">
          نشر التعليق
        </button>
      </form>

      <div className="space-y-6">
        {comments.map((comment) => (
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            key={comment.id} 
            className="flex gap-4 group"
          >
            <div className="w-10 h-10 rounded-full bg-brand-primary/10 flex items-center justify-center font-bold text-brand-primary text-sm shrink-0">
              {comment.author[0]}
            </div>
            <div className="flex-1 bg-slate-50 p-4 rounded-2xl group-hover:bg-slate-100 transition-colors">
              <div className="flex justify-between items-center mb-2">
                <span className="font-bold text-slate-800 text-sm">{comment.author}</span>
                <span className="text-[10px] text-slate-400 font-bold">{comment.date}</span>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">{comment.text}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const PostModal = ({ post, onClose, authorImage }: { post: BlogPost; onClose: () => void; authorImage: string }) => {
  const [scrollProgress, setScrollProgress] = useState(0);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    const progress = (target.scrollTop / (target.scrollHeight - target.clientHeight)) * 100;
    setScrollProgress(progress);
  };

  const shareUrl = window.location.href;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10 rtl"
    >
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose} />
      <motion.div 
        initial={{ scale: 0.9, y: 100, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.9, y: 100, opacity: 0 }}
        className="bg-white w-full max-w-4xl max-h-[90vh] rounded-[2.5rem] shadow-2xl relative z-10 overflow-hidden flex flex-col"
      >
        <div className="absolute top-0 left-0 right-0 h-1 z-[30]">
          <motion.div 
            className="h-full bg-brand-primary"
            style={{ width: `${scrollProgress}%` }}
          />
        </div>

        <button 
          onClick={onClose}
          className="absolute top-6 left-6 p-2 bg-white/20 hover:bg-white/40 backdrop-blur-md rounded-full text-white transition-all z-20"
        >
          <X size={24} />
        </button>

        <div className="overflow-y-auto h-full p-8 md:p-16" onScroll={handleScroll}>
          <div className="relative h-[300px] md:h-[450px] -mx-8 md:-mx-16 -mt-8 md:-mt-16 mb-12">
            <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-10 right-10 left-10">
              <div className="inline-block px-4 py-1.5 bg-brand-primary rounded-full text-[10px] font-black text-white uppercase tracking-widest mb-4">
                {post.category}
              </div>
              <h1 className="text-3xl md:text-5xl font-black text-white leading-tight">
                {post.title}
              </h1>
            </div>
          </div>

          <div className="max-w-2xl mx-auto">
            <div className="flex flex-col sm:flex-row items-center justify-between mb-12 pb-8 border-b border-black/5 gap-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl overflow-hidden bg-slate-100">
                  <img src={authorImage} alt={ABOUT_ME.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <div className="font-bold text-slate-900 text-sm">{post.author}</div>
                  <div className="text-[10px] text-slate-400 font-bold uppercase">{post.date} • {post.readTime}</div>
                </div>
              </div>
              <div className="flex gap-2">
                <a 
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`} 
                  target="_blank" rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-[#0077b5] hover:text-white transition-all"
                >
                  <Linkedin size={18} />
                </a>
                <a 
                   href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`} 
                   target="_blank" rel="noopener noreferrer"
                   className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-[#1877f2] hover:text-white transition-all"
                >
                  <Facebook size={18} />
                </a>
              </div>
            </div>

            <div className="prose prose-slate max-w-none mb-16">
              <p className="text-xl font-medium text-slate-600 mb-8 leading-relaxed">
                {post.excerpt}
              </p>
              <div className="text-slate-600 leading-[1.8] text-lg whitespace-pre-line">
                {post.content || post.excerpt}
              </div>
            </div>

            {/* Author Bio Section */}
            <div className="bg-slate-50 rounded-[2rem] p-8 md:p-10 mb-16 flex flex-col md:flex-row items-center md:items-start gap-8 text-right border border-black/5">
              <div className="w-24 h-24 rounded-[2rem] overflow-hidden bg-white shadow-xl flex-shrink-0">
                <img src={authorImage} alt={ABOUT_ME.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1">
                <div className="text-brand-primary font-bold text-[10px] uppercase tracking-widest mb-2">عن الكاتب</div>
                <h3 className="text-2xl font-black text-slate-900 mb-2">{ABOUT_ME.name}</h3>
                <div className="text-sm font-bold text-slate-400 mb-4">{ABOUT_ME.role}</div>
                <p className="text-slate-500 leading-relaxed text-sm font-medium">
                  {ABOUT_ME.detailedBio}
                </p>
              </div>
            </div>

            <CommentSection postId={post.id} />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const ContactForm = () => {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setTimeout(() => setStatus('success'), 1500);
  };

  return (
    <section id="contact" className="section-padding rtl">
      <div className="bento-card p-12 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-primary/5 rounded-full -mr-32 -mt-32" />
        
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 relative z-10 text-right">
          <div>
            <div className="text-brand-primary font-bold text-[10px] uppercase tracking-widest mb-2">تواصل معي</div>
            <h2 className="text-3xl font-black text-slate-900 mb-6 font-sans">هل أنت مستعد لبدء <br/> شيء عظيم؟</h2>
            <p className="text-slate-500 mb-10 leading-relaxed font-bold text-sm">
              سواء كان لديك استفسار حول استراتيجيات الموارد البشرية أو ترغب في تطوير نظام HR مخصص لشركتك، أنا هنا للمساعدة.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-center gap-4 justify-end">
                <div className="text-right">
                  <div className="text-xs font-bold text-slate-400 mb-1 uppercase tracking-widest">واتساب</div>
                  <a href={`https://wa.me/${ABOUT_ME.phone1}`} className="text-slate-800 font-bold hover:text-brand-primary transition-colors">{ABOUT_ME.phone1}</a>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-green-600">
                  <MessageCircle size={24} />
                </div>
              </div>
              <div className="flex items-center gap-4 justify-end">
                <div className="text-right">
                  <div className="text-xs font-bold text-slate-400 mb-1 uppercase tracking-widest">البريد الإلكتروني</div>
                  <a href={`mailto:${ABOUT_ME.email}`} className="text-slate-800 font-bold hover:text-brand-primary transition-colors">{ABOUT_ME.email}</a>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-brand-primary">
                  <Mail size={24} />
                </div>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <AnimatePresence mode="wait">
              {status === 'success' ? (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-green-50 text-green-700 p-8 rounded-[2rem] text-center"
                >
                   <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 text-green-500">
                      <CheckCircle2 size={32} />
                   </div>
                   <h3 className="text-xl font-black mb-2">تم الإرسال بنجاح!</h3>
                   <p className="text-sm">سأقوم بالرد عليك خلال ٢٤ ساعة عمل.</p>
                   <button onClick={() => setStatus('idle')} className="mt-6 text-xs font-bold underline">إرسال رسالة أخرى</button>
                </motion.div>
              ) : (
                <motion.div 
                  exit={{ opacity: 0, x: 20 }}
                  className="space-y-4"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input type="text" placeholder="الاسم الكامل" required className="bg-slate-50 border border-black/5 rounded-2xl px-5 py-4 text-sm font-bold w-full outline-none focus:ring-1 focus:ring-brand-primary transition-all" />
                    <input type="email" placeholder="البريد الإلكتروني" required className="bg-slate-50 border border-black/5 rounded-2xl px-5 py-4 text-sm font-bold w-full outline-none focus:ring-1 focus:ring-brand-primary transition-all" />
                  </div>
                  <input type="text" placeholder="الموضوع" required className="bg-slate-50 border border-black/5 rounded-2xl px-5 py-4 text-sm font-bold w-full outline-none focus:ring-1 focus:ring-brand-primary transition-all" />
                  <textarea placeholder="رسالتك..." required className="bg-slate-50 border border-black/5 rounded-2xl px-5 py-4 text-sm font-bold w-full min-h-[150px] outline-none focus:ring-1 focus:ring-brand-primary transition-all" />
                  <button 
                    disabled={status === 'loading'}
                    className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black text-sm hover:bg-slate-800 transition-all flex items-center justify-center gap-3"
                  >
                    {status === 'loading' ? 'جاري الإرسال...' : (
                      <>
                        <span>إرسال الرسالة</span>
                        <Zap size={18} />
                      </>
                    )}
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </div>
      </div>
    </section>
  );
};

const Navbar = ({ onSearch, onEnterDashboard }: { onSearch: (q: string) => void, onEnterDashboard: () => void }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearchChange = (val: string) => {
    setQuery(val);
    onSearch(val);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/80 backdrop-blur-md border-b border-black/5 py-3' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between rtl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-brand-primary rounded-xl flex items-center justify-center text-white shadow-lg shadow-brand-primary/20">
            <Users size={22} strokeWidth={2.5} />
          </div>
          <h1 className="text-xl font-bold text-slate-800 tracking-tight">HR Insight</h1>
        </div>

        <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-500">
          <a href="#" className="hover:text-brand-primary transition-colors">الرئيسية</a>
          <a href="#services" className="hover:text-brand-primary transition-colors">الخدمات</a>
          <a href="#articles" className="hover:text-brand-primary transition-colors">المقالات</a>
          <a href="#about" className="hover:text-brand-primary transition-colors">عنى</a>
          <a href="#contact" className="hover:text-brand-primary transition-colors">تواصل معى</a>
        </div>

        <div className="hidden md:flex items-center gap-4">
          <button 
            onClick={onEnterDashboard}
            className="flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-600 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-slate-200 transition-all"
          >
            <LayoutDashboard size={16} />
            لوحة التحكم
          </button>
          <AnimatePresence>
            {showSearch && (
              <motion.input 
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: 200, opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                type="text"
                placeholder="ابحث عن مقال..."
                value={query}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="bg-slate-100 border-none rounded-xl px-4 py-2 text-xs outline-none focus:ring-1 focus:ring-brand-primary font-bold"
              />
            )}
          </AnimatePresence>
          <button 
            className="text-slate-500 hover:text-brand-primary transition-colors"
            onClick={() => setShowSearch(!showSearch)}
          >
            <Search size={20} />
          </button>
          <button className="bg-slate-800 text-white px-5 py-2 rounded-xl text-sm font-bold hover:bg-slate-700 transition-all">
            اشترك الآن
          </button>
        </div>

        <button className="md:hidden text-slate-800" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-slate-100 overflow-hidden rtl"
          >
            <div className="p-6 flex flex-col gap-4 text-center font-bold text-slate-600">
              <a href="#">الرئيسية</a>
              <a href="#articles">المقالات</a>
              <a href="#about">عني</a>
              <a href="#newsletter">الأخبار</a>
              <div className="relative">
                <Search size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input 
                  type="text" 
                  placeholder="ابحث..." 
                  value={query}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  className="w-full bg-slate-50 border border-black/5 rounded-xl pr-10 pl-4 py-3 text-xs outline-none font-bold"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = ({ profileImage }: { profileImage: string }) => {
  return (
    <section className="pt-32 pb-12 rtl">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 grid-rows-auto md:grid-rows-2 gap-5">
        {/* Main large card */}
        <motion.div
           initial={{ opacity: 0, scale: 0.95 }}
           animate={{ opacity: 1, scale: 1 }}
           className="bento-card bento-card-dark md:col-span-2 md:row-span-2 flex flex-col justify-center p-10 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-primary/20 rounded-full blur-[80px] -mr-32 -mt-32" />
          <div className="relative z-10 space-y-6">
            <div className="text-brand-primary font-bold tracking-widest text-xs uppercase">المستشار {ABOUT_ME.name}</div>
            <h2 className="text-4xl md:text-5xl font-black leading-[1.1]">ريادة التحول الرقمي <br/>في الموارد البشرية</h2>
            <p className="text-slate-400 text-lg max-w-sm leading-relaxed">
              {ABOUT_ME.bio}
            </p>
            <div className="pt-4">
              <button className="bg-brand-primary hover:bg-blue-600 text-white px-8 py-3 rounded-full font-bold transition-all shadow-lg shadow-brand-primary/20">
                ابدأ القراءة
              </button>
            </div>
          </div>
        </motion.div>

        {/* Stats card */}
        <div className="md:col-span-1 md:row-span-2 flex flex-col gap-5">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bento-card flex-1 border-b-4 border-brand-primary flex flex-col justify-between"
          >
            <div className="text-slate-400 text-[10px] font-black uppercase tracking-wider">أحدث إحصائية</div>
            <div className="py-4">
              <div className="text-4xl font-black text-slate-900">+١,٢٠٠</div>
              <div className="text-slate-500 text-xs font-medium mt-1">مقابلة توظيف ناجحة أجريتها خلال مسيرتي المهنية</div>
            </div>
            <div className="text-brand-primary">
              <Target size={20} />
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex-1"
          >
             <AIRobotTip />
          </motion.div>
        </div>

        {/* Featured list card */}
        <motion.div 
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 0.2 }}
           className="bento-card md:col-span-1 md:row-span-2 bg-gradient-to-br from-blue-50/50 to-white flex flex-col"
        >
          <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm mb-6 border border-black/5">
            <Award size={20} className="text-brand-primary" />
          </div>
          <h3 className="font-black text-lg mb-6 text-slate-900">مقالات مختارة</h3>
          <ul className="space-y-6">
            <li className="group cursor-pointer">
              <div className="text-[10px] text-brand-primary font-black mb-1 uppercase">التوظيف</div>
              <div className="text-sm font-bold text-slate-700 group-hover:text-brand-primary transition-colors">كيف تختار الموهبة المناسبة في ٥ دقائق؟</div>
            </li>
            <li className="group cursor-pointer border-t border-black/5 pt-4">
              <div className="text-[10px] text-emerald-600 font-black mb-1 uppercase">الثقافة</div>
              <div className="text-sm font-bold text-slate-700 group-hover:text-brand-primary transition-colors">بناء بيئة عمل سعيدة بأقل التكاليف</div>
            </li>
            <li className="group cursor-pointer border-t border-black/5 pt-4">
              <div className="text-[10px] text-orange-600 font-black mb-1 uppercase">التطوير</div>
              <div className="text-sm font-bold text-slate-700 group-hover:text-brand-primary transition-colors">لماذا يفشل المديرون الجدد في الشهر الأول؟</div>
            </li>
          </ul>
        </motion.div>

        {/* Status card */}
        <motion.div 
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 0.3 }}
           className="bento-card md:col-span-1 md:row-span-1 flex flex-col justify-between"
        >
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_#22c55e]"></div>
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider">متاح حالياً</span>
          </div>
          <div className="text-sm font-bold text-slate-700 leading-snug">للاستشارات المهنية وتطوير الكوادر الإدارية</div>
          <div className="mt-4 flex -space-x-2 space-x-reverse items-center justify-end">
            {[1, 2, 3].map(i => (
              <div key={i} className="w-8 h-8 rounded-full bg-slate-200 border-2 border-white overflow-hidden shadow-sm">
                <img src={profileImage} alt="Profile" />
              </div>
            ))}
            <div className="w-8 h-8 rounded-full bg-slate-100 border-2 border-white flex items-center justify-center text-[10px] font-bold text-slate-400">
              +٥
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

interface PostCardProps {
  post: BlogPost;
  index: number;
  authorImage: string;
}

const PostCard: React.FC<PostCardProps & { onClick: () => void; onDelete: (id: string) => void }> = ({ post, index, authorImage, onClick, onDelete }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    whileHover={{ y: -8 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.1, duration: 0.4 }}
    className="bento-card flex flex-col group h-full cursor-pointer hover:shadow-2xl hover:shadow-brand-primary/10 transition-all duration-500 relative"
    onClick={onClick}
  >
    <button 
      onClick={(e) => { e.stopPropagation(); onDelete(post.id); }}
      className="absolute top-4 left-4 z-20 w-8 h-8 bg-red-500 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center hover:bg-red-600 shadow-lg"
      title="حذف المقال"
    >
      <X size={14} />
    </button>
    <div className="relative h-48 -mx-6 -mt-6 mb-6 overflow-hidden rounded-t-[1.5rem]">
      <img 
        src={post.image} 
        alt={post.title} 
        className="w-full h-full object-cover grayscale-[0.3] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
      />
      <div className="absolute inset-0 bg-brand-primary/0 group-hover:bg-brand-primary/10 transition-colors duration-500" />
      <div className="absolute top-4 right-4 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-lg text-[10px] font-black text-slate-800 shadow-sm">
        {post.category}
      </div>
    </div>
    <div className="flex flex-col flex-grow text-right">
      <div className="text-[10px] font-bold text-slate-400 mb-2 uppercase tracking-widest">{post.date}</div>
      <h3 className="text-xl font-black text-slate-900 mb-3 leading-tight group-hover:text-brand-primary transition-colors duration-300">
        {post.title}
      </h3>
      <p className="text-sm text-slate-500 line-clamp-2 leading-relaxed mb-6 group-hover:text-slate-600 transition-colors">
        {post.excerpt}
      </p>
      <div className="mt-auto pt-4 border-t border-black/5 flex items-center justify-between" onClick={(e) => e.stopPropagation()}>
         <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-slate-200 overflow-hidden shadow-inner">
               <img src={authorImage} alt="" />
            </div>
            <span className="text-[10px] font-black text-slate-500 uppercase tracking-tighter">{post.author}</span>
         </div>
         <div className="flex items-center gap-1">
            <a 
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`} 
              target="_blank" rel="noopener noreferrer"
              className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-white hover:bg-[#0077b5] transition-all duration-300"
              title="شارك على لينكد إن"
            >
              <Linkedin size={14} />
            </a>
            <a 
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`} 
              target="_blank" rel="noopener noreferrer"
              className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-white hover:bg-[#1877f2] transition-all duration-300"
              title="شارك على فيسبوك"
            >
              <Facebook size={14} />
            </a>
            <a 
              href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(post.title)}`} 
              target="_blank" rel="noopener noreferrer"
              className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-white hover:bg-[#1da1f2] transition-all duration-300"
              title="شارك على تويتر"
            >
              <Twitter size={14} />
            </a>
         </div>
         <div className="text-brand-primary p-2 group-hover:bg-brand-primary/5 rounded-lg transition-all duration-300 translate-x-1 group-hover:translate-x-0">
            <ChevronLeft size={18} />
          </div>
      </div>
    </div>
  </motion.div>
);

const StatsSection = () => null;

const FAQ = [
  {
    q: 'كيف يمكنني البدء في عملية التحول الرقمي لقسم الـ HR؟',
    a: 'نبدأ بجلسة استشارية لتحليل الوضع الحالي، ثم نقترح الأدوات التقنية المناسبة لاحتياجات شركتك وميزانيتها.'
  },
  {
    q: 'هل تقدم حلولاً مخصصة للشركات الناشئة؟',
    a: 'نعم، لدينا باقات مخصصة للشركات الناشئة تهدف إلى تأسيس بنية تحتية قوية للموارد البشرية تنمو مع نمو الشركة.'
  },
  {
    q: 'كيف تضمن دقة نظام الحضور والانصراف؟',
    a: 'نعتمد على أنظمة حديثة تدعم تتبع الموقع الجغرافي وبصمة الوجه، مما يمنع أي تلاعب ويضمن دقة التقارير.'
  }
];

const FAQSection = () => (
  <section className="section-padding rtl mb-20">
    <div className="text-center mb-16">
      <div className="text-brand-primary font-bold text-[10px] uppercase tracking-widest mb-2">الأسئلة الشائعة</div>
      <h2 className="text-3xl font-black text-slate-900">إجابات عن استفساراتك</h2>
    </div>
    <div className="max-w-3xl mx-auto space-y-4">
      {FAQ.map((item, i) => (
        <details key={i} className="group bento-card bg-white p-0 overflow-hidden">
          <summary className="p-6 cursor-pointer list-none flex items-center justify-between font-bold text-slate-800">
            {item.q}
            <ChevronLeft size={20} className="text-brand-primary group-open:-rotate-90 transition-transform" />
          </summary>
          <div className="px-6 pb-6 text-sm text-slate-500 leading-relaxed border-t border-black/5 pt-4">
            {item.a}
          </div>
        </details>
      ))}
    </div>
  </section>
);

const Footer = () => (
  <footer className="bg-slate-900 text-slate-400 py-20 rtl">
    <div className="max-w-7xl mx-auto px-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
        <div className="col-span-1 md:col-span-2">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-brand-primary rounded-xl flex items-center justify-center text-white font-black text-xl">H</div>
            <span className="text-xl font-black text-white">{ABOUT_ME.name}</span>
          </div>
          <p className="max-w-sm leading-relaxed mb-8">
            شريكك الاستراتيجي للتحول الرقمي في الموارد البشرية. نبني بيئات عمل أذكى لمستقبل أفضل.
          </p>
          <div className="flex gap-4">
            <a href="#" className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center hover:bg-brand-primary hover:text-white transition-all"><Linkedin size={18} /></a>
            <a href="#" className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center hover:bg-[#1877f2] hover:text-white transition-all"><Facebook size={18} /></a>
            <a href="#" className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center hover:bg-[#1da1f2] hover:text-white transition-all"><Twitter size={18} /></a>
          </div>
        </div>
        
        <div>
          <h4 className="text-white font-bold mb-6">روابط سريعة</h4>
          <ul className="space-y-4 text-sm font-medium">
            <li><a href="#" className="hover:text-white transition-colors">الرئيسية</a></li>
            <li><a href="#services" className="hover:text-white transition-colors">الخدمات</a></li>
            <li><a href="#articles" className="hover:text-white transition-colors">المقالات</a></li>
            <li><a href="#about" className="hover:text-white transition-colors">عنى</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold mb-6">تواصل معنا</h4>
          <ul className="space-y-4 text-sm font-medium">
            <li className="flex items-center gap-3"><Mail size={16} className="text-brand-primary" /> {ABOUT_ME.email}</li>
            <li className="flex items-center gap-3"><MessageCircle size={16} className="text-green-500" /> {ABOUT_ME.phone1}</li>
          </ul>
        </div>
      </div>
      
      <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-bold uppercase tracking-widest">
        <div>جميع الحقوق محفوظة © {new Date().getFullYear()} {ABOUT_ME.name}</div>
        <div className="flex items-center gap-2">
          صنع بكل <Zap size={10} className="text-brand-primary fill-brand-primary" /> لتطوير الـ HR العربي
        </div>
      </div>
    </div>
  </footer>
);

export default function App() {
  const [view, setView] = useState<'main' | 'dashboard'>('main');
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [allPosts, setAllPosts] = useState<BlogPost[]>(() => {
    const saved = localStorage.getItem('posts');
    return saved ? JSON.parse(saved) : BLOG_POSTS;
  });
  const [profileImage, setProfileImage] = useState(() => {
    return localStorage.getItem('profile_image') || ABOUT_ME.avatar;
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('الكل');
  const [newsletterStatus, setNewsletterStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    localStorage.setItem('posts', JSON.stringify(allPosts));
  }, [allPosts]);

  useEffect(() => {
    localStorage.setItem('profile_image', profileImage);
  }, [profileImage]);

  const filteredPosts = useMemo(() => {
    return allPosts.filter(post => {
      const matchesSearch = post.title.includes(searchQuery) || post.excerpt.includes(searchQuery);
      const matchesCategory = selectedCategory === 'الكل' || post.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [allPosts, searchQuery, selectedCategory]);

  const handleAddPost = (newPost: BlogPost) => {
    setAllPosts([newPost, ...allPosts]);
  };

  const handleDeletePost = (id: string) => {
    if (confirm('هل أنت متأكد من حذف هذا المقال؟')) {
      setAllPosts(allPosts.filter(p => p.id !== id));
    }
  };

  const handleUpdateProfileImage = (newImage: string) => {
    setProfileImage(newImage);
  };

  const handleNewsletterSubmit = () => {
    setNewsletterStatus('loading');
    setTimeout(() => setNewsletterStatus('success'), 1500);
  };

  if (view === 'dashboard') {
    return (
      <Dashboard 
        posts={allPosts} 
        profileImage={profileImage}
        onDeletePost={handleDeletePost}
        onAddPost={handleAddPost}
        onUpdateProfile={handleUpdateProfileImage}
        onExit={() => setView('main')}
      />
    );
  }

  return (
    <div className="min-h-screen bg-bg-main font-sans selection:bg-brand-primary selection:text-white">
      <Navbar onSearch={setSearchQuery} onEnterDashboard={() => setView('dashboard')} />
      
      <AnimatePresence>
        {selectedPost && (
          <PostModal post={selectedPost} onClose={() => setSelectedPost(null)} authorImage={profileImage} />
        )}
      </AnimatePresence>

      <AdminPanel 
        onAddPost={handleAddPost} 
        onUpdateProfile={handleUpdateProfileImage}
        currentProfileImage={profileImage}
      />

      <main>
        <Hero profileImage={profileImage} />
        
        <ServicesSection />

        <section id="about" className="section-padding rtl">
           <div className="bento-card p-12 bg-white relative overflow-hidden">
              <div className="absolute top-0 left-0 w-32 h-32 bg-brand-primary/5 rounded-full -ml-16 -mt-16" />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-right items-center">
                 <div className="md:col-span-2">
                    <div className="text-brand-primary font-bold text-[10px] uppercase tracking-widest mb-2">من أنا؟</div>
                    <h2 className="text-3xl font-black text-slate-900 mb-6 tracking-tight">رؤية حديثة للموارد البشرية والتقنية</h2>
                    <p className="text-slate-600 leading-relaxed mb-8">
                       {ABOUT_ME.bio}
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                       {ABOUT_ME.goals.map((item, i) => (
                          <div key={i} className="flex items-center gap-3 bg-slate-50 p-4 rounded-2xl border border-black/5">
                             <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-brand-primary shadow-sm">
                                <Target size={16} />
                             </div>
                             <span className="text-xs font-bold text-slate-700">{item}</span>
                          </div>
                       ))}
                    </div>
                 </div>
                 <div className="flex flex-col items-center gap-6">
                    <div className="relative group">
                       <div className="w-48 h-48 rounded-[2rem] bg-brand-primary overflow-hidden rotate-3 group-hover:rotate-0 transition-transform duration-500 shadow-2xl shadow-brand-primary/20">
                          <img src={profileImage} alt={ABOUT_ME.name} className="w-full h-full object-cover" />
                       </div>
                       <label className="absolute inset-0 flex items-center justify-center bg-black/40 text-white rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                          <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
                          <div className="flex flex-col items-center gap-2">
                             <Camera size={32} />
                             <span className="text-[10px] font-bold uppercase tracking-widest">تغيير الصورة</span>
                          </div>
                       </label>
                    </div>
                    <div className="text-center">
                       <h3 className="text-xl font-black text-slate-900">{ABOUT_ME.name}</h3>
                       <p className="text-xs font-bold text-brand-primary mt-1">تطوير أنظمة HR ذكية</p>
                       <div className="flex gap-2 mt-4">
                          <a href={ABOUT_ME.social.whatsapp} target="_blank" rel="noopener noreferrer" className="p-2 border border-black/5 rounded-xl text-green-600 hover:bg-green-50 transition-colors">
                             <MessageCircle size={18} />
                          </a>
                          <a href={ABOUT_ME.social.facebook} target="_blank" rel="noopener noreferrer" className="p-2 border border-black/5 rounded-xl text-blue-600 hover:bg-blue-50 transition-colors">
                             <Facebook size={18} />
                          </a>
                          <a href={ABOUT_ME.social.linkedin} target="_blank" rel="noopener noreferrer" className="p-2 border border-black/5 rounded-xl text-slate-400 hover:bg-slate-50 transition-colors">
                             <Linkedin size={18} />
                          </a>
                       </div>
                    </div>
                 </div>
              </div>
           </div>
        </section>

        <TestimonialsSection />

        <section id="articles" className="section-padding rtl">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 text-right gap-6">
             <div>
                <div className="text-brand-primary font-bold text-[10px] uppercase tracking-widest mb-1">المكتبة</div>
                <h2 className="text-3xl font-black text-slate-900">أحدث المقالات</h2>
             </div>
             <div className="flex flex-wrap gap-2">
                {['الكل', 'تكنولوجيا الموارد البشرية', 'ثقافة العمل', 'القيادة', 'توظيف'].map(cat => (
                  <button 
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${selectedCategory === cat ? 'bg-brand-primary text-white shadow-lg shadow-brand-primary/30' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'}`}
                  >
                    {cat}
                  </button>
                ))}
             </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post, idx) => (
              <PostCard 
                key={post.id} 
                post={post} 
                index={idx} 
                authorImage={profileImage}
                onClick={() => setSelectedPost(post)} 
                onDelete={handleDeletePost}
              />
            ))}
            {filteredPosts.length === 0 && (
              <div className="col-span-full py-20 text-center bg-slate-50 rounded-[2.5rem] border-2 border-dashed border-slate-200">
                <div className="text-slate-400 mb-2 italic">لم نجد أي مقال بهذا الوصف...</div>
                <button onClick={() => {setSearchQuery(''); setSelectedCategory('الكل');}} className="text-brand-primary font-bold text-sm underline">إعادة الضبط</button>
              </div>
            )}
          </div>
        </section>

        <ContactForm />

        {/* Newsletter Bento Style */}
        <section id="newsletter" className="section-padding rtl mb-12">
           <div className="bento-card p-1 items-center overflow-hidden">
             <div className="grid grid-cols-1 md:grid-cols-2 bg-brand-primary text-white rounded-[1.25rem]">
                <div className="p-10 md:p-16 flex flex-col justify-center">
                   <h2 className="text-3xl md:text-5xl font-black mb-6 leading-tight">ابقَ على اطلاع <br/> بآخر التطورات</h2>
                   <p className="text-blue-100 text-lg mb-8 leading-relaxed">انضم لأكثر من ٥٠٠ خبير في الموارد البشرية يتلقون نصائحنا الأسبوعية.</p>
                   
                   <AnimatePresence mode="wait">
                    {newsletterStatus === 'success' ? (
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-white/10 backdrop-blur-md rounded-2xl p-6 flex items-center gap-4 border border-white/20"
                      >
                         <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-green-500">
                            <CheckCircle2 size={24} />
                         </div>
                         <div>
                            <div className="font-bold">شكراً لإشتراكك!</div>
                            <div className="text-xs text-blue-100">ستصلك رسائلنا قريباً.</div>
                         </div>
                      </motion.div>
                    ) : (
                      <motion.div 
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="flex flex-col sm:flex-row gap-3 max-w-md"
                      >
                        <input type="text" placeholder="البريد الإلكتروني" className="bg-white/10 border border-white/20 rounded-xl px-4 py-4 text-sm flex-1 placeholder:text-white/60 outline-none focus:bg-white/20 transition-all font-bold" />
                        <button 
                          onClick={handleNewsletterSubmit}
                          disabled={newsletterStatus === 'loading'}
                          className="bg-white text-brand-primary px-8 py-4 sm:py-0 rounded-xl font-black transition-all hover:bg-slate-50 shadow-xl shadow-brand-primary/20 disabled:opacity-50"
                        >
                          {newsletterStatus === 'loading' ? 'جاري...' : 'اشترك'}
                        </button>
                      </motion.div>
                    )}
                   </AnimatePresence>
                </div>
                <div className="hidden md:block relative h-full min-h-[400px]">
                   <img src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800" className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-overlay" alt="" />
                   <div className="absolute inset-0 bg-gradient-to-r from-brand-primary to-transparent" />
                </div>
             </div>
           </div>
        </section>

        <FAQSection />

      </main>
      
      <Footer />
    </div>
  );
}
