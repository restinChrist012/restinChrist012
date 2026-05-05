import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Play, BookOpen, CheckCircle, Heart, ArrowRight } from 'lucide-react';
import { cn } from '../lib/utils';

export function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center overflow-hidden">
        <motion.div 
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 10, ease: "easeOut" }}
          className="absolute inset-0 z-0"
        >
          <img 
            src="https://images.unsplash.com/photo-1438232992991-995b7058bbb3?auto=format&fit=crop&q=80&w=2000" 
            alt="Church Background" 
            className="w-full h-full object-cover brightness-[0.6]"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-church-brown/40 via-transparent to-church-brown/60" />
        </motion.div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-4xl mx-auto text-center text-white">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.15,
                    delayChildren: 0.3
                  }
                }
              }}
            >
              <h1 className="text-4xl md:text-6xl font-serif font-bold mb-10 leading-[1.3] tracking-tight text-white drop-shadow-xl">
                <span className="block mb-2">
                  {["\"주님의", "쉼터", "교회\"에", "오신 것을"].map((text, i) => (
                    <span key={i} className="inline-block overflow-hidden mr-4 last:mr-0 pb-2">
                      <motion.span
                        className="inline-block"
                        variants={{
                          hidden: { y: "100%", opacity: 0 },
                          visible: { 
                            y: 0, 
                            opacity: 1,
                            transition: { 
                              duration: 1.2, 
                              ease: [0.22, 1, 0.36, 1] 
                            }
                          }
                        }}
                      >
                        {text}
                      </motion.span>
                    </span>
                  ))}
                </span>
                <span className="block">
                  {["환영합니다."].map((text, i) => (
                    <span key={i} className="inline-block overflow-hidden pb-2">
                      <motion.span
                        className="inline-block"
                        variants={{
                          hidden: { y: "100%", opacity: 0 },
                          visible: { 
                            y: 0, 
                            opacity: 1,
                            transition: { 
                              duration: 1.2, 
                              ease: [0.22, 1, 0.36, 1] 
                            }
                          }
                        }}
                      >
                        {text}
                      </motion.span>
                    </span>
                  ))}
                </span>
              </h1>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.2, ease: "easeOut" }}
              className="flex items-center justify-center gap-4 mb-12"
            >
              <div className="w-8 h-[1px] bg-church-green/50" />
              <p className="text-xl md:text-2xl font-light text-church-ivory/90 leading-relaxed tracking-wide">
                지친 영혼이 회복되고 예수님 안에서 참된 쉼을 누리는 곳
              </p>
              <div className="w-8 h-[1px] bg-church-green/50" />
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.5 }}
              className="flex flex-wrap items-center justify-center gap-8"
            >
              <a 
                href="https://www.youtube.com/@%EC%A3%BC%EB%8B%98%EC%95%88%EC%97%90%EC%89%BC%ED%84%B0" 
                target="_blank"
                rel="noopener noreferrer"
                className="group relative btn-primary flex items-center gap-3 px-10 py-5 text-lg overflow-hidden shadow-2xl shadow-church-green/30"
              >
                <motion.div 
                  className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500"
                />
                <Play size={22} fill="currentColor" />
                <span className="relative z-10">말씀 듣기</span>
              </a>
              <Link to="/discipleship" className="group flex items-center gap-3 bg-white/5 backdrop-blur-2xl text-white px-10 py-5 rounded-full font-medium border border-white/10 hover:bg-white/15 hover:border-white/30 transition-all text-lg">
                <span>성경 공부 시작</span>
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/prayer" className="text-church-ivory/60 hover:text-white transition-colors font-medium border-b border-white/10 hover:border-white/50 pb-1 text-base">
                기도 요청하기
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
        >
          <span className="text-[10px] uppercase tracking-[0.3em] text-white/40 font-bold">Scroll</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-church-green to-transparent" />
        </motion.div>
      </section>

      {/* Quick Access Cards */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-church-green font-medium tracking-widest uppercase text-sm">Core Content</span>
            <h2 className="text-4xl font-serif font-bold mt-2">핵심 콘텐츠 바로가기</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: '말씀과 찬양', desc: '은혜로운 설교와 찬양 영상', icon: Play, path: 'https://www.youtube.com/@%EC%A3%BC%EB%8B%98%EC%95%88%EC%97%90%EC%89%BC%ED%84%B0', isExternal: true, color: 'bg-blue-50 text-blue-600' },
              { title: '성경주석', desc: '깊이 있는 성경 해석과 묵상', icon: BookOpen, path: '/commentary', color: 'bg-emerald-50 text-emerald-600' },
              { title: '성경통독', desc: '주제별 성경 읽기 플랜', icon: CheckCircle, path: '/reading', color: 'bg-amber-50 text-amber-600' },
              { title: '예수님 안에', desc: '체계적인 제자훈련 시스템', icon: Heart, path: '/discipleship', color: 'bg-rose-50 text-rose-600' },
            ].map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                {item.isExternal ? (
                  <a 
                    href={item.path} 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block p-8 rounded-3xl border border-church-beige/50 hover:border-church-green hover:shadow-xl hover:shadow-church-green/5 transition-all h-full bg-church-ivory/20"
                  >
                    <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform", item.color)}>
                      <item.icon size={28} />
                    </div>
                    <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                    <p className="text-church-brown/60 text-sm leading-relaxed mb-6">{item.desc}</p>
                    <div className="flex items-center gap-2 text-church-green font-medium text-sm group-hover:translate-x-2 transition-transform">
                      자세히 보기 <ArrowRight size={16} />
                    </div>
                  </a>
                ) : (
                  <Link to={item.path} className="group block p-8 rounded-3xl border border-church-beige/50 hover:border-church-green hover:shadow-xl hover:shadow-church-green/5 transition-all h-full bg-church-ivory/20">
                    <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform", item.color)}>
                      <item.icon size={28} />
                    </div>
                    <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                    <p className="text-church-brown/60 text-sm leading-relaxed mb-6">{item.desc}</p>
                    <div className="flex items-center gap-2 text-church-green font-medium text-sm group-hover:translate-x-2 transition-transform">
                      자세히 보기 <ArrowRight size={16} />
                    </div>
                  </Link>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-24 bg-church-ivory/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1515162305285-0293e4767cc2?auto=format&fit=crop&q=80&w=1000" 
                alt="Church Vision" 
                className="rounded-3xl shadow-2xl"
                referrerPolicy="no-referrer"
              />
              <div className="absolute -bottom-8 -right-8 w-48 h-48 bg-church-green rounded-3xl flex flex-col items-center justify-center text-white p-6 text-center shadow-xl">
                <span className="text-4xl font-serif font-bold mb-1">3</span>
                <span className="text-xs font-medium uppercase tracking-tighter">Core Visions</span>
              </div>
            </div>
            
            <div>
              <span className="text-church-green font-medium tracking-widest uppercase text-sm">Our Vision</span>
              <h2 className="text-4xl font-serif font-bold mt-2 mb-8 leading-tight">
                우리는 말씀과 성령으로 <br /> 삶이 변화되는 공동체입니다
              </h2>
              
              <div className="space-y-8">
                {[
                  { title: '말씀 중심', desc: '하나님의 말씀을 삶의 유일한 기준으로 삼습니다.' },
                  { title: '성령 인도', desc: '매 순간 성령님의 세밀한 인도하심을 구합니다.' },
                  { title: '회복 공동체', desc: '누구든지 와서 쉬고 회복되는 사랑의 공동체입니다.' },
                ].map((item) => (
                  <div key={item.title} className="flex gap-4">
                    <div className="mt-1">
                      <CheckCircle className="text-church-green" size={24} />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold mb-1">{item.title}</h4>
                      <p className="text-church-brown/60 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-12">
                <Link to="/about" className="btn-outline inline-block">
                  교회 비전 더 알아보기
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-church-brown text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-church-green rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-church-green rounded-full blur-[120px] translate-x-1/2 translate-y-1/2" />
        </div>
        
        <div className="relative z-10 max-w-3xl mx-auto px-4">
          <h2 className="text-3xl md:text-5xl font-serif font-bold mb-6">함께 기도하겠습니다</h2>
          <p className="text-lg text-church-ivory/70 mb-10 leading-relaxed">
            혼자 고민하지 마세요. 주님의 쉼터 교회 중보기도팀이 <br className="hidden md:block" />
            여러분의 기도 제목을 들고 하나님 앞에 나아가겠습니다.
          </p>
          <Link to="/prayer" className="btn-primary bg-white text-church-brown hover:bg-church-ivory">
            지금 기도 요청하기
          </Link>
        </div>
      </section>
    </div>
  );
}
