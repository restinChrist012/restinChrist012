import { useState, useEffect } from 'react';
import { auth, db, handleFirestoreError, OperationType } from '../lib/firebase';
import { onAuthStateChanged, User } from 'firebase/auth';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<'admin' | 'member' | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      try {
        if (firebaseUser) {
          setUser(firebaseUser);
          
          // Check or create user profile in Firestore
          const userDocRef = doc(db, 'users', firebaseUser.uid);
          let userDoc;
          try {
            userDoc = await getDoc(userDocRef);
          } catch (error) {
            handleFirestoreError(error, OperationType.GET, `users/${firebaseUser.uid}`);
            return;
          }
          
          if (userDoc?.exists()) {
            setRole(userDoc.data().role);
          } else {
            const newRole = firebaseUser.email === 'allplaces91@gmail.com' ? 'admin' : 'member';
            try {
              await setDoc(userDocRef, {
                uid: firebaseUser.uid,
                displayName: firebaseUser.displayName,
                email: firebaseUser.email,
                photoURL: firebaseUser.photoURL,
                role: newRole,
                createdAt: serverTimestamp()
              });
            } catch (error) {
              handleFirestoreError(error, OperationType.WRITE, `users/${firebaseUser.uid}`);
              return;
            }
            setRole(newRole);
          }
        } else {
          setUser(null);
          setRole(null);
        }
      } catch (error) {
        console.error('Auth state change error:', error);
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  return { user, role, loading, isAdmin: role === 'admin' };
}
