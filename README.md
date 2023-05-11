# Desenvolvimento Mobile - Bookfy

> O Bookfy é um aplicativo de gerenciamento de livros emprestados desenvolvido em React Native usando o Expo. Com o Bookfy, você pode organizar as saídas de livros, verificando se o livro desejado já está emprestado ou não e a quem foi emprestado. O nome da aplicação é uma palavra derivada do inglês "book" (livro) e "to simplify" (simplificar), sugerindo uma proposta de facilitar a busca e controle de empréstimos de livros.

> O aplicativo permite adicionar e remover livros, registrar empréstimos de livros, verificar quais livros estão emprestados, verificar o histórico de empréstimos e renovar empréstimos. Tudo isso de forma fácil e intuitiva, com uma interface de usuário atraente e funcional.

> Desenvolvido em React Native, o Bookfy oferece uma experiência de usuário nativa em dispositivos móveis, aproveitando ao máximo os recursos do sistema operacional para fornecer um desempenho rápido e confiável.

> Com o Expo, a configuração do ambiente de desenvolvimento é simplificada e é possível testar o aplicativo em um emulador ou diretamente em um dispositivo móvel. O Expo também fornece uma ampla variedade de bibliotecas de componentes e APIs para facilitar o desenvolvimento de aplicativos móveis.


## Instalação
1. Clone o repositório: ```git clone https://github.co`/hywenklis/bookfy.git```
2. Navegue até o diretório do projeto: ```cd bookfy```
3. Instale as dependências: ```npm install```
4. Inicie o servidor com Expo: ```expo start```
5. Instale o aplicativo Expo em seu dispositivo móvel a partir da **Google Play** Store para dispositivos Android ou da **App Store** para dispositivos iOS.
6. Escaneie o código QR exibido no seu terminal ou no **localhost:19002** usando o aplicativo Expo em seu dispositivo móvel para iniciar o aplicativo Bookfy.

# Telas

1. **Tela de Splash:** 
> A tela de abertura deve ser a primeira tela exibida quando o aplicativo é aberto. Geralmente, ela apresenta o logotipo do aplicativo e uma animação ou imagem para entreter o usuário enquanto o aplicativo é carregado.
<div align="center">
<img 
src="https://github.com/hywenklis/bookfy/blob/main/assets/images/presentation/tela1-splash.jpeg" 
alt="Tela de splash" 
width="250px" /> 
</div>

2. **Tela de Login:**
> A tela de login deve permitir que o usuário insira suas credenciais de login, como nome de usuário e senha. Se o usuário ainda não tem uma conta, pode criar uma clicando no link "Criar conta".
<div align="center">
<img 
src="https://github.com/hywenklis/bookfy/blob/main/assets/images/presentation/tela2-login.jpeg" 
alt="Tela de login" 
width="250px" /> <img 
src="https://github.com/hywenklis/bookfy/blob/main/assets/images/presentation/tela2-login-validation-formik.jpeg" 
alt="Tela de login-validation-formik" 
width="250px" /> <img 
src="https://github.com/hywenklis/bookfy/blob/main/assets/images/presentation/tela2-login-validation-alert.jpeg" 
alt="Tela de login-validation-alert" 
width="250px" /> <img 
src="https://github.com/hywenklis/bookfy/blob/main/assets/images/presentation/tela2-login-success.jpeg" 
alt="Tela de login-success" 
width="250px" />
</div>

3. **Tela de Signup:** 
>  A tela de cadastro deve permitir que um usuário crie uma nova conta no aplicativo. O usuário deve fornecer informações básicas, como nome e senha. Caso já exista um usuário com o mesmo nome, é mostrado um alerta informando que o usuário já existe na base de dados da aplicação.
<div align="center">
<img 
src="https://github.com/hywenklis/bookfy/blob/main/assets/images/presentation/tela3-signup-validation-formik.jpeg" 
alt="Tela de signup-validation-formik" 
width="250px" /> <img 
src="https://github.com/hywenklis/bookfy/blob/main/assets/images/presentation/tela3-signup-validation-formik-confirmPassword.jpeg" 
alt="Tela de signup-validation-formik-confirmPassword" 
width="250px" /> <img 
src="https://github.com/hywenklis/bookfy/blob/main/assets/images/presentation/tela3-signup-validation-alert.jpeg" 
alt="Tela de signup-validation-alert" 
width="250px" /> <img 
src="https://github.com/hywenklis/bookfy/blob/main/assets/images/presentation/tela3-signup-success.jpeg" 
alt="Tela de signup-validation-alert" 
width="250px" /> 
</div>

4. **Tela de pesquisa do livro:**
> A tela de pesquisa de livros deve permitir que o usuário pesquise livros por título, autor ou categoria. Os resultados da pesquisa devem ser exibidos em uma lista e o usuário deve poder tocar em um livro para ver detalhes adicionais. A tela exibe uma lista de livros com imagem, título, autor e categorias. Quando o usuário clica em um livro, ele é redirecionado para outra tela com os detalhes do livro. A lista de livros é renderizada em um FlatList. Há também um indicador de atividade exibido enquanto os livros são carregados.
<div align="center">
<img 
src="https://github.com/hywenklis/bookfy/blob/main/assets/images/presentation/tela4-searchBook.jpeg" 
alt="Tela de searchBook" 
width="250px" /> 
</div>

5. **Tela para solicitar o emprestimo:**
> A tela permite que o usuário confira as informações de um livro específico e, dependendo do estado de “emprestado” ou “disponível”, emprestar ou devolver o livro. O código usa estados para controlar se o livro está disponível para empréstimo ou já foi emprestado. Ele também utiliza a biblioteca moment.js para lidar com datas e calcular o tempo restante até a data de devolução do livro. A interface da tela é construída com componentes como Text, TouchableOpacity e TextInput, fornecidos pelo React Native.
<div align="center">
<img 
src="https://github.com/hywenklis/bookfy/blob/main/assets/images/presentation/tela5-bookDetails.jpeg" 
alt="Tela de bookDetails" 
width="250px" /> <img 
src="https://github.com/hywenklis/bookfy/blob/main/assets/images/presentation/tela5-bookDetails-loan.jpeg" 
alt="Tela de bookDetails-loan" 
width="250px" /> 
</div>