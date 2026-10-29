# Autenticação do MVP

O backend usa Spring Security HTTP Basic stateless e exige ADMIN_USERNAME e ADMIN_PASSWORD (mínimo 16 caracteres). O endpoint /actuator/health é público.
O frontend exige as mesmas credenciais via middleware e as utiliza apenas no servidor para chamadas à API.

**Limitações:** controle de um único administrador; sem RBAC, auditoria, rate limiting, MFA ou login por sessão. Use HTTPS na Render. HTTP Basic não deve ser usado sobre HTTP público. Não compartilhar senha entre colaboradores. Não inserir segredos no GitHub.

Para rodar localmente, exporte ADMIN_USERNAME e ADMIN_PASSWORD no shell ou configure variáveis no Docker Compose. O projeto falha intencionalmente sem credenciais.

Antes de produção real, implementar sessões seguras, CSRF, limitação de tentativas, autorização granular, logging e monitoramento.
