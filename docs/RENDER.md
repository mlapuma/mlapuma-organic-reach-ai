# Publicação na Render — homologação

> ATENÇÃO: o painel e os endpoints de cadastro ainda não possuem autenticação.
> Não publique serviços acessíveis pela internet antes de implementar controle de acesso.

## Preparação
1. Render Dashboard > New > Blueprint, conecte `mlapuma/mlapuma-organic-reach-ai`.
2. Confira o `render.yaml` e os planos antes de confirmar a criação.
3. Crie um PostgreSQL de teste ou use uma instância existente (não reutilize o banco de outro aplicativo).
4. Defina no backend:
   - SPRING_DATASOURCE_URL=jdbc:postgresql://HOST:5432/DATABASE
   - SPRING_DATASOURCE_USERNAME=USUARIO
   - SPRING_DATASOURCE_PASSWORD=SENHA
5. Defina no frontend `API_INTERNAL_URL` com a URL HTTPS do backend.
6. Após implementar autenticação, execute deploy manual e valide `/actuator/health` e a tela inicial.

O Render não usa docker-compose.yml como Blueprint; os serviços são separados.
O plano Free pode suspender instâncias inativas e seu Postgres gratuito expira em 30 dias.
A opção `autoDeployTrigger: off` evita publicação automática enquanto falta autenticação.

## Critérios de aceite para produção
- Autenticação e autorização no backend e frontend
- CSRF / proteção de ações e rate limiting
- CORS restrito e HTTPS
- Segredos apenas nas variáveis da Render
- Banco persistente com backup e migrações
- Testes Maven, build Next e smoke test HTTP
- Integração Meta com permissões oficiais e consentimento
