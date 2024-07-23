import LoginForm from "../../forms/LoginForm";

const LoginPage: React.FC = () => {
    const centerStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
    };

    return (
        <div style={centerStyle}>
            <LoginForm />
        </div>
    );
}

export default LoginPage;