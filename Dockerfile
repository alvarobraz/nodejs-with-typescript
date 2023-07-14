# imagem do container em node
FROM node
# caminho que será criado está imagem
WORKDIR /usr/app
# copiando package.json para /usr/app
COPY package.json ./
# baixandoa s dependncias
RUN npm install
# copiando tudo
COPY . .
# executando um expose na porta 3333
EXPOSE 3333
# rodando o script npm run dev 
CMD ["npm","run","dev"]