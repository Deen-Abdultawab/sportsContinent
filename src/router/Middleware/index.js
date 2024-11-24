import { decrypt } from '@/services/Encrypt';
import { logout } from '../../services/Auth';

const getUserFromLocalStorage = () => {
  const encryptedData = localStorage.getItem('_user_data');
  return encryptedData ? decrypt(encryptedData, import.meta.env.VITE_ENCRYPT_KEY) : null;
};

const redirectLogin = () => {
  const user = getUserFromLocalStorage();
  const isUserLoggedIn = user?.id;
  const isSigninPage = window.location.pathname === '/signin';

  // Only redirect to signin if the user is not logged in and they are not already on the signin page
  if (!isUserLoggedIn && !isSigninPage) {
    return { name: 'signin' };
  }
};

const redirectDashboard = () => {
  const user = getUserFromLocalStorage();
  const isAdmin = user?.role === 'ADMIN';
  const isAdminPage = window.location.pathname.startsWith('/admin');

  // Only redirect if the user is not an admin and not already on the admin pages
  if (!isAdmin && isAdminPage) {
    return { name: 'admin' }; // Redirect non-admin users to home or another page
  }

  // Allow admin users to access dashboard
  if (isAdmin && isAdminPage) {
    return undefined; // No redirection needed
  }
};

const deleteSession = async () => {
  try {
    await logout();
  } catch (error) {
    console.error('Logout failed:', error);
    // Optionally show an error notification
  }

  if (localStorage.getItem('_user_data')) {
    localStorage.removeItem('_user_data');
    return { name: 'signin' };
  }
  return undefined;
};

export default {
  redirectLogin,
  redirectDashboard,
  deleteSession,
};
