# Fase 1: Build
FROM node:23-alpine AS builder

# Define o diretório de trabalho
WORKDIR /app-builder

# Copia apenas os arquivos necessários para instalar as dependências
COPY package*.json ./
RUN npm ci

# Copia os arquivos de configuração do NestJS e o código-fonte
COPY tsconfig*.json nest-cli.json ./
COPY src ./src

# Compila o código TypeScript
RUN npm run build

# Fase 2: Produção
FROM node:23-alpine AS publisher

# Define o ambiente como produção
ENV NODE_ENV=production

# Define o diretório de trabalho
WORKDIR /app

# Copia apenas os arquivos necessários do build
COPY --from=builder /app-builder/package*.json ./
COPY --from=builder /app-builder/dist/ ./dist


# Instala somente as dependências de produção
RUN npm ci --omit=dev && npm cache clean --force

# Expõe a porta que a aplicação usará
EXPOSE 3000

# healthcheck para verificar se a API está rodando
HEALTHCHECK --interval=30s --timeout=10s --start-period=10s --retries=3 \
    CMD curl -f http://localhost:3000/health || exit 1

# Comando de inicialização da aplicação
CMD ["node", "dist/main.js"]