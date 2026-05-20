import { Shield, UserRound } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Button } from '../ui/Button';

export function RoleSwitcher() {
  const { role, loginAs } = useApp();
  const navigate = useNavigate();

  const switchRole = (nextRole: 'student' | 'admin') => {
    loginAs(nextRole);
    navigate(nextRole === 'admin' ? '/admin/dashboard' : '/student/dashboard');
  };

  return (
    <div className="flex flex-wrap items-center gap-2 rounded-md border border-slate-200 bg-white p-2">
      <Button variant={role === 'student' ? 'primary' : 'ghost'} className="px-3 py-2" onClick={() => switchRole('student')}>
        <UserRound className="h-4 w-4" aria-hidden="true" /> Student
      </Button>
      <Button variant={role === 'admin' ? 'primary' : 'ghost'} className="px-3 py-2" onClick={() => switchRole('admin')}>
        <Shield className="h-4 w-4" aria-hidden="true" /> Admin
      </Button>
    </div>
  );
}
