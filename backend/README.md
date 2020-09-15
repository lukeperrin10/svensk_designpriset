# To install and run locally
1. Run `docker-compose up db` in `backend` directory. 
2. When initialization is done press `Ctrl + C` and run `docker-compose up`
3. In `backend/admin/`, run `./run_manage.sh migrate`.
4. Run `./run_manage.sh createsuperuser` and choose username and password.
5. Run `./load_all_fixtures.sh`.
6. In `backend` run `./load_views.sh`.
