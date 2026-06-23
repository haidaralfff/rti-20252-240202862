package database

import (
	"context"
	"fmt"
	"time"

	"github.com/jackc/pgx/v4/pgxpool"
)

var Pool *pgxpool.Pool

func Init(dbURL string) error {
	cfg, err := pgxpool.ParseConfig(dbURL)
	if err != nil {
		return fmt.Errorf("unable to parse DATABASE_URL: %w", err)
	}
	cfg.MaxConns = 20
	cfg.MaxConnLifetime = time.Hour

	Pool, err = pgxpool.ConnectConfig(context.Background(), cfg)
	if err != nil {
		return fmt.Errorf("unable to connect to database: %w", err)
	}
	return nil
}

func Close() {
	if Pool != nil {
		Pool.Close()
	}
}
