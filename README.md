# Organic Reach AI

MVP de inteligência de divulgação orgânica, inicialmente para a Clínica LaCari.

## Stack
- Java 21 / Spring Boot 3.5.x / Spring Data JPA / Validation
- PostgreSQL 16 (Flyway)
- Next.js 15 / React 19
- Docker Compose

## Executar
```bash
docker compose up --build
```
Frontend: http://localhost:3000  
API: http://localhost:8080/api/campaigns  
Health: http://localhost:8080/actuator/health

## Fluxo MVP
1. Criar uma campanha em rascunho.
2. Listar e consultar campanhas.
3. Planejar publicações e parcerias voluntárias.
4. Coletar dados reais **somente após autorização das contas Meta**.

**Nenhuma postagem automática, disparo em massa ou engajamento artificial foi implementado.**
As APIs da Meta e a geração via IA são integrações futuras. Métricas de redes sociais devem vir de fontes autorizadas. Dados sensíveis ficam em variáveis de ambiente.

## Desenvolvimento local
```bash
cd backend && mvn test
cd ../frontend && npm install && npm run build
```
