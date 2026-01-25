run:
	docker compose up -d --build

run-prod:
	FEDERATED_MODE=production docker compose up -d --build

stop:
	docker compose down

logs:
	docker compose logs -f
