# 🎮 Pokédex - Explorador Interativo de Pokémon

Um aplicativo web moderno e responsivo para explorar o mundo dos Pokémon, desenvolvido com **Next.js 16**, **React 19**, **TypeScript** e **Tailwind CSS**.

![Pokédex](https://img.shields.io/badge/Pokemon-API-red?style=flat-square)
![Next.js](https://img.shields.io/badge/Next.js-16.1.6-black?style=flat-square)
![React](https://img.shields.io/badge/React-19.2.3-blue?style=flat-square)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square)

## ✨ Recursos

- ✅ **Grid Responsivo** - Adapta-se perfeitamente a todos os dispositivos
- ✅ **Busca em Tempo Real** - Procure por nome ou ID do Pokémon
- ✅ **Filtros por Tipo** - 18 tipos diferentes de Pokémon
- ✅ **Scroll Infinito** - Carregue mais Pokémon conforme você rola
- ✅ **Página de Detalhes** - Informações completas de cada Pokémon
- ✅ **Estatísticas Animadas** - Visualizações dinâmicas de stats
- ✅ **Imagens Otimizadas** - Componente Image nativo do Next.js
- ✅ **Design Moderno** - Cores, gradientes e animações elegantes

## 🚀 Começar

### Pré-requisitos

- Node.js 18+ 
- npm ou yarn

### Instalação

1. **Clone o repositório** (ou navegue até o diretório do projeto)
   ```bash
   cd pokedex_nextjs
   ```

2. **Instale as dependências**
   ```bash
   npm install
   ```

3. **Inicie o servidor de desenvolvimento**
   ```bash
   npm run dev
   ```

4. **Abra seu navegador**
   ```
   http://localhost:3000
   ```

## 📦 Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev

# Build para produção
npm run build

# Inicie servidor de produção
npm start

# Lint do código
npm run lint
```

## 🏗️ Estrutura do Projeto

```
app/
├── components/              # Componentes React reutilizáveis
│   ├── InfiniteScrollGrid.tsx
│   ├── Loading.tsx
│   ├── PokemonCard.tsx
│   ├── PokemonGrid.tsx
│   ├── PokemonGridWithSearch.tsx
│   ├── SearchBar.tsx
│   └── StatsDisplay.tsx
├── hooks/                   # Hooks personalizados
│   └── usePokemon.ts
├── services/                # Serviços de API
│   └── pokemonService.ts
├── types/                   # Definições TypeScript
│   └── pokemon.ts
├── pokemon/                 # Rotas dinâmicas
│   ├── [id]/
│   │   └── page.tsx
│   └── layout.tsx
├── globals.css              # Estilos globais
├── layout.tsx               # Layout raiz
└── page.tsx                 # Página inicial
```

## 🔌 API Utilizada

Este projeto utiliza a **[PokéAPI](https://pokeapi.co/)** - uma API gratuita e aberta para dados de Pokémon.

**Endpoints principais:**
- `GET /pokemon` - Lista de Pokémon
- `GET /pokemon/{id}` - Detalhes de um Pokémon específico

## 🎨 Tecnologias

- **Next.js 16** - Framework React com SSR/SSG
- **React 19** - Biblioteca UI
- **TypeScript** - Type safety
- **Tailwind CSS 4** - Estilização utilitária
- **PokéAPI** - Base de dados de Pokémon

## 📱 Responsividade

O design é totalmente responsivo:
- 📱 **Mobile** - 1 coluna
- 📱 **Tablet** - 2-3 colunas
- 💻 **Desktop** - 4 colunas

## 🎯 Histórico de Commits

### Etapa 1: Setup Inicial
- Estrutura de pastas e tipos TypeScript
- Serviço de conexão com PokéAPI

### Etapa 2: Componentes Base
- Hook `usePokemon` para gerenciar estado
- Componente `PokemonCard` com design responsivo

### Etapa 3: Página Principal
- Grid de Pokémon com loading states
- Layout com header e footer

### Etapa 4: Página de Detalhes
- Rota dinâmica `/pokemon/[id]`
- Estatísticas e informações completas

### Etapa 5: Sistema de Busca
- Barra de busca em tempo real
- Filtros por tipo de Pokémon

### Etapa 6: Paginação Infinita
- Scroll infinito com Intersection Observer
- Carregamento dinâmico de mais Pokémon

### Etapa 7: Melhorias Visuais
- Animações e transições suaves
- Componente `StatsDisplay` com efeitos
- Otimizações de CSS

## 🚀 Deploy

### Vercel (Recomendado)

1. **Push para GitHub**
   ```bash
   git push origin main
   ```

2. **Conecte ao Vercel**
   - Visite [vercel.com](https://vercel.com)
   - Conecte seu repositório GitHub
   - Deploy automático!

### Outras Opções

```bash
# Build local
npm run build
npm start

# Docker
docker build -t pokedex .
docker run -p 3000:3000 pokedex
```

## 🤝 Contribuindo

Contribuições são bem-vindas! Sinta-se livre para:
1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.

## 🙏 Agradecimentos

- [PokéAPI](https://pokeapi.co/) - Dados de Pokémon
- [Next.js](https://nextjs.org/) - Framework
- [Tailwind CSS](https://tailwindcss.com/) - Estilização
- [Vercel](https://vercel.com/) - Hosting

## 📞 Suporte

Se você encontrar algum problema, abra uma issue no GitHub.

---

Desenvolvido com ❤️ usando **Next.js**, **React** e **Tailwind CSS**

**Happy Pokémon Exploring! 🎮⚡**

