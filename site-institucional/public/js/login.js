function authenticate({email, password}){
  // Verifica se a pessoa digitou algum valor
  if(email && password){
    // Verifica se o email contem '@' ou '.com'
    if(!(email.includes('@')) || !(email.includes('.com'))){
      alert('Formato de email inválido!')
      throw new Error('Formato de email inválido!')
    }

    // Verifica se o array tem o usuário e a senha q a pessoa digitou
    const userAuthenticate = users && users.filter(user => user.email === email && user.password === password);

    if(userAuthenticate){
      alert(`Bem-vindo(a) ${userAuthenticate[0].username}`);
      // session.setUser(username);
      window.location.href = "./dashboard.html"
    }else{
      alert('Credenciais incorretas');
      throw new Error('Credenciais incorretas')
    }
  }else{
    alert('Informe suas credenciais');
    throw new Error('Informe suas credenciais')
  } 
}

function register({username, email, password}){
  if(username && email && password){
    if(email.includes('@') && email.includes('.com')){
      // const users = session.get('users');
      const userExists = users.filter(user => user.username === username);
      if(userExists.length > 0){
        alert('usuário já existe') 
        throw new Error('usuário já existe')
      }
      // session.set('users', [...users, {username, email, password}])
      alert('Cadastrado com sucesso')
      // window.location.href = "./login.html"
    }else{
      alert('Email inválido');
      throw new Error('Email inválido')
    }
  }else{
    alert('Informe suas credenciais');
    throw new Error('Informe suas credenciais')
  } 
}