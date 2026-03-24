import { useState } from 'react';
import { PageHeader } from '../components/PageHeader';
import { db } from '../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useAuth } from '../hooks/useAuth';
import { Send, Lock, Globe, CheckCircle2 } from 'lucide-react';

export function Prayer() {
  const [formData, setFormData] = useState({ name: '', content: '', isPrivate: true });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await addDoc(collection(db, 'prayerRequests'), {
        name: formData.name || '익명',
        content: formData.content,
        isPrivate: formData.isPrivate,
        authorUid: user?.uid || null,
        createdAt: serverTimestamp()
      });
      setIsSubmitted(true);
    } catch (error) {
      console.error('Error submitting prayer request:', error);
    } finally {
      setLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4">
        <div className="max-w-md w-full glass-card p-12 text-center">
          <div className="w-20 h-20 bg-church-green/10 rounded-full flex items-center justify-center text-church-green mx-auto mb-6">
            <CheckCircle2 size={48} />
          </div>
          <h2 className="text-3xl font-serif font-bold mb-4">기도 요청 완료</h2>
          <p className="text-church-brown/60 mb-8">
            여러분의 소중한 기도 제목이 접수되었습니다. <br />
            중보기도팀이 함께 마음을 모아 기도하겠습니다.
          </p>
          <button 
            onClick={() => setIsSubmitted(false)}
            className="btn-primary w-full"
          >
            추가 기도 요청하기
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <PageHeader title="온라인 기도요청" subtitle="여러분의 아픔과 기쁨, 모든 기도 제목을 함께 나누어 주세요." />
      
      <div className="max-w-7xl mx-auto px-4 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div>
            <h2 className="text-3xl font-serif font-bold mb-6">함께 기도하는 공동체</h2>
            <p className="text-church-brown/70 leading-relaxed mb-8">
              주님의 쉼터 교회는 기도의 능력을 믿습니다. 
              여러분이 겪고 있는 어려움, 간절한 소망, 혹은 감사의 제목들을 남겨주세요. 
              중보기도팀이 매일 여러분의 이름을 불러가며 기도하겠습니다.
            </p>
            
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-church-ivory rounded-2xl flex items-center justify-center text-church-green shrink-0">
                  <Lock size={24} />
                </div>
                <div>
                  <h4 className="font-bold mb-1">비공개 요청 가능</h4>
                  <p className="text-sm text-church-brown/50">비공개로 설정하시면 중보기도팀과 교역자만 내용을 확인합니다.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-church-ivory rounded-2xl flex items-center justify-center text-church-green shrink-0">
                  <Globe size={24} />
                </div>
                <div>
                  <h4 className="font-bold mb-1">실시간 중보</h4>
                  <p className="text-sm text-church-brown/50">접수된 기도 제목은 즉시 중보기도팀에게 전달됩니다.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="glass-card p-8 md:p-12">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-bold mb-2 text-church-brown/70">이름 (선택)</label>
                <input 
                  type="text" 
                  className="w-full bg-church-ivory/50 border border-church-beige rounded-xl px-4 py-3 focus:outline-none focus:border-church-green transition-colors"
                  placeholder="이름을 입력하지 않으면 '익명'으로 접수됩니다"
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              
              <div>
                <label className="block text-sm font-bold mb-2 text-church-brown/70">기도 내용</label>
                <textarea 
                  className="w-full bg-church-ivory/50 border border-church-beige rounded-xl px-4 py-3 focus:outline-none focus:border-church-green transition-colors min-h-[200px] resize-none"
                  placeholder="기도 제목을 자세히 적어주세요"
                  value={formData.content}
                  onChange={e => setFormData({ ...formData, content: e.target.value })}
                  required
                />
              </div>

              <div className="flex items-center gap-6 p-4 bg-church-ivory/50 rounded-xl">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input 
                    type="radio" 
                    name="isPrivate" 
                    checked={formData.isPrivate}
                    onChange={() => setFormData({ ...formData, isPrivate: true })}
                    className="w-4 h-4 accent-church-green"
                  />
                  <span className="text-sm font-medium">비공개</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input 
                    type="radio" 
                    name="isPrivate" 
                    checked={!formData.isPrivate}
                    onChange={() => setFormData({ ...formData, isPrivate: false })}
                    className="w-4 h-4 accent-church-green"
                  />
                  <span className="text-sm font-medium">공개</span>
                </label>
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading ? '제출 중...' : (
                  <>
                    <Send size={20} />
                    기도 요청 제출하기
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
