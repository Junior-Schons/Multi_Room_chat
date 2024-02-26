FROM node

WORKDIR /usr/src/app

COPY package.json .

RUN npm install

COPY . .

EXPOSE 80

CMD ["node", "app.js"] 

#comandos docker para rodar a aplicação
#docker build .   // para montar a imagem
#docker image ls  // para listar as imagens, copie o "IMAGE ID" da imagem
#docker run -p 80:80 -d "IMAGE ID" // para rodar a aplicação digite o comando e substitua o "IMAGE ID" pelo id da imagem
#docker ps //  para listar os containers
#docker stop  "NAMES" ou "CONTAINER ID" //  para parar o container
#se quiser nomear a imagem use esse comando ao criar o container:
#docker build -t "NOME DA IMAGEM" . //