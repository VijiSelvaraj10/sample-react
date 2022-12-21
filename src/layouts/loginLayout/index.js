import React from 'react';

function LoginLayout(props) {
    return (
        <>
            <main style={{ minHeight: '80vh', marginTop: "75px" }}>
                {props.children}
            </main>
        </>

    )

}

export default LoginLayout;