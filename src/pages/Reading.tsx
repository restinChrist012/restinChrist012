import { useState } from 'react';
import { PageHeader } from '../components/PageHeader';
import { CheckCircle2, Calendar, BookOpen } from 'lucide-react';

const plans = [
  { id: 'faith', title: '믿음의 여정 (7일)', desc: '믿음의 기초를 세우는 7일간의 말씀 여행', days: 7, category: '믿음' },
  { id: 'salvation', title: '구원의 확신 (30일)', desc: '구원의 도리를 깊이 깨닫는 30일 집중 통독', days: 30, category: '구원' },
  { id: 'spirit', title: '성령의 열매 (14일)', desc: '성령님과 동행하는 삶을 위한 2주 플랜', days: 14, category: '성령' },
];

export function Reading() {
  const [activePlan, setActivePlan] = useState(plans[0]);
  const [checkedDays, setCheckedDays] = useState<number[]>([]);

  const toggleDay = (day: number) => {
    if (checkedDays.includes(day)) {
      setCheckedDays(checkedDays.filter(d => d !== day));
    } else {
      setCheckedDays([...checkedDays, day]);
    }
  };

  const progress = Math.round((checkedDays.length / activePlan.days) * 100);

  return (
    <div>
      <PageHeader title="주제별 성경통독" subtitle="다양한 주제와 기간별 플랜을 통해 꾸준히 말씀을 먹습니다." />
      
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Plan List */}
          <div className="lg:col-span-1 space-y-4">
            <h3 className="text-xl font-bold mb-6">통독 플랜 선택</h3>
            {plans.map(plan => (
              <button
                key={plan.id}
                onClick={() => {
                  setActivePlan(plan);
                  setCheckedDays([]);
                }}
                className={`w-full text-left p-6 rounded-2xl border transition-all ${
                  activePlan.id === plan.id 
                    ? 'border-church-green bg-church-green/5 shadow-md' 
                    : 'border-church-beige/50 bg-white hover:border-church-green/50'
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <span className="px-2 py-1 bg-church-beige text-church-brown/60 text-[10px] font-bold rounded uppercase tracking-wider">
                    {plan.category}
                  </span>
                  <Calendar size={18} className="text-church-green" />
                </div>
                <h4 className="font-bold text-lg mb-1">{plan.title}</h4>
                <p className="text-sm text-church-brown/50 leading-relaxed">{plan.desc}</p>
              </button>
            ))}
          </div>

          {/* Plan Detail */}
          <div className="lg:col-span-2">
            <div className="glass-card p-8 md:p-12">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                <div>
                  <h2 className="text-3xl font-serif font-bold mb-2">{activePlan.title}</h2>
                  <p className="text-church-brown/60">매일 정해진 분량의 말씀을 읽고 체크해보세요.</p>
                </div>
                <div className="flex flex-col items-end">
                  <div className="text-4xl font-serif font-bold text-church-green">{progress}%</div>
                  <div className="text-xs text-church-brown/40 uppercase tracking-widest font-bold">Progress</div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-3 bg-church-beige/30 rounded-full mb-12 overflow-hidden">
                <div 
                  className="h-full bg-church-green transition-all duration-500" 
                  style={{ width: `${progress}%` }}
                />
              </div>

              {/* Days Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {Array.from({ length: activePlan.days }).map((_, i) => {
                  const day = i + 1;
                  const isChecked = checkedDays.includes(day);
                  return (
                    <button
                      key={day}
                      onClick={() => toggleDay(day)}
                      className={`aspect-square rounded-2xl border-2 flex flex-col items-center justify-center transition-all ${
                        isChecked 
                          ? 'bg-church-green border-church-green text-white shadow-lg' 
                          : 'bg-white border-church-beige/50 text-church-brown/40 hover:border-church-green/50'
                      }`}
                    >
                      <span className="text-xs font-bold uppercase tracking-tighter mb-1">Day</span>
                      <span className="text-2xl font-serif font-bold">{day}</span>
                      {isChecked && <CheckCircle2 size={16} className="mt-1" />}
                    </button>
                  );
                })}
              </div>

              <div className="mt-12 p-6 bg-church-ivory/50 rounded-2xl flex items-center gap-4">
                <BookOpen className="text-church-green shrink-0" size={24} />
                <p className="text-sm text-church-brown/70 leading-relaxed">
                  오늘의 말씀: <span className="font-bold">창세기 1-3장</span> (예시)
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
