from playhouse.migrate import PostgresqlMigrator, migrate

from redash.models import db
from redash import models

if __name__ == '__main__':
    db.connect_db()
    migrator = PostgresqlMigrator(db.database)
        
    with db.database.transaction():

        column = models.User.status
        column.null = True
        
        migrate(migrator.add_column('users', 'status', models.User.status))

        # for group in models.User.select():
        #     group.save()
        migrate(migrator.drop_not_null('users', 'status'))

    db.close_db(None)
