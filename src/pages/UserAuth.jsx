import '../Styles/UserAuth.css'
import SignIn from '../components/SignIn'
import SignUp from '../components/SignUp'

export default function UserAuth() {
  return (
    <div className="auth-page">
      <div className="form-container">
        <SignIn />
      </div>
      <div className="form-container">
        <SignUp />
      </div>
    </div>
  );
}
