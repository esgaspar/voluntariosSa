# electron-angularjs-sqlite
Aplicativo para controle de voluntarios em salaão de assembleias das Testemunhas de Jeová usando AngularJS, Sqlite, Electron e Bootstrap
<br>
## Usando
#### 1 - Clone este repositório no seu computador:
```
git clone https://github.com/esgaspar/voluntariosSa.git
```
#### 2 - Instale as dependências
```
npm install
```
#### 3 - Execute o aplicativo
```
npm start
```
#### 4 - Gerando Executável<br>
<b>Windows</b><br>

Para gerar o executável para Windows com arquitetura ia32, execute:<br>

<b>npm run win32</b><br>
Neste caso deve se considerar a estrutura do nosso arquivo package.json<br>

ou<br>


electron-packager . myApp --platform=win32 --arch=ia32<br>
Neste caso altere myApp para o nome de sua aplicação.<br>

<b>x64</b><br>

npm run win64<br>
Neste caso deve se considerar a estrutura do nosso arquivo package.json<br>

ou<br>


electron-packager . myApp --platform=win32 --arch=x64<br>

electron-packager . myApp --platform=win32 --arch=x64<br><br>
<b>Linux</b><br>

Para empacotar o seu programa para ser executado em sistemas operacionais Linux execute um dos os comandos a seguir no seu terminal usando linux32 ou ia32 para arquitetura 32 bits e linux64 ou x64 para arquitetura 64 bits.<br>


npm run linux64<br>
Neste caso deve se considerar a estrutura do nosso arquivo package.json<br>
electron-packager . myApp --platform=linux --arch=x64<br><br>
<b>Mac OS</b><br>

Para empacotar sua aplicação para rodar em OSX execute um dos comandos a seguir no seu terminal:<br>


npm run osx<br>
Neste caso deve se considerar a estrutura do nosso arquivo package.json<br>

ou<br>

electron-packager . myApp --platform=darwin --arch=x64<br><br>
