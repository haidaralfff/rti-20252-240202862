package models

type User struct {
	ID    int    `json:"id"`
	Name  string `json:"name"`
	Email string `json:"email"`
	Phone string `json:"phone"`
}

type UserStats struct {
	Category string `json:"category"`
	Count    int    `json:"count"`
}
