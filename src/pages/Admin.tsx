import { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';
import { collection, query, orderBy, onSnapshot, doc, updateDoc, deleteDoc, addDoc, serverTimestamp } from 'firebase/firestore';
import { Users, MessageSquare, Video, Settings, Trash2, Shield, ShieldCheck, ExternalLink, Plus, X as CloseIcon } from 'lucide-react';
import { motion } from 'motion/react';
import { PageHeader } from '../components/PageHeader';
import { cn } from '../lib/utils';

export function Admin() {
  const { user, isAdmin, loading: authLoading } = useAuth();
  const [activeTab, setActiveTab] = useState<'users' | 'prayers' | 'sermons'>('users');
  const [users, setUsers] = useState<any[]>([]);
  const [prayers, setPrayers] = useState<any[]>([]);
  const [sermons, setSermons] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddSermon, setShowAddSermon] = useState(false);
  const [newSermon, setNewSermon] = useState({
    title: '',
    youtubeId: '',
    category: '주일설교',
    date: new Date().toISOString().split('T')[0],
    description: ''
  });

  const handleAddSermon = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'sermons'), {
        ...newSermon,
        createdAt: serverTimestamp()
      });
      setNewSermon({
        title: '',
        youtubeId: '',
        category: '주일설교',
        date: new Date().toISOString().split('T')[0],
        description: ''
      });
      setShowAddSermon(false);
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, 'sermons');
    }
  };

  useEffect(() => {
    if (!isAdmin) return;

    const unsubUsers = onSnapshot(collection(db, 'users'), 
      (snapshot) => {
        setUsers(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      },
      (error) => handleFirestoreError(error, OperationType.LIST, 'users')
    );

    const unsubPrayers = onSnapshot(query(collection(db, 'prayerRequests'), orderBy('createdAt', 'desc')), 
      (snapshot) => {
        setPrayers(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      },
      (error) => handleFirestoreError(error, OperationType.LIST, 'prayerRequests')
    );

    const unsubSermons = onSnapshot(query(collection(db, 'sermons'), orderBy('date', 'desc')), 
      (snapshot) => {
        setSermons(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      },
      (error) => handleFirestoreError(error, OperationType.LIST, 'sermons')
    );

    setLoading(false);

    return () => {
      unsubUsers();
      unsubPrayers();
      unsubSermons();
    };
  }, [isAdmin]);

  const toggleUserRole = async (userId: string, currentRole: string) => {
    const newRole = currentRole === 'admin' ? 'member' : 'admin';
    try {
      await updateDoc(doc(db, 'users', userId), { role: newRole });
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `users/${userId}`);
    }
  };

  const deleteItem = async (collectionName: string, id: string) => {
    if (!window.confirm('정말로 삭제하시겠습니까?')) return;
    try {
      await deleteDoc(doc(db, collectionName, id));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `${collectionName}/${id}`);
    }
  };

  if (authLoading) return <div className="flex justify-center items-center h-screen">Loading...</div>;
  if (!isAdmin) return (
    <div className="max-w-7xl mx-auto px-4 py-20 text-center">
      <h1 className="text-2xl font-bold text-church-brown mb-4">접근 권한이 없습니다.</h1>
      <p className="text-church-brown/60">관리자 계정으로 로그인해주세요.</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-church-ivory/30 pb-20">
      <PageHeader 
        title="관리자 대시보드" 
        subtitle="교회 데이터 및 사용자 권한을 관리합니다."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="flex flex-wrap gap-4 mb-8">
          <button
            onClick={() => setActiveTab('users')}
            className={cn(
              "flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all",
              activeTab === 'users' ? "bg-church-brown text-white shadow-lg" : "bg-white text-church-brown hover:bg-church-beige/30"
            )}
          >
            <Users size={20} />
            사용자 관리 ({users.length})
          </button>
          <button
            onClick={() => setActiveTab('prayers')}
            className={cn(
              "flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all",
              activeTab === 'prayers' ? "bg-church-brown text-white shadow-lg" : "bg-white text-church-brown hover:bg-church-beige/30"
            )}
          >
            <MessageSquare size={20} />
            기도요청 관리 ({prayers.length})
          </button>
          <button
            onClick={() => setActiveTab('sermons')}
            className={cn(
              "flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all",
              activeTab === 'sermons' ? "bg-church-brown text-white shadow-lg" : "bg-white text-church-brown hover:bg-church-beige/30"
            )}
          >
            <Video size={20} />
            설교 관리 ({sermons.length})
          </button>
          
          {activeTab === 'sermons' && (
            <button
              onClick={() => setShowAddSermon(true)}
              className="flex items-center gap-2 px-6 py-3 rounded-xl font-medium bg-church-green text-white hover:bg-church-green/90 transition-all shadow-lg ml-auto"
            >
              <Plus size={20} />
              설교 추가
            </button>
          )}
        </div>

        {showAddSermon && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden"
            >
              <div className="p-6 border-b border-church-beige/50 flex justify-between items-center">
                <h3 className="text-xl font-bold text-church-brown">새 설교 추가</h3>
                <button onClick={() => setShowAddSermon(false)} className="text-church-brown/40 hover:text-church-brown">
                  <CloseIcon size={24} />
                </button>
              </div>
              <form onSubmit={handleAddSermon} className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-bold text-church-brown mb-1">제목</label>
                  <input
                    type="text"
                    required
                    value={newSermon.title}
                    onChange={(e) => setNewSermon({ ...newSermon, title: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border border-church-beige focus:ring-2 focus:ring-church-green outline-none"
                    placeholder="설교 제목을 입력하세요"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-church-brown mb-1">YouTube ID</label>
                  <input
                    type="text"
                    required
                    value={newSermon.youtubeId}
                    onChange={(e) => setNewSermon({ ...newSermon, youtubeId: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border border-church-beige focus:ring-2 focus:ring-church-green outline-none"
                    placeholder="v= 뒤의 ID값 (예: dQw4w9WgXcQ)"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-church-brown mb-1">카테고리</label>
                    <select
                      value={newSermon.category}
                      onChange={(e) => setNewSermon({ ...newSermon, category: e.target.value })}
                      className="w-full px-4 py-2 rounded-lg border border-church-beige focus:ring-2 focus:ring-church-green outline-none"
                    >
                      <option value="주일설교">주일설교</option>
                      <option value="특별설교">특별설교</option>
                      <option value="찬양">찬양</option>
                      <option value="묵상">묵상</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-church-brown mb-1">날짜</label>
                    <input
                      type="date"
                      required
                      value={newSermon.date}
                      onChange={(e) => setNewSermon({ ...newSermon, date: e.target.value })}
                      className="w-full px-4 py-2 rounded-lg border border-church-beige focus:ring-2 focus:ring-church-green outline-none"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-church-brown mb-1">설명</label>
                  <textarea
                    value={newSermon.description}
                    onChange={(e) => setNewSermon({ ...newSermon, description: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border border-church-beige focus:ring-2 focus:ring-church-green outline-none h-24 resize-none"
                    placeholder="설교에 대한 간단한 설명을 입력하세요"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3 bg-church-green text-white rounded-xl font-bold hover:bg-church-green/90 transition-all shadow-lg"
                >
                  저장하기
                </button>
              </form>
            </motion.div>
          </div>
        )}

        <div className="bg-white rounded-2xl shadow-sm border border-church-beige/50 overflow-hidden">
          {activeTab === 'users' && (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-church-ivory/50 border-b border-church-beige/50">
                  <tr>
                    <th className="px-6 py-4 text-sm font-bold text-church-brown">사용자</th>
                    <th className="px-6 py-4 text-sm font-bold text-church-brown">이메일</th>
                    <th className="px-6 py-4 text-sm font-bold text-church-brown">권한</th>
                    <th className="px-6 py-4 text-sm font-bold text-church-brown">가입일</th>
                    <th className="px-6 py-4 text-sm font-bold text-church-brown text-right">작업</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-church-beige/30">
                  {users.map((u) => (
                    <tr key={u.id} className="hover:bg-church-ivory/20 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <img src={u.photoURL} alt="" className="w-8 h-8 rounded-full" />
                          <span className="font-medium text-church-brown">{u.displayName}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-church-brown/70">{u.email}</td>
                      <td className="px-6 py-4">
                        <span className={cn(
                          "inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold",
                          u.role === 'admin' ? "bg-church-green/10 text-church-green" : "bg-church-beige text-church-brown/60"
                        )}>
                          {u.role === 'admin' ? <ShieldCheck size={12} /> : <Shield size={12} />}
                          {u.role === 'admin' ? '관리자' : '일반'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-church-brown/50">
                        {u.createdAt?.toDate ? u.createdAt.toDate().toLocaleDateString() : 'N/A'}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button 
                          onClick={() => toggleUserRole(u.id, u.role)}
                          className="text-church-green hover:underline text-sm font-medium mr-4"
                          disabled={u.email === 'allplaces91@gmail.com'}
                        >
                          권한변경
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'prayers' && (
            <div className="divide-y divide-church-beige/30">
              {prayers.length === 0 ? (
                <div className="p-12 text-center text-church-brown/40">기도요청이 없습니다.</div>
              ) : (
                prayers.map((p) => (
                  <div key={p.id} className="p-6 hover:bg-church-ivory/20 transition-colors flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-bold text-church-brown">{p.name || '익명'}</span>
                        <span className="text-xs text-church-brown/40">
                          {p.createdAt?.toDate ? p.createdAt.toDate().toLocaleString() : 'N/A'}
                        </span>
                        {p.isPrivate && <span className="text-[10px] bg-church-brown/10 text-church-brown px-1.5 py-0.5 rounded">비공개</span>}
                      </div>
                      <p className="text-church-brown/70 whitespace-pre-wrap">{p.content}</p>
                    </div>
                    <button 
                      onClick={() => deleteItem('prayerRequests', p.id)}
                      className="p-2 text-red-400 hover:text-red-600 transition-colors"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                ))
              )}
            </div>
          )}

          {activeTab === 'sermons' && (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-church-ivory/50 border-b border-church-beige/50">
                  <tr>
                    <th className="px-6 py-4 text-sm font-bold text-church-brown">제목</th>
                    <th className="px-6 py-4 text-sm font-bold text-church-brown">카테고리</th>
                    <th className="px-6 py-4 text-sm font-bold text-church-brown">날짜</th>
                    <th className="px-6 py-4 text-sm font-bold text-church-brown text-right">작업</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-church-beige/30">
                  {sermons.map((s) => (
                    <tr key={s.id} className="hover:bg-church-ivory/20 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-church-brown">{s.title}</span>
                          <a href={`https://youtube.com/watch?v=${s.youtubeId}`} target="_blank" rel="noreferrer" className="text-church-green">
                            <ExternalLink size={14} />
                          </a>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-church-brown/70">{s.category}</td>
                      <td className="px-6 py-4 text-sm text-church-brown/50">{s.date}</td>
                      <td className="px-6 py-4 text-right">
                        <button 
                          onClick={() => deleteItem('sermons', s.id)}
                          className="p-2 text-red-400 hover:text-red-600 transition-colors"
                        >
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
