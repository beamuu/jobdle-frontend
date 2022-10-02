function SignUp() {
    return (
    <>
      <div>Sign Up</div>
      <form>
        <label>First-Name</label>
        <input type="text" />
        <label>Last-Name</label>
        <input type="text" />
        <label>Email</label>
        <input type="email" />
        <br />
        <label>Password</label>
        <input type="password" />
        <label>Confirm Password</label>
        <input type="password" />
        <button type="submit" className="rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium">Sign Up</button>
      </form>
    </>
    );
  }
  
  export default SignUp;