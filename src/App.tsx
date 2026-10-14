import React, { useState } from 'react';
import { Flame, Activity, User, Utensils, RefreshCw, ChevronRight, CheckCircle2, Settings, ChefHat, ShoppingCart, X, Globe } from 'lucide-react';

const APP_NAME = 'MacroMate';

const ACTIVITY_VALUES = [1.2, 1.375, 1.55, 1.725, 1.9];
const GOAL_VALUES = [-1000, -500, 0, 500, 1000];
const DIET_PREFERENCES = ['Standard', 'Vegetarian', 'Vegan', 'Keto', 'Low Carb', 'Low Fat', 'High Protein', 'Mediterranean'];
const BUDGET_LEVELS = ['Budget-friendly (1000~1500)', 'Medium (1500~2000)', 'High (2000+)'];

const TRANSLATIONS = {
  en: {
    title: APP_NAME,
    subtitle: 'Smart TDEE Calculator & AI Diet Planner',
    stats: 'Your Stats',
    gender: 'Gender',
    male: 'Male',
    female: 'Female',
    age: 'Age',
    years: 'Years',
    weight: 'Weight (kg)',
    height: 'Height (cm)',
    activity: 'Activity Level',
    goal: 'Diet Goal',
    calcTargets: 'Calculate Targets',
    prefs: 'Diet Preferences',
    dietType: 'Dietary Preference',
    budget: 'Budget',
    medical: 'Medical Conditions (Optional)',
    allergies: 'Allergies (Optional)',
    dislikes: 'Disliked Foods (Optional)',
    awaiting: 'Awaiting Your Stats',
    awaitingDesc: 'Enter your physical statistics to calculate your total daily energy expenditure and unlock personalized AI diet planning.',
    dailyTarget: 'Your Daily Target',
    maintenance: 'Maintenance',
    generating: 'Generating Plan...',
    generatePlan: 'Generate AI Diet Plan',
    generateGrocery: 'Generate Grocery List for Today',
    recipe: 'Recipe',
    swap: 'Swap',
    swapping: 'Swapping',
    prep: 'Prep',
    cook: 'Cook',
    ingredients: 'Ingredients',
    instructions: 'Instructions',
    compilingGrocery: 'Compiling your shopping list...',
    writingRecipe: 'Chef Gemini is writing your recipe...',
    kcal: 'kcal',
    kcalDay: 'kcal / day',
    protein: 'Protein',
    carbs: 'Carbs',
    fat: 'Fat',
    dietNotes: 'All food quantities in metric units.',
    placeholderMedical: 'e.g., Hypertension, Diabetes',
    placeholderAllergies: 'e.g., Peanuts, dairy, seafood',
    placeholderDislikes: 'e.g., Mushrooms, olives, liver',
    activityLevels: [
      'Sedentary (office job, little to no exercise)',
      'Lightly Active (light exercise/sports 1-3 days/week)',
      'Moderately Active (moderate exercise/sports 3-5 days/week)',
      'Very Active (hard exercise/sports 6-7 days a week)',
      'Extra Active (very hard exercise/physical job)'
    ],
    goalOptions: [
      'Aggressive Deficit (-1000 kcal)',
      'Moderate Deficit (-500 kcal)',
      'Maintenance (0 kcal)',
      'Moderate Surplus (+500 kcal)',
      'Aggressive Surplus (+1000 kcal)'
    ],
    dietPrefs: ['Standard', 'Vegetarian', 'Vegan', 'Keto', 'Low Carb', 'Low Fat', 'High Protein', 'Mediterranean'],
    budgetLevels: ['Budget-friendly (1000~1500)', 'Medium (1500~2000)', 'High (2000+)']
  },
  ar: {
    title: 'MacroMate',
    subtitle: 'حاسبة السعرات الذكية ومخطط النظام الغذائي',
    stats: 'إحصائياتك',
    gender: 'الجنس',
    male: 'ذكر',
    female: 'أنثى',
    age: 'العمر',
    years: 'سنة',
    weight: 'الوزن (كجم)',
    height: 'الطول (سم)',
    activity: 'مستوى النشاط',
    goal: 'الهدف الغذائي',
    calcTargets: 'حساب الأهداف',
    prefs: 'التفضيلات الغذائية',
    dietType: 'نوع النظام الغذائي',
    budget: 'الميزانية',
    medical: 'حالات طبية (اختياري)',
    allergies: 'حساسية (اختياري)',
    dislikes: 'أطعمة غير مفضلة (اختياري)',
    awaiting: 'في انتظار بياناتك',
    awaitingDesc: 'أدخل بياناتك البدنية لحساب إجمالي احتياجك اليومي للطاقة واستكشاف خطة نظامك الغذائي المخصصة بالذكاء الاصطناعي.',
    dailyTarget: 'هدفك اليومي',
    maintenance: 'السعرات الأساسية',
    generating: 'جاري إنشاء الخطة...',
    generatePlan: 'إنشاء خطة غذائية',
    generateGrocery: 'إنشاء قائمة التسوق لليوم',
    recipe: 'الوصفة',
    swap: 'تبديل',
    swapping: 'جاري التبديل',
    prep: 'التحضير',
    cook: 'الطبخ',
    ingredients: 'المكونات',
    instructions: 'طريقة التحضير',
    compilingGrocery: 'جاري تجميع قائمة التسوق...',
    writingRecipe: 'الشيف الذكي يكتب وصفتك...',
    kcal: 'سعرة',
    kcalDay: 'سعرة / يوم',
    protein: 'بروتين',
    carbs: 'كربوهيدرات',
    fat: 'دهون',
    dietNotes: 'جميع الكميات بالوحدات المترية.',
    placeholderMedical: 'مثال: ارتفاع ضغط الدم، السكري',
    placeholderAllergies: 'مثال: الفول السوداني، الألبان',
    placeholderDislikes: 'مثال: الفطر، الزيتون، الكبدة',
    activityLevels: [
      'خامل (عمل مكتبي، تمرين قليل أو معدوم)',
      'نشط قليلاً (تمرين خفيف/رياضة 1-3 أيام/أسبوع)',
      'نشط باعتدال (تمرين متوسط/رياضة 3-5 أيام/أسبوع)',
      'نشط جداً (تمرين شاق/رياضة 6-7 أيام في الأسبوع)',
      'نشاط إضافي (تمرين شاق جداً/وظيفة بدنية)'
    ],
    goalOptions: [
      'عجز شديد (-1000 سعرة)',
      'عجز معتدل (-500 سعرة)',
      'المحافظة على الوزن (0 سعرة)',
      'فائض معتدل (+500 سعرة)',
      'فائض شديد (+1000 سعرة)'
    ],
    dietPrefs: ['قياسي', 'نباتي', 'نباتي صرف', 'كيتو', 'منخفض الكربوهيدرات', 'قليل الدسم', 'عالي البروتين', 'متوسطي'],
    budgetLevels: ['اقتصادي (1000~1500)', 'متوسط (1500~2000)', 'مرتفع (2000+)']
  }
};

const MEAL_SCHEMA = {
  type: "OBJECT",
  properties: {
    mealName: { type: "STRING", description: "e.g., Breakfast, Lunch, Dinner, Snack" },
    calories: { type: "NUMBER" },
    protein: { type: "NUMBER", description: "grams" },
    carbs: { type: "NUMBER", description: "grams" },
    fat: { type: "NUMBER", description: "grams" },
    foods: { type: "ARRAY", items: { type: "STRING", description: "Food with quantity in metric units, e.g., '150g chicken breast' or '2 eggs'" } }
  }
};

const PLAN_SCHEMA = {
  type: "OBJECT",
  properties: {
    summary: { type: "STRING", description: "A brief, encouraging summary of the diet approach for this user." },
    meals: { type: "ARRAY", items: MEAL_SCHEMA }
  }
};

const RECIPE_SCHEMA = {
  type: "OBJECT",
  properties: {
    prepTime: { type: "STRING", description: "e.g., 10 mins" },
    cookTime: { type: "STRING", description: "e.g., 15 mins" },
    ingredients: { type: "ARRAY", items: { type: "STRING", description: "Ingredient with metric quantity, e.g., '200ml milk'" } },
    instructions: { type: "ARRAY", items: { type: "STRING", description: "Step by step instruction" } }
  }
};

const GROCERY_SCHEMA = {
  type: "ARRAY",
  items: {
    type: "OBJECT",
    properties: {
      category: { type: "STRING", description: "e.g., Produce, Meat & Seafood, Dairy, Pantry" },
      items: { type: "ARRAY", items: { type: "STRING", description: "Ingredient with total daily quantity in metric units" } }
    }
  }
};

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const callGemini = async (prompt: string, schema: any) => {
  const apiUrl = import.meta.env.VITE_LAMBDA_API_URL;

  if (!apiUrl) {
    throw new Error("Lambda API URL is missing! Check your .env file.");
  }

  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt, schema })
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || `Server error (${response.status})`);
  }

  return data;
};
const MACRO_RULES = {
  'Standard':      { protein: 1.8, fatShare: 0.25 },
  'Vegetarian':    { protein: 1.8, fatShare: 0.25 },
  'Vegan':         { protein: 1.8, fatShare: 0.25 },
  'Mediterranean': { protein: 1.8, fatShare: 0.30 },
  'Keto':          { protein: 1.8, carbsG: 30 },
  'Low Carb':      { protein: 1.8, carbsShare: 0.25 },
  'Low Fat':       { protein: 1.8, fatShare: 0.20 },
  'High Protein':  { protein: 2.2, fatShare: 0.25 }
};

const calcTargets = (calories, weightKg, diet) => {
  const r = MACRO_RULES[diet] || MACRO_RULES['Standard'];
  const protein = Math.round(r.protein * weightKg);
  let carbs, fat;
  if (r.carbsG !== undefined || r.carbsShare !== undefined) {
    carbs = r.carbsG !== undefined ? r.carbsG : Math.round((calories * r.carbsShare) / 4);
    fat = Math.max(0, Math.round((calories - protein * 4 - carbs * 4) / 9));
  } else {
    fat = Math.round((calories * r.fatShare) / 9);
    carbs = Math.max(0, Math.round((calories - protein * 4 - fat * 9) / 4));
  }
  return { calories, protein, carbs, fat };
};

const sumMacros = (meals = []) => meals.reduce(
  (t, m) => ({
    calories: t.calories + (m.calories || 0),
    protein: t.protein + (m.protein || 0),
    carbs: t.carbs + (m.carbs || 0),
    fat: t.fat + (m.fat || 0)
  }),
  { calories: 0, protein: 0, carbs: 0, fat: 0 }
);

const MacroDonut = ({ totals, t }) => {
  const parts = [
    { label: t.protein, kcal: totals.protein * 4, color: '#10b981' }, 
    { label: t.carbs, kcal: totals.carbs * 4, color: '#38bdf8' },     
    { label: t.fat, kcal: totals.fat * 9, color: '#fb923c' }         
  ];
  const sum = parts.reduce((s, p) => s + p.kcal, 0) || 1;
  const r = 52;
  const c = 2 * Math.PI * r;
  let offset = 0;
  return (
    <div className="flex flex-col items-center gap-3 shrink-0">
      <div className="relative w-40 h-40">
        <svg viewBox="0 0 140 140" className="w-full h-full -rotate-90">
          <circle cx="70" cy="70" r={r} fill="none" stroke="#1e293b" strokeWidth="16" />
          {parts.map(p => {
            const len = (p.kcal / sum) * c;
            const el = (
              <circle key={p.label} cx="70" cy="70" r={r} fill="none" stroke={p.color} strokeWidth="16"
                strokeDasharray={`${len} ${c - len}`} strokeDashoffset={-offset} />
            );
            offset += len;
            return el;
          })}
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-bold text-slate-100">{Math.round(totals.calories)}</span>
          <span className="text-xs text-slate-400">{t.kcal}</span>
        </div>
      </div>
      <div className="flex gap-3 text-xs text-slate-400">
        {parts.map(p => (
          <span key={p.label} className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full" style={{ background: p.color }} />
            {p.label} {Math.round((p.kcal / sum) * 100)}%
          </span>
        ))}
      </div>
    </div>
  );
};

const MacroBar = ({ label, unit, actual, target, color }) => {
  const pct = target ? Math.min(100, (actual / target) * 100) : 0;
  const off = target && Math.abs(actual - target) / target > 0.1;
  return (
    <div>
      <div className="flex justify-between text-sm mb-1.5">
        <span className="text-slate-300 font-medium">{label}</span>
        <span className={off ? 'text-amber-400 font-medium' : 'text-slate-400'}>
          {Math.round(actual)} / {target} {unit}
        </span>
      </div>
      <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
        <div className={`h-full rounded-full ${color}`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
};

export default function App() {
  const [lang, setLang] = useState<'en' | 'ar'>('en');
  const t = TRANSLATIONS[lang];

  // Form State
  const [gender, setGender] = useState('male');
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [activity, setActivity] = useState(1.2);
  const [calorieGoal, setCalorieGoal] = useState(0);

  // Diet Preferences State
  const [dietPreference, setDietPreference] = useState(DIET_PREFERENCES[0]);
  const [allergies, setAllergies] = useState('');
  const [dislikes, setDislikes] = useState('');
  const [medicalConditions, setMedicalConditions] = useState('');
  const [budget, setBudget] = useState(BUDGET_LEVELS[1]);

  // Result State
  const [tdee, setTdee] = useState(null);
  const [targetCalories, setTargetCalories] = useState(null);
  const [bmr, setBmr] = useState(null);
  
  // AI Plan State
  const [dietPlan, setDietPlan] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState(null);
  const [profile, setProfile] = useState(null);
  const [targets, setTargets] = useState(null);
  const [swappingIndex, setSwappingIndex] = useState(null);

  const [recipeModal, setRecipeModal] = useState({ isOpen: false, data: null, mealName: '', isLoading: false });
  const [groceryModal, setGroceryModal] = useState({ isOpen: false, data: null, isLoading: false });

  const calculateTDEE = (e) => {
    e.preventDefault();
    if (!age || !weight || !height) return;

    const w = parseFloat(weight);
    const h = parseFloat(height);
    const a = parseFloat(age);
    
    let calculatedBMR = 0;
    if (gender === 'male') {
      calculatedBMR = (10 * w) + (6.25 * h) - (5 * a) + 5;
    } else {
      calculatedBMR = (10 * w) + (6.25 * h) - (5 * a) - 161;
    }

    const calculatedTDEE = calculatedBMR * activity;
    const finalTarget = Math.round(calculatedTDEE) + calorieGoal;
    
    const safeTarget = Math.max(1200, finalTarget);

    setBmr(Math.round(calculatedBMR));
    setTdee(Math.round(calculatedTDEE));
    setTargetCalories(safeTarget);
    setProfile({ gender, age: a, weight: w, height: h }); 
    setDietPlan(null); 
    setError(null);
  };

  const constraints = () => `Dietary Preference: ${dietPreference} (follow strictly).
All food quantities and measurements MUST be in the metric system (e.g., grams, milliliters).
Budget: ${budget}.
${allergies ? `ALLERGIES - never include these or anything containing them: ${allergies}.` : ''}
${dislikes ? `Disliked foods - avoid these: ${dislikes}.` : ''}
${medicalConditions ? `MEDICAL CONDITIONS: ${medicalConditions}. Ensure the diet strictly accommodates these conditions (e.g., low sodium for hypertension, low glycemic index for diabetes).` : ''}
IMPORTANT LANGUAGE INSTRUCTION: You MUST respond entirely in ${lang === 'ar' ? 'Arabic' : 'English'}. The JSON keys must remain exactly as defined in the schema, but ALL string values (summaries, meal names, food names, ingredients, instructions, categories) MUST be translated to ${lang === 'ar' ? 'Arabic' : 'English'}.`;

  const generateDietPlan = async () => {
    if (!targetCalories || !profile) return;
    setIsGenerating(true);
    setError(null);

    const targetMacros = calcTargets(targetCalories, profile.weight, dietPreference);
    setTargets(targetMacros);

    const prompt = `Act as an expert nutritionist. Create a 1-day structured diet plan for a ${profile.age} year old ${profile.gender} weighing ${profile.weight}kg, ${profile.height}cm tall.
Daily targets (meals must add up to these as closely as possible): ${targetMacros.calories} kcal, ${targetMacros.protein}g protein, ${targetMacros.carbs}g carbs, ${targetMacros.fat}g fat.
${constraints()}
Use 4-5 meals including snacks. Give calories and protein/carbs/fat in grams for every meal.`;

    try {
      setDietPlan(await callGemini(prompt, PLAN_SCHEMA));
    } catch (err) {
      console.error("AI Generation Error:", err);
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setIsGenerating(false);
    }
  };

  const swapMeal = async (index) => {
    const meal = dietPlan.meals[index];
    setSwappingIndex(index);
    setError(null);

    const otherFoods = dietPlan.meals.filter((_, i) => i !== index).flatMap(m => m.foods).join(', ');
    const prompt = `Replace one meal in a daily diet plan with a different meal that has about the same macros.
Meal slot: ${meal.mealName}. Target: ${meal.calories} kcal, ${meal.protein}g protein, ${meal.carbs}g carbs, ${meal.fat}g fat.
Current meal (do NOT repeat it): ${meal.foods.join(', ')}.
Other foods already in today's plan (avoid duplicating): ${otherFoods}.
${constraints()}`;

    try {
      const newMeal = await callGemini(prompt, MEAL_SCHEMA);
      setDietPlan(prev => ({ ...prev, meals: prev.meals.map((m, i) => (i === index ? newMeal : m)) }));
    } catch (err) {
      console.error("Swap Error:", err);
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setSwappingIndex(null);
    }
  };

  const generateRecipe = async (meal) => {
    setRecipeModal({ isOpen: true, data: null, mealName: meal.mealName, isLoading: true });
    
    const prompt = `Act as an expert chef. Provide a quick, easy-to-follow recipe for this meal: ${meal.foods.join(', ')}. 
    Keep it healthy, realistic, and tailored to a ${dietPreference} diet. Output the prep time, cook time, a cleaned up ingredients list strictly using metric units, and step-by-step instructions.
    ${constraints()}`;
    
    try {
      const recipeData = await callGemini(prompt, RECIPE_SCHEMA);
      setRecipeModal({ isOpen: true, data: recipeData, mealName: meal.mealName, isLoading: false });
    } catch (err) {
      console.error("Recipe Generation Error:", err);
      setRecipeModal({ isOpen: false, data: null, mealName: '', isLoading: false });
      setError("Failed to generate recipe.");
    }
  };

  const generateGroceryList = async () => {
    if (!dietPlan) return;
    setGroceryModal({ isOpen: true, data: null, isLoading: true });
    
    const allFoods = dietPlan.meals.flatMap(m => m.foods).join(', ');
    const prompt = `Act as a helpful nutritionist assistant. I have a 1-day meal plan consisting of these items: ${allFoods}.
    Please consolidate these items and generate a categorized grocery shopping list. Combine quantities where it makes sense and use metric units exclusively.
    ${constraints()}`;
    
    try {
      const groceryData = await callGemini(prompt, GROCERY_SCHEMA);
      setGroceryModal({ isOpen: true, data: groceryData, isLoading: false });
    } catch (err) {
      console.error("Grocery List Error:", err);
      setGroceryModal({ isOpen: false, data: null, isLoading: false });
      setError("Failed to generate grocery list.");
    }
  };

  const totals = dietPlan ? sumMacros(dietPlan.meals) : null;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-4 md:p-8" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      
      <header className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10 pb-6 border-b border-slate-800/80">
        <div className="flex items-center gap-3">
          <div className="bg-emerald-500/10 border border-emerald-500/20 p-2.5 rounded-xl">
            <Flame className="w-7 h-7 text-emerald-400" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-100">{t.title}</h1>
            <p className="text-slate-400 text-sm font-medium">{t.subtitle}</p>
          </div>
        </div>
        
        <button 
          onClick={() => setLang(lang === 'en' ? 'ar' : 'en')}
          className="flex items-center gap-2 px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-sm text-slate-300 hover:text-white hover:bg-slate-800 transition-colors self-start md:self-auto"
        >
          <Globe className="w-4 h-4" />
          {lang === 'en' ? 'العربية' : 'English'}
        </button>
      </header>

      <main className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        <div className="lg:col-span-4 space-y-6">
          
          <div className="bg-slate-900/90 rounded-2xl p-6 border border-slate-800 shadow-sm h-fit">
            <div className="flex items-center gap-2 mb-6">
              <User className="w-5 h-5 text-emerald-400" />
              <h2 className="text-xl font-semibold text-slate-100">{t.stats}</h2>
            </div>
            
            <form onSubmit={calculateTDEE} className="space-y-5">
              <div className="flex bg-slate-800/80 p-1 rounded-lg border border-slate-700/60">
                <button
                  type="button"
                  onClick={() => setGender('male')}
                  className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors ${gender === 'male' ? 'bg-slate-700 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'}`}
                >
                  {t.male}
                </button>
                <button
                  type="button"
                  onClick={() => setGender('female')}
                  className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors ${gender === 'female' ? 'bg-slate-700 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'}`}
                >
                  {t.female}
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-1">{t.age}</label>
                  <input
                    type="number"
                    required
                    min="1"
                    max="120"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    className="w-full bg-slate-800/60 border border-slate-700 rounded-lg px-4 py-2.5 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500/60 focus:ring-1 focus:ring-emerald-500/60 transition-all text-sm"
                    placeholder={t.years}
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-1">{t.weight}</label>
                  <input
                    type="number"
                    required
                    min="20"
                    max="300"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    className="w-full bg-slate-800/60 border border-slate-700 rounded-lg px-4 py-2.5 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500/60 focus:ring-1 focus:ring-emerald-500/60 transition-all text-sm"
                    placeholder="kg"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-1">{t.height}</label>
                <input
                  type="number"
                  required
                  min="50"
                  max="300"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  className="w-full bg-slate-800/60 border border-slate-700 rounded-lg px-4 py-2.5 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500/60 focus:ring-1 focus:ring-emerald-500/60 transition-all text-sm"
                  placeholder="cm"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-1">{t.activity}</label>
                <select
                  value={activity}
                  onChange={(e) => setActivity(parseFloat(e.target.value))}
                  className="w-full bg-slate-800/60 border border-slate-700 rounded-lg px-4 py-2.5 text-slate-100 focus:outline-none focus:border-emerald-500/60 focus:ring-1 focus:ring-emerald-500/60 transition-all text-sm"
                >
                  {ACTIVITY_VALUES.map((val, i) => (
                    <option key={val} value={val} className="bg-slate-900 text-slate-100">{t.activityLevels[i]}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-1">{t.goal}</label>
                <select
                  value={calorieGoal}
                  onChange={(e) => setCalorieGoal(Number(e.target.value))}
                  className="w-full bg-slate-800/60 border border-slate-700 rounded-lg px-4 py-2.5 text-slate-100 focus:outline-none focus:border-emerald-500/60 focus:ring-1 focus:ring-emerald-500/60 transition-all text-sm"
                >
                  {GOAL_VALUES.map((val, i) => (
                    <option key={val} value={val} className="bg-slate-900 text-slate-100">{t.goalOptions[i]}</option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors mt-4 shadow-sm"
              >
                {t.calcTargets} <ChevronRight className={`w-4 h-4 ${lang === 'ar' ? 'rotate-180' : ''}`} />
              </button>
            </form>
          </div>

          <div className="bg-slate-900/90 rounded-2xl p-6 border border-slate-800 shadow-sm h-fit">
            <div className="flex items-center gap-2 mb-6">
              <Settings className="w-5 h-5 text-emerald-400" />
              <h2 className="text-xl font-semibold text-slate-100">{t.prefs}</h2>
            </div>
            
            <div className="space-y-5">
              <div>
                <label className="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-1">{t.dietType}</label>
                <select
                  value={dietPreference}
                  onChange={(e) => setDietPreference(e.target.value)}
                  className="w-full bg-slate-800/60 border border-slate-700 rounded-lg px-4 py-2.5 text-slate-100 focus:outline-none focus:border-emerald-500/60 focus:ring-1 focus:ring-emerald-500/60 transition-all text-sm"
                >
                  {DIET_PREFERENCES.map((pref, i) => (
                    <option key={pref} value={pref} className="bg-slate-900 text-slate-100">{t.dietPrefs[i]}</option>
                  ))}
                </select>
                <p className="text-xs text-slate-400 mt-1.5">{t.dietNotes}</p>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-1">{t.budget}</label>
                <select
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  className="w-full bg-slate-800/60 border border-slate-700 rounded-lg px-4 py-2.5 text-slate-100 focus:outline-none focus:border-emerald-500/60 focus:ring-1 focus:ring-emerald-500/60 transition-all text-sm"
                >
                  {BUDGET_LEVELS.map((level, i) => (
                    <option key={level} value={level} className="bg-slate-900 text-slate-100">{t.budgetLevels[i]}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-1">{t.medical}</label>
                <input
                  type="text"
                  value={medicalConditions}
                  onChange={(e) => setMedicalConditions(e.target.value)}
                  className="w-full bg-slate-800/60 border border-slate-700 rounded-lg px-4 py-2.5 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500/60 focus:ring-1 focus:ring-emerald-500/60 transition-all text-sm"
                  placeholder={t.placeholderMedical}
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-1">{t.allergies}</label>
                <input
                  type="text"
                  value={allergies}
                  onChange={(e) => setAllergies(e.target.value)}
                  className="w-full bg-slate-800/60 border border-slate-700 rounded-lg px-4 py-2.5 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500/60 focus:ring-1 focus:ring-emerald-500/60 transition-all text-sm"
                  placeholder={t.placeholderAllergies}
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-1">{t.dislikes}</label>
                <input
                  type="text"
                  value={dislikes}
                  onChange={(e) => setDislikes(e.target.value)}
                  className="w-full bg-slate-800/60 border border-slate-700 rounded-lg px-4 py-2.5 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500/60 focus:ring-1 focus:ring-emerald-500/60 transition-all text-sm"
                  placeholder={t.placeholderDislikes}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-8 space-y-6">
          
          {targetCalories ? (
             <div className="bg-slate-900/90 rounded-2xl p-6 border border-slate-800 shadow-sm relative overflow-hidden">
               <div className="absolute top-0 right-0 p-16 bg-emerald-500/5 rounded-full blur-3xl -mx-10 -mt-10 pointer-events-none"></div>
               
               <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
                 <div>
                   <h3 className="text-slate-400 text-sm font-semibold uppercase tracking-wider mb-1">{t.dailyTarget}</h3>
                   <div className="flex items-end gap-2">
                     <span className="text-5xl font-extrabold text-emerald-400">
                       {targetCalories.toLocaleString()}
                     </span>
                     <span className="text-slate-400 mb-1 font-medium">{t.kcalDay}</span>
                   </div>
                   <p className="text-sm text-slate-400 mt-2">
                     {t.maintenance}: <span className="text-slate-200 font-medium">{tdee.toLocaleString()} {t.kcal}</span> | BMR: <span className="text-slate-200 font-medium">{bmr.toLocaleString()} {t.kcal}</span>
                   </p>
                 </div>
                 
                 <div className="w-full md:w-auto">
                   <button
                     onClick={generateDietPlan}
                     disabled={isGenerating}
                     className="w-full md:w-auto bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-xl flex items-center justify-center gap-2 transition-all border border-emerald-500/30 shadow-sm"
                   >
                     {isGenerating ? (
                       <><RefreshCw className="w-5 h-5 animate-spin" /> {t.generating}</>
                     ) : (
                       <><Utensils className="w-5 h-5" /> {t.generatePlan}</>
                     )}
                   </button>
                 </div>
               </div>
             </div>
          ) : (
             <div className="bg-slate-900/50 rounded-2xl p-10 border border-slate-800 border-dashed flex flex-col items-center justify-center text-center h-full min-h-[300px]">
                <Activity className="w-12 h-12 text-slate-600 mb-4" />
                <h3 className="text-xl font-medium text-slate-200 mb-2">{t.awaiting}</h3>
                <p className="text-slate-400 max-w-sm">{t.awaitingDesc}</p>
             </div>
          )}

          {error && (
            <div className="bg-rose-500/10 border border-rose-500/20 rounded-xl p-4 text-rose-400 text-sm flex items-center gap-2">
              <RefreshCw className="w-4 h-4" /> {error}
            </div>
          )}

          {dietPlan && !isGenerating && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              
              <div className="bg-slate-900/90 rounded-2xl p-6 border border-slate-800 shadow-sm">
                <p className="text-slate-200 text-lg leading-relaxed mb-6 italic">"{dietPlan.summary}"</p>

                <div className="flex flex-col md:flex-row items-center gap-8">
                  <MacroDonut totals={totals} t={t} />
                  <div className="flex-1 w-full space-y-4">
                    <MacroBar label={t.kcal} unit={t.kcal} actual={totals.calories} target={targets.calories} color="bg-slate-300" />
                    <MacroBar label={t.protein} unit="g" actual={totals.protein} target={targets.protein} color="bg-emerald-500" />
                    <MacroBar label={t.carbs} unit="g" actual={totals.carbs} target={targets.carbs} color="bg-sky-400" />
                    <MacroBar label={t.fat} unit="g" actual={totals.fat} target={targets.fat} color="bg-amber-400" />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {dietPlan.meals?.map((meal, index) => (
                  <div key={index} className="bg-slate-900/90 rounded-2xl p-5 border border-slate-800 shadow-sm flex flex-col h-full">
                    <div className="flex justify-between items-start mb-4 border-b border-slate-800 pb-3">
                      <h4 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                        <span className="bg-emerald-500/15 text-emerald-400 text-xs w-6 h-6 flex items-center justify-center rounded-full font-semibold border border-emerald-500/20">{index + 1}</span>
                        {meal.mealName}
                      </h4>
                      <div className="flex flex-col items-end gap-1">
                        <span className="bg-slate-800 text-slate-200 text-sm font-semibold px-3 py-1 rounded-full border border-slate-700">
                          {meal.calories} {t.kcal}
                        </span>
                        <span className="text-xs text-slate-400 font-medium">
                          {meal.protein}P / {meal.carbs}C / {meal.fat}F
                        </span>
                      </div>
                    </div>
                    <ul className="space-y-3 flex-grow">
                      {meal.foods?.map((food, fIdx) => (
                        <li key={fIdx} className="flex items-start gap-2 text-sm text-slate-300">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                          <span className="leading-tight">{food}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-5 grid grid-cols-2 gap-2">
                      <button
                        onClick={() => generateRecipe(meal)}
                        className="w-full text-xs text-emerald-300 font-semibold bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/30 rounded-lg py-2 flex items-center justify-center gap-1.5 transition-colors"
                      >
                        <ChefHat className="w-3.5 h-3.5" />
                        {t.recipe}
                      </button>
                      <button
                        onClick={() => swapMeal(index)}
                        disabled={swappingIndex !== null}
                        className="w-full text-xs text-slate-300 hover:text-white disabled:opacity-50 border border-slate-700 hover:border-slate-600 bg-slate-800/40 rounded-lg py-2 flex items-center justify-center gap-1.5 transition-colors"
                      >
                        <RefreshCw className={`w-3.5 h-3.5 ${swappingIndex === index ? 'animate-spin' : ''}`} />
                        {swappingIndex === index ? t.swapping : t.swap}
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-4 flex justify-center">
                <button
                  onClick={generateGroceryList}
                  className="bg-slate-900 hover:bg-slate-800 text-slate-100 font-medium py-3 px-6 rounded-xl flex items-center gap-2 border border-slate-700 transition-colors shadow-sm"
                >
                  <ShoppingCart className="w-5 h-5 text-emerald-400" />
                  {t.generateGrocery}
                </button>
              </div>

            </div>
          )}

        </div>
      </main>

      {/* Recipe Modal */}
      {recipeModal.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-slate-900 rounded-2xl w-full max-w-lg border border-slate-800 shadow-2xl flex flex-col max-h-[85vh]">
            <div className="p-5 border-b border-slate-800 flex justify-between items-center bg-slate-900/90 rounded-t-2xl">
              <h3 className="text-xl font-bold text-slate-100 flex items-center gap-2">
                <ChefHat className="w-5 h-5 text-emerald-400" />
                {t.recipe}: {recipeModal.mealName}
              </h3>
              <button onClick={() => setRecipeModal({ ...recipeModal, isOpen: false })} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto custom-scrollbar">
              {recipeModal.isLoading ? (
                <div className="flex flex-col items-center justify-center py-10 space-y-4">
                  <RefreshCw className="w-8 h-8 text-emerald-400 animate-spin" />
                  <p className="text-slate-400 font-medium text-sm">{t.writingRecipe}</p>
                </div>
              ) : recipeModal.data ? (
                <div className="space-y-6">
                  <div className="flex gap-4 mb-2">
                    <span className="bg-slate-800 text-slate-300 text-xs px-3 py-1.5 rounded-md border border-slate-700 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-sky-400"></span> {t.prep}: {recipeModal.data.prepTime}
                    </span>
                    <span className="bg-slate-800 text-slate-300 text-xs px-3 py-1.5 rounded-md border border-slate-700 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span> {t.cook}: {recipeModal.data.cookTime}
                    </span>
                  </div>

                  <div>
                    <h4 className="font-semibold text-emerald-400 mb-2 border-b border-slate-800 pb-1 text-sm uppercase tracking-wider">{t.ingredients}</h4>
                    <ul className="list-disc list-inside space-y-1 text-slate-300 text-sm">
                      {recipeModal.data.ingredients?.map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-emerald-400 mb-2 border-b border-slate-800 pb-1 text-sm uppercase tracking-wider">{t.instructions}</h4>
                    <ol className="space-y-3 text-slate-300 text-sm">
                      {recipeModal.data.instructions?.map((step, idx) => (
                        <li key={idx} className="flex gap-3">
                          <span className="text-slate-500 font-bold shrink-0">{idx + 1}.</span>
                          <span>{step}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      )}

      {/* Grocery List Modal */}
      {groceryModal.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-slate-900 rounded-2xl w-full max-w-md border border-slate-800 shadow-2xl flex flex-col max-h-[85vh]">
            <div className="p-5 border-b border-slate-800 flex justify-between items-center bg-slate-900/90 rounded-t-2xl">
              <h3 className="text-xl font-bold text-slate-100 flex items-center gap-2">
                <ShoppingCart className="w-5 h-5 text-emerald-400" />
                {t.generateGrocery}
              </h3>
              <button onClick={() => setGroceryModal({ ...groceryModal, isOpen: false })} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto custom-scrollbar">
              {groceryModal.isLoading ? (
                <div className="flex flex-col items-center justify-center py-10 space-y-4">
                  <RefreshCw className="w-8 h-8 text-emerald-400 animate-spin" />
                  <p className="text-slate-400 font-medium text-sm">{t.compilingGrocery}</p>
                </div>
              ) : groceryModal.data ? (
                <div className="space-y-6">
                  {groceryModal.data.map((categoryObj, idx) => (
                    <div key={idx}>
                      <h4 className="font-semibold text-emerald-400 mb-2 border-b border-slate-800 pb-1 text-sm uppercase tracking-wider">
                        {categoryObj.category}
                      </h4>
                      <ul className="space-y-2 text-slate-300 text-sm">
                        {categoryObj.items?.map((item, iIdx) => (
                          <li key={iIdx} className="flex items-start gap-2">
                            <div className="w-4 h-4 rounded border border-slate-600 bg-slate-800 mt-0.5 shrink-0"></div>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}