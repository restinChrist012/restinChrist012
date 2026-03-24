import { PageHeader } from '../components/PageHeader';
import { Book, ChevronRight } from 'lucide-react';

const books = [
  { name: '창세기', chapters: 50, category: '구약' },
  { name: '출애굽기', chapters: 40, category: '구약' },
  { name: '시편', chapters: 150, category: '구약' },
  { name: '마태복음', chapters: 28, category: '신약' },
  { name: '로마서', chapters: 16, category: '신약' },
  { name: '요한계시록', chapters: 22, category: '신약' },
];

export function Commentary() {
  return (
    <div>
      <PageHeader title="성경주석" subtitle="장별 핵심 요약과 적용을 통해 성경을 더 깊이 이해합니다." />
      
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-8">
            <div>
              <h3 className="text-lg font-bold mb-4 border-b border-church-beige pb-2">구약 성경</h3>
              <div className="grid grid-cols-2 gap-2">
                {books.filter(b => b.category === '구약').map(book => (
                  <button key={book.name} className="text-left px-4 py-2 rounded-lg text-sm hover:bg-church-beige/30 transition-colors">
                    {book.name}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4 border-b border-church-beige pb-2">신약 성경</h3>
              <div className="grid grid-cols-2 gap-2">
                {books.filter(b => b.category === '신약').map(book => (
                  <button key={book.name} className="text-left px-4 py-2 rounded-lg text-sm hover:bg-church-beige/30 transition-colors">
                    {book.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Content Area */}
          <div className="lg:col-span-3">
            <div className="glass-card p-10">
              <div className="flex items-center gap-3 text-church-green mb-6">
                <Book size={32} />
                <h2 className="text-3xl font-serif font-bold">요한계시록 1장</h2>
              </div>
              
              <div className="space-y-10">
                <section>
                  <h4 className="text-lg font-bold mb-4 flex items-center gap-2">
                    <div className="w-2 h-2 bg-church-green rounded-full" />
                    장별 요약
                  </h4>
                  <p className="text-church-brown/70 leading-relaxed bg-church-ivory/50 p-6 rounded-2xl">
                    요한계시록 1장은 예수 그리스도의 계시의 성격과 목적을 밝히며 시작됩니다. 
                    밧모 섬에 유배된 요한이 부활하신 영광스러운 주님을 환상 중에 만나는 장면이 압권입니다. 
                    주님은 일곱 금 촛대 사이에 계시며, 일곱 별을 붙들고 계십니다.
                  </p>
                </section>

                <section>
                  <h4 className="text-lg font-bold mb-4 flex items-center gap-2">
                    <div className="w-2 h-2 bg-church-green rounded-full" />
                    핵심 포인트
                  </h4>
                  <ul className="space-y-4">
                    {[
                      '예수님은 어제도 계셨고 이제도 계시고 장차 오실 분이시다.',
                      '주님은 교회의 주인이시며 지금도 교회를 다스리신다.',
                      '이 예언의 말씀을 읽고 듣고 지키는 자가 복이 있다.'
                    ].map((point, i) => (
                      <li key={i} className="flex gap-3 text-church-brown/70">
                        <ChevronRight className="text-church-green shrink-0" size={20} />
                        {point}
                      </li>
                    ))}
                  </ul>
                </section>

                <section>
                  <h4 className="text-lg font-bold mb-4 flex items-center gap-2">
                    <div className="w-2 h-2 bg-church-green rounded-full" />
                    삶에 적용하기
                  </h4>
                  <div className="border-l-4 border-church-green pl-6 py-2 italic text-church-brown/80">
                    "세상의 권세가 아무리 강해 보여도, 역사의 진정한 통치자는 예수 그리스도이심을 신뢰합시다. 
                    오늘 나의 삶 속에서 주님의 통치를 인정하며 살아가고 있습니까?"
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
