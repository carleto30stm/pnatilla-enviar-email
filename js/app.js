document.addEventListener("DOMContentLoaded",() => {
  const  email = {
    email: '',
    emailCc: '',
    asunto: '',
    mensaje: ''
  }
  const inputEmail = document.querySelector("#email");
  const inputCc = document.querySelector('#emailCc');
  const inputAsunto = document.querySelector("#asunto");
  const inputMensaje = document.querySelector("#mensaje");
  const btnSubmit = document.querySelector('#enviar-mail button[type="submit"]');
  const btnReset = document.querySelector('#enviar-mail button[type="reset"]');
  const formulario = document.querySelector('#enviar-mail');
  

  inputEmail.addEventListener("input", validar);
  inputCc.addEventListener('input',validarCc);
  inputAsunto.addEventListener("input", validar);
  inputMensaje.addEventListener("input", validar);
  formulario.addEventListener('submit', enviarEmail);
  btnReset.addEventListener('click', (e)=>{
    e.preventDefault();
    resetearForm();
  });

  //Funciones
  function resetearForm (){
    //reiniciamos el objeto
    email.email = '';
    emailCc = '';
    email.asunto = '';
    email.mensaje = '';

    formulario.reset();
    comprobarEmail();
  }
  function enviarEmail(e) {
    e.preventDefault();
    spiner.classList.add('flex');
    spiner.classList.remove('hidden');

    setTimeout(() => {
      spiner.classList.remove('flex');
      spiner.classList.add('hidden');
      resetearForm();

      const alertaExito = document.createElement('P');
    alertaExito.classList.add('bg-green-500', 'text-white', 'p-2', 'text-center','rounded-lg','mt-10',
    'font-bold','text-sm', 'uppercase');
    alertaExito.textContent = 'Mensaje enviado correctamente...';
    formulario.appendChild(alertaExito);
    setTimeout(() => {
      alertaExito.remove();
    }, 3000);
    }, 3000);
    
  }
  function validar(e) {
    const event = e.target.value;
    if (event.trim() === "") {
      mostrarAlerta(`El campo ${e.target.id} es obligatorio`, e.target.parentElement);
      email[e.target.id] = '';
      comprobarEmail();
      return;
    }
    //comprovar campo email conexpresion regular
    if(e.target.id ==='email' && !validarEmail(e.target.value)){
      mostrarAlerta('El email no es valido', e.target.parentElement);
      email[e.target.id] = '';
      comprobarEmail();
      return;
    }
    limpiarAlerta(e.target.parentElement);
//Asignar Valores
    email[e.target.id] = e.target.value.trim().toLowerCase();
    //comprobar si todos los campos estan llenos
    comprobarEmail();
    console.log(email);
  }
  function mostrarAlerta(mensaje, referencia) {
    limpiarAlerta(referencia);
    const error = document.createElement("P");
    error.textContent = mensaje;
    error.classList.add("bg-red-600", "p-2", "texto");
    referencia.appendChild(error);
  }
  function limpiarAlerta(ref) {
    const alerta = ref.querySelector(".bg-red-600");
    if (alerta) {
      alerta.remove();
    }
  }
  function validarCc(e) {
    if(e.target.id.length > 0){
      if(e.target.id ==='emailCc' && !validarEmail(e.target.value)){
        mostrarAlerta('El email no es valido', e.target.parentElement);
        email[e.target.id] = '';
        comprobarEmail();
        return;
      }
      limpiarAlerta(e.target.parentElement);
      //Asignar Valores
          email[e.target.id] = e.target.value.trim().toLowerCase();
          //comprobar si todos los campos estan llenos
          comprobarEmail();
    }
  }
  function validarEmail(email) {
    const regex =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/ ;
    const resultado = regex.test(email);
    return resultado;
  }
  function comprobarEmail() {
    if(Object.values(email).includes('')){
      btnSubmit.classList.add('opacity-50','cursor-not-allowed');
      return;
    }
    btnSubmit.classList.remove('opacity-50','cursor-not-allowed');
  }
  
});
