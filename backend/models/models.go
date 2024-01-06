package models

type Expense struct {
	ID          string `gorm:"primaryKey" json:"id"`
	Description string `json:"description"`
	Category    string `json:"category"`
	Amount      int8   `json:"amount"`
	Price       int32  `json:"price"`
	Date        string `json:"date"`
}
