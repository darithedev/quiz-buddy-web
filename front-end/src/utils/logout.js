export const logout = () => {
    sessionStorage.removeItem('authToken');
    sessionStorage.removeItem('userId');
    window.location.href ='/';
}