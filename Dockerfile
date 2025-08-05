FROM ocaml/opam:debian-12-ocaml-5.0 AS builder

WORKDIR /app

COPY marina/ ./marina/

RUN opam install --yes ocamlfind ounit2

RUN make -C ./marina

FROM node:22.15.0

WORKDIR /app

COPY --from=builder /app/marina/marina ./marina/marina
RUN chmod +x ./marina/marina

COPY package*.json ./
RUN npm install --production

COPY . .

EXPOSE 3000

CMD ["node", "server.js"]
