import { PageHeader } from '../components/PageHeader';
import { motion } from 'motion/react';
import { Leaf, Wind, Sun, Coffee } from 'lucide-react';
import { cn } from '../lib/utils';

const contents = [
  {
    title: '오늘의 쉼표',
    desc: '바쁜 일상 속에서 잠시 멈춰 서서 하나님의 은혜를 묵상하는 짧은 글입니다.',
    icon: Leaf,
    image: 'https://images.unsplash.com/photo-1490730141103-6cac27aaab94?auto=format&fit=crop&q=80&w=800'
  },
  {
    title: '평온한 찬양',
    desc: '마음의 평안을 주는 조용한 찬양과 자연의 소리를 담은 영상 콘텐츠입니다.',
    icon: Wind,
    image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80&w=800'
  },
  {
    title: '빛의 메시지',
    desc: '어두운 마음을 밝히는 소망의 메시지를 3분 영상으로 만나보세요.',
    icon: Sun,
    image: 'https://images.unsplash.com/photo-1470252649358-96957c053e9a?auto=format&fit=crop&q=80&w=800'
  }
];

export function Healing() {
  return (
    <div>
      <PageHeader title="예안숨터" subtitle="예수님 안에서 누리는 영적 쉼의 공간입니다. 잠시 머물다 가세요." />
      
      <div className="max-w-7xl mx-auto px-4 py-24">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-church-green/10 text-church-green rounded-full text-sm font-bold mb-6">
            <Coffee size={18} />
            Healing & Spirituality
          </div>
          <h2 className="text-4xl font-serif font-bold mb-6">영혼의 안식을 위한 공간</h2>
          <p className="text-church-brown/60 max-w-2xl mx-auto">
            세상의 소음에서 벗어나 주님의 세밀한 음성에 귀 기울이는 시간입니다. <br />
            이곳에서 여러분의 영혼이 새 힘을 얻기를 소망합니다.
          </p>
        </div>

        <div className="space-y-32">
          {contents.map((item, idx) => (
            <motion.div 
              key={item.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={cn(
                "flex flex-col lg:items-center gap-12 lg:gap-24",
                idx % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
              )}
            >
              <div className="flex-1">
                <div className="relative group">
                  <div className="absolute -inset-4 bg-church-green/5 rounded-[2rem] scale-95 group-hover:scale-100 transition-transform" />
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="relative z-10 rounded-[2rem] shadow-2xl w-full aspect-[4/3] object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
              
              <div className="flex-1 space-y-6">
                <div className="w-16 h-16 bg-church-green/10 rounded-2xl flex items-center justify-center text-church-green">
                  <item.icon size={32} />
                </div>
                <h3 className="text-3xl font-serif font-bold">{item.title}</h3>
                <p className="text-lg text-church-brown/70 leading-relaxed">
                  {item.desc}
                </p>
                <div className="pt-4">
                  <button className="btn-outline">콘텐츠 보러가기</button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Quote Section */}
        <section className="mt-48 py-24 border-t border-church-beige/50 text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="max-w-3xl mx-auto"
          >
            <span className="text-6xl font-serif text-church-green/20 block mb-8">“</span>
            <p className="text-2xl md:text-3xl font-serif italic text-church-brown/80 leading-relaxed mb-8">
              수고하고 무거운 짐 진 자들아 다 내게로 오라 <br />
              내가 너희를 쉬게 하리라
            </p>
            <p className="text-church-green font-bold tracking-widest uppercase text-sm">— 마태복음 11:28</p>
          </motion.div>
        </section>
      </div>
    </div>
  );
}
