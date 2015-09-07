from redash import models
from redash.models import db

if __name__ == '__main__':
    db.connect_db()

    if models.Area.table_exists():
        print "Removing areas table..."
        models.Area.drop_table()

    db.close_db(None)