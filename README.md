# Título:
## Desapega Campus

# Descrição Resumida:
O Desapega Campus é uma plataforma desenvolvida para facilitar a compra, venda e doação de materiais acadêmicos entre estudantes universitários. A aplicação permite que os usuários publiquem anúncios de livros, apostilas, equipamentos e outros itens relacionados ao ambiente acadêmico, promovendo a reutilização de recursos e a economia dentro da comunidade estudantil. O projeto foi desenvolvido como uma aplicação web responsiva e instalável (PWA), oferecendo uma experiência semelhante à de um aplicativo móvel.

# Tecnologias, Frameworks e Bibliotecas Utilizadas:
React – Construção da interface e componentes.
TypeScript – Tipagem estática e maior segurança no desenvolvimento.
Vite – Ferramenta de build e ambiente de desenvolvimento.
React Router DOM – Gerenciamento das rotas da aplicação.
Vite Plugin PWA – Transformação da aplicação em Progressive Web App (PWA).
Context API – Gerenciamento global do tema (modo claro e escuro).


# Diário de bordo:
1. 
Olá, nesse projeto as inteligencias artificais usadas foram o ChatGPT e o Claude como ferramenteas auxiliadoras e de aceleramento.

2. 
-Realmente nunca tinha mexido com PWA antes então pedi pra IA me ajudar me falando oq precisava, ai fiz esse prompt para que outra IA de mais confiança me ajudasse "Estou desenvolvendo uma aplicação react com vite para uma olx universitária, preciso q ela seja pwa.
Me ajude a configurar:
manifest.json
service worker
quais ícones necessários
configuração para React Router"
-Outro erro que rolou foi quando eu atualizava a pagina ela sumia, era um erro no vercel, aparentemente comum ent fiz esse prompt "estou com um problema, se eu to em uma pagina do site e atualizar ele da erro e n aparece mais *Codigo do main.tsx onde ficava as coisas do react router*"

3. 
Aqui eu ja tinha feito boa parte do frontend, so q tinha uns bugs em questão de formatos de telas menores e eu queria alguns detalhes a mais.
https://claude.ai/share/a2bdc5f4-e625-496f-9353-dc6e0b664370

4. 
Durante a configuração do PWA, a IA sugeriu registrar manualmente o Service Worker usando o virtual:pwa-register. Ao aplicar a solução, comecei a receber erros de importação e tipagem. Para entender o problema, consultei a documentação do vite-plugin-pwa, comparei com exemplos da comunidade e fiz alguns testes. Percebi que aquela configuração não era necessária para o meu caso e que o plugin já cuidava disso automaticamente. Depois de fornecer mais contexto sobre meu projeto e validar as respostas com a documentação, consegui chegar à configuração correta. Essa situação mostrou a importância de testar e verificar as sugestões da IA antes de aplicá-las diretamente.

# Links:
Aplicação: https://desapega-campus.vercel.app/
Repositório: https://github.com/kxuak/DesapegaCampus