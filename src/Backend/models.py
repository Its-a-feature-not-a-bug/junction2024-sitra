from database import metadata
from sqlalchemy import Boolean, Table, Column, Integer, String, TIMESTAMP, Text, func

conversations = Table(
  "conversations",
  metadata,
  Column("id", Integer, primary_key=True),
  Column("name", String(255)),
  Column("is_group", Boolean),
  Column("creator_id", String(255)),
  Column("creator_nickname", String(55)),
  # Created_at timestamp with current timestamp
  Column("created_at", TIMESTAMP, server_default=func.now()),
  # Updated_at timestamp with current timestamp on update
  Column("updated_at", TIMESTAMP, server_default=func.now(), onupdate=func.now()),
)

messages = Table(
    'messages', metadata,
    Column('id', Integer, primary_key=True, autoincrement=True),
    Column('conversation_id', Integer, nullable=False),
    Column('user_id', String(255), nullable=False),
    Column('user_nickname', String(55), nullable=False),
    Column('content', Text, nullable=False),
    Column('media_url', Text, nullable=True),
    Column('timestamp', TIMESTAMP, default=func.now()),
    Column('anger_score', Integer, nullable=True),
    Column('emotional_intensity_score', Integer, nullable=True),
    Column('bias_score', Integer, nullable=True),
    Column('score_reason', Text, nullable=True),
)
