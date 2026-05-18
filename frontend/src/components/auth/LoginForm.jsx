import { useState } from 'react' 
import oneclickIcon from "../../../assets/imgs/ONECLICK-TUTOR ASSEST-03.png"

function LoginForm({ onSwitch, onSubmit }) {
    const [ username, setUsername ] = useState("");
    const [ emailAddress, setEmailAddress ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ error, setError ] = useState("")
    
    function handleValidation(e){
        e.preventDefault();

        if(!username || !password || !emailAddress){
            setError("Please fill in all fields")
            return;
        };
        if(password.length < 8){
            setError("Password must be at least 8 characters")
            return;
        }

        onSubmit?.({
          authType: "login",
          username,
          email: emailAddress,
          password,
        });
        setUsername("");
        setEmailAddress("");
        setPassword("");
        setError("");
        
    }

  return (
    <form 
        className="flex flex-col gap-6 w-full" 
        onSubmit={handleValidation} 
        data-aos="fade-up"
    >

        {/* Brand */}
        <div className="flex flex-col items-center gap-2 mb-2">
          <img
            src={oneclickIcon}
            alt="oneclick_icon"
            className="w-10"
          />
          <h1 className="text-[#3D0A4F] text-xl font-semibold tracking-wide">
            Welcome Back
          </h1>
          <p className="text-[#3D0A4F]/40 text-xs tracking-wide">
            Log in to continue
          </p>
        </div>

        {/* Fields */}
        <div className="flex flex-col gap-5">
          {/* Username */}
          <div className="flex flex-col gap-1">
            <label
              htmlFor="login-username"
              className="text-[#3D0A4F]/90 text-xs tracking-widest uppercase"
            >
              Username
            </label>
            <input
              type="text"
              id="login-username"
              name="username"
              aria-label="Username"
              placeholder="Your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="pl-0 py-2 border-b border-[#3D0A4F]/15 focus:border-[#E87722] outline-none text-sm text-[#3D0A4F] placeholder:text-[#3D0A4F]/30 transition-colors duration-150 bg-transparent"
            />
          </div>

          {/* Email */}
          <div className="flex flex-col gap-1">
            <label
              htmlFor="email"
              className="text-[#3D0A4F]/90 text-xs tracking-widest uppercase"
            >
              Email Address
            </label>
          <input 
                type="email" 
                id="email" 
                name="email" 
                aria-label="Email address"
                placeholder="you@example.com" 
                value={emailAddress}
                onChange={(e) => setEmailAddress(e.target.value)} 
                required 
                className="pl-0 py-2 border-b border-[#3D0A4F]/15 focus:border-[#E87722] outline-none text-sm text-[#3D0A4F] placeholder:text-[#3D0A4F]/30 transition-colors duration-150 bg-transparent"
                />

          </div>

          {/* Password */}
          <div className="flex flex-col gap-1">
            <div className="flex justify-between items-center">
              <label
                htmlFor="password"
                className="text-[#3D0A4F]/90 text-xs tracking-widest uppercase"
              >
                Password
              </label>
              <a href="#" className="text-[#E87722] text-xs hover:opacity-70 transition-opacity">
                Forgot?
              </a>
            </div>
            <input
              className="pl-0 py-2 border-b border-[#3D0A4F]/15 focus:border-[#E87722] outline-none text-sm text-[#3D0A4F] placeholder:text-[#3D0A4F]/30 transition-colors duration-150 bg-transparent"
              type="password"
              id="password"
              name="password"
              required
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>

        <div>
            { error && <span className='text-sm text-red-500'>
                    {error}
                </span>}
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-[#3D0A4F] text-white text-sm font-semibold tracking-wide py-2.5 rounded-lg hover:bg-[#E87722] transition-colors duration-200"
        >
          Log In
        </button>

        {/* Divider */}
        <div className="flex items-center gap-4">
          <div className="flex-1 h-px bg-[#3D0A4F]/40" />
          <span className="text-[#3D0A4F]/50 text-xs tracking-widest uppercase">or</span>
          <div className="flex-1 h-px bg-[#3D0A4F]/40" />
        </div>

        {/* Google */}
        <button
          type="button"
          className="w-full flex items-center justify-center gap-3 border border-[#3D0A4F]/10 py-2.5 rounded-lg text-sm text-[#3D0A4F]/70 font-medium hover:border-[#E87722]/50 hover:text-[#3D0A4F] transition-all duration-150"
        >
          <img 
            className="w-4 h-4" 
            src='https://res.cloudinary.com/dapzvtbty/image/upload/icons/google-color-svgrepo-com_giizlq.svg' 
            alt="google" 
        />
          Continue with Google
        </button>

        {/* Sign up nudge */}
        <p className="text-center text-xs text-[#3D0A4F]/50">
          Don't have an account?{" "}
          <button
            type="button"
            onClick={onSwitch}
            className="text-[#E87722] hover:opacity-70 transition-opacity"
          >
            Sign up
          </button>
        </p>

    </form>
  )
}

export default LoginForm
