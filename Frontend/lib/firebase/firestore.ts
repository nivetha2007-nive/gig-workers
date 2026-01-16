import {
  collection,
  doc,
  setDoc,
  getDoc,
  query,
  where,
  getDocs,
  updateDoc,
  deleteDoc,
  Timestamp,
} from 'firebase/firestore';
import { db } from './config';

// User document operations
export const saveUserProfile = async (userId: string, profileData: any) => {
  try {
    const userRef = doc(db, 'users', userId);
    await setDoc(userRef, {
      ...profileData,
      updatedAt: Timestamp.now(),
    }, { merge: true });
  } catch (error) {
    console.error('Error saving user profile:', error);
    throw error;
  }
};

export const getUserProfile = async (userId: string) => {
  try {
    const userRef = doc(db, 'users', userId);
    const docSnap = await getDoc(userRef);
    return docSnap.exists() ? docSnap.data() : null;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    throw error;
  }
};

// Credit Score operations
export const saveCreditScore = async (userId: string, scoreData: any) => {
  try {
    const scoreRef = doc(collection(db, 'credit_scores'));
    await setDoc(scoreRef, {
      user_id: userId,
      ...scoreData,
      created_at: Timestamp.now(),
    });
    return scoreRef.id;
  } catch (error) {
    console.error('Error saving credit score:', error);
    throw error;
  }
};

export const getUserCreditScores = async (userId: string) => {
  try {
    const q = query(
      collection(db, 'credit_scores'),
      where('user_id', '==', userId)
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error('Error fetching credit scores:', error);
    throw error;
  }
};

export const getLatestCreditScore = async (userId: string) => {
  try {
    const q = query(
      collection(db, 'credit_scores'),
      where('user_id', '==', userId)
    );
    const querySnapshot = await getDocs(q);
    const scores = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as any[];
    
    // Sort by timestamp and get latest
    return scores.sort((a, b) => {
      const dateA = a.created_at?.toDate?.() || new Date(0);
      const dateB = b.created_at?.toDate?.() || new Date(0);
      return dateB.getTime() - dateA.getTime();
    }) || null;
  } catch (error) {
    console.error('Error fetching latest credit score:', error);
    throw error;
  }
};

// Evaluation history
export const saveEvaluation = async (userId: string, evaluationData: any) => {
  try {
    const evalRef = doc(collection(db, 'evaluations'));
    await setDoc(evalRef, {
      user_id: userId,
      ...evaluationData,
      created_at: Timestamp.now(),
    });
    return evalRef.id;
  } catch (error) {
    console.error('Error saving evaluation:', error);
    throw error;
  }
};

export const updateUserLatestEvaluation = async (
  userId: string,
  evaluationId: string
) => {
  try {
    const userRef = doc(db, 'users', userId);
    await updateDoc(userRef, {
      latest_evaluation_id: evaluationId,
      last_evaluation_at: Timestamp.now(),
    });
  } catch (error) {
    console.error('Error updating latest evaluation:', error);
    throw error;
  }
};
