import { useEffect } from 'react';
import { router } from 'expo-router';

export default function Index() {
  useEffect(() => {
    // Navigate to onboarding on app start
    router.replace('/onboarding');
  }, []);

  return null;
}