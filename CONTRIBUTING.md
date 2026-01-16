# 🤝 Guia de Contribuição

Obrigado por se interessar em contribuir para o **Hacker Terminal App**! Este documento fornece diretrizes e instruções para contribuir com o projeto.

## 📋 Código de Conduta

Este projeto adota um Código de Conduta para garantir um ambiente acolhedor para todos. Esperamos que todos os contribuidores sigam estas diretrizes:

- Seja respeitoso e inclusivo
- Aceite críticas construtivas
- Foque no que é melhor para a comunidade
- Mostre empatia com outros membros da comunidade

## 🐛 Reportando Bugs

Antes de criar um relatório de bug, verifique a lista de issues, pois você pode descobrir que o bug já foi reportado.

**Como enviar um bom relatório de bug:**

1. Use um título descritivo e específico
2. Descreva os passos exatos para reproduzir o problema
3. Forneça exemplos específicos para demonstrar as etapas
4. Descreva o comportamento observado e o que você esperava ver
5. Inclua screenshots/vídeos se possível
6. Mencione sua versão do Node.js, sistema operacional e dispositivo

## 💡 Sugestões de Melhorias

Sugestões de melhorias são sempre bem-vindas! Para enviar uma sugestão:

1. Use um título descritivo e específico
2. Forneça uma descrição detalhada da melhoria sugerida
3. Liste alguns exemplos de como essa melhoria seria usada
4. Mencione outros projetos similares que implementam essa funcionalidade

## 🚀 Pull Requests

- Preencha o template de PR completamente
- Siga o guia de estilo do projeto
- Inclua screenshots/vídeos para mudanças visuais
- Termine todos os arquivos com uma nova linha
- Evite plataformas de desenvolvimento específicas

## 📝 Guia de Estilo

### Git Commit Messages

- Use o modo imperativo ("adicionar feature" não "adicionada feature")
- Limite a primeira linha a 72 caracteres ou menos
- Referencie issues e pull requests liberalmente após a primeira linha
- Use prefixos para categorizar commits:
  - `feat:` - Nova feature
  - `fix:` - Correção de bug
  - `docs:` - Mudanças na documentação
  - `style:` - Formatação, missing semi-colons, etc
  - `refactor:` - Refatoração de código
  - `perf:` - Melhorias de performance
  - `test:` - Adição ou atualização de testes

Exemplo:
```
feat: adicionar suporte a temas personalizados

- Implementar sistema de temas
- Adicionar 4 temas pré-definidos
- Salvar preferência em AsyncStorage

Closes #123
```

### TypeScript/JavaScript

- Use 2 espaços para indentação
- Use `const` por padrão, `let` se necessário
- Use arrow functions `() => {}`
- Use template literals para strings com variáveis
- Adicione tipos TypeScript sempre que possível

```typescript
// ✅ Bom
const getUserName = (userId: string): string => {
  return `user_${userId}`;
};

// ❌ Ruim
var getUserName = function(userId) {
  return "user_" + userId;
};
```

### React/React Native

- Use functional components com hooks
- Nomeie componentes com PascalCase
- Use `useCallback` para funções em props
- Adicione PropTypes ou TypeScript types
- Mantenha componentes pequenos e reutilizáveis

```typescript
// ✅ Bom
interface ButtonProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
}

const CustomButton: React.FC<ButtonProps> = ({ title, onPress, disabled }) => {
  return (
    <Pressable onPress={onPress} disabled={disabled}>
      <Text>{title}</Text>
    </Pressable>
  );
};

// ❌ Ruim
const CustomButton = (props) => {
  return (
    <Pressable onPress={props.onPress}>
      <Text>{props.title}</Text>
    </Pressable>
  );
};
```

## 🧪 Testes

- Escreva testes para novas features
- Mantenha cobertura de testes acima de 80%
- Use Vitest para testes unitários
- Nomeie testes de forma descritiva

```typescript
describe('AuthService', () => {
  it('deve fazer login com credenciais válidas', async () => {
    const result = await loginUser('user@example.com', 'password123');
    expect(result).toBeDefined();
  });

  it('deve rejeitar credenciais inválidas', async () => {
    await expect(loginUser('user@example.com', 'wrong')).rejects.toThrow();
  });
});
```

## 📦 Processo de Desenvolvimento

1. **Fork o repositório** e clone localmente
2. **Crie uma branch** para sua feature (`git checkout -b feature/AmazingFeature`)
3. **Instale dependências** (`pnpm install`)
4. **Faça suas mudanças** e adicione testes
5. **Rode os testes** (`pnpm test`)
6. **Verifique tipos** (`pnpm check`)
7. **Commit suas mudanças** (`git commit -m 'feat: adicionar feature'`)
8. **Push para a branch** (`git push origin feature/AmazingFeature`)
9. **Abra um Pull Request**

## 🔍 Revisão de Código

Todos os PRs serão revisados por pelo menos um mantenedor. Esperamos:

- Código limpo e bem documentado
- Testes passando
- Sem conflitos com a branch main
- Commits bem estruturados

## 📚 Documentação

- Atualize o README.md se adicionar features
- Adicione comentários em código complexo
- Mantenha a documentação em sincronia com o código
- Use JSDoc para funções públicas

```typescript
/**
 * Faz login do usuário com email e senha
 * @param email - Email do usuário
 * @param password - Senha do usuário
 * @returns Promise com dados do usuário autenticado
 * @throws Error se as credenciais forem inválidas
 */
export async function loginUser(email: string, password: string): Promise<User> {
  // implementação
}
```

## 🎯 Áreas de Contribuição

Áreas onde podemos usar ajuda:

- 🐛 Correção de bugs
- ✨ Novas features
- 📖 Melhorias na documentação
- 🧪 Testes adicionais
- 🎨 Melhorias de UI/UX
- 🌐 Novos idiomas
- 🎨 Novos temas
- ⚡ Otimizações de performance

## 📞 Perguntas?

- Abra uma [Discussion](https://github.com/ratungaturo-cell/hacker-terminal-app/discussions)
- Crie uma [Issue](https://github.com/ratungaturo-cell/hacker-terminal-app/issues) com a tag `question`

## 📄 Licença

Ao contribuir, você concorda que suas contribuições serão licenciadas sob a licença MIT.

---

Obrigado por contribuir! 🎉
