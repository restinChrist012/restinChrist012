import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Heart, User, LogIn, LogOut, Shield } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { signInWithGoogle, logout } from '../lib/firebase';
import { cn } from '../lib/utils';

const navItems = [
  { name: '교회소개', path: '/about' },
  { name: '말씀과 찬양', path: 'https://www.youtube.com/@%EC%A3%BC%EB%8B%98%EC%95%88%EC%97%90%EC%89%BC%ED%84%B0', isExternal: true },
  { name: '성경주석', path: '/commentary' },
  { name: '성경통독', path: '/reading' },
  { name: '예수님 안에', path: '/discipleship' },
  { name: '일상나누기', path: '/community' },
  { name: '기도요청', path: '/prayer' },
  { name: '예안숨터', path: '/healing' },
];

export function Layout({ children }: { children: React.ReactNode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, loading, isAdmin } = useAuth();
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-50 bg-church-ivory/80 backdrop-blur-md border-b border-church-beige/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 bg-church-green rounded-xl flex items-center justify-center text-white group-hover:rotate-12 transition-transform">
                <Heart size={24} fill="currentColor" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-serif font-bold text-church-brown leading-none">베다니 장로교회</span>
                <span className="text-[10px] text-church-green font-medium tracking-widest uppercase">Rest in the Lord</span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-8">
              {navItems.map((item) => (
                item.isExternal ? (
                  <a
                    key={item.path}
                    href={item.path}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium transition-colors hover:text-church-green text-church-brown/70"
                  >
                    {item.name}
                  </a>
                ) : (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={cn(
                      "text-sm font-medium transition-colors hover:text-church-green",
                      location.pathname === item.path ? "text-church-green" : "text-church-brown/70"
                    )}
                  >
                    {item.name}
                  </Link>
                )
              ))}

              {isAdmin && (
                <Link
                  to="/admin"
                  className={cn(
                    "text-sm font-bold transition-colors hover:text-church-green flex items-center gap-1",
                    location.pathname === '/admin' ? "text-church-green" : "text-church-brown/70"
                  )}
                >
                  <Shield size={16} />
                  관리자
                </Link>
              )}
              
              {!loading && (
                user ? (
                  <div className="flex items-center gap-4 pl-4 border-l border-church-beige">
                    <img src={user.photoURL || ''} alt={user.displayName || ''} className="w-8 h-8 rounded-full border border-church-green" />
                    <button onClick={logout} className="text-church-brown/50 hover:text-church-brown transition-colors">
                      <LogOut size={20} />
                    </button>
                  </div>
                ) : (
                  <button 
                    onClick={signInWithGoogle}
                    className="flex items-center gap-2 text-sm font-medium text-church-green hover:text-church-green/80 transition-colors"
                  >
                    <LogIn size={18} />
                    로그인
                  </button>
                )
              )}
            </nav>

            {/* Mobile Menu Toggle */}
            <button 
              className="lg:hidden p-2 text-church-brown"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-white border-b border-church-beige overflow-hidden"
            >
              <div className="px-4 pt-2 pb-6 space-y-1">
                {navItems.map((item) => (
                  item.isExternal ? (
                    <a
                      key={item.path}
                      href={item.path}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setIsMenuOpen(false)}
                      className="block px-3 py-4 text-base font-medium text-church-brown hover:bg-church-ivory rounded-lg"
                    >
                      {item.name}
                    </a>
                  ) : (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setIsMenuOpen(false)}
                      className="block px-3 py-4 text-base font-medium text-church-brown hover:bg-church-ivory rounded-lg"
                    >
                      {item.name}
                    </Link>
                  )
                ))}
                <div className="pt-4 mt-4 border-t border-church-beige">
                  {user ? (
                    <div className="flex items-center justify-between px-3">
                      <div className="flex items-center gap-3">
                        <img src={user.photoURL || ''} alt={user.displayName || ''} className="w-10 h-10 rounded-full" />
                        <span className="font-medium">{user.displayName}</span>
                      </div>
                      <button onClick={logout} className="text-church-brown/50">로그아웃</button>
                    </div>
                  ) : (
                    <button 
                      onClick={signInWithGoogle}
                      className="w-full flex items-center justify-center gap-2 py-3 bg-church-green text-white rounded-xl font-medium"
                    >
                      <LogIn size={20} />
                      구글 로그인
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main className="flex-grow">
        {children}
      </main>

      <footer className="bg-church-brown text-church-ivory py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 bg-church-green rounded-lg flex items-center justify-center text-white">
                  <Heart size={18} fill="currentColor" />
                </div>
                <span className="text-xl font-serif font-bold">베다니 장로교회</span>
              </div>
              <p className="text-church-beige/70 max-w-md leading-relaxed">
                지친 영혼이 예수 그리스도 안에서 참된 쉼과 회복을 얻는 공동체입니다. 
                말씀과 성령으로 살아나는 베다니 장로교회로 여러분을 초대합니다.
              </p>
            </div>
            
            <div>
              <h4 className="font-serif font-bold text-lg mb-6">Quick Links</h4>
              <ul className="space-y-4 text-church-beige/60">
                <li><Link to="/about" className="hover:text-white transition-colors">교회소개</Link></li>
                <li>
                  <a 
                    href="https://www.youtube.com/@%EC%A3%BC%EB%8B%98%EC%95%88%EC%97%90%EC%89%BC%ED%84%B0" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="hover:text-white transition-colors"
                  >
                    말씀과 찬양
                  </a>
                </li>
                <li><Link to="/prayer" className="hover:text-white transition-colors">기도요청</Link></li>
                <li><Link to="/healing" className="hover:text-white transition-colors">예안숨터</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-serif font-bold text-lg mb-6">Contact</h4>
              <ul className="space-y-4 text-church-beige/60 text-sm">
                <li>주소: 1057 McNicoll Ave 2nd Floor, Scarborough, ON M1W 3W6</li>
                <li>전화: 647-808-9103</li>
                <li>이메일: allplaces91@gmail.com</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-16 pt-8 border-t border-white/10 text-center text-church-beige/40 text-xs flex flex-col gap-2">
            <div>© 2026 베다니 장로교회. All rights reserved.</div>
            <div className="opacity-50">Version 0.1.0</div>
          </div>
        </div>
      </footer>
    </div>
  );
}
