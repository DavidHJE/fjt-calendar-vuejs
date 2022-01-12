export default function auth({ next, router }) {
    if (!localStorage.getItem('jwt-access') || !localStorage.getItem('jwt-refresh')) {
      return router.push({ name: 'login' });
    }
  
    return next();
  }