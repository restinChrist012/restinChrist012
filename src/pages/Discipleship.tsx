import { PageHeader } from '../components/PageHeader';
import { motion } from 'motion/react';
import { CheckCircle, PlayCircle, FileText, HelpCircle } from 'lucide-react';
import { cn } from '../lib/utils';

const steps = [
  {
    level: '1단계',
    title: '복음의 이해',
    desc: '죄와 구원, 그리고 십자가의 사랑을 깊이 깨닫는 단계입니다.',
    items: ['죄의 기원과 결과', '하나님의 사랑과 십자가', '구원의 확신'],
    color: 'bg-blue-500'
  },
  {
    level: '2단계',
    title: '삶의 변화',
    desc: '회개와 성령 충만을 통해 그리스도를 닮아가는 삶을 훈련합니다.',
    items: ['진정한 회개란 무엇인가', '성령 충만한 삶', '말씀과 기도의 훈련'],
    color: 'bg-emerald-500'
  },
  {
    level: '3단계',
    title: '사명의 발견',
    desc: '제자로서의 사명을 발견하고 세상을 향해 나아가는 단계입니다.',
    items: ['나의 은사와 사명', '제자 삼는 제자', '세상의 빛과 소금'],
    color: 'bg-amber-500'
  }
];

export function Discipleship() {
  return (
    <div>
      <PageHeader title="예수님 안에" subtitle="체계적인 제자훈련을 통해 예수 그리스도의 참된 제자로 성장합니다." />
      
      <div className="max-w-7xl mx-auto px-4 py-24">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">제자훈련 로드맵</h2>
          <p className="text-church-brown/60 max-w-2xl mx-auto">
            베다니 장로교회는 모든 성도가 영적으로 성숙해질 수 있도록 <br />
            단계별 교육 과정을 제공합니다.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {steps.map((step, idx) => (
            <motion.div
              key={step.level}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2 }}
              className="relative group"
            >
              <div className="glass-card p-8 h-full flex flex-col hover:shadow-2xl transition-all border-t-8 border-t-church-green/20 group-hover:border-t-church-green">
                <div className="flex items-center justify-between mb-6">
                  <span className="text-church-green font-bold text-sm tracking-widest uppercase">{step.level}</span>
                  <div className={cn("w-3 h-3 rounded-full", step.color)} />
                </div>
                
                <h3 className="text-2xl font-bold mb-4">{step.title}</h3>
                <p className="text-church-brown/60 text-sm leading-relaxed mb-8">{step.desc}</p>
                
                <div className="space-y-4 mb-10 flex-grow">
                  {step.items.map(item => (
                    <div key={item} className="flex items-center gap-3 text-sm font-medium">
                      <CheckCircle size={18} className="text-church-green" />
                      {item}
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <button className="flex flex-col items-center gap-1 p-3 rounded-xl bg-church-ivory hover:bg-church-beige/30 transition-colors">
                    <PlayCircle size={20} className="text-church-green" />
                    <span className="text-[10px] font-bold uppercase">Video</span>
                  </button>
                  <button className="flex flex-col items-center gap-1 p-3 rounded-xl bg-church-ivory hover:bg-church-beige/30 transition-colors">
                    <FileText size={20} className="text-church-green" />
                    <span className="text-[10px] font-bold uppercase">PDF</span>
                  </button>
                  <button className="flex flex-col items-center gap-1 p-3 rounded-xl bg-church-ivory hover:bg-church-beige/30 transition-colors">
                    <HelpCircle size={20} className="text-church-green" />
                    <span className="text-[10px] font-bold uppercase">Quiz</span>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-24 p-12 bg-church-green/5 rounded-[3rem] text-center border border-church-green/10">
          <h3 className="text-2xl font-serif font-bold mb-4">제자훈련 신청 안내</h3>
          <p className="text-church-brown/60 mb-8">
            제자훈련은 매 학기 초에 신청을 받습니다. <br />
            궁금하신 점은 사무실이나 담당 교역자에게 문의해주세요.
          </p>
          <button className="btn-primary">훈련 신청 문의하기</button>
        </div>
      </div>
    </div>
  );
}
