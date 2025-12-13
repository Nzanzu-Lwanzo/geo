make : redis api

.PHONY:redis
redis:
	@echo 'Stop any previous Redis container'
	docker container stop geo-redis

	@echo 'Delete any previous Redis container'
	docker container rm geo-redis

	@echo 'Start redis database'
	docker run -d --name geo-redis -p 6379:6379 redis:8.4.0 redis-server --requirepass "hello_redis" 
	@echo 'Redis is up 🚀'

.PHONY:api
api:
	@echo 'Start server'
	npm run dev
	