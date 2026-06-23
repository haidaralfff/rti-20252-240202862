package services

import (
	"context"
	"gin-api/internal/database"
	"gin-api/internal/models"
)

type UserService struct{}

func NewUserService() *UserService {
	return &UserService{}
}

func (s *UserService) FindByID(ctx context.Context, id int) (*models.User, error) {
	var user models.User
	err := database.Pool.QueryRow(ctx,
		"SELECT id, name, email, phone FROM users WHERE id=$1", id).
		Scan(&user.ID, &user.Name, &user.Email, &user.Phone)
	if err != nil {
		return nil, err
	}
	return &user, nil
}

func (s *UserService) GetStats(ctx context.Context) ([]models.UserStats, error) {
	rows, err := database.Pool.Query(ctx, `
		SELECT
			CASE WHEN phone IS NOT NULL THEN 'With Phone' ELSE 'Without Phone' END as category,
			COUNT(*) as count
		FROM users
		GROUP BY 1
	`)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var stats []models.UserStats
	for rows.Next() {
		var s models.UserStats
		if err := rows.Scan(&s.Category, &s.Count); err != nil {
			return nil, err
		}
		stats = append(stats, s)
	}
	return stats, nil
}

func (s *UserService) Create(ctx context.Context, name, email, phone string) (*models.User, error) {
	var user models.User
	err := database.Pool.QueryRow(ctx,
		"INSERT INTO users (name, email, phone) VALUES ($1, $2, $3) RETURNING id, name, email, phone",
		name, email, phone).
		Scan(&user.ID, &user.Name, &user.Email, &user.Phone)
	if err != nil {
		return nil, err
	}
	return &user, nil
}

func (s *UserService) Update(ctx context.Context, id int, name, email, phone string) (*models.User, error) {
	var user models.User
	err := database.Pool.QueryRow(ctx,
		"UPDATE users SET name=$1, email=$2, phone=$3 WHERE id=$4 RETURNING id, name, email, phone",
		name, email, phone, id).
		Scan(&user.ID, &user.Name, &user.Email, &user.Phone)
	if err != nil {
		return nil, err
	}
	return &user, nil
}

func (s *UserService) Delete(ctx context.Context, id int) (int, error) {
	var deletedID int
	err := database.Pool.QueryRow(ctx, "DELETE FROM users WHERE id=$1 RETURNING id", id).Scan(&deletedID)
	if err != nil {
		return 0, err
	}
	return deletedID, nil
}
