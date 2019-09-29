import React from 'react';
import Link from 'next/link';

function Login() {
  return (
    <div>
      <Link href="/auth">
        <a>SIG IN WITH GOOGLE</a>
      </Link>
    </div>
  );
}

export default Login;
