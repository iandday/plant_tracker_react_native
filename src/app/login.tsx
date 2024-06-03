import { useRouter } from 'expo-router';
import React from 'react';

import { UserApi } from '@/api';
import type { LoginFormProps } from '@/components/login-form';
import { LoginForm } from '@/components/login-form';
import { useAuth } from '@/core';
import { useSoftKeyboardEffect } from '@/core/keyboard';
import axiosInstance from '@/provider/custom-axios';
import { FocusAwareStatusBar } from '@/ui';

interface getTokensProps {
  email: string;
  password: string;
}
export default function Login() {
  const router = useRouter();
  const signIn = useAuth.use.signIn();
  useSoftKeyboardEffect();

  const onSubmit: LoginFormProps['onSubmit'] = async (data) => {
    try {
      const api = new UserApi(undefined, undefined, axiosInstance);
      const response = await api.trackerApiViewUserNewToken({
        email: data.email,
        password: data.password,
      });
      if (response.status === 200) {
        const { access, refresh } = response.data;
        signIn({ access: access, refresh: refresh });
        router.push('/');
      }
    } catch (err: any) {
      console.log(err);
    }
  };

  return (
    <>
      <FocusAwareStatusBar />
      <LoginForm onSubmit={onSubmit} />
    </>
  );
}
