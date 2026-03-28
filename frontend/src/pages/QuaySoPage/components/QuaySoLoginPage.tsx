import type { KeyboardEvent } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useShallow } from 'zustand/react/shallow';

import { Sparkles } from '@/components/Sparkles';
import { Button } from '@/components/shadcn/button';
import { Input } from '@/components/shadcn/input';
import { Label } from '@/components/shadcn/label';
import { cn } from '@/lib/utils';
import { useLotteryStore } from '@/stores/lotteryStore';

import { type LoginFormValues, loginSchema } from '../loginSchema';
import { MaiBranchBl } from './MaiBranchBl';
import { MaiBranchTrLogin } from './MaiBranchTrLogin';

export function QuaySoLoginPage() {
  const { view, loginError, loginWithCredentials } = useLotteryStore(
    useShallow((state) => ({
      view: state.view,
      loginError: state.loginError,
      loginWithCredentials: state.loginWithCredentials,
    })),
  );

  const loginForm = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { username: '', password: '' },
  });

  async function submitLoginForm(formValues: LoginFormValues) {
    await loginWithCredentials(formValues.username, formValues.password);
  }

  function handleUsernameKeyDown(keyboardEvent: KeyboardEvent<HTMLInputElement>) {
    if (keyboardEvent.key === 'Enter') {
      void loginForm.setFocus('password');
    }
  }

  function handlePasswordKeyDown(keyboardEvent: KeyboardEvent<HTMLInputElement>) {
    if (keyboardEvent.key === 'Enter') {
      void loginForm.handleSubmit(submitLoginForm)();
    }
  }

  return (
    <div className={cn('page', 'login-page', view === 'login' && 'active')}>
      <div className="bg-gradient" />
      <div className="bg-grain" />
      <Sparkles />
      <MaiBranchTrLogin />
      <MaiBranchBl />
      <div className="content-wrap">
        <div className="login-header">
          <div className="logo">
            <div className="logo-icon">🧪</div>
            <div className="logo-text-group">
              <div className="logo-text">hợp trí</div>
              <div className="logo-sub">summit</div>
            </div>
          </div>
        </div>
        <div className="banner">
          <div className="banner-badge">Chương trình quay số trúng thưởng</div>
          <h1>Khai Lộc Đầu Xuân</h1>
          <h2>Nhân Đôi May Mắn</h2>
          <div className="sub">VỤ ĐÔNG XUÂN 2025–2026</div>
          <div className="date-pill">Từ ngày 05/01/2026 đến ngày 28/02/2026</div>
        </div>
        <div className="login-card">
          <h3>Mời quý đại lý nhập vào thông tin</h3>
          <form onSubmit={loginForm.handleSubmit(submitLoginForm)}>
            <div className="field-group">
              <Label htmlFor="login-username">Mã khách hàng</Label>
              <Input
                id="login-username"
                autoComplete="off"
                spellCheck={false}
                placeholder="Mã khách hàng"
                {...loginForm.register('username')}
                onKeyDown={handleUsernameKeyDown}
              />
              {loginForm.formState.errors.username ? (
                <p className="text-destructive text-sm">{loginForm.formState.errors.username.message}</p>
              ) : null}
            </div>
            <div className="field-group">
              <Label htmlFor="login-password">Mật khẩu</Label>
              <Input
                id="login-password"
                type="password"
                placeholder="Mật khẩu"
                {...loginForm.register('password')}
                onKeyDown={handlePasswordKeyDown}
              />
              {loginForm.formState.errors.password ? (
                <p className="text-destructive text-sm">{loginForm.formState.errors.password.message}</p>
              ) : null}
            </div>
            <Button type="submit" variant="lottery" id="btnLogin" className="btn-gold">
              Đăng nhập
            </Button>
            <div className="error-msg" id="errMsg">
              {loginError}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
