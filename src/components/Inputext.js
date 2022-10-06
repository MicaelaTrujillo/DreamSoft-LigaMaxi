import React from 'react';

function Inputext({texto}){
    return(
        <input
            type='form-control'
            className="form-control" 
            id='form-control'
            placeholder={texto}>
        </input>
    );
}

function FormInputs({label, placeholder, estado, cambiarEstado, expresionRegular}){
    const onChange = (e) => {
        cambiarEstado({...estado, campo: e.target.value});
    }

    const validarNombre = () => {
        if(expresionRegular){
            if(expresionRegular.test(estado.campo)){
                console.log("correcto")
            }else{
                console.log("incorrecto")
            }
        }
    }

    return(
        <div className="mb-3 d-block ">
            <label className="w-100">{label}</label>
            <input
                className="form-control"
                type="text"
                placeholder={placeholder}
                value={estado.campo}
                onChange={onChange}
                onKeyUp={validarNombre}
                onBlur={validarNombre}
            />
            <p>Alerta de error</p>
        </div>
    )
}

function Boton({texto,manejarClic}){
    return(
        <button
            className='boton'
            onClick={manejarClic}>
            <p>{texto}</p>
        </button>
    );
}

export {Inputext,Boton,FormInputs}