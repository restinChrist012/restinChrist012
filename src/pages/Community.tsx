import { useState, useEffect } from 'react';
import { PageHeader } from '../components/PageHeader';
import { db, auth } from '../lib/firebase';
import { collection, query, orderBy, onSnapshot, addDoc, serverTimestamp } from 'firebase/firestore';
import { useAuth } from '../hooks/useAuth';
import { MessageSquare, Heart, Image as ImageIcon, Send } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { ko } from 'date-fns/locale';

interface Sharing {
  id: string;
  authorUid: string;
  authorName: string;
  title: string;
  content: string;
  imageUrl?: string;
  likes: number;
  createdAt: any;
}

export function Community() {
  const [sharings, setSharings] = useState<Sharing[]>([]);
  const [isPosting, setIsPosting] = useState(false);
  const [newPost, setNewPost] = useState({ title: '', content: '' });
  const { user } = useAuth();

  useEffect(() => {
    const q = query(collection(db, 'dailySharings'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Sharing));
      setSharings(data);
    });
    return () => unsubscribe();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !newPost.title || !newPost.content) return;

    try {
      await addDoc(collection(db, 'dailySharings'), {
        authorUid: user.uid,
        authorName: user.displayName || '익명 성도',
        title: newPost.title,
        content: newPost.content,
        likes: 0,
        createdAt: serverTimestamp()
      });
      setNewPost({ title: '', content: '' });
      setIsPosting(false);
    } catch (error) {
      console.error('Error posting sharing:', error);
    }
  };

  return (
    <div>
      <PageHeader title="일상나누기" subtitle="하나님과 함께하는 일상의 은혜를 성도들과 함께 나눕니다." />
      
      <div className="max-w-4xl mx-auto px-4 py-16">
        {user ? (
          <div className="mb-12">
            {!isPosting ? (
              <button 
                onClick={() => setIsPosting(true)}
                className="w-full p-6 glass-card text-left text-church-brown/40 hover:border-church-green transition-all flex items-center gap-4"
              >
                <div className="w-10 h-10 bg-church-beige rounded-full flex items-center justify-center">
                  <ImageIcon size={20} />
                </div>
                오늘의 은혜를 나눠보세요...
              </button>
            ) : (
              <form onSubmit={handleSubmit} className="glass-card p-8 space-y-4">
                <input 
                  type="text" 
                  placeholder="제목을 입력하세요"
                  className="w-full bg-transparent border-b border-church-beige py-2 text-xl font-bold focus:outline-none focus:border-church-green"
                  value={newPost.title}
                  onChange={e => setNewPost({ ...newPost, title: e.target.value })}
                  required
                />
                <textarea 
                  placeholder="내용을 입력하세요..."
                  className="w-full bg-transparent border-b border-church-beige py-2 min-h-[150px] focus:outline-none focus:border-church-green resize-none"
                  value={newPost.content}
                  onChange={e => setNewPost({ ...newPost, content: e.target.value })}
                  required
                />
                <div className="flex justify-end gap-3 pt-4">
                  <button 
                    type="button" 
                    onClick={() => setIsPosting(false)}
                    className="px-6 py-2 text-church-brown/50 font-medium"
                  >
                    취소
                  </button>
                  <button 
                    type="submit"
                    className="btn-primary flex items-center gap-2"
                  >
                    <Send size={18} />
                    나누기
                  </button>
                </div>
              </form>
            )}
          </div>
        ) : (
          <div className="mb-12 p-8 glass-card text-center">
            <p className="text-church-brown/60 mb-4">로그인 후 은혜를 나눌 수 있습니다.</p>
          </div>
        )}

        <div className="space-y-8">
          {sharings.map((post) => (
            <div key={post.id} className="glass-card p-8 hover:shadow-lg transition-all">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-church-green rounded-full flex items-center justify-center text-white font-bold text-lg">
                  {post.authorName[0]}
                </div>
                <div>
                  <h4 className="font-bold">{post.authorName}</h4>
                  <p className="text-xs text-church-brown/40">
                    {post.createdAt?.toDate() ? formatDistanceToNow(post.createdAt.toDate(), { addSuffix: true, locale: ko }) : '방금 전'}
                  </p>
                </div>
              </div>
              
              <h3 className="text-xl font-bold mb-4">{post.title}</h3>
              <p className="text-church-brown/70 leading-relaxed whitespace-pre-wrap mb-8">
                {post.content}
              </p>
              
              <div className="flex items-center gap-6 pt-6 border-t border-church-beige/30">
                <button className="flex items-center gap-2 text-sm text-church-brown/50 hover:text-rose-500 transition-colors">
                  <Heart size={18} />
                  {post.likes}
                </button>
                <button className="flex items-center gap-2 text-sm text-church-brown/50 hover:text-church-green transition-colors">
                  <MessageSquare size={18} />
                  댓글
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
