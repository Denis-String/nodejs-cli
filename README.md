# sisbr
O Sisbr é uma ferramenta CLI desenvolvida para auxiliar na criação de boilerplates em NodeJS, incluindo ferramentas para manutenções e instalação de pacotes auxiliares.

## Utilização
Você deve utiliza-lo com o comando NPX:

```sh
npx sisbr
```

Após isto você deve ver uma lista de comandos existentes.

### init
Comando para criar um boilerplate conforme os parâmetros informados.

```sh
npx sisbr init --arch=mvc --projectName=teste-1
```
Este comando cria um projeto chamado teste-1 em uma estrutura mais proxima do MVC.
- TypeScript
- Eslint
- Jest para testes
- Build pronto para produção
- Básico de Monitoramento como métricas e tracing
- Rota básica de health check

Estrutura de pastas:
```
src
├── controllers
│   └── health
│       └── check.ts
├── services
│   └── health
│       └── check.ts
├── middlewares
├── plugins
├── routes
```

#### implement
Comando para adicionar um pacote em uma estrutura já existente.

```sh
npx sisbr add --package=cors
```

Implementa uma regra básica de cors na aplicação, e instala as dependências se necessário.
