import { useState, useEffect } from 'react';
import { PageHeader } from '../components/PageHeader';
import { db } from '../lib/firebase';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { Play, Music, Calendar } from 'lucide-react';
import { format } from 'date-fns';

interface Sermon {
  id: string;
  title: string;
  youtubeId: string;
  category: string;
  date: string;
  description: string;
}

export function Sermons() {
  const [sermons, setSermons] = useState<Sermon[]>([]);
  const [filter, setFilter] = useState('전체');

  useEffect(() => {
    const q = query(collection(db, 'sermons'), orderBy('date', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Sermon));
      setSermons(data);
    });
    return () => unsubscribe();
  }, []);

  const categories = ['전체', '주일설교', '특별설교', '찬양', '묵상'];
  const filteredSermons = filter === '전체' ? sermons : sermons.filter(s => s.category === filter);

  return (
    <div>
      <PageHeader title="말씀과 찬양" subtitle="은혜로운 설교와 찬양을 통해 하나님을 만나는 시간입니다." />
      
      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Filter */}
        <div className="flex flex-wrap gap-2 mb-12 justify-center">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                filter === cat ? 'bg-church-green text-white shadow-lg' : 'bg-white text-church-brown/60 hover:bg-church-beige/30'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Sermon Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredSermons.length > 0 ? (
            filteredSermons.map((sermon) => (
              <div key={sermon.id} className="group glass-card overflow-hidden hover:shadow-xl transition-all">
                <div className="relative aspect-video">
                  <img 
                    src={`https://img.youtube.com/vi/${sermon.youtubeId}/maxresdefault.jpg`} 
                    alt={sermon.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                    <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center text-church-green scale-0 group-hover:scale-100 transition-transform">
                      <Play size={24} fill="currentColor" />
                    </div>
                  </div>
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-church-green text-white text-[10px] font-bold uppercase tracking-widest rounded-full">
                      {sermon.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 text-church-brown/40 text-xs mb-3">
                    <Calendar size={14} />
                    {format(new Date(sermon.date), 'yyyy.MM.dd')}
                  </div>
                  <h3 className="text-lg font-bold mb-2 line-clamp-2 group-hover:text-church-green transition-colors">
                    {sermon.title}
                  </h3>
                  <p className="text-church-brown/60 text-sm line-clamp-2 leading-relaxed">
                    {sermon.description}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full py-20 text-center text-church-brown/40">
              <Play size={48} className="mx-auto mb-4 opacity-20" />
              <p>등록된 영상이 없습니다.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
