import React from 'react';
import '../styles sheet/invpub.css'

function Invpublica() {
    return (
        <div className= 'inv-publica'>
            <div className='texto-inv'>
                <h2>INVITACIÓN PÚBLICA</h2>
            </div>
            
            <img 
                class="img-thumbnail mx-auto d-block" className='imagen-invi'
                src ={require('../assets/invitacion-publica1.png')}
            />
            
        </div>
    );
}

export default Invpublica;