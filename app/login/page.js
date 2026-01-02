const handleLogin = async () => {
    setLoading(true);
    const res = await axios.post('/api/proxy', {
        url: 'https://neir.btrc.gov.bd/api/authenticate-user',
        payload: { username, password }
    });
    
    if (res.data.idToken) {
        localStorage.setItem('token', res.data.idToken);
        // Redirect to profile
    } else {
        alert(res.data.message || "Login Failed");
    }
    setLoading(false);
};
