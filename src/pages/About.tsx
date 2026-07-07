import { PageHeader } from '../components/PageHeader';
import { motion } from 'motion/react';

export function About() {
  return (
    <div>
      <PageHeader title="교회소개" subtitle="베다니 장로교회는 예수 그리스도 안에서 참된 쉼과 회복을 경험하는 공동체입니다." />
      
      <div className="max-w-7xl mx-auto px-4 py-24 space-y-24">
        {/* Vision & Mission */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl font-serif font-bold mb-8 border-l-4 border-church-green pl-4">교회 비전 & 사명</h2>
            <div className="space-y-6">
              <div className="p-6 glass-card">
                <h3 className="text-xl font-bold mb-2 text-church-green">비전 (Vision)</h3>
                <p className="text-church-brown/70 leading-relaxed">
                  "모든 성도가 말씀과 성령으로 변화되어 세상의 빛과 소금이 되는 공동체"
                </p>
              </div>
              <div className="p-6 glass-card">
                <h3 className="text-xl font-bold mb-2 text-church-green">사명 (Mission)</h3>
                <ul className="list-disc list-inside space-y-2 text-church-brown/70">
                  <li>말씀으로 세워지는 교회</li>
                  <li>성령으로 인도받는 삶</li>
                  <li>서로 사랑하는 공동체</li>
                  <li>세상을 치유하는 사역</li>
                </ul>
              </div>
            </div>
          </div>
          <img 
            src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=1000" 
            alt="Nature Vision" 
            className="rounded-3xl shadow-xl aspect-square object-cover"
            referrerPolicy="no-referrer"
          />
        </section>

        {/* Pastor */}
        <section className="bg-church-beige/20 rounded-[3rem] p-12 md:p-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-center">
            <div className="col-span-1 pt-8">
              <img 
                src="https://lh3.googleusercontent.com/d/1PK6KFOkuN-Jt8j0kn5m7IeJn91sqORfi" 
                alt="안정열 담임목사" 
                className="rounded-2xl shadow-lg aspect-[3/4] object-cover object-top w-full"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  if (target.src !== "https://drive.google.com/uc?export=view&id=1PK6KFOkuN-Jt8j0kn5m7IeJn91sqORfi") {
                    target.src = "https://drive.google.com/uc?export=view&id=1PK6KFOkuN-Jt8j0kn5m7IeJn91sqORfi";
                  }
                }}
              />
            </div>
            <div className="col-span-2">
              <span className="text-church-green font-medium tracking-widest uppercase text-sm">담임목사 인사말</span>
              <h2 className="text-3xl font-serif font-bold mt-2 mb-6">하나님 말씀으로 <br /> 영혼이 살아나는 사역을 꿈꿉니다</h2>
              <div className="space-y-4 text-church-brown/70 leading-relaxed">
                <p>
                  안녕하세요, 베다니 장로교회 담임목사 안정열입니다. 
                  우리 교회는 지친 현대인들이 예수 그리스도 안에서 참된 안식을 누리기를 소망하며 세워졌습니다.
                </p>
                <p>
                  복잡하고 바쁜 세상 속에서 길을 잃은 영혼들이 하나님의 말씀을 통해 
                  자신의 정체성을 회복하고, 성령님의 인도하심을 따라 기쁨의 삶을 살아가도록 돕는 것이 저의 사명입니다.
                </p>
                <p>
                  베다니 장로교회는 누구에게나 열려 있습니다. 
                  함께 예배하며 주님이 주시는 평안을 누리시길 바랍니다.
                </p>
              </div>
              <div className="mt-8">
                <p className="font-serif font-bold text-xl">담임목사 안정열</p>
              </div>
            </div>
          </div>
        </section>

        {/* Location */}
        <section>
          <h2 className="text-3xl font-serif font-bold mb-8 text-center">오시는 길</h2>
          <div className="h-96 w-full rounded-3xl overflow-hidden shadow-inner bg-church-beige/30 flex items-center justify-center">
            <div className="text-center p-8">
              <p className="text-lg font-medium mb-2">구글 맵이 여기에 표시됩니다</p>
              <p className="text-church-brown/50">주소: 236 Pineway Blvd. Toronto, ON, M2H 3G3</p>
              <p className="text-church-brown/50">전화: 647-808-9103</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
