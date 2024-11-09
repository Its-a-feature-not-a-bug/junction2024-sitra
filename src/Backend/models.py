from database import metadata
from sqlalchemy import Table, Column, Integer, String, TIMESTAMP, func

conversations = Table(
  "conversations",
  metadata,
  Column("id", Integer, primary_key=True),
  Column("name", String(255)),
  Column("is_group", Integer),
  Column("creator_id", String(255)),
  Column("creator_nickname", String(55)),
  # Created_at timestamp with current timestamp
  Column("created_at", TIMESTAMP, server_default=func.now()),
  # Updated_at timestamp with current timestamp on update
  Column("updated_at", TIMESTAMP, server_default=func.now(), onupdate=func.now()),
)
