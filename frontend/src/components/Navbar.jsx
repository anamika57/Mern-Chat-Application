function Navbar() {
    return (
      <nav className="bg-blue-100 text-black p-4  font-medium  flex justify-between">
       <h1>ECHO</h1>

        <div className="ml-2 text-sm italic">Conversations that ripple.</div>
        <ul className="flex gap-4">
          {/* <li>Home</li>
          <li>Profile</li> */}
        </ul>
      </nav>
    );
  }
  
  export default Navbar;
  